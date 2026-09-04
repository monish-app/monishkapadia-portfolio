#!/usr/bin/env node
/* ============================================================
   Static site generator. Zero dependencies.
   Run:  node build.mjs

   All internal links are RELATIVE, so the site works three ways:
     1. opened straight from Finder (file://)
     2. served locally (python3 -m http.server)
     3. deployed to any host, at a domain root or in a subfolder
   ============================================================ */
import { site, projects, awards, about } from "./data/content.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const MEDIA = path.join(ROOT, "assets", "media");
const missing = [];

const esc = (s = "") =>
  String(s).replace(/&(?!\w+;|#\d+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const write = (rel, html) => {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html.replace(/\n{3,}/g, "\n\n"));
  console.log("  ·", rel);
};

/* depth 0 = site root, 1 = /about/, 2 = /work/<slug>/ */
const up = (depth) => "../".repeat(depth);

function media(depth, rel, ext) {
  const p = path.join(MEDIA, rel + ext);
  if (!fs.existsSync(p)) missing.push(rel + ext);
  return `${up(depth)}assets/media/${rel}${ext}`;
}
const asset = (depth, abs) => up(depth) + String(abs).replace(/^\//, "");

/* ---------- head ---------- */
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;900&family=Instrument+Serif:ital@0;1&display=swap">`;

/* Set the theme before first paint so there is no flash. */
const THEME_BOOT = `<script>(function(){document.documentElement.className+=" js";try{var t=localStorage.getItem("mk-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})();</script>`;

function head({ title, desc, url, image, depth }) {
  const u = up(depth);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${site.origin}${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${site.origin}${url}">
<meta property="og:image" content="${site.origin}${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#050505">
<link rel="icon" href="${u}assets/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="${u}assets/apple-touch-icon.png">
${FONTS}
<link rel="stylesheet" href="${u}assets/css/main.css">
${THEME_BOOT}
</head>
<body>
<div class="veil" aria-hidden="true"></div>\n<a class="skip" href="#main">Skip to content</a>`;
}

/* ---------- award badges ---------- */
const BADGES = {
  "red-dot":      { alt: "Red Dot Award winner 2026", light: true },
  "addy":         { alt: "American Advertising Awards", light: true },
  "applied-arts": { alt: "Applied Arts Award", light: false },
  "scaddy-gold":  { alt: "SCADDY Gold", light: false },
  "scaddy-silver":{ alt: "SCADDY Silver", light: false }
};
function badges(depth, list, cls) {
  if (!list || !list.length) return "";
  const u = up(depth);
  return `<ul class="badges ${cls || ""}">${list
    .map((k) => {
      const b = BADGES[k];
      if (!b) return "";
      const dark = `${u}assets/badges/badge-${k}.png`;
      return `<li data-k="${k}">${
        b.light
          ? `<img class="b-dark" src="${dark}" alt="${esc(b.alt)}" loading="lazy"><img class="b-light" src="${u}assets/badges/badge-${k}--light.png" alt="" aria-hidden="true" loading="lazy">`
          : `<img src="${dark}" alt="${esc(b.alt)}" loading="lazy">`
      }</li>`;
    })
    .join("")}</ul>`;
}

function badgeImg(depth, k) {
  const b = BADGES[k];
  if (!b) return "";
  const u = up(depth);
  const dark = `${u}assets/badges/badge-${k}.png`;
  return b.light
    ? `<img class="b-dark" src="${dark}" alt="${esc(b.alt)}" loading="lazy"><img class="b-light" src="${u}assets/badges/badge-${k}--light.png" alt="" aria-hidden="true" loading="lazy">`
    : `<img src="${dark}" alt="${esc(b.alt)}" loading="lazy">`;
}

/* Recognition strip: the marks, scrolling forever */
function badgeStrip(depth, list) {
  const set = list
    .map((k) => `<span class="bstrip__b" data-k="${k}">${badgeImg(depth, k)}</span>`)
    .join("");
  const group = `<div class="bstrip__g">${set.repeat(4)}</div>`;
  return `<div class="bstrip" aria-hidden="true"><div class="bstrip__track">${group}${group}</div></div>`;
}

/* Home proof row: mark + count + the award typed out */
function awardSummary(depth, list) {
  return `<ul class="badges badges--band">${list
    .map(
      (a) => `<li data-k="${a.badge}">
      <h3 class="badges__t">${esc(a.name)}</h3>
      <ul class="badges__d">${a.detail.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </li>`
    )
    .join("")}</ul>`;
}

/* ---------- top bar ---------- */
function top(depth, back) {
  const u = up(depth);
  return `<header class="top"><div class="wrap top__in">
  <a class="logo" href="${u}index.html" aria-label="Monish Kapadia, home"><img src="${u}assets/logo-mk.png" alt="Monish Kapadia" width="720" height="410"></a>
  ${back ? `<a class="back" href="${u}index.html">&larr; Index</a>` : `<a class="top__link" href="mailto:${site.email}">${site.email}</a>`}
</div></header>`;
}

/* ---------- pill nav + theme toggle ---------- */
function chrome(depth, current) {
  const u = up(depth);
  const on = (k) => (current === k ? ' aria-current="page"' : "");
  return `<nav class="pills" aria-label="Sections">
  <a href="${u}index.html"${on("home")}>Home</a>
  <a href="${u}index.html#work"${on("work")}>Work</a>
  <a href="${u}about/index.html"${on("about")}>About</a>
  <a href="mailto:${site.email}">Contact</a>
</nav>
<button class="themetoggle" type="button" data-theme-toggle aria-label="Switch colour theme">
  <i aria-hidden="true">&#9686;</i><span data-theme-label>Dark</span>
</button>`;
}

/* ---------- footer ---------- */
function foot(depth, current) {
  const u = up(depth);
  return `<footer class="foot"><div class="wrap">
<div class="foot__in">
  <div>
    <p class="d foot__q" data-anim>So, what if we made <span class="s">something</span> together?</p>
    <a class="mail" href="mailto:${site.email}" style="margin-top:1.6rem">${site.email}</a>
  </div>
  <div class="foot__links">
    <a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn &#8599;</a>
    <a href="${asset(depth, site.resume)}" target="_blank" rel="noopener">Résumé &#8599;</a>
    <a href="${u}about/index.html">About</a>
  </div>
</div>
<div class="foot__base">
  <img src="${u}assets/logo-mk.png" alt="" width="720" height="410">
  <span class="label">${esc(site.city)} &middot; ${new Date().getFullYear()}</span>
</div>
</div></footer>
${chrome(depth, current)}
<script src="${u}assets/js/main.js" defer></script>
</body>
</html>`;
}

/* ---------- media renderers ---------- */
function renderOne(depth) {
  return function render(item) {
    if (item.t === "grid") {
      return `<div class="media-grid mg-${item.cols}">${item.items.map(render).join("\n")}</div>`;
    }
    const poster = media(depth, item.src, ".jpg");
    if (item.t === "film") {
      const src = media(depth, item.src, ".mp4");
      return `<figure class="stage film">
  <img class="film__poster" src="${poster}" alt="${esc(item.cap || "")}" loading="lazy" decoding="async">
  <video class="film__vid" preload="none" data-src="${src}" playsinline></video>
  <button class="film__btn" type="button" aria-label="Play ${esc(item.cap)}"><span>&#9654; Play${item.cap ? " &middot; " + esc(item.cap) : ""}</span></button>
</figure>`;
    }
    if (item.t === "loop") {
      const src = media(depth, item.src, ".mp4");
      return `<figure>
  <div class="stage"><video data-loop src="${src}" poster="${poster}" muted loop playsinline preload="metadata"></video></div>
  ${item.cap ? `<figcaption>${esc(item.cap)}</figcaption>` : ""}
</figure>`;
    }
    return `<figure>
  <div class="stage"><img src="${poster}" alt="${esc(item.cap || "")}" loading="lazy" decoding="async"></div>
  ${item.cap ? `<figcaption>${esc(item.cap)}</figcaption>` : ""}
</figure>`;
  };
}

/* ---------- home ---------- */
function home() {
  const d = 0;
  const peek = JSON.stringify(
    projects.map((p) => ({
      src: asset(d, p.tile.video),
      poster: asset(d, p.tile.poster),
      href: `work/${p.slug}/index.html`
    }))
  ).replace(/"/g, "&quot;");

  const cards = projects
    .map(
      (p, i) => `<a class="card${p.wide ? " card--wide" : ""} rise" href="work/${p.slug}/index.html">
  <div class="card__stage">
    <span class="card__idx">${String(i + 1).padStart(2, "0")}</span>
    <video data-loop src="${asset(d, p.tile.video)}" poster="${asset(d, p.tile.poster)}" muted loop playsinline preload="none"></video>
    ${badges(d, p.badges, "badges--tile")}
  </div>
  <div class="card__body">
    <h3 class="card__name">${esc(p.brand)} - ${esc(p.campaign)}</h3>
    <p class="card__q">${esc(p.question)}</p>
    <p class="label">${esc(p.kind)} &middot; ${esc(p.year)}</p>
  </div>
</a>`
    )
    .join("\n");

  return `${head({
    title: `${site.name} — Art Director & Motion Designer`,
    desc: `${site.role}, based in ${site.city}. Award-winning campaigns for Hinge, Vaseline, Adobe MAX, Chase and UNO × Instagram.`,
    url: "/",
    image: "/assets/media/loops/hinge.jpg",
    depth: d
  })}
${top(d, false)}
<main id="main">
<section class="wrap hero">
  <p class="hero__pre s">A curious kid who never stopped asking</p>
  <h1 class="d hero__q" data-anim>But what if it looked like<button class="peek" type="button" data-peek="${peek}" aria-label="See the work"><video muted loop playsinline preload="metadata"></video></button>?<span class="caret" aria-hidden="true"></span></h1>
  <p class="cue">Scroll <i aria-hidden="true">&darr;</i></p>
</section>

<section class="wrap intro rise">
  <p class="intro__p">${site.intro}</p>
</section>

<section class="recog rise">
  <div class="wrap recog__head">
    <span class="label">Recognition</span>
    <span class="label">2025 &ndash; 2026</span>
  </div>
  ${badgeStrip(d, site.badgeStrip)}
  <div class="wrap">${awardSummary(d, site.awardSummary)}</div>
</section>

<div class="wrap" id="work">
  <div class="section-head"><span class="label">Selected work</span><span class="label">2025 &ndash; 2026</span></div>
  <hr class="rule">
  <div class="grid" style="padding-top:clamp(1.4rem,3.5vh,2.2rem)">
${cards}
  </div>
</div>
</main>
${foot(d, "home")}`;
}

/* ---------- case study ---------- */
function project(p, i) {
  const d = 2;
  const render = renderOne(d);
  const next = projects[(i + 1) % projects.length];
  const sections = p.sections
    .map(
      (s) => `<section class="block wrap rise">
  <div class="block__head"><h2>${esc(s.q)}</h2></div>
  ${s.media.map(render).join("\n  ")}
</section>`
    )
    .join("\n");

  return `${head({
    title: `${p.brand}: ${p.campaign} — ${site.name}`,
    desc: p.answer[0].replace(/<[^>]+>/g, "").slice(0, 180),
    url: `/work/${p.slug}/`,
    image: p.tile.poster,
    depth: d
  })}
${top(d, true)}
<main id="main">
<section class="wrap case-head">
  <div class="case-head__eyebrow">
    <span class="label">${esc(p.kind)}</span><span class="label">${esc(p.year)}</span>
  </div>
  <h1 class="d case-head__name" data-anim>${esc(p.brand)} - ${esc(p.campaign)}</h1>
  <p class="case-head__q">${esc(p.question)}</p>
</section>

<div class="wrap">
  <div class="case-lede">${p.answer.map((a) => `<p>${a}</p>`).join("\n")}</div>
  <dl class="credits">
    <div class="credits__row"><dt class="label">Role</dt><dd>${esc(p.role)}</dd></div>
    <div class="credits__row"><dt class="label">Team</dt><dd><em>${esc(p.team)}</em></dd></div>
    <div class="credits__row"><dt class="label">Recognition</dt><dd>${
      p.awardList.length
        ? `${badges(d, p.badges, "badges--credit")}<ul class="awards">${p.awardList
            .map((a) => `<li><b>${esc(a.badge)}</b><span>${esc(a.text)}</span></li>`)
            .join("")}</ul>`
        : `<em class="label" style="letter-spacing:.06em">Not entered</em>`
    }</dd></div>
  </dl>
</div>
${sections}
<div class="wrap">
  <a class="next" href="../${next.slug}/index.html">
    <span class="label">Next project</span>
    <p class="d next__name">${esc(next.brand)} - ${esc(next.campaign)}</p>
    <p class="next__q">${esc(next.question)}</p>
  </a>
</div>
</main>
${foot(d, "work")}`;
}

/* ---------- about ---------- */
function aboutPage() {
  const d = 1;
  return `${head({
    title: `About — ${site.name}`,
    desc: `${site.role}. Started editing video at 13. Now in ${site.city}.`,
    url: "/about/",
    image: "/assets/media/loops/hinge.jpg",
    depth: d
  })}
${top(d, true)}
<main id="main">
<section class="wrap case-head">
  <p class="label" style="margin-bottom:1.2rem">About</p>
  <h1 class="d case-head__name" data-anim style="font-size:clamp(2rem,5.6vw,4.6rem);max-width:16ch">${esc(about.question)}</h1>
</section>
<div class="wrap about-body">
  <div class="prose">
    ${about.prose.map((t) => `<p>${t}</p>`).join("\n    ")}
    <p class="pull">${esc(about.pull)}</p>
    <p>${esc(about.close)}</p>
    <p style="margin-top:1.8rem"><a class="mail" href="mailto:${site.email}">${site.email}</a></p>
  </div>
  <aside>
    <p class="label" style="padding-bottom:1.1rem">Recognition</p>
    ${awards
      .map(
        (a) => `<div class="award-year">
      <div class="award-year__head">
        ${a.badge ? `<span class="badges badges--about"><span data-k="${a.badge}">${badgeImg(1, a.badge)}</span></span>` : ""}
        <h3>${esc(a.year)}</h3>
      </div>
      <ul>${a.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </div>`
      )
      .join("\n    ")}
  </aside>
</div>
</main>
${foot(d, "about")}`;
}

/* ---------- 404 ---------- */
function notFound() {
  const d = 0;
  return `${head({
    title: `Not found — ${site.name}`,
    desc: "That page went the way of a disappearing microsite.",
    url: "/404.html",
    image: "/assets/media/loops/hinge.jpg",
    depth: d
  })}
${top(d, true)}
<main id="main"><section class="wrap hero">
  <p class="label hero__kicker">Error 404</p>
  <h1 class="d hero__q" data-anim style="max-width:14ch">What if this page never <span class="s">existed</span>?</h1>
  <p class="hero__intro" style="margin-top:2rem">It probably did. It does not now. <a class="mail" href="index.html">Go see the work instead &#8599;</a></p>
</section></main>
${foot(d, "home")}`;
}

/* ---------- extras ---------- */

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", "/about/", ...projects.map((p) => `/work/${p.slug}/`)]
  .map((u) => `  <url><loc>${site.origin}${u}</loc></url>`)
  .join("\n")}
</urlset>`;

/* ---------- run ---------- */
console.log("Building…");
write("index.html", home());
projects.forEach((p, i) => write(`work/${p.slug}/index.html`, project(p, i)));
write("about/index.html", aboutPage());
write("404.html", notFound());
write("sitemap.xml", sitemap);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`);
write(
  "_headers",
  `/assets/media/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/css/*\n  Cache-Control: public, max-age=604800\n/assets/js/*\n  Cache-Control: public, max-age=604800\n`
);
write("vercel.json", JSON.stringify({ cleanUrls: true, trailingSlash: true }, null, 2));

if (missing.length) {
  console.log(`\n⚠  ${missing.length} referenced media file(s) not found:`);
  [...new Set(missing)].forEach((x) => console.log("   -", x));
} else {
  console.log("\n✓ every referenced media file exists");
}
console.log("Done.");
