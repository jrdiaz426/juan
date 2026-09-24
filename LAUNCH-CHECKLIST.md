# Sunday's Fold — Launch Checklist (internal)

**Not part of the website.** The deploy workflow (`.github/workflows/pages.yml`) copies an explicit list of public files, and this file is not on it. Heads-up: the GitHub repository `jrdiaz426/juan` is **public**, so anyone browsing the repo on GitHub can still read this file. If that matters, keep this checklist somewhere private or make the repository private (GitHub Pages on a private repo needs a paid plan).

Last updated: 2026-09-23

## Current status: NOT READY to publish as a live booking site

The site is honest in its current state. The booking and contact forms can't submit (online booking is shown to customers as "not open yet"), and nothing unverified is presented as policy. It can't take real bookings until the decisions in section A and the setup in section B are done.

---

## A. Owner decisions required

Each item: **decision needed → pages affected → what the site says now → options → risk if published without a decision.**

### A1. All pricing (highest priority)

- **Decision:** Confirm every price and plan. **None of the current prices came from you.** They don't appear in DESIGN.md or in any message you sent; they were written as placeholder content when the site was first built, and have been carried forward since.
- **Pages:** `index.html` (Pricing section, FAQ "How much does it cost?"), `contact.html` (Service dropdown).
- **Currently says:** Wash & Fold **$2.25 / lb**, 10 lb minimum per pickup. Family Bag **$39 / bag**, up to 20 lbs. Both say "Free pickup & delivery" and "24-hour turnaround".
- **Options:** (a) confirm as-is; (b) supply real prices and plan names; (c) show "Pricing confirmed when you book" instead of numbers until decided.
- **Risk:** Advertised prices may be treated as an offer. Customers booking at a price you didn't intend is a trust and possibly legal problem.

### A2. Weekly Subscription ($89/mo) — **removed from the site**

- **Decision:** Keep, reprice, or drop the plan.
- **Pages:** Previously `index.html` pricing card and FAQ, and `contact.html` Service dropdown. All removed. Old `?plan=weekly-subscription` links now fall back to "Choose a plan".
- **Previous language:** "$89 / mo — One pickup every week, up to 25 lbs · Priority scheduling · Pause or cancel any time."
- **The numbers:** up to 25 lb × 4–5 weekly pickups = 100–125 lb per month for $89, versus $225–$281.25 at the $2.25/lb rate. That's a 60–68% discount. "Priority scheduling" and "Pause or cancel any time" were never defined either.
- **Options:** (a) reprice (for example, a lower weekly weight cap or a higher price); (b) cap it at a monthly weight; (c) leave it off until the service is running.
- **Risk:** Subscribers could consume far more service than the plan pays for.

### A3. Wash & Fold minimum order

- **Decision:** Is there a minimum, and how much?
- **Pages:** `index.html` Wash & Fold card; `service-policy.html` (not mentioned there yet).
- **Currently says:** "10 lb minimum per pickup". (An earlier "no minimum order" line that contradicted it was removed.)
- **Options:** confirm 10 lb; set a different minimum; set a minimum *charge* instead of a weight; no minimum.
- **Risk:** A published minimum you don't enforce, or an enforced minimum you didn't publish, both cause billing disputes.

### A4. Free pickup & delivery

- **Decision:** Is pickup and delivery always free? Is there a delivery-fee threshold or a distance limit within the six cities?
- **Pages:** `index.html` pricing cards.
- **Currently says:** "Free pickup & delivery" on both plans. (It was also in the trust bar and the "Why us" section; removed from both pending this decision.)
- **Risk:** A "free" claim you later charge for is a common consumer-protection complaint.

### A5. Cancellation, rescheduling, and refunds

- **Decision:** Cancellation cutoff (for example, any time before pickup, or X hours before), rescheduling rules, and when/how refunds happen.
- **Pages:** `service-policy.html`, `terms.html`, pricing cards.
- **Removed language:** "Cancel a pickup any time before it's picked up" (pricing lead, old policies section) and "no charge".
- **Risk:** Customers will ask on day one. Without a stated policy, every cancellation is a negotiation.

### A6. Payment timing and accepted methods

- **Decision:** When payment is collected (at booking, pickup, or delivery), which methods you accept, and how weight-based orders are billed (weighed at your facility?).
- **Pages:** `contact.html` ("What happens next" step 3 currently says only "No payment is taken on this website." That's true today, but it isn't a policy), `service-policy.html`, `terms.html`.
- **Risk:** Customers can't budget or trust the process, and uncollected payments.

#### A6a. Paying through Square (researched 2026-09-24, not built yet)

