# Deploy built assets to a CDN

The widget ships as two static files in `dist/`:

- `idx-zillow-layout.iife.js`
- `idx-zillow-layout.css`

IDX only needs public HTTPS URLs for those files. You do **not** commit `dist/` to git — deploy publishes it to the `gh-pages` branch.

---

## GitHub Pages (recommended)

From the project root:

```bash
chmod +x scripts/deploy-github-pages.sh
./scripts/deploy-github-pages.sh
```

Optional args: `./scripts/deploy-github-pages.sh OWNER REPO_NAME public 0.1.0`

After deploy, assets are at:

```text
https://jchaney-create.github.io/idx-zillow-layout/idx-zillow-layout.iife.js
https://jchaney-create.github.io/idx-zillow-layout/idx-zillow-layout.css
```

### Paste into IDX

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

---

## Updating after changes

1. Edit the widget code.
2. Run `./scripts/deploy-github-pages.sh` again (or bump the version arg).
3. Bump the `?v=` query string in IDX so browsers fetch the new version.

---

## Checklist

- [ ] `npm run build` succeeds locally
- [ ] Deploy script completes without errors
- [ ] Open JS URL in browser — file displays (not 404)
- [ ] Paste embed snippet into IDX **Details** subheader
- [ ] View a listing page — Zillow layout replaces native IDX UI
