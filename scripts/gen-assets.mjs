// Membuat ASSETS.md, assets-list.csv, dan kerangka folder public/assets/ dari daftar di public/js/assets.js
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectAssets } from '../public/js/assets.js';

const base = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const list = collectAssets();

for (const a of list) await mkdir(dirname(join(base, a.path)), { recursive: true });
for (const d of new Set(list.map((a) => dirname(join(base, a.path))))) await writeFile(join(d, '.gitkeep'), '');

const groups = [...new Set(list.map((a) => a.group))];
let md = `# Daftar aset gambar (${list.length} file)\n\n> Dibuat otomatis oleh \`npm run assets\`. Letakkan file persis di path & nama di bawah.\n> Format utama ditulis di kolom *File*; ekstensi lain yang juga terbaca otomatis: foto → \`.jpg .jpeg .png .webp\`, potongan → \`.png .webp\`, logo/ilustrasi → \`.png .svg .webp\`.\n> Cek progres kapan saja di \`/assets-checklist\` (saat \`npm run dev\`).\n`;
for (const g of groups) {
  md += `\n## ${g}\n\n| File | Ukuran saran | Keterangan |\n|---|---|---|\n`;
  for (const a of list.filter((x) => x.group === g)) md += `| \`${a.path}\` | ${a.size} | ${a.note.replace(/\|/g, '/')} |\n`;
}
await writeFile(join(base, 'ASSETS.md'), md);
const csv = ['group,file,size,note', ...list.map((a) => [a.group, a.path, a.size, a.note].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');
await writeFile(join(base, 'assets-list.csv'), csv);
console.log(`✓ ${list.length} aset → ASSETS.md, assets-list.csv, folder public/assets/**`);
