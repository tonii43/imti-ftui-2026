/* ==========================================================
   Halaman: Recap  (layout: Recap.png)
   Daftar program kerja semua bidang + filter per bidang (?bidang=humas)
   ========================================================== */

import { html } from '../util.js';
import { bidang, getBidang } from '../data/bidang.js';
import { ph } from '../components/image.js';
import { icon } from '../components/icons.js';
import { replaceQuery } from '../router.js';

const items = bidang.flatMap((b) => b.programs.map((p) => ({ ...p, b })));

function item(p) {
  const b = p.b;
  return html`<article class="ritem" data-b="${b.slug}" data-reveal="up">
    <figure class="ritem__img" data-tilt="4">
      ${ph({ key: p.photo, fallbacks: [b.team], alt: `Dokumentasi ${p.title}`, label: true, cls: 'ritem__ph' })}
    </figure>
    <div class="ritem__text">
      <p class="ritem__by ts">${b.name} IMTI FTUI</p>
      <h2 class="ritem__title">${p.title}</h2>
      <p class="ritem__desc">${p.desc}</p>
      <p class="ritem__tri">${p.tri}</p>
    </div>
  </article>`;
}

export default {
  name: 'recap',
  nav: 'recap',
  meta: () => ({
    title: 'Recap',
    description: 'Jejak program kerja dari 12 bidang IMTI FTUI 2026.',
  }),
  render(ctx) {
    const f = getBidang(ctx.query.bidang) ? ctx.query.bidang : 'all';
    return html`<div class="page page--recap" data-filter="${f}">
      <a class="backlink" href="/" data-link data-reveal="fade">${icon.arrowLeft}<span>BACK TO HOME</span></a>
      <header class="recap-head">
        <h1 class="recap-head__title" data-split>Recap<span class="sq" aria-hidden="true"></span></h1>
        <p class="recap-head__tag ts" data-reveal="left">Program Kerja</p>
      </header>
      <p class="recap-sub" data-reveal>Jejak program kerja dari 12 bidang IMTI FTUI 2026.</p>

      <div class="chips" role="tablist" aria-label="Filter bidang" data-reveal>
        <button class="chip ${f === 'all' ? 'is-active' : ''}" type="button" role="tab" data-f="all" aria-selected="${f === 'all'}">Semua bidang</button>
        ${bidang.map(
          (b) => html`<button class="chip ${f === b.slug ? 'is-active' : ''}" type="button" role="tab" data-f="${b.slug}" aria-selected="${f === b.slug}">${b.chip}</button>`
        )}
      </div>

      <div class="recap-list" id="recap-list">${items.map(item)}</div>
      <p class="recap-empty" hidden>Belum ada program kerja untuk bidang ini.</p>
    </div>`;
  },
  mount(el) {
    const page = el.querySelector('.page--recap');
    const list = el.querySelector('#recap-list');
    const empty = el.querySelector('.recap-empty');
    const chips = [...el.querySelectorAll('.chip')];
    const rows = [...list.children];

    const apply = (f, animate = true) => {
      let k = 0;
      rows.forEach((r) => {
        const show = f === 'all' || r.dataset.b === f;
        r.hidden = !show;
        if (!show) return;
        r.dataset.side = k % 2 === 0 ? 'left' : 'right';
        if (animate) {
          r.classList.remove('is-in', 'is-swap');
          void r.offsetWidth;
          r.style.setProperty('--swap-d', `${k * 90}ms`);
          r.classList.add('is-in', 'is-swap');
        }
        k++;
      });
      empty.hidden = k > 0;
      chips.forEach((c) => {
        const on = c.dataset.f === f;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-selected', String(on));
      });
      page.dataset.filter = f;
    };

    apply(page.dataset.filter, false);
    chips.forEach((c) =>
      c.addEventListener('click', () => {
        apply(c.dataset.f);
        replaceQuery({ bidang: c.dataset.f === 'all' ? null : c.dataset.f });
      })
    );
  },
};
