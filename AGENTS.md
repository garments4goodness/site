# AI Contributor Guide

This repo may be edited by multiple people and multiple AI coding agents. Follow this guide so the site stays consistent and easy to maintain.

## Project Context

Garments4Goodness is a student-led organization focused on clothing access, sustainability, donation drives, education, workshops, and local chapters.

The site is a static GitHub Pages site. It should remain simple, fast, and backend-free unless a maintainer explicitly approves a larger architecture change.

## Important Constraints

- Do not add AI-generated images.
- Do not claim Garments4Goodness is directly a 501(c)(3). Donations are processed through Hack Club Bank/fiscal sponsorship language.
- Do not expose private student data, donor data, passwords, tokens, or internal notes.
- Do not put GitHub tokens or API secrets in client-side JavaScript.
- Do not add backend requirements without explicit approval.
- Keep consumer-facing pages polished and simple.
- Preview locally before pushing whenever possible.

## Tech Stack

- Plain HTML, CSS, and JavaScript
- GitHub Pages
- Shared CSS: `assets/css/styles.css`
- Shared JS: `assets/js/main.js`
- Chapter data: `assets/data/chapters.json`
- Static maintenance helper: `dev-tools.html`

## Current Content Model

Chapter cards are generated from:

`assets/data/chapters.json`

If editing chapter links, names, descriptions, or related update links, prefer updating that JSON instead of hardcoding cards in `chapters.html`.

Blog posts currently live as HTML files in:

`post/`

Blog listings are still mostly static in `blog.html`. A future task may move them to `assets/data/articles.json`.

## Design Style

- Use the existing beige and pink visual system.
- Keep cards clean with modest radius.
- Avoid cluttered layouts, dense flyers, or awkward alignment.
- Use real/approved imagery only.
- Make pages useful on the first screen.
- Keep mobile layout clean and avoid horizontal overflow.

## Link And Form Safety

Before pushing link-heavy changes:

- Check that internal relative links resolve.
- Do not expose Google Forms `/edit` links.
- Leave a link blank if it is not ready.
- Prefer clear labels such as `Follow on Instagram`, `Contact this chapter`, and `Read recent update`.

## Custom Domain

Target domain:

`garments4goodness.org`

Do not update all canonical/sitemap URLs until the custom domain is actually configured and verified.

When the custom domain is ready:

- Add a root `CNAME` file.
- Update `sitemap.xml`.
- Update canonical and Open Graph URLs.
- Update Search Console sitemap submission.

## SEO

SEO improvements are planned, but should happen after the custom domain is stable.

Priorities:

- Accurate titles and meta descriptions
- Canonical URLs
- Sitemap
- Structured data
- Alt text
- Blog metadata

## Git Hygiene

- Do not commit `.DS_Store`.
- Keep changes focused.
- Do not rewrite or revert unrelated work.
- If the branch is behind remote, pull/rebase carefully before pushing.
- Summarize what changed and what was tested.

## Good Next Tasks

Check `FUTURE_CHANGES.md` before inventing new work. The highest-priority planned areas are:

- Correct chapter contact links
- Add article/blog editing to `dev-tools.html`
- Add testimonials
- Configure `garments4goodness.org`
- SEO pass after custom domain launch
