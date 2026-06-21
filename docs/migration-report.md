# Garments4Goodness Wix Migration Report

Source site: https://garments4goodness.wixsite.com/nonprofit

## Pages Discovered

Migrated as static pages:

- Home: `/nonprofit` -> `index.html`
- Meet The Team: `/nonprofit/meet-the-team` -> `meet-the-team.html`
- Events: `/nonprofit/gallery` -> `gallery.html`
- Blog: `/nonprofit/blog` -> `blog.html`
- Blog post: `/nonprofit/post/lathrop-clovis-houston-wabasha-and-mountain-house-chapter-events` -> `post/lathrop-clovis-houston-wabasha-and-mountain-house-chapter-events.html`
- Blog post: `/nonprofit/post/kern-county-stafford-and-san-jose-chapter-donation-drives` -> `post/kern-county-stafford-and-san-jose-chapter-donation-drives.html`
- Blog post: `/nonprofit/post/_erwe` -> `post/_erwe.html`
- Get Involved: `/nonprofit/get-involved` -> `get-involved.html`
- Donate: `/nonprofit/donate` -> `donate.html`
- Corporate Partners: `/nonprofit/about-4` -> `about-4.html`

Discovered in Wix metadata but not recreated as full static pages:

- `/nonprofit/blog-feed.xml`
- `/nonprofit/search`
- `/nonprofit/blank`
- `/nonprofit/donation-thank-you-page`
- `/nonprofit/event-list`
- `/nonprofit/events`
- `/nonprofit/schedule`
- `/nonprofit/notifications`
- `/nonprofit/checkout`
- `/nonprofit/account-settings`
- `/nonprofit/profile`
- `/nonprofit/event-details`

These appear to be Wix app, store, member, search, protected, or system routes rather than normal public content pages.

## Navigation Structure

The public navigation was recreated as:

- Home
- Meet The Team
- Events
- Blog
- Get Involved
- Donate
- Corporate Partners

Social links preserved:

- TikTok: https://www.tiktok.com/@garments4goodness
- Instagram: https://www.instagram.com/garments4goodness/

## Assets Downloaded

Local assets were saved under `assets/images/`:

- `logo.jpg`
- `clothes-hanger.jpg`
- `donation-bin.jpg`
- `team-photo.png`
- `social/tiktok.png`
- `social/instagram.png`
- `events/partner-yogurtland.png`
- `events/partner-panda.png`
- `events/partner-chipotle.png`
- `events/flyer-eriks.jpg`
- `events/flyer-fundraiser.png`
- `events/partnership-hero.jpg`
- `blog/chapter-events-hero.png`
- `blog/chapter-events-1.jpg`
- `blog/chapter-events-2.png`
- `blog/chapter-events-3.png`
- `blog/chapter-events-4.png`
- `blog/chapter-events-5.png`
- `blog/chapter-events-6.png`
- `blog/donation-drives-1.png`
- `blog/donation-drives-2.png`
- `blog/donation-drives-3.png`
- `blog/donation-drives-4.jpg`
- `blog/milpitas-drive-1.jpg`
- `blog/milpitas-drive-2.png`
- `blog/milpitas-drive-3.png`

No public downloadable PDF, DOCX, XLSX, ZIP, or CSV files were detected.

## Static Replacements

- Wix contact form was replaced with a `mailto:` form and direct email button.
- Wix donation flow was preserved as an external link to Hack Club Bank.
- Google Forms, Linktree, Instagram, and TikTok links were preserved as external links.
- Wix banner, scripts, analytics, app runtime, and platform-specific code were removed.

## Missing Or Manual Content

- The Events page appeared to rely on Wix app/widget behavior. The crawled HTML only exposed "EVENTS", "blog", and "gallery"; event listings should be manually added if they exist in Wix's backend.
- Blog feed RSS, search, member profile/account pages, checkout, and generic event detail pages cannot be recreated without their Wix app data.
- The Corporate Partners form needs a form backend if you want real in-browser submissions. Recommended static-friendly options: Google Forms, Formspree, Basin, Getform, or a GitHub Pages-compatible third-party form endpoint.
- Subpage SEO descriptions were mostly absent in the source and were drafted from visible page content.

## Estimated Completeness

Estimated migration completeness: 88%.

The core public content, navigation, visible blog posts, images, metadata, and outbound links are preserved. Dynamic Wix functionality requires manual replacement.
