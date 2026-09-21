# Sunday's Fold — Design System
### Laundry service: wash, dry & fold, pickup & delivery

> Paste this whole file into Claude Code (or save it as `DESIGN.md` / add it to `CLAUDE.md` in the project root), then say:
> **"Apply the design system in DESIGN.md across the whole site. Start with the global CSS tokens, then update every page and component to match."**
>
> Voice and color principles are adapted from a professional brand guide; typography, layout, radius, spacing, elevation and components follow the Circa design system, re-skinned in our own colors. The colors and name are our own — do NOT use any other company's logo, name, slogans, or exact brand colors.

---

## 0. Business info (use exactly as written across the site)

| Item | Value |
|---|---|
| Business name | **Sunday's Fold** (always with the apostrophe; never "Sunday Folder" or "Sundays Fold") |
| Domain | **sundaysfold.com** (site URL: `https://sundaysfold.com`) |
| Email | **ccc@sundaysfold.com** (use a `mailto:` link) |
| Phone | **+1 (323) 470-3462** — display as (323) 470-3462; link as `tel:+13234703462` |
| Services | Laundry pickup & delivery; wash, dry & fold |
| Service area | **Gardena, Lawndale, Hawthorne, Torrance, Redondo Beach, El Segundo** (California, South Bay) |

**Where this info must appear:**
- **Header:** logo left, "Book pickup" button right; phone number as a tap-to-call link on mobile.
- **Footer:** email, phone, service area list, and © Sunday's Fold / sundaysfold.com.
- **Service area section:** heading "Now picking up in the South Bay," the six cities as pill-style chips (Paper background, Ink text), plus the zip code checker. If a zip is outside the area: "We're not in your neighborhood yet. Leave your email and we'll let you know when we are."
- **Contact page:** email, phone, service area, and a short contact form that sends to ccc@sundaysfold.com.
- **FAQ:** add "Where do you pick up?" answered with the six cities.
- **SEO:** page title pattern `[Page] | Sunday's Fold — Laundry Pickup & Delivery in the South Bay`; meta description mentions the six cities; add LocalBusiness schema (JSON-LD) with the name, URL, email, phone, and `areaServed` listing all six cities.

---

## 1. Brand personality

We speak with **warmth and sophistication**: a friendly, expert voice that gives busy people their weekend back.

**Brand idea:** *Your laundry, handled — so every day can feel like Sunday.* Fresh, clean, trustworthy, and a little bit of a treat.

**Who we serve:** busy professionals, families, students, and anyone who'd rather not spend Sunday at the laundromat.

| Too warm (avoid) | **Just right** | Too formal (avoid) |
|---|---|---|
| Sugary, cutesy, silly | **Vibrant, optimistic, caring, intentional, expert** | Sleek, authoritative, complicated, elite |

### Voice principles
1. **We care for people (and their clothes).** We treat every bag like it's our own. We ask about preferences, we listen, we speak with respect.
2. **We make it easy.** Scheduling, pricing, and pickup are simple and clear — three steps, no fine print.
3. **We brighten the week.** Optimistic energy that turns a chore into a small luxury.
4. **We get to the point.** Customers are busy. Clear prices, clear times, honest about delays or damage.

**Rules:** Write in first person ("we", "you"). Avoid superlatives ("best", "fastest") unless provably true. Never sugarcoat important info.

### Microcopy examples
| Try | Instead of |
|---|---|
| "Pick as many as you want." | "Please select all that apply." / "You choose!!" |
| "Sit tight. We'll be right with you." | "A representative will be with you shortly." |
| "No luck. Try another email or reset your password." | "Credentials not recognized." / "Whoopsies!" |
| "Your laundry's on its way back. Arriving 4–6 pm." | "Order #1042 status: Out for delivery." |
| "Pickup booked. Leave your bag by the door Tuesday morning." | "Your service request has been successfully submitted." |
| "Running about 20 minutes late. Sorry about that — we're on it." | "Delivery delayed." / "Oopsie, traffic!! 🙈" |
| "Fresh, folded, and back in 24 hours." | "The best and fastest laundry service in town!" |

