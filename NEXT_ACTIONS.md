# Next Actions

This file is the quick-start dashboard for humans and AI agents working on the Garments4Goodness site.

Before making changes, read:

- `AGENTS.md`
- `FUTURE_CHANGES.md`
- `MAINTAINING_SITE.md`

## Current Operating Model

The site is static and hosted on GitHub Pages. There is no CMS, admin page, backend, or login.

Use an agent-assisted workflow:

1. Read the relevant files.
2. Ask the human only for missing content, approvals, or risky decisions.
3. Edit the static files directly.
4. Preview locally when practical.
5. Commit and push after approval or when the requested change is clearly complete.

## High-Priority Next Work

### 1. Submit Custom Domain Sitemap

Status: needs human action

Submit this sitemap in Google Search Console:

`https://garments4goodness.org/sitemap.xml`

Also keep the old GitHub Pages property around temporarily if Search Console still shows indexed `github.io/site` URLs.

### 2. Chapter Link Cleanup

Status: waiting on confirmed links

Update `assets/data/chapters.json` once current chapter contact links/forms are confirmed.

Leave unknown links blank instead of guessing.

### 3. Testimonials Expansion

Status: started

Homepage currently includes testimonials from Esosa and Ike.

For future testimonials, collect:

- Public display name
- Role or chapter, if approved
- Exact quote
- Permission to publish the quote
- Permission to use a photo, if photos are ever added

### 4. SEO Follow-Up

Status: in progress

Custom-domain canonical URLs, robots.txt, and sitemap should point to:

`https://garments4goodness.org/`

Future SEO pass:

- Add Open Graph metadata to more inner pages.
- Add BlogPosting structured data for posts.
- Add richer alt text where images are generic.
- Check Google Search Console after the custom sitemap is submitted.

## Guardrails

- Do not add AI-generated images.
- Do not claim Garments4Goodness is directly a 501(c)(3).
- Do not add private data, passwords, tokens, donor data, or internal notes.
- Do not rebuild the deleted CMS/admin/dev-tools path without explicit maintainer approval.
- Keep public pages simple, polished, and mobile-friendly.