- **The site can't hold secrets.** GitHub Pages serves static files only: no server, no place for a Square access token, no endpoint that can receive Square webhooks.
- **Wash & Fold is priced by weight,** so the total isn't known until after pickup. A fixed Square payment link can't charge it. Recommended: your sister sends a **Square Invoice** from the Square Dashboard after weighing. No website code, no secrets, and Square itself records whether it was paid.
- **Family Bag is a flat price per bag.** It can use the same invoice flow, or (only if you want payment at booking) a **Square payment link** created in the Dashboard. For the link route the site would show "bags × price = total" before sending the customer to Square, plus a return page that never claims the order is paid. Open questions for the link route: whether a Square link can let customers pick a quantity (Square's docs are unclear), and refunds when a requested pickup can't be confirmed.
- **Automatic per-order links** (the Checkout API) would need a separate server holding the token as a server-side secret, plus a webhook endpoint that verifies the `x-square-hmacsha256-signature` header. Not recommended at this stage.
- **Blocked on:** confirmed prices (A1–A4), payment timing (A6), and tax treatment (her accountant).

### A7. Order separation

- **Decision:** How each household's laundry is kept separate (one machine per order? bag tags?).
- **Pages:** would go in `service-policy.html`.
- **Currently says:** nothing (a "needs owner input" placeholder was removed from public pages).
- **Risk:** This is the #1 trust question for laundry services. Without an answer, careful customers won't book.

### A8. Lost, stained, or damaged items, and liability limits

- **Decision:** What you do if something is lost, damaged, or comes back stained; any per-item or per-order liability cap; items you won't accept (dry-clean-only, leather, etc.); the claim window.
- **Pages:** `service-policy.html`, `terms.html`, FAQ.
- **Removed language:** FAQ "Call or text us and we'll make it right." ("make it right" is an open-ended guarantee), plus "honest about delays or damage" style copy.
- **Recommendation:** Have a lawyer review the liability wording (see A16).
- **Risk:** Uncapped implied liability.

### A9. Detergent

- **Decision:** What detergent you use, and whether alternatives are offered (free or paid).
- **Removed language:** "Eco-friendly detergent: Plant-based, dye-free options available at no extra cost." Not sourced from you.
- **Risk:** "Plant-based" and "dye-free" are specific product claims. They need to be literally true of the product.

### A10. Hanging garments / hangers

- **Decision:** Do you offer hang-drying or returning items on hangers? At what price?
- **Removed language:** "extra hangers" as an example wash preference.
- **Risk:** Customers requesting a service you don't offer.

### A11. Pickup windows, days, and operating hours

- **Decision:** Which days and time windows you pick up and deliver.
- **Pages:** `contact.html` booking form (windows: 8–10 am, 10 am–12 pm, 12–2 pm, 2–4 pm; these were placeholders), How-it-works step 1 ("two-hour window").
- **Risk:** Customers requesting windows you can't cover. (Low while booking is closed, but must be fixed before enabling the form.)

### A12. Customer response time

- **Decision:** How quickly you respond to booking requests and messages, and during which hours.
- **Removed language:** "we're quick to reply" (contact page).
- **Pages:** booking success message would state it; `contact.html` hero.

### A13. Customer updates

- **Decision:** How customers hear about their order (text? email?), and at which points (pickup confirmed, on the way, delayed).
- **Removed language:** "We'll text you when we're on the way" (How it works), "We text you when it's picked up and again when it's on its way back" and "If we're running late, we'll let you know before you have to ask" (FAQ).

### A14. Service ZIP codes

- **Decision:** Confirm the exact ZIP list, including partial or unincorporated areas.
- **Pages:** the ZIP checker on `index.html` (list in `js/app.js`, `SERVICE_ZIPS`).
- **Currently:** 90247, 90248, 90249 (Gardena) · 90260 (Lawndale) · 90250 (Hawthorne) · 90501–90506 (Torrance) · 90277, 90278 (Redondo Beach) · 90245 (El Segundo). This list was compiled from the six city names, not supplied by you.
- **Also:** DESIGN.md's out-of-area copy ("Leave your email and we'll let you know when we are") needs a working email capture (see B3). Until then the checker shows "We're not in your neighborhood yet" plus the phone number.

### A15. Domain

- **Decision:** When will `sundaysfold.com` point at this site?
- **Now:** The site lives at `https://jrdiaz426.github.io/juan/`. Canonical URLs, Open Graph URLs, `sitemap.xml`, `robots.txt`, and the `404.html` base path all use that address, because that's where the pages actually load. The LocalBusiness structured data uses `https://sundaysfold.com`, per DESIGN.md section 0.
- **When the domain is connected:** add a `CNAME` file, then replace `https://jrdiaz426.github.io/juan/` everywhere with `https://sundaysfold.com/`, and change `<base href="/juan/">` in `404.html` to `/`.
- **Note:** crawlers only read `robots.txt` at a domain's root. On the project URL it sits at `/juan/robots.txt`, so it has no effect until the custom domain is connected. The sitemap can still be submitted directly in Google Search Console.

### A16. Legal pages (professional review recommended)

The three pages now contain **only statements that are currently true**. They're kept `noindex` and out of the sitemap until approved. Each needs owner-approved text plus an effective date before booking opens:

- **Privacy Policy (`privacy.html`):** how customer information from bookings is used, who it's shared with (form provider, payment processor, SMS provider), retention period, how to request deletion or correction, California-specific rights (CCPA/CPRA applicability depends on business size, so a lawyer should confirm).
- **Terms of Service (`terms.html`):** booking/confirmation terms, pricing and payment terms, cancellation (A5), liability limits (A8), items not accepted, dispute resolution, governing law.
- **Service Policy (`service-policy.html`):** A3, A5–A11 and A13, written out for customers.

The booking form's consent checkbox links to Terms and Service Policy. **Don't enable booking until those two pages are final.** Customers must only be asked to accept reviewed policies.

---

## B. Technical setup before booking can open

### B1. Booking form endpoint

1. Choose a form service that accepts `POST` and emails you, e.g. Formspree (`https://formspree.io/f/XXXXXXXX`), or a booking platform's form endpoint.
2. In `contact.html`, set the booking form's `action` attribute: `<form id="booking-form" method="post" action="https://formspree.io/f/XXXXXXXX" ...>`
3. Also in `contact.html`: delete the `disabled` attribute from the booking submit button, and delete the `<div class="form-unavailable" ...>` notice above the booking form. (JavaScript does both automatically once `action` is set. Doing it in the HTML as well makes the form work for visitors without JavaScript.)
4. The form sends: `name, phone, email, service, bags, address, zip, date, window, preferences, consent`, plus a hidden spam trap `_gotcha` that must stay empty.
5. The site shows a confirmation reference **only if** the endpoint's JSON response includes a `reference` field. Formspree does not, so no reference is shown. That's intended: don't fake one.
6. Test a real submission end to end before announcing booking is open.

### B2. Contact form endpoint

Same steps as B1 for `<form id="contact-form">` in `contact.html`. DESIGN.md says messages should go to ccc@sundaysfold.com.

### B3. Out-of-area waitlist (optional)

DESIGN.md asks for email capture when a ZIP is outside the service area. The old "Notify me" form showed "Thanks — we'll email you" without sending anything, so it was removed. Re-adding it needs an endpoint (B1-style) and a privacy-policy mention.

### B4. After enabling forms

- Update `privacy.html` to describe the form provider (A16).
- Update the booking success message with your real response time (A12).
- Re-run the form tests (success, failure, duplicate submit) against the real endpoint.

---

## C. Needs manual verification (couldn't be tested here)

- **Safari (macOS and iOS) and Firefox:** only Chromium was available in the build environment, and Chromium also covers Edge. Check date picker styling, `inert` on the mobile menu (Safari 15.5+), and font rendering.
- **Real screen readers:** VoiceOver (iOS/macOS) and NVDA (Windows). Check the form error summary, success announcement, FAQ, and mobile menu.
- **Live site after deploy:** confirm `https://jrdiaz426.github.io/juan/DESIGN.md` and `/LAUNCH-CHECKLIST.md` return 404 (the workflow excludes them), and that `/juan/does-not-exist` shows the branded 404 page.
- **Social previews:** paste the URL into a link-preview tool (Facebook Sharing Debugger, LinkedIn Post Inspector) once the final domain is live.
- **Core Web Vitals:** run PageSpeed Insights against the live URL.

---

## D. Content sourcing reference

What the site now says, and where each claim comes from.

| Claim on site | Source |
|---|---|
| Name, email, phone, six cities, services, sundaysfold.com | DESIGN.md §0 (verified) |
| "Take Sunday back." · "Laundry pickup & delivery in the South Bay." · "Now picking up in the South Bay" · "We'll handle the laundry." · "Laundry day, off your list." | DESIGN.md headlines/copy |
| "Fresh, folded, and back in 24 hours." / 24-hour turnaround | DESIGN.md microcopy examples |
| Leave your bag by the door; you don't need to be home | DESIGN.md microcopy ("Leave your bag by the door Tuesday morning") |
| "Call or text a real person at (323) 470-3462" · new-business statement | Your 2026-09-23 review |
| Prices, plans, 10 lb minimum, 20 lb bag limit, free pickup & delivery | **Placeholder content, not from you (A1–A4)** |
| Two-hour pickup windows and the specific times | **Placeholder (A11)** |