### Headline examples
- "Take Sunday back."
- "We'll handle the laundry."
- "Fresh, folded, delivered."
- "Laundry day, off your list."

---

## 2. Color

### Brand palette
| Token | Name | Hex | Use |
|---|---|---|---|
| `--color-primary` | **Sunrise** | `#C4531F` | Primary buttons, logo, key highlights. Main brand color. |
| `--color-secondary` | **Sunday Blue** | `#2F5D8A` | Feature sections, links, calm/informational UI (where orange could feel like a warning). |
| `--color-ink` | **Ink** | `#1F2430` | All body text and headlines. Dark with a hint of blue. |

### Background palette
| Token | Name | Hex |
|---|---|---|
| `--color-white` | White | `#FFFFFF` |
| `--bg-cream` | Cream | `#FFF6E5` |
| `--bg-paper` | Paper | `#F7F5F0` |
| `--bg-blush` | Blush | `#FAF1ED` |

### Tints (use sparingly — mainly for UI states and illustrations)
| % | Sunrise | Sunday Blue | Ink |
|---|---|---|---|
| 100 | `#C4531F` | `#2F5D8A` | `#1F2430` |
| 80 | `#D0754C` | `#597DA1` | `#4C5059` |
| 60 | `#DC9879` | `#829EB9` | `#797C83` |
| 40 | `#E7BAA5` | `#ACBED0` | `#A5A7AC` |
| 20 | `#F3DDD2` | `#D5DFE8` | `#D2D3D6` |

### Color ratios
- Every page should be **more than 50% white**, with splashes of Cream / Paper / Blush as section backgrounds.
- Use **pops** of Sunrise and Sunday Blue to highlight key info — never large floods of Sunrise.
- One full-bleed **Sunday Blue section** per page (the FAQ) to break up long scrolls.

### Color rules (do / don't)
- ✅ White text on Sunday Blue (6.9:1) and on Sunrise buttons (4.6:1).
- ✅ Ink text on all light backgrounds.
- ❌ Never use Sunrise as a full-page or large section background.
- ❌ Never put white text on Cream, Paper, or Blush.
- ❌ Never put Sunrise text on Sunday Blue.
- ❌ Never put Ink/black text on Sunday Blue.
- ❌ No gradients on the logo or brand colors.

---

## 3. Typography (Circa system)

**One typeface: Inter** (Google Fonts, weights 400 / 500 / 600 / 700), fallback `-apple-system, system-ui, "Segoe UI", Roboto, sans-serif`. No serif, no mono. Hierarchy comes from size, weight, tracking, and the three text tiers — not from extra fonts.

### Text tiers (built only from our Ink color)
| Tier | Token | Hex | Use |
|---|---|---|---|
| Ink | `--text-strong` | `#1F2430` | Headings, card titles, prices, wordmark text, strong notes |
| Ink Secondary | `--text-secondary` | `#4C5059` (Ink 80) | Leads, card descriptions, nav links, labels, placeholders, review quotes |
| Ink Muted | `--text-muted` | `#797C83` (Ink 60) | Captions, "per lb" periods, footer eyebrows, reviewer neighborhood, copyright |

Never add a fourth grey. Never use hairline colors as text.

