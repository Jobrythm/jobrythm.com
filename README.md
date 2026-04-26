# Jobrythm.com - CMS-Powered Marketing Site

A modern marketing website powered by Strapi CMS with a React frontend, fully containerized with Docker for easy deployment and updates.

## Features

- 🎨 **Dynamic Content Management** - Edit pages, content, and settings through Strapi admin panel
- 🎯 **Drag & Drop Page Builder** - Create and arrange page sections with ease
- 🔧 **Configurable Domains** - Change app domain (app.jobrythm.com) from admin panel
- 🐳 **Docker Ready** - Full Docker setup with persistent data storage
- 🚀 **Easy Updates** - Just `git pull` and `docker compose up -d --build`
- 🔒 **Secure** - PostgreSQL database, environment variables, security headers
- 📱 **Responsive** - Mobile-first design with Tailwind CSS

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router
- Framer Motion (animations)

### Backend (CMS)
- Strapi 4.x (Headless CMS)
- PostgreSQL 15
- Node.js 18

### Infrastructure
- Docker & Docker Compose
- Nginx (reverse proxy & static files)
- Persistent volumes for database & uploads

## Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jobrythm/jobrythm.com.git
   cd jobrythm.com
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Generate secure keys** (Important for production!)
   ```bash
   # Generate random keys for production
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   
   Update `.env` with generated keys:
   - `APP_KEYS` (generate 4 keys, comma-separated)
   - `API_TOKEN_SALT`
   - `ADMIN_JWT_SECRET`
   - `TRANSFER_TOKEN_SALT`
   - `JWT_SECRET`
   - `DATABASE_PASSWORD`

4. **Start the application**
   ```bash
   docker compose up -d --build
   ```

5. **Wait for services to start** (~2-3 minutes on first run)
   ```bash
   docker compose logs -f strapi
   ```

6. **Access the application**
   - **Frontend**: http://localhost
   - **Strapi Admin**: http://localhost:1337/admin

7. **Create admin user** (First time only)
   - Navigate to http://localhost:1337/admin
   - Create your admin account
   - Email: `admin@jobrythm.com`
   - Password: `adminpassword` (or your choice)

## Usage

### Managing Content

1. **Login to Strapi Admin**
   - URL: http://localhost:1337/admin
   - Default credentials: admin@jobrythm.com / adminpassword

2. **Create Content Types**
   - Pages
   - Page Sections (Hero, Features, Pricing, etc.)
   - Settings (App Domain, Site Title, etc.)

3. **Build Pages**
   - Add sections using drag & drop
   - Edit content with markdown support
   - Publish when ready

### Updating the Site

When you make code changes or pull updates:

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker compose up -d --build

# View logs
docker compose logs -f
```

### Managing Domain Configuration

1. Go to Strapi Admin → Settings
2. Add/Edit setting: `app_domain`
3. Set value: `app.jobrythm.com` or `app.jobrythm.aricummings.com`
4. Frontend will automatically use this value

## Docker Commands

```bash
# Start all services
docker compose up -d

# Start with rebuild
docker compose up -d --build

# Stop all services
docker compose down

# View logs
docker compose logs -f [service_name]

# Restart a service
docker compose restart [service_name]

# Remove all containers and volumes (WARNING: deletes data!)
docker compose down -v
```

## Data Persistence

All data is stored in Docker volumes:
- `db_data` - PostgreSQL database
- `strapi_uploads` - Uploaded media files

**Important**: These volumes persist even when containers are removed (unless you use `docker compose down -v`).

## Development

### Local Development (without Docker)

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Strapi
```bash
cd strapi
npm install
npm run develop
```

Update `.env` files in each directory with local database credentials.

## Project Structure

```
jobrythm.com/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
│   ├── Dockerfile
│   └── nginx.conf
│
├── strapi/               # Strapi CMS
│   ├── config/          # Configuration files
│   ├── src/
│   │   ├── api/         # API endpoints
│   │   └── admin/       # Admin customization
│   └── Dockerfile
│
├── docker-compose.yml    # Docker orchestration
└── .env.example         # Environment template
```

## Content Types

### Pages
- Route (e.g., `/`, `/features`, `/pricing`)
- Title & Meta Description (SEO)
- Sections (relation to Page Sections)
- Published status

### Page Sections
- Section Type (Hero, Features, Pricing, Markdown, etc.)
- Content (JSON with markdown support)
- Position (for ordering)
- Visibility toggle

### Settings
- App Domain
- Site Title
- Contact Email
- Social Links
- Custom settings

## Environment Variables

See `.env.example` for all available variables.

**Critical for production:**
- Generate unique, secure keys for all `APP_KEYS`, secrets, and salts
- Use strong database password
- Set `NODE_ENV=production`

## Troubleshooting

### Strapi admin panel not loading
```bash
# Check Strapi logs
docker compose logs strapi

# Rebuild Strapi
docker compose up -d --build strapi
```

### Database connection issues
```bash
# Check database is running
docker compose ps

# Check database logs
docker compose logs database

# Restart database
docker compose restart database
```

### Port conflicts
If ports 80, 443, or 1337 are in use:
1. Stop conflicting services
2. Or modify `docker-compose.yml` to use different ports

### Data loss after update
Data in Docker volumes persists automatically. If you need to backup:
```bash
# Backup database
docker compose exec database pg_dump -U strapi strapi > backup.sql

# Restore database
docker compose exec -T database psql -U strapi strapi < backup.sql
```

## Security Considerations

- ✅ All sensitive data in environment variables
- ✅ PostgreSQL with persistent storage
- ✅ Nginx security headers
- ✅ Strapi admin protected by JWT
- ✅ CORS configuration
- ✅ Rate limiting (can be configured)

**For production:**
1. Use strong, unique secrets
2. Enable HTTPS (add SSL certificates to nginx)
3. Configure firewall rules
4. Regular backups
5. Keep dependencies updated

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/Jobrythm/jobrythm.com/issues
- Email: support@jobrythm.com

## Changelog

### v1.0.0 (Current)
- Initial release with Strapi CMS
- Docker setup with persistent data
- React frontend with Tailwind CSS
- Configurable domain settings
- Drag & drop page builder

