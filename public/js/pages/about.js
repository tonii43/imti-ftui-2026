/* ==========================================================
   Halaman: About  (layout: Meet IMTI.png)
   ========================================================== */

import { html, mix, mixLines, raw } from '../util.js';
import { stats, ketuaWakil } from '../data/site.js';
import { bidang } from '../data/bidang.js';
import { ph } from '../components/image.js';
import { icon } from '../components/icons.js';

const name = (s) => mix(s);

export default {
  name: 'about',
  nav: 'about',
  meta: () => ({
    title: 'About',
    description:
      'Kenali IMTI FTUI 2026: dua pemandu lembaga, dua belas bidang, dan ratusan fungsionaris yang bergerak dalam satu makna.',
  }),
  render() {
    return html`<div class="page page--about">
      <section class="about-hero">
        <div class="about-hero__text">
          <span class="pill" data-reveal="fade">ABOUT US</span>
          <h1 class="about-hero__title" data-split>
            <span class="line">Meet</span><span class="line ts">IMTI</span><span class="line ts">FTUI</span>
          </h1>
          <p class="about-hero__lead" data-reveal>
            Ikatan Mahasiswa Teknik Industri FTUI 2026 adalah ruang bagi warga Teknik Industri untuk bertumbuh dan merekahkan makna, dipandu oleh Ketua dan Wakil Ketua Lembaga bersama dua belas bidang.
          </p>
          <div class="stats" data-stagger>
            ${stats.map(
              (s) => html`<div class="stat stat--${s.tone}" data-reveal="up" data-tilt="8">
                <strong class="stat__n" data-count="${s.value}">0</strong>
                <span class="stat__l">${s.label}</span>
              </div>`
            )}
          </div>
        </div>
        <figure class="about-hero__photo frame" data-reveal="right" data-tilt="4">
          ${ph({ key: 'photos/group-imti', alt: 'Foto bersama fungsionaris IMTI FTUI 2026', eager: true, label: true, pos: '50% 35%', cls: 'frame__ph' })}
        </figure>
      </section>

      <section class="duo" aria-labelledby="duo-title">
        <h2 id="duo-title" class="duo__title">
          <span class="duo__col" data-reveal="left"><b>Ketua</b><i class="ts">Lembaga</i></span>
          <i class="amp duo__amp" data-reveal="scale">&amp;</i>
          <span class="duo__col" data-reveal="right"><b>Wakil Ketua</b><i class="ts">Lembaga</i></span>
        </h2>
        <p class="duo__sub" data-reveal>Sebagai pemandu arah gerak dan memastikan keberlangsungan IMTI FTUI 2026.</p>
        <div class="duo__photo" data-reveal="scale" data-spotlight>
          ${ph({ key: 'photos/ketua-wakil', alt: 'Ketua dan Wakil Ketua Lembaga IMTI FTUI 2026', label: true, pos: '50% 35%', cls: 'duo__ph' })}
          <div class="duo__tag duo__tag--ketua" data-reveal="left">
            <strong>${name(ketuaWakil.ketua.name)}</strong><small>${ketuaWakil.ketua.role}</small>
          </div>
          <div class="duo__tag duo__tag--wakil" data-reveal="right">
            <strong>${name(ketuaWakil.wakil.name)}</strong><small>${ketuaWakil.wakil.role}</small>
          </div>
        </div>
      </section>

      <section class="team" aria-labelledby="team-title">
        <header class="team__head">
          <h2 id="team-title" class="team__title" data-split>Meet <i class="ts">The Team</i></h2>
          <p data-reveal>Pilih satu bidang untuk mengenal Badan Pengurus Harian, Staf Ahli, dan Badan Pengurusnya.</p>
        </header>
        <div class="team__grid" data-stagger>
          ${bidang.map(
            (b) => html`<a class="tcard" href="/about/${b.slug}" data-link data-reveal="up" data-tilt="3" aria-label="${b.name} — buka profil bidang">
              ${ph({ key: b.team, alt: `Tim ${b.name}`, cls: 'tcard__ph', pos: '50% 30%' })}
              <span class="tcard__shade"></span>
              <span class="tcard__body">
                <span class="tcard__txt">
                  <span class="tcard__title">${mixLines(b.cardTitle)}</span>
                  <span class="tcard__desc">${b.desc}</span>
                </span>
                <span class="circ-btn circ-btn--yellow" aria-hidden="true">${icon.arrowUpRight}</span>
              </span>
            </a>`
          )}
        </div>
      </section>
    </div>`;
  },
};
