(() => {
  const vocabulary = {};
  for (let group = 1; group <= 20; group += 1) {
    const id = String(group).padStart(2, '0');
    vocabulary[`groups/group-${id}.html`] = Object.freeze({
      limit: group === 1 ? 10 : 12,
      sourceLimit: group === 1 ? 55 : 12,
      missionSize: group === 1 ? 10 : 12,
      adaptive: group === 1,
      analyticsActivity: `band-ii-core-i-group-${id}`,
      progressGroup: group
    });
  }

  window.EFN_STAGE8_ROLLOUT = Object.freeze({
    version: '2026-08-26-core1-adaptive-stage6',
    vocabulary: Object.freeze(vocabulary),
    stories: Object.freeze({
      'l1-a1-new-student': Object.freeze({ questionSet: 'ra-001', analyticsActivity: 'read-along-ra-001' })
    })
  });
})();
