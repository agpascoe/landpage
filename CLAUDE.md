# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal landing page and portfolio site for Alberto (JAG) Pascoe, deployed at **jagpascoe.info**. Single-page Next.js 15 app with a contact form backed by Resend email API.

## Commands

```bash
npm run dev          # Start dev server with Turbopack (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npm run start        # Serve production build locally
```

No test framework is configured. Validate changes with `npm run lint` and `npm run build`.

## Architecture

**Runtime:** Next.js 15 App Router, deployed on Vercel (auto-deploys from `main` branch).

**Single-page layout** — `app/page.tsx` composes all sections in order:
Header → Hero → Stats → ExecutiveProof → ValueLanes → Ventures → Timeline → CaseProofs → About → Contact → Footer

**Key directories:**
- `app/components/sections/` — Page section components (Hero, Contact, Stats, etc.). Most are server components; `Contact.tsx` and `Hero.tsx` are client components (`'use client'`).
- `app/components/layout/` — Header, Footer
- `app/components/ui/` — Reusable UI primitives (Button using class-variance-authority)
- `lib/content.ts` — All site copy/data (stats, timeline, ventures, case proofs, contact info) as exported constants. Edit here to change content.
- `lib/animations.ts` — Shared Framer Motion animation presets (fadeInUp, staggerContainer, etc.)
- `lib/analytics.ts` — Plausible analytics event tracking helper
- `lib/fonts.ts` — Inter font configuration via `next/font/google`
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `hooks/useScrollAnimation.ts` — Framer Motion `useInView` scroll-triggered animation hook

**Contact form pipeline:**
- Frontend: `app/components/sections/Contact.tsx` → POST `/api/messages`
- Backend: `app/api/messages/route.ts` → Resend email API
- Honeypot field (`website`) for bot filtering — if populated, returns success silently
- Error codes: 400 (missing fields), 502 (Resend failure), 500 (env/runtime error)
- See `RUNBOOK_CONTACT_FLOW.md` for operational details

**SEO:** `app/components/StructuredData.tsx` injects JSON-LD Person schema. OpenGraph/Twitter metadata in `app/layout.tsx`.

## Styling

- **Tailwind CSS v4** via `@import "tailwindcss"` in `app/globals.css` (PostCSS plugin, no `tailwind.config` file)
- CSS custom properties for design tokens defined in `:root` in `globals.css`
- Color palette: slate-900 primary, blue-500 accent
- Font: Inter (loaded via `next/font/google`)
- Prettier with `prettier-plugin-tailwindcss` for class sorting

## Environment Variables

Required for contact form (set in `.env.local` for dev, Vercel dashboard for production):
- `RESEND_API_KEY` — Resend API key
- `CONTACT_TO` — Recipient email address
- `CONTACT_FROM` — Verified Resend sender (e.g., `Jag Pascoe <noreply@jagpascoe.info>`)

Copy `.env.example` to `.env.local` to get started.

## Path Aliases

`@/*` maps to project root (configured in `tsconfig.json`). Use `@/lib/...`, `@/app/...`, `@/hooks/...` for imports.
