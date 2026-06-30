# Garments4Goodness Website

Static website for Garments4Goodness, hosted with GitHub Pages.

Production site:

`https://garments4goodness.org`

GitHub Pages fallback:

`https://garments4goodness.github.io/site/`

## What This Repo Contains

- Static pages such as `index.html`, `chapters.html`, `blog.html`, `donate.html`, and `volunteer.html`
- Shared styles in `assets/css/styles.css`
- Shared behavior in `assets/js/main.js`
- Public chapter data in `assets/data/chapters.json`
- Public blog listing/article data in `assets/data/articles.json`
- Older migrated blog posts in `post/`

There is no CMS, login, admin dashboard, or private backend in this repo.

## Preview Locally

From the repo folder:

```bash
python3 -m http.server 4174
```

Then open:

`http://127.0.0.1:4174/`

## Updating Content

This site is maintained through normal file edits, usually with help from an AI coding agent.

Common content files:

- Chapters: `assets/data/chapters.json`
- Blog cards and data-backed articles: `assets/data/articles.json`
- Older migrated posts: `post/`
- Main page text and counters: `index.html`
- Shared styling: `assets/css/styles.css`

Chapter cards are generated from `assets/data/chapters.json`. Blog cards are generated from `assets/data/articles.json`.

When asking an agent to update the site, give the exact content, links, and pages to change. The agent should edit the files, preview locally when practical, then commit and push.

## Publishing Changes

Basic workflow:

1. Edit files locally.
2. Preview the site locally.
3. Commit changes.
4. Push to `main`.
5. GitHub Pages redeploys automatically.

## Safety

- Do not add AI-generated images.
- Do not claim Garments4Goodness is directly a 501(c)(3). Use Hack Club Bank/fiscal sponsorship language for donations.
- Do not put passwords, tokens, private student data, donor data, or internal notes in the public site.
- Do not put GitHub tokens or API secrets in client-side JavaScript.
- Keep public pages simple, polished, and consumer-facing.

## Custom Domain

The custom domain is:

`garments4goodness.org`

Cloudflare DNS should point the domain to GitHub Pages, and the repo should include a root `CNAME` file containing:

```text
garments4goodness.org
```

After domain/HTTPS setup is stable, update canonical URLs, Open Graph URLs, sitemap URLs, and Search Console properties to use `https://garments4goodness.org/`.

## SEO Roadmap

Later improvements:

- Switch all canonical metadata from GitHub Pages URLs to `garments4goodness.org`
- Add richer page titles and descriptions
- Add structured data for organization, blog posts, and nonprofit work
- Keep `sitemap.xml` current
- Add alt text improvements
- Improve blog metadata and social share previews
- Add testimonials with permission-safe names/quotes
