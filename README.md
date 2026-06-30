# Garments4Goodness Website

Static website for Garments4Goodness, hosted with GitHub Pages.

Production site goal:

`https://garments4goodness.org`

Current GitHub Pages fallback:

`https://garments4goodness.github.io/site/`

## What This Repo Contains

- Static pages such as `index.html`, `chapters.html`, `blog.html`, `donate.html`, and `volunteer.html`
- Shared styles in `assets/css/styles.css`
- Shared behavior in `assets/js/main.js`
- Editable chapter data in `assets/data/chapters.json`
- Editable blog listing/article data in `assets/data/articles.json`
- Decap CMS admin scaffold in `admin/`
- A static maintenance helper at `dev-tools.html`

## Preview Locally

From the repo folder:

```bash
python3 -m http.server 4174
```

Then open:

`http://127.0.0.1:4174/`

## Updating Chapters

Chapter cards are generated from:

`assets/data/chapters.json`

Use the helper page:

`dev-tools.html`

That page lets editors update chapter names, descriptions, Instagram links, contact forms, and blog update links without editing HTML directly. It can download or copy a cleaned JSON file.

Important: `dev-tools.html` is public if someone knows the URL. Do not put private notes, passwords, internal student data, donor data, or sensitive information in the JSON.

## Publishing Changes

Basic workflow:

1. Edit files locally or through GitHub.
2. Preview the site locally.
3. Commit changes.
4. Push to `main`.
5. GitHub Pages redeploys automatically.

## Blog Posts And Articles

Blog cards are generated from:

`assets/data/articles.json`

Older migrated posts live as HTML files in `post/`. New data-backed posts can use `article.html?slug=...` when the article has body content and no static `postUrl`.

The repo also includes a Decap CMS scaffold at:

`admin/`

Decap CMS can give editors a friendlier admin UI and commit changes to GitHub, but GitHub login requires an authentication/OAuth setup. Do not put a GitHub token in public client-side JavaScript.

## Private Editing

GitHub Pages is static hosting. Public GitHub Pages sites do not provide private routes, login-only pages, or owner-only admin screens by themselves.

Safe options:

- Keep the website public and the repo editable only by trusted GitHub collaborators.
- Use `dev-tools.html` as a formatting helper, not as a secure backend.
- Use GitHub's web editor for approved collaborators.
- Use Decap CMS after GitHub authentication is configured.
- Add a custom authenticated admin later with a backend or GitHub App if Decap is not enough.

GitHub Enterprise Cloud has private GitHub Pages access controls for some project sites, but that is not the same as having private sections inside a public site.

## Custom Domain

The intended custom domain is:

`garments4goodness.org`

For GitHub Pages, the repo should eventually include a root-level `CNAME` file containing:

```text
garments4goodness.org
```

Cloudflare DNS should point the domain to GitHub Pages. Typical setup:

- Apex domain `garments4goodness.org`: `A` records to GitHub Pages IPs
- Optional `www.garments4goodness.org`: `CNAME` to `garments4goodness.github.io`
- GitHub Pages settings: set custom domain to `garments4goodness.org`
- Enable/enforce HTTPS once GitHub allows it

After the custom domain is live, update canonical URLs, Open Graph URLs, sitemap URLs, and Search Console properties to use `https://garments4goodness.org/`.

## SEO Roadmap

Later improvements:

- Switch all canonical metadata from GitHub Pages URLs to `garments4goodness.org`
- Add richer page titles and descriptions
- Add structured data for organization, blog posts, and nonprofit work
- Keep `sitemap.xml` current
- Add alt text improvements
- Improve blog metadata and social share previews
- Add testimonials with permission-safe names/quotes

## Notes

This is a static site. Keep changes simple, preview before pushing, and avoid adding heavy third-party scripts unless there is a clear reason.
