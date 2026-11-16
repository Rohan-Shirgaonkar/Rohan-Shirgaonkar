# Rohan Shirgaonkar — Digital Laboratory

A lightweight, responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. It uses no build step or third-party JavaScript libraries.

## Run locally

From this directory, run:

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Personalize before sharing

Edit `content.js` to add the real LinkedIn, GitHub, email, résumé, and project repository links. Empty values render as non-clickable “ADD DETAILS” labels. Add only links you own and can verify.

One supplied close-up portrait is used in the home hero. No project screenshots were supplied, so the computational project graphics are illustrations and are labeled accordingly; they do not imply shipped project functionality.

## Files

- `index.html` — page structure and content
- `styles.css` — visual system, responsive layout, and reduced-motion fallback
- `script.js` — navigation, interest selector, configurable links, reveals, and lightweight particle canvas
- `content.js` — editable personal and repository links
- `assets/` — favicon, social-sharing graphic, and optimized portrait photos

The home hero uses one supplied close-up portrait, resized and compressed as WebP. It blends into the page background and fades as it scrolls out of view. The other supplied photos are left out to keep the page focused on one natural portrait.
