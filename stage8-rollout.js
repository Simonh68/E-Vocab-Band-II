(() => {
  const segmentChestCheckpoints = Object.freeze([2, 4, 6]);
  const vocabulary = {};
  for (let group = 1; group <= 20; group += 1) {
    const id = String(group).padStart(2, '0');
    const segmentedPilot = group === 2 || group === 20;
    vocabulary[`groups/group-${id}.html`] = Object.freeze({
      limit: 55,
      sourceLimit: 55,
      missionSize: 55,
      adaptive: true,
      coverageFirst: true,
      segmented: segmentedPilot,
      ...(segmentedPilot ? {
        segmentedUi: true,
        treasureChestSegments: segmentChestCheckpoints
      } : {}),
      analyticsActivity: `band-ii-core-i-group-${id}`,
      progressGroup: group
    });
  }

  window.EFN_STAGE8_ROLLOUT = Object.freeze({
    version: '2026-08-27-segmented-pilot-stage3',
    vocabulary: Object.freeze(vocabulary),
    stories: Object.freeze({
      'l1-a1-new-student': Object.freeze({ questionSet: 'ra-001', analyticsActivity: 'read-along-ra-001' })
    })
  });
})();
