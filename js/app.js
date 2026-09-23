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
        var nowOpen = !isOpen;
        trigger.setAttribute("aria-expanded", String(nowOpen));
        if (panel) {
          panel.setAttribute("data-open", String(nowOpen));
          var inner = panel.querySelector(".accordion-panel-inner");
          if (inner) inner.setAttribute("aria-hidden", String(!nowOpen));
        }
      });
    });
    // Match aria-hidden to each panel's initial data-open state on load.
    document.querySelectorAll(".accordion-panel").forEach(function (panel) {
      var inner = panel.querySelector(".accordion-panel-inner");
      if (inner) inner.setAttribute("aria-hidden", String(panel.getAttribute("data-open") !== "true"));
    });
  }

  function setupCopyrightYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (el) { el.textContent = year; });
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

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_RE = /^[\d\s()+-]{7,}$/;

  // Marks a single field valid/invalid: toggles aria-invalid on the input
  // and .has-error on its wrapping .field-group, which is what shows/hides
  // the field's .field-error message (see css/site.css).
  function setFieldValid(input, isValid) {
    var group = input.closest(".field-group") || input.closest(".consent-row");
    input.setAttribute("aria-invalid", String(!isValid));
    if (group) group.classList.toggle("has-error", !isValid);
    return isValid;
  }

  // Runs each rule in order, marks every field's state, focuses the first
  // invalid field, and returns whether the whole form passed.
  function validateFields(rules) {
    var firstInvalid = null;
    var valid = true;
    rules.forEach(function (rule) {
      var ok = rule.test();
      setFieldValid(rule.input, ok);
      if (!ok) {
        valid = false;
        if (!firstInvalid) firstInvalid = rule.input;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  // Reads ?plan=<id> from the URL (set by the pricing-card "Book pickup"
  // links on the homepage) and pre-selects + summarizes that plan on the
  // booking form, without hiding the actual <select> -- the "Change"
  // button just refocuses it, so the select stays the single source of
  // truth for which plan is selected.
  function setupPlanCarryover() {
    var select = document.getElementById("booking-service");
    var box = document.getElementById("plan-carryover");
    var nameEl = document.getElementById("plan-carryover-name");
    var changeBtn = document.getElementById("plan-carryover-change");
    if (!select || !box || !nameEl) return;

    function renderFromSelect() {
      var opt = select.options[select.selectedIndex];
      if (!opt || !opt.value) {
        box.hidden = true;
        return;
      }
      var price = opt.getAttribute("data-price");
      nameEl.textContent = opt.getAttribute("data-name") + (price ? "" : "");
      if (price) {
        nameEl.innerHTML = opt.getAttribute("data-name") + ' <span class="plan-carryover-price">' + price + "</span>";
      }
      box.hidden = false;
    }

    var params = new URLSearchParams(window.location.search);
    var plan = params.get("plan");
    if (plan && select.querySelector('option[value="' + plan + '"]')) {
      select.value = plan;
      renderFromSelect();
    }

    select.addEventListener("change", renderFromSelect);
    if (changeBtn) {
      changeBtn.addEventListener("click", function () {
        select.focus();
      });
    }
  }

  // No backend on this static site: the booking and contact forms hand the
  // filled-in fields to the visitor's email client via a mailto: link,
  // instead of failing silently -- see the visible .dev-note in the
  // booking form for the explicit "no backend yet" disclosure. A brief
  // checkmark confirmation acknowledges the email app opened; it never
  // claims the booking itself is confirmed.
  function setupMailtoForm(formId, buildSubjectAndBody, opts) {
    var form = document.getElementById(formId);
    if (!form) return;
    opts = opts || {};
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (opts.validate && !opts.validate()) {
        var status = form.querySelector(".form-status");
        if (status) {
          status.classList.remove("form-status--confirm");
          status.textContent = "Please fix the highlighted field(s) below.";
          status.setAttribute("data-state", "out");
        }
        return;
      }
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
      if (opts.onValid) opts.onValid(values);
      window.location.href = mailto;
    });
  }

  function setupBookingForm() {
    var form = document.getElementById("booking-form");
    if (!form) return;

    var name = document.getElementById("booking-name");
    var phone = document.getElementById("booking-phone");
    var email = document.getElementById("booking-email");
    var service = document.getElementById("booking-service");
    var bags = document.getElementById("booking-bags");
    var address = document.getElementById("booking-address");
    var zip = document.getElementById("booking-zip");
    var date = document.getElementById("booking-date");
    var consent = document.getElementById("booking-consent");

    var rules = [
      { input: name, test: function () { return name.value.trim().length > 0; } },
      { input: phone, test: function () { return PHONE_RE.test(phone.value.trim()); } },
      { input: email, test: function () { return EMAIL_RE.test(email.value.trim()); } },
      { input: service, test: function () { return service.value !== ""; } },
      { input: bags, test: function () { return Number(bags.value) >= 1; } },
      { input: address, test: function () { return address.value.trim().length > 0; } },
      { input: zip, test: function () { return /^\d{5}$/.test(zip.value.trim()); } },
      { input: date, test: function () { return date.value !== ""; } },
      { input: consent, test: function () { return consent.checked; } }
    ];

    function validate() { return validateFields(rules); }

    // Once a field has been flagged invalid, clear that one field's error
    // as soon as it becomes valid again, rather than making the visitor
    // re-submit the whole form to see it clear.
    rules.forEach(function (rule) {
      var evt = rule.input.type === "checkbox" || rule.input.tagName === "SELECT" ? "change" : "input";
      rule.input.addEventListener(evt, function () {
        var group = rule.input.closest(".field-group") || rule.input.closest(".consent-row");
        if (group && group.classList.contains("has-error") && rule.test()) {
          setFieldValid(rule.input, true);
        }
      });
    });

    function renderSummary(v) {
      var slot = (document.querySelector("#booking-form .chip[aria-pressed='true']") || {}).textContent || "no time selected";
      var serviceOpt = service.options[service.selectedIndex];
      var serviceLabel = serviceOpt && serviceOpt.value ? serviceOpt.textContent : "Not selected";
      var rows = [
        ["Name", v.name],
        ["Phone", v.phone],
        ["Email", v.email],
        ["Service", serviceLabel],
        ["Estimated bags", v.bags],
        ["Address", v.address],
        ["Zip", v.zip],
        ["Pickup date", v.date],
        ["Time window", slot.trim()],
        ["Preferences", v.preferences || "None given"]
      ];
      var list = document.getElementById("booking-summary-list");
      var summary = document.getElementById("booking-summary");
      if (!list || !summary) return;
      list.innerHTML = rows.map(function (r) {
        return "<div class=\"booking-summary-row\"><dt>" + r[0] + "</dt><dd>" + escapeHtml(String(r[1])) + "</dd></div>";
      }).join("");
      summary.classList.add("is-visible");
    }

    function escapeHtml(s) {
      var div = document.createElement("div");
      div.textContent = s;
      return div.innerHTML;
    }

    setupMailtoForm("booking-form", function (v) {
      var slot = (document.querySelector("#booking-form .chip[aria-pressed='true']") || {}).textContent || "no time selected";
      var serviceOpt = service.options[service.selectedIndex];
      var serviceLabel = serviceOpt && serviceOpt.value ? serviceOpt.textContent : "Not selected";
      return {
        subject: "Pickup request — " + (v.name || "no name given"),
        body:
          "Name: " + (v.name || "") + "\n" +
          "Phone: " + (v.phone || "") + "\n" +
          "Email: " + (v.email || "") + "\n" +
          "Service: " + serviceLabel + "\n" +
          "Estimated bags: " + (v.bags || "") + "\n" +
          "Address: " + (v.address || "") + "\n" +
          "Zip: " + (v.zip || "") + "\n" +
          "Preferred date: " + (v.date || "") + "\n" +
          "Preferred time: " + slot.trim() + "\n" +
          "Preferences / notes: " + (v.preferences || "none") + "\n"
      };
    }, { validate: validate, onValid: renderSummary });
  }

  function setupContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var name = document.getElementById("contact-name");
    var email = document.getElementById("contact-email");
    var message = document.getElementById("contact-message");

    var rules = [
      { input: name, test: function () { return name.value.trim().length > 0; } },
      { input: email, test: function () { return EMAIL_RE.test(email.value.trim()); } },
      { input: message, test: function () { return message.value.trim().length > 0; } }
    ];

    function validate() { return validateFields(rules); }

    rules.forEach(function (rule) {
      rule.input.addEventListener("input", function () {
        var group = rule.input.closest(".field-group");
        if (group && group.classList.contains("has-error") && rule.test()) {
          setFieldValid(rule.input, true);
        }
      });
    });

    setupMailtoForm("contact-form", function (v) {
      return {
        subject: "Message from " + (v.name || "the website"),
        body:
          "From: " + (v.name || "") + " (" + (v.email || "") + ")\n\n" +
          (v.message || "")
      };
    }, { validate: validate });
  }

  onReady(function () {
    setupScrollReveal();
    setupNavScroll();
    setupMobileNav();
    setupAccordion();
    setupTimeSlotChips();
    setupZipCheckers();
    setupNotifyForms();
    setupCopyrightYear();
    setupPlanCarryover();
    setupBookingForm();
    setupContactForm();
  });
})();
