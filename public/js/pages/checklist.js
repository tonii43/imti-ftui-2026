/* ==========================================================
   /assets-checklist — halaman bantu (tidak diindeks Google).
   Menampilkan semua gambar yang dibutuhkan + status sudah ada / belum.
   Buka:  http://localhost:3000/assets-checklist
   ========================================================== */

import { html } from '../util.js';
import { collectAssets, EXT } from '../assets.js';

export default {
  name: 'checklist',
  nav: null,
  noindex: true,
  meta: () => ({ title: 'Checklist aset', description: 'Daftar gambar yang dibutuhkan website.' }),
  render() {
    const list = collectAssets();
    const groups = [...new Set(list.map((a) => a.group))];
    return html`<div class="page page--checklist">
      <header class="ck-head">
        <span class="pill pill--yellow">DEV TOOL</span>
        <h1 class="ck-title">Checklist <i class="ts">aset</i></h1>
        <p>Isi file di folder <code>public/assets/</code> sesuai path di bawah. Status diperiksa langsung dari server.</p>
        <p class="ck-sum"><strong id="ck-found">0</strong> ada · <strong id="ck-missing">0</strong> belum · <strong>${list.length}</strong> total</p>
        <div class="ck-filter">
          <button class="chip is-active" data-f="all" type="button">Semua</button>
          <button class="chip" data-f="missing" type="button">Belum ada</button>
          <button class="chip" data-f="found" type="button">Sudah ada</button>
        </div>
      </header>
      ${groups.map(
        (g) => html`<section class="ck-group">
          <h2>${g}</h2>
          <ul>
            ${list
              .filter((a) => a.group === g)
              .map((a) => html`<li class="ck-item" data-key="${a.key}" data-kind="${a.kind}" data-state="check">
                <span class="ck-dot" aria-hidden="true"></span>
                <code>${a.path.replace('public/', '')}</code>
                <span class="ck-note">${a.note} <em>${a.size}</em></span>
              </li>`)}
          </ul>
        </section>`
      )}
    </div>`;
  },
  mount(el) {
    const items = [...el.querySelectorAll('.ck-item')];
    let found = 0;
    let missing = 0;
    const done = () => {
      el.querySelector('#ck-found').textContent = found;
      el.querySelector('#ck-missing').textContent = missing;
    };
    const probe = (li) =>
      new Promise((resolve) => {
        const list = EXT[li.dataset.kind].map((e) => `/assets/${li.dataset.key}.${e}`);
        let i = 0;
        const next = () => {
          if (i >= list.length) return resolve(null);
          const im = new Image();
          im.onload = () => resolve(list[i]);
          im.onerror = () => (i++, next());
          im.src = list[i];
        };
        next();
      });
    items.forEach(async (li) => {
      const hit = await probe(li);
      li.dataset.state = hit ? 'found' : 'missing';
      if (hit) found++;
      else missing++;
      done();
    });
    el.querySelectorAll('.ck-filter .chip').forEach((b) =>
      b.addEventListener('click', () => {
        el.querySelectorAll('.ck-filter .chip').forEach((x) => x.classList.toggle('is-active', x === b));
        items.forEach((li) => (li.hidden = b.dataset.f !== 'all' && li.dataset.state !== b.dataset.f));
      })
    );
  },
};
