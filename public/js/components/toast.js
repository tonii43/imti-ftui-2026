/* toast.js — notifikasi kecil di bawah layar */
let timer;
export function toast(message, tone = 'info') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.dataset.tone = tone;
  el.classList.remove('is-in');
  void el.offsetWidth; // restart animasi
  el.classList.add('is-in');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('is-in'), 3200);
}
