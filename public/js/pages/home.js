/* ==========================================================
   Halaman: Home  (layout: apa.png)
   ========================================================== */

import { html, rich, mixLines, mix } from '../util.js';
import { site, merekahMakna, visi, misi, maknaLogo, pillars } from '../data/site.js';
import { bidang } from '../data/bidang.js';
import { ph } from '../components/image.js';
import { icon } from '../components/icons.js';
import { flower4, petal, sparkle, frangipani, rings } from '../components/decor.js';
import { onCleanup } from '../fx.js';

const arrowBtn = html`<span class="btn__ico">${icon.arrowRight}</span>`;

function hero() {
  return html`
  <section class="home-hero" data-spotlight aria-labelledby="hero-title">
    <div class="home-hero__media" data-parallax="0.05">
      ${ph({ key: 'photos/group-imti', alt: 'Foto bersama fungsionaris IMTI FTUI 2026', cls: 'home-hero__ph', eager: true, label: true, pos: '50% 30%' })}
    </div>
    <div class="home-hero__shade"></div>
    <div class="home-hero__glow"></div>
    ${flower4('home-hero__flower')}
    <div class="home-hero__content">
      <span class="pill pill--yellow" data-reveal="fade">IKATAN MAHASISWA TEKNIK INDUSTRI UI</span>
      <h1 id="hero-title" class="home-hero__title" data-split>${mixLines(['IMTI FTUI', '2026'])}</h1>
      <p class="home-hero__tag" data-reveal><span class="ts">${site.hashtag}</span><span class="rule" aria-hidden="true"></span></p>
      <div class="home-hero__cta" data-reveal>
        <a class="btn btn--yellow" href="/about" data-link data-magnetic="8">Get to know us ${arrowBtn}</a>
        <a class="btn btn--ghost" href="/imti-center" data-link data-magnetic="8">IMTI Center</a>
      </div>
      <div class="pillars" data-reveal role="tablist" aria-label="Tiga pilar IMTI FTUI 2026">
        ${pillars.map(
          (p, i) => html`<button class="pillar ${i === 0 ? 'is-active' : ''}" type="button" role="tab" aria-selected="${i === 0}" data-pillar="${i}">
            <span class="pillar__label">${p.label}</span>
            <span class="pillar__hint">${p.hint}</span>
          </button>`
        )}
      </div>
    </div>
  </section>`;
}

function intro() {
  return html`
  <section class="merekah" aria-label="Merekah Makna">
    <div class="merekah__decor" aria-hidden="true">
      ${petal('merekah__petal merekah__petal--l1', '--r:-28deg')}
      ${petal('merekah__petal merekah__petal--l2', '--r:62deg')}
      ${petal('merekah__petal merekah__petal--r1', '--r:34deg')}
      ${petal('merekah__petal merekah__petal--r2', '--r:-52deg')}
      ${sparkle('merekah__spark')}
    </div>
    <h2 class="merekah__title">
      <span class="merekah__b" data-split>Merekah</span>
      <span class="merekah__i ts" data-reveal="up">Makna</span>
    </h2>
    <div class="merekah__logo" data-reveal="scale" data-relayout>
      ${ph({ key: 'brand/logo-lotus', kind: 'logo', variant: 'logo', fit: 'contain', label: true, cls: 'merekah__lotus', alt: 'Logo IMTI FTUI 2026 — teratai dengan riak air' })}
    </div>
    <p class="merekah__pillars" data-reveal>
      <span class="ts">Harmonis</span><i aria-hidden="true"></i><span class="ts">Signifikan</span><i aria-hidden="true"></i><span class="ts">Relevan</span>
    </p>
  </section>`;
}

function defs() {
  const m = merekahMakna;
  return html`
  <section class="defs" data-stagger>
    <article class="def def--mist" data-reveal="up" data-tilt="3">
      ${frangipani('def__flower')}
      <span class="pill pill--navy">${m.merekah.pill}</span>
      <h3 class="def__title ts">${m.merekah.title}</h3>
      <p class="def__def">${rich(m.merekah.def)}</p>
      <p class="def__body">${rich(m.merekah.body)}</p>
    </article>
    <article class="def def--yellow" data-reveal="up" data-tilt="3">
      ${rings('def__rings')}
      <span class="pill pill--navy">${m.makna.pill}</span>
      <h3 class="def__title ts">${m.makna.title}</h3>
      <p class="def__def">${rich(m.makna.def)}</p>
      <p class="def__body">${rich(m.makna.body)}</p>
    </article>
  </section>`;
}

