/* ═══════════════════════════════════════════
   PORTFOLIO SCRIPT
   - Custom Cursor
   - Typed Text Effect
   - Scroll Reveal Animations
   - Nav Scroll Behavior
   - Skill Bar Animations
   - Mobile Menu
   - Contact Form
═══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  /* ─────────────────────────────────────────
     1. CUSTOM CURSOR
  ───────────────────────────────────────── */
  const cursor = document.getElementById("cursor");
  const cursorTrail = document.getElementById("cursorTrail");

  if (cursor && cursorTrail) {
    let mouseX = 0,
      mouseY = 0;
    let trailX = 0,
      trailY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    // Smooth trail animation
    function animateTrail() {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      cursorTrail.style.left = trailX + "px";
      cursorTrail.style.top = trailY + "px";
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Cursor scale on hover of interactive elements
    const hoverables = document.querySelectorAll(
      "a, button, .project-card, .skill-category, .cert-card, input, textarea",
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "16px";
        cursor.style.height = "16px";
        cursorTrail.style.width = "50px";
        cursorTrail.style.height = "50px";
        cursorTrail.style.opacity = "0.6";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width = "10px";
        cursor.style.height = "10px";
        cursorTrail.style.width = "35px";
        cursorTrail.style.height = "35px";
        cursorTrail.style.opacity = "1";
      });
    });
  }

  /* ─────────────────────────────────────────
     2. TYPED TEXT EFFECT
  ───────────────────────────────────────── */
  const typedEl = document.getElementById("typedText");
  if (typedEl) {
    const phrases = [
      "Data Scientist",
      "Machine Learning Engineer",
      "Python Developer",
      "ML Enthusiast",
      "Data Storyteller",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1800; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
  }

  /* ─────────────────────────────────────────
     3. NAVBAR SCROLL BEHAVIOR
  ───────────────────────────────────────── */
  const nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 80) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
      },
      { passive: true },
    );
  }

  /* ─────────────────────────────────────────
     4. MOBILE MENU TOGGLE
  ───────────────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      // Animate hamburger lines
      const spans = hamburger.querySelectorAll("span");
      if (mobileMenu.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
      }
    });

    // Close on link click
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburger.querySelectorAll("span").forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "";
        });
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("open");
        hamburger.querySelectorAll("span").forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "";
        });
      }
    });
  }

  /* ─────────────────────────────────────────
     5. SCROLL REVEAL ANIMATION (Intersection Observer)
  ───────────────────────────────────────── */
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target); // Animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ─────────────────────────────────────────
     6. SKILL BAR ANIMATION
  ───────────────────────────────────────── */
  const strengthFills = document.querySelectorAll(".strength-fill");

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute("data-width") + "%";
          setTimeout(() => {
            fill.style.width = targetWidth;
          }, 200);
          barObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 },
  );

  strengthFills.forEach((fill) => barObserver.observe(fill));

  /* ─────────────────────────────────────────
     7. SMOOTH SCROLL FOR NAV LINKS
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 70;
        const targetPos =
          target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  });

  /* ─────────────────────────────────────────
     8. CONTACT FORM HANDLER
  ───────────────────────────────────────── */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Loading state
      btn.textContent = "Sending...";
      btn.disabled = true;
      btn.style.opacity = "0.7";

      // Simulate submission (replace with real API call)
      setTimeout(() => {
        btn.textContent = "✅ Message Sent!";
        btn.style.opacity = "1";
        contactForm.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  /* ─────────────────────────────────────────
     9. HERO PARALLAX (subtle)
  ───────────────────────────────────────── */
  const heroGlow1 = document.querySelector(".glow-1");
  const heroGlow2 = document.querySelector(".glow-2");

  if (heroGlow1 && heroGlow2) {
    window.addEventListener(
      "mousemove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heroGlow1.style.transform = `translate(${x}px, ${y}px)`;
        heroGlow2.style.transform = `translate(${-x * 0.7}px, ${-y * 0.7}px)`;
      },
      { passive: true },
    );
  }

  /* ─────────────────────────────────────────
     10. COUNTER ANIMATION FOR HERO STATS
  ───────────────────────────────────────── */
  function animateCounter(el, target, suffix = "") {
    let count = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(count) + suffix;
    }, 16);
  }

  const statNums = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const num = parseInt(text);
          const suffix = text.replace(/[0-9]/g, "");
          animateCounter(el, num, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNums.forEach((el) => counterObserver.observe(el));

  /* ─────────────────────────────────────────
     11. ACTIVE NAV LINK HIGHLIGHTING
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function updateActiveLink() {
    const scrollPos = window.scrollY + (nav ? nav.offsetHeight + 50 : 120);

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((link) => {
          link.style.color = "";
          if (link.getAttribute("href") === "#" + id) {
            link.style.color = "var(--accent)";
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ─────────────────────────────────────────
     12. PROJECT CARD TILT EFFECT (subtle)
  ───────────────────────────────────────── */
  const tiltCards = document.querySelectorAll(
    ".project-card, .cert-card, .case-card",
  );

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ─────────────────────────────────────────
     INIT: Trigger visible on hero elements
  ───────────────────────────────────────── */
  // Hero elements start visible after load
  setTimeout(() => {
    document
      .querySelectorAll(".hero .reveal-up, .hero .reveal-right")
      .forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 80);
      });
  }, 100);
});
