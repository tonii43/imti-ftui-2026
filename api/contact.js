// Vercel Function: POST /api/contact  → kirim email via Resend.
// Env (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  (wajib)   CONTACT_TO (tujuan, default imtiftui@gmail.com)   CONTACT_FROM (default "IMTI FTUI <onboarding@resend.dev>")
// Jika RESEND_API_KEY belum diisi, fungsi membalas 503 dan website otomatis membuka aplikasi email (mailto).
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ ok: false, error: 'not-configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const name = String(body?.name ?? '').trim().slice(0, 80);
  const email = String(body?.email ?? '').trim().slice(0, 120);
  const message = String(body?.message ?? '').trim().slice(0, 2000);
  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ ok: false, error: 'invalid' });

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'IMTI FTUI <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'imtiftui@gmail.com'],
      reply_to: email,
      subject: `Pesan website IMTI FTUI — ${name}`,
      html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  }).catch(() => null);
  if (!r?.ok) return res.status(502).json({ ok: false, error: 'send-failed' });
  return res.status(200).json({ ok: true });
}
