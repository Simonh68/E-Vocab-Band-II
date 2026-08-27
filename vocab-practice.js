((root, factory) => {
  const api = factory(
    root && root.EFN_PRACTICE_SESSION,
    root && root.EFN_PRACTICE_PANEL,
    root && root.EFN_CORE1_PROGRESS
  );
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.EFN_VOCAB_PRACTICE = api;
    const scriptUrl = root.document?.currentScript?.src || '';
    const start = () => api.prepareAndMount(root, scriptUrl);
    if (root.document?.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start, { once: true });
    else if (root.document) start();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, (sessionApi, panelApi, progressApi) => {
  function clean(value) {
    return String(value ?? '').trim();
  }

  function normalizedPath(pathname) {
    return decodeURIComponent(String(pathname || '')).replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase();
  }

  function rolloutFor(pathname, map) {
    const path = normalizedPath(pathname);
    return Object.entries(map || {}).find(([key]) => {
      const normalizedKey = normalizedPath(key);
      return path === normalizedKey || path.endsWith(`/${normalizedKey}`);
    })?.[1] || null;
  }

  function seededShuffle(values, seed) {
    const output = [...values];
    let state = (Number(seed) || 1) >>> 0;
    for (let index = output.length - 1; index > 0; index -= 1) {
      state = (state * 1664525 + 1013904223) >>> 0;
      const swapIndex = state % (index + 1);
      [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
    }
    return output;
  }

  function choicesFor(records, correct, selector, seed, count = 4) {
    const unique = [];
    for (const record of records) {
      const value = clean(selector(record));
      if (value && value !== correct && !unique.includes(value)) unique.push(value);
    }
    const safeCount = Math.max(2, Math.min(4, Number(count) || 4));
    const distractors = seededShuffle(unique, seed).slice(0, safeCount - 1);
    return seededShuffle([correct, ...distractors], seed + 17);
  }

  function contextPrompt(record) {
    const english = clean(record.en);
    const example = clean(record.ex_en);
    if (!example) return `Complete: _____ (${clean(record.mean_he)})`;
    const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const hidden = example.replace(new RegExp(escaped, 'i'), '_____');
    return hidden === example ? example : hidden;
  }

  function questionFactory(record, context) {
    const english = clean(record.en);
    const hebrew = clean(record.mean_he);
    const reverse = context.mode === 'review';
    const inContext = context.mode === 'context';
    const answer = reverse || inContext ? english : hebrew;
    const choices = reverse || inContext
      ? choicesFor(context.records, answer, item => item.en, context.seed, context.choiceCount)
      : choicesFor(context.records, answer, item => item.mean_he, context.seed, context.choiceCount);
    const primary = !reverse && !inContext;
    const prompt = inContext ? contextPrompt(record) : reverse ? hebrew : english;
    return {
      prompt,
      promptParts: inContext ? null : [{
        text: prompt,
        lang: primary ? 'en' : 'he',
        dir: primary ? 'ltr' : 'rtl'
      }],
      promptLang: primary || inContext ? 'en' : 'he',
      promptDir: primary || inContext ? 'ltr' : 'rtl',
      clue: '',
      clueLang: 'en',
      clueDir: 'ltr',
      choices,
      answer,
      choiceLang: reverse || inContext ? 'en' : 'he',
      choiceDir: reverse || inContext ? 'ltr' : 'rtl',
      speakText: english,
      modeLabel: context.phase === 'retry'
        ? 'מסלול תיקון'
        : context.mode === 'context'
          ? 'שער ההקשר'
          : context.mode === 'review'
          ? 'שער הזכירה'
          : context.filler
            ? 'איסוף בלוקים'
            : 'האתגר הראשי',
      meta: { record, context }
    };
  }

  function createMissionSelector(records, missionSize = 10, sourceLimit = records.length) {
    const pool = records.slice(0, Math.max(2, Math.min(records.length, Number(sourceLimit) || records.length)));
    const size = Math.max(2, Math.min(pool.length, Number(missionSize) || 10));
    let offset = 0;
    return () => {
      const mission = Array.from({ length: size }, (_, index) => pool[(offset + index) % pool.length]);
      offset = (offset + size) % pool.length;
      return mission;
    };
  }

  function createCoverageMission(records, practicePlan, sourceLimit = records.length) {
    const pool = records.slice(0, Math.max(2, Math.min(records.length, Number(sourceLimit) || records.length)));
    const planItems = new Map((practicePlan?.items || []).map(item => [String(item.serial), item]));
    const ordered = pool.map((record, index) => {
      const plan = planItems.get(String(record.serial)) || {};
      return {
        record,
        index,
        signalCount: Math.max(0, Number(plan.signalCount) || 0),
        mastered: Boolean(plan.mastered),
        mode: ['primary', 'review', 'context'].includes(plan.nextMode) ? plan.nextMode : 'primary'
      };
    });
    const incomplete = ordered.filter(item => !item.mastered);
    const candidates = incomplete.length ? incomplete : ordered;
    candidates.sort((left, right) => left.signalCount - right.signalCount || left.index - right.index);
    const modes = new Map(candidates.map(item => [String(item.record.serial), item.mode]));
    const signalCounts = new Map(candidates.map(item => [String(item.record.serial), item.signalCount]));
    return { records: candidates.map(item => item.record), modes, signalCounts };
  }

  function groupNavigationFor(group, firstGroup = 1, lastGroup = 20) {
    const current = Math.max(firstGroup, Math.min(lastGroup, Number(group) || firstGroup));
    const previous = current === firstGroup ? lastGroup : current - 1;
    const next = current === lastGroup ? firstGroup : current + 1;
    const id = value => String(value).padStart(2, '0');
    return {
      previous,
      previousHref: `group-${id(previous)}.html`,
      previousLabel: `לקבוצה הקודמת: ${id(previous)}`,
      next,
      nextHref: `group-${id(next)}.html`,
      nextLabel: `לקבוצה הבאה: ${id(next)}`
    };
  }

  function formatFeedback(result) {
    const record = result.question.meta.record;
    const example = clean(record.ex_en);
    const exampleHe = clean(record.ex_he);
    if (!result.correct) {
      const evidence = example ? ` דוגמה: ${example}${exampleHe ? ` — ${exampleHe}` : ''}` : '';
      const parts = [
        { text: clean(record.en), lang: 'en', dir: 'ltr' },
        { text: ` פירושו ${clean(record.mean_he)}.`, lang: 'he', dir: 'rtl' }
      ];
      if (example) {
        parts.push({ text: ' דוגמה: ', lang: 'he', dir: 'rtl' });
        parts.push({ text: example, lang: 'en', dir: 'ltr' });
        if (exampleHe) parts.push({ text: ` — ${exampleHe}`, lang: 'he', dir: 'rtl' });
      }
      return {
        title: 'כמעט — הנה ההסבר.',
        text: `${clean(record.en)} פירושו ${clean(record.mean_he)}.${evidence}`,
        parts
      };
    }
    return { title: 'מעולה! ✓', text: 'תשובה נכונה.' };
  }

  function progressSignalFor(result) {
    if (!result || !result.correct || result.entry?.filler) return null;
    if (result.entry?.mode === 'primary') return 'meaning';
    if (result.entry?.mode === 'review') return 'recall';
    if (result.entry?.mode === 'context') return 'context';
    return null;
  }

  function renderProgress(host, progress) {
    const ui = host?.EFN_CORE1_PROGRESS_UI;
    if (!progress || !ui || typeof ui.renderProgress !== 'function') return false;
    try {
      ui.renderProgress(host.document, progress);
      return true;
    } catch {
      return false;
    }
  }

  function createProgressTracker(api, host, options = {}) {
    if (!api || typeof api.createBrowserProgressStore !== 'function') return null;
    if (!Number.isInteger(Number(options.group)) || !Array.isArray(options.expectedSerials)) return null;
    const group = Number(options.group);
    const expectedSerials = [...options.expectedSerials];
    const store = api.createBrowserProgressStore(host);

    function record(result) {
      const signal = progressSignalFor(result);
      const serial = result?.question?.meta?.record?.serial;
      if (!signal || serial == null) return null;
      try {
        const progress = store.recordCorrect({ group, serial, signal, expectedSerials });
        renderProgress(host, progress);
        return progress;
      } catch {
        return null;
      }
    }

    function getProgress() {
      try {
        return store.getGroupProgress({ group, expectedSerials });
      } catch {
        return null;
      }
    }

    function getPracticePlan() {
      if (typeof store.getGroupPracticePlan !== 'function') return null;
      try {
        return store.getGroupPracticePlan({ group, expectedSerials });
      } catch {
        return null;
      }
    }

    return { record, getProgress, getPracticePlan, storageMode: () => store.storageMode() };
  }

  function withProgressTracking(session, tracker) {
    if (!session || !tracker) return session;
    return {
      ...session,
      answer(value, answerContext) {
        const result = session.answer(value, answerContext);
        tracker.record(result);
        return result;
      }
    };
  }

  function loadProgressModule(root, scriptUrl) {
    if (root.EFN_CORE1_PROGRESS) return Promise.resolve(root.EFN_CORE1_PROGRESS);
    const existing = root.document.querySelector('script[data-efn-core1-progress]');
    if (existing) {
      return new Promise(resolve => {
        existing.addEventListener('load', () => resolve(root.EFN_CORE1_PROGRESS || null), { once: true });
        existing.addEventListener('error', () => resolve(null), { once: true });
      });
    }
    const base = scriptUrl ? new URL('.', scriptUrl) : new URL('.', root.location.href);
    const script = root.document.createElement('script');
    script.src = new URL('core1-progress.js?v=20260826-coverage1', base).href;
    script.dataset.efnCore1Progress = 'true';
    return new Promise(resolve => {
      script.addEventListener('load', () => resolve(root.EFN_CORE1_PROGRESS || null), { once: true });
      script.addEventListener('error', () => resolve(null), { once: true });
      (root.document.head || root.document.documentElement).appendChild(script);
    });
  }

  function prepareAndMount(root, scriptUrl) {
    const config = rolloutFor(root.location?.pathname, root.EFN_STAGE8_ROLLOUT?.vocabulary);
    if (!config?.progressGroup || root.EFN_CORE1_PROGRESS) return autoMount(root, scriptUrl);
    return loadProgressModule(root, scriptUrl).then(() => autoMount(root, scriptUrl));
  }

  function autoMount(root, scriptUrl) {
    if (!sessionApi || !panelApi || !Array.isArray(root.EFN_PAGE_WORDS)) return null;
    const config = rolloutFor(root.location?.pathname, root.EFN_STAGE8_ROLLOUT?.vocabulary);
    if (!config) return null;
    const anchor = root.document.querySelector('.controls, .nav-container');
    if (!anchor || root.document.querySelector('.efn-practice')) return null;
    const base = scriptUrl ? new URL('.', scriptUrl) : new URL('.', root.location.href);
    const expectedSerials = root.EFN_PAGE_WORDS.map(record => record.serial);
    const sourcePool = root.EFN_PAGE_WORDS.slice(0, config.sourceLimit || root.EFN_PAGE_WORDS.length);
    const progressTracker = config.progressGroup
      ? createProgressTracker(root.EFN_CORE1_PROGRESS || progressApi, root, {
        group: config.progressGroup,
        expectedSerials
      })
      : null;
    const navigation = config.progressGroup ? groupNavigationFor(config.progressGroup) : null;
    if (progressTracker) renderProgress(root, progressTracker.getProgress());
    return panelApi.mount({
      document: root.document,
      anchor,
      stylesheetHref: new URL(
        config.segmentedUi
          ? 'practice-shell.css?v=20260827-segments-stage3'
          : 'practice-shell.css?v=20260826-coverage1',
        base
      ).href,
      treasureAssetHref: new URL('assets/game/treasure-chest-coins-3d.png?v=20260826-stage8-fix1', base).href,
      badge: 'CORE I',
      title: 'האוצר האבוד',
      description: `${sourcePool.length} מילים`,
      privacy: 'נשאר במכשיר.',
      startLabel: 'מתחילים לשחק',
      autoAdvanceCorrectMs: 650,
      correctNextLabel: 'הבא עכשיו',
      showProgressPercent: true,
      showProgressCount: true,
      blockQuest: true,
      immersive: true,
      exponentialFeedback: true,
      baseReward: 10,
      treasureChests: [25, 50, 100],
      segmentedUi: Boolean(config.segmentedUi),
      treasureChestSegments: config.treasureChestSegments,
      previousGroupHref: navigation?.previousHref,
      previousGroupLabel: navigation?.previousLabel,
      nextGroupHref: navigation?.nextHref,
      nextGroupLabel: navigation?.nextLabel,
      getOverallProgress: () => progressTracker?.getProgress() || null,
      analyticsActivity: config.analyticsActivity,
      createSession: () => {
        const overall = progressTracker?.getProgress() || null;
        const mission = createCoverageMission(
          sourcePool,
          progressTracker?.getPracticePlan(),
          config.sourceLimit || sourcePool.length
        );
        return withProgressTracking(
          sessionApi.createSession(mission.records, {
            limit: mission.records.length,
            choiceRecords: sourcePool,
            questionFactory,
            adaptive: Boolean(config.adaptive),
            coverageFirst: Boolean(config.coverageFirst),
            segmented: Boolean(config.segmented),
            segmentTotalItems: sourcePool.length,
            initialCoveredItems: overall?.started || 0,
            initialMasteredItems: overall?.mastered || 0,
            initialModeFor: record => mission.modes.get(String(record.serial)) || 'primary',
            initialSignalCountFor: record => mission.signalCounts.get(String(record.serial)) || 0
          }),
          progressTracker
        );
      },
      formatFeedback
    });
  }

  return {
    clean,
    normalizedPath,
    rolloutFor,
    seededShuffle,
    choicesFor,
    contextPrompt,
    createMissionSelector,
    createCoverageMission,
    groupNavigationFor,
    questionFactory,
    formatFeedback,
    progressSignalFor,
    renderProgress,
    createProgressTracker,
    withProgressTracking,
    loadProgressModule,
    prepareAndMount,
    autoMount
  };
});
