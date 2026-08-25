((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.EFN_PRACTICE_PANEL = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  function element(document, tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function loadStyles(document, href) {
    if (!href || document.querySelector(`link[data-efn-practice-css="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.efnPracticeCss = href;
    document.head.appendChild(link);
  }

  function setTextParts(document, node, parts, fallback) {
    node.replaceChildren();
    if (!Array.isArray(parts) || !parts.length) {
      node.textContent = fallback || '';
      return;
    }
    parts.forEach(part => {
      const span = element(document, 'span', '', part.text || '');
      if (part.lang) span.lang = part.lang;
      if (part.dir) span.dir = part.dir;
      node.appendChild(span);
    });
  }

  function mount(config) {
    const document = config.document || globalThis.document;
    if (!document || !config.anchor || typeof config.createSession !== 'function') return null;
    loadStyles(document, config.stylesheetHref);

    const section = element(document, 'section', `efn-practice${config.theme === 'dark' ? ' efn-practice--dark' : ''}`);
    section.lang = 'he';
    section.dir = 'rtl';
    section.dataset.analyticsIgnore = 'true';
    section.hidden = Boolean(config.initiallyHidden);

    const intro = element(document, 'div', 'efn-practice__intro');
    const badge = element(document, 'div', 'efn-practice__badge', config.badge || 'גל 1 · תרגול חדש');
    const title = element(document, 'h2', 'efn-practice__title', config.title || 'תרגול עם משוב');
    const description = element(document, 'p', 'efn-practice__description', config.description || 'עונים, מקבלים משוב ומנסים שוב בזמן הנכון.');
    const privacy = element(document, 'p', 'efn-practice__privacy', config.privacy || 'התשובות נשארות בדף ואינן נשמרות או נשלחות.');
    const start = element(document, 'button', 'efn-practice__primary', config.startLabel || 'מתחילים תרגול');
    start.type = 'button';
    start.dataset.analyticsLabel = 'practice-start';
    intro.append(badge, title, description, privacy, start);

    const activity = element(document, 'div', 'efn-practice__activity');
    activity.hidden = true;
    const activityHeader = element(document, 'div', 'efn-practice__header');
    const progress = element(document, 'div', 'efn-practice__progress', '0 / 0');
    const exit = element(document, 'button', 'efn-practice__quiet', 'חזרה לכרטיסיות');
    exit.type = 'button';
    exit.dataset.analyticsLabel = 'practice-exit';
    activityHeader.append(progress, exit);
    const mode = element(document, 'div', 'efn-practice__mode');
    const prompt = element(document, 'h3', 'efn-practice__prompt');
    const clue = element(document, 'p', 'efn-practice__clue');
    const speak = element(document, 'button', 'efn-practice__speak', '🔊 שמיעה');
    speak.type = 'button';
    speak.dataset.analyticsLabel = 'practice-audio';
    const choices = element(document, 'div', 'efn-practice__choices');
    choices.setAttribute('role', 'group');
    choices.setAttribute('aria-label', 'אפשרויות תשובה');
    const feedback = element(document, 'div', 'efn-practice__feedback');
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    feedback.tabIndex = -1;
    feedback.hidden = true;
    const feedbackTitle = element(document, 'strong', 'efn-practice__feedback-title');
    const feedbackText = element(document, 'span', 'efn-practice__feedback-text');
    feedback.append(feedbackTitle, feedbackText);
    const next = element(document, 'button', 'efn-practice__primary efn-practice__next', 'לשאלה הבאה');
    next.type = 'button';
    next.dataset.analyticsLabel = 'practice-next';
    next.hidden = true;
    activity.append(activityHeader, mode, prompt, clue, speak, choices, feedback, next);

    const summary = element(document, 'div', 'efn-practice__summary');
    summary.hidden = true;
    const summaryTitle = element(document, 'h3', 'efn-practice__title', 'סיכום הסבב');
    const summaryText = element(document, 'p', 'efn-practice__description');
    const again = element(document, 'button', 'efn-practice__primary', 'סבב נוסף');
    again.type = 'button';
    again.dataset.analyticsLabel = 'practice-again';
    summary.append(summaryTitle, summaryText, privacy.cloneNode(true), again);
    section.append(intro, activity, summary);
    config.anchor.insertAdjacentElement('afterend', section);

    let session = null;
    let currentQuestion = null;
    let answered = false;

    function syncProgress() {
      const state = session.progress();
      progress.textContent = `${state.mastered} מתוך ${state.total} נלמדו`;
    }

    function showSummary() {
      const state = session.summary();
      activity.hidden = true;
      summary.hidden = false;
      summaryText.textContent = `הצלחה מהניסיון הראשון: ${state.firstTry}. תוקן בעזרת המשוב: ${state.corrected}. נשאר לתרגול נוסף: ${state.unresolved}.`;
      summaryTitle.tabIndex = -1;
      summaryTitle.focus({ preventScroll: true });
    }

    function renderQuestion() {
      currentQuestion = session.next();
      if (!currentQuestion) {
        showSummary();
        return;
      }
      answered = false;
      feedback.hidden = true;
      feedback.classList.remove('is-positive', 'is-correction');
      next.hidden = true;
      mode.textContent = currentQuestion.modeLabel || 'ניסיון עצמאי';
      setTextParts(document, prompt, currentQuestion.promptParts, currentQuestion.prompt);
      prompt.lang = currentQuestion.promptLang || 'he';
      prompt.dir = currentQuestion.promptDir || (prompt.lang === 'he' ? 'rtl' : 'ltr');
      clue.textContent = currentQuestion.clue || '';
      clue.hidden = !currentQuestion.clue;
      clue.lang = currentQuestion.clueLang || 'en';
      clue.dir = currentQuestion.clueDir || (clue.lang === 'he' ? 'rtl' : 'ltr');
      speak.hidden = !currentQuestion.speakText || !('speechSynthesis' in globalThis);
      choices.replaceChildren();
      currentQuestion.choices.forEach((choice, index) => {
        const button = element(document, 'button', 'efn-practice__choice', choice);
        button.type = 'button';
        button.dataset.analyticsLabel = 'practice-answer';
        button.lang = currentQuestion.choiceLang || 'he';
        button.dir = currentQuestion.choiceDir || (button.lang === 'he' ? 'rtl' : 'ltr');
        button.addEventListener('click', () => submit(choice, button));
        choices.appendChild(button);
        if (index === 0) button.dataset.firstChoice = 'true';
      });
      syncProgress();
      const firstChoice = choices.querySelector('[data-first-choice="true"]');
      if (firstChoice) firstChoice.focus({ preventScroll: true });
    }

    function submit(value, selectedButton) {
      if (answered) return;
      answered = true;
      const result = session.answer(value);
      choices.querySelectorAll('button').forEach(button => {
        button.disabled = true;
        if (button.textContent === result.question.answer) button.classList.add('is-answer');
      });
      selectedButton.classList.add(result.correct ? 'is-selected-right' : 'is-selected-wrong');
      const message = config.formatFeedback(result);
      feedbackTitle.textContent = message.title;
      setTextParts(document, feedbackText, message.parts, message.text);
      feedback.classList.add(result.correct ? 'is-positive' : 'is-correction');
      feedback.hidden = false;
      next.hidden = false;
      next.textContent = result.willReturn ? 'המשך — נחזור לזה בזמן הנכון' : 'לשאלה הבאה';
      syncProgress();
      feedback.focus({ preventScroll: true });
    }

    function begin() {
      session = config.createSession();
      intro.hidden = true;
      summary.hidden = true;
      activity.hidden = false;
      renderQuestion();
      const reducedMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }

    start.addEventListener('click', begin);
    again.addEventListener('click', begin);
    next.addEventListener('click', renderQuestion);
    exit.addEventListener('click', () => {
      activity.hidden = true;
      summary.hidden = true;
      intro.hidden = false;
      start.focus({ preventScroll: true });
    });
    speak.addEventListener('click', () => {
      if (!currentQuestion?.speakText || !('speechSynthesis' in globalThis)) return;
      globalThis.EFNAnalyticsIgnoreNextAudio = true;
      globalThis.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.speakText);
      utterance.lang = 'en-US';
      utterance.rate = 0.82;
      globalThis.speechSynthesis.speak(utterance);
    });

    return {
      section,
      showLaunch() { section.hidden = false; },
      hideLaunch() { section.hidden = true; }
    };
  }

  return { mount, loadStyles, setTextParts };
});
