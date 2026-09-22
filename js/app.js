// Sunday's Fold — shared site behavior: mobile nav, FAQ accordion,
// zip code checker, time-slot chips, and the no-backend contact/booking forms.

(function () {
  "use strict";

  // South Bay service-area zip codes (Gardena, Lawndale, Hawthorne,
  // Torrance, Redondo Beach, El Segundo).
  var SERVICE_ZIPS = [
    "90247", "90248", "90249", // Gardena
    "90260", // Lawndale
    "90250", // Hawthorne
    "90501", "90502", "90503", "90504", "90505", "90506", // Torrance
    "90277", "90278", // Redondo Beach
    "90245" // El Segundo
  ];

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  // Fades sections, card grids and images up into place as they scroll into
  // view. The .js class (set synchronously in <head>, before paint) is what
  // lets css/site.css hide .reveal elements at all -- so a browser that never
  // runs this script also never hides content waiting on it.
  function setupScrollReveal() {
    var targets = document.querySelectorAll(".reveal, .reveal-slide, .reveal-stagger");
    if (!targets.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // Sliding drawer: the menu stays in the DOM (off-screen) so the slide-in
  // can actually animate, with a tap-out backdrop, an explicit close
  // button, and Escape, alongside the hamburger that opens it.
  function setupMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");
    var closeBtn = document.getElementById("mobile-menu-close");
    var backdrop = document.getElementById("mobile-menu-backdrop");
    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      menu.removeAttribute("aria-hidden");
    }
    function closeMenu() {
      menu.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    }

    toggle.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) closeMenu(); else openMenu();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  // Nav picks up a solid background + shadow once the page scrolls past
  // the hero, so it reads as anchored rather than floating.
  function setupNavScroll() {
    var nav = document.getElementById("site-nav");
    if (!nav) return;
    function update() {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupAccordion() {
    var triggers = document.querySelectorAll(".accordion-trigger");
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        var isOpen = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!isOpen));
        if (panel) panel.setAttribute("data-open", String(!isOpen));
      });
    });
  }

  function setupTimeSlotChips() {
    document.querySelectorAll(".time-slot-group").forEach(function (group) {
      var chips = group.querySelectorAll(".chip");
      chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
          chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
          chip.setAttribute("aria-pressed", "true");
        });
      });
    });
  }

  function setupZipCheckers() {
    document.querySelectorAll("[data-zip-checker]").forEach(function (wrap) {
      var form = wrap.querySelector("form");
      var input = wrap.querySelector("input[type='text'], input[type='tel'], input[inputmode='numeric']");
      var result = wrap.querySelector(".zip-result");
      var notifyForm = wrap.querySelector(".zip-result-form");
      if (!form || !input || !result) return;

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var zip = (input.value || "").trim().slice(0, 5);
        if (!/^\d{5}$/.test(zip)) {
          result.textContent = "That doesn't look like a zip code. Try again?";
          result.setAttribute("data-state", "out");
          if (notifyForm) notifyForm.classList.remove("is-visible");
          return;
        }
        if (SERVICE_ZIPS.indexOf(zip) !== -1) {
          result.textContent = "Good news — we pick up in your neighborhood.";
          result.setAttribute("data-state", "in");
          if (notifyForm) notifyForm.classList.remove("is-visible");
        } else {
          result.textContent = "We're not in your neighborhood yet. Leave your email and we'll let you know when we are.";
          result.setAttribute("data-state", "out");
          if (notifyForm) notifyForm.classList.add("is-visible");
        }
      });
    });
  }

  function setupNotifyForms() {
    document.querySelectorAll(".zip-result-form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = form.querySelector(".form-status");
        if (status) {
          status.textContent = "Thanks — we'll email you the moment we're in your neighborhood.";
          status.setAttribute("data-state", "ok");
        }
        form.reset();
      });
    });
  }

  var CHECK_ICON =
    '<svg class="confirm-check" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>' +
    '<path class="confirm-check-mark" d="M7.5 12.5l3 3 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  // No backend on this static site: the booking and contact forms hand
  // the filled-in fields to the visitor's email client via a mailto:
  // link addressed to ccc@sundaysfold.com, instead of failing silently.
  // A brief checkmark confirmation stands in for a real submit response.
  function setupMailtoForm(formId, buildSubjectAndBody) {
    var form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var values = {};
      data.forEach(function (value, key) { values[key] = value; });
      var parts = buildSubjectAndBody(values);
      var mailto = "mailto:ccc@sundaysfold.com?subject=" + encodeURIComponent(parts.subject) + "&body=" + encodeURIComponent(parts.body);
      var status = form.querySelector(".form-status");
      if (status) {
        status.classList.add("form-status--confirm");
        status.innerHTML = CHECK_ICON + "<span>Opening your email app to send this to us. Prefer to call? (323) 470-3462.</span>";
        status.setAttribute("data-state", "ok");
      }
      window.location.href = mailto;
    });
  }

  onReady(function () {
    setupScrollReveal();
    setupNavScroll();
    setupMobileNav();
    setupAccordion();
    setupTimeSlotChips();
    setupZipCheckers();
    setupNotifyForms();

    setupMailtoForm("booking-form", function (v) {
      var slot = (document.querySelector("#booking-form .chip[aria-pressed='true']") || {}).textContent || "no time selected";
      return {
        subject: "Pickup request — " + (v.address || "no address given"),
        body:
          "Address: " + (v.address || "") + "\n" +
          "Zip: " + (v.zip || "") + "\n" +
          "Preferred date: " + (v.date || "") + "\n" +
          "Preferred time: " + slot.trim() + "\n" +
          "Preferences / notes: " + (v.preferences || "none") + "\n"
      };
    });

    setupMailtoForm("contact-form", function (v) {
      return {
        subject: "Message from " + (v.name || "the website"),
        body:
          "From: " + (v.name || "") + " (" + (v.email || "") + ")\n\n" +
          (v.message || "")
      };
    });
  });
})();
