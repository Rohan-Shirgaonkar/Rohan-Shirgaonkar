# Rohan Shirgaonkar — Digital Laboratory

A responsive personal portfolio made with semantic HTML, CSS, and vanilla JavaScript. It has no build step and uses no third-party JavaScript libraries.

## Run locally

From this directory, start the built-in static server:

```sh
python3 -m http.server 4173
```

Open <http://localhost:4173> in a browser. The site can also be hosted as a static site; the production deployment is on Vercel.

## Personal links

Edit `content.js` to update the supplied LinkedIn, GitHub, and email links. Project repository URLs are intentionally empty until the correct repositories are confirmed. Empty project URLs leave the cards without a repository action.

There is no résumé PDF yet. The résumé link is omitted from the contact panel while `profiles.resume` is empty. When a real résumé file is added, place it in `assets/` and set `profiles.resume` to its site path, for example `/assets/rohan-resume.pdf`.

The project artwork is illustrative rather than a screenshot of either program. The cards describe work in progress and should not be read as claims of completed product functionality.

## Motion and accessibility

The page keeps native document scrolling. Anchor links scroll smoothly; visible content reveals as it enters the viewport; the project artwork stays pinned beside its details on wide screens. The hero portrait has a restrained scroll fade/parallax, and the particle canvas pauses when the hero is offscreen. Reduced-motion preferences disable the movement and pinned project artwork.

The mobile navigation supports Escape and returns focus to its toggle. The curiosity selector is keyboard-operable. The responsive layout is defined in CSS breakpoints without a framework.

## Files

- `index.html` — page structure, portfolio content, and social metadata
- `styles.css` — visual system, responsive layout, motion, and reduced-motion fallback
- `script.js` — navigation, interest selector, configurable links, reveal effects, and particle canvas
- `content.js` — editable personal and project URLs
- `assets/` — favicon, social-card source and PNG, and optimized portrait
