# Jobrythm CMS - Quick Start Guide

This guide will help you get Jobrythm up and running in minutes.

## Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop/))
- Git installed
- Basic command line knowledge

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Jobrythm/jobrythm.com.git
cd jobrythm.com
```

### 2. Run the Setup Script (Recommended)

The easiest way to get started:

```bash
./setup.sh
```

This script will:
- Generate secure random keys
- Create `.env` file with configuration
- Start Docker containers
- Initialize the database

**Or do it manually:**

### 2 (Manual). Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Generate secure keys
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Edit .env and replace placeholders with generated keys
nano .env  # or use your favorite editor
```

### 3. Start the Application

```bash
docker compose up -d --build
```

Wait 2-3 minutes for services to initialize.

### 4. Access the Application

- **Frontend**: http://localhost
- **Strapi Admin**: http://localhost:1337/admin

### 5. Create Admin Account

1. Navigate to: http://localhost:1337/admin
2. Fill in the registration form:
   - Email: `admin@jobrythm.com`
   - Password: `adminpassword` (or choose your own)
   - First Name: Admin
   - Last Name: User

## Creating Your First Page

Once logged into Strapi admin:

### 1. Create Content Types

Go to **Content-Type Builder** and create:

#### Page Content Type
- `route` (Text, required, unique) - e.g., "/", "/features", "/pricing"
- `title` (Text, required) - Page title
- `meta_description` (Text) - SEO description
- `is_published` (Boolean, default: false)
- `sections` (Relation: has many Page Sections)

#### Page Section Content Type
- `section_type` (Enumeration: hero, features, pricing, markdown, cta)
- `content` (JSON) - Section content
- `position` (Number) - Display order
- `is_visible` (Boolean, default: true)
- `page` (Relation: belongs to Page)

#### Setting Content Type
- `key` (Text, required, unique) - Setting key
- `value` (Text) - Setting value
- `type` (Enumeration: string, number, boolean, json)

### 2. Add a Setting

1. Go to **Content Manager** → **Settings**
2. Click **Create new entry**
3. Add:
   - Key: `app_domain`
   - Value: `app.jobrythm.com`
   - Type: `string`
4. Click **Save** and **Publish**

### 3. Create a Home Page

1. Go to **Content Manager** → **Pages**
2. Click **Create new entry**
3. Fill in:
   - Route: `/`
   - Title: `Home - Jobrythm`
   - Meta Description: `Win more work. Protect your margins.`
   - Is Published: `true`
4. Click **Save** and **Publish**

### 4. Add Sections to the Page

1. Go to **Content Manager** → **Page Sections**
2. Create a Hero section:
   - Section Type: `hero`
   - Position: `0`
   - Content (JSON):
     ```json
     {
       "headline": "Win more work. Protect your margins.",
       "subheadline": "Quoting, job costing, invoicing and more",
       "primaryCTA": {
         "text": "Start free",
         "url": "/signup"
       },
       "secondaryCTA": {
         "text": "Book demo",
         "url": "/book-demo"
       }
     }
     ```
   - Page: Select your home page
   - Is Visible: `true`
3. Click **Save** and **Publish**

## Updating the Site

### Pull Latest Changes

```bash
git pull
docker compose up -d --build
```

Your data persists in Docker volumes, so updates won't affect content.

## Common Commands

```bash
# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f strapi

# Stop the application
docker compose down

# Restart a service
docker compose restart strapi

# Access database
docker compose exec database psql -U strapi strapi
```

## Troubleshooting

### Port Already in Use

If ports 80, 443, or 1337 are already in use:

1. **Option A**: Stop the conflicting service
2. **Option B**: Change ports in `docker-compose.yml`:
   ```yaml
   ports:
     - "8080:80"  # Frontend now on http://localhost:8080
     - "1338:1337"  # Strapi now on http://localhost:1338
   ```

### Can't Access Strapi Admin

1. Check if Strapi is running:
   ```bash
   docker compose ps
   ```

2. View Strapi logs:
   ```bash
   docker compose logs strapi
   ```

3. Rebuild Strapi:
   ```bash
   docker compose up -d --build strapi
   ```

### Database Connection Issues

```bash
# Check database status
docker compose ps database

# Restart database
docker compose restart database

# View database logs
docker compose logs database
```

### Reset Everything (WARNING: Deletes all data!)

```bash
docker compose down -v
docker compose up -d --build
```

## Backup & Restore

### Backup Database

```bash
docker compose exec database pg_dump -U strapi strapi > backup-$(date +%Y%m%d).sql
```

### Restore Database

```bash
docker compose exec -T database psql -U strapi strapi < backup-20260426.sql
```

### Backup Uploads

```bash
docker cp jobrythm_strapi:/app/public/uploads ./uploads-backup
```

## Production Deployment

### Before Deploying

1. **Generate strong secrets** - Never use example keys in production
2. **Set up HTTPS** - Add SSL certificates to nginx configuration
3. **Configure firewall** - Only expose ports 80, 443
4. **Set up backups** - Automate database and media backups
5. **Update regularly** - Keep dependencies up to date

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_PASSWORD=<strong-password>
APP_KEYS=<4-unique-keys>
# ... (all other secrets should be unique and strong)
```

## Next Steps

- **Customize Strapi admin** - Add branding in `strapi/src/admin/app.js`
- **Add more content types** - Blog posts, testimonials, team members
- **Configure permissions** - Set up user roles and permissions
- **Add plugins** - SEO, sitemap, email, etc.
- **Custom frontend components** - Create section renderers in React

## Support

- **Documentation**: See `README.md` and `CMS_ARCHITECTURE_PLAN.md`
- **Strapi Docs**: https://docs.strapi.io/
- **Issues**: https://github.com/Jobrythm/jobrythm.com/issues

---

**Happy building! 🚀**
