/* ==========================================================
   Halaman: Profil Bidang  (layout: Humas / KASTRAZT / Sosma / IPPPPPTEKS /
   IKHTIAR / Kema / Siwa / Wirus / SILITBANG / Kebend / Akpro .png)
   Satu template, dirender dari data/bidang.js
   ========================================================== */

import { html, mixLines } from '../util.js';
import { bidang, getBidang, neighbors, PLACEHOLDER_PROGRAM } from '../data/bidang.js';
import { ph } from '../components/image.js';
import { icon } from '../components/icons.js';

function arch(p, size, tone) {
  return html`<figure class="arch arch--${size} arch--${tone}" data-reveal="up" data-tilt="5">
    <div class="arch__stage">
      <span class="arch__bg" aria-hidden="true"></span>
      ${ph({ key: p.photo, kind: 'cut', variant: 'person', fit: 'contain', pos: '50% 100%', cls: 'arch__ph', alt: p.name })}
      <span class="arch__role">${p.role}</span>
    </div>
    <figcaption class="arch__name"><strong>${p.name}</strong><small>${p.angkatan}</small></figcaption>
  </figure>`;
}

function person(p) {
  return html`<article class="pcard" data-reveal="up" data-tilt="6">
    <div class="pcard__img">${ph({ key: p.photo, variant: 'person', alt: p.name, pos: '50% 25%', cls: 'pcard__ph' })}</div>
    <h3 class="pcard__name">${p.name}</h3>
    <p class="pcard__angk">${p.angkatan}</p>
  </article>`;
}

function programCard(p, i) {
  const tone = i === 1 ? 'yellow' : 'mist';
  const href = p.placeholder ? '/recap' : `/recap?bidang=${p.bidang}`;
  return html`<a class="kcard kcard--${tone}" href="${href}" data-link data-reveal="up" data-tilt="5">
    <span class="kcard__top"><span class="pill pill--navy">PROGRAM KERJA</span><span class="circ-btn circ-btn--white" aria-hidden="true">${icon.arrowUpRight}</span></span>
    <h3 class="kcard__title">${p.title}</h3>
    <p class="kcard__desc">${p.placeholder ? p.desc : p.tri}</p>
    <span class="kcard__img">${ph({ key: p.photo ?? 'x', fallbacks: p.bidangTeam ? [p.bidangTeam] : [], alt: '', cls: 'kcard__ph' })}</span>
  </a>`;
}

