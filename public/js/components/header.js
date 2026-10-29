/* ==========================================================
   header.js — header putih "melayang" di atas semua halaman.
   - Pill putih, selalu tampil di atas konten (position: fixed)
   - Indikator aktif (navy) meluncur antar menu, indikator hover (biru muda) mengikuti kursor
   - Mobile: tombol burger + panel menu
   ========================================================== */

import { html } from '../util.js';
import { nav } from '../data/site.js';
import { ph } from './image.js';
import { logoMark } from './decor.js';
import { icon } from './icons.js';

export function headerMarkup() {
  return html`
    <div class="site-header__bar">
      <a class="brand" href="/" data-link aria-label="IMTI FTUI 2026 — kembali ke beranda">
        <span class="brand__mark">
          ${logoMark}
          ${ph({ key: 'brand/logo-header', kind: 'logo', variant: 'logo', cls: 'ph--silent brand__img', fit: 'contain', eager: true })}
        </span>
        <span class="brand__name">IMTI FTUI 2026</span>
      </a>

      <nav class="nav" aria-label="Navigasi utama">
        <span class="nav__ink nav__ink--hover" aria-hidden="true"></span>
        <span class="nav__ink nav__ink--active" aria-hidden="true"></span>
        ${nav.map((n) => html`<a class="nav__link" href="${n.href}" data-link data-nav="${n.key}">${n.label}</a>`)}
      </nav>

      <button class="burger" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="mobile-nav">
        <span class="burger__open">${icon.menu}</span><span class="burger__close">${icon.close}</span>
      </button>
    </div>
    <div class="mobile-nav" id="mobile-nav" hidden>
      <div class="mobile-nav__inner">
        ${nav.map((n, i) => html`<a class="mobile-nav__link" style="--i:${i}" href="${n.href}" data-link data-nav="${n.key}">${n.label}</a>`)}
      </div>
    </div>`;
}

export function initHeader(root) {
  root.innerHTML = headerMarkup().s;
  const navEl = root.querySelector('.nav');
  const links = [...navEl.querySelectorAll('.nav__link')];
  const burger = root.querySelector('.burger');
  const panel = root.querySelector('.mobile-nav');
  let activeKey = null;
  let ready = false;

  const place = (el, prefix) => {
    if (!el) return;
    navEl.style.setProperty(`--${prefix}x`, `${el.offsetLeft}px`);
    navEl.style.setProperty(`--${prefix}w`, `${el.offsetWidth}px`);
    navEl.style.setProperty(`--${prefix}h`, `${el.offsetHeight}px`);
    navEl.style.setProperty(`--${prefix}y`, `${el.offsetTop}px`);
  };

  const setActive = (key) => {
    activeKey = key;
    root.querySelectorAll('[data-nav]').forEach((a) => {
      const on = a.dataset.nav === key;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    const target = links.find((a) => a.dataset.nav === key);
    navEl.classList.toggle('has-active', !!target);
    if (target) place(target, 'a');
    if (!ready) {
      requestAnimationFrame(() => requestAnimationFrame(() => navEl.classList.add('is-ready')));
      ready = true;
    }
  };

  links.forEach((a) => {
    a.addEventListener('pointerenter', () => {
      place(a, 'h');
      navEl.classList.add('has-hover');
    });
    a.addEventListener('focus', () => {
      place(a, 'h');
      navEl.classList.add('has-hover');
    });
  });
  navEl.addEventListener('pointerleave', () => navEl.classList.remove('has-hover'));
  navEl.addEventListener('focusout', () => navEl.classList.remove('has-hover'));

  const setOpen = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    root.classList.toggle('is-open', open);
    if (open) {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('is-in'));
    } else {
      panel.classList.remove('is-in');
      setTimeout(() => {
        if (!root.classList.contains('is-open')) panel.hidden = true;
      }, 320);
    }
  };
  burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('click', (e) => e.target.closest('a') && setOpen(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));

  const onScroll = () => root.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  window.addEventListener('resize', () => {
    const t = links.find((a) => a.dataset.nav === activeKey);
    if (t) place(t, 'a');
    if (window.innerWidth > 860) setOpen(false);
  });
  // font selesai dimuat → ukur ulang posisi indikator
  document.fonts?.ready.then(() => {
    const t = links.find((a) => a.dataset.nav === activeKey);
    if (t) place(t, 'a');
  });

  return { setActive, close: () => setOpen(false) };
}
