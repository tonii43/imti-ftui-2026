/* ==========================================================
   Halaman: Dashboard — PLACEHOLDER
   Layout Dashboard belum ada di folder desain. Halaman ini sengaja dibuat
   sederhana ("segera hadir") agar menu & tombol "Lihat dashboard" tidak mati.
   ========================================================== */

import { html } from '../util.js';
import { ph } from '../components/image.js';
import { icon } from '../components/icons.js';
import { flower4, sparkle } from '../components/decor.js';

export default {
  name: 'dashboard',
  nav: 'dashboard',
  meta: () => ({ title: 'Dashboard', description: 'Dashboard IMTI FTUI 2026 — segera hadir.' }),
  render() {
    return html`<div class="page page--dashboard">
      <section class="soon" data-spotlight>
        ${flower4('soon__flower soon__flower--a')}${flower4('soon__flower soon__flower--b')}${sparkle('soon__spark')}
        <div class="soon__logo" data-reveal="scale">${ph({ key: 'brand/logo-lotus', kind: 'logo', variant: 'logo', fit: 'contain', label: true, alt: '' })}</div>
        <span class="pill pill--yellow" data-reveal="fade">DASHBOARD</span>
        <h1 class="soon__title" data-split>Segera <i class="ts">hadir</i></h1>
        <p data-reveal>Dashboard IMTI FTUI 2026 sedang dipersiapkan. Sementara itu, kenali dulu bidang-bidang yang bergerak dalam satu makna.</p>
        <div class="soon__cta" data-reveal>
          <a class="btn btn--yellow" href="/about" data-link data-magnetic="8">Meet the team <span class="btn__ico">${icon.arrowRight}</span></a>
          <a class="btn btn--ghost" href="/" data-link data-magnetic="8">Kembali ke Home</a>
        </div>
      </section>
    </div>`;
  },
};
