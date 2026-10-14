# Aerospace & Defense Manufacturer Website + CMS

A procurement-focused marketing site for a precision aerospace and defense
manufacturer, with a full content management panel and a request-for-quote
(RFQ) pipeline that accepts CAD drawings. Every word, figure, photo, colour,
capability, certification and machine on the equipment list is editable from
`/admin`, so rebranding for a new manufacturer is a settings change rather than
a code change.

**Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4,
JavaScript, Supabase Postgres + Storage, `jose` session cookies, `bcryptjs`
password hashing, `zod` validation and `sharp` image processing.

The demo company, "Arcline Precision", and all of its figures are placeholders.

---

## Features

**Public site**
- Sections written for procurement engineers: hero with headline metrics, compliance strip (AS9100D, ITAR and similar approvals), capabilities, industries, why choose us, manufacturing process, quality system, equipment list, certifications, engineering, facility, case studies, careers, resources, FAQ
- RFQ form with CAD and drawing upload (PDF, STEP, IGES, DXF, DWG, SolidWorks, Inventor, Parasolid and more, up to 25 MB)
- `Service`, `OfferCatalog` and `FAQPage` JSON-LD built from live content, plus `sitemap.xml`, `robots.txt`, canonical URLs and Open Graph metadata

**Admin panel (`/admin`)**
- 20 editable page sections and 4 editable lists: capabilities, industries, equipment and certifications
- RFQ inbox with status tracking; customer drawings are stored privately and opened through short-lived signed URLs
- Media library with uploads re-encoded through `sharp` (max 2400px, EXIF and GPS stripped)
- Brand colours, company details, SEO and legal pages editable in the browser
- Audit log of admin changes

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

This works immediately with **no database and no configuration**. The site renders
from `src/content/defaults.js` (preview mode), so you can see the finished design
before connecting anything. `/admin` shows a setup notice instead of a login form.

## Enabling the admin panel

1. **Create a Supabase project** at [supabase.com](https://supabase.com).

2. **Create the schema.** Open the project's SQL editor and run
   [`supabase/schema.sql`](supabase/schema.sql).

3. **Create the storage bucket.** Storage → New bucket → name it (for example `media`)
   → tick **Public bucket** → Create, then put that name in
   `SUPABASE_MEDIA_BUCKET`.

4. **Add environment variables.** Copy the example file and fill it in:

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Where to find it |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → Data API → Project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API Keys → `service_role` |
   | `SESSION_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` |

5. **Seed the content and create a login:**

   ```bash
   npm run db:seed        # writes the default content into Supabase
   npm run create-admin   # prompts for email, name, password
   ```

6. Restart `npm run dev` and sign in at `/admin`.

> Setting only *some* of the three variables is treated as a misconfigured deploy
> and fails at boot with an explanatory message, so a production site can never
> silently serve demo content.

---

## How it is built

### The admin panel is generated from registries

| Registry | Describes | Drives |
| --- | --- | --- |
| `src/lib/admin/blocks.js` | fixed page sections | `/admin/content/[key]` |
| `src/lib/admin/collections.js` | repeatable lists | `/admin/collections/[collection]` |
| `src/lib/admin/settings.js` | the settings singleton | `/admin/settings` |

From each field descriptor the app derives the editor form, validation, save
payload, sidebar navigation and audit log entry. Adding a section means adding an
entry to `blocks.js`, adding its defaults to `src/content/defaults.js`, and
rendering it on the page; `/admin` picks it up automatically.

### Data flow

```
src/content/defaults.js     bundled content: seed source AND preview fallback
        │
supabase/schema.sql         tables; RLS enabled with no policies (defence in depth)
        │
src/lib/supabase/client.js  server-only service_role client
        │
src/db/queries/content.js   public reads: cached, never throw, fall back to defaults
src/db/queries/admin.js     admin reads: fail loudly, every one re-checks the session
```

Public pages never go blank: if the database is unreachable they serve the bundled
content and log the specific fix. Admin pages surface errors, because an admin needs
to know when edits aren't landing.

### Security

- The `service_role` key is server-only; RLS stays enabled on every table so a stray anon key can reach nothing.
- `requireAdmin()` gates every protected page, mutating action and upload route.
- Login locks for 15 minutes after 5 failed attempts and gives the same message whether or not the email exists.
- The RFQ form is the only unauthenticated write path: honeypot field, strict schema validation, file-type and size checks, and explicit column mapping.
- Customer drawings are never served publicly. Admins download them through `/api/admin/rfq-file`, which checks the session and issues a 2-minute signed URL.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm run db:seed` | Seed Supabase from `src/content/defaults.js` |
| `npm run create-admin` | Create an admin login |
| `npm run backup` | Export the site's tables to local JSON files |
| `npm run photos` | Re-download the placeholder photography |
| `npm run icon` | Regenerate the favicon from the logo mark |

## Deploying

Push to GitHub, import the repo in Vercel, and set the three environment variables
in the project settings. Then update **Settings → Site URL** to the live domain so
the sitemap and social previews point at the right host.

## Author

Built by **Muhammad Aqib**, full-stack and automation engineer.

[Portfolio](https://aqib-portfolio-mern.vercel.app) · [LinkedIn](https://www.linkedin.com/in/aqib-engineer2/) · [GitHub](https://github.com/aqib-codespace)
