# Article Workflow

Use this guide when an AI agent or human maintainer adds a new Garments4Goodness article.

## Content Model

Blog listing cards are generated from:

`assets/data/articles.json`

An article can work in two ways:

1. Older static post:
   Set `postUrl` to an existing HTML file in `post/`.
2. Data-backed post:
   Leave `postUrl` blank and write the article in the `body` field.
   The live URL becomes:
   `article.html?slug=your-slug`

## Recommended Article Steps

1. Add the new article entry near the top of `assets/data/articles.json`.
2. Use a clear `slug` with lowercase words separated by hyphens.
3. Fill in:
   - `title`
   - `author`
   - `date`
   - `readTime`
   - `summary`
   - `imageUrl`
   - `imageAlt`
4. If the article is data-backed, write the article in `body`.
5. Preview:
   - `blog.html`
   - `article.html?slug=your-slug`
6. Check that the card order looks right and the article link resolves.

## Body Formatting

The lightweight article renderer supports:

- Normal paragraphs
- `# Heading`
- `## Heading`
- `- Bullet list`

It does not support full Markdown features. Keep formatting simple.

## Writing Template

Start from:

`docs/article-template.md`

## Safe Content Rules

- Do not include private student information.
- Do not include internal operating notes.
- Do not publish unapproved testimonials or photos.
- Keep the summary short enough to read cleanly in the blog card.
