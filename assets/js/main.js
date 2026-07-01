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

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const chapterCoordinates = {
  "Alief Chapter": [29.7111, -95.5963],
  "Bakersfield Chapter": [35.3733, -119.0187],
  "Berkeley Chapter": [37.8715, -122.2730],
  "Byron Chapter": [37.8671, -121.6380],
  "Central LA Chapter": [34.0522, -118.2437],
  "Chesterfield Chapter": [38.6631, -90.5771],
  "Chicago Chapter": [41.8781, -87.6298],
  "Clovis Chapter": [36.8252, -119.7029],
  "East LA Chapter": [34.0239, -118.1720],
  "Ellicott City Chapter": [39.2673, -76.7983],
  "Fremont Chapter": [37.5485, -121.9886],
  "Houston Chapter": [29.7604, -95.3698],
  "Jacksonville Chapter": [30.3322, -81.6557],
  "Kalamazoo Chapter": [42.2917, -85.5872],
  "Kern County Chapter": [35.4937, -118.8597],
  "Las Vegas Chapter": [36.1716, -115.1391],
  "Lathrop Chapter": [37.8227, -121.2766],
  "Lincolnshire Chapter": [42.1900, -87.9084],
  "Loudoun Chapter": [39.0768, -77.6536],
  "Louisville Chapter": [38.2527, -85.7585],
  "Malaysia Chapter": [3.1390, 101.6869],
  "Milpitas Chapter": [37.4323, -121.8996],
  "Mountain House Chapter": [37.7799, -121.5427],
  "New Jersey Chapter": [40.0583, -74.4057],
  "NYC Chapter": [40.7128, -74.0060],
  "Oceanside Chapter": [33.1959, -117.3795],
  "Pasco Chapter": [46.2396, -119.1006],
  "Philadelphia Chapter": [39.9526, -75.1652],
  "Princeton Chapter": [40.3573, -74.6672],
  "Richmond Chapter": [37.5407, -77.4360],
  "Sacramento Chapter": [38.5816, -121.4944],
  "San Jose Chapter": [37.3382, -121.8863],
  "Shafter Chapter": [35.5005, -119.2718],
  "Silver Spring Chapter": [38.9907, -77.0261],
  "South San Jose Chapter": [37.2397, -121.8275],
  "St. Louis Chapter": [38.6270, -90.1994],
  "Stafford Chapter": [38.4221, -77.4083],
  "Strongsville Chapter": [41.3145, -81.8357],
  "Sunnyvale Chapter": [37.3688, -122.0363],
  "Vacaville Chapter": [38.3566, -121.9877],
  "Wabasha Chapter": [44.3839, -92.0329]
};

const chapterCardId = (chapter) => `chapter-${slugify(chapter.name || chapter.location || "chapter")}`;

