export function parseActionsFromDom() {
  const moreInfo = document.querySelector('#IDX-moreinfo, #IDX-detailsDescriptionActionsMoreInfo, a[href*="/idx/moreinfo/"]');
  const schedule = document.querySelector('#IDX-scheduleShowing, a[href*="/idx/scheduleshowing/"]');
  const save = document.querySelector('#IDX-saveProperty');
  const contactForm = document.querySelector('#IDX-detailsContactForm, #IDX-detailscontactContactForm');

  return {
    moreInfo: moreInfo?.href || null,
    moreInfoLabel: moreInfo?.textContent?.trim() || 'Request info',
    schedule: schedule?.href || null,
    scheduleLabel: schedule?.textContent?.trim() || 'Schedule a tour',
    saveSelector: save ? '#IDX-saveProperty' : null,
    saveLabel: save?.textContent?.trim() || 'Save listing',
    contactTarget: contactForm?.id || 'IDX-detailsContactForm',
  };
}

export function attachActions(container, actions) {
  container.querySelectorAll('[data-izl-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const type = button.getAttribute('data-izl-action');

      if (type === 'more-info' && actions.moreInfo) {
        event.preventDefault();
        window.location.href = actions.moreInfo;
        return;
      }

      if (type === 'schedule' && actions.schedule) {
        event.preventDefault();
        window.location.href = actions.schedule;
        return;
      }

      if (type === 'save' && actions.saveSelector) {
        event.preventDefault();
        document.querySelector(actions.saveSelector)?.click();
        return;
      }

      if (type === 'contact') {
        event.preventDefault();
        const target = document.getElementById(actions.contactTarget);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}
