# Next Steps - Running & Testing Jobrythm CMS

This document outlines the immediate next steps to get your Jobrythm CMS up and running.

## Immediate Actions (5 minutes)

### 1. Clone and Setup

```bash
# If you haven't already
git clone https://github.com/Jobrythm/jobrythm.com.git
cd jobrythm.com

# Run the automated setup
./setup.sh
```

This will:
- Generate secure random keys
- Create `.env` file
- Start Docker containers
- Initialize database

**Alternative (Manual)**:
```bash
cp .env.example .env
# Edit .env and add secure keys
docker compose up -d --build
```

### 2. Wait for Initialization

First-time startup takes 2-3 minutes:

```bash
# Watch the logs
docker compose logs -f strapi

# You'll see: "Server started on port 1337"
```

### 3. Create Admin Account

1. Open: http://localhost:1337/admin
2. Register first admin user:
   - Email: `admin@jobrythm.com`
   - Password: `adminpassword` (or your choice)
   - First Name: `Admin`
   - Last Name: `User`
3. Click "Let's start"

## Content Setup (15-20 minutes)

### Step 1: Create Content Types

In Strapi Admin, go to **Content-Type Builder**:

#### A. Create "Page" Content Type

1. Click **"Create new collection type"**
2. Display name: `Page`
3. Add fields:
   - `route` (Text)
     - Type: Short text
     - Required: Yes
     - Unique: Yes
   - `title` (Text)
     - Type: Short text
     - Required: Yes
   - `meta_description` (Text)
     - Type: Long text
   - `is_published` (Boolean)
     - Default value: false
4. Click **Save** and **Restart** (wait for restart)

#### B. Create "Page Section" Content Type

1. Click **"Create new collection type"**
2. Display name: `Page Section`
3. Add fields:
   - `section_type` (Enumeration)
     - Add values: `hero`, `features`, `pricing`, `markdown`, `cta`, `testimonials`
   - `content` (JSON)
     - Required: Yes
   - `position` (Number)
     - Integer: Yes
     - Default value: 0
   - `is_visible` (Boolean)
     - Default value: true
   - `page` (Relation)
     - Type: Many-to-One with Page
     - Relation name: "sections"
4. Click **Save** and **Restart**

#### C. Create "Setting" Content Type

1. Click **"Create new collection type"**
2. Display name: `Setting`
3. Add fields:
   - `key` (Text)
     - Type: Short text
     - Required: Yes
     - Unique: Yes
   - `value` (Text)
     - Type: Long text
   - `type` (Enumeration)
     - Add values: `string`, `number`, `boolean`, `json`
     - Default: `string`
4. Click **Save** and **Restart**

### Step 2: Configure Permissions

Go to **Settings** → **Users & Permissions** → **Roles** → **Public**:

Enable these permissions:
- ✅ Page: find, findOne
- ✅ Page-section: find, findOne
- ✅ Setting: find, findOne

Click **Save**

### Step 3: Add Initial Content

#### A. Create App Domain Setting

1. Go to **Content Manager** → **Settings**
2. Click **"Create new entry"**
3. Fill in:
   ```
   Key: app_domain
   Value: app.jobrythm.com
   Type: string
   ```
4. Click **Save** and **Publish**

#### B. Create Home Page

1. Go to **Content Manager** → **Pages**
2. Click **"Create new entry"**
3. Fill in:
   ```
   Route: /
   Title: Home - Jobrythm
   Meta Description: Win more work. Protect your margins. Job management software for contractors.
   Is Published: true
   ```
4. Click **Save** and **Publish**

#### C. Create Hero Section

1. Go to **Content Manager** → **Page Sections**
2. Click **"Create new entry"**
3. Fill in:
   ```
   Section Type: hero
   Position: 0
   Is Visible: true
   Page: Home (select from dropdown)
   Content:
   ```

   Copy this JSON:
   ```json
   {
     "headline": "Win more work. Protect your margins.",
     "subheadline": "The all-in-one platform for contractors. Quoting, job costing, invoicing, and more.",
     "primaryCTA": {
       "text": "Start free",
       "url": "https://app.jobrythm.com/signup"
     },
     "secondaryCTA": {
       "text": "Book demo",
       "url": "/book-demo"
     }
   }
   ```
4. Click **Save** and **Publish**

#### D. Create Features Section

1. Create another Page Section
2. Fill in:
   ```
   Section Type: features
   Position: 1
   Is Visible: true
   Page: Home
   Content:
   ```

   Copy this JSON:
   ```json
   {
     "title": "Everything you need to run your business",
     "subtitle": "Powerful features built for contractors",
     "features": [
       {
         "title": "Smart Quoting",
         "description": "Create professional quotes in minutes with our intelligent quoting engine.",
         "icon": "file-text"
       },
       {
         "title": "Job Costing",
         "description": "Track every dollar on every job. Know your profit in real-time.",
         "icon": "calculator"
       },
       {
         "title": "Invoicing",
         "description": "Get paid faster with professional invoices and payment tracking.",
         "icon": "credit-card"
       }
     ]
   }
   ```
