(function () {
  "use strict";

  const FALLBACK_TITLE = "Link Tiles";

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const el = byId(id);
    if (!el) return;
    el.textContent = value || "";
  }

  function setAttr(id, attr, value) {
    const el = byId(id);
    if (!el || !value) return;
    el.setAttribute(attr, value);
  }

  function buildTile(link) {
    const tile = document.createElement("a");
    tile.className = "tile";
    if (link.type === "project") {
      tile.classList.add("tile-project");
    }

    tile.href = link.url || "#";

    if (link.icon) {
      const icon = document.createElement("img");
      icon.className = "tile-icon";
      icon.src = link.icon;
      icon.alt = "";
      tile.appendChild(icon);
    }

    const title = document.createElement("h2");
    title.textContent = link.title || "Untitled";
    tile.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.textContent = link.subtitle || "";
    tile.appendChild(subtitle);

    const arrow = document.createElement("span");
    arrow.className = "tile-arrow";
    arrow.textContent = "->";
    tile.appendChild(arrow);

    return tile;
  }

  function render(config) {
    const site = config.site || {};
    const profile = config.profile || {};
    const links = Array.isArray(config.links) ? config.links : [];

    document.title = site.title || FALLBACK_TITLE;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && site.description) {
      metaDescription.setAttribute("content", site.description);
    }

    if (site.favicon) {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) favicon.setAttribute("href", site.favicon);
    }

    setText("name", profile.name || "Your Name");
    setText("location", profile.location || "Your Location");
    setText("bio", profile.bio || "Add a short bio in config.json");

    setAttr("avatar", "src", profile.avatar);
    setAttr("avatar", "alt", profile.avatarAlt || profile.name || "Profile photo");

    const emailChip = byId("email-chip");
    if (emailChip) {
      const email = profile.email || "";
      emailChip.textContent = profile.emailLabel || "Email";
      emailChip.href = email ? `mailto:${email}` : "#";
      if (!email) {
        emailChip.setAttribute("aria-disabled", "true");
      }
    }

    const tileGrid = byId("tile-grid");
    if (tileGrid) {
      tileGrid.innerHTML = "";
      if (links.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "No links found. Add some links in config.json.";
        tileGrid.appendChild(empty);
      } else {
        links.forEach((link) => {
          tileGrid.appendChild(buildTile(link));
        });
      }
    }

  }

  async function init() {
    try {
      const response = await fetch("config.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Unable to load config.json (${response.status})`);
      }

      const config = await response.json();
      render(config);
    } catch (error) {
      console.error(error);
      const tileGrid = byId("tile-grid");
      if (tileGrid) {
        tileGrid.innerHTML = '<p class="empty-state">Could not load config.json. Check the file and refresh.</p>';
      }
    }
  }

  init();
})();
