# Deployment Guide (Production)

This project is deployed on **Vercel**. Contact form delivery is handled by **Resend** via `app/api/messages/route.ts`.

## Architecture (current)

- Runtime: Next.js App Router on Vercel
- Production deploy trigger: push/merge to `main` (Vercel auto-deploy)
- Contact pipeline: `/api/messages` → Resend email API
- No VM/SSH/Nginx/PM2/filesystem message storage in production

## Prerequisites

- Access to:
  - GitHub repo: `agpascoe/landpage`
  - Vercel project linked to this repo
  - Resend account with verified sender/domain
- Local tooling for validation:
  - Node.js 18+ (recommend current LTS)
  - npm

## Required environment variables

Set in Vercel project environment (Production, and Preview if desired):

- `RESEND_API_KEY`
- `CONTACT_TO`
- `CONTACT_FROM` (must be a verified Resend sender/domain)

Local development uses `.env.local` (see `.env.example` / `.env.development.example`).

## Deploy flow (standard)

1. Create branch and implement change.
2. Validate locally:
   ```bash
   npm run lint
   npm run build
   npm run dev
   ```
3. Open PR and merge to `main` after approval.
4. Vercel automatically builds and deploys `main` to production.
5. Smoke check:
   - Home page loads on `https://jagpascoe.info`
   - Contact form submission succeeds

## Rollback basics

Fastest rollback options:

1. **Git revert** the breaking commit on `main` and push.
2. Or **redeploy the last known-good deployment** from Vercel.

After rollback, re-run smoke checks (site + contact form).

## Contact API operational notes

Endpoint: `POST /api/messages`

Expected JSON body:

```json
{
  "name": "...",
  "email": "...",
  "message": "...",
  "website": "" 
}
```

Behavior:

- `website` is a honeypot field; if populated, API returns success without sending email.
- Missing `name`, `email`, or `message` returns `400`.
- Missing env vars returns `500` (`Missing env var: ...`).
- Resend provider failures return `502`.
- Success returns `{ "success": true, "id": "..." }`.

## Troubleshooting quick checks

1. **Deployment failing on Vercel**
   - Check build logs for lint/type/build errors.
   - Confirm `main` branch is connected to the correct Vercel project.

2. **Contact form returns 500**
   - Verify `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` are set in Vercel.
   - Confirm `CONTACT_FROM` is verified in Resend.

3. **Contact form returns 502**
   - Check Resend dashboard/API status and logs.
   - Validate API key scope and sender/domain verification.

4. **Local works, production fails**
   - Compare local `.env.local` vs Vercel env values.
   - Confirm latest commit is deployed to production.

---
Last updated: 2026-02-25
