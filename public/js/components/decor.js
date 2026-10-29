/* ==========================================================
   decor.js — ornamen vektor (kelopak, bunga 4 kelopak, bintang, ring).
   Digambar dengan SVG supaya tajam di semua ukuran, tanpa file gambar.
   ========================================================== */

import { raw } from '../util.js';

let uid = 0;

/** Kelopak tunggal (bentuk daun) */
export const petal = (cls = '', style = '') =>
  raw(`<svg class="decor decor--petal ${cls}" style="${style}" viewBox="0 0 120 200" aria-hidden="true"><path d="M60 0C112 46 124 128 60 200 -4 128 8 46 60 0Z" fill="currentColor"/></svg>`);

/** Bunga 4 kelopak (seperti pada hero & kartu Visi/Misi) */
export const flower4 = (cls = '', style = '') => {
  const id = `f4${uid++}`;
  return raw(`<svg class="decor decor--flower4 ${cls}" style="${style}" viewBox="0 0 200 200" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity="1"/><stop offset="1" stop-color="currentColor" stop-opacity=".55"/></linearGradient></defs>
    <g fill="url(#${id})">
      <path d="M100 100C70 66 66 26 96 4c8-6 16-6 20 2 18 26 4 62-16 94Z"/>
      <path d="M100 100c34-30 74-34 96-4 6 8 6 16-2 20-26 18-62 4-94-16Z"/>
      <path d="M100 100c30 34 34 74 4 96-8 6-16 6-20-2-18-26-4-62 16-94Z"/>
      <path d="M100 100c-34 30-74 34-96 4-6-8-6-16 2-20 26-18 62-4 94 16Z"/>
    </g></svg>`);
};

/** Bunga frangipani 5 kelopak (kartu "Merekah") */
export const frangipani = (cls = '', style = '') =>
  raw(`<svg class="decor decor--frangi ${cls}" style="${style}" viewBox="0 0 200 200" aria-hidden="true">
    <g fill="#fff" stroke="#f3c6c0" stroke-width="2">
      ${[0, 72, 144, 216, 288].map((r) => `<path transform="rotate(${r} 100 100)" d="M100 100C62 82 52 34 82 10c16-12 36-12 40 6 8 30-4 62-22 84Z"/>`).join('')}
    </g><circle cx="100" cy="100" r="9" fill="#fff6c8"/></svg>`);

/** Bintang 4 sudut bercahaya (kuning) */
export const sparkle = (cls = '', style = '') =>
  raw(`<svg class="decor decor--sparkle ${cls}" style="${style}" viewBox="0 0 100 100" aria-hidden="true">
    <defs><radialGradient id="spk${uid}"><stop offset="0" stop-color="#FFF59B" stop-opacity=".95"/><stop offset="1" stop-color="#FFF59B" stop-opacity="0"/></radialGradient></defs>
    <circle cx="50" cy="50" r="48" fill="url(#spk${uid++})"/>
    <path d="M50 4C53 34 66 47 96 50 66 53 53 66 50 96 47 66 34 53 4 50 34 47 47 34 50 4Z" fill="#FFF59B"/></svg>`);

/** Ring konsentris (dekorasi IMTI Center & kartu Makna) */
export const rings = (cls = '', style = '') =>
  raw(`<svg class="decor decor--rings ${cls}" style="${style}" viewBox="0 0 400 400" aria-hidden="true">
    <circle cx="200" cy="200" r="200" fill="currentColor" opacity=".38"/>
    <circle cx="200" cy="200" r="140" fill="currentColor" opacity=".38"/>
    <circle cx="200" cy="200" r="82" fill="#0565DB" opacity=".55"/></svg>`);
