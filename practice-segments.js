((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.EFN_PRACTICE_SEGMENTS = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  const SUPPORTED_GROUP_ITEM_COUNTS = Object.freeze([54, 55]);
  const SEGMENT_COUNT = 6;
  const PREFERRED_QUESTIONS_PER_SEGMENT = 9;
  const MAX_QUESTIONS_PER_SEGMENT = 10;
  const RETRY_GAP = 2;
  const REQUIRED_MASTERY_EVIDENCE = 2;
  const CHEST_SEGMENTS = Object.freeze([2, 4, 6]);

  function integer(value, label, minimum = 0) {
    const number = Number(value);
    if (!Number.isInteger(number) || number < minimum) {
      throw new TypeError(`${label} must be an integer of at least ${minimum}.`);
    }
    return number;
  }

  function supportedItemCount(value) {
    const totalItems = integer(value, 'totalItems', 1);
    if (!SUPPORTED_GROUP_ITEM_COUNTS.includes(totalItems)) {
      throw new RangeError(`Segmented Band II groups must contain 54 or 55 items, received ${totalItems}.`);
    }
    return totalItems;
  }

  function buildSegmentPlan(value) {
    const totalItems = supportedItemCount(value);
    const sizes = Array.from({ length: SEGMENT_COUNT }, () => PREFERRED_QUESTIONS_PER_SEGMENT);
    sizes[sizes.length - 1] += totalItems - (SEGMENT_COUNT * PREFERRED_QUESTIONS_PER_SEGMENT);
    let coveredBefore = 0;
    const segments = sizes.map((plannedQuestions, index) => {
      const number = index + 1;
      coveredBefore += plannedQuestions;
      return Object.freeze({
        number,
        plannedQuestions,
        maxQuestionScreens: MAX_QUESTIONS_PER_SEGMENT,
        coverageCheckpoint: coveredBefore,
        celebration: true,
        chest: CHEST_SEGMENTS.includes(number),
        completionBoundary: number === SEGMENT_COUNT ? 'group' : 'segment'
      });
    });
    return Object.freeze({
      totalItems,
      segmentCount: SEGMENT_COUNT,
      perfectQuestionScreens: totalItems,
      segments: Object.freeze(segments),
      celebrationCheckpoints: Object.freeze(segments.map(segment => segment.coverageCheckpoint)),
      chestCheckpoints: Object.freeze(segments.filter(segment => segment.chest).map(segment => segment.coverageCheckpoint))
    });
  }

  function retryPlacement({ answeredScreens, remainingQueueEntries }) {
    const answered = integer(answeredScreens, 'answeredScreens');
    const remaining = integer(remainingQueueEntries, 'remainingQueueEntries');
    if (answered > MAX_QUESTIONS_PER_SEGMENT) {
      throw new RangeError(`answeredScreens cannot exceed ${MAX_QUESTIONS_PER_SEGMENT}.`);
    }
    const requiredScreens = RETRY_GAP + 1;
    const fitsScreenBudget = answered + requiredScreens <= MAX_QUESTIONS_PER_SEGMENT;
    const hasTwoInterveningQuestions = remaining >= RETRY_GAP;
    const inCurrentSegment = fitsScreenBudget && hasTwoInterveningQuestions;
    return Object.freeze({
      disposition: inCurrentSegment ? 'schedule' : 'carry',
      insertAt: inCurrentSegment ? RETRY_GAP : null,
      interveningQuestions: RETRY_GAP,
      maxQuestionScreens: MAX_QUESTIONS_PER_SEGMENT
    });
  }

  function progressCounters({
    totalItems,
    segmentNumber,
    answeredInSegment,
    segmentQuestionTarget,
    coveredItems,
    masteredItems
  }) {
    const plan = buildSegmentPlan(totalItems);
    const number = integer(segmentNumber, 'segmentNumber', 1);
    if (number > plan.segmentCount) throw new RangeError(`segmentNumber cannot exceed ${plan.segmentCount}.`);
    const segment = plan.segments[number - 1];
    const target = segmentQuestionTarget == null
      ? segment.plannedQuestions
      : integer(segmentQuestionTarget, 'segmentQuestionTarget', segment.plannedQuestions);
    if (target > MAX_QUESTIONS_PER_SEGMENT) {
      throw new RangeError(`segmentQuestionTarget cannot exceed ${MAX_QUESTIONS_PER_SEGMENT}.`);
    }
    const answered = integer(answeredInSegment, 'answeredInSegment');
    if (answered > target) throw new RangeError('answeredInSegment cannot exceed segmentQuestionTarget.');
    const covered = integer(coveredItems, 'coveredItems');
    const mastered = integer(masteredItems, 'masteredItems');
    if (covered > plan.totalItems || mastered > plan.totalItems || mastered > covered) {
      throw new RangeError('Group counters must stay within totalItems and mastery cannot exceed coverage.');
    }
    return Object.freeze({
      segment: Object.freeze({
        number,
        total: plan.segmentCount,
        answered,
        target,
        maxQuestionScreens: MAX_QUESTIONS_PER_SEGMENT
      }),
      coverage: Object.freeze({ current: covered, total: plan.totalItems }),
      mastery: Object.freeze({
        current: mastered,
        total: plan.totalItems,
        requiredEvidence: REQUIRED_MASTERY_EVIDENCE
      })
    });
  }

  function completionState({ totalItems, coveredItems, masteredItems }) {
    const total = supportedItemCount(totalItems);
    const covered = integer(coveredItems, 'coveredItems');
    const mastered = integer(masteredItems, 'masteredItems');
    if (covered > total || mastered > total || mastered > covered) {
      throw new RangeError('Completion values must stay within totalItems and mastery cannot exceed coverage.');
    }
    return Object.freeze({
      coverageComplete: covered === total,
      groupMastered: mastered === total,
      state: mastered === total ? 'mastered' : covered === total ? 'coverage_complete' : 'in_progress'
    });
  }

  return {
    SUPPORTED_GROUP_ITEM_COUNTS,
    SEGMENT_COUNT,
    PREFERRED_QUESTIONS_PER_SEGMENT,
    MAX_QUESTIONS_PER_SEGMENT,
    RETRY_GAP,
    REQUIRED_MASTERY_EVIDENCE,
    CHEST_SEGMENTS,
    buildSegmentPlan,
    retryPlacement,
    progressCounters,
    completionState
  };
});