### Type scale
| Token | Size / line-height | Weight | Tracking | Use |
|---|---|---|---|---|
| display | 60 / 64px | 600 | −1.5px | Hero headline ("Take Sunday back.") |
| display-sub | 36 / 40px | 600 | −1.5px | Hero sub-line, in Ink Secondary |
| heading-2 | 48 / 52px | 600 | −1.2px | Section titles, CTA band title |
| title-lg | 20 / 28px | 600 | 0 | Pricing plan names |
| card-title | 18 / 28px | 600 | 0 | Feature & step titles, step numerals |
| title-sm | 16 / 24px | 500 | 0 | Reviewer names, small titles |
| price | 36 / 40px | 700 | 0 | Pricing amounts (the only 700 on the site) |
| lead | 18 / 28px | 400 | 0 | Hero lead, section leads |
| body | 14 / 22.75px | 400 | 0 | Card descriptions, review quotes |
| body-sm | 14 / 20px | 400 | 0 | Nav links, footer links, pricing rows, pills |
| body-md | 16 / 24px | 400 | 0 | Price period, general 16px body |
| button | 14 / 20px | 500 | 0 | All button labels, inline links |
| label | 13 / 19.5px | 500 | 0 | Form field labels |
| badge | 12 / 16px | 500 | 0 | "Most popular", small chips |
| caption | 12 / 16px | 400 | 0 | Captions, "or" dividers |
| eyebrow | 12 / 16px | 500 | +0.6px, UPPERCASE | Footer column headings only |
| fine-print | 11 / 17.9px | 400 | 0 | Terms lines |

**Responsive:** display 60 → 40px on mobile; heading-2 48 → 36px (md) → 30px (mobile); display-sub 36 → 30 → 24px.

**Principles:**
- Negative tracking only on display and heading-2; body copy is never tracked.
- 600 is the loudest weight for headings; 700 only for prices. Body is 400, buttons/labels 500. Never semibold body copy.
- **Hero headline gradient:** first line of the hero headline is filled with a left-to-right gradient from Ink `#1F2430` → Ink Secondary `#4C5059` (text-clip), handing off to the display-sub line beneath it. This is the only gradient allowed and it never touches the logo.

Section lockup used everywhere: **section pill → centered heading-2 → lead (max 672px) → card grid.**

---

## 4. Logo

- Wordmark: "Sunday's Fold" (with the apostrophe) in **Inter 600**, title case, in **Sunrise**, preceded by a 24px Sunrise square mark (rounded 4px) holding a white "S" or folded-shirt glyph.
- On white/Paper/Cream: Sunrise. On photos or Sunday Blue: **white only**.
- Clearspace: at least the height of the letter "o" on all sides. Minimum height: 24px (nav), 30px elsewhere.
- Favicon / app icon: the square mark alone.
- ❌ Don't stretch, rotate, recolor, add shadows/effects, gradients, or change letter spacing.

---

## 5. Layout, surfaces & components (Circa system)

### Surfaces & lines
| Role | Value | Use |
|---|---|---|
| Canvas (default) | White `#FFFFFF` | Hero, text sections — keeps pages >50% white |
| Canvas (card sections) | Paper `#F7F5F0` | Any section that holds a card grid, so white cards float by tone |
| Warm alternates | Cream `#FFF6E5`, Blush `#FAF1ED` | Pricing, service area, CTA band (one per page each at most) |
| Surface | White `#FFFFFF` | Every card, nav glass, secondary button, step numerals |
| Pressed-in tier | Paper `#F7F5F0` on white cards (or Ink 20 at 40% on Paper) | Section pills, icon tiles, avatar discs, city chips |
| Hairline | `rgba(31,36,48,0.12)` | Input borders, outline buttons, section + footer top rules, step ring |
| Hairline soft | `rgba(31,36,48,0.08)` | Card borders, nav bottom rule, secondary button border |
| Hairline faint | `rgba(31,36,48,0.05)` | Booking/auth card border, "or" divider |

(Hairlines are simply our Ink at low opacity — no new colors.)

### Radius ladder (tight and intentional)
| Token | Value | Use |
|---|---|---|
| xs | 4px | **All buttons**, logo mark, small chips |
| sm | 6px | Text inputs, date/time inputs, close buttons |
| md | 12px | Every card, icon tiles, photo frames |
| lg | 16px | The booking card (pickup scheduler) only |
| full | 9999px | Pills, badges, avatars, step numerals, status dots, city chips, time-slot chips |

