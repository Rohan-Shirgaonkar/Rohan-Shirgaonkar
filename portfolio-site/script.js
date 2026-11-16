(() => {
  const portfolio = window.PORTFOLIO || {};
  const profiles = portfolio.profiles || {};
  const projectLinks = portfolio.projects || {};
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const allowedWebLink = (value) => typeof value === "string" && /^https:\/\//i.test(value.trim());

  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuToggle || !primaryNav) return;
    const wasOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
    if (restoreFocus && wasOpen) menuToggle.focus();
  };
  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    primaryNav?.classList.toggle("is-open", open);
  });
  primaryNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      closeMenu({ restoreFocus: true });
    }
  });

  const interests = {
    ai: ["Artificial intelligence", "I’m interested in how intelligent systems can make useful tools more capable—and in the engineering that makes those systems dependable.", "EXPLORING"],
    ml: ["Machine learning", "I’m learning the ideas behind systems that find patterns in data and improve at a task, along with the maths and evaluation that make them useful.", "LEARNING"],
    data: ["Data science", "I’m exploring how to move from raw information to a clear, careful explanation—and how tools like NumPy and Pandas support that work.", "EXPLORING"],
    product: ["Product development", "I like the process of starting with a real need, shaping a small solution, and improving it through feedback and iteration.", "INTERESTED"],
    building: ["Building new things", "I enjoy turning ideas into small working projects and learning by improving them.", "MAKING & LEARNING"],
    software: ["Software engineering", "I want to understand how thoughtful software is built: clear structure, maintainable code, useful tests, and attention to the people who depend on it.", "BUILDING FOUNDATIONS"],
    emerging: ["Emerging technologies", "New tools catch my attention when they open up a practical way to create, understand, or improve something—not simply because they are new.", "STAYING CURIOUS"]
  };
  const interestButtons = [...document.querySelectorAll(".interest-node")];
  const detail = document.querySelector(".interest-detail");
  interestButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = interests[button.dataset.interest];
      if (!value || !detail) return;
      interestButtons.forEach((node) => {
        const active = node === button;
        node.classList.toggle("is-active", active);
        node.setAttribute("aria-pressed", String(active));
      });
      const index = String(interestButtons.indexOf(button) + 1).padStart(2, "0");
      detail.querySelector(".detail-kicker").textContent = `${index} / ON MY RADAR`;
      detail.querySelector("h3").textContent = value[0];
      detail.querySelector("p").textContent = value[1];
      detail.querySelector(".detail-status").innerHTML = `<i></i> ${value[2]}`;
    });
  });

  const contactLinks = document.querySelector(".contact-links");
  const contactPlaceholder = document.querySelector(".contact-placeholder");
  const profileItems = [
    ["linkedin", "LinkedIn", profiles.linkedin],
    ["github", "GitHub", profiles.github],
    ["email", "Email", profiles.email],
    ["resume", "Resume", profiles.resume]
  ];
  const validProfile = (key, value) => key === "email"
    ? typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    : key === "resume"
      ? typeof value === "string" && /^\/(?!\/)[^\s]+\.(pdf|docx?)(\?.*)?$/i.test(value.trim())
      : allowedWebLink(value);
  const profileHref = (key, value) => key === "email" ? `mailto:${value.trim()}` : value.trim();

  if (contactLinks) {
    profileItems.forEach(([key, label, value]) => {
      if (key === "resume" && !validProfile(key, value)) return;
      const row = document.createElement(validProfile(key, value) ? "a" : "div");
      row.className = validProfile(key, value) ? "configured-link" : "missing-link";
      row.innerHTML = `<span>${label}</span><span>${validProfile(key, value) ? "↗" : "ADD DETAILS"}</span>`;
      if (validProfile(key, value)) {
        row.href = profileHref(key, value);
        if (key !== "email") {
          row.target = "_blank";
          row.rel = "noopener noreferrer";
        }
        if (key === "resume") row.download = "";
        row.setAttribute("aria-label", key === "email" ? "Email Rohan Shirgaonkar" : `${label} profile (opens in a new tab)`);
      } else {
        row.setAttribute("aria-label", `${label} link not configured`);
      }
      contactLinks.append(row);
    });
    const hasContact = validProfile("linkedin", profiles.linkedin) || validProfile("github", profiles.github) || validProfile("email", profiles.email);
    if (contactPlaceholder && hasContact) contactPlaceholder.hidden = true;
  }

  const setProjectLink = (key, card) => {
    const container = card?.querySelector(".project-link-muted");
    const url = projectLinks[key];
    if (!container || !allowedWebLink(url)) return;
    const link = document.createElement("a");
    link.className = "project-repo-link";
    link.href = url.trim();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "VIEW REPOSITORY ↗";
    link.setAttribute("aria-label", `View ${key === "studentMarksAnalyzer" ? "Student Marks Analyzer" : "NeetCode Submissions"} repository`);
    container.replaceWith(link);
  };
  setProjectLink("studentMarksAnalyzer", document.querySelector(".project-marks"));
  setProjectLink("neetcodeSubmissions", document.querySelector(".project-dsa"));

  const revealTargets = document.querySelectorAll(".section:not(.hero) .section-heading, .section-intro-row > *, .about-grid > *, .interest-map, .interest-detail, .skill-group, .project-card, .project-body > .project-title-row, .project-body > h3, .project-body > p, .project-facts > div, .project-body > .tech-row, .project-body > .project-footer, .perspective-art, .perspective-copy > *, .direction-item, .education-card, .contact-main > *, .learning-line");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealTargets.forEach((element, index) => {
      if (element.matches(".interest-map, .perspective-art")) {
        element.classList.add("can-animate");
        element.querySelectorAll("svg path").forEach((path) => {
          try {
            path.style.setProperty("--line-length", String(path.getTotalLength()));
          } catch (_) {
            path.style.setProperty("--line-length", "1200");
          }
        });
        if (element.matches(".interest-map")) {
          const nucleus = element.querySelector(".map-center");
          const nucleusBounds = nucleus?.getBoundingClientRect();
          element.querySelectorAll(".interest-node").forEach((node, nodeIndex) => {
            const nodeBounds = node.getBoundingClientRect();
            if (nucleusBounds) {
              const nucleusX = nucleusBounds.left + nucleusBounds.width / 2;
              const nucleusY = nucleusBounds.top + nucleusBounds.height / 2;
              node.style.setProperty("--origin-x", `${(nucleusX - nodeBounds.left - nodeBounds.width / 2).toFixed(1)}px`);
              node.style.setProperty("--origin-y", `${(nucleusY - nodeBounds.top - nodeBounds.height / 2).toFixed(1)}px`);
            }
            node.style.setProperty("--node-delay", `${100 + nodeIndex * 85}ms`);
          });
        }
        if (element.matches(".perspective-art")) {
          element.querySelectorAll(".net-points circle").forEach((point, pointIndex) => {
            point.style.setProperty("--point-delay", `${120 + pointIndex * 65}ms`);
          });
        }
      }
      element.classList.add("js-reveal");
      if (element.matches(".skill-group, .project-card, .project-body > .project-title-row, .project-body > h3, .project-body > p, .project-facts > div, .project-body > .tech-row, .project-body > .project-footer, .direction-item, .section-intro-row > *, .about-grid > *, .contact-main > *")) {
        const siblings = [...element.parentElement.children].filter((sibling) => sibling.matches(".js-reveal"));
        const siblingIndex = siblings.indexOf(element);
        element.style.transitionDelay = `${Math.min(Math.max(siblingIndex, 0), 3) * 85}ms`;
      }
      observer.observe(element);
    });
  }

  const canvas = document.querySelector(".hero-particles");
  const smallScreen = window.matchMedia("(max-width: 700px)").matches;
  const heroPortrait = document.querySelector(".hero-portrait");
  if (heroPortrait && !reducedMotion) {
    let portraitFrame = 0;
    const stickyHeader = document.querySelector(".site-header");
    const updatePortrait = () => {
      if (portraitFrame) return;
      portraitFrame = window.requestAnimationFrame(() => {
        const bounds = heroPortrait.getBoundingClientRect();
        const headerBottom = stickyHeader?.getBoundingClientRect().bottom || 0;
        const progress = Math.max(0, Math.min(1, (headerBottom - bounds.top) / Math.max(1, bounds.height)));
        heroPortrait.style.setProperty("--photo-opacity", (1 - progress).toFixed(3));
        const shift = Math.max(-14, Math.min(26, (headerBottom - bounds.top) * .045));
        heroPortrait.style.setProperty("--photo-shift", `${shift.toFixed(1)}px`);
        heroPortrait.parentElement?.style.setProperty("--photo-shift", `${shift.toFixed(1)}px`);
        portraitFrame = 0;
      });
    };
    updatePortrait();
    window.addEventListener("scroll", updatePortrait, { passive: true });
    window.addEventListener("resize", updatePortrait, { passive: true });
  }
  if (canvas && !reducedMotion) {
    const context = canvas.getContext("2d", { alpha: true });
    if (context) {
      let width = 0;
      let height = 0;
      let particles = [];
      let frame = 0;
      let lastFrame = 0;
      let heroIsVisible = true;
      let pageIsActive = true;
      const amount = smallScreen ? 25 : 48;
      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        particles = Array.from({ length: amount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          dx: (Math.random() - .5) * .16,
          dy: (Math.random() - .5) * .16,
          radius: Math.random() * 1.15 + .5
        }));
      };
      const draw = (time) => {
        frame = 0;
        if (!heroIsVisible || !pageIsActive || document.hidden) return;
        frame = window.requestAnimationFrame(draw);
        if (time - lastFrame < 38) return;
        lastFrame = time;
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i += 1) {
          const particle = particles[i];
          particle.x = (particle.x + particle.dx + width) % width;
          particle.y = (particle.y + particle.dy + height) % height;
          context.beginPath();
          context.fillStyle = "rgba(123, 218, 204, .43)";
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fill();
          for (let j = i + 1; j < particles.length; j += 1) {
            const other = particles[j];
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 82) continue;
            context.beginPath();
            context.strokeStyle = `rgba(64, 229, 208, ${(1 - distance / 82) * .12})`;
            context.lineWidth = 1;
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      };
      const start = () => {
        if (frame || !heroIsVisible || !pageIsActive || document.hidden) return;
        lastFrame = 0;
        frame = window.requestAnimationFrame(draw);
      };
      const stop = () => {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        lastFrame = 0;
      };
      const onVisibilityChange = () => document.hidden ? stop() : start();
      const hero = document.querySelector(".hero");
      const heroObserver = "IntersectionObserver" in window && hero
        ? new IntersectionObserver(([entry]) => {
          heroIsVisible = entry.isIntersecting;
          if (heroIsVisible) start();
          else stop();
        }, { threshold: 0.01 })
        : null;
      resize();
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", onVisibilityChange);
      heroObserver?.observe(hero);
      start();
      window.addEventListener("pagehide", () => {
        pageIsActive = false;
        stop();
      });
      window.addEventListener("pageshow", () => {
        pageIsActive = true;
        start();
      });
    }
  }
})();
