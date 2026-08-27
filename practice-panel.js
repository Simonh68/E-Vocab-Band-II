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

  function chestCountForSegment(completedSegment, thresholds = [2, 4, 6]) {
    const safeSegment = Math.max(0, Math.floor(Number(completedSegment) || 0));
    return thresholds.filter(threshold => safeSegment >= Number(threshold)).length;
  }

  function isGoldenBuzzerMilestone(answeredCount, milestone = 25) {
    return Math.max(0, Math.floor(Number(answeredCount) || 0)) === Math.max(1, Math.floor(Number(milestone) || 25));
  }

  function questFeedback({ streak, multiplier, reward, chestOpened }) {
    let title = streak >= 4
      ? `אגדי ×${multiplier}! +${reward}`
      : streak === 3
        ? `קומבו ×${multiplier}! +${reward}`
        : streak === 2
          ? `רצף ×${multiplier}! +${reward}`
          : `מעולה! +${reward}`;
    if (chestOpened) title += ' · אוצר!';
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

    const section = element(document, 'section', `efn-practice${config.theme === 'dark' ? ' efn-practice--dark' : ''}${config.autoAdvanceCorrectMs ? ' efn-practice--fast-feedback' : ''}${config.blockQuest ? ' efn-practice--block-quest' : ''}${config.segmentedUi ? ' efn-practice--segmented' : ''}`);
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
      const lostChest = element(document, 'img', 'efn-practice__lost-chest');
      lostChest.setAttribute('src', config.treasureAssetHref || '');
      lostChest.setAttribute('alt', '');
      lostChest.setAttribute('draggable', 'false');
      questMark.append(lostChest);
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
    const progressText = element(
      document,
      'span',
      'efn-practice__progress-text',
      config.segmentedUi
        ? 'מקטע 1/6 · 0/9'
        : config.showProgressPercent ? (config.blockQuest ? '0%' : 'התקדמות 0%') : '0 מתוך 0 נלמדו'
    );
    const progressTrack = element(document, 'span', 'efn-practice__progress-track');
    const progressFill = element(document, 'span', 'efn-practice__progress-fill');
    progressTrack.setAttribute('aria-hidden', 'true');
    progressTrack.append(progressFill);
    progress.append(progressText);
    if (config.showProgressPercent) progress.append(progressTrack);
    const progressFacts = element(document, 'span', 'efn-practice__progress-facts');
    progressFacts.hidden = !config.segmentedUi;
    const coverageProgress = element(document, 'span', 'efn-practice__progress-fact efn-practice__coverage-progress', 'כיסוי 0/0');
    coverageProgress.dataset.progressKind = 'coverage';
    const masteryProgress = element(document, 'span', 'efn-practice__progress-fact efn-practice__mastery-progress', 'שליטה 0/0');
    masteryProgress.dataset.progressKind = 'mastery';
    progressFacts.append(coverageProgress, masteryProgress);
    progress.append(progressFacts);
    if (config.segmentedUi) progress.dataset.progressKind = 'segment';
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
    const speechHost = config.speechHost || globalThis;
    const autoSpeakPreference = config.autoSpeakPreference || null;
    let autoSpeakEnabled = Boolean(autoSpeakPreference?.get?.());
    const autoSpeakToggle = element(document, 'button', 'efn-practice__quiet efn-practice__auto-speak-toggle efn-practice__icon-action', '🔊ᴬ');
    autoSpeakToggle.type = 'button';
    autoSpeakToggle.dataset.analyticsLabel = 'practice-auto-speak-toggle';
    autoSpeakToggle.hidden = !config.blockQuest || !('speechSynthesis' in speechHost);
    function syncAutoSpeakToggle() {
      if (autoSpeakEnabled) autoSpeakToggle.classList.add('is-active');
      else autoSpeakToggle.classList.remove('is-active');
      autoSpeakToggle.textContent = autoSpeakEnabled ? '🔊' : '🔇';
      autoSpeakToggle.setAttribute('aria-pressed', String(autoSpeakEnabled));
      const label = autoSpeakEnabled
        ? 'כיבוי השמעה אוטומטית של כל מילה'
        : 'הפעלת השמעה אוטומטית של כל מילה';
      autoSpeakToggle.setAttribute('aria-label', label);
      autoSpeakToggle.setAttribute('title', label);
    }
    syncAutoSpeakToggle();
    function groupLink(href, label, icon) {
      if (!href) return null;
      const link = element(document, 'a', 'efn-practice__quiet efn-practice__icon-action efn-practice__group-link', icon);
      link.setAttribute('href', href);
      link.setAttribute('aria-label', label);
      link.setAttribute('title', label);
      return link;
    }
    const previousGroup = groupLink(config.previousGroupHref, config.previousGroupLabel || 'לקבוצה הקודמת', '⏮');
    const nextGroup = groupLink(config.nextGroupHref, config.nextGroupLabel || 'לקבוצה הבאה', '⏭');
    const headerActions = element(document, 'div', 'efn-practice__header-actions');
    if (previousGroup) headerActions.append(previousGroup);
    if (nextGroup) headerActions.append(nextGroup);
    if (config.blockQuest) headerActions.append(audioToggle);
    headerActions.append(exit);
    activityHeader.append(progress, headerActions);
    const questHud = element(document, 'div', 'efn-practice__quest-hud');
    questHud.hidden = !config.blockQuest;
    const score = element(document, 'div', 'efn-practice__score');
    score.setAttribute('aria-label', 'נאספו 0 מטבעות');
    const scoreCoin = element(document, 'img', 'efn-practice__coin');
    scoreCoin.setAttribute('aria-hidden', 'true');
    scoreCoin.setAttribute('src', config.treasureAssetHref || '');
    scoreCoin.setAttribute('alt', '');
    scoreCoin.setAttribute('draggable', 'false');
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
      const chest = element(document, 'img', 'efn-practice__chest');
      chest.dataset.threshold = String(threshold);
      chest.dataset.chest = String(index + 1);
      chest.setAttribute('aria-hidden', 'true');
      chest.setAttribute('src', config.treasureAssetHref || '');
      chest.setAttribute('alt', '');
      chest.setAttribute('draggable', 'false');
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
    const questionBar = element(document, 'div', 'efn-practice__question-bar');
    questionBar.append(prompt, autoSpeakToggle, speak);
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
    activity.append(activityHeader, questHud, mode, questionBar, clue, choices, feedback, next);

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
    const summaryPreviousGroup = config.segmentedUi
      ? groupLink(config.previousGroupHref, config.previousGroupLabel || 'לקבוצה הקודמת', '⏮')
      : null;
    const summaryNextGroup = groupLink(config.nextGroupHref, config.nextGroupLabel || 'לקבוצה הבאה', '⏭');
    const summaryActions = element(document, 'div', 'efn-practice__summary-actions');
    if (summaryPreviousGroup) summaryActions.append(summaryPreviousGroup);
    summaryActions.append(again);
    if (summaryNextGroup) summaryActions.append(summaryNextGroup);
    summaryActions.append(summaryExit);
    summary.append(summaryTitle, summaryReward, summaryText, privacy.cloneNode(true), summaryActions);

    const checkpoint = element(document, 'div', 'efn-practice__checkpoint');
    checkpoint.hidden = true;
    checkpoint.setAttribute('role', 'region');
    checkpoint.setAttribute('aria-label', 'נקודת ביקורת');
    const checkpointBadge = element(document, 'div', 'efn-practice__badge', 'נקודת ביקורת');
    const checkpointChest = element(document, 'img', 'efn-practice__checkpoint-chest');
    checkpointChest.setAttribute('src', config.treasureAssetHref || '');
    checkpointChest.setAttribute('alt', '');
    checkpointChest.setAttribute('aria-hidden', 'true');
    checkpointChest.setAttribute('draggable', 'false');
    const checkpointTitle = element(document, 'h3', 'efn-practice__title', 'המקטע הושלם');
    const checkpointText = element(document, 'p', 'efn-practice__checkpoint-text');
    const checkpointReward = element(document, 'p', 'efn-practice__checkpoint-reward', 'תיבת אוצר נפתחה!');
    checkpointReward.hidden = true;
    const checkpointContinue = element(document, 'button', 'efn-practice__primary efn-practice__icon-action efn-practice__checkpoint-continue', '▶');
    checkpointContinue.type = 'button';
    checkpointContinue.dataset.analyticsLabel = 'practice-segment-continue';
    checkpointContinue.setAttribute('aria-label', 'למקטע הבא');
    checkpointContinue.setAttribute('title', 'למקטע הבא');
    const checkpointPreviousGroup = groupLink(config.previousGroupHref, config.previousGroupLabel || 'לקבוצה הקודמת', '⏮');
    const checkpointNextGroup = groupLink(config.nextGroupHref, config.nextGroupLabel || 'לקבוצה הבאה', '⏭');
    const checkpointExit = element(document, 'button', 'efn-practice__quiet efn-practice__icon-action', '↩');
    checkpointExit.type = 'button';
    checkpointExit.dataset.analyticsLabel = 'practice-exit';
    checkpointExit.setAttribute('aria-label', exitLabel);
    checkpointExit.setAttribute('title', exitLabel);
    const checkpointActions = element(document, 'div', 'efn-practice__checkpoint-actions');
    if (checkpointPreviousGroup) checkpointActions.append(checkpointPreviousGroup);
    checkpointActions.append(checkpointContinue);
    if (checkpointNextGroup) checkpointActions.append(checkpointNextGroup);
    checkpointActions.append(checkpointExit);
    checkpoint.append(checkpointBadge, checkpointChest, checkpointTitle, checkpointText, checkpointReward, checkpointActions);
    checkpoint.hidden = true;

    const goldenBuzzer = element(document, 'div', 'efn-practice__golden-buzzer');
    goldenBuzzer.hidden = true;
    goldenBuzzer.setAttribute('role', 'status');
    goldenBuzzer.setAttribute('aria-live', 'assertive');
    goldenBuzzer.setAttribute('aria-label', 'Golden Buzzer — עשרים וחמישה כרטיסים הושלמו');
    const goldenBurst = element(document, 'div', 'efn-practice__golden-burst');
    const goldenBlock = element(document, 'div', 'efn-practice__golden-block', '★');
    const goldenTitle = element(document, 'div', 'efn-practice__golden-title', 'GOLDEN BUZZER!');
    const goldenText = element(document, 'div', 'efn-practice__golden-text', '25 כרטיסים הושלמו');
    const goldenParticles = element(document, 'div', 'efn-practice__golden-particles');
    for (let index = 0; index < 12; index += 1) {
      const particle = element(document, 'i', 'efn-practice__golden-particle');
      particle.style['--particle-index'] = index;
      goldenParticles.appendChild(particle);
    }
    goldenBuzzer.append(goldenBurst, goldenParticles, goldenBlock, goldenTitle, goldenText);

    section.append(intro, activity);
    if (config.segmentedUi) section.append(checkpoint);
    section.append(summary, goldenBuzzer);
    config.anchor.insertAdjacentElement('afterend', section);

    let session = null;
    let currentQuestion = null;
    let answered = false;
    let lastAnswerCorrect = null;
    let autoAdvanceTimer = null;
    let autoSpeakTimer = null;
    let goldenBuzzerTimer = null;
    let answeredCardCount = 0;
    let rewardScore = 0;
    let rewardStreak = 0;
    let unlockedChests = 0;
    let questionStartedAt = 0;
    let previousAnswerIndex = -1;
    let skipQuestionCue = false;
    let pendingCheckpoint = null;
    const chestThresholds = config.treasureChests || [25, 50, 100];
    const segmentChestThresholds = config.treasureChestSegments || [2, 4, 6];
    const schedule = typeof config.setTimeout === 'function' ? config.setTimeout : globalThis.setTimeout?.bind(globalThis);
    const cancel = typeof config.clearTimeout === 'function' ? config.clearTimeout : globalThis.clearTimeout?.bind(globalThis);

    function clearAutoAdvance() {
      if (autoAdvanceTimer == null) return;
      if (cancel) cancel(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }

    function clearAutoSpeak() {
      if (autoSpeakTimer == null) return;
      if (cancel) cancel(autoSpeakTimer);
      autoSpeakTimer = null;
    }

    function clearGoldenBuzzer() {
      if (goldenBuzzerTimer != null && cancel) cancel(goldenBuzzerTimer);
      goldenBuzzerTimer = null;
      goldenBuzzer.hidden = true;
      goldenBuzzer.classList.remove('is-active');
    }

    function showGoldenBuzzer() {
      clearGoldenBuzzer();
      goldenBuzzer.hidden = false;
      void goldenBuzzer.offsetWidth;
      goldenBuzzer.classList.add('is-active');
      if (schedule) {
        goldenBuzzerTimer = schedule(() => {
          goldenBuzzerTimer = null;
          goldenBuzzer.hidden = true;
          goldenBuzzer.classList.remove('is-active');
        }, Number(config.goldenBuzzerDurationMs) || 2600);
      }
    }

    function flashCurrentWord() {
      prompt.classList.remove('is-pronunciation-flashing');
      void prompt.offsetWidth;
      prompt.classList.add('is-pronunciation-flashing');
    }

    prompt.addEventListener('animationend', () => {
      prompt.classList.remove('is-pronunciation-flashing');
    });

    function speakCurrentQuestion(repetitions = 1, emphasize = false, repeatPauseMs = 700, onComplete) {
      if (!currentQuestion?.speakText || !('speechSynthesis' in speechHost)) return;
      speechHost.EFNAnalyticsIgnoreNextAudio = true;
      speechHost.speechSynthesis.cancel();
      audio.duck(true);
      if (emphasize) flashCurrentWord();
      const Utterance = speechHost.SpeechSynthesisUtterance || globalThis.SpeechSynthesisUtterance;
      if (typeof Utterance !== 'function') {
        audio.duck(false);
        onComplete?.();
        return;
      }
      let remaining = Math.max(1, Number(repetitions) || 1);
      const speakNext = () => {
        const finalUtterance = remaining === 1;
        const utterance = new Utterance(currentQuestion.speakText);
        utterance.lang = 'en-US';
        utterance.rate = 0.82;
        utterance.onend = () => {
          if (finalUtterance) {
            audio.duck(false);
            onComplete?.();
            return;
          }
          if (schedule) {
            autoSpeakTimer = schedule(() => {
              autoSpeakTimer = null;
              speakNext();
            }, Math.max(0, Number(repeatPauseMs) || 700));
          }
        };
        utterance.onerror = () => {
          audio.duck(false);
          onComplete?.();
        };
        speechHost.speechSynthesis.speak(utterance);
        remaining -= 1;
      };
      speakNext();
    }

    function scheduleAutoSpeak(delayOverride, repetitions = 1, emphasize = false, onComplete, requireAnswered = true) {
      clearAutoSpeak();
      if (!autoSpeakEnabled || (requireAnswered && !answered) || !schedule || !currentQuestion?.speakText) return;
      const scheduledQuestion = currentQuestion;
      const configuredDelay = delayOverride ?? config.autoSpeakDelayMs ?? 1000;
      const delay = Number.isFinite(Number(configuredDelay))
        ? Math.max(0, Number(configuredDelay))
        : 1000;
      autoSpeakTimer = schedule(() => {
        autoSpeakTimer = null;
        if ((!requireAnswered || answered) && currentQuestion === scheduledQuestion) {
          speakCurrentQuestion(repetitions, emphasize, config.autoSpeakRepeatPauseMs ?? 700, onComplete);
        }
      }, delay);
    }

    function advanceAfterPronunciation(delayOverride) {
      if (!schedule) return advance();
      autoAdvanceTimer = schedule(() => {
        autoAdvanceTimer = null;
        advance();
      }, Number(delayOverride ?? config.autoAdvanceAfterSpeechMs) || 200);
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

    function syncQuest(progressState, rewardEvent = null) {
      if (!config.blockQuest) return { openedNow: false, unlocked: 0 };
      const completedSegment = progressState?.segment
        ? progressState.segment.answered >= progressState.segment.target
          ? progressState.segment.number
          : Math.max(0, progressState.segment.number - 1)
        : 0;
      const calculatedCount = config.segmentedUi
        ? chestCountForSegment(completedSegment, segmentChestThresholds)
        : chestCountForPercent(progressState?.percent || 0, chestThresholds);
      const nextCount = Math.max(unlockedChests, calculatedCount);
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
      if (config.segmentedUi && state.segment && state.coverage && state.mastery) {
        const segmentPercent = state.segment.target
          ? Math.round((state.segment.answered / state.segment.target) * 100)
          : 0;
        const passLabel = state.segment.pass > 1
          ? `סבב תיקון ${state.segment.pass - 1}`
          : `מקטע ${state.segment.number}/${state.segment.total}`;
        progressText.textContent = `${passLabel} · ${state.segment.answered}/${state.segment.target}`;
        progressFill.style.width = `${segmentPercent}%`;
        progress.setAttribute('aria-valuemax', String(state.segment.target));
        progress.setAttribute('aria-valuenow', String(state.segment.answered));
        progress.setAttribute('aria-valuetext', `${passLabel}, ${state.segment.answered} מתוך ${state.segment.target} שאלות`);
        coverageProgress.textContent = `כיסוי ${state.coverage.current}/${state.coverage.total}`;
        coverageProgress.dataset.current = String(state.coverage.current);
        coverageProgress.dataset.total = String(state.coverage.total);
        masteryProgress.textContent = `שליטה ${state.mastery.current}/${state.mastery.total}`;
        masteryProgress.dataset.current = String(state.mastery.current);
        masteryProgress.dataset.total = String(state.mastery.total);
        return { ...state, percent: segmentPercent };
      }
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
      progressText.textContent = config.showProgressCount
        ? `${state.mastered}/${state.total}`
        : config.blockQuest ? `${percent}%` : `התקדמות ${percent}%`;
      progressFill.style.width = `${percent}%`;
      progress.setAttribute('aria-valuenow', String(percent));
      progress.setAttribute(
        'aria-valuetext',
        config.showProgressCount
          ? `${state.mastered} מתוך ${state.total} מילים הושלמו`
          : `התקדמות ${percent} אחוזים`
      );
      return { ...state, percent };
    }

    function showCheckpoint(progressState, questState) {
      clearAutoAdvance();
      clearAutoSpeak();
      section.classList.remove('is-advancing');
      pendingCheckpoint = null;
      activity.hidden = true;
      summary.hidden = true;
      checkpoint.hidden = false;
      const segment = progressState.segment;
      const correctionPass = segment.pass > 1;
      checkpoint.dataset.segment = String(segment.number);
      checkpoint.dataset.pass = String(segment.pass);
      checkpoint.dataset.chestOpened = String(Boolean(questState.openedNow));
      checkpointTitle.textContent = correctionPass
        ? 'סבב התיקון הושלם'
        : `מקטע ${segment.number} מתוך ${segment.total} הושלם`;
      checkpointText.textContent = `כיסוי ${progressState.coverage.current}/${progressState.coverage.total} · שליטה ${progressState.mastery.current}/${progressState.mastery.total}`;
      checkpointReward.hidden = !questState.openedNow;
      if (questState.openedNow) checkpointChest.classList.add('is-open');
      else checkpointChest.classList.remove('is-open');
      const continueLabel = progressState.remaining > 0 ? 'למקטע הבא' : 'לסיכום';
      checkpointContinue.setAttribute('aria-label', continueLabel);
      checkpointContinue.setAttribute('title', continueLabel);
      checkpointTitle.tabIndex = -1;
      checkpointTitle.focus({ preventScroll: true });
    }

    function advance() {
      if (pendingCheckpoint) {
        const checkpointState = pendingCheckpoint;
        showCheckpoint(checkpointState.progress, checkpointState.quest);
        return;
      }
      renderQuestion();
    }

    function showSummary() {
      clearAutoAdvance();
      clearAutoSpeak();
      audio.stopBackground();
      audio.cue('summary');
      const state = session.summary();
      const overall = typeof config.getOverallProgress === 'function' ? config.getOverallProgress() : null;
      activity.hidden = true;
      checkpoint.hidden = true;
      summary.hidden = false;
      if (config.blockQuest) {
        const allSeen = overall && overall.total > 0 && overall.started >= overall.total;
        summaryTitle.textContent = allSeen ? 'כל המילים נבדקו' : 'הסבב הושלם';
        summaryText.textContent = overall
          ? `${overall.started}/${overall.total}`
          : `${state.firstTry + state.corrected}/${state.total}`;
      } else {
        summaryText.textContent = `הצלחה מהניסיון הראשון: ${state.firstTry}. תוקן בעזרת המשוב: ${state.corrected}. נשאר לתרגול נוסף: ${state.unresolved}.`;
      }
      summaryReward.textContent = `האוצר שלך: ${rewardScore} מטבעות · ${unlockedChests} מתוך ${chestNodes.length} תיבות נפתחו.`;
      measure('activity_complete', { outcome: config.analyticsActivity });
      summaryTitle.tabIndex = -1;
      summaryTitle.focus({ preventScroll: true });
    }

    function renderQuestion() {
      clearAutoAdvance();
      clearAutoSpeak();
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
      lastAnswerCorrect = null;
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
      speak.hidden = true;
      choices.replaceChildren();
      const arranged = avoidRepeatedAnswerPosition(
        currentQuestion.choices,
        currentQuestion.answer,
        previousAnswerIndex,
        config.random || Math.random
      );
      previousAnswerIndex = arranged.answerIndex;
      choices.dataset.choiceCount = String(arranged.choices.length);
      arranged.choices.forEach((choice, index) => {
        const button = element(document, 'button', 'efn-practice__choice', choice);
        button.type = 'button';
        button.dataset.analyticsLabel = 'practice-answer';
        button.lang = currentQuestion.choiceLang || 'he';
        button.dir = currentQuestion.choiceDir || (button.lang === 'he' ? 'rtl' : 'ltr');
        const choiceLength = String(choice || '').trim().length;
        button.dataset.choiceSize = choiceLength >= 16 ? 'long' : choiceLength >= 11 ? 'medium' : 'short';
        button.addEventListener('click', () => submit(choice, button));
        choices.appendChild(button);
        if (index === 0) button.dataset.firstChoice = 'true';
      });
      syncProgress();
      if (skipQuestionCue) skipQuestionCue = false;
      else audio.cue('question');
      if (autoSpeakEnabled) scheduleAutoSpeak(0, 2, true, null, false);
      const firstChoice = choices.querySelector('[data-first-choice="true"]');
      if (firstChoice) firstChoice.focus({ preventScroll: true });
    }

    function submit(value, selectedButton) {
      if (answered) return;
      answered = true;
      speak.hidden = !currentQuestion?.speakText || !('speechSynthesis' in speechHost);
      const answeredAt = typeof config.now === 'function'
        ? config.now()
        : globalThis.performance?.now?.() ?? Date.now();
      const result = session.answer(value, { responseTimeMs: Math.max(0, answeredAt - questionStartedAt) });
      lastAnswerCorrect = Boolean(result.correct);
      answeredCardCount += 1;
      if (isGoldenBuzzerMilestone(answeredCardCount, config.goldenBuzzerMilestone || 25)) showGoldenBuzzer();
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
      feedbackText.hidden = Boolean(config.blockQuest && result.correct);
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
      const questState = syncQuest(progressState, rewardEvent);
      const segmentComplete = Boolean(
        config.segmentedUi
        && progressState?.segment
        && progressState.segment.answered >= progressState.segment.target
      );
      if (segmentComplete) {
        pendingCheckpoint = { progress: progressState, quest: questState };
        const checkpointLabel = 'לנקודת הביקורת';
        if (!config.blockQuest) next.textContent = checkpointLabel;
        next.setAttribute('aria-label', checkpointLabel);
        next.setAttribute('title', checkpointLabel);
      }
      transitionLabel.textContent = segmentComplete ? 'מסיימים את המקטע…' : 'בונה את השאלה הבאה…';
      if (result.correct && rewardEvent) {
        feedbackTitle.textContent = questFeedback({ ...rewardEvent, chestOpened: questState.openedNow });
      }
      feedback.focus({ preventScroll: true });
      const delay = result.correct ? Number(config.autoAdvanceCorrectMs) : Number(config.autoAdvanceWrongMs);
      if ((autoSpeakEnabled || delay > 0) && schedule) {
        section.classList.add('is-advancing');
        transition.hidden = !result.correct;
        if (result.correct) {
          const transitionDelay = autoSpeakEnabled ? 2500 : delay;
          if (transition.style?.setProperty) transition.style.setProperty('--advance-duration', `${transitionDelay}ms`);
          else transition.style['--advance-duration'] = `${transitionDelay}ms`;
          audio.cue('correct', { chestOpened: questState.openedNow });
        } else {
          audio.cue('wrong');
        }
        if (autoSpeakEnabled) {
          if (result.correct) {
            scheduleAutoSpeak(
              config.correctSpeakDelayMs ?? 500,
              1,
              false,
              () => advanceAfterPronunciation(config.correctAdvanceAfterSpeechMs ?? 300)
            );
          } else {
            scheduleAutoSpeak(0, 2, true, advanceAfterPronunciation);
          }
        } else {
          autoAdvanceTimer = schedule(() => {
            autoAdvanceTimer = null;
            advance();
          }, delay);
        }
      } else if (!result.correct) {
        audio.cue('wrong');
      }
    }

    function begin() {
      session = config.createSession();
      resetQuest();
      previousAnswerIndex = -1;
      skipQuestionCue = true;
      pendingCheckpoint = null;
      answeredCardCount = 0;
      clearGoldenBuzzer();
      setPlaying(true);
      audio.start();
      measure('button_click', { target: 'practice-start', label: 'practice-start' });
      intro.hidden = true;
      checkpoint.hidden = true;
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
      advance();
    });
    checkpointContinue.addEventListener('click', () => {
      checkpoint.hidden = true;
      activity.hidden = false;
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
    autoSpeakToggle.addEventListener('click', () => {
      autoSpeakEnabled = !autoSpeakEnabled;
      autoSpeakPreference?.set?.(autoSpeakEnabled);
      syncAutoSpeakToggle();
      if (autoSpeakEnabled) {
        clearAutoAdvance();
        if (answered && lastAnswerCorrect) {
          scheduleAutoSpeak(
            config.correctSpeakDelayMs ?? 500,
            1,
            false,
            () => advanceAfterPronunciation(config.correctAdvanceAfterSpeechMs ?? 300)
          );
        }
        else if (answered) scheduleAutoSpeak(0, 2, true, advanceAfterPronunciation);
        else scheduleAutoSpeak(0, 2, true, null, false);
      }
      else clearAutoSpeak();
    });
    function leave() {
      clearAutoAdvance();
      clearAutoSpeak();
      clearGoldenBuzzer();
      audio.stop();
      activity.hidden = true;
      checkpoint.hidden = true;
      summary.hidden = true;
      intro.hidden = false;
      setPlaying(false);
      start.focus({ preventScroll: true });
    }

    exit.addEventListener('click', leave);
    checkpointExit.addEventListener('click', leave);
    summaryExit.addEventListener('click', leave);
    speak.addEventListener('click', () => {
      clearAutoSpeak();
      speakCurrentQuestion(2, false, config.autoSpeakRepeatPauseMs ?? 700);
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
    chestCountForSegment,
    isGoldenBuzzerMilestone,
    questFeedback,
    avoidRepeatedAnswerPosition,
    createQuestAudio
  };
});
