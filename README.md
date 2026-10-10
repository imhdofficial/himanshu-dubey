# Himanshu Dubey Portfolio — V4

Static HTML/CSS/JavaScript portfolio prepared for GitHub Pages.

V4 upgrades the six capability pages with high-resolution, topic-specific visual media, tool/technology marks, an AI motion panel, refined mobile presentation, and corrected hero portrait framing.

# Himanshu Dubey — Portfolio V3

Static HTML/CSS/JavaScript portfolio designed for GitHub Pages. No PHP or build step is required.

## Run locally

Open `index.html` directly, or run a small static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Main pages

- `index.html`
- Project case studies: `case-study/`
  - AI Product Chatbot
  - Loyalty Program
  - Mewaram
  - E-Idea Box
- Capability deep-dives: `expertise/`
  - Product Design
  - Frontend Engineering
  - Shopify Commerce
  - Platforms & Integration
  - AI-Assisted Execution
  - Testing & QA
- Process deep-dives: `process/`
  - Understand
  - Design
  - Build
  - Verify

## GitHub Pages

Push the folder contents to the repository root. In GitHub, open Settings → Pages, select **Deploy from a branch**, choose the main branch and `/ (root)`.


## Clean URLs and 404 fallback

The public site keeps clean portfolio URLs without exposing `.html` in the address bar.

Examples:

- `/case-study/mewaram`
- `/expertise/product-design`
- `/expertise/testing-qa`
- `/process/design`

The existing static `.html` files remain in place. `assets/js/main.js` cleans the address bar after page load, while `404.html` and `assets/js/404.js` restore direct visits and refreshes on GitHub Pages. Unknown routes show the custom portfolio 404 page.
