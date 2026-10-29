/* icons.js — ikon SVG inline (stroke mengikuti currentColor) */
import { raw } from '../util.js';

const svg = (body, vb = '0 0 24 24', extra = '') =>
  raw(`<svg class="ico" viewBox="${vb}" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`);

export const icon = {
  arrowRight: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUpRight: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
  arrowLeft: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  instagram: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'),
  tiktok: svg('<path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7"/><path d="M14 3c.3 2.4 2 4.2 4.5 4.4"/>'),
  linkedin: svg('<path d="M7 10v7M7 7v.01M11 17v-7M11 13c0-2 1.4-3 3-3s3 1 3 3v4"/>'),
  youtube: svg('<rect x="3" y="5.5" width="18" height="13" rx="4"/><path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7.5 8 6 8-6"/>'),
  email: svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7.5 8 6 8-6"/>'),
  pin: svg('<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  image: svg('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 3 3 3-3 5 5"/>'),
  user: svg('<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6"/>'),
  check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
};

/** Siluet orang untuk placeholder foto. */
export const silhouette = raw(
  `<svg class="ph__sil" viewBox="0 0 100 120" aria-hidden="true"><circle cx="50" cy="42" r="19"/><path d="M12 120c2-28 18-44 38-44s36 16 38 44z"/></svg>`
);
