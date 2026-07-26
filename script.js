(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector(".site-header");
  const nav = document.querySelector("#primary-navigation");
  const navToggle = document.querySelector(".nav-toggle");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = themeToggle?.querySelector("span");
  const progressBar = document.querySelector("#scroll-progress-bar");
  const backToTop = document.querySelector("#back-to-top");
  const searchInput = document.querySelector("#publication-search");
  const publicationList = document.querySelector("#publication-list");
  const emptyState = document.querySelector("#publication-empty");
  const visibleCount = document.querySelector("#publication-visible-count");
  const journalCount = document.querySelector("#journal-count");
  const conferenceCount = document.querySelector("#conference-count");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const navLinks = [...document.querySelectorAll("#primary-navigation a[href^='#']")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const publications = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS : [];

  let selectedFilter = "all";
  let revealObserver;

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const normalize = (value = "") => String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const highlightAuthor = (authors = "") => {
    const escaped = escapeHtml(authors);
    return escaped
      .replace(/Behnam Firouzi/g, "<mark>Behnam Firouzi</mark>")
      .replace(/Behnam Firoozi/g, "<mark>Behnam Firoozi</mark>");
  };

  const setTheme = (theme, persist = true) => {
    root.dataset.theme = theme === "dark" ? "dark" : "light";
    const dark = root.dataset.theme === "dark";
    if (themeIcon) themeIcon.textContent = dark ? "☀" : "◐";
    themeToggle?.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle?.setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#071321" : "#0a1f44");
    if (persist) {
      try { localStorage.setItem("bf-theme", root.dataset.theme); } catch (_) { /* storage may be blocked */ }
    }
  };

  setTheme(root.dataset.theme || "light", false);

  themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  const closeNavigation = () => {
    nav?.classList.remove("is-open");
    navToggle?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
    body.classList.remove("nav-open");
  };

  navToggle?.addEventListener("click", () => {
    const opening = !nav?.classList.contains("is-open");
    nav?.classList.toggle("is-open", opening);
    navToggle.classList.toggle("is-open", opening);
    navToggle.setAttribute("aria-expanded", String(opening));
    navToggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
    body.classList.toggle("nav-open", opening);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

  document.addEventListener("click", (event) => {
    if (!nav?.classList.contains("is-open")) return;
    if (nav.contains(event.target) || navToggle?.contains(event.target)) return;
    closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
    if (event.key === "/" && searchInput && document.activeElement !== searchInput) {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable) return;
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100)) : 0;
    if (progressBar) progressBar.style.width = `${percent}%`;
    header?.classList.toggle("is-scrolled", scrollTop > 14);
    backToTop?.classList.toggle("is-visible", scrollTop > 650);
  };

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNavigation();
    updateScrollUI();
  });
  updateScrollUI();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${active.target.id}`);
      });
    }, { rootMargin: "-22% 0px -63% 0px", threshold: [0.05, 0.2, 0.5] });

    sections.forEach((section) => sectionObserver.observe(section));

    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -55px 0px", threshold: 0.08 });
  }

  const observeReveals = (scope = document) => {
    const elements = [...scope.querySelectorAll(".reveal:not(.is-visible)")];
    if (!revealObserver) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 6, 5) * 45}ms`;
      revealObserver.observe(element);
    });
  };

  const publicationCard = (item) => {
    const title = escapeHtml(item.title);
    const year = escapeHtml(item.year);
    const type = escapeHtml(item.type);
    const venue = escapeHtml(item.venue);
    const description = escapeHtml(item.summary);
    const category = escapeHtml(item.categoryLabel);
    const url = escapeHtml(item.url);
    const doi = escapeHtml(item.doi);
    const linkLabel = item.doi ? "DOI" : "Record";
    const access = item.openAccess ? '<span class="open-access">Open access / public record</span>' : "";
    const featured = item.featured ? " is-featured" : "";
    const doiTag = doi ? `<span>DOI ${doi}</span>` : "";

    return `
      <article class="publication-card reveal${featured}" data-category="${escapeHtml(item.category)}">
        <div class="publication-year">
          ${year}
          <span class="publication-type">${type}</span>
        </div>
        <div class="publication-main">
          <h3>${title}</h3>
          <p class="publication-authors">${highlightAuthor(item.authors)}</p>
          <p class="publication-venue">${venue}</p>
          <p class="publication-description">${description}</p>
          <div class="publication-tags">
            <span>${category}</span>
            ${doiTag}
          </div>
        </div>
        <div class="publication-actions">
          <a class="publication-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${linkLabel} record for ${title}">${linkLabel} <span aria-hidden="true">↗</span></a>
          ${access}
        </div>
      </article>`;
  };

  const searchableText = (item) => normalize([
    item.year,
    item.type,
    item.category,
    item.categoryLabel,
    item.title,
    item.authors,
    item.venue,
    item.doi,
    item.summary
  ].join(" "));

  const renderPublications = () => {
    if (!publicationList) return;
    const term = normalize(searchInput?.value || "");
    const filtered = publications.filter((item) => {
      const categoryMatch = selectedFilter === "all" || item.category === selectedFilter;
      const searchMatch = !term || searchableText(item).includes(term);
      return categoryMatch && searchMatch;
    });

    publicationList.innerHTML = filtered.map(publicationCard).join("");
    if (visibleCount) visibleCount.textContent = String(filtered.length);
    if (emptyState) emptyState.hidden = filtered.length !== 0;
    observeReveals(publicationList);
  };

  const journals = publications.filter((item) => item.type === "Journal article").length;
  const conferences = publications.filter((item) => item.type === "Conference contribution").length;
  if (journalCount) journalCount.textContent = String(journals);
  if (conferenceCount) conferenceCount.textContent = String(conferences);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedFilter = button.dataset.filter || "all";
      filterButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      renderPublications();
    });
    button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
  });

  searchInput?.addEventListener("input", renderPublications);
  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      searchInput.blur();
      renderPublications();
    }
  });

  renderPublications();
  observeReveals(document);
})();