Nothing exceeds 16px except true circles.

### Spacing (4px base, 8px rhythm)
2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · **80 (section)**
- Section padding: 80px top/bottom desktop, 56px below 1024px.
- Section header: title → lead 16px; header → grid 48px.
- Card interior 24px; booking card 32px; grid gutters 16px everywhere.
- Container 1280px max with 16px side padding; hero copy 768px max; leads 672px max; feature grid 896px max; pricing grid 1024px max.

### Elevation
| Level | Treatment | Use |
|---|---|---|
| 0 | Flat canvas, no shadow | Sections, CTA band, footer |
| 1 — Card | White + 1px hairline-soft + `0 1px 3px rgba(31,36,48,0.04)` | Feature, step, review, pricing cards; secondary button |
| 2 — Primary action | Sunrise fill + `0 4px 14px rgba(196,83,31,0.18)` | Primary buttons |
| 3 — Floating panel | White + 1px hairline-faint + `0 20px 25px -5px rgba(31,36,48,0.03), 0 8px 10px -6px rgba(31,36,48,0.03)` | Booking card, modals |
| 4 — Hero object | White + 1px Ink 10% border + `0 25px 50px -12px rgba(31,36,48,0.25)` + soft blurred halo behind | ONE hero object per page (hero photo or phone mockup of the booking flow) |
| Glass | White at 85% + 16px backdrop blur + hairline-soft bottom rule | Nav bar |

Almost nothing casts a shadow. Cards separate from the canvas by tone and a hairline.

### Navigation — `nav-bar`
- Fixed, 56px tall, glass surface, padding 0 16px.
- Left: logo mark + "Sunday's Fold" wordmark.
- Center (desktop): How it works · Pricing · Service area · FAQ — body-sm, Ink Secondary.
- Right: tap-to-call "(323) 470-3462" (ghost button), then primary-sm **"Book pickup"**.
- Below 1024px: center links collapse into a 36px menu icon button; phone icon + Book pickup stay visible.

### Buttons (all 4px radius, button type)
| Button | Style | Size |
|---|---|---|
| primary | Sunrise fill, white text, Elevation 2, optional trailing → arrow | 40px tall, 0 20px |
| primary-md | same | 36px (40px when full-width in forms) |
| primary-sm | same | 32px, 0 12px (nav) |
| secondary | White, Ink text, 1px hairline-soft, Elevation 1 | 40px, 0 20px |
| outline | Transparent, Ink text, 1px hairline | 36px, 0 16px |
| ghost | Transparent, Ink text | 32px, 0 12px |
| icon | Transparent 32px square (36px menu), Ink glyph | — |
Hover: primary → `#A94718`; secondary/outline → Paper fill. Focus: 2px Sunday Blue outline, 2px offset.

### Pills & badges
- **eyebrow-pill** (hero): Paper fill at 80%, 1px hairline, full radius, 8px 16px padding, 38px tall, body-sm Ink Secondary, leading 6px **Sunrise** status dot with a slow ping halo. e.g. "● Now picking up in the South Bay".
- **section-pill**: same, 4px 12px padding, 30px tall, 16px above each section title. e.g. "● How it works", "● Pricing", "● Reviews".
- **badge-primary**: Sunrise fill, white badge text, full radius, 22px — "Most popular".
- **badge-muted**: Ink 20 fill at 50%, Ink text, 20px — "New", "Eco".
- **city chip**: Paper fill, 1px hairline-soft, full radius, body-sm Ink — the six service cities.

