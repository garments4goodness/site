# Maintaining The Site

This site is static and runs on GitHub Pages. There is no private backend or login.

## Update Chapter Links

Most chapter content lives in:

`assets/data/chapters.json`

To make changes without hand-editing HTML:

1. Open `dev-tools.html` in the local preview or deployed site.
2. Edit the chapter fields.
3. Download `chapters.json` or copy the generated JSON.
4. In GitHub, open `assets/data/chapters.json`.
5. Click edit, replace the old contents, and commit.
6. Preview `chapters.html`.
7. Commit and push if working locally.

Do not replace `chapters.html`. Do not upload a new root-level `chapters.json` file. The site reads only `assets/data/chapters.json`.

Leave a link blank if that chapter should not show that button.

## Chapter Fields

- `name`: public chapter name
- `location`: state, country, or region shown above the chapter name
- `description`: short public-facing description
- `instagramUrl`: Instagram link, blank if none
- `contactUrl`: chapter contact form, blank if none
- `updateUrl`: related blog post, blank if none

## Safety Notes

`dev-tools.html` is only a formatting helper. It is public if someone knows the URL.

Do not store passwords, private student information, donor data, internal notes, or sensitive contact details in JSON files.

## Update Blog Cards

Blog listing cards are generated from:

`assets/data/articles.json`

To update the blog listing:

1. Open `dev-tools.html`.
2. Scroll to the Articles section.
3. Edit title, author, date, read time, summary, image path, alt text, and post URL.
4. Download `articles.json` or copy the generated JSON.
5. In GitHub, open `assets/data/articles.json`.
6. Click edit, replace the old contents, and commit.
7. Preview `blog.html`.

Older migrated article pages still live in `post/`.

New articles can be written in the `body` field. If `postUrl` is blank, the blog card links to:

`article.html?slug=your-article-slug`

## Decap CMS Admin

The repo includes a Decap CMS scaffold at:

`admin/`

This is intended to become the easier editor-facing backend. It is not fully usable until GitHub authentication/OAuth is configured.

When auth is ready, editors should be able to visit:

`https://garments4goodness.org/admin/`

and edit blog data through a form-based UI.

Keep `dev-tools.html` for now as a fallback.
