# Visual Polish & Micro-interactions Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll-reveal animations, staggered entrances, hover enhancements, tab sliding indicator, number count-up, and cursor glow to kevkle.github.io.

**Architecture:** Pure CSS transitions/animations driven by ~80 lines of vanilla JS added to `main.js`. Single IntersectionObserver handles both scroll-reveal and count-up. Cursor glow uses CSS custom properties updated via mousemove. All effects respect `prefers-reduced-motion`.

**Tech Stack:** CSS transitions/animations, IntersectionObserver API, requestAnimationFrame, CSS custom properties

---

## File Structure

| File | Role | Change Type |
|------|------|-------------|
| `css/style.css` | Animation classes, hover enhancements, cursor glow, reduced motion | Modify (add ~60 lines) |
| `js/main.js` | IntersectionObserver, count-up, cursor glow, tab indicator | Modify (add ~80 lines) |
| `index.html` | Add `.reveal`, `.stagger`, `data-count`, `style="--i:N"` attributes | Modify (attribute additions) |

No new files created.

---

## Chunk 1: CSS Animation Classes & Hover Enhancements

### Task 1: Add scroll-reveal and stagger CSS classes

**Files:**
- Modify: `css/style.css:90-101` (after `.sr-only`, before `.skip-link`)

- [ ] **Step 1: Add `.reveal` and `.stagger` CSS rules**

Insert after the `.sr-only` block (line 101) and before the `.skip-link` block (line 103):

```css
/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  will-change: transform, opacity;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
  will-change: auto;
}

/* Staggered entrances */
.stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: calc(var(--i, 0) * 80ms);
}
.stagger.revealed > * {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2: Verify CSS syntax**

Open `index.html` in browser. No visible change yet (no `.reveal` classes in HTML). Confirm page still renders correctly with no CSS errors in devtools console.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add scroll-reveal and stagger CSS animation classes"
```

### Task 2: Add hover enhancements CSS

**Files:**
- Modify: `css/style.css` — multiple sections

- [ ] **Step 1: Enhance project card hover**

At `css/style.css:450` (the `.proj-card:hover` rule), add `box-shadow`:

Change:
```css
.proj-card:hover { border-color: var(--accent); transform: translateY(-3px); }
```
To:
```css
.proj-card:hover { border-color: var(--accent); transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,229,160,0.08); }
```

- [ ] **Step 2: Add pill and exp-tag hover lift**

After `.pill:hover` rule (line 332), add transform. Change:
```css
.pill:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,229,160,0.04); }
```
To:
```css
.pill:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,229,160,0.04); transform: translateY(-2px); }
```

After the `.exp-tag` block (line 438), add:
```css
.exp-tag { transition: all 0.2s; }
.exp-tag:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
```

- [ ] **Step 3: Add contact-link-icon hover slide**

After `.contact-link:hover` (line 550), add:
```css
.contact-link-icon { transition: transform 0.25s; }
.contact-link:hover .contact-link-icon { transform: translateX(4px); }
```

- [ ] **Step 4: Add impact-row hover border-left**

Change the `.impact-row` rule (line 374) from:
```css
.impact-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
}
```
To:
```css
.impact-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  border-left: 2px solid transparent;
  padding-left: 12px;
  transition: background 0.2s, border-color 0.2s;
}
.impact-row:hover { background: rgba(0,229,160,0.04); border-left-color: var(--accent); }
```

Remove the duplicate `.impact-row:hover` on line 383 since it's now merged into the rule above.

- [ ] **Step 5: Verify hover effects in browser**

Open page, hover over: project cards (shadow + lift), pills (lift), exp-tags (lift + color), contact links (icon slides right), impact rows (green left border). All should animate smoothly.

- [ ] **Step 6: Commit**

```bash
git add css/style.css
git commit -m "feat: add hover enhancements for cards, pills, tags, and impact rows"
```

### Task 3: Add cursor glow CSS

**Files:**
- Modify: `css/style.css` — `.contact-link` and new `::before` rules

- [ ] **Step 1: Add `position: relative; overflow: hidden` to `.contact-link`**

Change `.contact-link` (line 549) from:
```css
.contact-link { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: var(--card); border: 1px solid var(--border); text-decoration: none; color: var(--text); transition: all 0.25s; }
```
To:
```css
.contact-link { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: var(--card); border: 1px solid var(--border); text-decoration: none; color: var(--text); transition: all 0.25s; position: relative; overflow: hidden; }
```

- [ ] **Step 2: Add `::before` glow pseudo-element**

After the `.contact-link-val` rule (line 552), add:

```css
/* Cursor glow */
.proj-card::before,
.contact-link::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(250px circle at var(--mx) var(--my), rgba(0,229,160,0.06), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.proj-card:hover::before,
.contact-link:hover::before {
  opacity: 1;
}
```

