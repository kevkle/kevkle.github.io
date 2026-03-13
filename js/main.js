/**
 * Kevin Klein — Portfolio
 * js/main.js
 *
 * Handles:
 *   - ARIA tab switching (roving tabindex)
 *   - Arrow-key / Home / End keyboard navigation
 *   - Hash-based deep-linking (#about, #experience, …)
 *   - Active-tab CSS via aria-selected attribute
 *   - Focus management on tab switch
 *   - Footer copyright year
 */

'use strict';

(function () {
  // ----------------------------------------------------------------
  // Helpers
  // ----------------------------------------------------------------

  /** Callback invoked after a tab switch; set later by scroll-reveal init */
  var afterTabSwitch = null;

  /** Cached references, set during init */
  var allTabs = [];
  var allPanels = [];

  /** @param {HTMLElement} tab */
  function setActive(tab) {
    // Deactivate all
    allTabs.forEach(function (t) {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    allPanels.forEach(function (p) {
      p.setAttribute('hidden', '');
    });

    // Activate chosen tab
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');

    var panelId = tab.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);
    if (panel) {
      panel.removeAttribute('hidden');
    }

    if (afterTabSwitch) {
      requestAnimationFrame(afterTabSwitch);
    }
  }

  /** Full tab switch: activate, sync hash, focus panel, update indicator */
  function activateTab(tab) {
    setActive(tab);
    syncHash(tab);
    var panelId = tab.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);
    if (panel) {
      panel.focus();
    }
    updateTabIndicator(tab);
  }

  // ----------------------------------------------------------------
  // Hash routing
  // ----------------------------------------------------------------

  /** Return the tab matching the current URL hash, or null. */
  function tabFromHash() {
    var hash = window.location.hash.slice(1); // e.g. "experience"
    if (!hash) return null;
    return allTabs.find(function (t) { return t.id === 'tab-' + hash; }) || null;
  }

  /** Persist the active tab to the URL hash (no scroll jump). */
  function syncHash(tab) {
    var panelId = tab.getAttribute('aria-controls'); // "panel-about"
    var section = panelId.replace('panel-', '');     // "about"
    var newHash = '#' + section;
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
  }

  // ----------------------------------------------------------------
  // Keyboard navigation (WAI-ARIA Tabs pattern)
  // ----------------------------------------------------------------

  function buildKeyHandler() {
    return function (e) {
      var idx = allTabs.indexOf(e.currentTarget);
      var next = null;

      switch (e.key) {
        case 'ArrowRight':
          next = allTabs[(idx + 1) % allTabs.length];
          break;
        case 'ArrowLeft':
          next = allTabs[(idx - 1 + allTabs.length) % allTabs.length];
          break;
        case 'Home':
          next = allTabs[0];
          break;
        case 'End':
          next = allTabs[allTabs.length - 1];
          break;
        default:
          return; // let other keys propagate normally
      }

      if (next) {
        e.preventDefault();
        next.focus();
        activateTab(next);
      }
    };
  }

  // ----------------------------------------------------------------
  // Count-up animation
  // ----------------------------------------------------------------

  /** Animate a number counting up from 0 to data-count value */
  function countUp(el, skipAnimation) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';

    if (isNaN(target)) return;
    el._countedUp = true;

    if (skipAnimation) {
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

  // ----------------------------------------------------------------
  // Tab sliding indicator
  // ----------------------------------------------------------------

  /** Position the sliding tab indicator */
  function updateTabIndicator(tab) {
    requestAnimationFrame(function () {
      var wrap = tab.closest('.tabs-wrap');
      if (!wrap) return;
      wrap.style.setProperty('--tab-left', tab.offsetLeft + 'px');
      wrap.style.setProperty('--tab-width', tab.offsetWidth + 'px');
    });
  }

  // ----------------------------------------------------------------
  // Footer year
  // ----------------------------------------------------------------

  function setFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }

  // ----------------------------------------------------------------
  // Init
  // ----------------------------------------------------------------

  document.addEventListener('DOMContentLoaded', function () {
    allTabs   = Array.from(document.querySelectorAll('[role="tab"]'));
    allPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    if (!allTabs.length) return;

    var keyHandler = buildKeyHandler();

    allTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab);
      });
      tab.addEventListener('keydown', keyHandler);
    });

    // Activate from hash or fall back to "About"
    var initial = tabFromHash()
      || allTabs.find(function (t) { return t.id === 'tab-about'; })
      || allTabs[0];

    setActive(initial);
    updateTabIndicator(initial);
    // Don't write a hash on first load if there isn't one already
    if (window.location.hash) {
      syncHash(initial);
    }

    // In-panel navigation links (e.g. "Full work history in Experience →")
    var navLinks = Array.from(document.querySelectorAll('.panel-nav-link[data-tab]'));
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetTab = document.getElementById(link.getAttribute('data-tab'));
        if (targetTab) {
          activateTab(targetTab);
        }
      });
    });

    // Project cross-links from Experience bullets
    var projLinks = Array.from(
      document.querySelectorAll('.proj-link[data-tab]')
    );
    projLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetTab = document.getElementById(link.getAttribute('data-tab'));
        if (targetTab) {
          activateTab(targetTab);
          var projectId = link.getAttribute('data-project');
          if (projectId) {
            requestAnimationFrame(function () {
              var card = document.getElementById(projectId);
              if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.borderColor = 'var(--accent)';
                setTimeout(function () { card.style.borderColor = ''; }, 1500);
              }
            });
          }
        }
      });
    });

    // Reposition tab indicator on window resize
    window.addEventListener('resize', function () {
      var active = document.querySelector('[role="tab"][aria-selected="true"]');
      if (active) updateTabIndicator(active);
    });

    setFooterYear();

    // ----------------------------------------------------------------
    // Scroll reveal & count-up
    // ----------------------------------------------------------------

    var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el = entry.target;

        if (el.dataset.count !== undefined) {
          countUp(el, reducedMotionQuery.matches);
        } else {
          el.classList.add('revealed');
        }

        revealObserver.unobserve(el);
      });
    }, { threshold: 0.15 });

    /** Observe reveal/count-up elements; re-observe on tab switch for hidden panels */
    function observeRevealElements() {
      var revealEls = Array.from(document.querySelectorAll('.reveal:not(.revealed)'));
      revealEls.forEach(function (el) { revealObserver.observe(el); });

      var countEls = Array.from(document.querySelectorAll('[data-count]'));
      countEls.forEach(function (el) {
        if (!el._countedUp) revealObserver.observe(el);
      });
    }

    observeRevealElements();

    // Re-observe when panels become visible (hidden panels don't intersect)
    afterTabSwitch = observeRevealElements;

    // ----------------------------------------------------------------
    // Cursor glow
    // ----------------------------------------------------------------

    if (!reducedMotionQuery.matches) {
      var glowTargets = Array.from(
        document.querySelectorAll('.proj-card, .contact-link')
      );

      glowTargets.forEach(function (el) {
        var pending = false;
        el.addEventListener('mousemove', function (e) {
          if (pending) return;
          pending = true;
          requestAnimationFrame(function () {
            var rect = el.getBoundingClientRect();
            el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
            el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
            pending = false;
          });
        });
      });
    }
  });
}());
