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

  function setupMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = !menu.hasAttribute("hidden");
      if (isOpen) {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      } else {
        menu.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
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

  // No backend on this static site: the booking and contact forms hand
  // the filled-in fields to the visitor's email client via a mailto:
  // link addressed to ccc@sundaysfold.com, instead of failing silently.
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
        status.textContent = "Opening your email app to send this to us. Prefer to call? (323) 470-3462.";
        status.setAttribute("data-state", "ok");
      }
      window.location.href = mailto;
    });
  }

  onReady(function () {
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
