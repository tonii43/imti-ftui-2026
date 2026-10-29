// Build statis: salin public → dist, buat HTML per-rute (title/OG untuk crawler & preview link), sitemap, robots.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bidang } from '../public/js/data/bidang.js';
import { site } from '../public/js/data/site.js';

const base = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = join(base, 'dist');
const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://imtiftui.com'
).replace(/\/$/, '');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

await rm(dist, { recursive: true, force: true });
await cp(join(base, 'public'), dist, { recursive: true });
let tpl = await readFile(join(dist, 'index.html'), 'utf8');

const routes = [
  { path: '/', title: null, desc: site.description },
  { path: '/about', title: 'About', desc: 'Kenali IMTI FTUI 2026: dua pemandu lembaga, dua belas bidang, dan ratusan fungsionaris.' },
  { path: '/imti-center', title: 'IMTI Center', desc: 'Satu pintu untuk semua layanan dan tautan penting IMTI FTUI 2026.' },
  { path: '/recap', title: 'Recap', desc: 'Jejak program kerja dari 12 bidang IMTI FTUI 2026.' },
  { path: '/contact', title: 'Contact', desc: 'Hubungi IMTI FTUI 2026.' },
  ...bidang.map((b) => ({ path: `/about/${b.slug}`, title: b.name, desc: `${b.name} (${b.abbr}) IMTI FTUI 2026 — ${b.desc}` })),
];

const page = (r) => {
  const title = r.title ? `${r.title} · ${site.name}` : `${site.name} — ${site.hashtag}`;
  const url = SITE_URL + (r.path === '/' ? '/' : r.path);
  return tpl
    .replace(/%SITE_URL%\/"/g, `${SITE_URL}/"`) // fallback
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(name="description" content=")[^"]*/, `$1${esc(r.desc)}`)
    .replace(/(rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(property="og:description" content=")[^"]*/, `$1${esc(r.desc)}`)
    .replace(/(name="twitter:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(name="twitter:description" content=")[^"]*/, `$1${esc(r.desc)}`)
    .replaceAll('%SITE_URL%', SITE_URL);
};

for (const r of routes) {
  const html = page(r);
  if (r.path === '/') await writeFile(join(dist, 'index.html'), html);
  else {
    const dir = join(dist, r.path);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), html);
  }
}
await writeFile(join(dist, '404.html'), page({ path: '/404', title: 'Halaman tidak ditemukan', desc: site.description }).replace('</head>', '<meta name="robots" content="noindex" /></head>'));

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`
);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /assets-checklist\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`✓ build selesai → dist/  (${routes.length} halaman, ${SITE_URL})`);
