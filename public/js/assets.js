/* ==========================================================
   assets.js — satu-satunya tempat yang tahu lokasi file gambar.
   Semua gambar dicari di /assets/<key>.<ext>  (folder: public/assets/)

   kind:
     photo -> foto persegi panjang   (utama .jpg, juga dicoba .jpeg .png .webp)
     cut   -> foto potongan/transparan (utama .png, juga dicoba .webp)
     logo  -> logo / ilustrasi         (utama .png, juga dicoba .svg .webp)
   ========================================================== */

import { bidang } from './data/bidang.js';
import { contactPersons } from './data/site.js';

export const ASSET_BASE = '/assets/';

export const EXT = {
  photo: ['jpg', 'jpeg', 'png', 'webp'],
  cut: ['png', 'webp'],
  logo: ['png', 'svg', 'webp'],
};

/** Kembalikan daftar URL kandidat untuk sebuah key aset. */
export function urls(key, kind = 'photo') {
  return EXT[kind].map((e) => `${ASSET_BASE}${key}.${e}`);
}

export const primaryPath = (key, kind = 'photo') => `public/assets/${key}.${EXT[kind][0]}`;

/* Aset global (bukan per-bidang) */
export const GLOBAL = {
  logoHeader: { key: 'brand/logo-header', kind: 'logo' },
  logoLotus: { key: 'brand/logo-lotus', kind: 'logo' },
  groupPhoto: { key: 'photos/group-imti', kind: 'photo' },
  ketuaWakil: { key: 'photos/ketua-wakil', kind: 'photo' },
  memojiKnow: { key: 'illustrations/memoji-get-to-know', kind: 'logo' },
  memojiCenter: { key: 'illustrations/memoji-imti-center', kind: 'logo' },
  memojiContact: { key: 'illustrations/memoji-contact', kind: 'logo' },
  ogImage: { key: 'brand/og-image', kind: 'photo' },
};

/**
 * Daftar lengkap aset yang dibutuhkan website — dipakai oleh
 *  - scripts/gen-assets.mjs  (menghasilkan ASSETS.md + CSV + membuat folder)
 *  - halaman /assets-checklist (cek mana yang sudah ada / belum)
 */
export function collectAssets() {
  const list = [];
  const add = (group, key, kind, note, size) =>
    list.push({ group, key, kind, ext: EXT[kind][0], path: `public/assets/${key}.${EXT[kind][0]}`, note, size });

  add('Brand', GLOBAL.logoHeader.key, 'logo', 'Logo lingkaran di header (hitam-navy, ikon kuning). Latar transparan.', '256×256 px');
  add('Brand', GLOBAL.logoLotus.key, 'logo', 'Logo bunga teratai + riak air, WARNA PUTIH, latar transparan. Dipakai di Home (Makna) & diagram Makna Logo.', '1600×960 px');
  add('Brand', 'brand/favicon', 'logo', 'Ikon tab browser (favicon) — versi persegi dari logo IMTI. Latar boleh transparan.', '512×512 px');
  add('Brand', GLOBAL.ogImage.key, 'photo', 'Gambar pratinjau saat link dibagikan (WhatsApp/IG). Rasio 1.91:1.', '1200×630 px');
  add('Foto', GLOBAL.groupPhoto.key, 'photo', 'Foto bersama seluruh fungsionaris (Home hero + About). Landscape.', '3840×2200 px');
  add('Foto', GLOBAL.ketuaWakil.key, 'photo', 'Foto Ketua & Wakil Ketua Lembaga dalam satu frame lebar (rasio ±3:1).', '2700×900 px');
  add('Ilustrasi', GLOBAL.memojiKnow.key, 'logo', 'Memoji cowok berkacamata melambai (Get To Know Us). Latar transparan.', '1000×1000 px');
  add('Ilustrasi', GLOBAL.memojiCenter.key, 'logo', 'Memoji cewek rambut hitam melambai (kartu IMTI Center). Latar transparan.', '900×900 px');
  add('Ilustrasi', GLOBAL.memojiContact.key, 'logo', 'Memoji cewek berhijab & kacamata melambai (kartu Contact Us). Latar transparan.', '900×900 px');

  contactPersons.forEach((p, i) => {
    add('Contact Person', p.photo, 'cut', `Foto potongan ${p.nick} (kalau belum ada, otomatis memakai foto BPH Humas).`, '600×800 px');
  });

  bidang.forEach((b) => {
    const g = `Bidang · ${b.homeTitle}`;
    add(g, b.team, 'photo', 'Foto tim bidang (dipakai di Home, About, hero halaman bidang, Recap, IMTI Center). Rasio ±3:2.', '2400×1600 px');
    b.programs.forEach((p) =>
      add(g, p.photo, 'photo', `Foto program kerja "${p.title}" (opsional — kalau belum ada, otomatis memakai foto tim).`, '1600×1000 px')
    );
    [...b.bph.heads, ...b.bph.wakil, ...b.bph.staf].forEach((p) =>
      add(g, p.photo, 'cut', `${p.role}: ${p.name} — foto potongan badan (latar transparan), kepala di atas.`, '800×1000 px')
    );
    b.bp.forEach((p) => add(g, p.photo, 'photo', `Badan Pengurus: ${p.name} — foto close-up wajah, rasio 5:6.`, '800×960 px'));
  });

  return list;
}
