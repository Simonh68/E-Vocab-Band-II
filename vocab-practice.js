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

  function choicesFor(records, correct, selector, seed) {
    const unique = [];
    for (const record of records) {
      const value = clean(selector(record));
      if (value && value !== correct && !unique.includes(value)) unique.push(value);
    }
    const distractors = seededShuffle(unique, seed).slice(0, 3);
    return seededShuffle([correct, ...distractors], seed + 17);
  }

  function questionFactory(record, context) {
    const english = clean(record.en);
    const hebrew = clean(record.mean_he);
    const reverse = context.mode === 'review';
    const answer = reverse ? english : hebrew;
    const choices = reverse
      ? choicesFor(context.records, answer, item => item.en, context.seed)
      : choicesFor(context.records, answer, item => item.mean_he, context.seed);
    const prompt = reverse ? `איזו מילה מתאימה למשמעות: ${hebrew}?` : `מה פירוש המילה ${english}?`;
    return {
      prompt,
      promptParts: reverse ? null : [
        { text: 'מה פירוש המילה ', lang: 'he', dir: 'rtl' },
        { text: english, lang: 'en', dir: 'ltr' },
        { text: '?', lang: 'he', dir: 'rtl' }
      ],
      promptLang: 'he',
      promptDir: 'rtl',
      clue: reverse && record.ex_en ? `רמז בהקשר: ${record.ex_en}` : '',
      clueLang: 'en',
      clueDir: 'ltr',
      choices,
      answer,
      choiceLang: reverse ? 'en' : 'he',
      choiceDir: reverse ? 'ltr' : 'rtl',
      speakText: english,
      modeLabel: context.phase === 'retry'
        ? 'מסלול תיקון'
        : context.mode === 'review'
          ? 'שער הזכירה'
          : context.filler
            ? 'איסוף בלוקים'
            : 'האתגר הראשי',
      meta: { record, context }
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

    return { record, getProgress, storageMode: () => store.storageMode() };
  }

  function withProgressTracking(session, tracker) {
    if (!session || !tracker) return session;
    return {
      ...session,
      answer(value) {
        const result = session.answer(value);
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
    script.src = new URL('core1-progress.js?v=20260826-stage4', base).href;
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
    const progressTracker = config.progressGroup
      ? createProgressTracker(root.EFN_CORE1_PROGRESS || progressApi, root, {
        group: config.progressGroup,
        expectedSerials
      })
      : null;
    if (progressTracker) renderProgress(root, progressTracker.getProgress());
    return panelApi.mount({
      document: root.document,
      anchor,
      stylesheetHref: new URL('practice-shell.css?v=20260826-stage5', base).href,
      badge: 'CORE I · BLOCK QUEST',
      title: 'מסע האוצר של אוצר המילים',
      description: 'עונים נכון, בונים רצף ופותחים שלוש תיבות אוצר. הרצף מכפיל את הפרס.',
      startLabel: 'יוצאים למסע',
      autoAdvanceCorrectMs: 900,
      correctNextLabel: 'הבא עכשיו',
      showProgressPercent: true,
      blockQuest: true,
      immersive: true,
      exponentialFeedback: true,
      baseReward: 10,
      treasureChests: [25, 50, 100],
      analyticsActivity: config.analyticsActivity,
      createSession: () => withProgressTracking(
        sessionApi.createSession(root.EFN_PAGE_WORDS, {
          limit: config.limit,
          questionFactory
        }),
        progressTracker
      ),
      formatFeedback
    });
  }

  return {
    clean,
    normalizedPath,
    rolloutFor,
    seededShuffle,
    choicesFor,
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
