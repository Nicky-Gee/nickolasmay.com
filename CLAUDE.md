# CLAUDE.md — nickolasmay.com
# READ THIS ENTIRE FILE BEFORE WRITING A SINGLE LINE OF CODE.
# Ask me any questions before starting. Do not make assumptions.
# Do not default to generic layouts, animations, or components.
# Every decision must reference this brief. If something isn't here, ask me first.

---

## 0. First Message Protocol

Before touching any code:
1. Read this entire file
2. Summarise what you are going to build in dot points — section by section
3. Confirm you understand the Do Not Do list
4. Tell me if anything is missing or unclear
5. Wait for me to say GO

Do not start coding until I say GO.

---

## 1. Project Overview

**Site:** nickolasmay.com  
**Client:** Nickolas May — Award-winning commercial filmmaker and photographer  
**Awards:** Gold Cannes Lions, Australian Life Photographic Prize  
**Location:** Sunshine Coast, Queensland, Australia  
**Audience:** Ad agencies, marketing managers, luxury brands, hospitality, tourism, property developers  
**Goal:** First impression = inspiration, movement, cinematic confidence. The site must feel like his work — premium, alive, intentional. Every scroll is a cut.

**Quality bar:** Spring Studios. Streeters. Wren Agency. Study these — extract the feeling, do not copy.

---

## 2. Brand Identity

### Colours
| Role | HEX |
|------|-----|
| Primary Black | #2e2d32 |
| Teal Accent | #336065 |
| Mid Grey | #a2a0a2 |
| Light Grey Background | #f4f4f4 |
| White | #ffffff |

Background is white/light grey. Dark elements and teal accents punctuate. **Never dark mode.**

### Typography
| Role | Font | Weight |
|------|------|--------|
| All Headers / Display | Archivo Black | 900 |
| Body / UI / Nav | Inter | 300–500 |

- Load both via Google Fonts
- Headers: uppercase, letter-spacing 0.05–0.1em
- Body: generous line-height 1.7+
- No decorative fonts. No serif. No system fonts.

### Logo
- Wordmark: **NICKOLAS MAY** in Archivo Black
- Teal #336065 version on white/light backgrounds
- Dark #2e2d32 version as secondary
- Never distort, shadow, or outline
- Logo files will be at: `/src/assets/logos/logo-teal.svg` and `logo-dark.svg`

---

## 3. Aesthetic Direction

### The Feeling
Clean. Cinematic. Moving. Premium. Human. Warm confidence — not cold minimalism.  
Think: a film reel that became a website. Every scroll is a cut.

### Reference Sites (extract feeling only — do not copy)
- https://www.springstudios.com/ — editorial calm, luxury restraint
- https://wren.agency/artists/david-stewart/ — photographer portfolio structure  
- https://www.streeters.com/ — agency confidence, grid-breaking layouts
- https://lusion.co — scroll pacing, typographic confidence (NOT the 3D/WebGL)
- https://theproductionfactory.com/portfolio — production company credibility

### What to steal from Lusion specifically
- Large left-aligned section headers, massive Archivo Black
- Small caps service tags above project titles: "TOURISM • PHOTOGRAPHY • FILM"
- Confident scroll pacing — slow, intentional, never rushed
- Minimal nav — no clutter
- Two-column project grid, clean titles below images

---

## 4. Technical Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS + custom CSS variables
- **Animation:** GSAP with ScrollTrigger plugin
- **Smooth scroll:** Lenis
- **Fonts:** Google Fonts — Archivo Black + Inter
- **Video:** MP4 file (local) for hero. Vimeo embed for Film page.
- **Images:** Lazy loaded, high-res
- **NO Three.js** — do not add it unless I explicitly ask

### Hero Video Spec
- File: `/src/assets/video/hero.mp4`
- Autoplay, muted, loop, playsinline
- Object-fit: cover, full 100vh
- No controls visible
- Loads after first paint — do not block render

### Performance Rules
- Lazy load all images below the fold
- Hero video loads after page paint
- No blocking scripts in `<head>`
- Target Lighthouse score 85+ desktop
- Mobile-first responsive — desktop is primary

---

## 5. The Hero Scroll-Zoom Effect

This is the most important section. Get this right first.