- [ ] **Step 3: Verify no visual regression**

Open page, confirm project cards and contact links render correctly. The glow won't work yet (needs JS), but `::before` should be invisible until hover, and the existing `::after` left bar on proj-card must still work.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: add cursor glow CSS for project cards and contact links"
```

### Task 4: Add tab sliding indicator CSS

**Files:**
- Modify: `css/style.css` — `.tabs-wrap` and `.tab-btn[aria-selected="true"]`

- [ ] **Step 1: Add `position: relative` to `.tabs-wrap` and create `::after` indicator**

Change `.tabs-wrap` (line 258) from:
```css
.tabs-wrap {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
}
```
To:
```css
.tabs-wrap {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
  position: relative;
}
.tabs-wrap::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  width: var(--tab-width, 0);
  transform: translateX(var(--tab-left, 0));
  transition: transform 0.3s ease, width 0.3s ease;
  pointer-events: none;
}
```

- [ ] **Step 2: Hide the per-tab border-bottom**

Change `.tab-btn[aria-selected="true"]` (line 283) from:
```css
.tab-btn[aria-selected="true"] { color: var(--accent); border-bottom-color: var(--accent); }
```
To:
```css
.tab-btn[aria-selected="true"] { color: var(--accent); border-bottom-color: transparent; }
```

- [ ] **Step 3: Verify tab bar renders**

Open page. The sliding indicator won't position correctly yet (needs JS to set `--tab-left` and `--tab-width`), but the tab bar should render without visual breakage. The green underline on the active tab will be gone — replaced by the `::after` once JS runs.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: add tab sliding indicator CSS with transition"
```

### Task 5: Add reduced-motion overrides

**Files:**
- Modify: `css/style.css` — the `@media (prefers-reduced-motion: reduce)` block (line 595)

- [ ] **Step 1: Replace the existing reduced-motion block**

Change (lines 595-602):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```
To:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; will-change: auto; }
  .stagger > * { opacity: 1; transform: none; transition: none; }
  .stagger.revealed > * { opacity: 1; transform: none; }
  .proj-card::before,
  .contact-link::before { display: none; }
  .pill:hover,
  .exp-tag:hover { transform: none; }
  .contact-link-icon { transition: none; }
  .impact-row { transition: none; }
  .tabs-wrap::after { transition: none; }
}
```

- [ ] **Step 2: Verify reduced-motion in devtools**

In Chrome DevTools: Rendering > Emulate CSS media feature `prefers-reduced-motion: reduce`. All elements should appear immediately with no animation. Cursor glow `::before` should be hidden.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add reduced-motion overrides for all animation features"
```

---

## Chunk 2: HTML Attribute Additions

### Task 6: Add `.reveal` classes to index.html elements

**Files:**
- Modify: `index.html` — add `class="reveal"` to specified elements

- [ ] **Step 1: Add `.reveal` to About panel elements**

Add `reveal` class to the following elements:

1. Each `.impact-row` (lines 100, 107, 114, 121, 128) — add `class="impact-row reveal"`
2. Each `.about-body` paragraph (lines 137, 140, 143) — add `class="about-body reveal"`
3. The `.currently-building` div (line 150) — the parent `<div>` wrapping it doesn't need reveal, but the `.currently-building` itself: add `class="currently-building reveal"`

- [ ] **Step 2: Add `.reveal` to Experience panel elements**

Each `.exp-item` (lines 183, 204, 222) — add `class="exp-item reveal"`

- [ ] **Step 3: Add `.reveal` to Projects panel elements**

Each `.proj-card` (lines 248, 267, 286, 301) — add `class="proj-card reveal"`

- [ ] **Step 4: Add `.reveal` to Education panel elements**

Each `.edu-item` (lines 324, 336) — add `class="edu-item reveal"`

- [ ] **Step 5: Add `.reveal` to Connect panel elements**

1. `.contact-links` container (line 358) — add `class="contact-links reveal"`
2. `.lang-grid` (line 368) — add `class="lang-grid reveal"`

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add .reveal classes to all scroll-animated elements"
```

### Task 7: Add `.stagger` and `--i` attributes for staggered entrances

**Files:**
- Modify: `index.html` — pill-row, exp-tags, contact-links

- [ ] **Step 1: Add stagger to About pill-row**

The `.pill-row` in About section (line 155). Change:
```html
<div class="pill-row">
```
To:
```html
<div class="pill-row reveal stagger">
```

Add `style="--i:0"` through `style="--i:17"` to each of the 18 `<span class="pill">` children (lines 156-173), incrementing by 1 for each pill.

- [ ] **Step 2: Add stagger to experience exp-tags**

For each `.exp-tags` container (lines 198, 216, 234), add `class="exp-tags stagger reveal"` and `style="--i:N"` to each child `<span class="exp-tag">`, starting from 0.

