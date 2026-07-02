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

### 1. Add More Articles Through The Data Workflow

Status: active

Use:

- `assets/data/articles.json`
- `docs/article-workflow.md`
- `docs/article-template.md`

Preview both:

- `blog.html`
- `article.html?slug=...`

### 2. Testimonials Expansion

Status: started

Homepage currently includes testimonials from Esosa and Ike.

For future testimonials, collect:

- Public display name
- Role or chapter, if approved
- Exact quote
- Permission to publish the quote
- Permission to use a photo, if photos are ever added

### 3. Role Application Links

Status: future update

The volunteer experience needs clearer, role-specific Google Form links so people can actually apply to the path they choose.

Next pass:

- Add role-level application links where they exist
- Avoid dead-end role cards
- Keep public application paths simple

### 4. SEO Follow-Up

Status: in progress

Custom-domain canonical URLs, robots.txt, and sitemap should point to:

`https://garments4goodness.org/`

Future SEO pass:

- Add Open Graph metadata to more inner pages.
- Add BlogPosting structured data for posts.
- Add richer alt text where images are generic.
- Keep this secondary unless a maintainer explicitly prioritizes SEO work.

### 5. Outreach Automation Setup

Status: ready for external tool setup

Use:

- `docs/outreach-automation.md`

This repo now includes the templates and process, but actual sending should happen through Google Sheets mail merge, Gmail Apps Script, or another external automation tool.

### 6. Build Onboarding And Newsletter Later

Status: deferred

Onboarding and newsletter/archive work should be designed in more detail before coming back into the public site.

## Guardrails

- Do not add AI-generated images.
- Do not claim Garments4Goodness is directly a 501(c)(3).
- Do not add private data, passwords, tokens, donor data, or internal notes.
- Do not rebuild the deleted CMS/admin/dev-tools path without explicit maintainer approval.
- Keep public pages simple, polished, and mobile-friendly.
