/* ==========================================================
   util.js — helper kecil yang dipakai di seluruh website
   ========================================================== */

const RAW = Symbol('raw');

/** Tandai string sebagai HTML tepercaya (tidak di-escape). */
export const raw = (s) => ({ [RAW]: true, s: String(s) });

export const esc = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function toStr(v) {
  if (v == null || v === false || v === true) return '';
  if (Array.isArray(v)) return v.map(toStr).join('');
  if (typeof v === 'object' && v[RAW]) return v.s;
  return esc(v);
}

/** Template tag: semua nilai yang disisipkan otomatis di-escape, kecuali hasil html`` / raw(). */
export function html(strings, ...vals) {
  let out = '';
  strings.forEach((s, i) => {
    out += s;
    if (i < vals.length) out += toStr(vals[i]);
  });
  return raw(out);
}

export const unwrap = (v) => (v && v[RAW] ? v.s : String(v ?? ''));

/** Mini-markup untuk teks berformat:  **tebal**  ==kuning tebal-miring==  __miring__ */
export function rich(str) {
  const s = esc(str)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/==(.+?)==/g, '<em class="hl">$1</em>')
    .replace(/__(.+?)__/g, '<em>$1</em>');
  return raw(s);
}

/**
 * Judul bergaya campuran (sans tebal + serif miring).
 *   plain      -> Plus Jakarta Sans tebal
 *   *teks*     -> Libre Baskerville miring
 *   ~teks~     -> Plus Jakarta Sans tebal miring
 *   &          -> ampersand abu-abu (serif miring)
 */
export function mix(str) {
  const parts = String(str).split(/(\*[^*]+\*|~[^~]+~|&)/g).filter((p) => p !== '');
  return raw(
    parts
      .map((p) => {
        if (p === '&') return '<i class="amp">&amp;</i>';
        if (p[0] === '*') return `<i class="ts">${esc(p.slice(1, -1))}</i>`;
        if (p[0] === '~') return `<span class="tbi">${esc(p.slice(1, -1))}</span>`;
        return esc(p);
      })
      .join('')
  );
}

/** Beberapa baris judul -> <span class="line">…</span> per baris. */
export const mixLines = (lines) => raw(lines.map((l) => `<span class="line">${mix(l).s}</span>`).join(''));

/**
 * Atribut <a> untuk sebuah URL:
 *  '#'        -> belum diisi: klik menampilkan toast "segera hadir"
 *  http(s)    -> buka di tab baru
 *  lainnya    -> biasa (mailto:, link internal)
 */
export function linkAttrs(href) {
  if (!href || href === '#') return raw('href="#" data-todo');
  if (/^https?:/i.test(href)) return raw(`href="${esc(href)}" target="_blank" rel="noopener noreferrer"`);
  return raw(`href="${esc(href)}"`);
}

export const slugify = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' dan ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function raf(fn) {
  let id = 0;
  return (...a) => {
    cancelAnimationFrame(id);
    id = requestAnimationFrame(() => fn(...a));
  };
}

export function debounce(fn, ms = 120) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
