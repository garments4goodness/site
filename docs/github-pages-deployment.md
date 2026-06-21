# GitHub Pages Deployment

This site is a plain static site and does not require a build step.

## Deploy From a GitHub Repository

1. Commit the files in this repository.
2. Push the repository to GitHub.
3. In GitHub, open the repository settings.
4. Go to **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the branch, usually `main`, and the root folder `/`.
7. Save.

GitHub Pages will publish the site from `index.html`.

## Local Preview

From the repository root, run:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- All internal links are relative and GitHub Pages compatible.
- The contact form uses `mailto:` and depends on the visitor's email client.
- External services retained from Wix include Google Forms, Linktree, Hack Club Bank, TikTok, and Instagram.
