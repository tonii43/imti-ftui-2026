/* ==========================================================
   fx.js — semua efek interaktif (vanilla JS, tanpa library)

   Atribut yang dibaca (dipasang di markup halaman):
     data-reveal="up|down|left|right|scale|fade|clip"   muncul saat di-scroll
     data-stagger                                       anak [data-reveal] muncul berurutan
     data-split                                         judul dipecah per kata (mask reveal)
     data-count="165"                                   angka berhitung naik
     data-tilt="6"                                      kartu miring 3D mengikuti kursor
     data-magnetic="10"                                 tombol "tertarik" ke kursor
     data-spotlight                                     cahaya lembut mengikuti kursor
     data-parallax="0.15"                               bergeser pelan saat scroll
   Semua efek otomatis nonaktif jika prefers-reduced-motion aktif.
   ========================================================== */

import { $$, clamp, finePointer, reducedMotion } from './util.js';

let io = null;
let parallaxItems = [];
let scrollBound = false;
let cleanups = [];

/* ----------------------------- split text ----------------------------- */
function splitWords(root) {
  let n = 0;
  const walk = (node) => {
    Array.from(node.childNodes).forEach((c) => {
      if (c.nodeType === 3) {
        const parts = c.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
          else {
            const w = document.createElement('span');
            w.className = 'w';
            const wi = document.createElement('span');
            wi.className = 'wi';
            wi.style.setProperty('--wi', n++);
            wi.textContent = p;
            w.appendChild(wi);
            frag.appendChild(w);
          }
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && !c.classList.contains('w')) walk(c);
    });
  };
  walk(root);
}

/* ----------------------------- counters ----------------------------- */
function runCounter(el) {
  const end = Number(el.dataset.count);
  if (!Number.isFinite(end)) return;
  if (reducedMotion()) {
    el.textContent = end;
    return;
  }
  const dur = 1400;
  const t0 = performance.now();
  const tick = (t) => {
    const p = clamp((t - t0) / dur, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(end * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ----------------------------- pointer fx ----------------------------- */
function bindTilt(el) {
  const max = Number(el.dataset.tilt) || 6;
  let frame = 0;
  const move = (e) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
    });
  };
  const enter = () => el.classList.add('is-tilting');
  const leave = () => {
    cancelAnimationFrame(frame);
    el.classList.remove('is-tilting');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  el.addEventListener('pointerenter', enter);
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
}

function bindMagnetic(el) {
  const k = Number(el.dataset.magnetic) || 10;
  const move = (e) => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.setProperty('--mx', `${(dx * k).toFixed(1)}px`);
    el.style.setProperty('--my', `${(dy * k * 0.7).toFixed(1)}px`);
  };
  const leave = () => {
    el.style.setProperty('--mx', '0px');
    el.style.setProperty('--my', '0px');
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
}

function bindSpotlight(el) {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - r.left}px`);
    el.style.setProperty('--sy', `${e.clientY - r.top}px`);
  });
}

/* ----------------------------- parallax ----------------------------- */
function updateParallax() {
  const vh = window.innerHeight;
  parallaxItems.forEach(({ el, k }) => {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    const center = r.top + r.height / 2 - vh / 2;
    el.style.setProperty('--py', `${(-center * k).toFixed(1)}px`);
  });
}
const onScroll = () => requestAnimationFrame(updateParallax);

/* ----------------------------- public API ----------------------------- */
export function mountFx(root = document) {
  unmountFx();
  const reduce = reducedMotion();
  const fine = finePointer();

  // pecah teks sebelum observer dipasang
  if (!reduce) $$('[data-split]', root).forEach(splitWords);

  // stagger index
  $$('[data-stagger]', root).forEach((c) => {
    c.querySelectorAll(':scope > [data-reveal]').forEach((el, i) => el.style.setProperty('--i', i));
  });

  const targets = $$('[data-reveal], [data-split], [data-count], [data-draw]', root);
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((el) => {
      el.classList.add('is-in');
      if (el.dataset.count) el.textContent = el.dataset.count;
    });
  } else {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          el.classList.add('is-in');
          if (el.dataset.count) runCounter(el);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }

  if (fine && !reduce) {
    $$('[data-tilt]', root).forEach(bindTilt);
    $$('[data-magnetic]', root).forEach(bindMagnetic);
    $$('[data-spotlight]', root).forEach(bindSpotlight);
  }

  if (!reduce) {
    parallaxItems = $$('[data-parallax]', root).map((el) => ({ el, k: Number(el.dataset.parallax) || 0.1 }));
    if (parallaxItems.length) {
      updateParallax();
      if (!scrollBound) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        scrollBound = true;
      }
    }
  }
}

export function unmountFx() {
  io?.disconnect();
  io = null;
  parallaxItems = [];
  cleanups.forEach((f) => f());
  cleanups = [];
}

/** Daftarkan fungsi pembersih khusus halaman (dipanggil saat pindah halaman). */
export const onCleanup = (fn) => cleanups.push(fn);