const highlightChapterCard = (id) => {
  document.querySelectorAll(".chapter-card.is-active").forEach((card) => {
    card.classList.remove("is-active");
  });

  const card = document.getElementById(id);

  if (card) {
    card.classList.add("is-active");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const chapterPopupContent = (chapter, cardId) => {
  const title = chapter.name || "Garments4Goodness Chapter";
  const location = chapter.location || "";
  const instagram = chapter.instagramUrl ? `<p><a href="${chapter.instagramUrl}">Instagram</a></p>` : "";
  const contact = chapter.contactUrl ? `<p><a href="${chapter.contactUrl}">Contact this chapter</a></p>` : "";

  return `
    <div class="chapter-popup">
      <h3>${title}</h3>
      <p>${location}</p>
      ${instagram}
      ${contact}
      <p><a href="#${cardId}" data-chapter-jump="${cardId}">View card</a></p>
    </div>
  `;
};

const renderChapterMap = (chapters) => {
  const mapElement = document.querySelector("[data-chapter-map]");

  if (!mapElement) {
    return;
  }

  if (!window.L) {
    mapElement.innerHTML = '<p class="notice">The chapter map could not be loaded. The chapter directory below is still available.</p>';
    return;
  }

  mapElement.textContent = "";

  const map = L.map(mapElement, {
    scrollWheelZoom: false
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const bounds = [];

  chapters.forEach((chapter) => {
    const coordinates = chapterCoordinates[chapter.name];

    if (!coordinates) {
      return;
    }

    const cardId = chapterCardId(chapter);
    const marker = L.marker(coordinates).addTo(map);
    let closePopupTimer;
    let popupHovered = false;
    let markerHovered = false;
    const closePopupSoon = () => {
      window.clearTimeout(closePopupTimer);
      closePopupTimer = window.setTimeout(() => {
        if (!markerHovered && !popupHovered) {
          marker.closePopup();
        }
      }, 650);
    };
    const showPopup = () => {
      window.clearTimeout(closePopupTimer);
      marker.openPopup();
    };

    marker.bindPopup(chapterPopupContent(chapter, cardId), {
      autoClose: false,
      closeButton: true,
      closeOnClick: false
    });
    marker.on("mouseover", () => {
      markerHovered = true;
      showPopup();
    });
    marker.on("mouseout", () => {
      markerHovered = false;
      closePopupSoon();
    });
    marker.on("focus", showPopup);
    marker.on("add", () => {
      const markerElement = marker.getElement();

      if (markerElement) {
        markerElement.setAttribute("tabindex", "0");
        markerElement.addEventListener("mouseenter", () => {
          markerHovered = true;
          showPopup();
        });
        markerElement.addEventListener("mouseleave", () => {
          markerHovered = false;
          closePopupSoon();
        });
        markerElement.addEventListener("focus", showPopup);
      }
    });
    marker.on("click", () => highlightChapterCard(cardId));
    marker.on("popupopen", (event) => {
      const popupElement = event.popup.getElement();
      const jump = popupElement?.querySelector("[data-chapter-jump]");

      if (jump) {
        jump.addEventListener("click", () => highlightChapterCard(jump.dataset.chapterJump));
      }

      if (popupElement) {
        popupElement.addEventListener("mouseenter", () => {
          popupHovered = true;
          window.clearTimeout(closePopupTimer);
        });
        popupElement.addEventListener("mouseleave", () => {
          popupHovered = false;
          closePopupSoon();
        });
      }
    });
    bounds.push(coordinates);
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [32, 32] });
  } else {
    map.setView([37.8, -96], 4);
  }
};

const renderChapterCards = (chapters) => {
  const grid = document.querySelector("[data-chapter-grid]");

  if (!grid) {
    return;
  }

  grid.textContent = "";

  chapters.forEach((chapter) => {
    const card = document.createElement("article");
    card.className = "chapter-card";
    card.id = chapterCardId(chapter);

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
};

const renderChapterDirectory = async () => {
  const grid = document.querySelector("[data-chapter-grid]");
  const mapElement = document.querySelector("[data-chapter-map]");

  if (!grid && !mapElement) {
    return;
  }

  try {
    const response = await fetch("assets/data/chapters.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Chapter data could not be loaded.");
    }

    const chapters = await response.json();

    renderChapterCards(chapters);
    renderChapterMap(chapters);
  } catch (error) {
    const message = '<p class="notice">Chapter information could not be loaded. Please refresh the page or contact garments4goodness@gmail.com.</p>';

    if (grid) {
      grid.innerHTML = message;
    }

    if (mapElement) {
      mapElement.innerHTML = message;
    }
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

const setupRevealAnimations = () => {
  const elements = document.querySelectorAll(".section, .chapter-feature, .chapter-card, .card, .role-card, .initiative, .testimonial-quote");

  if (!elements.length) {
    return;
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  elements.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
};

const setupCounters = () => {
  const counters = document.querySelectorAll("[data-count]");

  if (!counters.length) {
    return;
  }

  const setCounterValue = (element, value) => {
    const prefix = element.dataset.countPrefix || "";
    element.textContent = `${prefix}${Math.round(value).toLocaleString()}`;
  };

  const animateCounter = (element) => {
    const target = Number(element.dataset.count);

    if (!Number.isFinite(target)) {
      return;
    }

    if (prefersReducedMotion) {
      setCounterValue(element, target);
      return;
    }

    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounterValue(element, target * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
};

renderChapterDirectory();
renderArticleList();
renderArticleDetail();
setupRevealAnimations();
setupCounters();
