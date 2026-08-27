((root, factory) => {
  const api = factory(root && root.EFN_LEARNING_LOOP);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.EFN_PRACTICE_SESSION = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, (loop) => {
  function numericSeed(value) {
    const text = String(value ?? '');
    let hash = 0;
    for (let index = 0; index < text.length; index += 1) {
      hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
    }
    return Math.abs(hash);
  }

  function createSession(records, options = {}) {
    if (!loop) throw new Error('EFN learning loop is required.');
    const choiceRecords = Array.isArray(options.choiceRecords) && options.choiceRecords.length >= 2
      ? options.choiceRecords
      : records;
    if (!Array.isArray(records) || records.length < 1 || !Array.isArray(choiceRecords) || choiceRecords.length < 2) {
      throw new Error('At least one practice record and two choice records are required.');
    }
    if (typeof options.questionFactory !== 'function') {
      throw new Error('A questionFactory function is required.');
    }

    const limit = Math.max(1, Math.min(records.length, Number(options.limit) || records.length));
    const selected = records.slice(0, limit);
    const coverageFirst = Boolean(options.coverageFirst);
    const requiredCorrectCount = coverageFirst ? 1 : 2;
    function initialMode(record, index) {
      const candidate = typeof options.initialModeFor === 'function'
        ? options.initialModeFor(record, index)
        : 'primary';
      return ['primary', 'review', 'context'].includes(candidate) ? candidate : 'primary';
    }
    const states = selected.map(() => ({
      initialCorrect: null,
      correctCount: 0,
      wrongCount: 0,
      signals: new Set()
    }));
    let queue = selected.map((record, index) => ({
      index,
      mode: initialMode(record, index),
      phase: 'initial',
      filler: false,
      key: String(record.id ?? record.serial ?? index)
    }));
    let currentEntry = null;
    let currentQuestion = null;
    let answerCount = 0;
    let correctStreak = 0;
    let recentResults = [];

    function makeFiller(sourceIndex, fillerIndex) {
      let index = (sourceIndex + fillerIndex + 1) % selected.length;
      if (index === sourceIndex) index = (index + 1) % selected.length;
      const record = selected[index];
      return {
        index,
        mode: fillerIndex % 2 ? 'primary' : 'review',
        phase: 'filler',
        filler: true,
        key: `filler-${String(record.id ?? record.serial ?? index)}-${answerCount}-${fillerIndex}`
      };
    }

    function next() {
      if (currentQuestion) return currentQuestion;
      currentEntry = queue.shift() || null;
      if (!currentEntry) return null;
      currentQuestion = options.questionFactory(selected[currentEntry.index], {
        records: choiceRecords,
        index: currentEntry.index,
        mode: currentEntry.mode,
        phase: currentEntry.phase,
        filler: currentEntry.filler,
        state: { ...states[currentEntry.index] },
        choiceCount: options.adaptive && recentResults.slice(-4).filter(result => !result).length >= 2 ? 2 : 4,
        seed: numericSeed(`${currentEntry.key}-${answerCount}`)
      });
      if (!currentQuestion || !Array.isArray(currentQuestion.choices) || !currentQuestion.choices.length) {
        throw new Error('questionFactory returned an invalid question.');
      }
      if (!currentQuestion.choices.includes(currentQuestion.answer)) {
        throw new Error('The correct answer must be one of the choices.');
      }
      return currentQuestion;
    }

    function answer(selectedAnswer, answerContext = {}) {
      if (!currentEntry || !currentQuestion) throw new Error('Call next() before answer().');
      const entry = currentEntry;
      const question = currentQuestion;
      const state = states[entry.index];
      const correct = selectedAnswer === question.answer;
      let willReturn = false;
      answerCount += 1;
      recentResults.push(correct);
      recentResults = recentResults.slice(-6);

      if (!entry.filler) {
        if (entry.phase === 'initial' && state.initialCorrect === null) {
          state.initialCorrect = correct;
        }
        if (correct) {
          correctStreak += 1;
          state.signals.add(entry.mode);
          state.correctCount = options.adaptive ? state.signals.size : state.correctCount + 1;
          if (!coverageFirst && state.correctCount < requiredCorrectCount) {
            const responseTimeMs = Math.max(0, Number(answerContext.responseTimeMs) || 0);
            const nextMode = options.adaptive
              ? entry.mode === 'primary'
                ? responseTimeMs > 0 && responseTimeMs < 5200 && correctStreak >= 2 ? 'review' : 'context'
                : 'primary'
              : entry.mode === 'primary' ? 'review' : 'primary';
            const reviewEntry = {
              ...entry,
              mode: nextMode,
              phase: options.adaptive ? 'depth' : 'review',
              filler: false,
              key: `${entry.key}-review-${state.correctCount}`
            };
            queue = loop.scheduleAfterSuccess(
              queue,
              reviewEntry,
              numericSeed(`${entry.key}-${answerCount}-${state.correctCount}`),
              fillerIndex => makeFiller(entry.index, fillerIndex)
            );
            willReturn = true;
          }
        } else {
          correctStreak = 0;
          state.wrongCount += 1;
          const retryEntry = {
            ...entry,
            mode: coverageFirst ? entry.mode : options.adaptive ? 'primary' : entry.mode,
            phase: 'retry',
            filler: false,
            key: `${entry.key}-retry-${state.wrongCount}`
          };
          if (coverageFirst) queue.splice(Math.min(2, queue.length), 0, retryEntry);
          else {
            queue = loop.scheduleAfterError(
              queue,
              retryEntry,
              fillerIndex => makeFiller(entry.index, fillerIndex)
            );
          }
          willReturn = true;
        }
      }

      const result = {
        correct,
        selectedAnswer,
        question,
        entry: { ...entry },
        state: { ...state },
        willReturn,
        mastered: state.correctCount >= requiredCorrectCount
      };
      currentEntry = null;
      currentQuestion = null;
      return result;
    }

    function progress() {
      const correctSignals = states.reduce((total, state) => total + Math.min(requiredCorrectCount, state.correctCount), 0);
      const targetSignals = states.length * requiredCorrectCount;
      return {
        mastered: states.filter(state => state.correctCount >= requiredCorrectCount).length,
        total: states.length,
        answered: answerCount,
        remaining: queue.length + (currentEntry ? 1 : 0),
        progressPercent: targetSignals ? Math.round((correctSignals / targetSignals) * 100) : 0
      };
    }

    function summary() {
      return {
        firstTry: states.filter(state => state.initialCorrect === true && state.correctCount >= requiredCorrectCount).length,
        corrected: states.filter(state => state.initialCorrect === false && state.correctCount >= requiredCorrectCount).length,
        unresolved: states.filter(state => state.correctCount < requiredCorrectCount).length,
        total: states.length,
        answered: answerCount
      };
    }

    function debugQueue() {
      return queue.map(entry => ({ ...entry }));
    }

    return { next, answer, progress, summary, debugQueue };
  }

  return { createSession, numericSeed };
});