**The effect (GSAP ScrollTrigger — NO WebGL needed):**
- Hero section is 100vh
- Hero video fills it completely (object-fit: cover)
- On scroll: video/container scales from 1.0 → 1.2 as user scrolls through the section
- Overflow: hidden on the container — no edge bleed
- Lenis smooth scroll makes this feel like cinema
- As scale increases, the focal point (centre of frame) becomes dominant
- Effect ends when hero scrolls out of view — next section clips in underneath

**Entry animation:**
- Video fades in over 1.5s on load
- Nav links stagger-fade in after 0.8s delay
- Scroll indicator: thin animated vertical line, pulses downward, bottom-centre, disappears on scroll

This creates the "being pulled into the frame" feeling. Do not add text over the hero. Let the video speak.

---

## 6. Site Structure & Navigation

### Navigation
- Fixed top nav, transparent over hero
- On scroll past hero: background fades to white with subtle drop shadow (0.3s transition)
- Left: **NICKOLAS MAY** wordmark (teal, Archivo Black)
- Right: Work · Film · About · Contact
- Nav links: Inter 300, uppercase, letter-spacing 0.1em, no underline, no hover underline
- Mobile: hamburger (two lines, not three), full-screen dark overlay (#2e2d32), links centred, Archivo Black large

### Pages
1. Home (/)
2. Commissioned Work (/commissioned)
3. Film (/film)
4. Portraits (/portraits)
5. Eat & Drink (/eatdrink)
6. About (/about)
7. Contact (/contact)

---

## 7. Page-by-Page Brief

### PAGE 1 — HOME (/)

#### Section 1: Hero
- 100vh, hero video (see Section 5 above for scroll-zoom spec)
- Scroll indicator: thin animated line, bottom-centre, disappears on scroll
- No text over video

#### Section 2: Statement
- White background, 120px padding top/bottom
- Large display text: **"Filmmaker. Photographer. Sunshine Coast."**
- Archivo Black, ~72–96px desktop, #2e2d32, left-aligned
- Subtext (Inter 300, 18px, #a2a0a2): *"Gold Cannes Lions — Australian Life Photographic Prize"*
- ScrollTrigger entry: text slides up from y:40 opacity:0 → y:0 opacity:1

#### Section 3: Featured Work Grid
- **Asymmetric layout — NOT equal cards, NOT a standard grid**
- Row pattern: 1 large image (60% width) + 2 stacked smaller images (40% width)
- Alternate layout on next row (flip sides)
- Hover state: scale 1.03 (0.4s ease), teal overlay #336065 at 15% opacity, project title fades in (Archivo Black, white, uppercase, centre)
- Titles ONLY on hover — never visible by default
- No border radius. No box shadow. No rounded corners.
- Above the grid: large left-aligned "FEATURED WORK" heading (Archivo Black, massive)
- Below grid: small service tags in Inter 300 small caps. Example: "TOURISM • PHOTOGRAPHY • CAMPAIGN"
- "View All Work →" below — Inter 300, teal, no button box

Projects to show (6 max):
- Tourism Noosa
- Elysian Retreat  
- Mirage Whitsundays
- Finca La Torre
- Ingenia
- Kakadu Tourism

Placeholder images: cinematic grey-toned rectangles (16:9 or 3:2), labelled with project name inside the image. Never stock photos.

#### Section 4: Film Reel
- Dark background section (#2e2d32)
- Heading: **"FILM"** — Archivo Black, white, massive (120px+), left-aligned
- Vimeo embed below, full-width, 16:9 ratio
- Vimeo URL: https://vimeo.com/1034885005
- Below video, Inter 300, #a2a0a2: *"Commercial. Documentary. Social."*
- CTA: "View Film Work →" in teal

#### Section 5: About Strip
- White background
- Two columns: left = portrait photo of Nickolas (full bleed, no border radius), right = bio text
- Bio: *"Nickolas May is an award-winning photographer and filmmaker with a Gold Cannes Lions award and the Australian Life Photographic prize."*
- 3 stat items below in a row — Archivo Black large number, Inter 300 label below:
  - 14 Years Independent
  - 3 Brands
  - 1 Gold Cannes Lion
- ScrollTrigger: left image slides in from left, right text slides in from right

#### Section 6: Contact Strip
- Teal background (#336065)
- Centred: **"LET'S MAKE SOMETHING."** — Archivo Black, white, large
- Subtext (Inter 300, white 80% opacity): *"Based on the Sunshine Coast. Working globally."*
- Email: nick@nickolasmay.com — white, Archivo Black, hover underline only
- No contact form on homepage

---

### PAGE 2 — COMMISSIONED (/commissioned)

- Full-width hero image (cinematic landscape, no video) — use placeholder
- Page title: **"COMMISSIONED"** — Archivo Black, white, overlaid bottom-left on hero
- Below hero: filterable project grid
  - Filter tabs: ALL / TOURISM / LIFESTYLE / HOSPITALITY / CAMPAIGN
  - Filter UI: plain text tabs, teal underline on active, Inter 300, no buttons
- Project cards: full-bleed image, no border radius, title on hover only
- Small caps service tags below each image (visible always): "TOURISM • PHOTOGRAPHY"

Projects:
- Tourism Noosa
- Elysian Retreat
- Mirage Whitsundays
- Finca La Torre
- Ingenia
- Kakadu Tourism
- Cavan

#### Individual Project Pages (/commissioned/[slug])
- Full-screen hero image
- Project title: Archivo Black, large, white overlaid bottom-left
- Below: two-column layout — left: images stacked (full bleed), right: project info
  - Client name
  - Services
  - Year
  - Short description 2–3 lines
- Image gallery: vertical stack — NOT a carousel, NOT a lightbox
- Next Project: full-width image teaser at bottom, title overlaid

---

### PAGE 3 — FILM (/film)

- Dark background (#2e2d32) full page
- Large **"FILM"** text header, Archivo Black, white, full-width left-aligned
- Vimeo reel embed below, full-width 16:9
- Grid of film thumbnails (16:9), hover: minimal play icon (thin circle + triangle)
- Click: Vimeo opens in dark lightbox overlay, minimal UI

---

### PAGE 4 — PORTRAITS (/portraits)

- White background
- Masonry grid — 3 columns desktop, 2 tablet, 1 mobile
- No titles on images — pure visual
- Lightbox on click: full-screen, left/right arrows, close X
- ScrollTrigger: images stagger-fade in (0.15s between items)

---

### PAGE 5 — EAT & DRINK (/eatdrink)

- Same structure as Portraits
- White background, masonry grid

---

### PAGE 6 — ABOUT (/about)

- Full-screen hero portrait, full bleed, no overlay text
- Below: large statement — Archivo Black, #2e2d32: *"I make images that move people."*
- Bio: Inter 300, generous line-height, two paragraphs max
- Services: two-column text layout (not bullet points) — Archivo Black labels, Inter body
- Awards: Gold Cannes Lions + Australian Life Photographic Prize — minimal, no icons
- Client logos row if available — greyscale, hover to colour

---

### PAGE 7 — CONTACT (/contact)

- White background, generous whitespace
- Left: large **"GET IN TOUCH"** — Archivo Black, #2e2d32
- Right: simple form
  - Name, Email, Project type, Message
  - Inputs: borderless, bottom border only, Inter 300
  - Submit: teal background, white Archivo Black text, zero border radius
- Below form: nick@nickolasmay.com and +61 411 66 7000
- Social: Instagram + LinkedIn — teal icon only

---

## 8. Global Interactions & Animation

### Custom Cursor (desktop only — disabled on touch)
- Small filled circle #336065, 12px
- On hover over images/links: scales to 40px, outline only (no fill), label "VIEW" or "PLAY"
- Smooth lag: lerp 0.1

### Smooth Scroll
- Lenis, lerp: 0.1, natural easing
- No jarring jumps

### Page Transitions
- Full-screen white overlay wipes left → right on route change
- 0.6s in, 0.4s out
- Next page loads silently during wipe

### Image Hover
- Scale: 1.03
- Duration: 0.4s
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Overflow hidden on container — critical, no image bleed

### ScrollTrigger Defaults (all sections)
- Trigger: 20% into viewport
- From: opacity 0, y: 40px
- To: opacity 1, y: 0
- Duration: 0.8s
- Stagger on groups: 0.15s
- Ease: power2.out

---

## 9. Mobile Behaviour

- Hero video: still plays (muted, autoplay, playsinline)
- Scroll-zoom effect: reduce intensity (scale 1.0 → 1.1 instead of 1.2)
- Nav: hamburger → full-screen dark overlay, links centred, Archivo Black, large
- Grid: single column
- Headers: ~48px on mobile
- Custom cursor: disabled
- Lenis: still active
- Animations: still fire, reduce y offset to 20px

---

## 10. SEO & Meta

```html
<title>Nickolas May — Filmmaker & Photographer | Sunshine Coast</title>
<meta name="description" content="Award-winning commercial filmmaker and photographer. Gold Cannes Lions. Based on the Sunshine Coast, working globally.">
<meta property="og:image" content="/og-image.jpg">
```

---

## 11. File Structure

```
/src
  /components
    Nav.jsx
    Hero.jsx
    HeroScrollZoom.jsx     ← the scroll-zoom wrapper component
    WorkGrid.jsx
    FilmSection.jsx
    AboutStrip.jsx
    ContactStrip.jsx
    CustomCursor.jsx
    PageTransition.jsx
    LenisProvider.jsx
  /pages
    Home.jsx
    Commissioned.jsx
    Film.jsx
    Portraits.jsx
    EatDrink.jsx
    About.jsx
    Contact.jsx
  /styles
    globals.css            ← CSS variables, resets, typography
    animations.css         ← reusable GSAP class targets
  /assets
    /images
    /logos
      logo-teal.svg
      logo-dark.svg
    /video
      hero.mp4
main.jsx
App.jsx
```

---

## 12. Do Not Do List — Non-Negotiable

- ❌ No rounded corners on image containers — anywhere, ever
- ❌ No box shadows on cards
- ❌ No purple, blue, or gradient colour schemes
- ❌ No generic stock icons
- ❌ No carousels with dot indicators
- ❌ No full-width coloured CTA buttons with border radius
- ❌ No centred hero text with subtext and a button underneath
- ❌ No Lorem Ipsum — use real copy from this brief
- ❌ No Canva-style layouts
- ❌ No Inter as a heading font — Archivo Black only for headers
- ❌ No dark mode
- ❌ No page loading spinners — instant load or skeleton screens
- ❌ No project titles visible by default on grid cards — hover only
- ❌ No equal-width two-column grids — asymmetric always
- ❌ No Three.js unless I explicitly ask for it
- ❌ No stock photo placeholders — grey-toned cinematic rectangles with project name text inside
- ❌ No titles or labels below image cards on the home grid — hover overlay only

---

## 13. Asset Locations

When I say GO, these files will be in the project:

| Asset | Path |
|-------|------|
| Hero video | `/src/assets/video/hero.mp4` |
| Logo teal | `/src/assets/logos/logo-teal.svg` |
| Logo dark | `/src/assets/logos/logo-dark.svg` |
| Portfolio images | `/src/assets/images/[project-name].jpg` |
| Portrait of Nickolas | `/src/assets/images/portrait.jpg` |

If any of these are missing when you start, use placeholders as specified in the Do Not Do list and flag which files are needed.

---

## 14. Build Order

Build in this exact order. Complete and confirm each step before moving to the next:

1. **Scaffold** — Vite + React, install all dependencies (GSAP, Lenis, Tailwind, React Router)
2. **Globals** — CSS variables, typography, resets
3. **LenisProvider** — smooth scroll wrapper
4. **Nav** — fixed, transparent over hero, fades to white on scroll
5. **HeroScrollZoom** — the scroll-zoom video hero. THIS IS THE MOST IMPORTANT COMPONENT. Get it right before anything else.
6. **CustomCursor** — teal dot, hover expand, lerp
7. **PageTransition** — white wipe between routes
8. **Home page** — all sections in order
9. **Commissioned page + project template**
10. **Film, Portraits, Eat & Drink pages**
11. **About + Contact pages**
12. **Mobile pass** — test all breakpoints
13. **Performance pass** — lazy loading, Lighthouse check

---

## 15. Definition of Done

The site is complete when:

- [ ] Hero video plays full bleed, scroll-zoom fires smoothly on scroll
- [ ] No text over the hero — video only
- [ ] Custom teal cursor works on desktop, disabled on touch
- [ ] Lenis smooth scroll feels cinematic throughout
- [ ] All section entry animations fire on scroll (ScrollTrigger)
- [ ] Work grid is asymmetric, hover states work, titles only on hover
- [ ] Page transitions wipe cleanly between routes
- [ ] Mobile nav hamburger opens full-screen dark overlay
- [ ] Contact form submits (mailto for now)
- [ ] Lighthouse 85+ on desktop
- [ ] Zero console errors

---

*Brief version: 2.0 — nickolasmay.com — May 2026*  
*Updated with: Kling hero video, GSAP scroll-zoom hero, Lusion pacing reference, final Do Not Do list*
