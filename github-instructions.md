# GitHub Instructions — Jobrythm.com

Everything you need to know to contribute to this repository on GitHub: branch strategy, pull requests, commit conventions, deployments, and environment management.

---

## 1. Repository Overview

- **Repo**: https://github.com/Jobrythm/jobrythm.com
- **Default branch**: `main` — production-ready code
- **Deployment**: Merges to `main` trigger a rebuild on the production server (`git pull && docker compose up -d --build`)
- **Issues**: https://github.com/Jobrythm/jobrythm.com/issues

---

## 2. Branch Strategy

### Branch types and naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/<short-description>` | `feat/pricing-page-redesign` |
| Bug fix | `fix/<short-description>` | `fix/mobile-navbar-overflow` |
| Hotfix (urgent production) | `hotfix/<short-description>` | `hotfix/analytics-endpoint-500` |
| Chore / dependency update | `chore/<short-description>` | `chore/update-strapi-4.26` |
| Documentation | `docs/<short-description>` | `docs/add-deployment-guide` |
| Refactor | `refactor/<short-description>` | `refactor/analytics-service` |
| Agent / Copilot work | `copilot/<short-description>` | `copilot/build-marketing-site-jobrythm` |

### Rules

- **Never commit directly to `main`** — always use a PR
- Feature branches are created from the latest `main`
- Keep branches focused: one logical change per branch
- Delete branches after merge

---

## 3. Commit Message Conventions

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <short summary>

<optional body — explain WHY, not WHAT>

<optional footer — breaking changes, issue refs>
```

### Types

| Type | When to use |
|---|---|
| `feat` | New feature or user-visible capability |
| `fix` | Bug fix |
| `hotfix` | Urgent production fix |
| `chore` | Tooling, config, deps (no production code change) |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code restructuring (no feature/fix) |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `ci` | CI/CD pipeline changes |

### Examples

```
feat(analytics): add navigation flow table to admin dashboard

fix(admin): prevent admin page views from polluting analytics data

chore: update Strapi to 4.26.0

docs: add agents.md with full architecture reference

hotfix(api): handle null referrer in analytics track endpoint
```

### Rules

- Summary is imperative, lowercase, no period: ✅ `add daily chart` not ❌ `Added daily chart.`
- Maximum 72 characters for the subject line
- Reference issues in the footer: `Closes #42` or `Fixes #17`
- Breaking changes must be noted: `BREAKING CHANGE: analytics stats endpoint shape changed`

---

## 4. Pull Request Process

### Opening a PR

1. **Branch is up-to-date with `main`** — rebase or merge `main` into your branch before opening
2. **PR title** follows commit convention: `feat(analytics): real page view tracking`
3. **PR description** should include:
   - What changed and why
   - How to test it locally
   - Screenshots for any UI changes
   - Checklist of manual verification steps

### PR description template

```markdown
## Summary
Brief description of what this PR does.

## Changes
- List of specific changes made

## How to test
1. Steps to verify the change works

## Screenshots (if UI changes)
<!-- Add before/after screenshots -->

## Checklist
- [ ] Frontend builds without errors (`cd frontend && npm run build`)
- [ ] Lint passes (`cd frontend && npm run lint`)
- [ ] Tested in Docker (`docker compose up -d --build`)
- [ ] Mobile layout checked
- [ ] No console errors
- [ ] Analytics data not affected (if touching `/admin-page` routes)
```

### Review requirements

- At least **1 approval** before merging
- All CI checks must pass (if configured)
- Resolve all review comments before merge

### Merging

- Prefer **Squash and Merge** for feature branches (keeps `main` history clean)
- Use **Merge Commit** for long-running branches with meaningful history
- **Never use Rebase and Merge** on shared branches — it rewrites hashes and breaks others' branches
- Delete the branch after merge

---

## 5. Environment Variables and Secrets

### Local development (`.env` file)

Copy `.env.example` to `.env`. This file is gitignored and must never be committed.

```bash
cp .env.example .env
```

Generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### GitHub Actions secrets

If you add CI/CD via GitHub Actions, configure these in **Settings → Secrets and variables → Actions**:

| Secret name | Description |
|---|---|
| `DATABASE_PASSWORD` | PostgreSQL password for production |
| `APP_KEYS` | 4 comma-separated Strapi keys |
| `API_TOKEN_SALT` | Strapi API token salt |
| `ADMIN_JWT_SECRET` | Strapi admin JWT secret |
| `TRANSFER_TOKEN_SALT` | Strapi transfer salt |
| `JWT_SECRET` | Strapi user JWT secret |
| `SSH_PRIVATE_KEY` | Deploy key for SSH access to production server |
| `PRODUCTION_HOST` | Production server hostname/IP |
| `PRODUCTION_USER` | SSH user on production server |

### Production environment

**Never put real secrets in `docker-compose.yml`** — reference them from the `.env` file on the server. The `docker-compose.yml` uses `${VAR:-default}` syntax, which reads from the environment / `.env` file at runtime.

---

## 6. Deployment Workflow

### Production server

The production server runs all three Docker services (database, strapi, frontend) via `docker-compose.yml`.

### Deploying a new version

```bash
# On the production server
cd /path/to/jobrythm.com
git pull origin main
docker compose up -d --build
```

