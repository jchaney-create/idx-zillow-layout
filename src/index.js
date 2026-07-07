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
} from './replace.js';

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

async function initLayout(config) {
  if (!isDetailsPage()) return;

  if (config.replaceContent) {
    activateReplaceMode();
  }

  const container = config.autoMount
    ? ensureSingleLayoutContainer(config)
    : document.getElementById(config.containerId);

  if (!container) {
    console.warn(`[idx-zillow-layout] Container #${config.containerId} not found`);
    return;
  }

  container.innerHTML = '<div class="izl-page"><p class="izl-muted">Loading listing layout…</p></div>';

  try {
    const listing = await waitForListingData();
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
  } catch (error) {
    if (config.replaceContent) {
      deactivateReplaceMode();
    }
    container.innerHTML = `<div class="izl-page"><p class="izl-muted">${error.message || 'Unable to render listing layout.'}</p></div>`;
  }
}

function boot() {
  const config = readConfig();

  if (config.replaceContent && isDetailsPage()) {
    activateReplaceMode();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initLayout(config));
  } else {
    initLayout(config);
  }
}

boot();

export { initLayout, readConfig };
