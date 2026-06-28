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

renderChapterGrid();
setupChapterEditor();
