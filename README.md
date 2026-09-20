# Ngan Tsz Hang Portfolio

A single-page portfolio on **Astro 5** with a few **React islands** (menu, experience tabs, media). The first paint is HTML and CSS. JavaScript loads only where the page is interactive.

If you fork this, the lab numbers below are what this architecture produced on a local production preview — not a live-user (CrUX) report.

## Stack

- Astro 5 (static)
- React islands
- Tailwind CSS v4
- GitHub Pages (`base: /Ngan_Tsz_Hang_Portfolio`)

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npx astro preview --host 127.0.0.1 --port 4321
```

Use that preview URL for Lighthouse. `astro dev` is not a production-like bundle. Bind `--host 127.0.0.1` so headless Chrome can reach the server (IPv6-only `localhost` often fails the run).

## What you can expect (Lighthouse lab)

Same page, two official recipes. Both hit `http://localhost:4321/Ngan_Tsz_Hang_Portfolio/` after `astro preview`.

**Mobile** — Lighthouse default mobile: Slow 4G, mobile viewport, mobile score curves.

```bash
npm run lighthouse:mobile:local
```

**Desktop** — Lighthouse `--preset=desktop`: 1350×940, desktop UA, `desktopDense4G` (40 ms RTT, 10 Mbps, 1× CPU). Use the preset, not form-factor alone, or the same milliseconds are graded on the desktop curve while still throttled like a phone.

```bash
npx lighthouse http://localhost:4321/Ngan_Tsz_Hang_Portfolio/ \
  --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo \
  --view
```

Recorded **20 Sep 2026**, Lighthouse 13.4.1, this machine, localhost preview:

| Recipe | Performance | Accessibility | Best Practices | SEO | LCP | FCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile (Slow 4G) | 98 | 100 | 96 | 100 | 2.3 s | 1.1 s | 0 ms | 0 |
| Desktop (preset) | 100 | 100 | 96 | 100 | 0.5 s | 0.3 s | 0 ms | 0 |

That is the shape to expect if you keep HTML-first pages, optimized `Picture` assets, a self-hosted variable font, and small islands. Mobile LCP around two seconds is the Slow 4G recipe, not a heavy document. Desktop LCP here was half a second.

A few points may still drop: Chrome asks for `/favicon.ico` while this repo ships `favicon.svg` (console 404 → Best Practices 96). Hosting on GitHub Pages will add TTFB versus localhost. [PageSpeed Insights](https://pagespeed.web.dev/) on your live URL is the check other people can repeat.

## Deployment (GitHub Pages)

Workflow: `.github/workflows/deploy.yml`.

- Development history: `main`
- Deploy: push `prod`
- Example live URL: `https://nthgh1030.github.io/Ngan_Tsz_Hang_Portfolio/`

## Project structure

```text
.
├── public/
├── src/
│   ├── components/
│   ├── islands/
│   ├── layouts/
│   ├── pages/
│   ├── sections/
│   └── styles/
├── astro.config.mjs
└── .github/workflows/deploy.yml
```
