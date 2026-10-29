/* ==========================================================
   site.js — konfigurasi umum, navigasi, kontak, teks filosofi
   Edit file ini untuk mengganti link & teks tanpa menyentuh halaman.
   ========================================================== */

export const site = {
  name: 'IMTI FTUI 2026',
  longName: 'Ikatan Mahasiswa Teknik Industri Universitas Indonesia',
  tagline: 'Harmonis, Signifikan, Relevan',
  hashtag: '#MerekahMakna',
  description:
    'Website resmi IMTI FTUI 2026 — Ikatan Mahasiswa Teknik Industri Fakultas Teknik Universitas Indonesia. #MerekahMakna: harmonis, signifikan, relevan.',
};

export const nav = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'center', label: 'IMTI Center', href: '/imti-center' },
  { key: 'recap', label: 'Recap', href: '/recap' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

/* Link eksternal. Isi '#' = belum diatur (klik akan menampilkan toast "segera hadir"). */
export const links = {
  instagram: 'https://www.instagram.com/imtiftui/',
  tiktok: 'https://www.tiktok.com/@imtiftui',
  linkedin: '#', // TODO: isi URL LinkedIn IMTI
  youtube: '#', // TODO: isi URL YouTube IMTI FT UI
  email: 'mailto:imtiftui@gmail.com',
  aspirasi: '#', // TODO: isi URL Form Aspirasi Warga TI
  kalender: '#', // TODO: isi URL Kalender Kegiatan
  maps: '#', // TODO (opsional): link Google Maps sekretariat
};

export const stats = [
  { value: 2, label: 'Pemandu lembaga', tone: 'mist' },
  { value: 12, label: 'Bidang', tone: 'yellow' },
  { value: 44, label: 'BPH & Staf Ahli', tone: 'mist' },
  { value: 165, label: 'Badan Pengurus', tone: 'mist' },
];

export const ketuaWakil = {
  ketua: { name: 'Ahmad *Fauzan* Akbari', role: 'Ketua Lembaga · Teknik Industri 2024' },
  wakil: { name: 'Go *Revano* Stevino Gosali', role: 'Wakil Ketua Lembaga · Teknik Industri 2024' },
};

export const channels = [
  { key: 'instagram', title: 'Instagram', sub: '@imtiftui', href: links.instagram },
  { key: 'tiktok', title: 'TikTok', sub: '@imtiftui', href: links.tiktok },
  { key: 'linkedin', title: 'LinkedIn', sub: '', href: links.linkedin },
  { key: 'youtube', title: 'YouTube', sub: 'IMTI FT UI', href: links.youtube },
  { key: 'email', title: 'Email', sub: 'imtiftui@gmail.com', href: links.email },
  { key: 'pin', title: 'Sekretariat', sub: 'Departemen Teknik Industri, FTUI, Depok', href: links.maps },
];

export const contactPersons = [
  {
    nick: 'Ima TI’24',
    name: 'Fathima Hasna Amalia',
    phone: '087882884969',
    line: 'fathimaxhasna',
    role: 'BPH Humas IMTI 2026 (Media)',
    photo: 'contact/ima',
    fallback: 'bidang/humas/bph/bph-02',
  },
  {
    nick: 'Dhika TI’24',
    name: 'Andhika Keanendra Darmawan',
    phone: '087877665520',
    line: 'keanendra15',
    role: 'BPH Humas IMTI 2026 (Relasi)',
    photo: 'contact/dhika',
    fallback: 'bidang/humas/bph/bph-04',
  },
];

/* ----------------------- Teks Home ----------------------- */

export const merekahMakna = {
  merekah: {
    pill: 'ME·RE·KAH',
    title: 'Merekah',
    def: '**Merekah** /me·re·kah/ mulai mekar (tentang bunga)',
    body: 'Layaknya bunga yang perlahan membuka kelopak indahnya, IMTI FTUI 2026 menapaki perjalanan baru menuju lembaga yang **tumbuh dan mekar**, meningkatkan kualitas, memperluas dampak, serta menghadirkan warna baru bagi setiap fungsionaris dan warga Teknik Industri.',
  },
  makna: {
    pill: 'MAK·NA',
    title: 'Makna',
    def: '**Makna** /mak·na/ n pengertian yang diberikan kepada suatu bentuk kebahasaan',
    body: 'IMTI FTUI 2026 menjadi **ruang yang penuh arti**, tempat di mana setiap langkah, karya, dan kolaborasi memiliki makna yang nyata bagi pengembangan diri dan kebermanfaatan bagi fungsionaris, Warga TI, dan masyarakat pada umumnya.',
  },
};

export const visi =
  'Mewujudkan IMTI FTUI yang ==harmonis== dalam kolaborasi, ==signifikan== dalam kebermanfaatan, dan ==relevan== dalam berbagai dinamika dan kebutuhan.';

export const misi = [
  'Menjadikan IMTI FTUI sebagai **__katalis__** bagi pertumbuhan dan kontribusi berkelanjutan para fungsionaris dan Warga TI.',
  'Membangun IMTI FTUI sebagai ekosistem yang mendorong **__kolaborasi, inovasi,__** dan **__kreativitas__** warga Teknik Industri.',
  'Membangun **__kemitraan strategis__** dengan **__pihak eksternal__** untuk memperluas kebermanfaatan IMTI FTUI.',
  'Memberikan **__perubahan positif__** bagi fungsionaris, Warga TI, dan lingkungan sekitar melalui inisiatif dan **__program kebermanfaatan IMTI FTUI__**.',
  'Memberikan layanan pendampingan dan pembinaan lanjutan yang **__relevan dan signifikan__** sebagai bekal bagi warga Teknik Industri untuk **__meningkatkan kualitas__** diri serta **__adaptif__** terhadap perkembangan zaman.',
];

export const maknaLogo = [
  {
    pos: 'tl',
    head: ['Logo', 'Teknik Industri'],
    body: 'Logo Teknik Industri yang terletak di tengah melambangkan bahwa segala **pergerakan**, **pertumbuhan**, dan **makna** yang ingin di==rekah==kan, harus selalu berlandaskan pada nilai-nilai dan keilmuan Teknik Industri UI.',
    hotspot: [49, 79], // posisi titik pada logo (% x, % y)
  },
  {
    pos: 'tr',
    head: ['Siluet', 'Manusia'],
    body: 'Siluet manusia di puncak melambangkan orientasi **Humanis**: fokus utama sistem adalah warganya, memastikan kehadiran IMTI selalu ==Relevan== dengan kebutuhan dan kesejahteraan mereka.',
    hotspot: [50, 20],
  },
  {
    pos: 'bl',
    head: ['Empat', 'Kelopak Bunga'],
    body: 'Empat kelopak yang mengelilingi pusat melambangkan **empat angkatan aktif** di Teknik Industri UI yang saling bersinergi secara ==Harmonis==, tumbuh bersama, dan menjadi kunci agar bunga bisa mekar dengan sempurna.',
    hotspot: [15, 63],
  },
  {
    pos: 'br',
    head: ['Riak', 'Gelombang Makna'],
    body: 'Seperti setetes air yang menciptakan riak yang kian melebar, **makna** dan **kebermanfaatan** IMTI terus bergema dan menyebar luas, memberikan dampak ==Signifikan== bagi lingkungan sekitarnya.',
    hotspot: [86, 79],
  },
];

export const pillars = [
  { key: 'harmonis', label: 'HARMONIS', hint: 'Bersinergi dan tumbuh bersama dalam kolaborasi.' },
  { key: 'signifikan', label: 'SIGNIFIKAN', hint: 'Memberi dampak nyata bagi lingkungan sekitar.' },
  { key: 'relevan', label: 'RELEVAN', hint: 'Selaras dengan dinamika dan kebutuhan warga TI.' },
];
