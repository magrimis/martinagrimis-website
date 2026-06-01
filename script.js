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
});
