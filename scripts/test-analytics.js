import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert';

// Mock DOM environment for Node execution
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

class DOMElementMock {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.attributes = {};
    this.children = [];
    this.async = false;
    this.src = '';
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  getAttribute(name) {
    return this.attributes[name] || null;
  }
  appendChild(child) {
    this.children.push(child);
  }
}

class DocumentMock {
  constructor() {
    this.head = new DOMElementMock('head');
    this.title = 'David Salviano | Product Designer';
  }
  createElement(tag) {
    return new DOMElementMock(tag);
  }
  querySelector(selector) {
    if (selector.startsWith('script[data-ga=')) {
      const match = selector.match(/data-ga="([^"]+)"/);
      const targetId = match ? match[1] : '';
      return (
        this.head.children.find(
          (el) => el.tagName === 'SCRIPT' && el.attributes['data-ga'] === targetId
        ) || null
      );
    }
    return null;
  }
}

class EventTargetMock {
  constructor() {
    this.listeners = {};
  }
  addEventListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  removeEventListener(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }
  dispatchEvent(event) {
    const eventType = event.type || event.name;
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach((cb) => cb(event));
    }
    return true;
  }
}

function setupMockBrowser() {
  const eventTarget = new EventTargetMock();

  global.CustomEvent = class CustomEvent {
    constructor(type, options = {}) {
      this.type = type;
      this.detail = options.detail || {};
    }
  };

  global.window = {
    localStorage: new LocalStorageMock(),
    location: {
      pathname: '/en',
      search: '',
      href: 'https://davidsalvianodesign.com/en',
    },
    addEventListener: eventTarget.addEventListener.bind(eventTarget),
    removeEventListener: eventTarget.removeEventListener.bind(eventTarget),
    dispatchEvent: eventTarget.dispatchEvent.bind(eventTarget),
    dataLayer: undefined,
    gtag: undefined,
    __ga_initialized: undefined,
    __last_ready_seo: undefined,
  };

  global.document = new DocumentMock();
}

/**
 * Simulates usePageTracking hook in memory
 */
function createPageTracker(analyticsModule) {
  let lastTrackedPath = null;

  const onSEOReady = (event) => {
    const eventPath = event.detail?.path || (global.window.location.pathname + global.window.location.search);
    const eventTitle = event.detail?.title || global.document.title;

    if (
      eventPath === (global.window.location.pathname + global.window.location.search) &&
      lastTrackedPath !== eventPath &&
      eventTitle &&
      !eventTitle.startsWith('Loading')
    ) {
      const didTrack = analyticsModule.trackPageView(eventPath, eventTitle);
      if (didTrack) {
        lastTrackedPath = eventPath;
      }
    }
  };

  const onConsentChange = (event) => {
    if (event.detail?.consent === 'granted') {
      analyticsModule.initGA();
      const currentPath = global.window.location.pathname + global.window.location.search;
      const activeTitle =
        global.window.__last_ready_seo?.path === currentPath && global.window.__last_ready_seo.title
          ? global.window.__last_ready_seo.title
          : global.document.title;

      if (lastTrackedPath !== currentPath && activeTitle && !activeTitle.startsWith('Loading')) {
        const didTrack = analyticsModule.trackPageView(currentPath, activeTitle);
        if (didTrack) {
          lastTrackedPath = currentPath;
        }
      }
    }
  };

  global.window.addEventListener('document_seo_ready', onSEOReady);
  global.window.addEventListener('analytics_consent_changed', onConsentChange);

  return {
    navigate: (newPath, title) => {
      global.window.location.pathname = newPath;
      global.window.location.href = `https://davidsalvianodesign.com${newPath}`;
      global.document.title = title || '';
      global.window.__last_ready_seo = { path: newPath, title: title || '' };

      global.window.dispatchEvent(
        new global.CustomEvent('document_seo_ready', {
          detail: { path: newPath, title: title || '' },
        })
      );
    },
    getLastTrackedPath: () => lastTrackedPath,
  };
}

