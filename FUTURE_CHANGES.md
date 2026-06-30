# Planned Future Changes

This is a working roadmap for Garments4Goodness website improvements. It is meant for humans to review before contributors or AI tools start building.

## Near-Term Priorities

### 1. Fix And Verify Chapter Contact Links

Status: planned

The Chapters page now renders from `assets/data/chapters.json`, but some contact form links may be outdated or incorrect.

Next steps:

- Confirm the current contact form for every public chapter.
- Update `assets/data/chapters.json`.
- Preview `chapters.html`.
- Remove or leave blank any contact link that is not ready.

### 2. Improve Agent-Assisted Blog And Article Updates

Status: planned

The site uses public JSON files for chapters and blog cards. There is no CMS or backend. Future article work should make the agent-assisted workflow clearer and safer.

Completed:

- Add `assets/data/articles.json`.
- Render `blog.html` from article data.
- Add `article.html` for data-backed article bodies.

Next possible implementation:

- Add clearer article templates/examples in documentation.
- Consider a simple `NEXT_ACTIONS.md` file for agents to read before starting.
- Keep blog data validation lightweight and local.
- Preview `blog.html` and `article.html?slug=...` before pushing article changes.

Important:

Do not rebuild a client-side admin dashboard or put GitHub tokens in public JavaScript.

### 3. Add Testimonials

Status: planned

Testimonials should be permission-safe and public-facing.

Collect:

- Name or first name only
- Role or connection
- Chapter/location
- Quote
- Whether public name use is approved
- Whether photo use is approved

Possible locations:

- Homepage: 2-3 strongest quotes
- Dedicated testimonials page later
- Chapter-specific quote on Chapters page if relevant

### 4. Custom Domain Launch

Status: planned

Target domain:

`garments4goodness.org`

Tasks:

- Add a root `CNAME` file once DNS/GitHub settings are ready.
- Configure GitHub Pages custom domain.
- Configure Cloudflare DNS.
- Enforce HTTPS.
- Update canonical URLs, Open Graph URLs, Search Console, and `sitemap.xml`.

### 5. SEO Pass

Status: planned after custom domain is live

Tasks:

- Update all canonical URLs to `https://garments4goodness.org/`.
- Improve page titles and meta descriptions.
- Add structured data for organization and blog posts.
- Improve alt text.
- Keep `sitemap.xml` current.
- Submit the custom-domain sitemap in Search Console.

## Medium-Term Ideas

### Chapter Directory Improvements

- Add filtering by state/region.
- Add a chapter spotlight section.
- Add "Chapter of the Month."
- Add a lightweight interactive map after chapter data is reliable.

### Volunteer And Onboarding

- Add a simple onboarding checklist page.
- Add chapter starter resources.
- Add links to Google Classroom or future onboarding materials.
- Split volunteer paths more clearly by role.

### Partnerships

- Add a nonprofit partnership pathway.
- Add a simple corporate/nonprofit intake CTA.
- Keep partnership pages minimal and easy to scan.

### Newsletter

- Add a newsletter archive page.
- Post monthly event-of-the-month updates.
- Link to Discord/Google Classroom/social announcements.

## Longer-Term Possibilities

### Real Authenticated Admin

Only consider this after the content model is stable.

Potential approaches:

- GitHub collaborators edit files directly in GitHub.
- Cloudflare Access protecting selected tooling.
- A GitHub App or serverless function that commits changes securely.

Do not put private GitHub tokens or credentials in client-side JavaScript.

## Design Principles

- Keep pages simple, public-facing, and easy to navigate.
- Do not add AI-generated images.
- Prefer real chapter/event photos only when they look professional.
- Keep beige/pink branding aligned with the logo.
- Preview locally before pushing.
- Avoid fragile widgets unless they solve a clear problem.
