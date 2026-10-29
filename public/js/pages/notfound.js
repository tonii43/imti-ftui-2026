import { html } from '../util.js';
import { icon } from '../components/icons.js';
import { sparkle } from '../components/decor.js';

export default {
  name: '404',
  nav: null,
  noindex: true,
  meta: () => ({ title: 'Halaman tidak ditemukan', description: 'Halaman yang kamu cari tidak ada.' }),
  render() {
    return html`<div class="page page--404">
      <section class="soon">
        ${sparkle('soon__spark')}
        <span class="pill pill--yellow">404</span>
        <h1 class="soon__title" data-split>Tersesat <i class="ts">sebentar?</i></h1>
        <p data-reveal>Halaman yang kamu cari tidak ditemukan. Mari kembali ke jalur yang benar.</p>
        <div class="soon__cta" data-reveal>
          <a class="btn btn--yellow" href="/" data-link data-magnetic="8">Kembali ke Home <span class="btn__ico">${icon.arrowRight}</span></a>
        </div>
      </section>
    </div>`;
  },
};
