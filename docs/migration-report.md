# Garments4Goodness Wix Migration Report

Source site: https://garments4goodness.wixsite.com/nonprofit

## Pages Discovered

Migrated as static pages:

- Home: `/nonprofit` -> `index.html`
- Meet The Team: `/nonprofit/meet-the-team` -> `meet-the-team.html`
- Events: `/nonprofit/gallery` -> `gallery.html`
- Get Involved: `/nonprofit/get-involved` -> `get-involved.html`
- Donate: `/nonprofit/donate` -> `donate.html`
- Corporate Partners: `/nonprofit/about-4` -> `about-4.html`

Discovered in Wix metadata but not recreated as full static pages:

- `/nonprofit/blog`
- `/nonprofit/blog-feed.xml`
- `/nonprofit/search`
- `/nonprofit/blank`
- `/nonprofit/donation-thank-you-page`
- `/nonprofit/event-list`
- `/nonprofit/events`
- `/nonprofit/schedule`
- `/nonprofit/notifications`
- `/nonprofit/post`
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

No public downloadable PDF, DOCX, XLSX, ZIP, or CSV files were detected.

## Static Replacements

- Wix contact form was replaced with a `mailto:` form and direct email button.
- Wix donation flow was preserved as an external link to Hack Club Bank.
- Google Forms, Linktree, Instagram, and TikTok links were preserved as external links.
- Wix banner, scripts, analytics, app runtime, and platform-specific code were removed.

## Missing Or Manual Content

- The Events page appeared to rely on Wix app/widget behavior. The crawled HTML only exposed "EVENTS", "blog", and "gallery"; event listings should be manually added if they exist in Wix's backend.
- Blog, search, member profile/account pages, checkout, and event detail pages cannot be recreated without their Wix app data.
- The Corporate Partners form needs a form backend if you want real in-browser submissions. Recommended static-friendly options: Google Forms, Formspree, Basin, Getform, or a GitHub Pages-compatible third-party form endpoint.
- Subpage SEO descriptions were mostly absent in the source and were drafted from visible page content.

## Estimated Completeness

Estimated migration completeness: 82%.

The core public content, navigation, images, metadata, and outbound links are preserved. Dynamic Wix functionality requires manual replacement.
