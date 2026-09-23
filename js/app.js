// Sunday's Fold — shared site behavior. Every feature here is an
// enhancement: the HTML is complete and readable without this file.
// Customer form data is never written to the URL, the console, or storage.

(function () {
  "use strict";

  // South Bay service-area ZIP codes (Gardena, Lawndale, Hawthorne,
  // Torrance, Redondo Beach, El Segundo).
  var SERVICE_ZIPS = [
    "90247", "90248", "90249",
    "90260",
    "90250",
    "90501", "90502", "90503", "90504", "90505", "90506",
    "90277", "90278",
    "90245"
  ];

  var PHONE_DISPLAY = "(323) 470-3462";

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  // Runs each setup step on its own, so one failure can't take down the rest
  // (or leave anything half-initialized in a hidden state).
  function safely(fn) {
    try { fn(); } catch (err) { /* feature stays in its no-JS state */ }
  }

  /* ---------- Scroll reveal ----------
     Only elements that start well below the fold are ever hidden, and only
     after this script has run. Visibility is decided by scroll position, not
     IntersectionObserver events, so a fast scroll, an End-key jump, or a layout
     change can't skip an element: anything at or above the reveal line is
     shown on the next check. */
  function setupScrollReveal() {
    if (prefersReducedMotion()) return;
    // Deep links (e.g. contact.html#book, index.html#faq) land mid-page;
    // show everything rather than fade content in under the visitor.
    if (window.location.hash) return;

    var viewport = window.innerHeight || document.documentElement.clientHeight;
    var pending = Array.prototype.filter.call(
      document.querySelectorAll(".reveal, .reveal-stagger"),
      function (el) { return el.getBoundingClientRect().top > viewport * 0.9; }
    );
    if (!pending.length) return;

    var ticking = false;
    var failsafe = null;

    function reveal(el) {
      el.classList.remove("reveal-armed");
      el.classList.add("reveal-in");
      window.setTimeout(function () { el.classList.remove("reveal-in"); }, 600);
    }

    function stop() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
      if (failsafe) window.clearInterval(failsafe);
    }

    function revealAll() {
      pending.forEach(reveal);
      pending = [];
      stop();
    }

    function check() {
      ticking = false;
      var line = (window.innerHeight || document.documentElement.clientHeight) * 0.92;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < line) { reveal(el); return false; }
        return true;
      });
      if (!pending.length) stop();
    }

    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(check); }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    window.addEventListener("load", onScroll);
    window.addEventListener("beforeprint", revealAll);
    // Catches layout changes that don't fire a scroll event (images
    // finishing, FAQ panels collapsing, font swap).
    failsafe = window.setInterval(check, 400);

    // Hide only now that every reveal path is wired up.
    pending.forEach(function (el) { el.classList.add("reveal-armed"); });
  }

  /* ---------- Mobile menu (modal dialog) ---------- */
  function setupMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");
    var closeBtn = document.getElementById("mobile-menu-close");
    var backdrop = document.getElementById("mobile-menu-backdrop");
    if (!toggle || !menu) return;

    // The toggle ships hidden: without this script it couldn't open anything.
    toggle.hidden = false;
    var background = document.querySelectorAll("body > header, body > main, body > footer, .skip-link");

    function setBackgroundInert(on) {
      background.forEach(function (el) {
        if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert");
      });
    }

    function openMenu() {
      menu.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-open");
      menu.removeAttribute("aria-hidden");
      toggle.setAttribute("aria-expanded", "true");
      setBackgroundInert(true);
      (closeBtn || menu).focus();
    }

    function closeMenu(returnFocus) {
      if (!menu.classList.contains("is-open")) return;
      menu.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      setBackgroundInert(false);
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", function () { closeMenu(true); });
    if (backdrop) backdrop.addEventListener("click", function () { closeMenu(true); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu(true);
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { closeMenu(false); });
    });
    // If the viewport grows past the mobile breakpoint, don't leave the page inert.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) closeMenu(false);
    });
  }

  function setupNavScroll() {
    var nav = document.getElementById("site-nav");
    if (!nav) return;
    function update() { nav.classList.toggle("is-scrolled", window.scrollY > 24); }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- FAQ accordion ----------
     Every answer is open in the HTML, so the FAQ is fully readable without
     JavaScript. Here we collapse all but the first, without animating. */
  function setupAccordion() {
    var triggers = document.querySelectorAll(".accordion-trigger");
    if (!triggers.length) return;

    function setOpen(trigger, open) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", String(open));
      if (!panel) return;
      panel.setAttribute("data-open", String(open));
      var inner = panel.querySelector(".accordion-panel-inner");
      if (inner) {
        if (open) inner.removeAttribute("inert"); else inner.setAttribute("inert", "");
        inner.setAttribute("aria-hidden", String(!open));
      }
    }

    triggers.forEach(function (trigger, i) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (panel) panel.classList.add("no-anim");
      setOpen(trigger, i === 0);
      trigger.addEventListener("click", function () {
        setOpen(trigger, trigger.getAttribute("aria-expanded") !== "true");
      });
    });
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        document.querySelectorAll(".accordion-panel.no-anim").forEach(function (p) { p.classList.remove("no-anim"); });
      });
    });
  }

  /* ---------- ZIP checker ----------
     The checker ships hidden (the city list is the no-JS fallback) and uses
     no network or URL -- the check happens entirely in the browser. */
  function setupZipCheckers() {
    document.querySelectorAll("[data-zip-checker]").forEach(function (wrap) {
      var form = wrap.querySelector("form");
      var input = wrap.querySelector("input");
      var result = wrap.querySelector(".zip-result");
      if (!form || !input || !result) return;
      wrap.hidden = false;

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var zip = (input.value || "").trim();
        if (!/^\d{5}$/.test(zip)) {
          result.textContent = "Enter a 5-digit ZIP code.";
          result.setAttribute("data-state", "out");
          input.setAttribute("aria-invalid", "true");
          input.focus();
          return;
        }
        input.removeAttribute("aria-invalid");
        if (SERVICE_ZIPS.indexOf(zip) !== -1) {
          result.innerHTML = "Good news — we pick up in your neighborhood. <a href=\"contact.html#book\">Book pickup</a>";
          result.setAttribute("data-state", "in");
        } else {
          result.innerHTML = "We're not in your neighborhood yet. Questions? Call or text <a href=\"tel:+13234703462\">" + PHONE_DISPLAY + "</a>.";
          result.setAttribute("data-state", "out");
        }
      });
    });
  }

  function setupCopyrightYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (el) { el.textContent = year; });
  }

  /* ---------- Plan carried over from a pricing card (?plan=<id>) ----------
     The <select> stays the single source of truth; the summary box just
     mirrors it, and "Change" moves focus to the select. */
  function setupPlanCarryover() {
    var select = document.getElementById("booking-service");
    var box = document.getElementById("plan-carryover");
    var nameEl = document.getElementById("plan-carryover-name");
    var changeBtn = document.getElementById("plan-carryover-change");
    if (!select || !box || !nameEl) return;

    function render() {
      var opt = select.options[select.selectedIndex];
      if (!opt || !opt.value) { box.hidden = true; return; }
      nameEl.textContent = opt.getAttribute("data-name") + " ";
      var price = document.createElement("span");
      price.className = "plan-carryover-price";
      price.textContent = opt.getAttribute("data-price");
      nameEl.appendChild(price);
      box.hidden = false;
    }

    var plan = new URLSearchParams(window.location.search).get("plan");
    if (plan) {
      var match = Array.prototype.filter.call(select.options, function (o) { return o.value === plan; })[0];
      if (match) select.value = plan;
    }
    render();
    select.addEventListener("change", render);
    if (changeBtn) changeBtn.addEventListener("click", function () { select.focus(); });
  }

  /* ---------- Forms ---------- */

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function digitsOnly(s) { return (s || "").replace(/\D/g, ""); }
  function isUSPhone(s) {
    var d = digitsOnly(s);
    return d.length === 10 || (d.length === 11 && d.charAt(0) === "1");
  }
  function todayISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  // A rule: { field: <input|select|textarea|first radio>, group: [radios]?, message, test }
  function markField(rule, valid) {
    var targets = rule.group || [rule.field];
    targets.forEach(function (el) {
      if (valid) el.removeAttribute("aria-invalid"); else el.setAttribute("aria-invalid", "true");
    });
    var wrap = rule.field.closest(".field-group");
    if (wrap) wrap.classList.toggle("has-error", !valid);
  }

  function renderErrorSummary(summary, failures) {
    if (!summary) return;
    var list = summary.querySelector("ul");
    list.innerHTML = "";
    failures.forEach(function (rule) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + rule.field.id;
      a.textContent = rule.message;
      a.addEventListener("click", function (e) {
        e.preventDefault();
        rule.field.focus();
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    summary.hidden = failures.length === 0;
  }

  function wireLiveClearing(rules) {
    rules.forEach(function (rule) {
      (rule.group || [rule.field]).forEach(function (el) {
        var evt = (el.type === "checkbox" || el.type === "radio" || el.tagName === "SELECT") ? "change" : "input";
        el.addEventListener(evt, function () {
          var wrap = rule.field.closest(".field-group");
          if (wrap && wrap.classList.contains("has-error") && rule.test()) markField(rule, true);
        });
      });
    });
  }

  // Submits a form to its configured endpoint (the form's action attribute)
  // with POST via fetch. With no endpoint configured the form stays in
  // "not open yet" mode: the submit button remains disabled and nothing is
  // sent anywhere.
  function setupEndpointForm(opts) {
    var form = document.getElementById(opts.formId);
    if (!form) return;
    var endpoint = (form.getAttribute("action") || "").trim();
    var submitBtn = form.querySelector('button[type="submit"]');
    var summary = opts.summaryId ? document.getElementById(opts.summaryId) : null;
    var alertBox = form.querySelector(".form-alert");
    var rules = opts.rules();

    wireLiveClearing(rules);

    if (!endpoint) {
      // No endpoint configured: keep submission impossible.
      if (submitBtn) submitBtn.disabled = true;
      form.addEventListener("submit", function (e) { e.preventDefault(); });
      return;
    }

    var notice = document.getElementById(opts.unavailableId);
    if (notice) notice.remove();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-describedby");
    }

    var inFlight = false;
    var idleLabel = submitBtn ? submitBtn.textContent : "";

    function setBusy(busy) {
      inFlight = busy;
      form.setAttribute("aria-busy", String(busy));
      if (submitBtn) {
        submitBtn.disabled = busy;
        submitBtn.textContent = busy ? opts.busyLabel : idleLabel;
      }
    }

    function showFailure() {
      if (alertBox) {
        alertBox.setAttribute("role", "alert");
        alertBox.textContent = opts.failureMessage;
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (inFlight) return; // duplicate-submission guard
      if (alertBox) alertBox.textContent = "";

      var failures = rules.filter(function (rule) {
        var ok = rule.test();
        markField(rule, ok);
        return !ok;
      });
      if (failures.length) {
        renderErrorSummary(summary, failures);
        if (summary) summary.focus(); else failures[0].field.focus();
        return;
      }
      renderErrorSummary(summary, []);

      var data = new FormData(form);
      setBusy(true);

      var controller = "AbortController" in window ? new AbortController() : null;
      var timer = controller ? window.setTimeout(function () { controller.abort(); }, 15000) : null;

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: controller ? controller.signal : undefined
      }).then(function (res) {
        if (timer) window.clearTimeout(timer);
        if (!res.ok) throw new Error("bad status");
        return res.json().catch(function () { return {}; });
      }).then(function (json) {
        opts.onSuccess(form, data, json || {});
      }).catch(function () {
        if (timer) window.clearTimeout(timer);
        setBusy(false);
        showFailure();
      });
    });
  }

  function textOf(el) { return el ? el.textContent.trim() : ""; }

  function setupBookingForm() {
    var form = document.getElementById("booking-form");
    if (!form) return;
    var $ = function (id) { return document.getElementById(id); };
    var date = $("booking-date");
    if (date) date.min = todayISO();
    var windowRadios = Array.prototype.slice.call(form.querySelectorAll('input[name="window"]'));

    setupEndpointForm({
      formId: "booking-form",
      summaryId: "booking-errors",
      unavailableId: "booking-unavailable",
      busyLabel: "Sending…",
      failureMessage: "We couldn't send your request, so nothing was submitted. Please try again, or call or text " + PHONE_DISPLAY + ".",
      rules: function () {
        return [
          { field: $("booking-name"), message: "Enter your full name", test: function () { return $("booking-name").value.trim().length > 1; } },
          { field: $("booking-phone"), message: "Enter a 10-digit mobile number", test: function () { return isUSPhone($("booking-phone").value); } },
          { field: $("booking-email"), message: "Enter a valid email address", test: function () { return EMAIL_RE.test($("booking-email").value.trim()); } },
          { field: $("booking-service"), message: "Choose a service", test: function () { return $("booking-service").value !== ""; } },
          { field: $("booking-bags"), message: "Estimate how many bags (1 to 20)", test: function () { var n = Number($("booking-bags").value); return n >= 1 && n <= 20 && Math.floor(n) === n; } },
          { field: $("booking-address"), message: "Enter your pickup address", test: function () { return $("booking-address").value.trim().length > 4; } },
          { field: $("booking-zip"), message: "Enter a 5-digit ZIP code", test: function () { return /^\d{5}$/.test($("booking-zip").value.trim()); } },
          { field: date, message: "Choose a pickup date that isn't in the past", test: function () { return date.value !== "" && date.value >= todayISO(); } },
          { field: windowRadios[0], group: windowRadios, message: "Choose a pickup window", test: function () { return windowRadios.some(function (r) { return r.checked; }); } },
          { field: $("booking-consent"), message: "Confirm you agree to the Terms of Service and Service Policy", test: function () { return $("booking-consent").checked; } }
        ];
      },
      onSuccess: function (formEl, data, json) {
        var service = $("booking-service");
        var serviceOpt = service.options[service.selectedIndex];
        var checkedWindow = windowRadios.filter(function (r) { return r.checked; })[0];
        var rows = [
          ["Name", data.get("name")],
          ["Phone", data.get("phone")],
          ["Email", data.get("email")],
          ["Service", serviceOpt ? textOf(serviceOpt) : ""],
          ["Estimated bags", data.get("bags")],
          ["Pickup address", data.get("address")],
          ["ZIP code", data.get("zip")],
          ["Requested date", data.get("date")],
          ["Requested window", checkedWindow ? checkedWindow.value : ""],
          ["Preferences", data.get("preferences") || "None"]
        ];
        var list = $("booking-success-list");
        list.innerHTML = "";
        rows.forEach(function (r) {
          var row = document.createElement("div");
          row.className = "booking-summary-row";
          var dt = document.createElement("dt");
          dt.textContent = r[0];
          var dd = document.createElement("dd");
          dd.textContent = String(r[1] || "");
          row.appendChild(dt);
          row.appendChild(dd);
          list.appendChild(row);
        });
        // Show a reference only if the backend actually generated one.
        var refWrap = $("booking-success-ref");
        if (json && typeof json.reference === "string" && json.reference) {
          $("booking-success-ref-value").textContent = json.reference;
          refWrap.hidden = false;
        }
        var carry = $("plan-carryover");
        if (carry) carry.hidden = true;
        formEl.hidden = true;
        var success = $("booking-success");
        success.hidden = false;
        success.focus();
      }
    });
  }

  function setupContactForm() {
    var $ = function (id) { return document.getElementById(id); };
    setupEndpointForm({
      formId: "contact-form",
      summaryId: "contact-errors",
      unavailableId: "contact-unavailable",
      busyLabel: "Sending…",
      failureMessage: "We couldn't send your message, so nothing was submitted. Please try again, or email ccc@sundaysfold.com.",
      rules: function () {
        return [
          { field: $("contact-name"), message: "Enter your name", test: function () { return $("contact-name").value.trim().length > 1; } },
          { field: $("contact-email"), message: "Enter a valid email address", test: function () { return EMAIL_RE.test($("contact-email").value.trim()); } },
          { field: $("contact-message"), message: "Enter a message", test: function () { return $("contact-message").value.trim().length > 0; } }
        ];
      },
      onSuccess: function (formEl) {
        formEl.hidden = true;
        var success = $("contact-success");
        success.hidden = false;
        success.focus();
      }
    });
  }

  onReady(function () {
    // Mobile menu and accordion first: they restore no-JS-hidden controls.
    safely(setupMobileNav);
    safely(setupAccordion);
    safely(setupZipCheckers);
    safely(setupNavScroll);
    safely(setupCopyrightYear);
    safely(setupPlanCarryover);
    safely(setupBookingForm);
    safely(setupContactForm);
    // Last, so no earlier failure can leave content armed-but-unrevealed.
    safely(setupScrollReveal);
  });
})();
