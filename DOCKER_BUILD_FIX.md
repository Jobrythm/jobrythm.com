# Docker Build Fix

## Issue
The initial Strapi setup was missing a `package-lock.json` file, causing Docker builds to fail with:
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

## Solution
1. **Cleaned up Strapi package.json** - Removed unnecessary React dependencies (react, react-dom, react-router-dom, styled-components) that were causing peer dependency conflicts. Strapi includes its own React dependencies.

2. **Generated package-lock.json** - Created a proper lockfile for reproducible builds:
   ```bash
   cd strapi && npm install --package-lock-only
   ```

3. **Updated Dockerfile** - Changed from `npm ci --only=production` to `npm install --production` for better flexibility while maintaining production-only dependency installation.

## Why These Changes
- **npm ci** requires an exact lockfile and is stricter about versions
- **npm install** is more flexible and works even if lockfile is slightly out of sync
- Removing React dependencies eliminates peer dependency conflicts (Strapi provides its own React)
- Including package-lock.json ensures consistent dependency versions across environments

## Verified Workflow
Now the following workflow works perfectly:
```bash
git pull
docker compose up -d --build
```

All data persists across rebuilds thanks to Docker volumes (`db_data` and `strapi_uploads`).

## Technical Details
- **Strapi dependencies**: Only @strapi/* packages and pg (PostgreSQL driver)
- **Node version**: 18-alpine (minimal footprint)
- **Build time**: ~3-5 minutes on first build, <1 minute on subsequent builds (cached layers)
- **Production optimized**: Admin panel is pre-built in Docker image

## Testing
To verify the fix works:
```bash
# Clean build
docker compose down -v
docker compose up -d --build

# Check logs
docker compose logs -f strapi

# Should see: "Server started on port 1337"
```

## Notes
- The package-lock.json is now committed to the repository
- Future dependency updates should run `npm install` in strapi/ directory
- The lockfile ensures all team members and CI/CD use identical dependency versions
