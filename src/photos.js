function normalizeImageUrl(url) {
  if (!url) return '';
  return url.trim().replace(/\s+/g, '');
}

function addUniqueUrl(urls, url) {
  const normalized = normalizeImageUrl(url);
  if (!normalized || urls.includes(normalized)) return;
  urls.push(normalized);
}

export function parsePhotosFromDom() {
  const urls = [];

  document.querySelectorAll('#IDX-primaryPhoto img, .swiper-slide img, .IDX-carouselThumb img').forEach((img) => {
    addUniqueUrl(urls, img.getAttribute('data-src') || img.getAttribute('src'));
  });

  document.querySelectorAll('#IDX-detailsShowcaseSlides img, #IDX-detailsMedia img').forEach((img) => {
    addUniqueUrl(urls, img.getAttribute('data-src') || img.getAttribute('src'));
  });

  document.querySelectorAll('meta[property="og:image"]').forEach((meta) => {
    addUniqueUrl(urls, meta.getAttribute('content'));
  });

  return urls.filter((url) => url && !url.includes('ajaxLoadLarge.gif'));
}

export function getPhotoGalleryUrl() {
  return (
    document.querySelector('#IDX-detailsPhotoGalleryLink, #IDX-photoGalleryLink')?.href ||
    document.querySelector('a[href*="/idx/photogallery/"]')?.href ||
    null
  );
}
