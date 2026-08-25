((root, factory) => {
  const api = factory(
    root && root.EFN_PRACTICE_SESSION,
    root && root.EFN_PRACTICE_PANEL
  );
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.EFN_STORY_PRACTICE = api;
    const scriptUrl = root.document?.currentScript?.src || '';
    const start = () => api.autoMount(root, scriptUrl);
    if (root.document?.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start, { once: true });
    else if (root.document) start();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, (sessionApi, panelApi) => {
  function questionFactory(record, context) {
    const review = context.mode === 'review';
    const offset = context.seed % record.choices.length;
    const choices = [...record.choices];
    const rotated = choices.slice(offset).concat(choices.slice(0, offset));
    return {
      prompt: review ? record.reviewPrompt : record.prompt,
      promptLang: 'he',
      promptDir: 'rtl',
      clue: context.phase === 'retry' ? `חזרו לראיה מהסיפור: ${record.evidence}` : '',
      clueLang: 'en',
      clueDir: 'ltr',
      choices: rotated,
      answer: record.answer,
      choiceLang: 'en',
      choiceDir: 'ltr',
      speakText: record.evidence,
      modeLabel: context.phase === 'retry'
        ? 'ניסיון חוזר אחרי שתי שאלות אחרות'
        : review
          ? 'בדיקת הבנה בניסוח חדש'
          : context.filler
            ? 'חיזוק ביניים'
            : 'ניסיון עצמאי',
      meta: { record, context }
    };
  }

  function formatFeedback(result) {
    const record = result.question.meta.record;
    if (!result.correct) {
      const suffix = result.entry.filler ? ' זהו חיזוק ביניים; ממשיכים לשאלה הבאה.' : ' נחזור לשאלה אחרי שתי שאלות אחרות.';
      return {
        title: 'לא בדיוק — בודקים את הראיה.',
        text: `${record.explanationHe} הראיה באנגלית: ${record.evidence}${suffix}`,
        parts: [
          { text: `${record.explanationHe} הראיה באנגלית: `, lang: 'he', dir: 'rtl' },
          { text: record.evidence, lang: 'en', dir: 'ltr' },
          { text: suffix, lang: 'he', dir: 'rtl' }
        ]
      };
    }
    if (result.entry.filler) {
      return { title: 'נכון — חיזוק ביניים.', text: record.explanationHe };
    }
    if (result.mastered && result.state.initialCorrect === false) {
      return { title: 'נכון — תיקנת בעזרת הראיה.', text: record.explanationHe };
    }
    if (result.mastered) {
      return { title: 'נכון — ההבנה נבדקה שוב.', text: record.explanationHe };
    }
    return { title: 'נכון.', text: 'נחזור לרעיון בעוד ארבע עד שש שאלות, בניסוח אחר.' };
  }

  function autoMount(root, scriptUrl) {
    const story = root.EFN_ACTIVE_STORY;
    const config = root.EFN_STAGE8_ROLLOUT?.stories?.[story?.id];
    const records = root.EFN_STORY_PRACTICE_DATA?.[config?.questionSet];
    if (!story || !config || !Array.isArray(records) || !sessionApi || !panelApi) return null;
    const anchor = root.document.getElementById('translation');
    if (!anchor || root.document.querySelector('.efn-practice')) return null;
    const base = scriptUrl ? new URL('.', scriptUrl) : new URL('.', root.location.href);
    const controller = panelApi.mount({
      document: root.document,
      anchor,
      stylesheetHref: new URL('../practice-shell.css', base).href,
      theme: 'dark',
      initiallyHidden: true,
      badge: 'גל 1 · בדיקת הבנת הסיפור',
      title: 'מה הבנתם מהסיפור?',
      description: 'חמש שאלות קצרות עם משוב, ראיה מן הסיפור וניסיון חוזר.',
      startLabel: 'מתחילים את השאלות',
      exitLabel: 'חזרה לסיפור',
      analyticsActivity: config.analyticsActivity,
      createSession: () => sessionApi.createSession(records, {
        limit: records.length,
        questionFactory
      }),
      formatFeedback
    });
    if (!controller) return null;
    const position = root.document.getElementById('position');
    const sync = () => {
      const atEnd = /^END\b/.test(position?.textContent || '');
      if (atEnd) controller.showLaunch();
      else controller.hideLaunch();
    };
    if (position) new MutationObserver(sync).observe(position, { childList: true, characterData: true, subtree: true });
    sync();
    return controller;
  }

  return { questionFactory, formatFeedback, autoMount };
});
