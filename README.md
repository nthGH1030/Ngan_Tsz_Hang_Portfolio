# Ngan Tsz Hang Portfolio

Personal portfolio built with Astro and React islands.

## Tech Stack

- Astro
- React
- Tailwind CSS

## Local Development

Run from the project root:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
```

## Deployment (GitHub Pages)

This project deploys with GitHub Actions using the workflow at `.github/workflows/deploy.yml`.

- Deployment branch: `prod`
- Repository: `nthGH1030/Ngan_Tsz_Hang_Portfolio`
- Live URL: `https://nthgh1030.github.io/Ngan_Tsz_Hang_Portfolio/`

Deployment flow:

1. Push changes to `main` for development history.
2. Push changes to `prod` to trigger GitHub Pages deployment.
3. Check workflow status in the GitHub Actions tab.

## Project Structure

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
