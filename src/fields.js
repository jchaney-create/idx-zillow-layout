function readField(fieldEl) {
  const label = fieldEl.querySelector('.IDX-label')?.textContent?.trim() ?? '';
  const value = fieldEl.querySelector('.IDX-text, .IDX-fieldData')?.textContent?.trim().replace(/\s+/g, ' ') ?? '';
  if (!label || !value) return null;
  return { label, value };
}

export function parseFieldGroupsFromDom() {
  const groups = [];
  const panels = document.querySelectorAll(
    '#IDX-fieldsWrapper .IDX-panel, #IDX-detailsFields .IDX-panel, #IDX-detailsBasicInfo'
  );

  panels.forEach((panel) => {
    const title =
      panel.querySelector('.IDX-panel-title')?.textContent?.trim().replace(/\s+/g, ' ') ||
      panel.querySelector('.IDX-panel-heading')?.textContent?.trim().replace(/\s+/g, ' ') ||
      'Property details';

    const fields = Array.from(panel.querySelectorAll('.IDX-field'))
      .map(readField)
      .filter(Boolean);

    if (!fields.length) return;

    const existing = groups.find((group) => group.title === title);
    if (existing) {
      existing.fields.push(...fields);
      return;
    }

    groups.push({ title, fields });
  });

  return groups;
}

export function parseHighlightFacts(listing) {
  const facts = [];

  if (listing.propertyType) facts.push({ label: 'Type', value: listing.propertyType });
  if (listing.propertySubType) facts.push({ label: 'Sub type', value: listing.propertySubType });
  if (listing.yearBuilt != null) facts.push({ label: 'Year built', value: String(listing.yearBuilt) });
  if (listing.sqft != null) facts.push({ label: 'Square feet', value: listing.sqft.toLocaleString() });
  if (listing.acres != null) facts.push({ label: 'Lot size', value: `${listing.acres} acres` });
  if (listing.county) facts.push({ label: 'County', value: listing.county });
  if (listing.schoolDistrict) facts.push({ label: 'School district', value: listing.schoolDistrict });
  if (listing.listingId) facts.push({ label: 'Listing ID', value: listing.listingId });

  return facts;
}
