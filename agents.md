# Jobrythm — Agent Reference Guide

A complete reference for AI coding agents working in this repository. Read this before making any changes.

---

## 1. Repository at a Glance

| Layer | Technology | Port | Purpose |
|---|---|---|---|
| Frontend | React 19 + TypeScript + Vite | 80 | Public marketing site + admin panel |
| CMS / API | Strapi 4 (Node.js 18) | 1337 | Content management + custom REST API |
| Database | PostgreSQL 15 | 5432 | All persistent data |
| Proxy | Nginx | 80 / 443 | Serves built frontend, forwards `/api/*` to Strapi |

Everything runs in Docker via `docker-compose.yml`. Data lives in named Docker volumes (`db_data`, `strapi_uploads`).

---

## 2. Directory Map

```
jobrythm.com/
├── docker-compose.yml          # Orchestrates all three services
├── .env.example                # Copy to .env; fill in secrets
├── setup.sh                    # One-shot setup script (generates keys + starts Docker)
│
├── frontend/                   # React app
│   ├── src/
│   │   ├── App.tsx             # Router root + AnalyticsTracker mount
│   │   ├── main.tsx            # React entry point
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Footer, Layout wrapper
│   │   │   └── ui/             # Button, Card, Container (reusable)
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── FeaturesPage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── BookDemoPage.tsx
│   │   │   ├── SecurityPage.tsx
│   │   │   ├── PrivacyPage.tsx
│   │   │   ├── TermsPage.tsx
│   │   │   ├── NotFoundPage.tsx
│   │   │   └── admin/
│   │   │       ├── AdminPage.tsx       # Auth gate (localStorage session)
│   │   │       ├── AdminLayout.tsx     # Sidebar + topbar shell
│   │   │       ├── AdminLogin.tsx      # Hardcoded password login
│   │   │       ├── AdminDashboard.tsx  # Real analytics dashboard
│   │   │       └── AdminSettings.tsx   # Domain configuration
│   │   ├── contexts/
│   │   │   └── DomainContext.tsx       # rootDomain state (localStorage)
│   │   ├── hooks/
│   │   │   ├── usePageTracking.ts      # Analytics: fires track + duration on route changes
│   │   │   ├── usePage.ts              # Strapi page content hook
│   │   │   └── useSettings.ts          # Strapi settings hook
│   │   ├── services/
│   │   │   ├── analytics.ts            # Analytics API client (trackPageView, sendDuration, fetchAnalyticsStats)
│   │   │   ├── api.ts                  # Generic Strapi API client
│   │   │   ├── pages.ts                # Pages API calls
│   │   │   └── settings.ts             # Settings API calls
│   │   └── types/
│   │       └── strapi.ts               # TypeScript types for Strapi responses
│   ├── Dockerfile
│   └── nginx.conf
│
└── strapi/                     # Strapi CMS
    ├── config/
    │   ├── server.js           # Host/port
    │   ├── database.js         # Postgres connection
    │   ├── admin.js            # Admin panel config
    │   ├── middlewares.js      # Security/CORS middleware list
    │   └── api.js              # REST API defaults
    └── src/
        ├── index.js            # bootstrap() — creates analytics_page_views table
        ├── admin/app.js        # Admin UI customisation
        └── api/
            └── analytics/      # Custom analytics API (no Strapi content-type, raw knex)
                ├── routes/analytics.js
                ├── controllers/analytics.js
                └── services/analytics.js
```

---

## 3. Routes

### Public Marketing Routes (Layout wrapper: Navbar + Footer)

| Path | Component |
|---|---|
| `/` | `HomePage` |
| `/features` | `FeaturesPage` |
| `/pricing` | `PricingPage` |
| `/about` | `AboutPage` |
| `/contact` | `ContactPage` |
| `/book-demo` | `BookDemoPage` |
| `/security` | `SecurityPage` |
| `/privacy` | `PrivacyPage` |
| `/terms` | `TermsPage` |
| `*` | `NotFoundPage` |

### Admin Routes (no Layout, auth-gated)

| Path | Component |
|---|---|
| `/admin-page` | `AdminDashboard` |
| `/admin-page/settings` | `AdminSettings` |

