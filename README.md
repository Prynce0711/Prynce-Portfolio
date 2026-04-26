# Prynce Portfolio

This project is a Vite + React portfolio with an admin dashboard powered by Supabase Auth and Postgres.

## Features

- Public portfolio page at `/`
- Admin login and CMS at `/admin`
- Editable sections:
  - Hero
  - About
  - Projects
  - Skills
  - Experience
  - Contact
  - Footer
- Save section content to Supabase `site_content` table

## Install

Preferred (fast):

```bash
pnpm install
```

Or with npm/yarn if you prefer:

```bash
npm install
# or
yarn install
```

## Required Packages

These are already added in this project:

```bash
npm install @supabase/supabase-js @supabase/ssr react-router-dom
```

## Environment Variables

Create `.env.local` in the project root:

```bash
VITE_SUPABASE_URL=https://flfmbzpzvpzrgyxmtouh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_NSO42CsEe3bNScfGxExvqQ_fXsrxTAl
VITE_ADMIN_EMAILS=pc.clemente11@gmail.com
VITE_SUPABASE_STORAGE_BUCKET=portfolio-assets
```

Then restart the dev server after any env change.

## Supabase SQL Setup

1. Open Supabase SQL Editor.
2. Run the SQL in `supabase/site_content.sql`.
3. Ensure your admin email is inserted in `public.admin_users`.

The SQL sets up:

- `public.site_content` table for section JSON
- `public.admin_users` allowlist table
- `storage.buckets` entry for `portfolio-assets`
- RLS policies (public read, admin-only writes)
- Storage policies (public read assets, admin-only upload/update/delete)

## Run (development)

```bash
pnpm run dev
# or
npm run dev
```

## Admin Usage

1. Open `/admin`
2. Log in using an Auth user created in Supabase Authentication
3. Edit sections and click `Save Section` or `Save All`
4. In Hero and Projects editors, upload images directly to Supabase Storage

## Optional Agent Skill

If you want Supabase-focused coding skills:

```bash
npx skills add supabase/agent-skills
```

## Vercel Blocked Deployment Meaning

If you see this Vercel message:

`The deployment was blocked because the commit author did not have contributing access to the project on Vercel.`

it means your project is using Vercel Git auto-deploy, but the commit author is not recognized as a collaborator for that Vercel project. On Hobby plan with private repos, team collaboration is limited, so the auto-deploy gets blocked.

## Vercel via GitHub Actions

This repo includes a workflow at `.github/workflows/vercel-deploy.yml` that deploys with Vercel CLI using your own token.

### Required GitHub Secrets

Add these in GitHub repository settings under Secrets and variables > Actions:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You can get IDs from local Vercel link:

```bash
vercel link
cat .vercel/project.json
```

### Workflow Behavior

- Push to `main`: production deploy
- Pull request to `main`: preview deploy (non-fork PRs)

### Important

If you keep Vercel Git integration enabled, you may still see blocked auto-deploy entries from Git integration while GitHub Actions deploys succeed. To avoid confusion, use one deployment path consistently.
