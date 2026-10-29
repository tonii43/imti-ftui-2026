/* ==========================================================
   router.js — router History API (tanpa library)
   - Halaman dimuat lazy (dynamic import) & di-prefetch saat link di-hover
   - Transisi halaman: fade-out → ganti isi → fade-in + stagger reveal
   - Meta (title, description, canonical, OG) diperbarui per halaman
   ========================================================== */

import { mountFx, unmountFx } from './fx.js';
import { settleImages } from './components/image.js';
import { site } from './data/site.js';
import { toast } from './components/toast.js';

const routes = [
  { name: 'home', re: /^\/$/, load: () => import('./pages/home.js') },
  { name: 'about', re: /^\/about$/, load: () => import('./pages/about.js') },
  { name: 'bidang', re: /^\/about\/([a-z0-9-]+)$/, keys: ['slug'], load: () => import('./pages/bidang.js') },
  { name: 'center', re: /^\/imti-center$/, load: () => import('./pages/center.js') },
  { name: 'recap', re: /^\/recap$/, load: () => import('./pages/recap.js') },
  { name: 'contact', re: /^\/contact$/, load: () => import('./pages/contact.js') },
  { name: 'checklist', re: /^\/assets-checklist$/, load: () => import('./pages/checklist.js') },
];
const notFound = { name: '404', load: () => import('./pages/notfound.js') };

const normalize = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

function match(pathname) {
  const path = normalize(pathname);
  for (const r of routes) {
    const m = path.match(r.re);
    if (m) {
      const params = {};
      (r.keys || []).forEach((k, i) => (params[k] = m[i + 1]));
      return { route: r, params };
    }
  }
  return { route: notFound, params: {} };
}

let view;
let header;
let current = null; // { page, ctx }
let token = 0;
let first = true;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function setMeta({ title, description, path, image, noindex }) {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.hashtag}`;
  document.title = fullTitle;
  const set = (sel, attr, val) => {
    const el = document.head.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };
  const desc = description || site.description;
  const url = location.origin + path;
  set('meta[name="description"]', 'content', desc);
  set('meta[property="og:title"]', 'content', fullTitle);
  set('meta[property="og:description"]', 'content', desc);
  set('meta[property="og:url"]', 'content', url);
  set('meta[name="twitter:title"]', 'content', fullTitle);
  set('meta[name="twitter:description"]', 'content', desc);
  set('link[rel="canonical"]', 'href', url);
  if (image) set('meta[property="og:image"]', 'content', image);
  let robots = document.head.querySelector('meta[name="robots"]');
  if (noindex) {
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
  } else robots?.remove();
}

function scrollToHash(hash, smooth = true) {
  if (!hash) return false;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
  return true;
}

async function render(url, { restoreY = null } = {}) {
  const my = ++token;
  const { route, params } = match(url.pathname);
  const query = Object.fromEntries(url.searchParams);
  const ctx = { params, query, url, path: normalize(url.pathname) };

  let mod;
  try {
    mod = await route.load();
  } catch (err) {
    console.error('Gagal memuat halaman', err);
    mod = await notFound.load();
  }
  if (my !== token) return;
  const page = mod.default;

  if (!first) {
    view.classList.add('is-leaving');
    await wait(170);
    if (my !== token) return;
  }

  // bersihkan halaman lama
  try {
    current?.page.unmount?.(view, current.ctx);
  } catch (e) {
    console.error(e);
  }
  unmountFx();

  let out = await page.render(ctx);
  if (my !== token) return;
  if (out && out.__redirect) {
    history.replaceState({}, '', out.__redirect);
    return render(new URL(out.__redirect, location.origin));
  }

  view.innerHTML = typeof out === 'string' ? out : out.s;
  view.dataset.page = page.name || route.name;
  const meta = page.meta ? page.meta(ctx) : {};
  setMeta({ ...meta, path: ctx.path, noindex: page.noindex || route === notFound });
  header.setActive(page.nav ?? null);
  header.close();

  settleImages(view);
  document.fonts?.ready.then(() => view.querySelectorAll('[data-relayout]').forEach((e) => e.dispatchEvent(new Event('relayout'))));

  // posisi scroll
  if (restoreY != null) window.scrollTo(0, restoreY);
  else if (url.hash) scrollToHash(url.hash, false) || window.scrollTo(0, 0);
  else window.scrollTo(0, 0);

  mountFx(view);
  page.mount?.(view, ctx);
  current = { page, ctx };

  view.classList.remove('is-leaving');
  view.classList.remove('is-entering');
  void view.offsetWidth;
  view.classList.add('is-entering');
  first = false;
}

export function navigate(href, opts = {}) {
  const url = new URL(href, location.origin);
  if (url.origin !== location.origin) {
    location.href = href;
    return;
  }
  const same = normalize(url.pathname) === normalize(location.pathname) && url.search === location.search;
  if (same && url.hash) {
    history.pushState(history.state, '', url);
    scrollToHash(url.hash);
    return;
  }
  if (same && !opts.force) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  history.replaceState({ y: window.scrollY }, '');
  history.pushState({ y: 0 }, '', url);
  render(url);
}

/** Ubah query string tanpa memuat ulang halaman (dipakai filter Recap). */
export function replaceQuery(params) {
  const url = new URL(location.href);
  Object.entries(params).forEach(([k, v]) => (v ? url.searchParams.set(k, v) : url.searchParams.delete(k)));
  history.replaceState(history.state, '', url);
}

export function startRouter({ viewEl, headerApi }) {
  view = viewEl;
  header = headerApi;
  history.scrollRestoration = 'manual';

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a) return;

    // tautan yang belum diisi (href="#") → beri tahu pengguna
    if (a.hasAttribute('data-todo')) {
      e.preventDefault();
      toast('Tautan ini belum diaktifkan — segera hadir.');
      return;
    }
    if (a.target === '_blank' || a.hasAttribute('download') || a.hasAttribute('data-external')) return;
    const href = a.getAttribute('href');
    if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) return;
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToHash(href);
      return;
    }
    const url = new URL(a.href, location.origin);
    if (url.origin !== location.origin) return;
    e.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  });

  // prefetch modul halaman saat link di-hover / fokus
  const prefetch = (e) => {
    const a = e.target.closest?.('a[data-link]');
    if (!a) return;
    const { route } = match(new URL(a.href, location.origin).pathname);
    route.load?.().catch(() => {});
  };
  document.addEventListener('pointerover', prefetch, { passive: true });
  document.addEventListener('focusin', prefetch);

  window.addEventListener('popstate', (e) => {
    render(new URL(location.href), { restoreY: e.state?.y ?? null });
  });

  return render(new URL(location.href));
}