X-cardiac tags (line 198-200): 5 tags → `--i:0` through `--i:4`
4flow first (line 216-218): 4 tags → `--i:0` through `--i:3`
BDO (line 234-236): 3 tags → `--i:0` through `--i:2`

- [ ] **Step 3: Add stagger to project card exp-tags**

For each `.exp-tags` in project cards (lines 262, 281, 296, 311), add `class="exp-tags stagger reveal"` and `style="--i:N"` to children.

Clinical agent (line 262-264): 19 tags → `--i:0` through `--i:18`
Complication prediction (line 281-283): 12 tags → `--i:0` through `--i:11`
Doc extraction (line 296-298): 5 tags → `--i:0` through `--i:4`
Email classification (line 311-313): 6 tags → `--i:0` through `--i:5`

- [ ] **Step 4: Add stagger to contact-links**

The `.contact-links` container (line 358). Change to `class="contact-links reveal stagger"` and add `style="--i:N"` to each child (5 children: `--i:0` through `--i:4`).

- [ ] **Step 5: Add stagger to Connect pill-row**

The interests `.pill-row` (line 374). Change to `class="pill-row reveal stagger"` and add `style="--i:0"` through `--i:2` to the 3 pills.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add .stagger classes and --i delay indices to HTML"
```

### Task 8: Add `data-count` attributes to impact numbers

**Files:**
- Modify: `index.html` — impact-num spans

- [ ] **Step 1: Add data-count to numeric impact numbers**

Line 101 — change:
```html
<span class="impact-num">8+</span>
```
To:
```html
<span class="impact-num" data-count="8" data-suffix="+">8+</span>
```

Line 108 — change:
```html
<span class="impact-num impact-num--white">6h</span>
```
To:
```html
<span class="impact-num impact-num--white" data-count="6" data-suffix="h">6h</span>
```

Line 115 — change:
```html
<span class="impact-num impact-num--white">40%</span>
```
To:
```html
<span class="impact-num impact-num--white" data-count="40" data-suffix="%">40%</span>
```

Lines 122 (`PROD`) and 129 (`ETH<br>Zürich`) — no change (not numeric).

- [ ] **Step 2: Verify HTML is valid**

Open page in browser. Numbers should display normally (8+, 6h, 40%). No visual change yet — JS hasn't been added.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add data-count and data-suffix attributes to impact numbers"
```

---

## Chunk 3: JavaScript Implementation

### Task 9: Add IntersectionObserver for scroll-reveal

**Files:**
- Modify: `js/main.js` — inside the IIFE and `DOMContentLoaded` handler

All line numbers below refer to the **original** `main.js` before any Task 9-12 modifications. Reference by surrounding code context, not line numbers.

- [ ] **Step 1: Add reduced-motion check and IntersectionObserver**

At the end of the `DOMContentLoaded` callback (after `setFooterYear();`), add:

```javascript
    // ----------------------------------------------------------------
    // Scroll reveal & count-up
    // ----------------------------------------------------------------

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el = entry.target;

        if (el.dataset.count !== undefined) {
          // Count-up animation (Task 11)
          countUp(el, prefersReducedMotion);
        } else {
          el.classList.add('revealed');
        }

        revealObserver.unobserve(el);
      });
    }, { threshold: 0.15 });

    // Observe all .reveal elements
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    // Observe all [data-count] elements
    var countEls = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    countEls.forEach(function (el) { revealObserver.observe(el); });
```

Note: `countUp` function will be added in Task 11. For now, add a stub above the `DOMContentLoaded` handler:

```javascript
  /** Count-up animation — implemented in Task 11 */
  function countUp(el, skipAnimation) {
    el.classList.add('revealed');
  }
```

- [ ] **Step 2: Verify scroll reveal works**

Open page. Scroll down — elements should fade in and slide up as they enter the viewport. Elements already in viewport should animate on page load.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add IntersectionObserver for scroll-reveal animations"
```

### Task 10: Add tab sliding indicator JS

**Files:**
- Modify: `js/main.js` — inside `DOMContentLoaded`, after tab setup

- [ ] **Step 1: Add `updateTabIndicator` function and calls**

Add helper function (inside the IIFE, before `DOMContentLoaded`):

```javascript
  /** Position the sliding tab indicator */
  function updateTabIndicator(tab) {
    var wrap = tab.closest('.tabs-wrap');
    if (!wrap) return;
    wrap.style.setProperty('--tab-left', tab.offsetLeft + 'px');
    wrap.style.setProperty('--tab-width', tab.offsetWidth + 'px');
  }
```

Then add `updateTabIndicator` calls in **all 5 places** that switch tabs:

1. After `setActive(initial, tabEls, panelEls);` (initial tab setup), add:
```javascript
    updateTabIndicator(initial);