Admin auth is a simple localStorage flag (`jobrythm_admin_session`). It is **not** connected to Strapi auth — just a hardcoded front-door check. Do not use it for anything security-sensitive.

---

## 4. Analytics System

This is the most recently built feature. All data is real — no fake/mocked numbers.

### How tracking works (frontend)

1. `App.tsx` mounts `<AnalyticsTracker />` inside `<Router>`. This component calls `usePageTracking()` which needs `useLocation()`, hence must be inside the router.
2. `usePageTracking` (in `hooks/usePageTracking.ts`):
   - On every `location.pathname` change → calls `trackPageView(page, referrer)` → POSTs to `POST /api/analytics/track`
   - Stores the returned row `id` in a ref
   - On cleanup (route change or `beforeunload`) → calls `sendDuration(id, elapsedMs)`
   - Duration delivery uses `navigator.sendBeacon` (reliable on tab close) with a `keepalive` fetch fallback
   - Skips any path starting with `/admin-page` to keep admin traffic out of analytics
3. Each browser tab gets a persistent `sessionId` stored in `localStorage` under `jobrythm_analytics_session`. Sessions are not destroyed on close — they persist until cleared. This is intentional: it makes session counting stable across reloads.

### Database table: `analytics_page_views`

Created in `strapi/src/index.js` `bootstrap()` via raw knex if not present:

| Column | Type | Notes |
|---|---|---|
| `id` | auto-increment PK | |
| `session_id` | varchar(36) | UUID, from localStorage |
| `page` | varchar(500) | pathname e.g. `/features` |
| `referrer` | varchar(500) | previous pathname (internal), nullable |
| `entered_at` | timestamp | server time of insertion |
| `duration_ms` | integer | filled in by the duration endpoint, nullable |

Indexes: `session_id`, `page`, `entered_at`.

### Strapi analytics endpoints

All routes are public (`auth: false`). They live in `strapi/src/api/analytics/`.

| Method | Path | Body / Params | Returns |
|---|---|---|---|
| POST | `/api/analytics/track` | `{ sessionId, page, referrer? }` | `{ id, ok }` |
| POST | `/api/analytics/duration` | `{ id, durationMs }` | `{ ok }` |
| GET | `/api/analytics/stats` | `?days=7` (or 30, 90) | `AnalyticsStats` object |

`AnalyticsStats` shape (also typed in `frontend/src/services/analytics.ts`):
```typescript
{
  totalViews: number;
  uniqueSessions: number;
  avgSessionMs: number;       // across all sessions that have any duration_ms
  bounceRate: number;         // % of sessions with only 1 page view
  pages: PageStat[];          // per-page: views, uniqueSessions, avgDurationMs
  navFlow: NavFlowEntry[];    // from → to pairs ranked by count (max 100)
  dailyViews: DailyView[];    // { date: 'YYYY-MM-DD', views, sessions }
}
```

### Admin dashboard

`AdminDashboard.tsx` fetches live data on mount and on time-range change. It renders:
- **4 stat cards**: Total Views, Unique Visitors, Avg Session Duration, Bounce Rate
- **Daily bar chart**: CSS-only, auto-scaled to max bar height, hover tooltips, x-axis labels every Nth day
- **Top Pages table**: views, unique visitors, avg time on page, % share bar
- **Navigation Flow table**: from → to page pairs with % of exits bar
- Loading state and error state (shows hint if Strapi is offline)

---

## 5. Content / CMS (Strapi)

The Strapi CMS is used for page content, page sections, and site settings. These are **separate from** the analytics API.

### Existing custom API modules in Strapi

Only `analytics` exists as a custom API under `strapi/src/api/`. It uses raw knex, not a Strapi content-type.

### Content types (must be created via Strapi admin UI)

These are NOT auto-created. An admin must set them up in the Strapi Content-Type Builder:

- **Page** — `route`, `title`, `meta_description`, `is_published`, `sections` (relation)
- **PageSection** — `section_type` (enum), `content` (JSON), `position`, `is_visible`, `page` (relation)
- **Setting** — `key`, `value`, `type` (enum)

### Key setting: `app_domain`

