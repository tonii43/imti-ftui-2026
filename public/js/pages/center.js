/* ==========================================================
   Halaman: IMTI Center  (layout: IMTI Center.png)
   ========================================================== */

import { html, mixLines, linkAttrs } from '../util.js';
import { links } from '../data/site.js';
import { bidang } from '../data/bidang.js';
import { ph } from '../components/image.js';
import { icon } from '../components/icons.js';
import { rings } from '../components/decor.js';

const quick = [
  { title: 'Instagram IMTI', href: links.instagram },
  { title: 'TikTok IMTI', href: links.tiktok },
  { title: 'Form Aspirasi Warga TI', href: links.aspirasi, tone: 'yellow' },
  { title: 'Kalender Kegiatan', href: links.kalender },
];

/* Tautan layanan tiap bidang. Isi URL di sini (nilai '#' = belum aktif). */
const serviceLinks = {
  humas: '#', kastrat: '#', sosma: '#', iptek: '#', ikhtiar: '#', kema: '#',
  siwa: '#', wirus: '#', kestari: '#', litbang: '#', kebend: '#', akpro: '#',
};

export default {
  name: 'center',
  nav: 'center',
  meta: () => ({
    title: 'IMTI Center',
    description: 'Satu pintu untuk semua layanan, formulir, dan tautan penting dari dua belas bidang IMTI FTUI 2026.',
  }),
  render() {
    return html`<div class="page page--center">
      <section class="chero" data-reveal="scale" data-spotlight>
        ${rings('chero__rings', '')}
        <div class="chero__rings2" aria-hidden="true"></div>
        <span class="pill pill--yellow">LAYANAN IMTI</span>
        <h1 class="chero__title" data-split>${mixLines(['IMTI', '*Center*'])}</h1>
        <p class="chero__lead">Satu pintu untuk semua layanan, formulir, dan tautan penting dari dua belas bidang IMTI FTUI 2026.</p>
      </section>

      <section class="quick" data-stagger aria-label="Quick access">
        ${quick.map(
          (q) => html`<a class="qcard ${q.tone === 'yellow' ? 'qcard--yellow' : ''}" ${linkAttrs(q.href)} data-reveal="up" data-tilt="6">
            <span class="qcard__top"><span class="pill pill--navy">QUICK ACCESS</span><span class="circ-btn circ-btn--white" aria-hidden="true">${icon.arrowUpRight}</span></span>
            <strong>${q.title}</strong>
          </a>`
        )}
      </section>

      <section class="svc" aria-labelledby="svc-title">
        <h2 id="svc-title" class="sect-title" data-split>Layanan <i class="ts">per bidang</i></h2>
        <div class="svc__grid" data-stagger>
          ${bidang.map(
            (b) => html`<article class="scard" data-reveal="up" data-tilt="4">
              <header class="scard__head">
                <span class="scard__avatar">${ph({ key: b.team, alt: '', cls: 'scard__ph', pos: '50% 30%' })}</span>
                <h3>${b.name}</h3>
              </header>
              <a class="scard__link" ${linkAttrs(serviceLinks[b.slug])}>
                <span>[${b.service}]</span>
                <span class="circ-btn" aria-hidden="true">${icon.arrowUpRight}</span>
              </a>
              <a class="scard__profile" href="/about/${b.slug}" data-link>Profil bidang ${icon.arrowRight}</a>
            </article>`
          )}
        </div>
      </section>
    </div>`;
  },
};
