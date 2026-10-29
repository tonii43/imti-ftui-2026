/* ==========================================================
   main.js — titik masuk aplikasi
   ========================================================== */

import { initHeader } from './components/header.js';
import { footerMarkup } from './components/footer.js';
import { initImages } from './components/image.js';
import { startRouter } from './router.js';
import { $ } from './util.js';

document.documentElement.classList.add('js');
initImages();

const header = initHeader($('#site-header'));
$('#site-footer').innerHTML = footerMarkup().s;

// bar progres scroll (garis tipis di tepi atas layar)
const bar = $('#scroll-progress');
const updateBar = () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
};
window.addEventListener('scroll', updateBar, { passive: true });
window.addEventListener('resize', updateBar, { passive: true });

startRouter({ viewEl: $('#view'), headerApi: header }).then(() => {
  document.documentElement.classList.add('is-ready');
  updateBar();
});

// Service worker tidak dipakai (hindari cache membingungkan saat mengganti foto).
