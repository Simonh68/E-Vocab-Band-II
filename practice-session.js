((root, factory) => {
  const segmentEngine = root && root.EFN_PRACTICE_SEGMENTS
    ? root.EFN_PRACTICE_SEGMENTS
    : typeof module === 'object' && module.exports
      ? require('./practice-segments.js')
      : null;
  const api = factory(root && root.EFN_LEARNING_LOOP, segmentEngine);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.EFN_PRACTICE_SESSION = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, (loop, segmentEngine) => {
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

    const coverageFirst = Boolean(options.coverageFirst);
    const segmented = Boolean(options.segmented);
    if (segmented && !coverageFirst) {
      throw new Error('Segmented practice currently requires coverage-first mode.');
    }
    if (segmented && (!segmentEngine || typeof segmentEngine.buildSegmentPlan !== 'function')) {
      throw new Error('EFN practice segments are required for segmented practice.');
    }
    const limit = Math.max(1, Math.min(records.length, Number(options.limit) || records.length));
    const selected = records.slice(0, limit);
    const segmentPlan = segmented
      ? segmentEngine.buildSegmentPlan(options.segmentTotalItems || selected.length)
      : null;
    const requiredCorrectCount = coverageFirst ? 1 : 2;
    function initialMode(record, index) {
      const candidate = typeof options.initialModeFor === 'function'
        ? options.initialModeFor(record, index)
        : 'primary';
      return ['primary', 'review', 'context'].includes(candidate) ? candidate : 'primary';
    }
    const states = selected.map((record, index) => {
      const priorSignalCount = Math.max(0, Math.min(
        segmentEngine?.REQUIRED_MASTERY_EVIDENCE || 2,
        Number(options.initialSignalCountFor?.(record, index)) || 0
      ));
      return {
        initialCorrect: null,
        correctCount: 0,
        wrongCount: 0,
        priorSignalCount,
        signals: new Set()
      };
    });
    const initialEntries = selected.map((record, index) => ({
      index,
      mode: initialMode(record, index),
      phase: 'initial',
      filler: false,
      key: String(record.id ?? record.serial ?? index)
    }));
    const selectedIndexes = new Map(selected.map((record, index) => [
      String(record.id ?? record.serial ?? index),
      index
    ]));
    let queue = initialEntries;
    let futureQueue = [];
    let pendingCarry = [];
    let currentEntry = null;
    let currentQuestion = null;
    let answerCount = 0;
    let correctStreak = 0;
    let recentResults = [];
    let segmentIndex = 0;
    let segmentNumber = 0;
    let segmentPass = 0;
    let segmentAnswered = 0;
    let segmentTarget = 0;
    const segmentHistory = [];
    const segmentTotalItems = segmentPlan?.totalItems || selected.length;
    const initialCoveredItems = Math.max(0, Math.min(
      segmentTotalItems,
      Number(options.initialCoveredItems) || 0
    ));
    const initialMasteredItems = Math.max(0, Math.min(
      initialCoveredItems,
      Number(options.initialMasteredItems) || 0
    ));

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

    function alternateMode(index) {
      const completed = states[index]?.signals || new Set();
      return ['primary', 'review', 'context'].find(mode => !completed.has(mode)) || 'review';
    }

    function recordKey(record, fallback = '') {
      return String(record?.id ?? record?.serial ?? fallback);
    }

    function entryRecord(entry) {
      return entry?.record || selected[entry?.index];
    }

    function entryKey(entry) {
      return recordKey(entryRecord(entry), entry?.index);
    }

    function makeDepthSpacer(excludedKeys, spacerIndex) {
      const excluded = new Set(excludedKeys.map(String));
      const candidates = choiceRecords.filter((record, index) => !excluded.has(recordKey(record, index)));
      if (!candidates.length) return null;
      const record = candidates[spacerIndex % candidates.length];
      const key = recordKey(record, spacerIndex);
      const selectedIndex = selectedIndexes.has(key) ? selectedIndexes.get(key) : null;
      return {
        index: selectedIndex,
        record,
        mode: selectedIndex == null
          ? spacerIndex % 2 ? 'context' : 'review'
          : alternateMode(selectedIndex),
        phase: 'depth-gap',
        filler: true,
        spacer: true,
        key: `depth-gap-${key}-${answerCount}-${spacerIndex}`
      };
    }

    function coverageCount() {
      const newlyCovered = states.filter(state => state.priorSignalCount === 0 && state.initialCorrect !== null).length;
      return Math.min(segmentTotalItems, initialCoveredItems + newlyCovered);
    }

    function masteryCount() {
      const newlyMastered = states.filter(state => (
        state.priorSignalCount < (segmentEngine?.REQUIRED_MASTERY_EVIDENCE || 2)
        && state.priorSignalCount + state.signals.size >= (segmentEngine?.REQUIRED_MASTERY_EVIDENCE || 2)
      )).length;
      return Math.min(segmentTotalItems, initialMasteredItems + newlyMastered);
    }

    function segmentCounters() {
      if (!segmented || !segmentNumber || !segmentTarget) return null;
      return segmentEngine.progressCounters({
        totalItems: segmentTotalItems,
        segmentNumber,
        answeredInSegment: segmentAnswered,
        segmentQuestionTarget: segmentTarget,
        coveredItems: coverageCount(),
        masteredItems: masteryCount()
      });
    }

    function closeSegment() {
      if (!segmented || !segmentAnswered || segmentHistory.at(-1)?.sequence === segmentIndex) return;
      const counters = segmentCounters();
      segmentHistory.push(Object.freeze({
        sequence: segmentIndex,
        pass: segmentPass,
        ...counters.segment,
        coverage: counters.coverage,
        mastery: counters.mastery,
        carriedRetries: pendingCarry.length
      }));
    }

    function openSegment() {
      if (!segmented || (!futureQueue.length && !pendingCarry.length)) return false;
      const officialIndex = Math.min(segmentIndex, segmentPlan.segments.length - 1);
      const plannedQuestions = segmentIndex < segmentPlan.segments.length
        ? segmentPlan.segments[segmentIndex].plannedQuestions
        : segmentEngine.PREFERRED_QUESTIONS_PER_SEGMENT;
      const carries = pendingCarry;
      pendingCarry = [];
      const nextQueue = futureQueue.splice(0, plannedQuestions);
      const excluded = [
        ...carries.map(carry => entryKey(carry.entry)),
        ...nextQueue.map(entryKey)
      ];
      const requiredGap = carries.reduce((maximum, carry) => Math.max(maximum, carry.remainingGap), 0);
      while (nextQueue.length < requiredGap) {
        const spacer = makeDepthSpacer(excluded, nextQueue.length);
        if (!spacer) break;
        nextQueue.push(spacer);
      }
      for (let index = carries.length - 1; index >= 0; index -= 1) {
        const carry = carries[index];
        nextQueue.splice(Math.min(carry.remainingGap, nextQueue.length), 0, carry.entry);
      }
      while (nextQueue.length > segmentEngine.MAX_QUESTIONS_PER_SEGMENT) {
        const deferred = nextQueue.pop();
        if (deferred.phase === 'retry') pendingCarry.unshift({ entry: deferred, remainingGap: 0 });
        else if (!deferred.spacer) futureQueue.unshift(deferred);
      }
      if (!nextQueue.length) return false;
      queue = nextQueue;
      segmentNumber = officialIndex + 1;
      segmentPass = segmentIndex < segmentPlan.segments.length
        ? 1
        : segmentIndex - segmentPlan.segments.length + 2;
      segmentAnswered = 0;
      segmentTarget = queue.length;
      segmentIndex += 1;
      return true;
    }

    if (segmented) {
      futureQueue = queue;
      queue = [];
      openSegment();
    }

    function next() {
      if (currentQuestion) return currentQuestion;
      if (segmented && !queue.length) {
        closeSegment();
        if (!openSegment()) return null;
      }
      currentEntry = queue.shift() || null;
      if (!currentEntry) return null;
      const record = entryRecord(currentEntry);
      const state = currentEntry.index == null ? null : states[currentEntry.index];
      currentQuestion = options.questionFactory(record, {
        records: choiceRecords,
        index: currentEntry.index,
        mode: currentEntry.mode,
        phase: currentEntry.phase,
        filler: currentEntry.filler,
        state: state ? { ...state } : {},
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
      const state = entry.index == null ? null : states[entry.index];
      const correct = selectedAnswer === question.answer;
      let willReturn = false;
      answerCount += 1;
      if (segmented) segmentAnswered += 1;
      recentResults.push(correct);
      recentResults = recentResults.slice(-6);

      if (!entry.filler && state) {
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
          if (coverageFirst && segmented) {
            const placement = segmentEngine.retryPlacement({
              answeredScreens: segmentAnswered,
              remainingQueueEntries: queue.length
            });
            if (
              placement.disposition === 'schedule'
              && segmentTarget < segmentEngine.MAX_QUESTIONS_PER_SEGMENT
            ) {
              queue.splice(placement.insertAt, 0, retryEntry);
              segmentTarget += 1;
            } else {
              pendingCarry.push({
                entry: retryEntry,
                remainingGap: Math.max(0, segmentEngine.RETRY_GAP - queue.length)
              });
            }
          } else if (coverageFirst) queue.splice(Math.min(2, queue.length), 0, retryEntry);
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
        state: state ? { ...state } : {},
        willReturn,
        mastered: Boolean(!entry.filler && state && state.correctCount >= requiredCorrectCount)
      };
      currentEntry = null;
      currentQuestion = null;
      return result;
    }

    function progress() {
      const correctSignals = states.reduce((total, state) => total + Math.min(requiredCorrectCount, state.correctCount), 0);
      const targetSignals = states.length * requiredCorrectCount;
      const result = {
        mastered: states.filter(state => state.correctCount >= requiredCorrectCount).length,
        total: states.length,
        answered: answerCount,
        remaining: queue.length + (currentEntry ? 1 : 0),
        progressPercent: targetSignals ? Math.round((correctSignals / targetSignals) * 100) : 0
      };
      if (!segmented) return result;
      const counters = segmentCounters();
      return {
        ...result,
        remaining: queue.length + futureQueue.length + pendingCarry.length + (currentEntry ? 1 : 0),
        segment: Object.freeze({ ...counters.segment, pass: segmentPass }),
        coverage: counters.coverage,
        mastery: counters.mastery
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

    function debugSegments() {
      const current = segmentCounters();
      return {
        history: segmentHistory.map(segment => ({ ...segment })),
        current: current ? {
          sequence: segmentIndex,
          pass: segmentPass,
          ...current.segment,
          coverage: current.coverage,
          mastery: current.mastery,
          carriedRetries: pendingCarry.length
        } : null,
        futureEntries: futureQueue.length,
        pendingCarry: pendingCarry.map(carry => ({
          entry: { ...carry.entry },
          remainingGap: carry.remainingGap
        }))
      };
    }

    return { next, answer, progress, summary, debugQueue, debugSegments };
  }

  return { createSession, numericSeed };
});
