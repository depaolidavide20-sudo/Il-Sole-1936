(() => {
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const carousels = document.querySelectorAll("[data-carousel]");
  const modalTriggers = document.querySelectorAll("[data-modal-open]");
  const modals = document.querySelectorAll("[data-modal]");
  const bookingForms = document.querySelectorAll("[data-booking-form]");
  const languageLinks = document.querySelectorAll("[data-lang-switch]");
  const root = document.documentElement;
  const hero = document.querySelector(".hero");
  const mobileCta = document.querySelector(".mobile-cta");
  const mobileHeroQuery = window.matchMedia("(max-width: 720px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menuModal = document.getElementById("menu-modal");
  const menuPages = menuModal?.querySelector(".menu-catalog, .menu-pages");
  const menuInputs = menuModal?.querySelectorAll('input[name="menu-view"]') || [];
  const restaurantModal = document.getElementById("restaurant-modal");
  const restaurantDate = restaurantModal?.querySelector('input[name="date"]');
  const restaurantOccasion = restaurantModal?.querySelector('select[name="occasion"]');
  const restaurantTime = restaurantModal?.querySelector('input[name="time"]');
  const whatsappNumber = "393514364379";
  const originalTitle = document.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  const originalDescription = metaDescription?.getAttribute("content") || "";
  const storedText = new Map();
  const storedHtml = new Map();
  const heroSlideHoldMs = 4000;
  const heroSlideFadeMs = 1200;

  function remember(element) {
    if (element && !storedText.has(element)) storedText.set(element, element.textContent);
  }

  function rememberHtml(element) {
    if (element && !storedHtml.has(element)) storedHtml.set(element, element.innerHTML);
  }

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach((element) => {
      remember(element);
      element.textContent = text;
    });
  }

  function setInlineText(selector, text) {
    document.querySelectorAll(selector).forEach((element) => {
      rememberHtml(element);
      const icon = element.querySelector(".tripadvisor-icon, svg, .whatsapp-icon");
      element.textContent = "";
      if (icon) element.append(icon);
      element.append(document.createTextNode(" " + text));
    });
  }

  const englishCopy = [
    [".skip-link", "Skip to content"],
    ['.site-nav a[href="#storia"]', "Our story"],
    ['.site-nav a[href="#ristorante"]', "Restaurant"],
    ['.site-nav a[href="#location"]', "Location"],
    ['.site-nav a[href="#recensioni"]', "Reviews"],
    ['.site-nav a[href="#contatti"]', "Contacts"],
    [".hero .eyebrow", "Rapallo | Ligurian Riviera"],
    [".hero-copy", "A seafront bar and restaurant in Rapallo: Ligurian cuisine, seafood, coastal views and the slow rhythm of the Riviera."],
    ["#storia .history-copy .eyebrow", "Our story"],
    ["#storia .history-copy h2", "Sole 1936 was born from Rudy Luxardo’s roots and from the desire to turn family memory into an experience to share."],
    ["#storia .history-copy p:nth-of-type(2)", "The name pays tribute to his grandfather Luigi, fisherman and athlete, who took part in the 1936 Berlin Olympic Games with the Italian rowing team."],
    ["#storia .history-copy p:nth-of-type(3)", "From his grandmother Silvia and his mother Mimma, Rudy learned the value of food as a gesture of love. To this legacy he added flavors and inspiration gathered during his travels, creating a cuisine where Liguria meets the world."],
    ["#storia .history-quote p", "Every dish is a bridge between our roots and the stories gathered along the journey."],
    [".history-caption strong", "Luigi Luxardo, on the left"],
    [".history-caption span", "Olympic athlete at the 1936 Berlin Games"],
    ["#ristorante .restaurant-feature-copy .eyebrow", "Restaurant"],
    ["#ristorante .restaurant-feature-copy h2", "Ligurian seafood cuisine with a Rapallo view."],
    ["#ristorante .restaurant-feature-copy > p:not(.eyebrow)", "Contemporary Ligurian cuisine, original recipes and regional ingredients: from lunch to dinner, Il Sole 1936 welcomes guests looking for seafood, taste and a table facing the sea."],
    ["#ristorante .restaurant-info-panel span", "Info & reservations"],
    ["#ristorante .restaurant-info-panel strong", "Seafood, Ligurian cuisine and sea-view tables"],
    ["#ristorante .restaurant-statement p", "From sea-view lunch to romantic dinner, every table stays close to the rhythm of the coast."],
    ["#location .beach-story .eyebrow", "Location"],
    ["#location .beach-story h2", "A seafront terrace in the heart of Rapallo."],
    ["#location .beach-story > p:not(.eyebrow)", "Il Sole 1936 faces the coastline directly: an intimate, bright and scenic place to experience Rapallo by the sea, between the Castle and the promenade."],
    ["#location .beach-info-panel span", "Info & reservations"],
    ["#location .beach-info-panel strong", "Lungomare Castello 10 · Rapallo"],
    [".review-pill", "Reviews"],
    [".reviews-inner h2", "What guests say"],
    [".contact-pill", "Contacts"],
    [".contact-card h2", "Come visit us."],
    [".contact-item:nth-of-type(1) div > span", "How to reach us"],
    [".contact-item:nth-of-type(1) strong", "Lungomare Castello 10 Rapallo"],
    [".contact-item:nth-of-type(1) p", "Find us on Rapallo's seafront, near the seaside castle, directly facing the coast."],
    [".contact-item:nth-of-type(2) div > span", "Phone"],
    [".contact-item:nth-of-type(3) div > span", "Format"],
    [".contact-item:nth-of-type(3) strong", "Sea-view bar and restaurant"],
    [".contact-item:nth-of-type(4) div > span", "Hours"],
    [".contact-hours strong", "12:30-14:30 · 18:30-22:00"],
    [".contact-hours p", "Tuesday to Sunday. Closed Monday except holidays and long weekends."],
    [".route-kicker", "Directions"],
    [".route-card h3", "Il Sole 1936"],
    [".route-intro", "Lungomare Castello 10 · Rapallo"],
    [".route-map-link", "Open in Google Maps"],
    ["#restaurant-modal .eyebrow", "Restaurant reservation"],
    ["#restaurant-modal-title", "Book your table"],
    [".dinner-window-help", "Lunch 12:30-14:30, dinner 18:30-22:00. Closed Monday except holidays and long weekends."],
    ["#menu-modal .eyebrow", "Digital menu"],
    ["#menu-modal-title", "The Sole1936 menu"],
    [".menu-intro", "Browse dishes, prices and menu proposals."],
    [".footer-copy", "© 2026 Il Sole 1936 · All rights reserved"],
  ];

  function restoreItalian() {
    storedHtml.forEach((html, element) => { element.innerHTML = html; });
    storedText.forEach((text, element) => { element.textContent = text; });
    document.title = originalTitle;
    metaDescription?.setAttribute("content", originalDescription);
  }

  function setLanguage(language, updateHash = true) {
    const nextLanguage = language === "en" ? "en" : "it";
    restoreItalian();
    if (nextLanguage === "en") {
      document.title = "Il Sole 1936 | Seafront restaurant in Rapallo";
      metaDescription?.setAttribute("content", "Il Sole 1936 in Rapallo: seafront bar and restaurant with Ligurian seafood cuisine and coastal views.");
      englishCopy.forEach(([selector, text]) => setText(selector, text));
      setInlineText(".hero-actions .button", "Book table");
      setInlineText(".restaurant-menu-preview", "View menu");
      setInlineText(".restaurant-call-link", "Call now");
      setInlineText(".whatsapp-cta", "Call the restaurant");
      setInlineText(".review-cta", "Leave a review on Tripadvisor");
      setInlineText(".contact-actions .button-primary", "Book table");
      setInlineText(".contact-call", "Call now");
      setInlineText(".mobile-cta-reservation", "Book table");
    }
    document.documentElement.lang = nextLanguage;
    languageLinks.forEach((link) => {
      const active = link.dataset.langSwitch === nextLanguage;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    if (updateHash && window.history?.replaceState) window.history.replaceState(null, "", nextLanguage === "en" ? "#en" : "#it");
  }

  languageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setLanguage(link.dataset.langSwitch);
    });
  });

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function syncHeader() {
    header?.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  function setupHeroCarousel() {
    const slides = [...document.querySelectorAll("[data-hero-slide]")];
    if (slides.length <= 1) return;

    let activeIndex = Math.max(slides.findIndex((slide) => slide.classList.contains("is-visible")), 0);
    let timerId = 0;
    let cleanupTimerId = 0;
    const preloadedSources = new Set();

    function addMediaListener(query, listener) {
      if (typeof query.addEventListener === "function") query.addEventListener("change", listener);
      else if (typeof query.addListener === "function") query.addListener(listener);
    }

    function sourceFor(slide) {
      return mobileHeroQuery.matches ? slide.dataset.mobileSrc : slide.dataset.desktopSrc;
    }

    function preloadSlide(index) {
      const slide = slides[index];
      const src = slide ? sourceFor(slide) : "";
      if (!src || preloadedSources.has(src)) return;
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = "low";
      image.src = src;
      preloadedSources.add(src);
    }

    function preloadUpcomingSlides() {
      preloadSlide((activeIndex + 1) % slides.length);
      preloadSlide((activeIndex + 2) % slides.length);
    }

    function clearTimers() {
      window.clearTimeout(timerId);
      window.clearTimeout(cleanupTimerId);
      timerId = 0;
      cleanupTimerId = 0;
    }

    function animateSlide(slide) {
      slide.classList.remove("is-animating");
      void slide.offsetWidth;
      slide.classList.add("is-animating");
    }

    function showStaticFirstSlide() {
      clearTimers();
      activeIndex = 0;
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-visible", index === 0);
        slide.classList.remove("is-leaving", "is-animating");
      });
      preloadUpcomingSlides();
    }

    function scheduleNext(delay) {
      timerId = window.setTimeout(showNextSlide, delay);
    }

    function showNextSlide() {
      const previous = slides[activeIndex];
      const nextIndex = (activeIndex + 1) % slides.length;
      const next = slides[nextIndex];

      previous.classList.remove("is-visible");
      previous.classList.add("is-leaving");
      next.classList.add("is-visible");
      animateSlide(next);

      cleanupTimerId = window.setTimeout(() => {
        previous.classList.remove("is-leaving", "is-animating");
      }, heroSlideFadeMs + 80);

      activeIndex = nextIndex;
      preloadUpcomingSlides();
      scheduleNext(heroSlideHoldMs + heroSlideFadeMs);
    }

    function startCarousel() {
      clearTimers();
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle("is-visible", isActive);
        slide.classList.remove("is-leaving", "is-animating");
      });
      animateSlide(slides[activeIndex]);
      preloadUpcomingSlides();
      scheduleNext(heroSlideHoldMs);
    }

    function syncMotionPreference() {
      if (reduceMotion.matches) showStaticFirstSlide();
      else startCarousel();
    }

    addMediaListener(mobileHeroQuery, () => {
      preloadedSources.clear();
      preloadUpcomingSlides();
    });
    addMediaListener(reduceMotion, syncMotionPreference);
    syncMotionPreference();
  }

  function syncMobileHeroCta() {
    if (!hero || !mobileCta) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    document.body.classList.toggle("hero-mobile-cta", mobileHeroQuery.matches && heroBottom > window.innerHeight * 0.42);
  }

  function syncHero() {
    syncHeader();
    syncMobileHeroCta();
    if (!hero || reduceMotion.matches) return;
    const progress = clamp(window.scrollY / (window.innerHeight * 0.82), 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const ornamentPhase = Math.sin(progress * Math.PI);
    const homeReveal = clamp((window.scrollY - window.innerHeight * 0.26) / (window.innerHeight * 0.52), 0, 1);
    const homeRevealEase = 1 - Math.pow(1 - homeReveal, 3);
    const homeSheen = Math.sin(homeRevealEase * Math.PI);
    root.style.setProperty("--hero-scale", (1 + eased * 0.09).toFixed(3));
    root.style.setProperty("--hero-shift", Math.round(eased * -42) + "px");
    root.style.setProperty("--hero-content-y", Math.round(eased * -54) + "px");
    root.style.setProperty("--hero-content-opacity", String(clamp(1 - progress * 1.45, 0, 1).toFixed(3)));
    root.style.setProperty("--hero-veil", String(clamp(progress * 1.22, 0, 1).toFixed(3)));
    root.style.setProperty("--hero-ornament-opacity", String(clamp(0.18 + ornamentPhase * 0.82, 0, 1).toFixed(3)));
    root.style.setProperty("--hero-ornament-y", Math.round(18 - eased * 38) + "px");
    root.style.setProperty("--hero-ornament-scale", (0.64 + eased * 0.72).toFixed(3));
    root.style.setProperty("--hero-shine-x", Math.round(-72 + eased * 144) + "px");
    root.style.setProperty("--home-reveal-y", Math.round((1 - homeRevealEase) * 26) + "px");
    root.style.setProperty("--home-copy-y", Math.round((1 - homeRevealEase) * 16) + "px");
    root.style.setProperty("--home-reveal-opacity", String((0.88 + homeRevealEase * 0.12).toFixed(3)));
    root.style.setProperty("--home-sheen-opacity", String(clamp(homeSheen * 0.9, 0, 0.9).toFixed(3)));
    root.style.setProperty("--home-sheen-x", Math.round(-130 + homeRevealEase * 260) + "%");
  }

  let ticking = false;
  function requestSync() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      syncHero();
      ticking = false;
    });
  }

  setupHeroCarousel();
  syncHero();
  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    header?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  nav?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle?.setAttribute("aria-expanded", "false");
      header?.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }
  });

  function resetMenuScroll() {
    window.requestAnimationFrame(() => {
      if (menuPages) {
        menuPages.scrollTop = 0;
        menuPages.scrollLeft = 0;
      }
      const dialog = menuModal?.querySelector(".booking-dialog");
      if (dialog) {
        dialog.scrollTop = 0;
        dialog.scrollLeft = 0;
      }
    });
  }

  menuInputs.forEach((input) => input.addEventListener("change", resetMenuScroll));

  function closeModal(modal) {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modals.forEach(closeModal);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    if (modal.id === "menu-modal") resetMenuScroll();
    modal.querySelector(".booking-form input, .booking-form select, .booking-form textarea, .modal-close")?.focus();
  }

  modalTriggers.forEach((trigger) => trigger.addEventListener("click", () => openModal(trigger.dataset.modalOpen)));
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement && event.target.hasAttribute("data-modal-close")) closeModal(modal);
    });
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") modals.forEach((modal) => { if (!modal.hidden) closeModal(modal); });
  });

  carousels.forEach((carousel) => {
    const viewport = carousel.querySelector("[data-carousel-viewport]");
    const track = carousel.querySelector("[data-carousel-track]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const slides = [...carousel.querySelectorAll("[data-carousel-card]")];
    let activeIndex = 0;
    let scrollFrame = 0;
    const activeSlides = () => slides.filter((slide) => window.getComputedStyle(slide).display !== "none");
    const visibleSlides = () => window.matchMedia("(max-width: 720px)").matches ? Number(carousel.dataset.visibleMobile || 1) : Number(carousel.dataset.visibleDesktop || 3);
    function slideWidth() {
      const currentSlides = activeSlides();
      if (!currentSlides[0]) return 0;
      const style = window.getComputedStyle(track || viewport);
      const gap = parseFloat(style.columnGap || style.gap || "0");
      return currentSlides[0].getBoundingClientRect().width + gap;
    }
    const maxIndex = () => Math.max(activeSlides().length - visibleSlides(), 0);
    function normalizeIndex(index) {
      const limit = maxIndex();
      if (index < 0) return limit;
      if (index > limit) return 0;
      return index;
    }
    function goTo(index) {
      if (!viewport || activeSlides().length === 0) return;
      activeIndex = normalizeIndex(index);
      viewport.scrollTo({ left: slideWidth() * activeIndex, behavior: "smooth" });
    }
    function syncFromScroll() {
      const width = slideWidth();
      if (!viewport || !width) return;
      activeIndex = clamp(Math.round(viewport.scrollLeft / width), 0, maxIndex());
    }
    prevButton?.addEventListener("click", (event) => { goTo(activeIndex - 1); event.currentTarget.blur(); });
    nextButton?.addEventListener("click", (event) => { goTo(activeIndex + 1); event.currentTarget.blur(); });
    viewport?.addEventListener("scroll", () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => { syncFromScroll(); scrollFrame = 0; });
    }, { passive: true });
    window.addEventListener("resize", () => goTo(activeIndex));
  });

  function formValue(formData, name) {
    return String(formData.get(name) || "").trim();
  }

  function isMondayDate(value) {
    if (!value) return false;
    const [year, month, day] = value.split("-").map(Number);
    if (!year || !month || !day) return false;
    return new Date(year, month - 1, day).getDay() === 1;
  }

  function updateRestaurantTimeWindow() {
    if (!restaurantOccasion || !restaurantTime) return;
    const occasion = String(restaurantOccasion.value || "").toLowerCase();
    const isLunch = occasion.includes("pranzo");
    const isMonday = isMondayDate(restaurantDate?.value);
    restaurantTime.min = isLunch ? "12:30" : "18:30";
    restaurantTime.max = isLunch ? "14:30" : "22:00";
    restaurantOccasion.setCustomValidity(isMonday ? "Il lunedì il ristorante è chiuso, salvo festivi e ponti. Chiamaci per conferma." : "");
    if (restaurantTime.value && (restaurantTime.value < restaurantTime.min || restaurantTime.value > restaurantTime.max)) restaurantTime.value = "";
  }

  restaurantDate?.addEventListener("change", updateRestaurantTimeWindow);
  restaurantOccasion?.addEventListener("change", updateRestaurantTimeWindow);
  restaurantTime?.addEventListener("input", updateRestaurantTimeWindow);
  updateRestaurantTimeWindow();

  bookingForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if ((form.dataset.bookingKind || "") === "ristorante") updateRestaurantTimeWindow();
      if (!form.reportValidity()) return;
      const formData = new FormData(form);
      const lines = [
        "Ciao Il Sole 1936, vorrei prenotare un tavolo.",
        "Nome: " + formValue(formData, "name"),
        "Telefono: " + formValue(formData, "phone"),
        "Data: " + formValue(formData, "date"),
        "Orario: " + formValue(formData, "time"),
        "Persone: " + formValue(formData, "people"),
        "Occasione: " + (formValue(formData, "occasion") || "-"),
        "Note: " + (formValue(formData, "notes") || "-"),
      ];
      window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
      const modal = form.closest("[data-modal]");
      if (modal) closeModal(modal);
      form.reset();
    });
  });

  setLanguage("it", false);
})();
