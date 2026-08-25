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
    if (!Array.isArray(records) || records.length < 2) {
      throw new Error('At least two practice records are required.');
    }
    if (typeof options.questionFactory !== 'function') {
      throw new Error('A questionFactory function is required.');
    }

    const limit = Math.max(2, Math.min(records.length, Number(options.limit) || records.length));
    const selected = records.slice(0, limit);
    const states = selected.map(() => ({
      initialCorrect: null,
      correctCount: 0,
      wrongCount: 0
    }));
    let queue = selected.map((record, index) => ({
      index,
      mode: 'primary',
      phase: 'initial',
      filler: false,
      key: String(record.id ?? record.serial ?? index)
    }));
    let currentEntry = null;
    let currentQuestion = null;
    let answerCount = 0;

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
        records: selected,
        index: currentEntry.index,
        mode: currentEntry.mode,
        phase: currentEntry.phase,
        filler: currentEntry.filler,
        state: { ...states[currentEntry.index] },
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

    function answer(selectedAnswer) {
      if (!currentEntry || !currentQuestion) throw new Error('Call next() before answer().');
      const entry = currentEntry;
      const question = currentQuestion;
      const state = states[entry.index];
      const correct = selectedAnswer === question.answer;
      let willReturn = false;
      answerCount += 1;

      if (!entry.filler) {
        if (entry.phase === 'initial' && state.initialCorrect === null) {
          state.initialCorrect = correct;
        }
        if (correct) {
          state.correctCount += 1;
          if (state.correctCount < 2) {
            const reviewEntry = {
              ...entry,
              mode: entry.mode === 'primary' ? 'review' : 'primary',
              phase: 'review',
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
          state.wrongCount += 1;
          const retryEntry = {
            ...entry,
            phase: 'retry',
            filler: false,
            key: `${entry.key}-retry-${state.wrongCount}`
          };
          queue = loop.scheduleAfterError(
            queue,
            retryEntry,
            fillerIndex => makeFiller(entry.index, fillerIndex)
          );
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
        mastered: state.correctCount >= 2
      };
      currentEntry = null;
      currentQuestion = null;
      return result;
    }

    function progress() {
      return {
        mastered: states.filter(state => state.correctCount >= 2).length,
        total: states.length,
        answered: answerCount,
        remaining: queue.length + (currentEntry ? 1 : 0)
      };
    }

    function summary() {
      return {
        firstTry: states.filter(state => state.initialCorrect === true && state.correctCount >= 2).length,
        corrected: states.filter(state => state.initialCorrect === false && state.correctCount >= 2).length,
        unresolved: states.filter(state => state.correctCount < 2).length,
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
