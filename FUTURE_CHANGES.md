# Planned Future Changes

This is a working roadmap for Garments4Goodness website improvements. It is meant for humans to review before contributors or AI tools start building.

## Near-Term Priorities

### 1. Fix And Verify Chapter Contact Links

Status: complete

The public chapter directory is now based on confirmed public chapter links and only lists chapters with Instagram accounts.

### 2. Improve Agent-Assisted Blog And Article Updates

Status: in progress

The site uses public JSON files for chapters and blog cards. There is no CMS or backend. Future article work should make the agent-assisted workflow clearer and safer.

Completed:

- Add `assets/data/articles.json`.
- Render `blog.html` from article data.
- Add `article.html` for data-backed article bodies.
- Add `NEXT_ACTIONS.md` for agent handoff.

Next possible implementation:

- Add article templates/examples in documentation.
- Keep blog data validation lightweight and local.
- Preview `blog.html` and `article.html?slug=...` before pushing article changes.

Important:

Do not rebuild a client-side admin dashboard or put GitHub tokens in public JavaScript.

### 3. Add Testimonials

Status: started

Testimonials should be permission-safe and public-facing.

Collect:

- Name or first name only
- Role or connection
- Chapter/location
- Quote
- Whether public name use is approved
- Whether photo use is approved

Possible locations:

- Homepage: strongest quotes
- Dedicated testimonials page later
- Chapter-specific quote on Chapters page if relevant

### 4. Custom Domain Launch

Status: complete

Target domain:

`garments4goodness.org`

Completed:

- Add root `CNAME` file.
- Point SEO metadata, robots.txt, and `sitemap.xml` at the custom domain.

### 5. SEO Pass

Status: secondary

Tasks:

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

- Develop a dedicated onboarding experience later, after the content and workflow are defined in more detail.
- Add chapter starter resources.
- Add links to Google Classroom or future onboarding materials.
- Split volunteer paths more clearly by role.
- Add real Google Form links for each role path so visitors can actually apply.

### Partnerships

- Add a nonprofit partnership pathway.
- Add a simple corporate/nonprofit intake CTA.
- Keep partnership pages minimal and easy to scan.

### Newsletter

- Design the newsletter/archive in more detail before adding it to the public site.
- Decide how it differs from the blog before building it.
- Add monthly update structure later if it still feels useful.

## Longer-Term Possibilities

### Authenticated Admin

Status: not planned

The Decap/admin/dev-tools approach was removed because the organization is using agent-assisted static edits instead.

Only revisit a real authenticated admin if a maintainer explicitly approves a backend architecture later.

Do not put private GitHub tokens or credentials in client-side JavaScript.

## Design Principles

- Keep pages simple, public-facing, and easy to navigate.
- Do not add AI-generated images.
- Prefer real chapter/event photos only when they look professional.
- Keep beige/pink branding aligned with the logo.
- Preview locally before pushing.
- Avoid fragile widgets unless they solve a clear problem.
