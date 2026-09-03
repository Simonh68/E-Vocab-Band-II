(() => {
  if (window.__EFNVocabProgressLoaded) return;
  window.__EFNVocabProgressLoaded = true;

  const STORE_KEY = 'efn.vocab.progress.v1';
  const CONSENT_KEY = 'efn.band2.local-progress-consent.v1';
  const REPORT_URL = 'https://simonh68.github.io/E-Vocab-Band-II/progress-report.html';
  const path = location.pathname;

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } }
  };

  const hasConsent = () => storage.get(CONSENT_KEY) === 'accepted';
  const load = () => {
    try {
      const parsed = JSON.parse(storage.get(STORE_KEY) || 'null');
      return parsed && parsed.version === 1 && parsed.groups ? parsed : { version: 1, groups: {} };
    } catch { return { version: 1, groups: {} }; }
  };
  const save = state => hasConsent() && storage.set(STORE_KEY, JSON.stringify(state));

  function targetFromPath() {
    let match = path.match(/\/groups\/group-(\d{2})\.html$/i);
    if (match) {
      const number = Number(match[1]);
      if (number >= 1 && number <= 20) return { section: 'core1', key: `core1-${match[1]}`, label: `Group ${match[1]}` };
      if (number >= 21 && number <= 40) return { section: 'core2', key: `core2-${match[1]}`, label: `Group ${match[1]}` };
    }
    match = path.match(/\/([ABCD][123])\.html$/i);
    if (match) return { section: 'band3', key: `band3-${match[1].toUpperCase()}`, label: match[1].toUpperCase() };
    return null;
  }

  function mountConsent(target) {
    if (!target || target.section === 'core1' || hasConsent() || document.querySelector('[data-efn-generic-progress-consent]')) return;
    const box = document.createElement('section');
    box.dataset.efnGenericProgressConsent = 'true';
    box.dir = 'rtl';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'שמירת התקדמות במכשיר');
    box.innerHTML = '<strong>לשמור את ההתקדמות במכשיר?</strong><span>כך דוח ההתקדמות יוכל להראות אילו כרטיסים כבר עברתם. המידע נשמר רק במכשיר הזה ואינו כולל שם, אימייל או תשובות שהוקלדו.</span><div><button type="button" data-yes>כן, לשמור</button><button type="button" data-no>לא עכשיו</button></div>';
    Object.assign(box.style,{position:'fixed',left:'12px',right:'12px',bottom:'12px',zIndex:'9999',maxWidth:'560px',margin:'auto',padding:'16px',borderRadius:'16px',background:'#fff',color:'#16324a',boxShadow:'0 12px 36px rgba(0,0,0,.28)',display:'grid',gap:'9px',fontFamily:'Arial,sans-serif'});
    box.querySelector('div').style.cssText='display:flex;gap:8px;flex-wrap:wrap';
    box.querySelectorAll('button').forEach(button => button.style.cssText='min-height:42px;padding:8px 13px;border:1px solid #789;border-radius:10px;font:inherit;font-weight:800;cursor:pointer');
    box.querySelector('[data-yes]').addEventListener('click', () => { if (storage.set(CONSENT_KEY,'accepted')) location.reload(); });
    box.querySelector('[data-no]').addEventListener('click', () => box.remove());
    document.body.appendChild(box);
  }

  function trackCounter(target) {
    if (!target || target.section === 'core1' || !hasConsent()) return;
    const counter = document.getElementById('counter');
    if (!counter) return;
    const sync = () => {
      const match = (counter.textContent || '').match(/(\d+)\s*\/\s*(\d+)/);
      if (!match) return;
      const current = Number(match[1]), total = Number(match[2]);
      if (!current || !total || current > total) return;
      const state = load();
      const previous = state.groups[target.key] || { section: target.section, label: target.label, total, seen: [] };
      const seen = [...new Set([...(Array.isArray(previous.seen) ? previous.seen : []), current])].filter(n => Number.isInteger(n) && n >= 1 && n <= total).sort((a,b)=>a-b);
      state.groups[target.key] = { section: target.section, label: target.label, total, seen, updatedAt: new Date().toISOString(), completedAt: seen.length >= total ? (previous.completedAt || new Date().toISOString()) : null };
      save(state);
    };
    sync();
    new MutationObserver(sync).observe(counter,{childList:true,subtree:true,characterData:true});
  }

  function addStyles() {
    if (document.getElementById('efn-progress-report-style')) return;
    const style = document.createElement('style');
    style.id='efn-progress-report-style';
    style.textContent = `.efn-progress-report-link{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;min-height:44px;padding:9px 13px;border-radius:12px;text-decoration:none!important;font-weight:900!important;border:1px solid currentColor;box-shadow:0 3px 0 rgba(0,0,0,.15);background:#fff}.efn-progress-report-link[data-section="core1"]{color:#176b8a}.efn-progress-report-link[data-section="core2"]{color:#6d38a8}.efn-progress-report-link[data-section="band3"]{color:#27734c}.efn-progress-home{display:flex;width:min(100%,760px);margin:0 auto 20px;padding:14px 18px;font-size:1.05rem;background:#0e3151!important;color:#fff!important;border-color:#0e3151!important}.efn-progress-report-link:focus-visible{outline:3px solid #b45309;outline-offset:3px}`;
    document.head.appendChild(style);
  }

  function injectLinks(target) {
    addStyles();
    if (target && !document.querySelector('.efn-progress-report-link[data-group-link]')) {
      const link = document.createElement('a');
      link.href=REPORT_URL; link.className='efn-progress-report-link'; link.dataset.section=target.section; link.dataset.groupLink='true'; link.textContent='📊 דוח התקדמות';
      const nav = document.querySelector('.topbar,.activity-top-nav,nav');
      if (nav) nav.appendChild(link);
    }
    const isBand2Home = /\/E-Vocab-Band-II\/?(?:index\.html)?$/i.test(path);
    const isBand3Home = /\/module-e-vocab\/?(?:index\.html)?$/i.test(path);
    if ((isBand2Home || isBand3Home) && !document.querySelector('.efn-progress-home')) {
      const link = document.createElement('a');
      link.href=REPORT_URL; link.className='efn-progress-report-link efn-progress-home'; link.textContent='📊 דוח ההתקדמות שלי';
      const anchor = isBand2Home ? document.getElementById('activities') : document.querySelector('.lists');
      if (anchor?.parentNode) anchor.parentNode.insertBefore(link, anchor);
    }
  }

  const start = () => {
    const target = targetFromPath();
    mountConsent(target);
    trackCounter(target);
    injectLinks(target);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true}); else start();
})();
