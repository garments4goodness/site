const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });
}

const createLink = (href, label) => {
  if (!href) {
    return null;
  }

  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  return link;
};

const renderChapterGrid = async () => {
  const grid = document.querySelector("[data-chapter-grid]");

  if (!grid) {
    return;
  }

  try {
    const response = await fetch("assets/data/chapters.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Chapter data could not be loaded.");
    }

    const chapters = await response.json();
    grid.textContent = "";

    chapters.forEach((chapter) => {
      const card = document.createElement("article");
      card.className = "chapter-card";

      const location = document.createElement("p");
      location.className = "chapter-location";
      location.textContent = chapter.location || "Chapter";

      const title = document.createElement("h3");
      title.textContent = chapter.name || "Unnamed Chapter";

      const description = document.createElement("p");
      description.textContent = chapter.description || "A public Garments4Goodness chapter.";

      const links = document.createElement("div");
      links.className = "chapter-links";

      [
        createLink(chapter.instagramUrl, "Follow on Instagram"),
        createLink(chapter.contactUrl, "Contact this chapter"),
        createLink(chapter.updateUrl, "Read recent update")
      ].forEach((link) => {
        if (link) {
          links.appendChild(link);
        }
      });

      card.append(location, title, description, links);
      grid.appendChild(card);
    });
  } catch (error) {
    grid.innerHTML = '<p class="notice">Chapter information could not be loaded. Please refresh the page or contact garments4goodness@gmail.com.</p>';
  }
};

const articleMeta = (article) => [article.author, article.date, article.readTime].filter(Boolean).join(" · ");

const slugify = (value) => (value || "")
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const normalizeArticles = (data) => Array.isArray(data) ? data : data.articles || [];

const articleUrl = (article) => article.postUrl || `article.html?slug=${encodeURIComponent(article.slug || slugify(article.title))}`;

const renderArticleList = async () => {
  const list = document.querySelector("[data-article-list]");

  if (!list) {
    return;
  }

  try {
    const response = await fetch("assets/data/articles.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Article data could not be loaded.");
    }

    const articles = normalizeArticles(await response.json());
    list.textContent = "";

    articles.forEach((article) => {
      const card = document.createElement("article");
      card.className = "card post-card";

      if (article.imageUrl) {
        const image = document.createElement("img");
        image.src = article.imageUrl;
        image.alt = article.imageAlt || "";
        card.appendChild(image);
      }

      const content = document.createElement("div");

      const meta = document.createElement("p");
      meta.className = "post-meta";
      meta.textContent = articleMeta(article);

      const title = document.createElement("h2");
      title.textContent = article.title || "Untitled article";

      const summary = document.createElement("p");
      summary.textContent = article.summary || "";

      const action = document.createElement("p");
      const readLink = createLink(articleUrl(article), "Read post");
      if (readLink) {
        readLink.className = "button";
        action.appendChild(readLink);
      }

      content.append(meta, title, summary);
      if (readLink) {
        content.appendChild(action);
      }

      card.appendChild(content);
      list.appendChild(card);
    });
  } catch (error) {
    list.innerHTML = '<p class="notice">Blog posts could not be loaded. Please refresh the page or contact garments4goodness@gmail.com.</p>';
  }
};

const renderArticleDetail = async () => {
  const detail = document.querySelector("[data-article-detail]");

  if (!detail) {
    return;
  }

  const slug = new URLSearchParams(window.location.search).get("slug");

  try {
    const response = await fetch("assets/data/articles.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Article data could not be loaded.");
    }

    const articles = normalizeArticles(await response.json());
    const article = articles.find((item) => (item.slug || slugify(item.title)) === slug);

    if (!article) {
      throw new Error("Article was not found.");
    }

    document.title = `${article.title} | Garments4Goodness`;
    detail.textContent = "";

    const hero = document.createElement("section");
    hero.className = "hero simple";

    const heroInner = document.createElement("div");
    heroInner.className = "hero-inner";

    const heroCopy = document.createElement("div");
    heroCopy.className = "hero-copy";

    const meta = document.createElement("p");
    meta.className = "eyebrow";
    meta.textContent = articleMeta(article) || "Garments4Goodness";

    const title = document.createElement("h1");
    title.textContent = article.title || "Untitled article";

    const summary = document.createElement("p");
    summary.className = "lead";
    summary.textContent = article.summary || "";

    heroCopy.append(meta, title);
    if (article.summary) {
      heroCopy.appendChild(summary);
    }
    heroInner.appendChild(heroCopy);
    hero.appendChild(heroInner);

    const section = document.createElement("section");
    section.className = "section split";

    const body = document.createElement("article");
    body.className = "post-body";
    renderMarkdownish(article.body || "", body);

    section.appendChild(body);

    if (article.imageUrl) {
      const frame = document.createElement("div");
      frame.className = "image-frame";
      const image = document.createElement("img");
      image.src = article.imageUrl;
      image.alt = article.imageAlt || "";
      frame.appendChild(image);
      section.appendChild(frame);
    }

    detail.append(hero, section);
  } catch (error) {
    detail.innerHTML = '<section class="section"><p class="notice">Article could not be loaded. Please return to the blog and try again.</p><p><a class="button" href="blog.html">Back to Blog</a></p></section>';
  }
};

const renderMarkdownish = (text, container) => {
  const lines = (text || "").split(/\r?\n/);
  let list = null;

  const closeList = () => {
    if (list) {
      container.appendChild(list);
      list = null;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      return;
    }

    if (trimmed.startsWith("## ")) {
      closeList();
      const heading = document.createElement("h2");
      heading.textContent = trimmed.slice(3);
      container.appendChild(heading);
      return;
    }

    if (trimmed.startsWith("# ")) {
      closeList();
      const heading = document.createElement("h2");
      heading.textContent = trimmed.slice(2);
      container.appendChild(heading);
      return;
    }

    if (trimmed.startsWith("- ")) {
      if (!list) {
        list = document.createElement("ul");
      }
      const item = document.createElement("li");
      item.textContent = trimmed.slice(2);
      list.appendChild(item);
      return;
    }

    closeList();
    const paragraph = document.createElement("p");
    paragraph.textContent = trimmed;
    container.appendChild(paragraph);
  });

  closeList();

  if (!container.childElementCount) {
    const paragraph = document.createElement("p");
    paragraph.textContent = "This article is being prepared. Please check back soon.";
    container.appendChild(paragraph);
  }
};

renderChapterGrid();
renderArticleList();
renderArticleDetail();