### Cards
- **feature-card** (why us / trust): 48px icon tile (Paper fill, 12px radius, 24px Ink line icon) → 16px → card-title → 8px → body in Ink Secondary.
- **step-card** (How it works, 3-up, centered): 48px step numeral disc (white, 1px hairline ring, "01"–"03") → 24px → 56px icon tile → 16px → title → description. A 1px hairline fading at both ends connects the numerals across the row (desktop). Steps: 01 Schedule a pickup · 02 We wash, dry & fold · 03 Delivered back fresh.
- **review-card** (3-up): quote in body Ink Secondary → 24px → 40px avatar disc with initials (Paper fill) + first name (title-sm) + neighborhood (body-sm, Ink Muted). Real reviews only.
- **pricing-card**: plan name (title-lg) → tagline (body-sm, Ink Secondary) → price (price type) + "/ lb" or "/ bag" (body-md, Ink Muted) → checklist (body-sm, Ink Secondary, 20px **Sunday Blue** check glyphs, 12px gap) → full-width outline button.
- **pricing-card-featured**: same interior, lifted 16px above the row, 1px **Sunrise** border (optional slow rotating conic highlight in Sunrise at 25%), "Most popular" badge-primary centered on the top edge, full-width primary-md button. Loses the lift when stacked on mobile.
- **booking card** (pickup scheduler): 400–480px wide, 16px radius, 32px padding, Elevation 3. Stack: title (20px/600, −0.5px) → sub-line (body-sm, Ink Muted) → fields (label 13px/500 Ink Secondary, 6px above inputs; fields 12px apart): address, zip, date, time-slot chips, preferences → full-width primary "Book pickup" → fine-print terms.
- **order tracker**: horizontal stepper of 24px full-radius dots on a hairline — completed = Sunday Blue, current = Sunrise with ping halo, upcoming = hairline ring. Labels body-sm below.

### Forms
- **text-input**: transparent fill, 1px hairline, 6px radius, 40px tall, 0 12px padding, 14px Inter, Ink text, Ink Secondary placeholder. Focus: border becomes Sunday Blue at 60%, no glow.
- **time-slot chip**: full radius, 1px hairline, body-sm; selected = Sunday Blue fill + white text.
- **Links**: Sunday Blue, underlined with 2px offset. Inline links in forms: Ink, button type, no underline.

### Sections
- **CTA band**: Cream or White, 1px hairline top rule, 80px padding, centered heading-2 → lead → primary button → caption in Ink Muted ("Serving Gardena, Lawndale, Hawthorne, Torrance, Redondo Beach & El Segundo").
- **FAQ**: the one full-bleed **Sunday Blue** section (white text, white hairlines at 20%), accordion rows 56px tall.
- **Footer**: Paper, 1px hairline top rule. Brand column (logo + one-line tagline in Ink Secondary) + 3 link columns headed by UPPERCASE eyebrow in Ink Muted (Company · Service area · Contact) → 40px → hairline → 24px → centered copyright in Ink Muted: "© Sunday's Fold · sundaysfold.com".

### Imagery
- **Illustration:** loose hand-drawn line art with flat fills from our palette (Sunrise, Sunday Blue, and tints). Joyful people relaxing while folded stacks and laundry bags appear nearby.
- **Photography:** real, candid, warm natural light — folded towels, a bag handed off at a door, a friendly driver. Photos sit in 12px-radius frames with a hairline-soft border. Only the single hero image gets Elevation 4.
- **Icons:** 24px (28px in large tiles) line icons, 1.5px stroke, Ink.

### Recommended homepage order
Nav → Hero (eyebrow pill, gradient headline "Take Sunday back." + sub-line "Laundry pickup & delivery in the South Bay.", lead, primary "Book pickup" + secondary "See pricing", zip checker, one hero image with halo) → Trust bar → How it works (Paper, step cards) → Pricing (Cream, 3–4 cards, one featured) → Why us (Paper, feature cards) → Service area (White, city chips + zip checker) → Reviews (Paper) → FAQ (Sunday Blue) → CTA band → Footer.

---

