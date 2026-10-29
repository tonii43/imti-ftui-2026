import { html } from '../util.js';
import { site, nav } from '../data/site.js';

export const footerMarkup = () => html`
  <div class="footer__inner">
    <p class="footer__tag"><span class="ts">${site.hashtag}</span> · ${site.tagline}</p>
    <nav class="footer__nav" aria-label="Footer">
      ${nav.map((n) => html`<a href="${n.href}" data-link>${n.label}</a>`)}
    </nav>
    <p class="footer__copy">© 2026 ${site.longName}</p>
  </div>`;