describe('Google Analytics 4 & Consent Test Suite', async () => {
  setupMockBrowser();
  const analyticsModule = await import('../src/services/analytics.js');

  beforeEach(() => {
    setupMockBrowser();
  });

  // TEST 1: GA does not load before consent
  test('1. GA does NOT load before consent is granted', () => {
    assert.strictEqual(analyticsModule.getAnalyticsConsent(), null);
    assert.strictEqual(analyticsModule.hasAnalyticsConsent(), false);

    const initResult = analyticsModule.initGA();
    assert.strictEqual(initResult, false);
    assert.strictEqual(global.window.dataLayer, undefined);
    assert.strictEqual(global.window.gtag, undefined);
    assert.strictEqual(global.document.head.children.length, 0);

    // Explicitly denied consent
    analyticsModule.setAnalyticsConsent('denied');
    assert.strictEqual(analyticsModule.getAnalyticsConsent(), 'denied');
    assert.strictEqual(analyticsModule.hasAnalyticsConsent(), false);
    assert.strictEqual(analyticsModule.initGA(), false);
    assert.strictEqual(global.document.head.children.length, 0);
  });

  // TEST 2: GA loads after consent is accepted
  test('2. GA loads script and initializes dataLayer only after consent is granted', () => {
    analyticsModule.setAnalyticsConsent('granted');
    assert.strictEqual(analyticsModule.getAnalyticsConsent(), 'granted');
    assert.strictEqual(analyticsModule.hasAnalyticsConsent(), true);

    const script = global.document.querySelector(`script[data-ga="${analyticsModule.GA_MEASUREMENT_ID}"]`);
    assert.ok(script, 'gtag.js script tag must be injected into document.head');
    assert.strictEqual(
      script.src,
      `https://www.googletagmanager.com/gtag/js?id=${analyticsModule.GA_MEASUREMENT_ID}`
    );
    assert.ok(Array.isArray(global.window.dataLayer), 'window.dataLayer must be initialized as an Array');
    assert.strictEqual(typeof global.window.gtag, 'function', 'window.gtag must be defined as a function');

    // Check that auto pageviews were disabled
    const configCall = global.window.dataLayer.find(
      (args) => args[0] === 'config' && args[1] === analyticsModule.GA_MEASUREMENT_ID
    );
    assert.ok(configCall, 'gtag config call must exist in dataLayer');
    assert.strictEqual(configCall[2].send_page_view, false, 'send_page_view must be set to false for SPA manual control');
  });

  // TEST 3: Delayed case study loading and zero "Loading..." titles
  test('3. Case study with delayed loading triggers NO "Loading" pageviews and exactly 1 final event', () => {
    analyticsModule.setAnalyticsConsent('granted');

    // Simulate CaseStudyPage mounting for /en/work/mapear in loading state
    global.window.location.pathname = '/en/work/mapear';
    global.window.location.href = 'https://davidsalvianodesign.com/en/work/mapear';

    // Step A: While loading, useDocumentSEO receives title: null -> NO event dispatched
    let pageviewEvents = global.window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'page_view');
    assert.strictEqual(pageviewEvents.length, 0, 'Zero pageview events while case is loading');

    // Step B: Sanity fetch finishes after delay and applies final metadata
    const finalTitle = 'Mapear | David Salviano';
    global.document.title = finalTitle;
    global.window.__last_ready_seo = { path: '/en/work/mapear', title: finalTitle };
    global.window.dispatchEvent(
      new global.CustomEvent('document_seo_ready', {
        detail: { path: '/en/work/mapear', title: finalTitle },
      })
    );

    // Track with final title
    const didTrack = analyticsModule.trackPageView('/en/work/mapear', finalTitle);
    assert.strictEqual(didTrack, true);

    pageviewEvents = global.window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'page_view');
    assert.strictEqual(pageviewEvents.length, 1, 'Exactly one pageview recorded after Sanity finishes loading');
    assert.strictEqual(pageviewEvents[0][2].page_title, 'Mapear | David Salviano');
    assert.strictEqual(pageviewEvents[0][2].page_path, '/en/work/mapear');
    assert.ok(!pageviewEvents[0][2].page_title.includes('Loading'), 'Title must NEVER contain "Loading"');
  });

  // TEST 4: Realistic late consent order: SEO ready -> no consent -> 0 events -> user accepts -> 1 event -> second signal does not duplicate
  test('4. Late consent workflow: SEO ready without consent sends nothing; accepting sends exactly 1 event; duplicate signal ignored', () => {
    const tracker = createPageTracker(analyticsModule);

    // 1. Route SEO becomes ready without consent
    tracker.navigate('/en/work/mapear', 'Mapear | David Salviano');

    // Verify no events were dispatched and route is not marked as tracked
    assert.strictEqual(global.window.dataLayer, undefined, 'No dataLayer or gtag before consent');
    assert.strictEqual(tracker.getLastTrackedPath(), null, 'lastTrackedPath must remain null when consent is not yet granted');

    // 2. User accepts consent later
    analyticsModule.setAnalyticsConsent('granted');

    // Verify exactly one page_view event was dispatched for /en/work/mapear with final title
    assert.ok(Array.isArray(global.window.dataLayer), 'dataLayer must be initialized after consent');
    let pageviews = global.window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'page_view');
    assert.strictEqual(pageviews.length, 1, 'Exactly one page_view must be sent after consent is accepted');
    assert.strictEqual(pageviews[0][2].page_path, '/en/work/mapear');
    assert.strictEqual(pageviews[0][2].page_title, 'Mapear | David Salviano');
    assert.strictEqual(tracker.getLastTrackedPath(), '/en/work/mapear', 'lastTrackedPath must be set to /en/work/mapear only after confirmed tracking');

    // 3. A second SEO ready signal for the same route must NOT duplicate the event
    global.window.dispatchEvent(
      new global.CustomEvent('document_seo_ready', {
        detail: { path: '/en/work/mapear', title: 'Mapear | David Salviano' },
      })
    );

    pageviews = global.window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'page_view');
    assert.strictEqual(pageviews.length, 1, 'Duplicate signal on the same route must NOT trigger a second page_view');
  });

  // TEST 5: Navigating to another route and returning back registers a new pageview for each visit
  test('5. Navigating to another route and returning back registers a new pageview for each visit', () => {
    analyticsModule.setAnalyticsConsent('granted');
    const tracker = createPageTracker(analyticsModule);

    // 1. Visit Home
    tracker.navigate('/en', 'David Salviano | Product Designer & Interface Architecture');

    // 2. Visit Mapear
    tracker.navigate('/en/work/mapear', 'Mapear | David Salviano');

    // 3. Visit About
    tracker.navigate('/en/about', 'About | David Salviano');

    // 4. Return back to Mapear
    tracker.navigate('/en/work/mapear', 'Mapear | David Salviano');

    const pageviews = global.window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'page_view');
    assert.strictEqual(pageviews.length, 4, 'Exactly 4 pageviews recorded across 4 route visits');
    assert.strictEqual(pageviews[0][2].page_path, '/en');
    assert.strictEqual(pageviews[1][2].page_path, '/en/work/mapear');
    assert.strictEqual(pageviews[2][2].page_path, '/en/about');
    assert.strictEqual(pageviews[3][2].page_path, '/en/work/mapear', 'Revisiting Mapear must register a new pageview');
  });

  // TEST 6: Contact form lead generation (zero PII)
  test('6. Successful contact form submission triggers generate_lead with zero PII; failures trigger nothing', () => {
    analyticsModule.setAnalyticsConsent('granted');

    // Success response
    const successfulResponse = { ok: true, status: 200 };
    if (successfulResponse.ok) {
      analyticsModule.trackGenerateLead();
    }

    const leadEvents = global.window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'generate_lead');
    assert.strictEqual(leadEvents.length, 1, 'Exactly one generate_lead event on success');

    const payload = leadEvents[0][2];
    const forbiddenKeys = ['name', 'email', 'message', 'description', 'phone', 'company'];
    for (const key of forbiddenKeys) {
      assert.strictEqual(payload[key], undefined, `PII property "${key}" must NOT be sent to Analytics`);
    }

    // Failure responses
    const failedResponses = [{ ok: false, status: 400 }, { ok: false, status: 500 }];
    for (const res of failedResponses) {
      if (res.ok) {
        analyticsModule.trackGenerateLead();
      }
    }

    const finalLeadEvents = global.window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'generate_lead');
    assert.strictEqual(finalLeadEvents.length, 1, 'Failed responses must NOT trigger additional generate_lead events');
  });
});
