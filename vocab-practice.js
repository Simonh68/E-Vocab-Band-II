((root, factory) => {
  const api = factory(
    root && root.EFN_PRACTICE_SESSION,
    root && root.EFN_PRACTICE_PANEL
  );
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.EFN_VOCAB_PRACTICE = api;
    const scriptUrl = root.document?.currentScript?.src || '';
    const start = () => api.autoMount(root, scriptUrl);
    if (root.document?.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start, { once: true });
    else if (root.document) start();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, (sessionApi, panelApi) => {
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
        ? 'ניסיון חוזר אחרי שתי שאלות אחרות'
        : context.mode === 'review'
          ? 'בדיקת זכירה בהקשר חדש'
          : context.filler
            ? 'חיזוק ביניים'
            : 'ניסיון עצמאי',
      meta: { record, context }
    };
  }

  function formatFeedback(result) {
    const record = result.question.meta.record;
    const example = clean(record.ex_en);
    const exampleHe = clean(record.ex_he);
    if (!result.correct) {
      const evidence = example ? ` דוגמה: ${example}${exampleHe ? ` — ${exampleHe}` : ''}` : '';
      const suffix = result.entry.filler ? ' זהו חיזוק ביניים; ממשיכים לשאלה הבאה.' : ' נחזור למילה אחרי שתי שאלות אחרות.';
      const parts = [
        { text: clean(record.en), lang: 'en', dir: 'ltr' },
        { text: ` פירושו ${clean(record.mean_he)}.`, lang: 'he', dir: 'rtl' }
      ];
      if (example) {
        parts.push({ text: ' דוגמה: ', lang: 'he', dir: 'rtl' });
        parts.push({ text: example, lang: 'en', dir: 'ltr' });
        if (exampleHe) parts.push({ text: ` — ${exampleHe}`, lang: 'he', dir: 'rtl' });
      }
      parts.push({ text: suffix, lang: 'he', dir: 'rtl' });
      return {
        title: 'כמעט — הנה ההסבר.',
        text: `${clean(record.en)} פירושו ${clean(record.mean_he)}.${evidence}${suffix}`,
        parts
      };
    }
    if (result.entry.filler) {
      return { title: 'נכון — חיזוק ביניים.', text: 'ממשיכים לשאלה הבאה.' };
    }
    if (result.mastered && result.state.initialCorrect === false) {
      return { title: 'נכון — תיקנת בעזרת המשוב.', text: 'המילה נבדקה שוב ונקלטה בסבב הזה.' };
    }
    if (result.mastered) {
      return { title: 'נכון — הזכירה נבדקה שוב.', text: 'אפשר להמשיך למילה הבאה.' };
    }
    return { title: 'נכון.', text: 'נבדוק את המילה שוב בעוד ארבע עד שש שאלות, בניסוח אחר.' };
  }

  function autoMount(root, scriptUrl) {
    if (!sessionApi || !panelApi || !Array.isArray(root.EFN_PAGE_WORDS)) return null;
    const config = rolloutFor(root.location?.pathname, root.EFN_STAGE8_ROLLOUT?.vocabulary);
    if (!config) return null;
    const anchor = root.document.querySelector('.controls, .nav-container');
    if (!anchor || root.document.querySelector('.efn-practice')) return null;
    const base = scriptUrl ? new URL('.', scriptUrl) : new URL('.', root.location.href);
    return panelApi.mount({
      document: root.document,
      anchor,
      stylesheetHref: new URL('practice-shell.css', base).href,
      badge: 'גל 1 · תרגול מדורג',
      title: 'תרגול עם משוב בעברית',
      description: '12 מילים בסבב: ניסיון עצמאי, משוב מיידי, ניסיון חוזר ובדיקת זכירה.',
      startLabel: 'מתחילים 12 מילים',
      analyticsActivity: config.analyticsActivity,
      createSession: () => sessionApi.createSession(root.EFN_PAGE_WORDS, {
        limit: config.limit,
        questionFactory
      }),
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
    autoMount
  };
});
