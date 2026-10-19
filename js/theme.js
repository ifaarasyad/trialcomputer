/* VIP Computer Care - theme.js
   Loaded in <head> (no defer) so the saved theme is applied before the page paints. */
(function () {
  'use strict';
  var KEY = 'vip-theme';
  var root = document.documentElement;
  var theme = null;
  try { theme = localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', theme);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    function sync() {
      var dark = root.getAttribute('data-theme') === 'dark';
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', dark ? 'Light mode' : 'Dark mode');
    }
    sync();
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
      sync();
    });
  });
})();
