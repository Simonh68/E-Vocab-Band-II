((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.EFN_CORE1_PROGRESS_UI = api;
    const start = () => api.mount(root);
    if (root.document?.readyState === 'loading') {
      root.document.addEventListener('DOMContentLoaded', start, { once: true });
    } else if (root.document) {
      start();
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  function safePercentage(value) {
    const percentage = Number(value);
    if (!Number.isFinite(percentage)) return 0;
    return Math.max(0, Math.min(100, Math.round(percentage)));
  }

  function viewFor(progress) {
    if (!progress) {
      return {
        status: 'unavailable',
        symbol: '—',
        compact: '—',
        label: 'ההתקדמות אינה זמינה',
        detail: 'התרגול ממשיך כרגיל',
        accessible: 'מצב ההתקדמות אינו זמין. התרגול ממשיך כרגיל.'
      };
    }

    const percentage = safePercentage(progress.percentage);
    const sessionOnly = progress.storage !== 'device';
    const storageText = sessionOnly ? 'נשמר לביקור הזה בלבד' : 'נשמר במכשיר הזה';
    if (progress.status === 'mastered' || progress.checked) {
      return {
        status: 'mastered',
        symbol: '✓',
        compact: '✓',
        label: 'הושלם',
        detail: `100% · ${storageText}`,
        accessible: `הקבוצה הושלמה. 100 אחוז. ${storageText}.`
      };
    }
    if (progress.status === 'in_progress') {
      return {
        status: 'in_progress',
        symbol: '◐',
        compact: `◐ ${percentage}%`,
        label: 'בתהליך',
        detail: `${percentage}% · ${storageText}`,
        accessible: `הקבוצה בתהליך. ${percentage} אחוז. ${storageText}.`
      };
    }
    return {
      status: 'not_started',
      symbol: '○',
      compact: '○',
      label: 'טרם התחיל',
      detail: `0% · ${storageText}`,
      accessible: `הקבוצה טרם התחילה. 0 אחוז. ${storageText}.`
    };
  }

  function renderListBadge(element, progress) {
    if (!element) return null;
    const view = viewFor(progress);
    element.textContent = view.compact;
    element.dataset.status = view.status;
    element.setAttribute('aria-label', view.accessible);
    element.setAttribute('title', `${view.label} · ${view.detail}`);
    return view;
  }

  function renderActivityBadge(element, progress) {
    if (!element) return null;
    const view = viewFor(progress);
    const symbol = element.querySelector('[data-progress-symbol]');
    const label = element.querySelector('[data-progress-label]');
    const detail = element.querySelector('[data-progress-detail]');
    if (symbol) symbol.textContent = view.symbol;
    if (label) label.textContent = view.label;
    if (detail) detail.textContent = view.detail;
    const reset = element.querySelector('[data-progress-reset]');
    if (reset) reset.hidden = view.status === 'not_started' || view.status === 'unavailable';
    element.dataset.status = view.status;
    element.setAttribute('aria-label', view.accessible);
    return view;
  }

  function serialsFor(root, group, groupsApi, preferPageWords = false) {
    if (preferPageWords && Array.isArray(root?.EFN_PAGE_WORDS)) {
      const serials = root.EFN_PAGE_WORDS.map(word => word?.serial).filter(serial => serial != null);
      if (serials.length) return serials;
    }
    if (groupsApi && typeof groupsApi.expectedSerials === 'function') {
      return groupsApi.expectedSerials(group);
    }
    const serials = groupsApi?.groups?.[Number(group)];
    return Array.isArray(serials) ? [...serials] : null;
  }

  function progressFor(store, group, expectedSerials) {
    if (!store || !Array.isArray(expectedSerials) || expectedSerials.length === 0) return null;
    try {
      return store.getGroupProgress({ group: Number(group), expectedSerials });
    } catch {
      return null;
    }
  }

  function configuredGroups(groupsApi) {
    return Object.keys(groupsApi?.groups || {})
      .map(Number)
      .filter(Number.isInteger)
      .sort((a, b) => a - b);
  }

  function ensureListBadges(document, groupsApi) {
    if (!document || typeof document.createElement !== 'function') return [];
    const badges = [];
    for (const group of configuredGroups(groupsApi)) {
      const existing = document.querySelector?.(`[data-core1-progress-list][data-group="${group}"]`);
      if (existing) {
        const existingContainer = existing.closest?.('.group');
        if (existingContainer && !existingContainer.className.split(/\s+/).includes('group--with-progress')) {
          existingContainer.className = `${existingContainer.className} group--with-progress`.trim();
        }
        badges.push(existing);
        continue;
      }
      const link = document.querySelector?.(`a[href^="groups/group-${String(group).padStart(2, '0')}.html"]`);
      const container = link?.closest?.('.group');
      if (!container) continue;
      if (!container.className.split(/\s+/).includes('group--with-progress')) {
        container.className = `${container.className} group--with-progress`.trim();
      }
      const badge = document.createElement('span');
      badge.className = 'group-progress';
      badge.dataset.core1ProgressList = 'true';
      badge.dataset.group = String(group);
      badge.textContent = '…';
      badge.setAttribute('role', 'status');
      badge.setAttribute('aria-live', 'polite');
      badge.setAttribute('aria-label', `טוען את מצב ההתקדמות של קבוצה ${group}`);
      const copyButton = container.querySelector?.('.copy');
      if (copyButton && typeof container.insertBefore === 'function') container.insertBefore(badge, copyButton);
      else container.appendChild?.(badge);
      badges.push(badge);
    }
    return badges;
  }

  function groupFromPath(pathname) {
    const match = String(pathname || '').match(/(?:^|\/)groups\/group-(\d{2})\.html$/i);
    return match ? Number(match[1]) : null;
  }

  function ensureActivityBadge(root, groupsApi) {
    const document = root?.document;
    if (!document || typeof document.createElement !== 'function') return null;
    const existing = document.querySelector?.('[data-core1-progress-activity][data-group]');
    if (existing) return existing;
    const group = groupFromPath(root.location?.pathname);
    if (!configuredGroups(groupsApi).includes(group)) return null;
    const header = document.querySelector?.('.activity-head');
    if (!header) return null;

    const badge = document.createElement('div');
    badge.className = 'activity-progress';
    badge.dataset.core1ProgressActivity = 'true';
    badge.dataset.group = String(group);
    badge.lang = 'he';
    badge.dir = 'rtl';

    const status = document.createElement('div');
    status.className = 'activity-progress__status';
    status.dataset.progressStatus = 'true';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    status.setAttribute('tabindex', '-1');

    const symbol = document.createElement('span');
    symbol.className = 'activity-progress__symbol';
    symbol.dataset.progressSymbol = 'true';
    symbol.setAttribute('aria-hidden', 'true');
    symbol.textContent = '…';
    const copy = document.createElement('span');
    copy.className = 'activity-progress__copy';
    const label = document.createElement('strong');
    label.dataset.progressLabel = 'true';
    label.textContent = 'טוען התקדמות';
    const detail = document.createElement('small');
    detail.dataset.progressDetail = 'true';
    detail.textContent = 'מחשב מצב מקומי';
    copy.append(label, detail);
    status.append(symbol, copy);

    const reset = document.createElement('button');
    reset.className = 'activity-progress__reset';
    reset.dataset.progressReset = 'true';
    reset.setAttribute('type', 'button');
    reset.setAttribute('aria-label', `איפוס ההתקדמות בקבוצה ${group}`);
    reset.textContent = 'איפוס';
    reset.hidden = true;
    badge.append(status, reset);

    const counter = header.querySelector?.('.counter');
    if (counter && typeof header.insertBefore === 'function') header.insertBefore(badge, counter);
    else header.appendChild?.(badge);
    return badge;
  }

  function configureReset(root, element, store, group, expectedSerials) {
    const reset = element?.querySelector?.('[data-progress-reset]');
    if (!reset || typeof reset.addEventListener !== 'function' || reset.dataset.progressResetBound === 'true') {
      return reset || null;
    }
    reset.dataset.progressResetBound = 'true';
    reset.addEventListener('click', () => {
      const confirmed = typeof root?.confirm !== 'function'
        || root.confirm(`לאפס את ההתקדמות השמורה בקבוצה ${group}?`);
      if (!confirmed) return;
      try {
        store.resetGroup(group);
        const progress = progressFor(store, group, expectedSerials);
        renderProgress(root.document, progress);
        element.querySelector?.('[data-progress-status]')?.focus?.();
      } catch {
        renderActivityBadge(element, null);
      }
    });
    return reset;
  }

  function renderProgress(document, progress) {
    if (!document || !progress || !Number.isInteger(Number(progress.group))) return [];
    const group = Number(progress.group);
    const rendered = [];
    const listBadges = document.querySelectorAll?.(`[data-core1-progress-list][data-group="${group}"]`) || [];
    listBadges.forEach(element => rendered.push(renderListBadge(element, progress)));
    const activity = document.querySelector?.(`[data-core1-progress-activity][data-group="${group}"]`);
    if (activity) rendered.push(renderActivityBadge(activity, progress));
    return rendered;
  }

  function mount(root, dependencies = {}) {
    const document = root?.document;
    const progressApi = dependencies.progressApi || root?.EFN_CORE1_PROGRESS;
    const groupsApi = dependencies.groupsApi || root?.EFN_CORE1_PROGRESS_GROUPS;
    if (!document || !progressApi || typeof progressApi.createBrowserProgressStore !== 'function') return [];

    const store = progressApi.createBrowserProgressStore(root);
    const rendered = [];
    ensureListBadges(document, groupsApi);
    ensureActivityBadge(root, groupsApi);
    const listBadges = document.querySelectorAll?.('[data-core1-progress-list][data-group]') || [];
    listBadges.forEach(element => {
      const group = Number(element.dataset.group);
      const progress = progressFor(store, group, serialsFor(root, group, groupsApi));
      rendered.push(renderListBadge(element, progress));
    });

    const activity = document.querySelector?.('[data-core1-progress-activity][data-group]');
    if (activity) {
      const group = Number(activity.dataset.group);
      const expectedSerials = serialsFor(root, group, groupsApi, true);
      const progress = progressFor(store, group, expectedSerials);
      rendered.push(renderActivityBadge(activity, progress));
      configureReset(root, activity, store, group, expectedSerials);
    }
    return rendered;
  }

  return {
    safePercentage,
    viewFor,
    renderListBadge,
    renderActivityBadge,
    serialsFor,
    progressFor,
    configuredGroups,
    ensureListBadges,
    groupFromPath,
    ensureActivityBadge,
    configureReset,
    renderProgress,
    mount
  };
});