function visiMisi() {
  return html`
  <section class="vm" aria-label="Visi dan Misi">
    <div class="vm__panel" data-reveal="scale" data-spotlight>
      ${flower4('vm__flower vm__flower--big')}
      ${flower4('vm__flower vm__flower--small')}
      <div class="vm__col vm__visi">
        <h2 class="vm__h ts" data-split>Visi</h2>
        <p class="vm__visi-text" data-reveal>${rich(visi)}</p>
      </div>
      <div class="vm__col vm__misi">
        <h2 class="vm__h ts" data-split>Misi</h2>
        <ol class="misi" data-stagger>
          ${misi.map((t, i) => html`<li class="misi__item" data-reveal="right"><span class="misi__no ts">${String(i + 1).padStart(2, '0')}</span><p>${rich(t)}</p></li>`)}
        </ol>
      </div>
    </div>
  </section>`;
}

function maknaLogoSection() {
  return html`
  <section class="mlogo" aria-labelledby="mlogo-title">
    <header class="mlogo__head">
      <span class="pill" data-reveal="fade">FILOSOFI</span>
      <h2 id="mlogo-title" class="mlogo__title" data-split>Makna <i class="ts">Logo</i></h2>
    </header>
    <div class="mlogo__stage" data-relayout>
      <svg class="mlogo__lines" aria-hidden="true"></svg>
      ${maknaLogo.map(
        (c) => html`<article class="mcard mcard--${c.pos}" data-reveal="up" data-hot="${c.hotspot.join(',')}">
          <h3 class="mcard__title"><i class="ts">${c.head[0]}</i> <b>${c.head[1]}</b></h3>
          <p>${rich(c.body)}</p>
        </article>`
      )}
      <div class="mlogo__logo" data-reveal="scale">
        ${ph({ key: 'brand/logo-lotus', kind: 'logo', variant: 'logo', fit: 'contain', label: true, cls: 'mlogo__lotus', alt: 'Logo IMTI FTUI 2026' })}
      </div>
    </div>
  </section>`;
}

function know() {
  return html`
  <section class="know">
    <div class="know__avatar" data-reveal="scale" data-tilt="8">
      <span class="know__ring">${ph({ key: 'illustrations/memoji-get-to-know', kind: 'logo', variant: 'logo', fit: 'cover', cls: 'know__ph', pos: '50% 20%', alt: 'Ilustrasi memoji melambai' })}</span>
    </div>
    <div class="know__text">
      <h2 class="know__title" data-split>${mixLines(['Get To', 'Know Us'])}</h2>
      <p data-reveal>Dua pemandu arah gerak, dua belas bidang, dan lebih dari dua ratus fungsionaris yang bergerak dalam satu makna.</p>
      <a class="btn btn--yellow" data-reveal href="/about" data-link data-magnetic="8">Meet the team ${arrowBtn}</a>
    </div>
  </section>`;
}

function bidangGrid() {
  return html`
  <section class="hb" id="bidang">
    <header class="hb__head">
      <h2 class="hb__title" data-split>Bidang <i class="ts">IMTI</i></h2>
      <p data-reveal>Kenali setiap bidang beserta Badan Pengurus Harian, Staf Ahli, dan Badan Pengurusnya.</p>
    </header>
    <div class="hb__grid" data-stagger>
      ${bidang.map(
        (b) => html`<a class="bcard" href="/about/${b.slug}" data-link data-reveal="up" data-tilt="4" aria-label="${b.homeTitle} — buka profil bidang">
          <span class="bcard__img">${ph({ key: b.team, alt: `Tim ${b.homeTitle}`, cls: 'bcard__ph' })}</span>
          <span class="bcard__body">
            <span class="bcard__txt"><strong>${b.homeTitle}</strong><small>${b.homeSub}</small></span>
            <span class="circ-btn" aria-hidden="true">${icon.arrowUpRight}</span>
          </span>
        </a>`
      )}
    </div>
  </section>`;
}

function ctas() {
  return html`
  <section class="cta" data-stagger>
    <a class="cta-card cta-card--yellow" href="/imti-center" data-link data-reveal="up" data-tilt="3">
      <span class="pill pill--navy">LAYANAN</span>
      <h3 class="cta-card__title">IMTI<br /><i class="ts">Center</i></h3>
      <p>Semua layanan dan tautan penting IMTI dalam satu tempat.</p>
      <span class="cta-card__memoji">${ph({ key: 'illustrations/memoji-imti-center', kind: 'logo', variant: 'logo', fit: 'contain', pos: '50% 100%', alt: '' })}</span>
      <span class="cta-card__go circ-btn" aria-hidden="true">${icon.arrowUpRight}</span>
    </a>
    <a class="cta-card cta-card--blue" href="/contact" data-link data-reveal="up" data-tilt="3">
      <span class="pill pill--yellow">KONTAK</span>
      <h3 class="cta-card__title">Contact<br />Us<span class="dot">.</span></h3>
      <p>Hubungi contact person kami atau kirim pesan langsung.</p>
      <span class="cta-card__memoji">${ph({ key: 'illustrations/memoji-contact', kind: 'logo', variant: 'logo', fit: 'contain', pos: '50% 100%', alt: '' })}</span>
      <span class="cta-card__go circ-btn" aria-hidden="true">${icon.arrowUpRight}</span>
    </a>
  </section>`;
}

