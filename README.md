# jeshwin.engineer

Static personal website for Jeshwin William James.

## Contents

- `index.html`: portfolio structure and content
- `styles.css`: visual system and responsive layout
- `script.js`: lightweight visitor counter integration
- `assets/Jeshwin-William-James-Resume.pdf`: downloadable resume

## Local preview

From this folder:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Visitor counter

The site currently uses `countapi.xyz` in the browser for a no-backend total view counter.
If you prefer a first-party analytics solution later, replace the fetch call in `script.js`.

## Recommended deployment

This is a static site and can be deployed cleanly to:

- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages

Point the custom domain `jeshwin.engineer` to the hosting provider and enable HTTPS.