## 6. CSS tokens (drop into global stylesheet)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Brand (unchanged color scheme) */
  --color-primary: #C4531F;        /* Sunrise */
  --color-primary-hover: #A94718;
  --color-secondary: #2F5D8A;      /* Sunday Blue */
  --color-secondary-hover: #264D73;
  --color-ink: #1F2430;

  /* Backgrounds */
  --color-white: #FFFFFF;
  --bg-cream: #FFF6E5;
  --bg-paper: #F7F5F0;
  --bg-blush: #FAF1ED;

  /* Tints */
  --primary-80: #D0754C; --primary-60: #DC9879; --primary-40: #E7BAA5; --primary-20: #F3DDD2;
  --secondary-80: #597DA1; --secondary-60: #829EB9; --secondary-40: #ACBED0; --secondary-20: #D5DFE8;
  --ink-80: #4C5059; --ink-60: #797C83; --ink-40: #A5A7AC; --ink-20: #D2D3D6;

  /* Text tiers */
  --text-strong: var(--color-ink);
  --text-secondary: var(--ink-80);
  --text-muted: var(--ink-60);

  /* Hairlines (Ink at low opacity) */
  --hairline: rgba(31, 36, 48, 0.12);
  --hairline-soft: rgba(31, 36, 48, 0.08);
  --hairline-faint: rgba(31, 36, 48, 0.05);

  /* Type */
  --font-sans: 'Inter', -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif;

  /* Radius */
  --radius-xs: 4px;  --radius-sm: 6px;  --radius-md: 12px;  --radius-lg: 16px;  --radius-full: 9999px;

  /* Elevation */
  --shadow-card: 0 1px 3px rgba(31, 36, 48, 0.04);
  --shadow-button: 0 4px 14px rgba(196, 83, 31, 0.18);
  --shadow-panel: 0 20px 25px -5px rgba(31, 36, 48, 0.03), 0 8px 10px -6px rgba(31, 36, 48, 0.03);
  --shadow-hero: 0 25px 50px -12px rgba(31, 36, 48, 0.25);

  /* Space */
  --space-section: 80px;
  --container-max: 1280px;
  --lead-max: 672px;
}

@media (max-width: 1023px) { :root { --space-section: 56px; } }

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--color-white);
  color: var(--text-strong);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
}

