# Prynce Portfolio

A Vite + React portfolio with a Supabase-backed admin dashboard and a Resend-powered contact form.

## Highlights

- Public site at `/`
- Admin CMS at `/admin`
- Editable sections: Hero, About, Projects, Skills, Experience, Contact, Footer
- Content stored in Supabase `site_content`
- Image uploads stored in Supabase Storage

## Tech Stack

- Vite + React
- Tailwind CSS + DaisyUI
- Supabase Auth, Postgres, and Storage
- Resend (contact email)
- Vercel (deployment)

## Getting Started

### Install

Preferred (fast):

```bash
pnpm install
```

Or with npm/yarn:

```bash
npm install
# or
yarn install
```

### Environment Variables

Create `.env.local` in the project root:

```bash
VITE_SUPABASE_URL=https://flfmbzpzvpzrgyxmtouh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_NSO42CsEe3bNScfGxExvqQ_fXsrxTAl
VITE_ADMIN_EMAILS=pc.clemente11@gmail.com
VITE_SUPABASE_STORAGE_BUCKET=portfolio-assets
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL="Portfolio Contact <hello@yourdomain.com>"
# Optional if you want the form to send to a different inbox.
CONTACT_TO_EMAIL=pc.clemente11@gmail.com
# Optional override for local or external form endpoints.
VITE_CONTACT_FORM_ENDPOINT=/api/contact
```

Restart the dev server after any env change.

### Supabase SQL Setup

1. Open Supabase SQL Editor.
2. Run the SQL in `supabase/site_content.sql`.
3. Ensure your admin email is inserted in `public.admin_users`.

This SQL sets up:

- `public.site_content` table for section JSON
- `public.admin_users` allowlist table
- `storage.buckets` entry for `portfolio-assets`
- RLS policies (public read, admin-only writes)
- Storage policies (public read assets, admin-only upload/update/delete)

## Scripts

```bash
pnpm run dev
pnpm run build
pnpm run preview
pnpm run lint
```

The Resend-backed contact form works in local Vite dev at `/api/contact`. `vercel dev` is optional for testing the Vercel runtime.

## Admin Usage

1. Open `/admin`.
2. Log in using a Supabase Auth user.
3. Edit sections and click `Save Section` or `Save All`.
4. In Hero and Projects editors, upload images to Supabase Storage.

## Troubleshooting / FAQ

**Admin login fails**

- Make sure the user exists in Supabase Auth and the email is listed in `VITE_ADMIN_EMAILS`.
- Confirm your Supabase URL and publishable key are correct, then restart the dev server.

**Edits do not persist**

- Verify the `site_content` table and RLS policies are set up, and that your admin email is in the allowlist.
- Check for blocked requests in the browser network tab.

**Images do not show after upload**

- Confirm the storage bucket name matches `VITE_SUPABASE_STORAGE_BUCKET`.
- Ensure storage read policies allow public access for assets.

**Contact form does not send**

- Ensure `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set and valid.
- If you changed environment values, restart the dev server.

## Optional Agent Skill

If you want Supabase-focused coding skills:

```bash
npx skills add supabase/agent-skills
```

## Deployment (Vercel)

If you see:

`The deployment was blocked because the commit author did not have contributing access to the project on Vercel.`

It means Vercel Git auto-deploy is enabled but the commit author is not a recognized collaborator. On Hobby plans with private repos, team access is limited.

### GitHub Actions Deploy

This repo includes `.github/workflows/vercel-deploy.yml` which deploys using the Vercel CLI.

Add these GitHub Secrets (Settings > Secrets and variables > Actions):

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You can get IDs from a local Vercel link:

```bash
vercel link
cat .vercel/project.json
```

Workflow behavior:

- Push to `main`: production deploy
- Pull request to `main`: preview deploy (non-fork PRs)

If you keep Vercel Git integration enabled, you may still see blocked auto-deploy entries while GitHub Actions succeeds. Use one deployment path consistently.
