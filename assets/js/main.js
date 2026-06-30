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

const setupChapterEditor = async () => {
  const editor = document.querySelector("#chapter-editor");
  const output = document.querySelector("#json-output");
  const status = document.querySelector("#editor-status");

  if (!editor || !output || !status) {
    return;
  }

  let chapters = [];

  const fields = [
    ["name", "Chapter name"],
    ["location", "Location"],
    ["description", "Description"],
    ["instagramUrl", "Instagram URL"],
    ["contactUrl", "Contact form URL"],
    ["updateUrl", "Blog update URL"]
  ];

  const cleanChapter = (chapter) => ({
    name: chapter.name || "",
    location: chapter.location || "",
    description: chapter.description || "",
    instagramUrl: chapter.instagramUrl || "",
    contactUrl: chapter.contactUrl || "",
    updateUrl: chapter.updateUrl || ""
  });

  const syncOutput = () => {
    output.value = `${JSON.stringify(chapters.map(cleanChapter), null, 2)}\n`;
  };

  const renderEditor = () => {
    editor.textContent = "";

    chapters.forEach((chapter, index) => {
      const card = document.createElement("section");
      card.className = "editor-card panel";

      const heading = document.createElement("div");
      heading.className = "editor-card-heading";

      const title = document.createElement("h2");
      title.textContent = chapter.name || `Chapter ${index + 1}`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "button secondary";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => {
        chapters.splice(index, 1);
        renderEditor();
      });

      heading.append(title, remove);
      card.appendChild(heading);

      fields.forEach(([key, labelText]) => {
        const label = document.createElement("label");
        label.textContent = labelText;

        const input = key === "description" ? document.createElement("textarea") : document.createElement("input");
        input.value = chapter[key] || "";
        input.addEventListener("input", () => {
          chapter[key] = input.value.trim();
          if (key === "name") {
            title.textContent = chapter.name || `Chapter ${index + 1}`;
          }
          syncOutput();
        });

        label.appendChild(input);
        card.appendChild(label);
      });

      editor.appendChild(card);
    });

    syncOutput();
  };

  try {
    const response = await fetch("assets/data/chapters.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Chapter data could not be loaded.");
    }

    chapters = (await response.json()).map(cleanChapter);
    status.textContent = "Chapter data loaded. Edit fields below, then copy or download the JSON.";
    renderEditor();
  } catch (error) {
    status.textContent = "Could not load chapter data. You can still add chapters manually.";
    chapters = [];
    renderEditor();
  }

  document.querySelector("#add-chapter")?.addEventListener("click", () => {
    chapters.push(cleanChapter({
      name: "New Chapter",
      location: "",
      description: "",
      instagramUrl: "",
      contactUrl: "",
      updateUrl: ""
    }));
    renderEditor();
  });

  document.querySelector("#download-json")?.addEventListener("click", () => {
    const blob = new Blob([output.value], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chapters.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.querySelector("#copy-json")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      status.textContent = "Copied JSON to clipboard.";
    } catch (error) {
      output.select();
      status.textContent = "Copy failed. Select the JSON box and copy it manually.";
    }
  });
};

const setupArticleEditor = async () => {
  const editor = document.querySelector("#article-editor");
  const output = document.querySelector("#article-json-output");
  const status = document.querySelector("#article-editor-status");

  if (!editor || !output || !status) {
    return;
  }

  let articles = [];

  const fields = [
    ["title", "Article title"],
    ["slug", "Slug"],
    ["author", "Author"],
    ["date", "Date"],
    ["readTime", "Read time"],
    ["summary", "Summary"],
    ["imageUrl", "Image path"],
    ["imageAlt", "Image alt text"],
    ["postUrl", "Existing static post URL"],
    ["body", "Article body"]
  ];

  const cleanArticle = (article) => ({
    title: article.title || "",
    slug: article.slug || slugify(article.title),
    author: article.author || "",
    date: article.date || "",
    readTime: article.readTime || "",
    summary: article.summary || "",
    imageUrl: article.imageUrl || "",
    imageAlt: article.imageAlt || "",
    postUrl: article.postUrl || "",
    body: article.body || ""
  });

  const syncOutput = () => {
    output.value = `${JSON.stringify({ articles: articles.map(cleanArticle) }, null, 2)}\n`;
  };

  const renderEditor = () => {
    editor.textContent = "";

    articles.forEach((article, index) => {
      const card = document.createElement("section");
      card.className = "editor-card panel";

      const heading = document.createElement("div");
      heading.className = "editor-card-heading";

      const title = document.createElement("h2");
      title.textContent = article.title || `Article ${index + 1}`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "button secondary";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => {
        articles.splice(index, 1);
        renderEditor();
      });

      heading.append(title, remove);
      card.appendChild(heading);

      fields.forEach(([key, labelText]) => {
        const label = document.createElement("label");
        label.textContent = labelText;

        const input = key === "summary" || key === "body" ? document.createElement("textarea") : document.createElement("input");
        input.value = article[key] || "";
        input.addEventListener("input", () => {
          article[key] = input.value.trim();
          if (key === "title") {
            title.textContent = article.title || `Article ${index + 1}`;
            if (!article.slug) {
              article.slug = slugify(article.title);
            }
          }
          syncOutput();
        });

        label.appendChild(input);
        card.appendChild(label);
      });

      editor.appendChild(card);
    });

    syncOutput();
  };

  try {
    const response = await fetch("assets/data/articles.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Article data could not be loaded.");
    }

    articles = normalizeArticles(await response.json()).map(cleanArticle);
    status.textContent = "Article data loaded. Edit fields below, then copy or download the JSON.";
    renderEditor();
  } catch (error) {
    status.textContent = "Could not load article data. You can still add articles manually.";
    articles = [];
    renderEditor();
  }

  document.querySelector("#add-article")?.addEventListener("click", () => {
    articles.push(cleanArticle({
      title: "New Article",
      slug: "new-article",
      author: "garments4goodness",
      date: "",
      readTime: "",
      summary: "",
      imageUrl: "",
      imageAlt: "",
      postUrl: "",
      body: ""
    }));
    renderEditor();
  });

  document.querySelector("#download-article-json")?.addEventListener("click", () => {
    const blob = new Blob([output.value], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "articles.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.querySelector("#copy-article-json")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      status.textContent = "Copied article JSON to clipboard.";
    } catch (error) {
      output.select();
      status.textContent = "Copy failed. Select the article JSON box and copy it manually.";
    }
  });
};

renderChapterGrid();
renderArticleList();
renderArticleDetail();
setupChapterEditor();
setupArticleEditor();
