# monishkapadia.in — 2026

Plain static site. No framework, no npm install, no build tooling required to host it.
Everything under this folder is what gets deployed.

## Structure

```
site/
  index.html            generated
  about/index.html      generated
  work/<slug>/index.html generated
  404.html              generated
  favicon.svg           generated
  sitemap.xml           generated
  robots.txt            generated
  _headers              cache rules (Netlify / Cloudflare Pages)
  vercel.json           clean URLs (Vercel)
  assets/
    css/main.css        hand-written  ← edit freely
    js/main.js          hand-written  ← edit freely
    media/              optimised images + video
    monishkapadia-resume.pdf
  data/content.mjs      ALL copy, project order, media picks  ← edit this
  build.mjs             regenerates the HTML from data/content.mjs
```

## Editing

**Copy, project order, which media appears where:** edit `data/content.mjs`, then:

```bash
node build.mjs
```

That rewrites the HTML files. Node 18+ is all you need, no packages.

**Design:** edit `assets/css/main.css` directly. It is not generated.

Do not hand-edit the generated `.html` files. `build.mjs` overwrites them.

## Adding a project

1. Drop optimised media in `assets/media/<slug>/`.
2. Add a 6-second tile loop at `assets/media/loops/<slug>.mp4` + `.jpg`.
3. Add an entry to the `projects` array in `data/content.mjs`.
4. `node build.mjs`. The build prints a warning listing any media file it could not find.

## Viewing it locally

All internal links are relative, so you can double-click `index.html` and it will open
styled and navigable straight from Finder. Browsers restrict video over `file://`, so the
films and loops may not play that way. For the real thing, run a server from this folder:

```bash
cd "~/Claude/Projects/Portfolio Revamp/site"
python3 -m http.server 8000
```

Then open http://localhost:8000

## Hosting

The site is fully static with relative paths, so it works on anything, at a domain root
or in a subfolder.

**Vercel** — import the repo, framework preset "Other", output directory `site`. `vercel.json` turns on clean URLs.

**Netlify** — drag this folder into the Netlify dashboard, or connect the repo with publish directory `site` and no build command. `_headers` sets long cache on media.

**Cloudflare Pages** — same, publish directory `site`, no build command.

**GitHub Pages** — push the contents of `site/` to the branch Pages serves. Relative paths mean
it works from a project subpath too, not just a domain root.

**Any plain web server** — copy the folder into the web root.

### Pointing the domain

Once deployed, add `monishkapadia.in` and `www.monishkapadia.in` as custom domains in the host's dashboard, then update the DNS records at your registrar to whatever the host gives you. Wix keeps serving the old site until DNS moves, so nothing goes dark in between.

## Media

Source files live in `../~import_wix_site_folders/` and are not deployed. Everything in
`assets/media/` was transcoded from them: H.264 MP4 at 1440–1600px with faststart,
JPEG stills at 1800px, and 6-second silent tile loops at 1280px.

To re-run the optimiser, see `build/opt.sh` in the session notes, or transcode manually:

```bash
ffmpeg -i input.mp4 -vf "scale='2*floor(min(1600,iw)/2)':-2:flags=lanczos" \
  -c:v libx264 -crf 26 -preset veryfast -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 128k output.mp4
```

Long campaign films use `preload="none"` and only load when clicked, so the first paint
stays light no matter how many films a case study has.

## Accessibility & performance notes

- `prefers-reduced-motion` disables the hero cycle, tile autoplay and scroll reveals.
- Tile loops play on hover on desktop and on scroll-into-view on touch, never on load.
- All images are lazy-loaded below the fold.
- Focus states are visible; there is a skip link.
