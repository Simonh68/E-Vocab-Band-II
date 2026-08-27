((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.EFN_CORE1_PROGRESS = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  const STORAGE_KEY = 'efn.band2.core1.progress.v1';
  const SCHEMA_VERSION = 1;
  const FIRST_GROUP = 1;
  const LAST_GROUP = 20;
  const REQUIRED_SIGNAL_COUNT = 2;
  const ALLOWED_SIGNALS = Object.freeze(['meaning', 'recall', 'context']);

  function emptyState() {
    return { version: SCHEMA_VERSION, groups: {} };
  }

  function normalizeGroup(value) {
    const group = Number(value);
    if (!Number.isInteger(group) || group < FIRST_GROUP || group > LAST_GROUP) {
      throw new RangeError(`Core I group must be between ${FIRST_GROUP} and ${LAST_GROUP}.`);
    }
    return String(group).padStart(2, '0');
  }

  function normalizeSerial(value) {
    const serial = Number(value);
    if (!Number.isInteger(serial) || serial < 1) throw new TypeError('Word serial must be a positive integer.');
    return String(serial);
  }

  function normalizeSerials(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new TypeError('expectedSerials must contain at least one serial.');
    }
    return [...new Set(values.map(value => Number(normalizeSerial(value))))].sort((a, b) => a - b);
  }

  function normalizeSignal(value) {
    const signal = String(value || '').toLowerCase();
    if (!ALLOWED_SIGNALS.includes(signal)) {
      throw new TypeError(`Signal must be one of: ${ALLOWED_SIGNALS.join(', ')}.`);
    }
    return signal;
  }

  function fingerprint(serials) {
    return `core1:${serials.join('.')}`;
  }

  function cleanSignals(values) {
    if (!Array.isArray(values)) return [];
    return [...new Set(values.filter(value => ALLOWED_SIGNALS.includes(value)))].sort();
  }

  function cleanWord(raw) {
    const signals = cleanSignals(raw && raw.signals);
    if (!signals.length) return null;
    const word = { signals };
    if (typeof raw.masteredAt === 'string' && signals.length >= REQUIRED_SIGNAL_COUNT) {
      word.masteredAt = raw.masteredAt;
    }
    return word;
  }

  function nextSignalFor(signals) {
    const completed = new Set(cleanSignals(signals));
    return ALLOWED_SIGNALS.find(signal => !completed.has(signal)) || 'meaning';
  }

  function modeForSignal(signal) {
    if (signal === 'recall') return 'review';
    if (signal === 'context') return 'context';
    return 'primary';
  }

  function cleanState(raw) {
    if (!raw || raw.version !== SCHEMA_VERSION || !raw.groups || typeof raw.groups !== 'object') {
      return emptyState();
    }
    const state = emptyState();
    for (const [groupKey, rawGroup] of Object.entries(raw.groups)) {
      if (!/^\d{2}$/.test(groupKey) || !rawGroup || typeof rawGroup !== 'object') continue;
      const words = {};
      for (const [serial, rawWord] of Object.entries(rawGroup.words || {})) {
        if (!/^\d+$/.test(serial)) continue;
        const word = cleanWord(rawWord);
        if (word) words[serial] = word;
      }
      state.groups[groupKey] = {
        fingerprint: typeof rawGroup.fingerprint === 'string' ? rawGroup.fingerprint : '',
        words,
        updatedAt: typeof rawGroup.updatedAt === 'string' ? rawGroup.updatedAt : null,
        completedAt: typeof rawGroup.completedAt === 'string' ? rawGroup.completedAt : null
      };
    }
    return state;
  }

  function createProgressStore(storage, options = {}) {
    let sessionRaw = null;
    let persistent = Boolean(storage && typeof storage.getItem === 'function' && typeof storage.setItem === 'function');
    const now = typeof options.now === 'function' ? options.now : () => new Date().toISOString();

    function readRaw() {
      if (persistent) {
        try {
          return storage.getItem(STORAGE_KEY);
        } catch {
          persistent = false;
        }
      }
      return sessionRaw;
    }

    function writeRaw(value) {
      sessionRaw = value;
      if (!persistent) return false;
      try {
        storage.setItem(STORAGE_KEY, value);
        return true;
      } catch {
        persistent = false;
        return false;
      }
    }

    function load() {
      const raw = readRaw();
      if (!raw) return emptyState();
      try {
        return cleanState(JSON.parse(raw));
      } catch {
        return emptyState();
      }
    }

    function groupView(state, groupKey, serials) {
      const group = state.groups[groupKey];
      const expected = new Set(serials.map(String));
      let started = 0;
      let mastered = 0;
      let evidenceUnits = 0;

      for (const serial of expected) {
        const signals = cleanSignals(group && group.words && group.words[serial] && group.words[serial].signals);
        if (signals.length) started += 1;
        if (signals.length >= REQUIRED_SIGNAL_COUNT) mastered += 1;
        evidenceUnits += Math.min(REQUIRED_SIGNAL_COUNT, signals.length);
      }

      const total = serials.length;
      const checked = total > 0 && mastered === total;
      return {
        group: Number(groupKey),
        status: checked ? 'mastered' : started > 0 ? 'in_progress' : 'not_started',
        started,
        mastered,
        total,
        percentage: Math.round((evidenceUnits / (total * REQUIRED_SIGNAL_COUNT)) * 100),
        checked,
        storage: persistent ? 'device' : 'session',
        updatedAt: group ? group.updatedAt : null,
        completedAt: checked && group ? group.completedAt : null
      };
    }

    function getGroupProgress({ group, expectedSerials }) {
      const groupKey = normalizeGroup(group);
      const serials = normalizeSerials(expectedSerials);
      return groupView(load(), groupKey, serials);
    }

    function getGroupPracticePlan({ group, expectedSerials }) {
      const groupKey = normalizeGroup(group);
      const serials = normalizeSerials(expectedSerials);
      const state = load();
      const stored = state.groups[groupKey];
      const items = serials.map(serial => {
        const signals = cleanSignals(stored?.words?.[String(serial)]?.signals);
        const nextSignal = nextSignalFor(signals);
        return {
          serial,
          signals,
          signalCount: signals.length,
          mastered: signals.length >= REQUIRED_SIGNAL_COUNT,
          nextSignal,
          nextMode: modeForSignal(nextSignal)
        };
      });
      return {
        group: Number(groupKey),
        total: items.length,
        remaining: items.filter(item => !item.mastered).length,
        items
      };
    }

    function recordCorrect({ group, serial, signal, expectedSerials }) {
      const groupKey = normalizeGroup(group);
      const serialKey = normalizeSerial(serial);
      const serials = normalizeSerials(expectedSerials);
      const serialSet = new Set(serials.map(String));
      if (!serialSet.has(serialKey)) throw new RangeError('Word serial is not part of the expected group content.');
      const normalizedSignal = normalizeSignal(signal);
      const timestamp = now();
      const state = load();
      const previous = state.groups[groupKey] || { words: {} };
      const words = {};

      for (const expectedSerial of serialSet) {
        const word = cleanWord(previous.words && previous.words[expectedSerial]);
        if (word) words[expectedSerial] = word;
      }

      const word = words[serialKey] || { signals: [] };
      word.signals = cleanSignals([...word.signals, normalizedSignal]);
      if (word.signals.length >= REQUIRED_SIGNAL_COUNT && !word.masteredAt) word.masteredAt = timestamp;
      words[serialKey] = word;

      state.groups[groupKey] = {
        fingerprint: fingerprint(serials),
        words,
        updatedAt: timestamp,
        completedAt: previous.completedAt || null
      };
      let progress = groupView(state, groupKey, serials);
      if (progress.checked && !state.groups[groupKey].completedAt) {
        state.groups[groupKey].completedAt = timestamp;
        progress = groupView(state, groupKey, serials);
      } else if (!progress.checked) {
        state.groups[groupKey].completedAt = null;
      }
      const savedToDevice = writeRaw(JSON.stringify(state));
      return { ...progress, storage: savedToDevice ? 'device' : 'session' };
    }

    function resetGroup(group) {
      const groupKey = normalizeGroup(group);
      const state = load();
      delete state.groups[groupKey];
      return writeRaw(JSON.stringify(state));
    }

    function storageMode() {
      return persistent ? 'device' : 'session';
    }

    return { getGroupProgress, getGroupPracticePlan, recordCorrect, resetGroup, storageMode };
  }

  function createBrowserProgressStore(root, options = {}) {
    let storage = null;
    try {
      storage = root && root.localStorage ? root.localStorage : null;
    } catch {
      storage = null;
    }
    return createProgressStore(storage, options);
  }

  return {
    STORAGE_KEY,
    SCHEMA_VERSION,
    FIRST_GROUP,
    LAST_GROUP,
    REQUIRED_SIGNAL_COUNT,
    ALLOWED_SIGNALS,
    nextSignalFor,
    modeForSignal,
    createProgressStore,
    createBrowserProgressStore,
    fingerprint
  };
});
