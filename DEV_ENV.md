# DEV_ENV — Environment Variables (Dev / Vercel)

This file documents **which environment variables the project uses**.

✅ **Do NOT put real secrets here.**
- Local secrets go in `.env.local` (already gitignored via `.env*`).
- Production secrets should be set as Vercel Environment Variables (or via Vercel CLI).

---

## Contact Form (Resend)
Used by: `POST /api/messages` (`app/api/messages/route.ts`)

Required:
- `RESEND_API_KEY` — Resend API key (secret)
- `CONTACT_TO` — destination inbox (e.g. `agonzalp@icloud.com`)
- `CONTACT_FROM` — verified sender in Resend
  - Example (recommended once domain verified): `Jag Pascoe <noreply@jagpascoe.info>`
  - Example (dev/test): `onboarding@resend.dev`

Optional:
- (Honeypot field) JSON payload includes `website` (should be empty for humans)

---

## Notes
- `.env.example` contains the non-secret template for local dev.
- `.env.local` contains real values for local dev (do not commit).
