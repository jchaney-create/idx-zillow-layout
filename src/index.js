import { isDetailsPage, waitForListingData } from './parser.js';
import { parsePhotosFromDom, getPhotoGalleryUrl } from './photos.js';
import { parseFieldGroupsFromDom, parseHighlightFacts } from './fields.js';
import { parseActionsFromDom, attachActions } from './actions.js';
import { renderLayout, attachGallery, mountLayout } from './layout.js';
import {
  activateReplaceMode,
  deactivateReplaceMode,
  relocateNativeContactForm,
  ensureSingleLayoutContainer,
  removeLayoutContainer,
  waitForMountTarget,
} from './replace.js';

const LOG_PREFIX = '[idx-zillow-layout]';

function findScript() {
  if (document.currentScript?.src?.includes('idx-zillow-layout')) {
    return document.currentScript;
  }
  const scripts = document.querySelectorAll('script[src*="idx-zillow-layout"]');
  return scripts[scripts.length - 1] || null;
}

function readConfig() {
  const script = findScript();
  return {
    containerId: script?.dataset?.containerId || 'idx-zillow-layout',
    replaceContent: script?.dataset?.replaceContent !== 'false',
    autoMount: script?.dataset?.autoMount !== 'false',
  };
}

function log(...args) {
  console.info(LOG_PREFIX, ...args);
}

function warn(...args) {
  console.warn(LOG_PREFIX, ...args);
}

async function initLayout(config) {
  if (!isDetailsPage()) {
    log('Not a listing details page — skipping.');
    return;
  }

  let wrapper;
  try {
    wrapper = await waitForMountTarget();
  } catch (error) {
    warn(error.message || 'IDX details container not found');
    return;
  }

  const container = config.autoMount
    ? ensureSingleLayoutContainer(config, wrapper)
    : document.getElementById(config.containerId);

  if (!container) {
    warn(`Container #${config.containerId} not found`);
    return;
  }

  container.classList.add('izl-loading');
  container.innerHTML = '<div class="izl-page"><p class="izl-muted">Loading listing layout…</p></div>';

  try {
    const listing = await waitForListingData({ timeoutMs: 20000 });
    const photos = parsePhotosFromDom();
    const galleryUrl = getPhotoGalleryUrl();
    const fieldGroups = parseFieldGroupsFromDom();
    const highlightFacts = parseHighlightFacts(listing);
    const actions = parseActionsFromDom();

    mountLayout(
      container,
      renderLayout({
        listing,
        photos,
        galleryUrl,
        fieldGroups,
        highlightFacts,
        actions,
      })
    );

    attachGallery(container, photos);
    attachActions(container, actions);

    if (config.replaceContent) {
      relocateNativeContactForm(container);
      activateReplaceMode();
    }

    container.classList.remove('izl-loading');
    container.classList.add('izl-ready');
    log('Layout ready for', listing.fullAddress || listing.listingId || window.location.pathname);
  } catch (error) {
    deactivateReplaceMode();
    removeLayoutContainer(config);
    warn(error.message || 'Unable to render listing layout.');
  }
}

function boot() {
  const config = readConfig();

  const start = () => initLayout(config);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}

boot();

export { initLayout, readConfig };