3. Click **Save** and **Publish**

## Verification (2 minutes)

### Check Everything Works

1. **Frontend**: http://localhost
   - Should load (may show old static content initially)
   
2. **Strapi Admin**: http://localhost:1337/admin
   - Should show your dashboard
   - Check Content Manager has your pages & sections

3. **API Test**: http://localhost:1337/api/pages
   - Should return JSON with your home page

4. **Check Logs**:
   ```bash
   docker compose ps     # All services should be "Up"
   docker compose logs   # No major errors
   ```

## Testing Dynamic Content (Next Session)

To actually see dynamic content on the frontend, you'll need to:

1. **Create Section Renderer Components** in React
   - `src/components/dynamic/HeroSection.tsx`
   - `src/components/dynamic/FeaturesSection.tsx`
   - etc.

2. **Update Page Components** to use `usePage()` hook
   - Replace static content with API data
   - Render sections dynamically

3. **Add Error Boundaries** for graceful failures

4. **Test Domain Configuration** works

## Production Deployment Checklist

Before deploying to production:

- [ ] Generate new secure keys (not the defaults!)
- [ ] Set strong database password
- [ ] Configure domain name in nginx
- [ ] Set up SSL certificates (Let's Encrypt)
- [ ] Configure firewall (only 80, 443 open)
- [ ] Set up automated backups
- [ ] Configure monitoring/alerts
- [ ] Test the update workflow
- [ ] Document the deployment

## Common Issues & Quick Fixes

### Strapi Port 1337 Already in Use
```bash
# Find and kill the process
lsof -ti:1337 | xargs kill -9

# Or change port in docker-compose.yml
ports:
  - "1338:1337"
```

### Database Won't Start
```bash
# Check PostgreSQL logs
docker compose logs database

# Restart database
docker compose restart database

# Nuclear option (loses data!)
docker compose down -v
docker compose up -d --build
```

### Frontend Can't Connect to Strapi
```bash
# Check frontend .env
cat frontend/.env

# Should have:
VITE_API_URL=http://localhost:1337

# Rebuild frontend
docker compose up -d --build frontend
```

### Lost Admin Password
```bash
# Reset via Strapi CLI (inside container)
docker compose exec strapi npm run strapi admin:reset-user-password
```

## Useful Commands Reference

```bash
# View all logs
docker compose logs -f

# View specific service logs
docker compose logs -f strapi
docker compose logs -f database
docker compose logs -f frontend

# Restart a service
docker compose restart strapi

# Rebuild a service
docker compose up -d --build strapi

# Stop everything
docker compose down

# Stop and remove volumes (WARNING: deletes data!)
docker compose down -v

# Check service status
docker compose ps

# Execute commands in container
docker compose exec strapi sh
docker compose exec database psql -U strapi strapi

# Backup database
docker compose exec database pg_dump -U strapi strapi > backup.sql

# Restore database
docker compose exec -T database psql -U strapi strapi < backup.sql
```

## Next Development Tasks

### Priority 1 (Required for MVP)
- [ ] Create section renderer components
- [ ] Update HomePage to use usePage() hook
- [ ] Test dynamic page rendering
- [ ] Add loading states
- [ ] Add error handling

### Priority 2 (Nice to Have)
- [ ] Create more page templates
- [ ] Add more section types
- [ ] Implement search
- [ ] Add blog functionality
- [ ] Create form builder

### Priority 3 (Future)
- [ ] Add user authentication for frontend
- [ ] Implement e-commerce (if needed)
- [ ] Multi-language support
- [ ] A/B testing
- [ ] Advanced analytics

## Resources

- **Strapi Documentation**: https://docs.strapi.io/
- **Docker Documentation**: https://docs.docker.com/
- **React Documentation**: https://react.dev/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/

## Getting Help

If you encounter issues:

1. Check the logs: `docker compose logs -f`
2. Check the documentation: `README.md`, `QUICKSTART.md`, `IMPLEMENTATION_SUMMARY.md`
3. Search Strapi docs: https://docs.strapi.io/
4. Create GitHub issue: https://github.com/Jobrythm/jobrythm.com/issues

---

## Summary

Your Jobrythm CMS is **ready to use**! You now have:

✅ Dockerized application  
✅ Strapi CMS admin panel  
✅ PostgreSQL database with persistent storage  
✅ React frontend with Nginx  
✅ API integration layer  
✅ Environment configuration  
✅ Documentation  

**Next**: Run `./setup.sh` and create your first content!

🚀 **Happy building!**
