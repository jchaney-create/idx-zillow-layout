import './styles.css';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatStat(value, suffix = '') {
  if (value == null || value === '') return null;
  return `${value}${suffix}`;
}

function renderGallery(photos, galleryUrl) {
  if (!photos.length) {
    return `<div class="izl-gallery-empty">Photos unavailable</div>`;
  }

  const hero = photos[0];
  const thumbs = photos.slice(1, 7);
  const remaining = Math.max(photos.length - 7, 0);

  return `
    <div class="izl-gallery">
      <div class="izl-gallery-hero">
        <img src="${escapeHtml(hero)}" alt="Primary listing photo" />
        ${
          galleryUrl
            ? `<a class="izl-gallery-all" href="${escapeHtml(galleryUrl)}">See all ${photos.length} photos</a>`
            : `<span class="izl-gallery-all">${photos.length} photos</span>`
        }
      </div>
      <div class="izl-gallery-thumbs">
        ${thumbs
          .map(
            (photo, index) => `
              <button type="button" class="izl-gallery-thumb" data-izl-photo-index="${index + 1}">
                <img src="${escapeHtml(photo)}" alt="" />
              </button>
            `
          )
          .join('')}
        ${remaining > 0 ? `<div class="izl-gallery-more">+${remaining} more</div>` : ''}
      </div>
    </div>
  `;
}

function renderStats(listing) {
  const stats = [
    listing.bedrooms != null ? `<span><strong>${listing.bedrooms}</strong> bd</span>` : '',
    listing.bathrooms != null ? `<span><strong>${listing.bathrooms}</strong> ba</span>` : '',
    listing.sqft != null ? `<span><strong>${listing.sqft.toLocaleString()}</strong> sqft</span>` : '',
    listing.acres != null ? `<span><strong>${listing.acres}</strong> ac</span>` : '',
  ].filter(Boolean);

  return stats.length ? `<div class="izl-stats">${stats.join('')}</div>` : '';
}

function renderFacts(facts) {
  if (!facts.length) return '';

  return `
    <div class="izl-facts-grid">
      ${facts
        .map(
          (fact) => `
            <div class="izl-fact">
              <span>${escapeHtml(fact.label)}</span>
              <strong>${escapeHtml(fact.value)}</strong>
            </div>
          `
        )
        .join('')}
    </div>
  `;
}

function renderFieldGroups(groups) {
  if (!groups.length) return '<p class="izl-muted">No additional property details found.</p>';

  return groups
    .map(
      (group) => `
        <details class="izl-accordion" open>
          <summary>${escapeHtml(group.title)}</summary>
          <dl class="izl-field-list">
            ${group.fields
              .map(
                (field) => `
                  <div>
                    <dt>${escapeHtml(field.label)}</dt>
                    <dd>${escapeHtml(field.value)}</dd>
                  </div>
                `
              )
              .join('')}
          </dl>
        </details>
      `
    )
    .join('');
}

function renderSidebar(listing, actions) {
  return `
    <aside class="izl-sidebar">
      <div class="izl-sidebar-card">
        <div class="izl-price">${escapeHtml(listing.priceDisplay || 'Price unavailable')}</div>
        <div class="izl-address-block">
          <strong>${escapeHtml(listing.address || listing.fullAddress)}</strong>
          <span>${escapeHtml([listing.city, listing.state, listing.zipcode].filter(Boolean).join(', '))}</span>
        </div>
        ${renderStats(listing)}
        <div class="izl-sidebar-actions">
          ${
            actions.schedule
              ? `<button type="button" class="izl-btn izl-btn-primary" data-izl-action="schedule">${escapeHtml(actions.scheduleLabel)}</button>`
              : ''
          }
          <button type="button" class="izl-btn izl-btn-secondary" data-izl-action="contact">Contact agent</button>
          ${
            actions.moreInfo
              ? `<button type="button" class="izl-btn izl-btn-ghost" data-izl-action="more-info">${escapeHtml(actions.moreInfoLabel)}</button>`
              : ''
          }
          ${
            actions.saveSelector
              ? `<button type="button" class="izl-btn izl-btn-ghost" data-izl-action="save">${escapeHtml(actions.saveLabel)}</button>`
              : ''
          }
        </div>
      </div>
    </aside>
  `;
}

export function renderLayout({ listing, photos, galleryUrl, fieldGroups, highlightFacts, actions }) {
  return `
    <div class="izl-page">
      ${renderGallery(photos, galleryUrl)}

      <div class="izl-body">
        <div class="izl-main">
          <header class="izl-header">
            <div class="izl-price-mobile">${escapeHtml(listing.priceDisplay || '')}</div>
            <h1 class="izl-title">${escapeHtml(listing.fullAddress || listing.address || 'Listing details')}</h1>
            ${renderStats(listing)}
            <p class="izl-meta">${escapeHtml([listing.propertyType, listing.propertySubType, listing.county ? `${listing.county} County` : ''].filter(Boolean).join(' · '))}</p>
          </header>

          <section class="izl-section">
            <h2>What's special</h2>
            ${renderFacts(highlightFacts)}
          </section>

          ${
            listing.description
              ? `<section class="izl-section">
                  <h2>About this home</h2>
                  <p class="izl-description">${escapeHtml(listing.description)}</p>
                </section>`
              : ''
          }

          ${
            listing.schools?.length
              ? `<section class="izl-section">
                  <h2>Schools</h2>
                  <ul class="izl-schools">
                    ${listing.schools
                      .map(
                        (school) =>
                          `<li><strong>${escapeHtml(school.name)}</strong><span>${escapeHtml(school.level || '')}</span></li>`
                      )
                      .join('')}
                  </ul>
                </section>`
              : ''
          }

          <section class="izl-section">
            <h2>Facts &amp; features</h2>
            ${renderFieldGroups(fieldGroups)}
          </section>
        </div>

        ${renderSidebar(listing, actions)}
      </div>
    </div>
  `;
}

export function attachGallery(container, photos) {
  const heroImg = container.querySelector('.izl-gallery-hero img');
  container.querySelectorAll('[data-izl-photo-index]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.getAttribute('data-izl-photo-index'));
      if (!heroImg || !photos[index]) return;
      heroImg.src = photos[index];
      container.querySelectorAll('.izl-gallery-thumb').forEach((thumb) => thumb.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });
}

export function mountLayout(container, html) {
  container.innerHTML = html;
}