Used by the frontend's `DomainContext` to build signup/login URLs. The domain is also stored in `localStorage` via `AdminSettings.tsx`, so it persists in the browser without requiring Strapi to be running.

---

## 6. Environment Variables

All configured in `.env` (copy from `.env.example`):

| Variable | Used by | Notes |
|---|---|---|
| `DATABASE_NAME` | Strapi, Postgres | Default: `strapi` |
| `DATABASE_USERNAME` | Strapi, Postgres | Default: `strapi` |
| `DATABASE_PASSWORD` | Strapi, Postgres | **Must be strong in production** |
| `APP_KEYS` | Strapi | 4 comma-separated random base64 strings |
| `API_TOKEN_SALT` | Strapi | Random base64 string |
| `ADMIN_JWT_SECRET` | Strapi | Random base64 string |
| `TRANSFER_TOKEN_SALT` | Strapi | Random base64 string |
| `JWT_SECRET` | Strapi | Random base64 string |
| `VITE_API_URL` | Frontend build | Strapi base URL, e.g. `http://localhost:1337` |

Generate a key: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

---

## 7. Building and Running

### With Docker (standard)
```bash
# First time
./setup.sh
# Or manually:
docker compose up -d --build

# Subsequent runs (after code changes)
docker compose up -d --build

# Logs
docker compose logs -f strapi
docker compose logs -f frontend
```

### Without Docker (local dev)

**Frontend:**
```bash
cd frontend
npm install
npm run dev       # Vite dev server on http://localhost:5173
npm run build     # Production build (runs tsc first, then vite build)
npm run lint      # ESLint
```

**Strapi:**
```bash
cd strapi
npm install
npm run develop   # Auto-restarts on file changes
npm run build     # Build Strapi admin UI
npm run start     # Production start (no auto-restart)
```

### TypeScript / lint checks (frontend)

The build runs `tsc -b` before Vite. Any TypeScript error will fail the build. Pay attention to:
- Unused variables — `TS6133` error, use `_varName` prefix to suppress intentionally
- The `tsconfig.app.json` targets `ES2020` and requires `vite/client` types
- `eslint-plugin-react-hooks` enforces hooks rules

---

## 8. Styling Conventions

Tailwind CSS v4. Custom design tokens:

```
navy-50 → navy-900    (primary backgrounds, text, borders)
electric-50 → electric-900   (accent CTAs, highlights, interactive)
```

### Section spacing
```tsx
<section className="py-20 lg:py-32">
  <Container>...</Container>
</section>
```

### Background bands (alternating)
```tsx
bg-white           // default content sections
bg-navy-50         // light alternating sections
bg-navy-900        // dark hero/CTA bands (text-white)
bg-electric-500    // electric accent band
```

### Admin UI
All admin pages use `bg-navy-900` as the page background, `bg-navy-800` for cards, `border-navy-700` for borders, `text-electric-400` for accent text.

---

## 9. Component Conventions

### UI primitives (`src/components/ui/`)

```tsx
<Button variant="primary" size="lg">Click me</Button>
// variants: primary | secondary | outline | ghost
// sizes: sm | md | lg
// other props: fullWidth, className, ...buttonProps

<Card hover className="p-8">Content</Card>
// hover adds a drop shadow on hover

<Container size="lg">...</Container>
// sizes: sm (max-w-3xl) | md (max-w-5xl) | lg (max-w-7xl) | xl (max-w-[1400px]) | full
```

### Animations (Framer Motion)

Always use `viewport={{ once: true }}` on scroll-triggered animations to avoid re-triggering:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

---

## 10. Adding a New Page

1. Create `frontend/src/pages/MyPage.tsx`
2. Follow the pattern: Hero section → content sections → CTA band
3. Add route in `frontend/src/App.tsx` inside the `<Layout>` route group
4. Add nav link in `Navbar.tsx` and footer link in `Footer.tsx` if needed
5. Analytics tracking is automatic — `usePageTracking` picks up the new path

---

## 11. Adding a New Strapi API Endpoint