The `--build` flag rebuilds the frontend and Strapi images. The database volume (`db_data`) persists across rebuilds — data is never lost on a normal deploy.

### Rollback

```bash
# Find the previous commit
git log --oneline -10

# Roll back to that commit
git checkout <commit-sha>
docker compose up -d --build
```

### Zero-downtime considerations

The current setup has a brief downtime during `docker compose up -d --build` while containers are restarted. For zero-downtime:
- Run the build step separately before restarting containers
- Use a load balancer with health checks (future enhancement)

### First-time server setup

```bash
git clone https://github.com/Jobrythm/jobrythm.com.git
cd jobrythm.com
cp .env.example .env
# Fill in all secrets in .env
./setup.sh
# OR: docker compose up -d --build
```

---

## 7. GitHub Actions (CI/CD Setup)

No GitHub Actions workflows are currently configured. Below is the recommended setup to add:

### Suggested workflow: `ci.yml`

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  frontend:
    name: Frontend build & lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      - run: cd frontend && npm ci
      - run: cd frontend && npm run lint
      - run: cd frontend && npm run build
```

### Suggested workflow: `deploy.yml`

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: SSH deploy
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /path/to/jobrythm.com
            git pull origin main
            docker compose up -d --build
```

---

## 8. Issue Management

### Issue labels

| Label | Meaning |
|---|---|
| `bug` | Something is broken |
| `feature` | New feature request |
| `enhancement` | Improvement to existing feature |
| `documentation` | Docs improvement |
| `analytics` | Related to the analytics system |
| `admin` | Related to the admin panel |
| `strapi` | CMS / backend issue |
| `frontend` | React / UI issue |
| `docker` | Docker / infrastructure issue |
| `security` | Security concern |
| `good first issue` | Suitable for newcomers |
| `priority: high` | Needs urgent attention |

### Issue template: Bug report

```markdown
**Describe the bug**
A clear description of what the bug is.

**Steps to reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behaviour**
What you expected to happen.

**Actual behaviour**
What actually happened.

**Screenshots**
If applicable.

**Environment**
- OS:
- Browser:
- Running via Docker? Y/N
- Node version (if local):
```

### Issue template: Feature request

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Alternatives considered**
Any alternatives you've considered.

**Additional context**
Any other context or screenshots.
```

---

## 9. Code Review Guidelines

### As a reviewer

- **Approve** if the change is correct, well-tested, and follows conventions
- **Request changes** for bugs, security issues, or significant style violations
- **Comment** (without blocking) for suggestions and questions
- Be specific: point to exact lines, not vague concerns
- Distinguish between blocking issues (`must fix`) and suggestions (`nit:`)

### What to check

- [ ] Does the code do what the PR says?
- [ ] Is the frontend build clean? (`npm run build` must succeed)
- [ ] Are TypeScript types correct? (no `any` unless justified)
- [ ] Does new Strapi API code use raw knex correctly? (check column name consistency)
- [ ] Does any analytics endpoint expose data that should be private?
- [ ] Are there console errors?
- [ ] Is mobile layout intact for any UI changes?
- [ ] Are external links using `useDomain()` context (not hardcoded)?

### Analytics-specific checks

- New pages added to the router must NOT start with `/admin-page` unless they are genuinely admin pages (the tracking hook skips that prefix)
- Changes to the `analytics_page_views` table schema require a manual migration (there is no migration framework — the table is created once in bootstrap with `if not exists`)
- Changes to the stats endpoint response shape must be reflected in the `AnalyticsStats` TypeScript interface in `frontend/src/services/analytics.ts`

---

## 10. Security Practices

- **No secrets in code** — use `.env` and Docker environment variables
- **No secrets in commit history** — if a secret is accidentally committed, rotate it immediately and use `git filter-repo` or BFG to scrub history
- **Analytics endpoints are public** (no auth) — they only accept `POST` data, not read sensitive records. The `GET /api/analytics/stats` endpoint returns aggregate data. If you need to restrict access, add a static bearer token check in the controller
- **Admin panel is not truly secure** — the `jobrythm_admin_session` localStorage flag is not a real auth system. Don't store anything sensitive behind it, and don't add endpoints that trust it
- **Dependency updates** — keep Strapi, React, and other dependencies updated; check GitHub's Dependabot alerts
- **HTTPS in production** — configure SSL certificates in Nginx before going live

---

## 11. Backup and Data Safety

### Before any risky change

```bash
# Backup the database
docker compose exec database pg_dump -U strapi strapi > backup-$(date +%Y%m%d-%H%M).sql

# Backup uploaded media
docker cp jobrythm_strapi:/app/public/uploads ./uploads-backup-$(date +%Y%m%d)
```

### Restore from backup

```bash
docker compose exec -T database psql -U strapi strapi < backup-20260426.sql
```

### What data exists in the database

- All Strapi content (pages, sections, settings, users)
- Analytics page views (`analytics_page_views` table)
- Strapi admin users and API tokens

---

## 12. Getting Help

- **Architecture / codebase questions**: Read `agents.md` first
- **Setup / deployment questions**: Read `QUICKSTART.md` and `README.md`
- **Strapi questions**: https://docs.strapi.io/
- **GitHub Issues**: https://github.com/Jobrythm/jobrythm.com/issues
- **Contact**: hello@jobrythm.aricummings.com
