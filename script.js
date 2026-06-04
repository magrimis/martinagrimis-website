// Personal site interactivity

document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Light / dark theme toggle (initial theme is set inline in <head>)
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      const meta = document.getElementById("theme-color-meta");
      if (meta) meta.setAttribute("content", next === "dark" ? "#0d1117" : "#ffffff");
    });
  }

  // Click-to-reveal email (the full address is never present in the HTML)
  const emailReveal = document.getElementById("email-reveal");
  if (emailReveal) {
    emailReveal.addEventListener("click", () => {
      const address = emailReveal.dataset.user + "@" + emailReveal.dataset.domain;
      const link = document.createElement("a");
      link.href = "mailto:" + address;
      link.className = "contact-link";
      link.textContent = address;
      emailReveal.replaceWith(link);
    });
  }

  // Mobile nav toggle
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping a link (mobile)
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Collapsible deal groups. Listeners attach everywhere, but the collapse only
  // takes visual effect on mobile (CSS hides .deals under 720px unless .open).
  document.querySelectorAll(".deal-group-label").forEach((label) => {
    const list = label.nextElementSibling;
    if (!list || !list.classList.contains("deals")) return;

    label.setAttribute("role", "button");
    label.setAttribute("tabindex", "0");
    label.setAttribute("aria-expanded", "false");

    const toggleGroup = () => {
      const open = label.classList.toggle("open");
      list.classList.toggle("open", open);
      label.setAttribute("aria-expanded", String(open));
    };

    label.addEventListener("click", toggleGroup);
    label.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleGroup();
      }
    });
  });
});