1. Create directory `strapi/src/api/<name>/`
2. Add `routes/<name>.js`, `controllers/<name>.js`, `services/<name>.js`
3. If the endpoint needs to be public, set `config: { auth: false }` in the routes file
4. Raw database access: `const knex = strapi.db.connection;`
5. **Do not** create a Strapi content-type for analytics-style endpoints — use raw knex instead

---

## 12. Known Gotchas and Pitfalls

- **`usePageTracking` must be inside `<Router>`** — it uses `useLocation()`. The `<AnalyticsTracker />` component in `App.tsx` is placed directly inside `<Router>` but outside `<Routes>` for exactly this reason.
- **Strapi knex + postgres `.returning('id')`** returns `[{id: N}]`, not `[N]`. The service handles both cases. Don't assume either format.
- **Admin session is not Strapi auth** — it's just `localStorage.getItem('jobrythm_admin_session') === 'true'`. Don't store sensitive data behind it.
- **`DATE(entered_at)` in SQL** works for both Postgres and SQLite, but timezone behaviour differs. The analytics service uses server time (`new Date()`) for `entered_at` — ensure the server timezone is consistent.
- **`navigator.sendBeacon` sends the duration** as a `Blob` with `application/json` content-type. Strapi's body parser handles this, but if you add custom middleware that doesn't read blobs, duration updates will silently fail.
- **Session ID persistence** — the analytics `sessionId` in localStorage never expires. A "session" in analytics terms means "a continuous visit from the same browser". Clearing localStorage or opening incognito starts a new session.
- **Admin page analytics exclusion** — `usePageTracking` checks `page.startsWith('/admin-page')`. If you add new admin routes under a different path prefix, add that prefix to the guard.
- **The `analytics_page_views` table is NOT a Strapi content-type** — it won't appear in the Strapi admin UI Content Manager. It's managed entirely by `strapi/src/index.js` `bootstrap()` and raw knex queries.
- **Frontend build requires `npm install`** to be run first in the `frontend/` directory — type definition packages must be present for `tsc -b` to succeed.

---

## 13. What Is Real vs Still Mocked / Placeholder

| Feature | Status | Notes |
|---|---|---|
| Analytics tracking | ✅ Real | `usePageTracking` → Strapi → PostgreSQL |
| Analytics dashboard | ✅ Real | Reads live data from `/api/analytics/stats` |
| Domain config (admin) | ✅ Real (localStorage) | Persisted in browser, not in DB |
| Contact / book demo forms | ⚠️ Client-side only | `console.log` submissions, no backend |
| Testimonials / social proof | ⚠️ Illustrative | Not real customer data |
| Pricing figures | ⚠️ Placeholder | Should match actual app pricing |
| Strapi content types | ⚠️ Must be created | See QUICKSTART.md for setup steps |
| Dynamic page rendering | ⚠️ Not wired up | `usePage`/`useSettings` hooks exist but pages still use static content |

---

## 14. External URLs

All signup/login CTAs must use the `useDomain()` context — never hardcode these URLs:
```tsx
const { loginUrl, signupUrl } = useDomain();
```
Current defaults: `https://app.jobrythm.com/login` and `https://app.jobrythm.com/signup`

---

## 15. Accessibility Checklist

Before shipping any UI change:
- Semantic HTML tags (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `aria-label` on icon-only buttons and links
- Focus ring visible (Tailwind `focus:ring-2 focus:ring-electric-500`)
- Heading hierarchy: one `<h1>` per page, then `<h2>`, `<h3>`
- Color contrast WCAG AA (4.5:1 for normal text, 3:1 for large)
- Keyboard navigation works throughout

---

## 16. Quick Reference: Useful Commands

```bash
# Build frontend locally
cd frontend && npm install && npm run build

# Lint frontend
cd frontend && npm run lint

# Run Strapi in dev mode (auto-restart on file save)
cd strapi && npm run develop

# View all Docker logs
docker compose logs -f

# Restart just one service
docker compose restart strapi

# Rebuild after code changes
docker compose up -d --build

# Access PostgreSQL directly
docker compose exec database psql -U strapi strapi

# Backup database
docker compose exec database pg_dump -U strapi strapi > backup-$(date +%Y%m%d).sql

# Reset everything (⚠️ destroys all data)
docker compose down -v && docker compose up -d --build
```
