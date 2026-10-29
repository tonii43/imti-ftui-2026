# Deploy: GitHub → Vercel → Hostinger
1. **GitHub**: buat repo (mis. `imti-ftui-2026`), lalu `git remote add origin <url> && git push -u origin main`.
2. **Vercel**: Add New → Project → import repo. Setting sudah dibaca dari `vercel.json` (build `npm run build`, output `dist`). Deploy.
   - Env opsional untuk form kontak: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`. Tanpa itu form membuka aplikasi email (mailto).
   - Env opsional `SITE_URL=https://domainkamu.com` untuk sitemap/OG.
3. **Domain**: Vercel → Project → Settings → Domains → tambah domain. Di Hostinger (DNS Zone) isi record persis seperti yang ditampilkan Vercel (umumnya `A @ 76.76.21.21` dan `CNAME www cname.vercel-dns.com`).
4. Tunggu propagasi DNS (menit–jam); SSL otomatis.