```

2. Inside the tab click handler, after `focusPanel(tab);`, add:
```javascript
        updateTabIndicator(tab);
```

3. Inside `buildKeyHandler`, after `syncHash(next);`, add:
```javascript
        updateTabIndicator(next);
```

4. Inside the `.panel-nav-link[data-tab]` click handler, after `focusPanel(targetTab);`, add:
```javascript
          updateTabIndicator(targetTab);
```

5. Inside the `.proj-link[data-tab]` click handler, after `syncHash(targetTab);`, add:
```javascript
          updateTabIndicator(targetTab);
```

- [ ] **Step 2: Verify tab indicator**

Open page. The green 2px indicator under the active tab should be visible. Click different tabs — indicator should slide smoothly. Use keyboard arrows — same smooth slide.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add tab sliding indicator JS positioning"
```

### Task 11: Implement count-up animation

**Files:**
- Modify: `js/main.js` — replace `countUp` stub

- [ ] **Step 1: Replace the countUp stub with full implementation**

Replace the stub `countUp` function with:

```javascript
  /** Animate a number counting up from 0 to data-count value */
  function countUp(el, skipAnimation) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';

    if (skipAnimation || isNaN(target)) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1200; // ms
    var start = null;

    el.textContent = '0' + suffix;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // Ease-out: 1 - (1 - p)^3
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }
```

- [ ] **Step 2: Verify count-up animation**

Open page. Scroll the About panel into view — numbers 8+, 6h, 40% should animate counting up from 0. PROD and ETH Zürich should remain static.

- [ ] **Step 3: Test reduced motion**

In DevTools: Rendering > Emulate `prefers-reduced-motion: reduce`. Reload. Numbers should show final values immediately without animation.

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "feat: implement count-up animation for impact numbers"
```

### Task 12: Add cursor glow JS

**Files:**
- Modify: `js/main.js` — inside `DOMContentLoaded`, after the observer setup

- [ ] **Step 1: Add cursor glow event listeners**

At the end of the `DOMContentLoaded` callback, add:

```javascript
    // ----------------------------------------------------------------
    // Cursor glow
    // ----------------------------------------------------------------

    if (!prefersReducedMotion) {
      var glowTargets = Array.prototype.slice.call(
        document.querySelectorAll('.proj-card, .contact-link')
      );

      glowTargets.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
          var rect = el.getBoundingClientRect();
          el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
          el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
      });
    }
```

**Note:** The spec describes a `mouseenter`/`mouseleave` pattern for starting/stopping tracking. This simplified approach uses a persistent `mousemove` listener instead, which is functionally equivalent because the CSS `::before` opacity is 0 when not hovering — the JS runs but has no visual effect. This avoids extra listener management overhead.

- [ ] **Step 2: Verify cursor glow**

Open page, navigate to Projects tab. Hover over a project card — a subtle green radial glow should follow the cursor. Same for contact links in the Connect tab. The glow should fade in on hover and follow mouse movement.

- [ ] **Step 3: Verify glow respects reduced motion**

Emulate `prefers-reduced-motion: reduce` in DevTools. No glow should appear (CSS hides `::before` via `display: none`, and JS skips event listener setup).

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "feat: add cursor glow effect for project cards and contact links"
```

---

## Chunk 4: Final Verification & Cleanup

### Task 13: Full visual verification

**Files:** None modified — verification only

- [ ] **Step 1: Test scroll reveal on all panels**

Navigate to each tab. Scroll through content. Verify these elements fade in:
- About: impact rows, paragraphs, currently-building box, pill-row (staggered)
- Experience: exp-items, exp-tags (staggered)
- Projects: proj-cards, exp-tags (staggered)
- Education: edu-items
- Connect: contact-links (staggered), lang-grid

- [ ] **Step 2: Test hover effects**

Verify:
- Project cards: lift + shadow + green border + left bar + cursor glow
- Pills: lift + color change
- Exp-tags: lift + color change
- Contact links: icon slides right + cursor glow
- Impact rows: green left border

- [ ] **Step 3: Test tab indicator**

Click through all 5 tabs. Verify indicator slides smoothly. Test keyboard navigation (arrow keys). Verify indicator positions correctly on page load.

- [ ] **Step 4: Test count-up**

Reload page. Scroll to About panel impact numbers. Verify 8+, 6h, 40% animate. PROD and ETH Zürich remain static.

- [ ] **Step 5: Test responsive**

Test at 375px, 480px, 768px, 1440px. Verify no overflow, no layout break, animations still work.

- [ ] **Step 6: Test reduced motion**

Enable `prefers-reduced-motion: reduce`. Verify: all elements visible immediately, no animations, no cursor glow, count-up shows final values, tab indicator jumps (no transition).

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: visual polish complete — scroll reveal, stagger, hover, tab indicator, count-up, cursor glow"
```
