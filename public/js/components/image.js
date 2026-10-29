/* ==========================================================
   image.js — "bingkai" foto.
   - Mencari file di /assets/<key>.<ext> (jpg → png → webp …)
   - Kalau file belum ada: coba key cadangan (fallbacks), lalu tampilkan
     placeholder yang rapi + path file yang harus diisi (hover = tooltip).
   ========================================================== */

import { html, raw, esc } from '../util.js';
import { urls, EXT, primaryPath } from '../assets.js';
import { icon, silhouette } from './icons.js';

/**
 * @param {object} o
 * @param {string} o.key        key aset, mis. 'bidang/humas/team'
 * @param {'photo'|'cut'|'logo'} [o.kind]
 * @param {string[]} [o.fallbacks] key cadangan (urut)
 * @param {'photo'|'person'|'logo'} [o.variant] bentuk placeholder
 * @param {string} [o.cls]
 * @param {string} [o.pos]      object-position
 * @param {'cover'|'contain'} [o.fit]
 * @param {boolean} [o.eager]
 * @param {boolean} [o.label]   tampilkan path di placeholder (untuk bingkai besar)
 */
export function ph(o) {
  const { key, kind = 'photo', fallbacks = [], variant = 'photo', cls = '', pos = 'center', fit = 'cover', eager = false, label = false, alt = '' } = o;
  const first = urls(key, kind)[0];
  const keys = [key, ...fallbacks].join('|');
  return html`<span class="ph ph--${variant} ph--${fit} ${label ? 'ph--lbl' : ''} ${cls}" data-ph data-keys="${keys}" data-kind="${kind}" data-n="0">
    <span class="ph__fallback" aria-hidden="true">
      ${variant === 'person' ? silhouette : icon.image}
      <span class="ph__path">${primaryPath(key, kind).replace('public/', '')}</span>
    </span>
    <img class="ph__img" src="${first}" alt="${alt}" style="object-position:${pos}" ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false" />
  </span>`;
}

/** Hitung semua URL kandidat untuk sebuah bingkai (key utama + cadangan × ekstensi). */
function candidates(frame) {
  const kind = frame.dataset.kind;
  return frame.dataset.keys
    .split('|')
    .flatMap((k) => EXT[kind].map((e) => `/assets/${k}.${e}`));
}

let started = false;
export function initImages() {
  if (started) return;
  started = true;

  // `error` tidak bubbling → pakai capture di document.
  document.addEventListener(
    'error',
    (e) => {
      const el = e.target;
      if (!(el instanceof HTMLImageElement) || !el.classList.contains('ph__img')) return;
      const frame = el.closest('[data-ph]');
      if (!frame) return;
      const list = candidates(frame);
      const n = Number(frame.dataset.n) + 1;
      if (n < list.length) {
        frame.dataset.n = n;
        el.src = list[n];
      } else {
        frame.classList.add('is-missing');
        frame.title = `Belum ada gambar → isi file: ${primaryPath(frame.dataset.keys.split('|')[0], frame.dataset.kind).replace('public/', '')}`;
        el.removeAttribute('src');
      }
    },
    true
  );

  document.addEventListener(
    'load',
    (e) => {
      const el = e.target;
      if (!(el instanceof HTMLImageElement) || !el.classList.contains('ph__img')) return;
      el.closest('[data-ph]')?.classList.add('is-loaded');
    },
    true
  );
}

/** Untuk gambar yang sudah ter-cache sebelum listener terpasang. */
export function settleImages(root = document) {
  root.querySelectorAll('[data-ph] .ph__img').forEach((el) => {
    if (el.complete && el.naturalWidth > 0) el.closest('[data-ph]').classList.add('is-loaded');
  });
}
