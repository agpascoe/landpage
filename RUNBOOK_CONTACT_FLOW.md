# Runbook — Production Contact Flow (`/api/messages`)

**System:** `jagpascoe.info` (Next.js on Vercel)  
**Provider:** Resend  
**API Route:** `app/api/messages/route.ts` (`POST /api/messages`)  
**Last updated:** 2026-02-25

---

## 1) Code-side requirements (verified)

Current server-side behavior in `app/api/messages/route.ts`:

- Expects JSON body with:
  - `name` (required)
  - `email` (required)
  - `message` (required)
  - `website` (optional honeypot; should be empty)
- If `website` is populated, route returns success immediately and **does not send email**.
- If required fields are missing: returns `400` with `{ "error": "Missing fields" }`.
- Reads required env vars with strict guard (`Missing env var: ...`):
  - `RESEND_API_KEY`
  - `CONTACT_TO`
  - `CONTACT_FROM`
- Sends via Resend `emails.send({ to, from, replyTo, subject, text })`.
- On Resend provider error: returns `502`.
- On unexpected exception (including missing env): returns `500`.

---

## 2) Required environment variables (Vercel)

Set these in **Vercel Project → Settings → Environment Variables** for at least `Production` (and `Preview` if needed):

1. `RESEND_API_KEY`
   - Format: Resend API key string (e.g., `re_...`)
   - Must be active and valid for sending email.

2. `CONTACT_TO`
   - Format: recipient email address (single mailbox), e.g. `agonzalp@icloud.com`
   - Current code passes this as `to` directly (single address expected).

3. `CONTACT_FROM`
   - Format: verified sender identity in Resend, e.g.
     - `Jag Pascoe <noreply@jagpascoe.info>` (recommended once domain is verified), or
     - `onboarding@resend.dev` (dev/testing only)
   - Must match a **verified** domain/sender in Resend, or sends will fail (`502`).

### Local development

Use `.env.local` (do not commit secrets). Template exists in `.env.example`.

---

## 3) Resend sender/domain verification notes

For reliable production deliverability:

1. In Resend dashboard, verify domain `jagpascoe.info`.
2. Configure required DNS records (SPF/DKIM, and any Resend-provided records).
3. Wait for verification to show **Verified** status.
4. Use a domain-based sender in `CONTACT_FROM` (e.g., `noreply@jagpascoe.info`).
5. Keep `replyTo` behavior as-is so replies go to the visitor’s submitted email.

If domain is not verified, or sender is not recognized, Resend can reject send attempts and API returns `502`.

---

## 4) Manual health check (quick, non-destructive)

Target: validate contact pipeline readiness in under 5 minutes.

### A. Config check (no traffic)

- Confirm in Vercel Production env:
  - `RESEND_API_KEY` set
  - `CONTACT_TO` set
  - `CONTACT_FROM` set and matches verified sender/domain

### B. API behavior check (no real email send)

Use honeypot path to validate endpoint safely (does not call Resend):

```bash
curl -i -X POST http://localhost:3000/api/messages \
  -H 'Content-Type: application/json' \
  -d '{"name":"Health Check","email":"check@example.com","message":"ping","website":"bot-filled"}'
```

Expected: HTTP `200` with `{ "success": true }`.

### C. Input validation check (no real email send)

```bash
curl -i -X POST http://localhost:3000/api/messages \
  -H 'Content-Type: application/json' \
  -d '{"name":"","email":"","message":"","website":""}'
```

Expected: HTTP `400` and `Missing fields`.

### D. Optional live smoke (sends real email)

Submit real form on production only when needed; confirm message arrives in `CONTACT_TO` mailbox.

---

## 5) Failure modes and troubleshooting

## Symptom: `500` from `/api/messages`

Likely causes:
- Missing env vars in runtime (`Missing env var: ...`)
- Unhandled runtime exception

Actions:
1. Check Vercel function logs for exact message.
2. Verify all three env vars exist in Production environment.
3. Redeploy after env updates if required by Vercel project settings.

## Symptom: `502` from `/api/messages`

Likely causes:
- Resend API rejection/error
- Invalid or revoked `RESEND_API_KEY`
- `CONTACT_FROM` not verified

Actions:
1. Check Resend dashboard logs/status.
2. Confirm API key validity and scope.
3. Confirm sender/domain verification state.
4. Re-test with known-good verified sender.

## Symptom: `400 Missing fields`

Likely causes:
- Frontend payload malformed
- Required fields empty

Actions:
1. Verify request payload includes non-empty `name`, `email`, `message`.
2. Inspect frontend network payload from contact form.

## Symptom: Silent success but no email

Likely causes:
- Honeypot field (`website`) is being populated unexpectedly
- Message routed to spam/junk or filtered

Actions:
1. Confirm submitted payload has `website` empty for real users.
2. Check mailbox spam/junk and mailbox rules.
3. Verify Resend event logs for accepted/rejected sends.

---

## 6) Rollback & escalation guidance

### Rollback (fastest safe path)

1. Revert last bad commit on `main` and push, **or**
2. Redeploy last known-good deployment in Vercel.

Then run quick health checks again.

### Escalation triggers

Escalate immediately if:
- Contact endpoint fails for >15 minutes in production.
- Repeated `502` with verified sender and valid key.
- Deliverability degradation persists after config checks.

### Escalation targets

1. **App owner / Jag** — decision on temporary contact fallback.
2. **Vercel support/log review** — runtime/platform anomalies.
3. **Resend support** — provider-level send rejection or account/domain issues.

### Temporary mitigation

- If contact flow remains degraded, publish a temporary direct contact method (email/LinkedIn) on the site until API path is restored.

---

## 7) Hardening notes (current state)

Already implemented in code:
- Required env guards (`Missing env var`)
- Honeypot anti-bot short-circuit
- Clear HTTP status mapping (`400`/`502`/`500`)

Recommended next hardening (future ticket):
- Basic email format validation server-side.
- Rate limiting (IP-based) on `/api/messages`.
- Structured logging / correlation IDs for support triage.
- Optional secondary notification channel for delivery failures.