export default {
  name: 'home',
  nav: 'home',
  meta: () => ({
    title: null,
    description: site.description,
  }),
  render() {
    return html`<div class="page page--home">
      ${hero()}${intro()}${defs()}${visiMisi()}${maknaLogoSection()}${know()}${bidangGrid()}${ctas()}
    </div>`;
  },
  mount(el) {
    /* --- pilar: auto-rotate + hover/klik --- */
    const items = [...el.querySelectorAll('.pillar')];
    let i = 0;
    let paused = false;
    const set = (n) => {
      i = n;
      items.forEach((p, k) => {
        p.classList.toggle('is-active', k === n);
        p.setAttribute('aria-selected', String(k === n));
      });
    };
    items.forEach((p, k) => {
      p.addEventListener('pointerenter', () => ((paused = true), set(k)));
      p.addEventListener('pointerleave', () => (paused = false));
      p.addEventListener('focus', () => ((paused = true), set(k)));
      p.addEventListener('blur', () => (paused = false));
      p.addEventListener('click', () => set(k));
    });
    const timer = setInterval(() => !paused && !document.hidden && set((i + 1) % items.length), 3200);
    onCleanup(() => clearInterval(timer));

    /* --- diagram Makna Logo: garis penghubung kartu → titik di logo --- */
    const stage = el.querySelector('.mlogo__stage');
    const svg = stage.querySelector('.mlogo__lines');
    const logo = stage.querySelector('.mlogo__logo');
    const cards = [...stage.querySelectorAll('.mcard')];
    const NS = 'http://www.w3.org/2000/svg';

    const draw = () => {
      if (getComputedStyle(svg).display === 'none') return;
      const sr = stage.getBoundingClientRect();
      const lr = logo.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${sr.width} ${sr.height}`);
      svg.innerHTML = '';
      cards.forEach((c) => {
        const [hx, hy] = c.dataset.hot.split(',').map(Number);
        const cr = c.getBoundingClientRect();
        const left = c.classList.contains('mcard--tl') || c.classList.contains('mcard--bl');
        const x1 = (left ? cr.right : cr.left) - sr.left;
        const y1 = cr.top + cr.height / 2 - sr.top;
        const x2 = lr.left + (lr.width * hx) / 100 - sr.left;
        const y2 = lr.top + (lr.height * hy) / 100 - sr.top;
        const g = document.createElementNS(NS, 'g');
        g.setAttribute('class', 'mline');
        g.dataset.for = c.className.match(/mcard--(\w+)/)[1];
        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', x1); line.setAttribute('y1', y1); line.setAttribute('x2', x2); line.setAttribute('y2', y2);
        const len = Math.hypot(x2 - x1, y2 - y1);
        line.style.strokeDasharray = len;
        line.style.strokeDashoffset = len;
        line.style.setProperty('--len', len);
        const d1 = document.createElementNS(NS, 'circle');
        d1.setAttribute('cx', x1); d1.setAttribute('cy', y1); d1.setAttribute('r', 3.5); d1.setAttribute('class', 'mline__dot');
        const ring = document.createElementNS(NS, 'circle');
        ring.setAttribute('cx', x2); ring.setAttribute('cy', y2); ring.setAttribute('r', 11); ring.setAttribute('class', 'mline__ring');
        const d2 = document.createElementNS(NS, 'circle');
        d2.setAttribute('cx', x2); d2.setAttribute('cy', y2); d2.setAttribute('r', 3.5); d2.setAttribute('class', 'mline__dot');
        g.append(line, d1, ring, d2);
        svg.appendChild(g);
      });
      stage.classList.toggle('lines-in', stage.classList.contains('is-in'));
    };

    const stageObs = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          draw();
          stage.classList.add('is-in');
          stageObs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    stageObs.observe(stage);
    const ro = new ResizeObserver(() => draw());
    ro.observe(stage);
    stage.addEventListener('relayout', draw);
    onCleanup(() => {
      stageObs.disconnect();
      ro.disconnect();
    });

    // hover kartu → sorot garisnya
    cards.forEach((c) => {
      const key = c.className.match(/mcard--(\w+)/)[1];
      const on = (v) => svg.querySelector(`.mline[data-for="${key}"]`)?.classList.toggle('is-hot', v);
      c.addEventListener('pointerenter', () => on(true));
      c.addEventListener('pointerleave', () => on(false));
    });
  },
};
