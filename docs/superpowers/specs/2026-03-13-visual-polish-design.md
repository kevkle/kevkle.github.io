# Visual Polish & Micro-interactions — Design Spec

## Overview

Add moderate-intensity animations and micro-interactions to kevkle.github.io using pure CSS + minimal vanilla JS. Zero external dependencies. All animations respect `prefers-reduced-motion`.

## Approach

Pure CSS transitions/animations driven by a small vanilla JS layer (~80 lines). IntersectionObserver for scroll-triggered effects. No libraries.

## Files Modified

- `css/style.css` — animation classes, hover enhancements, cursor glow styles
- `js/main.js` — IntersectionObserver, count-up, cursor glow, tab indicator
- `index.html` — add `.reveal`, `.stagger`, `data-count` attributes to elements

## Features

### 1. Scroll Reveal

Elements fade and slide up when entering the viewport.

**CSS:**

- `.reveal` — `opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease;`
- `.reveal.revealed` — `opacity: 1; transform: translateY(0);`

**JS:**

- Single `IntersectionObserver` with `threshold: 0.15`
- On intersect: add `.revealed` class, then `unobserve` the element
- On `DOMContentLoaded`: observe all `.reveal` elements

**Applied to:**

- `.impact-row` elements
- `.about-body` paragraphs
- `.currently-building` box
- `.pill-row`
- `.exp-item` elements
- `.proj-card` elements
- `.edu-item` elements
- `.contact-links` container
- `.lang-grid`

### 2. Staggered Entrances

Children of a group appear with incremental delay, creating a cascade effect.

**CSS:**

- `.stagger > *` — inherits `.reveal` behavior, adds `transition-delay: calc(var(--i, 0) * 80ms);`

**HTML:**

- Each child gets `style="--i:0"`, `style="--i:1"`, etc.

**Applied to:**

- `.pill-row` children (skill pills)
- `.exp-tags` children on each card
- `.contact-links` children

### 3. Hover Enhancements

**Project cards:**

- Add `box-shadow: 0 8px 30px rgba(0,229,160,0.08)` on hover
- Keep existing `translateY(-3px)` and `border-color` change

**Skill pills / exp-tags:**

- Add `transform: translateY(-2px)` on hover

**Contact links:**

- `.contact-link-icon` gets `transform: translateX(4px)` on hover via transition

**Impact rows:**

- Add `border-left: 2px solid transparent` base, transitions to `var(--accent)` on hover

### 4. Tab Transitions

**Sliding indicator:**

- `.tabs-wrap::after` pseudo-element positioned absolutely at bottom
- `height: 2px; background: var(--accent);`
- Positioned via CSS custom properties `--tab-left` and `--tab-width` with `transform: translateX(var(--tab-left)); width: var(--tab-width));`
- JS updates these properties on tab switch using `tab.offsetLeft` and `tab.offsetWidth`
- Remove `border-bottom` from `.tab-btn[aria-selected="true"]`

**Panel transition:**

- Keep existing `fadeUp` keyframe animation on panel show
- Current behavior is sufficient — instant hide, animated show

### 5. Number Count-Up

**JS:**

- Elements with `data-count` attribute animate from 0 to target value
- `data-count="8"` with `data-suffix="+"` renders as "8+"
- Duration: 1.2s with ease-out curve
- Uses `requestAnimationFrame` loop
- Triggered by IntersectionObserver (same observer, checked via `data-count`)

**HTML changes:**

- `<span class="impact-num">8+</span>` becomes `<span class="impact-num" data-count="8" data-suffix="+">8+</span>`
- `6h` → `data-count="6" data-suffix="h"`
- `40%` → `data-count="40" data-suffix="%"`
- `PROD` and `ETH Zürich` — no count-up (not numeric)

**Fallback:**

- Numbers are visible in HTML by default
- JS clears and re-animates on scroll — if JS fails, numbers remain as-is

### 6. Cursor Glow

**JS:**

- On `mouseenter` for `.proj-card` and `.contact-link`: start tracking `mousemove`
- On `mousemove`: set `--mx` and `--my` CSS custom properties to cursor position relative to element
- On `mouseleave`: stop tracking

**CSS:**

- `.proj-card` and `.contact-link` get `position: relative; overflow: hidden;` (already set on proj-card)
- New `::before` on these elements:
  - `content: ''; position: absolute; inset: 0; pointer-events: none;`
  - `background: radial-gradient(250px circle at var(--mx) var(--my), rgba(0,229,160,0.06), transparent);`
  - `opacity: 0; transition: opacity 0.3s;`
- On `:hover::before` — `opacity: 1;`

**Note:** `.proj-card::after` is already used for the left bar animation. Cursor glow uses `::before`.

## Reduced Motion

All features wrapped in:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .stagger > * { transition-delay: 0ms; }
  /* cursor glow and hover transforms also disabled */
}
```

JS checks `window.matchMedia('(prefers-reduced-motion: reduce)')` and skips count-up animation (shows final value immediately).

## Performance

- Single IntersectionObserver instance for all scroll effects
- `will-change: transform` only on actively animating elements (blobs already have it)
- Cursor glow uses CSS custom properties — no layout thrashing
- All transitions use `transform` and `opacity` only (GPU composited)

## Out of Scope

- Parallax scrolling
- Page load sequence animation
- Sound effects
- Canvas/WebGL effects