/* Headings */
.display { font-size: 60px; line-height: 64px; font-weight: 600; letter-spacing: -1.5px; }
.display-sub { font-size: 36px; line-height: 40px; font-weight: 600; letter-spacing: -1.5px; color: var(--text-secondary); }
.display .gradient-line {
  background: linear-gradient(90deg, var(--color-ink), var(--ink-80));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
h2, .heading-2 { font-size: 48px; line-height: 52px; font-weight: 600; letter-spacing: -1.2px; margin: 0; }
.title-lg { font-size: 20px; line-height: 28px; font-weight: 600; }
.card-title { font-size: 18px; line-height: 28px; font-weight: 600; }
.title-sm { font-size: 16px; line-height: 24px; font-weight: 500; }
.price { font-size: 36px; line-height: 40px; font-weight: 700; }
.lead { font-size: 18px; line-height: 28px; color: var(--text-secondary); max-width: var(--lead-max); }
.body { font-size: 14px; line-height: 22.75px; color: var(--text-secondary); }
.body-sm { font-size: 14px; line-height: 20px; }
.caption { font-size: 12px; line-height: 16px; color: var(--text-muted); }
.eyebrow { font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: 0.6px; text-transform: uppercase; color: var(--text-muted); }

@media (max-width: 767px) {
  .display { font-size: 40px; line-height: 44px; letter-spacing: -1px; }
  .display-sub { font-size: 24px; line-height: 30px; letter-spacing: -0.5px; }
  h2, .heading-2 { font-size: 30px; line-height: 36px; letter-spacing: -0.8px; }
}

a { color: var(--color-secondary); text-decoration: underline; text-underline-offset: 2px; }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  height: 40px; padding: 0 20px;
  font: 500 14px/20px var(--font-sans);
  border-radius: var(--radius-xs); border: 1px solid transparent;
  text-decoration: none; cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.btn:focus-visible { outline: 2px solid var(--color-secondary); outline-offset: 2px; }
.btn-md { height: 36px; padding: 0 16px; }
.btn-sm { height: 32px; padding: 0 12px; }
.btn-primary { background: var(--color-primary); color: #fff; box-shadow: var(--shadow-button); }
.btn-primary:hover { background: var(--color-primary-hover); }
.btn-secondary { background: #fff; color: var(--text-strong); border-color: var(--hairline-soft); box-shadow: var(--shadow-card); }
.btn-outline { background: transparent; color: var(--text-strong); border-color: var(--hairline); }
.btn-secondary:hover, .btn-outline:hover { background: var(--bg-paper); }
.btn-ghost { background: transparent; color: var(--text-strong); }

/* Pills & badges */
.pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 4px 12px; height: 30px;
  background: var(--bg-paper); border: 1px solid var(--hairline);
  border-radius: var(--radius-full);
  font-size: 14px; line-height: 20px; color: var(--text-secondary);
}
.pill--hero { padding: 8px 16px; height: 38px; }
.pill .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary); }
.badge { display: inline-flex; align-items: center; height: 22px; padding: 2px 8px; border-radius: var(--radius-full); font-size: 12px; font-weight: 500; }
.badge-primary { background: var(--color-primary); color: #fff; }

/* Cards */
.card {
  background: #fff;
  border: 1px solid var(--hairline-soft);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: 24px;
}
.card--featured { border-color: var(--color-primary); transform: translateY(-16px); position: relative; }
.card--panel { border-radius: var(--radius-lg); border-color: var(--hairline-faint); box-shadow: var(--shadow-panel); padding: 32px; }
.icon-tile { width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--bg-paper); display: grid; place-items: center; }
.step-numeral { width: 48px; height: 48px; border-radius: 50%; background: #fff; border: 1px solid var(--hairline); display: grid; place-items: center; font-size: 18px; font-weight: 600; }
@media (max-width: 767px) { .card--featured { transform: none; } }

/* Forms */
.field-label { display: block; font-size: 13px; line-height: 19.5px; font-weight: 500; color: var(--text-secondary); margin-bottom: 6px; }
.input {
  width: 100%; height: 40px; padding: 0 12px;
  font: 400 14px/21px var(--font-sans); color: var(--text-strong);
  background: transparent; border: 1px solid var(--hairline); border-radius: var(--radius-sm);
}
.input::placeholder { color: var(--text-secondary); }
.input:focus { outline: none; border-color: rgba(47, 93, 138, 0.6); }
.chip { height: 36px; padding: 0 14px; border-radius: var(--radius-full); border: 1px solid var(--hairline); background: #fff; font-size: 14px; }
.chip[aria-pressed="true"] { background: var(--color-secondary); border-color: var(--color-secondary); color: #fff; }

/* Nav */
.nav {
  position: sticky; top: 0; z-index: 50; height: 56px; padding: 0 16px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--hairline-soft);
}

/* Sections */
.section { padding: var(--space-section) 16px; }
.section--paper { background: var(--bg-paper); }
.section--cream { background: var(--bg-cream); }
.section--blush { background: var(--bg-blush); }
.section--blue  { background: var(--color-secondary); color: #fff; }
.section--blue h2, .section--blue .lead { color: #fff; }
.section--ruled { border-top: 1px solid var(--hairline); }
.section-header { text-align: center; margin: 0 auto 48px; max-width: 768px; }
.section-header .lead { margin: 16px auto 0; }
.container { max-width: var(--container-max); margin: 0 auto; }
.grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 640px) { .grid--3 { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid--3 { grid-template-columns: repeat(3, 1fr); } .grid--4 { grid-template-columns: repeat(4, 1fr); } }
```

### Tailwind (if the project uses Tailwind) — add to `tailwind.config.js`
```js
theme: {
  extend: {
    colors: {
      sunrise: { DEFAULT: '#C4531F', hover: '#A94718', 80: '#D0754C', 60: '#DC9879', 40: '#E7BAA5', 20: '#F3DDD2' },
      sundayblue: { DEFAULT: '#2F5D8A', hover: '#264D73', 80: '#597DA1', 60: '#829EB9', 40: '#ACBED0', 20: '#D5DFE8' },
      ink: { DEFAULT: '#1F2430', secondary: '#4C5059', muted: '#797C83', 40: '#A5A7AC', 20: '#D2D3D6' },
      cream: '#FFF6E5', paper: '#F7F5F0', blush: '#FAF1ED',
      hairline: { DEFAULT: 'rgba(31,36,48,0.12)', soft: 'rgba(31,36,48,0.08)', faint: 'rgba(31,36,48,0.05)' },
    },
    fontFamily: { sans: ['Inter', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'] },
    fontSize: {
      display: ['60px', { lineHeight: '64px', letterSpacing: '-1.5px', fontWeight: '600' }],
      'display-sub': ['36px', { lineHeight: '40px', letterSpacing: '-1.5px', fontWeight: '600' }],
      h2: ['48px', { lineHeight: '52px', letterSpacing: '-1.2px', fontWeight: '600' }],
      'title-lg': ['20px', { lineHeight: '28px', fontWeight: '600' }],
      'card-title': ['18px', { lineHeight: '28px', fontWeight: '600' }],
      price: ['36px', { lineHeight: '40px', fontWeight: '700' }],
      lead: ['18px', { lineHeight: '28px' }],
      body: ['14px', { lineHeight: '22.75px' }],
      label: ['13px', { lineHeight: '19.5px', fontWeight: '500' }],
      caption: ['12px', { lineHeight: '16px' }],
      fine: ['11px', { lineHeight: '17.875px' }],
    },
    borderRadius: { xs: '4px', sm: '6px', md: '12px', lg: '16px' },
    boxShadow: {
      card: '0 1px 3px rgba(31,36,48,0.04)',
      button: '0 4px 14px rgba(196,83,31,0.18)',
      panel: '0 20px 25px -5px rgba(31,36,48,0.03), 0 8px 10px -6px rgba(31,36,48,0.03)',
      hero: '0 25px 50px -12px rgba(31,36,48,0.25)',
    },
    spacing: { section: '80px' },
    maxWidth: { container: '1280px', lead: '672px' },
  },
}
```

---

## 7. Instructions for Claude Code

1. Add the CSS tokens (or Tailwind config) globally and load **Inter** from Google Fonts. Remove any Fraunces/Figtree imports.
2. **Do not change the color scheme** — Sunrise, Sunday Blue, Ink, Cream, Paper, Blush and their tints are final. Hairlines are Ink at low opacity only.
3. Replace all hard-coded colors, fonts, radii and shadows with the tokens above.
4. Rebuild every section with the lockup: section pill → centered heading-2 → lead (max 672px) → 16px-gap card grid, on 80px section padding.
5. Apply the radius ladder strictly: 4px buttons, 6px inputs, 12px cards, 16px booking card only, full for pills/chips/avatars.
6. Keep shadows minimal: Elevation 1 on cards, Elevation 2 on primary buttons, and a single Elevation 4 hero object per page.
7. Keep pages >50% white; put card grids on Paper; at most one Sunday Blue section (FAQ) per page.
8. Rewrite UI copy to match the voice principles and microcopy table in section 1; use business info from section 0 exactly.
9. Check every text/background pair against the color rules in section 2 (WCAG AA minimum).
10. Test at 375px width with no horizontal scroll; keep "Book pickup" reachable on every page (sticky on mobile is fine).
