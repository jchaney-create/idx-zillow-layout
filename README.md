# IDX Zillow Layout

Separate embeddable widget that **scrapes IDX listing details pages** and re-renders them in a **Zillow-inspired layout**.

## Features

- Photo hero gallery + thumbnail grid
- Prominent price, address, beds/baths/sqft
- Sticky sidebar with tour/contact CTAs
- “About this home” from MLS remarks
- Facts & features accordions scraped from IDX field panels
- Hides the default IDX details UI when active (optional)

## Local development

```bash
npm install
npm run dev
```

## Replace mode (default)

By default the widget **replaces** the native IDX details layout — it does not stack on top.

- Hides IDX photos, address block, field panels, and nav as soon as the script loads
- Hides `#idx-listing-insights` if both widgets were present (use one or the other)
- Moves the native IDX **contact form** into the bottom of the Zillow layout

To keep the original IDX layout visible (not recommended):

```html
data-replace-content="false"
```

## Embed in IDX Broker

Paste into **Design → Website → Sub-Headers → Categories → Details** (HTML mode):

```html
<link
  rel="stylesheet"
  href="https://jchaney-create.github.io/idx-zillow-layout/idx-zillow-layout.css?v=0.1.0"
/>
<script
  src="https://jchaney-create.github.io/idx-zillow-layout/idx-zillow-layout.iife.js?v=0.1.0"
  data-replace-content="true"
></script>
```

See [docs/DEPLOY-CDN.md](docs/DEPLOY-CDN.md) for redeploy instructions.

**Important:** Remove the `idx-listing-insights` embed from the same page if you want a single layout. Use one widget for full page replace, or listing-insights alone for a summary band above the footer.

## Build

```bash
npm run build
```

Outputs:

- `dist/idx-zillow-layout.css`
- `dist/idx-zillow-layout.iife.js`

## Works with

- Legacy IDX templates (`jaycee.idxbroker.com`)
- AI redesign templates (`*.idxstaging.com`)

Uses the same DOM scraping patterns as `idx-listing-insights`.

## Pair with listing insights

For a **single** layout, use only `idx-zillow-layout` (replace mode hides the insights widget automatically if both are present).

If you prefer the native IDX details page **plus** a summary/local-info band above the footer, use `idx-listing-insights` alone — not both full-layout widgets.
