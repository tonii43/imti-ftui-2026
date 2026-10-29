/* ==========================================================
   bidang.js — data 12 bidang IMTI FTUI 2026
   Urutan array = urutan tampil di Home, About, dan tombol "bidang berikutnya".

   Cara edit:
   - Ganti nama / tambah orang cukup dengan mengubah array di bawah.
   - BPH  : heads (kepala), wakil (wakil kepala), staf (staf ahli)
   - bp   : daftar nama Badan Pengurus (Teknik Industri 2025)
   - programs: program kerja (dipakai di halaman bidang & Recap)
   Foto otomatis dicari di /public/assets/bidang/<slug>/… dengan nama pendek orangnya (bp-carissa.jpg, bph-taqiyyah.png; lihat ASSETS.md).
   ========================================================== */

import { slugify } from '../util.js';

const A24 = 'Teknik Industri 2024';
const A25 = 'Teknik Industri 2025';

const PROGRAM_PLACEHOLDER = '[Deskripsi singkat 2–3 kalimat: tujuan acara, siapa yang terlibat, dan dampaknya bagi warga TI.]';

const raw = [
  {
    slug: 'humas',
    chip: 'Humas',
    abbr: 'Humas',
    name: 'Hubungan Masyarakat',
    cardTitle: ['Hubungan', '*Masyarakat*'],
    heroTitle: ['Hubungan', '*Masyarakat*'],
    homeTitle: 'Hubungan Masyarakat',
    homeSub: 'Humas',
    desc: 'Bidang yang bertanggung jawab sebagai penghubung antara IMTI dengan para stakeholder dan pengatur penyebarluasan informasi antara IMTI baik dari internal maupun eksternal.',
    service: 'Media partner & publikasi',
    bph: {
      heads: [{ name: 'Taqiyyah Hasna H.', role: 'Kepala Bidang' }],
      wakil: [
        { name: 'Fathima Hasna Amalia', role: 'Wakil Kepala Bidang' },
        { name: 'Aufa Hilyaturrahmah', role: 'Wakil Kepala Bidang' },
        { name: 'Andhika Keanendra D.', role: 'Wakil Kepala Bidang' },
        { name: 'Nazwa Humairoh', role: 'Wakil Kepala Bidang' },
      ],
      staf: [],
    },
    bp: [
      'Carissa Humaira A.', 'Sahlan Zarkasi', 'Naswa Berliana Achsan', 'Nailah Shafiyyah', 'Ken Afifah Setya', 'Adelia Rafif Faraysha',
      'Fari Wildan Marleman', 'Nindya Anindita D.', 'Nazla Rasyifa', 'Muhammad Ilham Nursyafat', 'Rifa Zakee Az-Zahra', 'Khairiya Diraya Hidayat',
      'Adra Keira Arto', 'Rifda Aqila Putri W.', 'Muhammad Dimas Arya Putra', 'Catherine Ivana',
    ],
    programs: [{ title: 'Teknik Industri Open House', tri: 'Triwulan 2', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'kastrat',
    chip: 'Kastrat',
    abbr: 'Kastrat',
    name: 'Kajian & Aksi Strategis',
    cardTitle: ['Kajian', '*Aksi Strategis*'],
    heroTitle: ['Kajian', '*Aksi', 'Strategis*'],
    homeTitle: 'Kajian & Aksi Strategis',
    homeSub: 'Kastrat',
    desc: 'Bidang yang bertujuan untuk meningkatkan pemahaman dan kesadaran warga TI tentang isu politik, ekonomi, sosial, budaya, pertahanan, keamanan, dan lingkungan.',
    service: 'Kajian & rilis sikap',
    bph: {
      heads: [{ name: 'Ken Mandhaga P.', role: 'Kepala Bidang' }],
      wakil: [
        { name: 'Syifa Lelinnisa K.', role: 'Wakil Kepala Bidang' },
        { name: 'Azriel Ahmad Fahrieza', role: 'Wakil Kepala Bidang' },
      ],
      staf: [{ name: 'Alyssa Zahwa Minerva', role: 'Staf Ahli' }],
    },
    bp: [
      'Nathanael Pardomuan', 'Ernawa Widya Octaviana', 'Bojan Farrell Pinandoro', 'Aubrey Nathanaella', 'Muhammad Nabil Rachman', 'Muhammad Cairo Haryanto',
      'Nayla Andriani', 'Wisnu Dharma Wicaksono', 'Gianina Heening P. R. S.', 'Aditya Pasha Ramadhan', 'Goklas Jubelzasar T.', 'Rafi Baharizqi Wibowo',
      'Ahmad Rozaan',
    ],
    programs: [{ title: 'Infografis x IMDC', tri: 'Triwulan 1 – Triwulan 3', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'sosma',
    chip: 'Sosma',
    abbr: 'Sosma',
    name: 'Sosial Masyarakat',
    cardTitle: ['Sosial', '*Masyarakat*'],
    heroTitle: ['Sosial', '*Masyarakat*'],
    homeTitle: 'Sosial Masyarakat',
    homeSub: 'Sosma',
    desc: 'Bidang yang bertanggung jawab atas pengadvokasian kesejahteraan mahasiswa dan sebagai wadah peningkatan kepedulian mahasiswa terhadap masyarakat sekitar.',
    service: 'Advokasi kesejahteraan',
    bph: {
      heads: [{ name: 'Wanda Nayla Zahra A.', role: 'Kepala Bidang' }],
      wakil: [
        { name: 'Ailsa Azalia Fahima', role: 'Wakil Kepala Bidang' },
        { name: 'Zhafirah Amalia Putri', role: 'Wakil Kepala Bidang' },
      ],
      staf: [{ name: 'Mochammad Alief Z.', role: 'Staf Ahli' }],
    },
    bp: [
      'Rumbayan Maria A. V.', 'Aisyah Zahra', 'Revangga Dwi F.', 'Nasywa Atifa', 'Anna Althafunnissa', 'Muhammad Reza',
      'Nadine Azzahra P. D.', 'Indira Danastri Hadisoerjo', 'Muhamad Rizky Farel', 'Dea Putri Dwinanda', 'Elisha Rahmania Zahia', 'Mobarez Al Mattazora',
      'Raffael Targoardo G. M.', 'Haya Izzah Mahira', 'Abigail Rotua Andini Pardede', 'Muhammad Dzaki Event P.',
    ],
    programs: [{ title: 'Volunteering Center', tri: 'Triwulan 2 – Triwulan 3', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'iptek',
    chip: 'IPTEK',
    abbr: 'IPTEK',
    name: 'Ilmu Pengetahuan & Teknologi',
    cardTitle: ['Ilmu Pengetahuan', '& *Teknologi*'],
    heroTitle: ['Ilmu Pengetahuan', '& *Teknologi*'],
    homeTitle: 'Ilmu Pengetahuan & Teknologi',
    homeSub: 'IPTEK',
    desc: 'Bidang yang memajukan keilmiahan di TI melalui penuansaan keilmiahan, pencerdasan warga, dan pewadahan minat dan bakat mahasiswa TI.',
    service: 'Info lomba & keilmiahan',
    bph: {
      heads: [{ name: 'Muhammad Syafiq A.', role: 'Kepala Bidang' }],
      wakil: [
        { name: 'Lathofa Ahmad', role: 'Wakil Kepala Bidang' },
        { name: 'Safina Aliya Irsanti', role: 'Wakil Kepala Bidang' },
      ],
      staf: [{ name: 'Nabila Puteri R.', role: 'Staf Ahli' }],
    },
    bp: [
      'Halla', 'Nashwa Aurelia', 'James Lee', 'Nisrina Fathiyyah Ahmad', 'Alamanda Putria J.', 'Falih Fikri H.',
      'Bunga Alexandra M.', 'Aisyah Zae Ramadhany', 'Raden Roro G. A.', 'Renaia Shadiya V.', 'Yonatan Sardo S.', 'Raissa Aliya Putri',
      'Chandra Ardywinata P.', 'Taranita Putri M. G.', 'Putu Anggeni A. P.', 'Muhammad Rafi Al Ghazali M.',
    ],
    programs: [{ title: 'ISEEC UI', tri: 'Triwulan 3', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'ikhtiar',
    chip: 'Ikhtiar',
    abbr: 'Ikhtiar',
    name: 'Ikatan Keluarga Harmonis Teknik Industri dalam Rohis',
    cardTitle: ['~IKHTIAR~'],
    heroTitle: ['~IKHTIAR~'],
    heroSub: 'Ikatan Keluarga Harmonis Teknik Industri dalam Rohis',
    homeTitle: 'Ikhtiar',
    homeSub: 'Ikatan Keluarga Harmonis TI dalam Rohis',
    desc: 'Bidang yang bertanggung jawab dalam proses pembinaan dan memberikan wadah kerohanian serta menebarkan penuansaan nilai-nilai kebaikan antar umat beragama.',
    service: 'Kegiatan kerohanian',
    bph: {
      heads: [
        { name: 'Gaza Al Ghifari', role: 'Kepala Kerohanian' },
        { name: 'Aulia Syakira Fairuza', role: 'Kepala Keputrian' },
      ],
      wakil: [],
      staf: [{ name: 'Rahma Nadiya A.', role: 'Staf Ahli' }],
    },
    bp: [
      'Risyad Ahmad Fauzie', 'Zul Karnail', 'Brian Ahmad Badawi', 'Arya Anggaraksa A.', 'Muhammad Fadhlurrahman Nafis', 'Hana Azharia N.',
      'Zahraa Bening Ayomi Y.', 'Muhammad Fachri W.', 'Mubasyyir Fahmi', 'Andini Trimuliani Achmadi', 'Raditya Widiyantoro P.', 'Febriana Bunga',
      'Teuku Z. M. Azni',
    ],
    programs: [
      {
        title: 'JKo Days',
        tri: 'Triwulan 1',
        desc: 'Program kerja yang bertujuan untuk menumbuhkan iklim kerohanian di lingkup Teknik Industri melalui penuansaan secara langsung ke warga dan memberikan pembekalan kerohanian Islam kepada warga Teknik Industri.',
      },
    ],
  },
  {
    slug: 'kema',
    chip: 'Kema',
    abbr: 'Kema',
    name: 'Kemahasiswaan',
    cardTitle: ['*Kema*hasiswaan'],
    heroTitle: ['*Kema*ha', 'siswaan'],
    homeTitle: 'Kemahasiswaan',
    homeSub: 'Kema',
    desc: 'Bidang pewadahan bagi seluruh warga TI yang berperan sebagai koordinator dan fasilitator pembinaan untuk mengembangkan seluruh warganya.',
    service: 'Pembinaan',
    bph: {
      heads: [{ name: 'Fakhriyan Rafif Athallah', role: 'Kepala Bidang' }],
      wakil: [{ name: 'Kamilah Safitri Sjarif', role: 'Wakil Kepala Bidang' }],
      staf: [
        { name: 'Muhammad Razan W.', role: 'Staf Ahli' },
        { name: 'Umaro Pawelloy B.', role: 'Staf Ahli' },
      ],
    },
    bp: [
      'Altan Muhamad H.', 'Aurheva Divinia Zuhayr', 'Muhammad Arash Ishak', 'Aisha Nadira Iswadi', 'Fahad Syahraz A.', 'Marvin Dzaky Y.',
      'Kirana Azizah', 'Mufidah Reyhanun', 'Rafif Izzu F.', 'Hezkiel', 'Marsa Putri I.', 'Jason Alexsandro P. M.',
      'Jelin Theresia I. S.', 'Diandra Abidzar Z. A.',
    ],
    programs: [{ title: 'Waktu Industri Berbincang (WIB)', tri: 'Triwulan 2', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'siwa',
    chip: 'Kreasi',
    abbr: 'Siwa',
    name: 'Kreasi Mahasiswa',
    cardTitle: ['Kreasi', '*Mahasiswa*'],
    heroTitle: ['Kreasi', '*Mahasiswa*'],
    homeTitle: 'Kreasi Mahasiswa',
    homeSub: 'Siwa',
    desc: 'Bidang yang mewadahi, memfasilitasi, dan mengembangkan minat dan bakat mahasiswa TI di bidang olahraga dan seni serta mengapresiasi kontingen TI.',
    service: 'Kontingen olahraga & seni',
    bph: {
      heads: [{ name: 'Timmo Ahmad A.', role: 'Kepala Bidang' }],
      wakil: [
        { name: 'Muhammad Zaltan A.', role: 'Wakil Kepala Bidang' },
        { name: 'Aneva Shalen Kaloko', role: 'Wakil Kepala Bidang' },
      ],
      staf: [
        { name: 'Radya Aisar N. G.', role: 'Staf Ahli' },
        { name: 'Saniya Rhausani Rully', role: 'Staf Ahli' },
      ],
    },
    bp: [
      'Vishi A. Syekhan', 'Fakhirah Nailatussy S.', 'Legowo Ezra P.', 'Bening Laras Melati', 'Ahmad Fathir B. S.', 'Muhammad Nafan Muafi',
      'Patricia Putri Noveli', 'Radityo El R.', 'Luvena Kayla Ahmad', 'Muhammad Marcel Ihsan', 'Achmad Affan Darrell', 'Putu Kiera Oyca Putri',
      'Arfan Rasyid P.', 'Jessica Merry H.', 'Muhammad Daffa A. A.',
    ],
    programs: [{ title: 'Art Day TI', tri: 'Triwulan 3', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'wirus',
    chip: 'Wirus',
    abbr: 'Wirus',
    name: 'Kewirausahaan',
    cardTitle: ['Ke*wirausaha*an'],
    heroTitle: ['Ke*wira*', '*usaha*an'],
    homeTitle: 'Kewirausahaan',
    homeSub: 'Wirus',
    desc: 'Bidang yang berperan dalam menyokong dana IMTI, memenuhi kebutuhan, dan menumbuhkan jiwa kewirausahaan mahasiswa TI UI.',
    service: 'Katalog merchandise IMTI',
    bph: {
      heads: [{ name: 'Timothy Devid T. L. T.', role: 'Kepala Bidang' }],
      wakil: [
        { name: 'Nailah Budi Putriutami', role: 'Wakil Kepala Bidang' },
        { name: 'Rangga Raditya S.', role: 'Wakil Kepala Bidang' },
      ],
      staf: [{ name: 'Naila Tazkiatus S.', role: 'Staf Ahli' }],
    },
    bp: [
      'Achmad Atthaillah', 'Felice Chan', 'Naya Ramadhani', 'Dafi Wisam Zharif', 'Shouma Ahmad Samarkandi', 'Yosinta Hera Elviana',
      'Rania Alika Larasati', 'Muhammad Aslam Habibulloh', 'Keindra Lutfirrahman Firdausy', 'Arfan Ghani Santoso', 'Elysia Kosasih', 'Ramadan Putera Kadarsan',
      'Maliq Jibran Solihin Kalla', 'Farlianda Farah Rizqita', 'Chelsea Berliana Halim', 'Nur Muhammad Wafiq Rizqullah',
    ],
    programs: [{ title: 'ShopAtWeerus', tri: 'Triwulan 1 – Triwulan 3', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'kestari',
    chip: 'Kestari',
    abbr: 'Kestari',
    name: 'Kesekretariatan',
    cardTitle: ['Ke*sekretari*atan'],
    heroTitle: ['Ke*sekretari*', 'atan'],
    homeTitle: 'Kesekretariatan',
    homeSub: 'Kestari',
    desc: 'Bidang yang memiliki tanggung jawab atas administrasi, inventarisasi, dan timeline IMTI serta berperan dalam menjaga hubungan fungsionaris antar lembaga.',
    service: 'Peminjaman inventaris',
    bph: {
      heads: [{ name: 'Rifdah Aufa Destiani', role: 'Kepala Bidang' }],
      wakil: [{ name: 'Kanaya Sadina Azfa', role: 'Wakil Kepala Bidang' }],
      staf: [],
    },
    bp: [
      'Ahmad Faisa Bahy', 'Yoggy Arbiansyah', 'Sheryl Natasha Alliah', 'Izyani Tri Maulidiyah', 'Yosafat Justin Erman Sirait', 'Anantazeina Adrian Putra',
      'Naura Raya Nugraha', 'Nadya Octavia Munte',
    ],
    programs: [{ title: 'Timeline Control', tri: 'Triwulan 1 – Triwulan 3', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'litbang',
    chip: 'Litbang',
    abbr: 'Litbang',
    name: 'Penelitian & Pengembangan',
    cardTitle: ['Penelitian', '& *Pengembangan*'],
    heroTitle: ['Penelitian', '& *Pengembangan*'],
    homeTitle: 'Penelitian & Pengembangan',
    homeSub: 'Litbang',
    desc: 'Bidang yang bertanggung jawab meneliti, mengembangkan, dan mengevaluasi performa IMTI dan berperan sebagai konsultan agar terciptanya continuous improvement pada IMTI.',
    service: 'Form evaluasi & QC',
    bph: {
      heads: [{ name: 'Muhammad Royyan S.', role: 'Kepala Bidang' }],
      wakil: [
        { name: 'Sheren Angelica', role: 'Wakil Kepala Bidang' },
        { name: 'Sandy Putra Prabowo', role: 'Wakil Kepala Bidang' },
        { name: 'Safira Zayna P.', role: 'Wakil Kepala Bidang' },
      ],
      staf: [],
    },
    bp: [
      'Anabelle Franceline L.', 'Muhammad Hafizh O.', 'Yulian Destya R.', 'Muhammad Baihaki', 'Marchsavilla S. P.', 'Yanuar Al Hafidz',
      'Salsabila Azarine D.', 'Rama Zaki A.', 'Aiwis Dewi Rambing', 'Muhammad Omar H. P.', 'Syifa Nadya', 'Muhammad Luthfi H.',
      'Ferents Mika Yeeps', 'Riquello Rammstein T.', 'Firyaal Nur Azizah',
    ],
    programs: [{ title: 'Blueprint', tri: 'Triwulan 1 – Triwulan 3', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'kebend',
    chip: 'Kebend',
    abbr: 'Kebend',
    name: 'Kebendaharaan',
    cardTitle: ['*Kebenda*haraan'],
    heroTitle: ['*Kebenda*', 'haraan'],
    homeTitle: 'Kebendaharaan',
    homeSub: 'Kebend',
    desc: 'Bidang yang bertanggung jawab dalam pengawasan dan pengelolaan keuangan IMTI.',
    service: 'Laporan keuangan',
    bph: {
      heads: [{ name: 'Kael Akmal', role: 'Kepala Bidang' }],
      wakil: [{ name: 'Arya Malik Hafizh', role: 'Wakil Kepala Bidang' }],
      staf: [],
    },
    bp: [
      'Gianlucca Aryaputra K.', 'Audrey Barus', 'Aaliyah Rahman', 'Nabeel Ahmad Z.', 'Dafa Mawla Rahman', 'Jasmine Rania M.',
      'Serina Cahya H.', 'Kheyandra Pranidhana M.',
    ],
    programs: [{ title: 'Pengelolaan Keuangan IMTI', tri: 'Triwulan 1 – Triwulan 3', desc: PROGRAM_PLACEHOLDER }],
  },
  {
    slug: 'akpro',
    chip: 'Akpro',
    abbr: 'Akpro',
    name: 'Akademis & Keprofesian',
    cardTitle: ['Akademis', '& *Keprofesian*'],
    heroTitle: ['Akademis', '& *Keprofesian*'],
    homeTitle: 'Akademis & Keprofesian',
    homeSub: 'Akpro',
    desc: 'Bidang yang bertanggung jawab dalam mewadahi kebutuhan akademis, pasca kampus, dan pengadvokasian masalah akademis warga Teknik Industri UI.',
    service: 'Bank soal & info karier',
    bph: {
      heads: [{ name: 'Wirza Naila Zulhifani', role: 'Kepala Bidang' }],
      wakil: [
        { name: 'Lauren Novianty', role: 'Wakil Kepala Bidang' },
        { name: 'Wandira Ajeng Prahita', role: 'Wakil Kepala Bidang' },
      ],
      staf: [],
    },
    bp: [
      'Malvino Hizkia A. P.', 'Vira Veodora Talao', 'Muhammad Yunus S. J.', 'Alethea Arfa Faradisa Faz', 'Ivan Jonathan S.', 'Alicia Apriliani',
      'Muhammad Ihsan Yusuf', 'Aleesha Livinta Affat', 'Stefanus Panji Adhi Nugraha Putra', 'Sisca Valencia', 'Marsya Putri Amanda', 'Ahmad Rifqi Fauzan',
      'Aliyya Faiza Wibowo', 'Hans Ottovius Lumbanraja', 'Auralia Sabrina',
    ],
    programs: [{ title: 'Ekskursi', tri: 'Triwulan 2', desc: PROGRAM_PLACEHOLDER }],
  },
];

/* ---------------- Normalisasi + penentuan path foto ---------------- */

const pad = (n) => String(n).padStart(2, '0');

/* Nama file foto = nama pendek orang (tanpa angka), mis. bp-carissa.jpg, bph-taqiyyah.png.
   Awalan "Muhammad/Muhamad/Ahmad/M." dilewati; kalau kembar dalam satu folder, ditambah kata berikutnya. */
const SKIP = new Set(['muhammad', 'muhamad', 'mohammad', 'ahmad', 'm', 'moh', 'al', 'el']);
const tokens = (name) => {
  const t = slugify(name).split('-').filter(Boolean);
  const rest = t.filter((w, i) => !(i === 0 && SKIP.has(w)) && w.length > 1);
  return rest.length ? rest : t;
};
function shortNames(names) {
  const used = new Set();
  return names.map((n) => {
    const t = tokens(n);
    let k = 1;
    let id = t.slice(0, k).join('-');
    while (used.has(id) && k < t.length) id = t.slice(0, ++k).join('-');
    for (let c = 2; used.has(id); c++) id = `${t.join('-')}-${c}`;
    used.add(id);
    return id;
  });
}

export const bidang = raw.map((b, i) => {
  const base = `bidang/${b.slug}`;
  const bphAll = [...b.bph.heads, ...b.bph.wakil];
  const bphIds = shortNames(bphAll.map((p) => p.name));
  const stafIds = shortNames(b.bph.staf.map((p) => p.name));
  const bpIds = shortNames(b.bp);
  const mapBph = (p, kind, id) => ({ ...p, angkatan: A24, kind, photo: `${base}/bph/${kind === 'staf' ? 'staf' : 'bph'}-${id}` });
  const heads = b.bph.heads.map((p, j) => mapBph(p, 'bph', bphIds[j]));
  const wakil = b.bph.wakil.map((p, j) => mapBph(p, 'bph', bphIds[b.bph.heads.length + j]));
  const staf = b.bph.staf.map((p, j) => mapBph(p, 'staf', stafIds[j]));
  return {
    ...b,
    index: i,
    team: `${base}/team`,
    heroSub: b.heroSub ?? b.abbr,
    bph: { heads, wakil, staf },
    bp: b.bp.map((name, j) => ({ name, angkatan: A25, photo: `${base}/bp/bp-${bpIds[j]}` })),
    programs: b.programs.map((p, j) => ({ ...p, photo: `${base}/proker-${pad(j + 1)}`, bidang: b.slug })),
  };
});

export const bySlug = Object.fromEntries(bidang.map((b) => [b.slug, b]));
export const getBidang = (slug) => bySlug[slug] ?? null;
export const neighbors = (slug) => {
  const i = bidang.findIndex((b) => b.slug === slug);
  return { prev: bidang[(i - 1 + bidang.length) % bidang.length], next: bidang[(i + 1) % bidang.length] };
};

export const PLACEHOLDER_PROGRAM = {
  title: '[Nama Program Kerja]',
  desc: '[Satu kalimat tujuan program kerja.]',
  placeholder: true,
};
