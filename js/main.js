/**
 * Kevin Klein — Portfolio
 * js/main.js
 *
 * Handles:
 *   - ARIA tab switching (roving tabindex)
 *   - Arrow-key / Home / End keyboard navigation
 *   - Hash-based deep-linking (#about, #experience, …)
 *   - Active-tab CSS class toggling
 *   - Footer copyright year
 */

'use strict';

(function () {
  // ----------------------------------------------------------------
  // Helpers
  // ----------------------------------------------------------------

  /** @param {HTMLElement} tab */
  function setActive(tab, tabs, panels) {
    // Deactivate all
    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      t.classList.remove('tab-btn--active');
    });
    panels.forEach(function (p) {
      p.setAttribute('hidden', '');
    });

    // Activate chosen tab
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.classList.add('tab-btn--active');

    var panelId = tab.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);
    if (panel) {
      panel.removeAttribute('hidden');
    }
  }

  // ----------------------------------------------------------------
  // Hash routing
  // ----------------------------------------------------------------

  /**
   * Return the tab matching the current URL hash, or null.
   * @param {HTMLElement[]} tabs
   */
  function tabFromHash(tabs) {
    var hash = window.location.hash.slice(1); // e.g. "experience"
    if (!hash) return null;
    return tabs.find(function (t) { return t.id === 'tab-' + hash; }) || null;
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

  function buildKeyHandler(tabs, panels) {
    return function (e) {
      var idx = tabs.indexOf(e.currentTarget);
      var next = null;

      switch (e.key) {
        case 'ArrowRight':
          next = tabs[(idx + 1) % tabs.length];
          break;
        case 'ArrowLeft':
          next = tabs[(idx - 1 + tabs.length) % tabs.length];
          break;
        case 'Home':
          next = tabs[0];
          break;
        case 'End':
          next = tabs[tabs.length - 1];
          break;
        default:
          return; // let other keys propagate normally
      }

      if (next) {
        e.preventDefault();
        next.focus();
        setActive(next, tabs, panels);
        syncHash(next);
      }
    };
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
    var tabEls   = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    var panelEls = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));

    if (!tabEls.length) return;

    var keyHandler = buildKeyHandler(tabEls, panelEls);

    tabEls.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActive(tab, tabEls, panelEls);
        syncHash(tab);
      });
      tab.addEventListener('keydown', keyHandler);
    });

    // Activate from hash or fall back to "About"
    var initial = tabFromHash(tabEls)
      || tabEls.find(function (t) { return t.id === 'tab-about'; })
      || tabEls[0];

    setActive(initial, tabEls, panelEls);
    // Don't write a hash on first load if there isn't one already
    if (window.location.hash) {
      syncHash(initial);
    }

    setFooterYear();
  });
}());
