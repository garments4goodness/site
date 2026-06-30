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
