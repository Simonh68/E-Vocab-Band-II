(function (root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) module.exports = api;
  if (!root) return;

  root.EFN_FLASHCARD_NAVIGATION = api;
  api.install(root);
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  function resetCardForNavigation(card) {
    if (!card?.classList?.contains('flipped') || !card.style) return false;

    const previousTransition = card.style.transition;
    card.style.transition = 'none';
    card.classList.remove('flipped');
    void card.offsetWidth;
    card.style.transition = previousTransition;
    return true;
  }

  function install(root) {
    if (!root || typeof root.updateCard !== 'function') return false;
    if (root.updateCard.answerFlashGuardInstalled) return false;

    const originalUpdateCard = root.updateCard;
    function guardedUpdateCard(...args) {
      resetCardForNavigation(root.document?.getElementById('flashcard'));
      return originalUpdateCard.apply(this, args);
    }

    guardedUpdateCard.answerFlashGuardInstalled = true;
    root.updateCard = guardedUpdateCard;
    return true;
  }

  return { install, resetCardForNavigation };
});
