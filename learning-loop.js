((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.EFN_LEARNING_LOOP = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  const ERROR_GAP = 2;
  const SUCCESS_GAP_MIN = 4;
  const SUCCESS_GAP_MAX = 6;

  function successGap(seed) {
    const span = SUCCESS_GAP_MAX - SUCCESS_GAP_MIN + 1;
    return SUCCESS_GAP_MIN + (Math.abs(Number(seed) || 0) % span);
  }

  function insertAfterGap(rest, entry, gap, makeFiller) {
    const next = [...rest];
    let fillerIndex = 0;
    while (next.length < gap) {
      next.push(makeFiller(fillerIndex));
      fillerIndex += 1;
    }
    next.splice(gap, 0, entry);
    return next;
  }

  function scheduleAfterError(rest, entry, makeFiller) {
    return insertAfterGap(rest, entry, ERROR_GAP, makeFiller);
  }

  function scheduleAfterSuccess(rest, entry, seed, makeFiller) {
    return insertAfterGap(rest, entry, successGap(seed), makeFiller);
  }

  return {
    ERROR_GAP,
    SUCCESS_GAP_MIN,
    SUCCESS_GAP_MAX,
    successGap,
    insertAfterGap,
    scheduleAfterError,
    scheduleAfterSuccess
  };
});
