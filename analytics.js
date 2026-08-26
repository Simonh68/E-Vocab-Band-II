(() => {
  const endpoint = 'https://englishfornoar.co.il/api/analytics';
  const visitorStorageKey = 'efn-anonymous-browser-v1';
  const roleStorageKey = 'efn-traffic-role-v1';
  const visitorLifetimeMs = 30 * 24 * 60 * 60 * 1000;
  const validId = /^[a-zA-Z0-9-]{8,80}$/;

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } },
    remove(key) { try { localStorage.removeItem(key); } catch {} },
  };

  let incomingVisitorId = null;
  const currentUrl = new URL(location.href);
  let cleanAddress = false;
  const developerSetting = currentUrl.searchParams.get('efn_dev');
  if (developerSetting === '1') {
    storage.set(roleStorageKey, 'developer');
    currentUrl.searchParams.delete('efn_dev');
    cleanAddress = true;
  } else if (developerSetting === '0') {
    storage.remove(roleStorageKey);
    currentUrl.searchParams.delete('efn_dev');
    cleanAddress = true;
  }
  const rawHash = currentUrl.hash.startsWith('#') ? currentUrl.hash.slice(1) : '';
  if (rawHash.includes('efn_visitor=') || rawHash.includes('efn_role=')) {
    const bridge = new URLSearchParams(rawHash);
    const bridgedId = bridge.get('efn_visitor');
    if (bridgedId && validId.test(bridgedId)) incomingVisitorId = bridgedId;
    if (bridge.get('efn_role') === 'developer') storage.set(roleStorageKey, 'developer');
    bridge.delete('efn_visitor');
    bridge.delete('efn_role');
    currentUrl.hash = bridge.toString() ? `#${bridge.toString()}` : '';
    cleanAddress = true;
  }
  if (cleanAddress) {
    try { history.replaceState(history.state, '', `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`); } catch {}
  }

  const visitorId = (() => {
    const expiresAt = Date.now() + visitorLifetimeMs;
    if (incomingVisitorId) {
      storage.set(visitorStorageKey, JSON.stringify({ id: incomingVisitorId, expiresAt }));
      return incomingVisitorId;
    }
    try {
      const saved = JSON.parse(storage.get(visitorStorageKey) || 'null');
      if (saved && validId.test(saved.id) && Number(saved.expiresAt) > Date.now()) return saved.id;
    } catch {}
    const created = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return storage.set(visitorStorageKey, JSON.stringify({ id: created, expiresAt })) ? created : null;
  })();
  const trafficType = storage.get(roleStorageKey) === 'developer' ? 'developer' : 'visitor';

  const device = (() => {
    const ua = navigator.userAgent || '';
    const tablet = /iPad|Tablet|PlayBook|Silk|Android(?!.*Mobile)/i.test(ua);
    const mobile = !tablet && /Mobi|Android|iPhone|iPod/i.test(ua);
    const deviceClass = tablet ? 'tablet' : mobile ? 'mobile' : ua ? 'desktop' : 'unknown';
    const platform = /Android/i.test(ua) ? 'android'
      : /iPhone|iPad|iPod/i.test(ua) ? 'ios'
      : /Windows/i.test(ua) ? 'windows'
      : /Macintosh|Mac OS X/i.test(ua) ? 'macos'
      : /CrOS/i.test(ua) ? 'chromeos'
      : /Linux/i.test(ua) ? 'linux'
      : ua ? 'other' : 'unknown';
    const browser = /SamsungBrowser/i.test(ua) ? 'samsung'
      : /Edg\//i.test(ua) ? 'edge'
      : /Firefox|FxiOS/i.test(ua) ? 'firefox'
      : /Chrome|CriOS/i.test(ua) ? 'chrome'
      : /Safari/i.test(ua) ? 'safari'
      : ua ? 'other' : 'unknown';
    return { deviceClass, platform, browser };
  })();

  const site = (() => {
    const host = location.hostname.toLowerCase();
    const path = location.pathname.toLowerCase();
    if (host === 'englishfornoar.co.il' || host === 'www.englishfornoar.co.il') {
      return path.startsWith('/word-forge') ? 'english-basic' : 'home';
    }
    if (path.includes('/module-e-vocab')) return 'module-e';
    if (path.includes('/e-vocab-band-ii/read-along')) return 'read-along';
    if (path.includes('/e-vocab-band-ii/ar')) return 'band-ii-ar';
    if (path.includes('/e-vocab-band-ii')) return 'band-ii';
    if (path.includes('/english-basic')) return 'english-basic';
    return 'external';
  })();
  if (site === 'external') return;

  const repoPrefix = location.hostname === 'simonh68.github.io' ? `/${location.pathname.split('/').filter(Boolean)[0] || ''}` : '';
  const cleanPath = () => {
    const value = location.pathname.startsWith(repoPrefix) ? location.pathname.slice(repoPrefix.length) : location.pathname;
    return value || '/';
  };
  const pageKind = () => {
    const path = cleanPath().toLowerCase();
    if (path === '/' || path.endsWith('/index.html')) return 'home';
    if (path.includes('reader')) return 'story-reader';
    if (path.includes('lesson')) return 'lesson';
    if (path.includes('group-')) return 'group';
    if (path.includes('word-game') || path.includes('word-forge')) return 'game';
    if (path.includes('privacy') || path.includes('accessibility') || path.includes('copyright')) return 'policy';
    if (path.includes('guide') || path.includes('about')) return 'guide';
    return 'page';
  };
  const contextFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const context = { resource: cleanPath() };
    ['level', 'lesson', 'mode', 'id', 'group'].forEach((key) => {
      const value = params.get(key);
      if (value && /^[a-zA-Z0-9_-]{1,60}$/.test(value)) context[key] = value;
    });
    return context;
  };
  const visitId = (() => {
    try {
      const key = 'efn-visit-id-v1';
      const existing = sessionStorage.getItem(key);
      if (existing) return existing;
      const created = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(key, created);
      return created;
    } catch {
      return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  })();
  const base = () => ({
    site,
    path: cleanPath(),
    pageKind: pageKind(),
    visitId,
    visitorId,
    trafficType,
    ...device,
    referrerHost: document.referrer ? (() => { try { return new URL(document.referrer).hostname; } catch { return ''; } })() : '',
  });
  const send = (event, context = {}) => {
    const payload = JSON.stringify({ ...base(), event, context: { ...contextFromUrl(), ...context } });
    try {
      if (navigator.sendBeacon) { navigator.sendBeacon(endpoint, payload); return; }
      fetch(endpoint, { method: 'POST', body: payload, keepalive: true, mode: 'no-cors' }).catch(() => {});
    } catch {}
  };
  window.EFNAnalytics = { send, visitorId, trafficType };

  const bridgedHosts = new Set(['englishfornoar.co.il', 'www.englishfornoar.co.il', 'simonh68.github.io']);
  const bridgeLink = (element) => {
    if (!visitorId || element.tagName !== 'A') return;
    let target;
    try { target = new URL(element.href, location.href); } catch { return; }
    if (!/^https?:$/.test(target.protocol) || target.origin === location.origin || !bridgedHosts.has(target.hostname) || target.hash) return;
    const bridge = new URLSearchParams();
    bridge.set('efn_visitor', visitorId);
    if (trafficType === 'developer') bridge.set('efn_role', 'developer');
    target.hash = bridge.toString();
    element.href = target.href;
  };

  let activeStarted = document.visibilityState === 'visible' ? Date.now() : 0;
  let activeMs = 0;
  let exitSent = false;
  const pause = () => { if (activeStarted) { activeMs += Date.now() - activeStarted; activeStarted = 0; } };
  const resume = () => { if (!activeStarted && document.visibilityState === 'visible') activeStarted = Date.now(); };
  const sendExit = () => { if (exitSent) return; exitSent = true; pause(); send('page_exit', { activeMs: Math.min(activeMs, 43_200_000) }); };
  document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' ? pause() : resume());
  window.addEventListener('pagehide', sendExit, { once: true });
  setTimeout(() => send('page_view'), 0);

  const labelFor = (element) => {
    const label = element.getAttribute('data-analytics-label') || element.getAttribute('aria-label') || element.id || '';
    return label.replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 120);
  };
  const targetFor = (element) => {
    if (element.tagName === 'A') {
      try { return new URL(element.href, location.href).pathname.slice(0, 180) || '/'; } catch {}
    }
    return element.getAttribute('data-analytics-target') || labelFor(element) || element.tagName.toLowerCase();
  };
  document.addEventListener('click', (event) => {
    const element = event.target.closest?.('a,button,[role="button"]');
    if (!element) return;
    if (element.closest?.('[data-analytics-ignore="true"]')) return;
    bridgeLink(element);
    const external = element.tagName === 'A' && new URL(element.href, location.href).origin !== location.origin;
    send(external ? 'link_click' : element.tagName === 'A' ? 'link_click' : 'button_click', { target: targetFor(element), label: labelFor(element) });
  }, true);
  document.addEventListener('change', (event) => {
    const element = event.target.closest?.('select,input[type="checkbox"],input[type="radio"]');
    if (!element) return;
    send('selection_change', { target: labelFor(element) || element.name || element.tagName.toLowerCase(), value: element.value?.slice(0, 60) || '' });
  }, true);

  if (window.speechSynthesis?.speak) {
    const originalSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak = (utterance) => {
      if (window.EFNAnalyticsIgnoreNextAudio) window.EFNAnalyticsIgnoreNextAudio = false;
      else send('audio_play');
      return originalSpeak(utterance);
    };
  }
  const seen = new WeakSet();
  const inspect = (node) => {
    if (!(node instanceof Element)) return;
    if (node.classList.contains('correct') && !seen.has(node)) { seen.add(node); send('answer_correct'); }
    if (node.classList.contains('wrong') && !seen.has(node)) { seen.add(node); send('answer_incorrect'); }
    const text = (node.textContent || '').trim();
    if (text && /(התרגול הסתיים|דיווח הקריאה הושלם|הכרטיסיות הושלמו|activity complete|completed successfully)/i.test(text) && !seen.has(node)) { seen.add(node); send('activity_complete'); }
  };
  new MutationObserver((mutations) => mutations.forEach((mutation) => { inspect(mutation.target); mutation.addedNodes.forEach(inspect); })).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
  window.addEventListener('ebr:progress', (event) => { const activity = event.detail?.activity; if (activity) send('activity_complete', { outcome: String(activity).slice(0, 40) }); });
})();
