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

  function multiplierForStreak(streak) {
    const safeStreak = Math.max(0, Math.floor(Number(streak) || 0));
    if (safeStreak < 2) return 1;
    return Math.min(8, 2 ** Math.min(3, safeStreak - 1));
  }

  function rewardForStreak(streak, baseReward = 10) {
    const safeBase = Math.max(0, Math.floor(Number(baseReward) || 0));
    return safeBase * multiplierForStreak(streak);
  }

  function chestCountForPercent(percent, thresholds = [25, 50, 100]) {
    const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
    return thresholds.filter(threshold => safePercent >= Number(threshold)).length;
  }

  function questFeedback({ streak, multiplier, reward, chestOpened }) {
    let title = streak >= 4
      ? `אגדי ×${multiplier}! +${reward} מטבעות`
      : streak === 3
        ? `קומבו ×${multiplier}! +${reward} מטבעות`
        : streak === 2
          ? `רצף ×${multiplier}! +${reward} מטבעות`
          : `מעולה! +${reward} מטבעות`;
    if (chestOpened) title += ' · תיבת אוצר נפתחה!';
    return title;
  }

  function avoidRepeatedAnswerPosition(values, answer, previousIndex = -1, random = Math.random) {
    const output = [...values];
    const answerIndex = output.indexOf(answer);
    if (output.length < 2 || answerIndex < 0 || answerIndex !== previousIndex) {
      return { choices: output, answerIndex };
    }
    const alternatives = output.map((_, index) => index).filter(index => index !== answerIndex);
    const sample = Math.max(0, Math.min(.999999, Number(random?.()) || 0));
    const swapIndex = alternatives[Math.floor(sample * alternatives.length)];
    [output[answerIndex], output[swapIndex]] = [output[swapIndex], output[answerIndex]];
    return { choices: output, answerIndex: swapIndex };
  }

  function createQuestAudio(host = globalThis) {
    const AudioContext = host?.AudioContext || host?.webkitAudioContext;
    const scheduleLoop = host?.setInterval?.bind(host);
    const cancelLoop = host?.clearInterval?.bind(host);
    let context = null;
    let master = null;
    let ambienceTimer = null;
    let ambienceStep = 0;
    let muted = false;

    function ensure() {
      if (!AudioContext) return false;
      try {
        if (!context) {
          context = new AudioContext();
          master = context.createGain();
          master.gain.value = .16;
          master.connect(context.destination);
        }
        if (context.state === 'suspended') context.resume?.().catch?.(() => {});
        return true;
      } catch {
        context = null;
        master = null;
        return false;
      }
    }

    function tone(frequency, offset = 0, duration = .16, options = {}) {
      if (muted || !ensure()) return;
      const start = context.currentTime + .025 + Math.max(0, offset);
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = options.type || 'triangle';
      oscillator.frequency.setValueAtTime(Math.max(40, frequency), start);
      if (options.to) oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, options.to), start + duration);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(options.gain || .045, start + .018);
      gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(start);
      oscillator.stop(start + duration + .03);
    }

    function ambientPulse() {
      if (muted || !ensure()) return;
      const patterns = [
        [130.81, 196],
        [146.83, 220],
        [164.81, 246.94],
        [146.83, 196]
      ];
      const [low, high] = patterns[ambienceStep % patterns.length];
      ambienceStep += 1;
      tone(low, 0, .85, { gain: .018, type: 'triangle' });
      tone(high, .18, .22, { gain: .012, type: 'square' });
      tone(high * 1.5, .62, .16, { gain: .009, type: 'square' });
    }

    function startBackground() {
      if (muted || !ensure()) return;
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setTargetAtTime(.16, context.currentTime, .04);
      ambientPulse();
      if (ambienceTimer == null && scheduleLoop) ambienceTimer = scheduleLoop(ambientPulse, 3200);
    }

    function stopBackground() {
      if (ambienceTimer != null && cancelLoop) cancelLoop(ambienceTimer);
      ambienceTimer = null;
    }

    function stop() {
      stopBackground();
      if (context && master) master.gain.setTargetAtTime(.0001, context.currentTime, .035);
    }

    function cue(name, detail = {}) {
      if (muted || !ensure()) return;
      if (name === 'start') {
        [[164.81, 0], [220, .12], [329.63, .25]].forEach(([note, at]) => tone(note, at, .17, { gain: .05, type: 'square' }));
      } else if (name === 'question') {
        tone(220, 0, .09, { gain: .025, type: 'square', to: 246.94 });
      } else if (name === 'correct') {
        [[329.63, 0], [392, .32], [493.88, .68], [659.25, 1.02]].forEach(([note, at], index) => tone(note, at, .2, { gain: .045 - index * .005, type: 'square' }));
        if (detail.chestOpened) [[783.99, .92], [987.77, 1.16]].forEach(([note, at]) => tone(note, at, .28, { gain: .035, type: 'triangle' }));
      } else if (name === 'wrong') {
        tone(196, 0, .22, { gain: .04, type: 'square', to: 123.47 });
      } else if (name === 'summary') {
        [[261.63, 0], [329.63, .14], [392, .3], [523.25, .52]].forEach(([note, at]) => tone(note, at, .34, { gain: .045, type: 'triangle' }));
      }
    }

    function setMuted(value) {
      muted = Boolean(value);
      if (muted) stop();
      else {
        startBackground();
        cue('question');
      }
      return muted;
    }

    function duck(quiet) {
      if (!context || !master || muted) return;
      master.gain.setTargetAtTime(quiet ? .025 : .16, context.currentTime, .05);
    }

    return {
      supported: Boolean(AudioContext),
      start() { startBackground(); cue('start'); },
      stop,
      stopBackground,
      cue,
      duck,
      setMuted,
      isMuted: () => muted
    };
  }

  function mount(config) {
    const document = config.document || globalThis.document;
    if (!document || !config.anchor || typeof config.createSession !== 'function') return null;
    loadStyles(document, config.stylesheetHref);

    const section = element(document, 'section', `efn-practice${config.theme === 'dark' ? ' efn-practice--dark' : ''}${config.autoAdvanceCorrectMs ? ' efn-practice--fast-feedback' : ''}${config.blockQuest ? ' efn-practice--block-quest' : ''}`);
    section.lang = 'he';
    section.dir = 'rtl';
    section.dataset.analyticsIgnore = 'true';
    section.hidden = Boolean(config.initiallyHidden);

    const intro = element(document, 'div', 'efn-practice__intro');
    const badge = element(document, 'div', 'efn-practice__badge', config.badge || 'גל 1 · תרגול חדש');
    const title = element(document, 'h2', 'efn-practice__title', config.title || 'תרגול עם משוב');
    const description = element(document, 'p', 'efn-practice__description', config.description || 'עונים, מקבלים משוב ומנסים שוב בזמן הנכון.');
    const privacy = element(document, 'p', 'efn-practice__privacy', config.privacy || 'התשובות נשארות בדף ואינן נשמרות או נשלחות.');
    const startLabel = config.startLabel || 'מתחילים תרגול';
    const start = element(
      document,
      'button',
      `efn-practice__primary${config.blockQuest ? ' efn-practice__icon-action' : ''}`,
      config.blockQuest ? '▶' : startLabel
    );
    start.type = 'button';
    start.dataset.analyticsLabel = 'practice-start';
    start.setAttribute('aria-label', startLabel);
    start.setAttribute('title', startLabel);
    intro.append(badge, title, description, privacy, start);

    if (config.blockQuest) {
      const questMark = element(document, 'div', 'efn-practice__quest-mark');
      questMark.setAttribute('aria-hidden', 'true');
      const mapRoute = element(document, 'span', 'efn-practice__lost-map-route');
      const mapTarget = element(document, 'span', 'efn-practice__lost-map-target');
      const lostChest = element(document, 'span', 'efn-practice__lost-chest');
      const lostChestGlow = element(document, 'span', 'efn-practice__lost-chest-glow');
      const lostChestLid = element(document, 'span', 'efn-practice__lost-chest-lid');
      const lostChestBase = element(document, 'span', 'efn-practice__lost-chest-base');
      const lostChestLock = element(document, 'span', 'efn-practice__lost-chest-lock');
      const lostChestCoins = element(document, 'span', 'efn-practice__lost-chest-coins');
      lostChest.append(lostChestGlow, lostChestCoins, lostChestLid, lostChestBase, lostChestLock);
      questMark.append(mapRoute, mapTarget, lostChest);
      intro.insertBefore ? intro.insertBefore(questMark, start) : intro.append(questMark);
    }

    const activity = element(document, 'div', 'efn-practice__activity');
    activity.hidden = true;
    const activityHeader = element(document, 'div', 'efn-practice__header');
    const progress = element(document, 'div', 'efn-practice__progress');
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    progress.setAttribute('aria-valuenow', '0');
    const progressText = element(document, 'span', 'efn-practice__progress-text', config.showProgressPercent ? 'התקדמות 0%' : '0 מתוך 0 נלמדו');
    const progressTrack = element(document, 'span', 'efn-practice__progress-track');
    const progressFill = element(document, 'span', 'efn-practice__progress-fill');
    progressTrack.setAttribute('aria-hidden', 'true');
    progressTrack.append(progressFill);
    progress.append(progressText);
    if (config.showProgressPercent) progress.append(progressTrack);
    const exitLabel = config.exitLabel || 'חזרה לכרטיסיות';
    const exit = element(
      document,
      'button',
      `efn-practice__quiet${config.blockQuest ? ' efn-practice__icon-action' : ''}`,
      config.blockQuest ? '↩' : exitLabel
    );
    exit.type = 'button';
    exit.dataset.analyticsLabel = 'practice-exit';
    exit.setAttribute('aria-label', exitLabel);
    exit.setAttribute('title', exitLabel);
    const audio = createQuestAudio(config.audioHost || globalThis);
    const audioToggle = element(document, 'button', 'efn-practice__quiet efn-practice__audio-toggle efn-practice__icon-action', '🎵');
    audioToggle.type = 'button';
    audioToggle.dataset.analyticsLabel = 'practice-sound-toggle';
    audioToggle.setAttribute('aria-pressed', 'true');
    audioToggle.setAttribute('aria-label', 'כיבוי צלילי המשחק');
    audioToggle.setAttribute('title', 'כיבוי צלילי המשחק');
    audioToggle.hidden = !config.blockQuest || !audio.supported;
    const headerActions = element(document, 'div', 'efn-practice__header-actions');
    if (config.blockQuest) headerActions.append(audioToggle);
    headerActions.append(exit);
    activityHeader.append(progress, headerActions);
    const questHud = element(document, 'div', 'efn-practice__quest-hud');
    questHud.hidden = !config.blockQuest;
    const score = element(document, 'div', 'efn-practice__score');
    score.setAttribute('aria-label', 'נאספו 0 מטבעות');
    const scoreCoin = element(document, 'span', 'efn-practice__coin');
    scoreCoin.setAttribute('aria-hidden', 'true');
    ['rear', 'middle', 'front'].forEach(layer => {
      const coinPiece = element(document, 'span', `efn-practice__coin-piece efn-practice__coin-piece--${layer}`);
      scoreCoin.append(coinPiece);
    });
    const scoreValue = element(document, 'span', 'efn-practice__score-value', '0');
    score.append(scoreCoin, scoreValue);
    const multiplier = element(document, 'div', 'efn-practice__multiplier', '×1');
    multiplier.setAttribute('aria-label', 'מכפיל תגמול כפול 1');
    const treasureMap = element(document, 'div', 'efn-practice__treasure-map');
    treasureMap.setAttribute('role', 'img');
    treasureMap.setAttribute('aria-label', '0 מתוך 3 תיבות אוצר נפתחו');
    const chestNodes = [];
    (config.treasureChests || [25, 50, 100]).forEach((threshold, index) => {
      const stop = element(document, 'span', 'efn-practice__island');
      const chest = element(document, 'span', 'efn-practice__chest');
      chest.dataset.threshold = String(threshold);
      chest.dataset.chest = String(index + 1);
      chest.setAttribute('aria-hidden', 'true');
      const lid = element(document, 'span', 'efn-practice__chest-lid');
      const base = element(document, 'span', 'efn-practice__chest-base');
      chest.append(lid, base);
      stop.append(chest);
      treasureMap.append(stop);
      chestNodes.push(chest);
    });
    questHud.append(score, multiplier, treasureMap);
    const mode = element(document, 'div', 'efn-practice__mode');
    const prompt = element(document, 'h3', 'efn-practice__prompt');
    const clue = element(document, 'p', 'efn-practice__clue');
    const speak = element(
      document,
      'button',
      `efn-practice__speak${config.blockQuest ? ' efn-practice__icon-action' : ''}`,
      config.blockQuest ? '🔊' : '🔊 שמיעה'
    );
    speak.type = 'button';
    speak.dataset.analyticsLabel = 'practice-audio';
    speak.setAttribute('aria-label', 'השמעת המילה באנגלית');
    speak.setAttribute('title', 'השמעת המילה באנגלית');
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
    const transition = element(document, 'div', 'efn-practice__transition');
    transition.hidden = true;
    transition.setAttribute('aria-hidden', 'true');
    const transitionLabel = element(document, 'span', 'efn-practice__transition-label', 'בונה את השאלה הבאה…');
    const transitionTrack = element(document, 'span', 'efn-practice__transition-track');
    const transitionFill = element(document, 'span', 'efn-practice__transition-fill');
    const transitionBlocks = element(document, 'span', 'efn-practice__transition-blocks');
    for (let index = 0; index < 5; index += 1) transitionBlocks.append(element(document, 'i'));
    transitionTrack.append(transitionFill, transitionBlocks);
    transition.append(transitionLabel, transitionTrack);
    feedback.append(feedbackTitle, feedbackText, transition);
    const next = element(
      document,
      'button',
      `efn-practice__primary efn-practice__next${config.blockQuest ? ' efn-practice__icon-action' : ''}`,
      config.blockQuest ? '▶' : 'לשאלה הבאה'
    );
    next.type = 'button';
    next.dataset.analyticsLabel = 'practice-next';
    next.setAttribute('aria-label', 'לשאלה הבאה');
    next.setAttribute('title', 'לשאלה הבאה');
    next.hidden = true;
    activity.append(activityHeader, questHud, mode, prompt, clue, speak, choices, feedback, next);

    const summary = element(document, 'div', 'efn-practice__summary');
    summary.hidden = true;
    const summaryTitle = element(document, 'h3', 'efn-practice__title', 'סיכום הסבב');
    const summaryText = element(document, 'p', 'efn-practice__description');
    const summaryReward = element(document, 'p', 'efn-practice__summary-reward');
    summaryReward.hidden = !config.blockQuest;
    const again = element(
      document,
      'button',
      `efn-practice__primary${config.blockQuest ? ' efn-practice__icon-action' : ''}`,
      config.blockQuest ? '↻' : 'סבב נוסף'
    );
    again.type = 'button';
    again.dataset.analyticsLabel = 'practice-again';
    again.setAttribute('aria-label', 'סבב נוסף');
    again.setAttribute('title', 'סבב נוסף');
    const summaryExit = element(
      document,
      'button',
      `efn-practice__quiet${config.blockQuest ? ' efn-practice__icon-action' : ''}`,
      config.blockQuest ? '↩' : exitLabel
    );
    summaryExit.type = 'button';
    summaryExit.dataset.analyticsLabel = 'practice-exit';
    summaryExit.setAttribute('aria-label', exitLabel);
    summaryExit.setAttribute('title', exitLabel);
    const summaryActions = element(document, 'div', 'efn-practice__summary-actions');
    summaryActions.append(again, summaryExit);
    summary.append(summaryTitle, summaryReward, summaryText, privacy.cloneNode(true), summaryActions);
    section.append(intro, activity, summary);
    config.anchor.insertAdjacentElement('afterend', section);

    let session = null;
    let currentQuestion = null;
    let answered = false;
    let autoAdvanceTimer = null;
    let rewardScore = 0;
    let rewardStreak = 0;
    let unlockedChests = 0;
    let questionStartedAt = 0;
    let previousAnswerIndex = -1;
    let skipQuestionCue = false;
    const chestThresholds = config.treasureChests || [25, 50, 100];
    const schedule = typeof config.setTimeout === 'function' ? config.setTimeout : globalThis.setTimeout?.bind(globalThis);
    const cancel = typeof config.clearTimeout === 'function' ? config.clearTimeout : globalThis.clearTimeout?.bind(globalThis);

    function clearAutoAdvance() {
      if (autoAdvanceTimer == null) return;
      if (cancel) cancel(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }

    function measure(event, context = {}) {
      const analytics = config.analytics || globalThis.EFNAnalytics;
      if (!config.analyticsActivity || typeof analytics?.send !== 'function') return;
      analytics.send(event, { activity: config.analyticsActivity, ...context });
    }

    function setPlaying(playing) {
      if (!config.immersive) return;
      if (playing) {
        section.classList.add('is-playing');
        document.body?.classList?.add('efn-practice-is-playing');
      } else {
        section.classList.remove('is-playing');
        document.body?.classList?.remove('efn-practice-is-playing');
      }
    }

    function resetQuest() {
      rewardScore = 0;
      rewardStreak = 0;
      unlockedChests = 0;
      scoreValue.textContent = '0';
      score.setAttribute('aria-label', 'נאספו 0 מטבעות');
      multiplier.textContent = '×1';
      multiplier.setAttribute('aria-label', 'מכפיל תגמול כפול 1');
      treasureMap.setAttribute('aria-label', `0 מתוך ${chestNodes.length} תיבות אוצר נפתחו`);
      chestNodes.forEach(chest => chest.classList.remove('is-open'));
    }

    function syncQuest(percent, rewardEvent = null) {
      if (!config.blockQuest) return { openedNow: false, unlocked: 0 };
      const nextCount = chestCountForPercent(percent, chestThresholds);
      const openedNow = nextCount > unlockedChests;
      unlockedChests = nextCount;
      chestNodes.forEach((chest, index) => {
        if (index < unlockedChests) chest.classList.add('is-open');
        else chest.classList.remove('is-open');
      });
      scoreValue.textContent = String(rewardScore);
      score.setAttribute('aria-label', `נאספו ${rewardScore} מטבעות`);
      const activeMultiplier = rewardEvent?.multiplier || multiplierForStreak(rewardStreak);
      multiplier.textContent = `×${activeMultiplier}`;
      multiplier.setAttribute('aria-label', `מכפיל תגמול כפול ${activeMultiplier}`);
      treasureMap.setAttribute('aria-label', `${unlockedChests} מתוך ${chestNodes.length} תיבות אוצר נפתחו`);
      section.dataset.rewardStreak = String(rewardStreak);
      section.dataset.rewardMultiplier = String(activeMultiplier);
      section.dataset.rewardScore = String(rewardScore);
      return { openedNow, unlocked: unlockedChests };
    }

    function syncProgress() {
      const state = session.progress();
      if (!config.showProgressPercent) {
        progressText.textContent = `${state.mastered} מתוך ${state.total} נלמדו`;
        progress.setAttribute('aria-valuemax', String(state.total));
        progress.setAttribute('aria-valuenow', String(state.mastered));
        progress.setAttribute('aria-valuetext', progressText.textContent);
        return { ...state, percent: state.total ? Math.round((state.mastered / state.total) * 100) : 0 };
      }
      const percent = Number.isFinite(state.progressPercent)
        ? Math.max(0, Math.min(100, state.progressPercent))
        : state.total
          ? Math.round((state.mastered / state.total) * 100)
          : 0;
      progressText.textContent = `התקדמות ${percent}%`;
      progressFill.style.width = `${percent}%`;
      progress.setAttribute('aria-valuenow', String(percent));
      progress.setAttribute('aria-valuetext', `התקדמות ${percent} אחוזים`);
      return { ...state, percent };
    }

    function showSummary() {
      clearAutoAdvance();
      audio.stopBackground();
      audio.cue('summary');
      const state = session.summary();
      activity.hidden = true;
      summary.hidden = false;
      summaryText.textContent = `הצלחה מהניסיון הראשון: ${state.firstTry}. תוקן בעזרת המשוב: ${state.corrected}. נשאר לתרגול נוסף: ${state.unresolved}.`;
      summaryReward.textContent = `האוצר שלך: ${rewardScore} מטבעות · ${unlockedChests} מתוך ${chestNodes.length} תיבות נפתחו.`;
      measure('activity_complete', { outcome: config.analyticsActivity });
      summaryTitle.tabIndex = -1;
      summaryTitle.focus({ preventScroll: true });
    }

    function renderQuestion() {
      clearAutoAdvance();
      section.classList.remove('is-advancing');
      activity.classList.remove('is-question-entering');
      void activity.offsetWidth;
      activity.classList.add('is-question-entering');
      currentQuestion = session.next();
      if (!currentQuestion) {
        showSummary();
        return;
      }
      answered = false;
      questionStartedAt = typeof config.now === 'function'
        ? config.now()
        : globalThis.performance?.now?.() ?? Date.now();
      feedback.hidden = true;
      feedback.classList.remove('is-positive', 'is-correction');
      transition.hidden = true;
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
      const arranged = avoidRepeatedAnswerPosition(
        currentQuestion.choices,
        currentQuestion.answer,
        previousAnswerIndex,
        config.random || Math.random
      );
      previousAnswerIndex = arranged.answerIndex;
      arranged.choices.forEach((choice, index) => {
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
      if (skipQuestionCue) skipQuestionCue = false;
      else audio.cue('question');
      const firstChoice = choices.querySelector('[data-first-choice="true"]');
      if (firstChoice) firstChoice.focus({ preventScroll: true });
    }

    function submit(value, selectedButton) {
      if (answered) return;
      answered = true;
      const answeredAt = typeof config.now === 'function'
        ? config.now()
        : globalThis.performance?.now?.() ?? Date.now();
      const result = session.answer(value, { responseTimeMs: Math.max(0, answeredAt - questionStartedAt) });
      let rewardEvent = null;
      if (config.exponentialFeedback) {
        if (result.correct) {
          rewardStreak += 1;
          const activeMultiplier = multiplierForStreak(rewardStreak);
          const reward = rewardForStreak(rewardStreak, config.baseReward || 10);
          rewardScore += reward;
          rewardEvent = { streak: rewardStreak, multiplier: activeMultiplier, reward };
        } else {
          rewardStreak = 0;
        }
      }
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
      const nextLabel = result.correct && config.correctNextLabel
        ? config.correctNextLabel
        : 'לשאלה הבאה';
      next.textContent = config.blockQuest ? '▶' : nextLabel;
      next.setAttribute('aria-label', nextLabel);
      next.setAttribute('title', nextLabel);
      const progressState = syncProgress();
      const questState = syncQuest(progressState?.percent || 0, rewardEvent);
      if (result.correct && rewardEvent) {
        feedbackTitle.textContent = questFeedback({ ...rewardEvent, chestOpened: questState.openedNow });
      }
      feedback.focus({ preventScroll: true });
      const delay = Number(config.autoAdvanceCorrectMs);
      if (result.correct && delay > 0 && schedule) {
        section.classList.add('is-advancing');
        transition.hidden = false;
        if (transition.style?.setProperty) transition.style.setProperty('--advance-duration', `${delay}ms`);
        else transition.style['--advance-duration'] = `${delay}ms`;
        audio.cue('correct', { chestOpened: questState.openedNow });
        autoAdvanceTimer = schedule(() => {
          autoAdvanceTimer = null;
          renderQuestion();
        }, delay);
      } else if (!result.correct) {
        audio.cue('wrong');
      }
    }

    function begin() {
      session = config.createSession();
      resetQuest();
      previousAnswerIndex = -1;
      skipQuestionCue = true;
      setPlaying(true);
      audio.start();
      measure('button_click', { target: 'practice-start', label: 'practice-start' });
      intro.hidden = true;
      summary.hidden = true;
      activity.hidden = false;
      renderQuestion();
      const reducedMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }

    start.addEventListener('click', begin);
    again.addEventListener('click', begin);
    next.addEventListener('click', () => {
      clearAutoAdvance();
      renderQuestion();
    });
    audioToggle.addEventListener('click', () => {
      const muted = audio.setMuted(!audio.isMuted());
      audioToggle.textContent = muted ? '🔇' : '🎵';
      audioToggle.setAttribute('aria-pressed', String(!muted));
      const audioLabel = muted ? 'הפעלת צלילי המשחק' : 'כיבוי צלילי המשחק';
      audioToggle.setAttribute('aria-label', audioLabel);
      audioToggle.setAttribute('title', audioLabel);
    });
    function leave() {
      clearAutoAdvance();
      audio.stop();
      activity.hidden = true;
      summary.hidden = true;
      intro.hidden = false;
      setPlaying(false);
      start.focus({ preventScroll: true });
    }

    exit.addEventListener('click', leave);
    summaryExit.addEventListener('click', leave);
    speak.addEventListener('click', () => {
      if (!currentQuestion?.speakText || !('speechSynthesis' in globalThis)) return;
      globalThis.EFNAnalyticsIgnoreNextAudio = true;
      globalThis.speechSynthesis.cancel();
      audio.duck(true);
      const utterance = new SpeechSynthesisUtterance(currentQuestion.speakText);
      utterance.lang = 'en-US';
      utterance.rate = 0.82;
      utterance.onend = () => audio.duck(false);
      utterance.onerror = () => audio.duck(false);
      globalThis.speechSynthesis.speak(utterance);
    });

    return {
      section,
      getQuestState() {
        return { score: rewardScore, streak: rewardStreak, multiplier: multiplierForStreak(rewardStreak), chests: unlockedChests };
      },
      showLaunch() { section.hidden = false; },
      hideLaunch() { section.hidden = true; }
    };
  }

  return {
    mount,
    loadStyles,
    setTextParts,
    multiplierForStreak,
    rewardForStreak,
    chestCountForPercent,
    questFeedback,
    avoidRepeatedAnswerPosition,
    createQuestAudio
  };
});
