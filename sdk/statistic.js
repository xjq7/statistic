function visit() {
  if (
    PerformanceObserver &&
    PerformanceObserver.supportedEntryTypes.includes('navigation')
  ) {
    const navigationEntries = window.performance.getEntriesByType('navigation');
    const navigationType = navigationEntries[0].type;
    if (navigationType !== 'navigate') return;
  } else {
    const ntype = window.performance.navigation.type;
    if (ntype !== 0) return;
  }
  const referer = window.referer;
  const ua = window.navigator.userAgent;
  const hostname = window.location.hostname;
  window.fetch('https://si.xjq.icu/v1/visit', {
    body: {
      referer,
      ua,
      app_id: hostname,
    },
  });
}
visit();
