# Win Pratt Link Tiles

A modern, mobile-first link hub for GitHub Pages.

This version is designed to be noob-friendly: you edit one file (`config.json`) and the page renders itself.

## TL;DR

1. Fork this repo.
2. Edit `config.json`.
3. Push to GitHub.
4. Turn on GitHub Pages.
5. Done.

## Project Structure

- `index.html`: page shell (you usually do not need to edit this)
- `styles.css`: visual design (optional tweaks)
- `app.js`: loads and renders `config.json`
- `config.json`: your content (site settings, profile, links)
- `images/`: icons and profile image
- `CNAME`: custom domain (optional)

## Edit This File Only: `config.json`

Most users only need to touch `config.json`.

### `site`

- `title`: browser/page title
- `description`: SEO/meta description
- `favicon`: path to favicon

### `profile`

- `name`
- `location`
- `bio`
- `avatar`: image path
- `avatarAlt`
- `email`
- `emailLabel`

### `links`

Each item supports:
- `title` (required)
- `subtitle`
- `url` (required)
- `icon` (optional)
- `type` (optional, use `"project"` for project-style tiles)

## Quick Start

1. Fork this repo (or use as template).
2. Clone your copy:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

3. Preview locally:

```bash
python3 -m http.server 8000
```

4. Open `http://localhost:8000`.
5. Edit `config.json`.
6. Commit and push.

## Deploy with GitHub Pages

1. Push to your default branch.
2. Go to `Settings` -> `Pages`.
3. Set:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` (or your branch), `/root`
4. Save and wait for deploy.

## Custom Domain Setup

Optional domain registrars:
- Namecheap (affiliate): https://namecheap.pxf.io/e6yAO
- Cloudflare Registrar (non-affiliate): https://www.cloudflare.com/products/registrar/
- Porkbun (non-affiliate): https://porkbun.com/

1. Add domain in repo `Settings` -> `Pages` -> `Custom domain`.
2. Ensure `CNAME` matches that domain.
3. Configure DNS:
   - Root domain: `A` records to GitHub Pages IPs
   - `www`: `CNAME` to `YOUR_USERNAME.github.io`
4. Enable `Enforce HTTPS` when available.

## Troubleshooting

- Blank page locally: run a local server (`python3 -m http.server 8000`), do not open via `file://`.
- Links not showing: validate JSON format in `config.json` (missing commas are common, ask me how I know).
- Pages 404: verify branch/folder in GitHub Pages settings.
- Domain not resolving: re-check DNS and `CNAME`.

## Acknowledgements

This project incorporates code from [linkinbio](https://github.com/alexhyett/linkinbio/tree/main), created by Alex Hyett, licensed under the MIT License.
