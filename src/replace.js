const REPLACE_STYLE_ID = 'idx-zillow-layout-replace-css';

const HIDE_SELECTORS = [
  '#IDX-Subheader',
  '#IDX-detailsTopNav',
  '#IDX-detailsTopActions',
  '#IDX-detailsHeader',
  '#IDX-detailsHead',
  '#IDX-detailsMedia',
  '#IDX-detailsAddress',
  '#IDX-detailsMainInfo',
  '#IDX-description',
  '#IDX-detailsDescription',
  '#IDX-detailsFields',
  '#IDX-fieldsWrapper',
  '#IDX-detailsHotActions',
  '#IDX-details-row-content',
  '#IDX-detailsPageContainer',
  '#IDX-detailsMain',
  '#IDX-similar-listings-title',
  '#IDX-similar-listings-result',
  '#IDX-sharethis',
  '#IDX-detailsShareThis',
  '#IDX-detailsSlidesActions',
  'ai-redesign-widget',
  '#idx-listing-insights',
].join(',\n  ');

const REPLACE_CSS = `
  html[data-izl-active='true'] ${HIDE_SELECTORS} {
    display: none !important;
  }

  html[data-izl-active='true'] #IDX-detailsWrapper > :not(#idx-zillow-layout):not(script):not(style):not(link) {
    display: none !important;
  }

  html[data-izl-active='true'] #IDX-main.IDX-page-listing,
  html[data-izl-active='true'] #IDX-main.IDX-category-details {
    background: #eef2f7;
  }

  html[data-izl-active='true'] #idx-zillow-layout {
    display: block !important;
  }

  html[data-izl-active='true'] .izl-native-contact {
    display: block !important;
  }
`;

export function activateReplaceMode() {
  document.documentElement.dataset.izlActive = 'true';

  if (!document.getElementById(REPLACE_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = REPLACE_STYLE_ID;
    style.textContent = REPLACE_CSS;
    document.head.appendChild(style);
  }
}

export function deactivateReplaceMode() {
  delete document.documentElement.dataset.izlActive;
  document.getElementById(REPLACE_STYLE_ID)?.remove();
}

const CONTACT_SELECTORS = [
  '#IDX-detailsContactForm',
  '#IDX-scheduleshowingContainer',
  '#IDX-detailscontactContainer',
];

export function relocateNativeContactForm(container) {
  const page = container.querySelector('.izl-page');
  if (!page) return;

  for (const selector of CONTACT_SELECTORS) {
    const contact = document.querySelector(selector);
    if (!contact) continue;

    let host = page.querySelector('.izl-native-contact');
    if (!host) {
      host = document.createElement('section');
      host.className = 'izl-section izl-native-contact';
      host.innerHTML = '<h2>Contact agent</h2>';
      page.appendChild(host);
    }

    host.appendChild(contact);
    return;
  }
}

export function findMountWrapper() {
  return document.querySelector('#IDX-detailsWrapper') || document.querySelector('#IDX-main');
}

export function waitForMountTarget({ timeoutMs = 20000, intervalMs = 100 } = {}) {
  return new Promise((resolve, reject) => {
    const started = Date.now();

    const tryResolve = () => {
      const wrapper = findMountWrapper();
      if (wrapper) {
        resolve(wrapper);
        return true;
      }
      return false;
    };

    if (tryResolve()) return;

    const observer = new MutationObserver(() => {
      if (tryResolve()) observer.disconnect();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    const poll = () => {
      if (tryResolve()) {
        observer.disconnect();
        return;
      }

      if (Date.now() - started >= timeoutMs) {
        observer.disconnect();
        reject(new Error('IDX details container not found'));
        return;
      }

      setTimeout(poll, intervalMs);
    };

    poll();
  });
}

export function ensureSingleLayoutContainer(config, wrapper = findMountWrapper()) {
  if (!wrapper) return null;

  let container = document.getElementById(config.containerId);

  if (container && container.parentElement !== wrapper) {
    wrapper.insertBefore(container, wrapper.firstChild);
  }

  if (!container) {
    container = document.createElement('div');
    container.id = config.containerId;
    wrapper.insertBefore(container, wrapper.firstChild);
  }

  return container;
}

export function removeLayoutContainer(config) {
  document.getElementById(config.containerId)?.remove();
}
