# Maintaining The Site

This site is static and runs on GitHub Pages. There is no CMS, private backend, admin dashboard, or login.

The intended maintenance workflow is agent-assisted file editing:

1. A human gives the needed content, links, or design request.
2. An AI coding agent reads `AGENTS.md` and `FUTURE_CHANGES.md`.
3. The agent edits the relevant files.
4. The agent previews locally when practical.
5. The human reviews.
6. The agent commits and pushes after approval.

## Update Chapter Links

Most chapter content lives in:

`assets/data/chapters.json`

Edit that JSON instead of hardcoding cards in `chapters.html`.

Do not replace `chapters.html`. Do not upload a new root-level `chapters.json` file. The site reads only `assets/data/chapters.json`.

Leave a link blank if that chapter should not show that button.

## Chapter Fields

- `name`: public chapter name
- `location`: state, country, or region shown above the chapter name
- `description`: short public-facing description
- `instagramUrl`: Instagram link, blank if none
- `contactUrl`: chapter contact form, blank if none
- `updateUrl`: related blog post, blank if none

## Update Blog Cards

Blog listing cards are generated from:

`assets/data/articles.json`

Older migrated article pages still live in `post/`.

New articles can be written in the `body` field. If `postUrl` is blank, the blog card links to:

`article.html?slug=your-article-slug`

## Safety Notes

All website files are public once pushed.

Do not store passwords, private student information, donor data, internal notes, or sensitive contact details in JSON files or HTML pages.

Do not add GitHub tokens, OAuth credentials, or API secrets to client-side JavaScript.

## Before Pushing

- Preview locally when practical.
- Check changed links.
- Confirm mobile layout if the change affects page structure.
- Keep `.DS_Store` uncommitted.
- Summarize what changed and what was tested.