export default {
  name: 'bidang',
  nav: 'about',
  meta(ctx) {
    const b = getBidang(ctx.params.slug);
    return b
      ? { title: `${b.name}`, description: `${b.name} (${b.abbr}) IMTI FTUI 2026 — ${b.desc}` }
      : { title: 'Bidang' };
  },
  render(ctx) {
    const b = getBidang(ctx.params.slug);
    if (!b) return { __redirect: '/about' };
    const { prev, next } = neighbors(b.slug);
    const { heads, wakil, staf } = b.bph;

    // tepat 3 kartu program: isi dengan placeholder bila belum ada
    const progs = [...b.programs.map((p) => ({ ...p, bidangTeam: b.team })), PLACEHOLDER_PROGRAM, PLACEHOLDER_PROGRAM]
      .slice(0, 3)
      .map((p) => (p.placeholder ? { ...p, photo: `${b.team}`, bidangTeam: null } : p));

    return html`<div class="page page--bidang" data-bidang="${b.slug}">
      <div class="bswitch" data-reveal="fade">
        <a class="bswitch__back" href="/about" data-link>${icon.arrowLeft}<span>About Us</span></a>
        <div class="bswitch__chips" role="tablist" aria-label="Pilih bidang">
          ${bidang.map(
            (x) => html`<a class="chip ${x.slug === b.slug ? 'is-active' : ''}" href="/about/${x.slug}" data-link role="tab" aria-selected="${x.slug === b.slug}" ${x.slug === b.slug ? 'aria-current="page"' : ''}>${x.chip}</a>`
          )}
        </div>
      </div>

      <section class="bhero">
        <div class="bhero__text">
          <span class="pill pill--yellow" data-reveal="fade">BIDANG IMTI FTUI 2026</span>
          <h1 class="bhero__title" data-split>${mixLines(b.heroTitle)}</h1>
          <p class="bhero__abbr ts" data-reveal>${b.heroSub}</p>
          <p class="bhero__desc" data-reveal>${b.desc}</p>
          <div class="bhero__cta" data-reveal>
            <a class="btn btn--yellow" href="#bph" data-magnetic="8">Kenali timnya <span class="btn__ico">${icon.arrowRight}</span></a>
            <a class="btn btn--ghost" href="/recap?bidang=${b.slug}" data-link data-magnetic="8">Recap kegiatan</a>
          </div>
        </div>
        <figure class="bhero__photo frame frame--glow" data-reveal="right" data-tilt="4">
          ${ph({ key: b.team, alt: `Tim ${b.name}`, eager: true, label: true, cls: 'frame__ph', pos: '50% 35%' })}
        </figure>
      </section>

      <section class="bph" id="bph" aria-labelledby="bph-title">
        <header class="bph__head">
          <h2 id="bph-title" class="bph__title" data-split>Badan Pengurus Harian <i class="amp">&amp;</i> <i class="ts">Staf Ahli</i></h2>
          <p data-reveal>Orang-orang yang memandu langkah ${b.name} IMTI FTUI 2026.</p>
        </header>
        <div class="bph__row bph__row--heads">${heads.map((p) => arch(p, 'lg', 'yellow'))}</div>
        ${wakil.length ? html`<div class="bph__row">${wakil.map((p) => arch(p, 'md', 'yellow'))}</div>` : ''}
        ${staf.length
          ? html`<div class="bph__divider" data-reveal="fade"><span>STAF AHLI</span></div>
              <div class="bph__row">${staf.map((p) => arch(p, 'md', 'blue'))}</div>`
          : ''}
      </section>

      <section class="bp" aria-labelledby="bp-title">
        <h2 id="bp-title" class="sect-title" data-split>Badan <i class="ts">Pengurus</i></h2>
        <p class="sect-sub" data-reveal>${b.bp.length} Badan Pengurus ${b.name} yang menggerakkan setiap program kerja.</p>
        <div class="bp__grid" data-stagger>${b.bp.map(person)}</div>
      </section>

      <section class="prog" aria-labelledby="prog-title">
        <header class="prog__head">
          <h2 id="prog-title" class="sect-title" data-split>Program <i class="ts">Kerja</i></h2>
          <a class="btn btn--ghost btn--sm" href="/recap?bidang=${b.slug}" data-link data-reveal="fade">Lihat semua recap</a>
        </header>
        <div class="prog__grid" data-stagger>${progs.map(programCard)}</div>
      </section>

      <nav class="bnav" aria-label="Bidang lainnya" data-stagger>
        <a class="bnav__card bnav__card--prev" href="/about/${prev.slug}" data-link data-reveal="left" data-tilt="3">
          <span class="pill pill--light">${icon.arrowLeft} BIDANG SEBELUMNYA</span>
          <strong>${prev.name}</strong>
        </a>
        <a class="bnav__card bnav__card--next" href="/about/${next.slug}" data-link data-reveal="right" data-tilt="3">
          <span class="pill pill--navy">BIDANG BERIKUTNYA ${icon.arrowRight}</span>
          <strong>${next.name}</strong>
        </a>
      </nav>
    </div>`;
  },
  mount(el) {
    // geser chip aktif ke tengah (penting di layar kecil)
    const active = el.querySelector('.bswitch__chips .is-active');
    active?.scrollIntoView({ inline: 'center', block: 'nearest' });
    // tombol "Kenali timnya" → scroll halus ke BPH
    el.querySelector('a[href="#bph"]')?.addEventListener('click', (e) => {
      e.preventDefault();
      const t = el.querySelector('#bph');
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' });
    });
  },
};
