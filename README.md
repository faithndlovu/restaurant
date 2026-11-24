# Savanna Grill

A TanStack Start (React 19 + Vite) restaurant website with a Supabase backend.

> **Portfolio demo.** Savanna Grill is a fictional restaurant. The name, logo,
> address, phone number and email are placeholders, and the food photos are
> royalty-free stock images from Unsplash.

It runs on a standard, self-contained TanStack Start + Vite toolchain.

## Requirements

- Node.js 20.19+ (or 22+)
- A Supabase project

## Setup

```bash
npm install
cp .env.example .env   # then fill in your Supabase values
```

See `.env.example` for the required variables. The `VITE_*` keys are inlined
into the browser bundle at build time; the non-prefixed keys are used by SSR and
server functions. `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be
exposed to the client.

## Develop

```bash
npm run dev          # http://localhost:3000
```

## Production

```bash
npm run build        # outputs dist/client (static) + dist/server (SSR handler)
npm run start        # serves the build on http://localhost:3000 (any Node host)
```

`npm run start` runs `server/prod.mjs`, a small portable server that serves the
static assets and pipes everything else through the SSR handler. It works on any
Node host (Render, Railway, Fly.io, a VPS, etc.).

## Deploy to Vercel

`vercel.json` and `api/index.mjs` are already configured:

- `npm run build` produces the static client (`dist/client`) and the SSR bundle.
- `api/index.mjs` is a serverless function that runs the SSR handler.
- Static files are served directly; all other routes are rewritten to the function.

Set the environment variables from `.env.example` in your Vercel project settings
(Project → Settings → Environment Variables), then deploy. The `VITE_*` variables
must be present at **build** time.

## Things you still need to do

These are the steps that live outside the codebase. Until they are done the site
builds and deploys, but parts of it will not work for a visitor.

1. **Apply the outstanding migrations.** Two migrations in
   `supabase/migrations/` are not in the hosted database yet. Run them with
   `supabase db push`, or paste each file into the Supabase SQL editor:
   - `20260921120000_bootstrap_admins.sql` — the allowlist that makes the first
     admin account possible.
   - `20260923120000_contact_and_newsletter.sql` — the `contact_messages` and
     `newsletter_subscribers` tables. **The contact form and the newsletter
     signup both fail until this one is applied.**

2. **Name the first admin.** `grant_admin()` refuses anyone who is not already
   an admin, so the first one is seeded by hand. In the SQL editor:

   ```sql
   insert into public.bootstrap_admins (email) values ('owner@example.com');
   select public.sync_bootstrap_admins();   -- if that account already signed up
   ```

3. **Use the right site URL everywhere.** Put your deployed URL (for example
   `https://your-project.vercel.app`) in Supabase → Authentication → URL
   Configuration, both as the Site URL and in the redirect allowlist
   (`https://your-project.vercel.app/auth/callback`).

4. **Google sign-in is currently disabled.** The "Continue with Google" button
   and its `onGoogle` handler are commented out in `src/routes/auth.tsx`,
   because the provider is not enabled on the Supabase project and the button
   only produced `Unsupported provider: provider is not enabled`. Email and
   password sign-in is unaffected. To turn Google back on: create a Web
   application OAuth client in the Google Cloud console with
   `https://isawexccruqpiecjmrgs.supabase.co/auth/v1/callback` as the authorized
   redirect URI, enable Google under Authentication → Providers in Supabase,
   paste in the client ID and secret, then uncomment both blocks.

5. **Email delivery.** Reservation and contact emails go through Resend and are
   best-effort: a booking or message is always stored first, so a failed send
   never loses it. To make sends actually land, verify a domain in Resend and set
   `EMAIL_FROM` to an address on it. The default sender
   (`onboarding@resend.dev`) only delivers to the Resend account owner, so every
   other guest gets a 403. `RESTAURANT_EMAIL` is where staff notifications go; if
   it is unset, no staff email is sent at all.

6. **Set the environment variables in Vercel**, not just in your local `.env`
   (Project → Settings → Environment Variables). The `VITE_*` keys must be
   present at **build** time.

7. **Placeholder business details.** Savanna Grill is fictional, so every
   contact detail on the site is a placeholder. Keep the Footer, the Contact
   page and `src/lib/structured-data.ts` in step if you change them:

   | Detail | Value on the site |
   | --- | --- |
   | Address | Demo Street, City Centre, Bulawayo |
   | Phone | +263 00 000 0000 |
   | Hours | 8AM – 10PM, daily |
   | Email | hello@savannagrill.example |
   | Social links | Point to the Instagram / Facebook home pages (no real profiles) |

   The site is kept out of search engines (`noindex` in `src/routes/__root.tsx`
   plus `public/robots.txt`) so nobody mistakes it for a real business.
