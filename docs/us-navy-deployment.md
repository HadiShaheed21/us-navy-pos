# US NAVY deployment

Deployment architecture for the **US NAVY** client deployment of this repository.
This document is a plan only — **nothing here has been deployed yet.** Do not
create the Railway project, push to GitHub, or modify the original CLOUT Railway
project until explicitly approved.

## Repository and services

| Item | Value |
| --- | --- |
| GitHub repository | `HadiShaheed21/us-navy-pos` |
| Railway project | `US NAVY` (new, not yet created) |
| Railway service | `US NAVY POS` (new, not yet created) |
| Persistent volume | mount path `/data` |
| Database | `/data/flo.db` (created fresh on first start — never copy a CLOUT database) |

SQLite is one database per deployment. The US NAVY service gets its own volume
and its own `/data/flo.db`; sharing a volume or database with another client is
not supported.

## Required service environment

Set these as Railway **service variables** (never repository variables, never
committed to git):

```text
NODE_ENV=production
FLO_DB_PATH=/data/flo.db
FLO_REQUIRE_PERSISTENT_STORAGE=true
JWT_SECRET=<new random secret generated in Railway, never committed>
FLO_ALLOWED_ORIGINS=<new US NAVY Railway URL — see below>
```

- `JWT_SECRET`: generate a fresh random value inside Railway for this service
  only. Never reuse a secret from another deployment and never write it into a
  file, doc, or commit.
- `FLO_ALLOWED_ORIGINS`: an exact comma-separated allowlist, not a wildcard.
  Insert the **new US NAVY Railway service URL** (e.g.
  `https://<service>.up.railway.app`) after the service is created. Add
  `https://usnavy.online,https://www.usnavy.online` only after the custom
  domains are attached and verified.
- Do **not** copy any CLOUT Railway environment variables or secrets into this
  project.

Health check: `GET /api/health` on the service's `PORT`.

## Domain architecture

**Customer (storefront):**

- `https://usnavy.online`
- `https://www.usnavy.online`

Both hosts are registered in `STOREFRONT_HOSTS` (`main/server.ts`), so their
root `/` serves the customer storefront. The existing host-routing mechanism is
unchanged — only the host values were swapped for this client.

**Staff / POS:**

- Access the POS through the Railway service URL initially
  (`https://<service>.up.railway.app` → root `/` → `/dashboard` → login).
- Do **not** add `pos.usnavy.online` at this stage. The POS keeps using the
  existing application routes; no POS functionality changes are required.

## Where to insert the final Railway URL

After the new Railway service is created and its public URL is known, update:

1. **`FLO_ALLOWED_ORIGINS`** (Railway service variable) — set to the new
   service URL; append the custom domains once DNS is verified.
2. **`vercel.json`** (only if the frontend is hosted on Vercel) — the rewrites
   array is intentionally empty so no API traffic can reach a legacy Railway
   service. Replace it with:

   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://<US-NAVY-RAILWAY-SERVICE-URL>/api/:path*"
       }
     ]
   }
   ```

3. **`NEXT_PUBLIC_API_URL`** (only if the storefront is *not* served from the
   same Railway service) — build-time frontend variable; when unset, the
   storefront calls its own origin (`/api/...`), which is the default for the
   single-service Railway architecture.

## Database

- Fresh install only: the new volume starts empty and `seedInstallDefaults()`
  creates `/data/flo.db` with the US NAVY defaults (business name, UPI,
  WhatsApp number, business type; tax off, no GST).
- Never copy or modify the existing CLOUT database.
- No schema changes or custom migrations are needed for this deployment.

## Deployment status

- [ ] GitHub repository pushed (`HadiShaheed21/us-navy-pos`)
- [ ] Railway project `US NAVY` + service `US NAVY POS` created
- [ ] Persistent volume mounted at `/data`
- [ ] Service variables set (fresh `JWT_SECRET`, no copied secrets)
- [ ] Service URL inserted into `FLO_ALLOWED_ORIGINS` (+ `vercel.json` if used)
- [ ] Custom domains `usnavy.online` / `www.usnavy.online` attached
- [ ] Storefront root verified on both domains; POS verified on service URL
