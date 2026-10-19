/* VIP Computer Care - main.js (no libraries, no inline scripts) */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Service popup (About page) ---------- */
  var dlg = document.getElementById('service-modal');
  if (dlg && typeof dlg.showModal === 'function') {
    var mTitle = dlg.querySelector('[data-m-title]');
    var mDesc = dlg.querySelector('[data-m-desc]');
    var mIcon = dlg.querySelector('[data-m-icon]');
    var mBadge = dlg.querySelector('.modal-badge');
    document.querySelectorAll('[data-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        mTitle.textContent = btn.dataset.title;
        mDesc.textContent = btn.dataset.desc;
        mIcon.setAttribute('href', 'images/icons.svg#' + btn.dataset.icon);
        mBadge.className = 'modal-badge ' + (btn.dataset.color || '');
        dlg.showModal();
      });
    });
    dlg.querySelector('[data-m-close]').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  }

  /* ---------- Testimonials slider (touch, mouse drag, arrow keys) ---------- */
  var slider = document.querySelector('[data-slider]');
  if (slider) {
    var track = slider.querySelector('.slider-track');
    var slides = Array.prototype.slice.call(track.children);
    var dots = slider.querySelector('.slider-dots');
    var prev = slider.querySelector('[data-prev]');
    var next = slider.querySelector('[data-next]');

    var step = function () {
      return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
    };
    var current = function () { return Math.round(track.scrollLeft / step()); };
    var goTo = function (i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: i * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    var update = function () {
      var c = current();
      Array.prototype.forEach.call(dots.children, function (d, i) {
        d.classList.toggle('is-active', i === c);
        if (i === c) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); }
      });
      prev.disabled = c <= 0;
      next.disabled = c >= slides.length - 1;
      prev.style.opacity = prev.disabled ? '.4' : '1';
      next.style.opacity = next.disabled ? '.4' : '1';
    };

    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to review ' + (i + 1));
      b.addEventListener('click', function () { goTo(i); });
      dots.appendChild(b);
    });

    prev.addEventListener('click', function () { goTo(current() - 1); });
    next.addEventListener('click', function () { goTo(current() + 1); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);

    /* Mouse drag (touch uses native swipe) */
    var down = false, startX = 0, startLeft = 0;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', function (e) {
      if (down) track.scrollLeft = startLeft - (e.clientX - startX);
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      track.classList.remove('is-dragging');
      goTo(current());
    });

    /* Keyboard: left / right arrow while the slider is on screen */
    var visible = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }, { threshold: 0.3 }).observe(slider);
    } else { visible = true; }
    document.addEventListener('keydown', function (e) {
      if (!visible) return;
      var t = e.target && e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current() + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current() - 1); }
    });

    update();
  }
})();
