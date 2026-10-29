/* ==========================================================
   Halaman: Contact  (layout: Contact.png)
   Form → POST /api/contact (Vercel Function). Jika belum dikonfigurasi,
   otomatis membuka aplikasi email (mailto) sebagai cadangan.
   ========================================================== */

import { html, linkAttrs } from '../util.js';
import { channels, contactPersons } from '../data/site.js';
import { ph } from '../components/image.js';
import { icon } from '../components/icons.js';
import { toast } from '../components/toast.js';

const EMAIL = 'imtiftui@gmail.com';

export default {
  name: 'contact',
  nav: 'contact',
  meta: () => ({
    title: 'Contact',
    description: 'Punya pertanyaan, aspirasi, atau ajakan kolaborasi? Hubungi IMTI FTUI 2026.',
  }),
  render() {
    return html`<div class="page page--contact">
      <section class="contact-top">
        <div class="contact-top__text">
          <span class="pill pill--yellow" data-reveal="fade">IMTI FTUI 2026</span>
          <h1 class="contact-top__title" data-split><span class="line">Contact</span><span class="line">Us<span class="sq" aria-hidden="true"></span></span></h1>
          <p data-reveal>Punya pertanyaan, aspirasi, atau ajakan kolaborasi? Tinggalkan pesan, kami akan membalas ke inbox kamu.</p>
        </div>

        <form class="cform" data-reveal="right" novalidate>
          <h2 class="cform__title ts">Kirim pesan</h2>
          <label class="field"><span>NAMA</span><input name="name" type="text" placeholder="Nama kamu" autocomplete="name" required maxlength="80" /></label>
          <label class="field"><span>EMAIL</span><input name="email" type="email" placeholder="kamu@email.com" autocomplete="email" required maxlength="120" /></label>
          <label class="field"><span>PESAN</span><textarea name="message" rows="3" placeholder="Apa yang ingin kamu sampaikan?" required maxlength="2000"></textarea></label>
          <input class="hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <p class="cform__error" role="alert" hidden></p>
          <button class="cform__submit" type="submit" data-magnetic="6"><span class="cform__label">Kirim Pesan</span><span class="cform__done">${icon.check} Terkirim</span></button>
        </form>
      </section>

      <section class="channels" aria-labelledby="ch-title">
        <h2 id="ch-title" class="sect-title" data-split>Official <i class="ts">Channels</i></h2>
        <div class="channels__grid" data-stagger>
          ${channels.map(
            (c) => html`<a class="chcard chcard--${c.key}" ${linkAttrs(c.href)} data-reveal="up" data-tilt="5">
              <span class="chcard__ico">${icon[c.key]}</span>
              <span class="chcard__txt"><strong>${c.title}</strong>${c.sub ? html`<small>${c.sub}</small>` : ''}</span>
            </a>`
          )}
        </div>
      </section>

      <section class="persons" aria-labelledby="cp-title">
        <h2 id="cp-title" class="sect-title" data-split>Contact <i class="ts">Person</i></h2>
        <div class="persons__grid" data-stagger>
          ${contactPersons.map(
            (p) => html`<article class="person" data-reveal="up" data-tilt="4">
              <div class="person__photo">${ph({ key: p.photo, kind: 'cut', variant: 'person', fit: 'contain', pos: '50% 100%', fallbacks: [p.fallback], cls: 'person__ph', alt: p.nick })}</div>
              <div class="person__info">
                <h3>${p.nick}</h3>
                <dl>
                  <div><dt>Nama</dt><dd>${p.name}</dd></div>
                  <div><dt>Phone</dt><dd><a href="tel:+62${p.phone.replace(/^0/, '')}">${p.phone}</a></dd></div>
                  <div><dt>Line</dt><dd>${p.line}</dd></div>
                </dl>
                <p class="person__role ts">${p.role}</p>
              </div>
            </article>`
          )}
        </div>
      </section>
    </div>`;
  },
  mount(el) {
    const form = el.querySelector('.cform');
    const err = form.querySelector('.cform__error');
    const btn = form.querySelector('.cform__submit');

    const showError = (m) => {
      err.textContent = m;
      err.hidden = !m;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      showError('');
      const data = Object.fromEntries(new FormData(form));
      if (data.company) return; // honeypot (bot)
      const name = data.name.trim();
      const email = data.email.trim();
      const message = data.message.trim();
      if (!name || !message) return showError('Nama dan pesan wajib diisi.');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showError('Format email belum benar.');

      btn.classList.add('is-loading');
      btn.disabled = true;
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        if (res.ok) {
          btn.classList.remove('is-loading');
          btn.classList.add('is-done');
          form.reset();
          toast('Pesan terkirim. Terima kasih!', 'ok');
          setTimeout(() => {
            btn.classList.remove('is-done');
            btn.disabled = false;
          }, 3500);
          return;
        }
        throw new Error(String(res.status));
      } catch {
        // cadangan: buka aplikasi email dengan isi pesan terisi
        const subject = encodeURIComponent(`Pesan dari website IMTI FTUI — ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        toast('Membuka aplikasi email kamu…');
        btn.classList.remove('is-loading');
        btn.disabled = false;
      }
    });
  },
};
