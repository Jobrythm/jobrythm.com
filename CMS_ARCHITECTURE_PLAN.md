# CMS Architecture - Strapi Implementation

## Overview
We're using Strapi headless CMS instead of building a custom CMS from scratch. This provides:
- ✅ Production-ready admin panel
- ✅ Built-in drag & drop content builder
- ✅ User authentication & permissions
- ✅ Media library
- ✅ API generation
- ✅ PostgreSQL support
- ✅ Docker ready
- ✅ Well maintained & documented

## Architecture Decision

**Original Plan**: Custom Express + TypeScript backend with custom admin panel using Tabler template (~2 weeks development)

**Final Decision**: Strapi CMS (~2-3 days integration)

**Rationale**:
- Faster time to market
- Production-tested and battle-hardened
- Active community and regular updates
- All required features out of the box
- Lower maintenance burden
- Better security (regular patches)

## Technology Stack

### Frontend (Existing + Updates)
- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6
- Framer Motion
- **NEW: React DnD or dnd-kit** (for drag-and-drop)
- **NEW: React Markdown** (for markdown rendering)

### Backend (New)
- Node.js + Express + TypeScript
- JWT authentication
- Bcrypt for password hashing
- Multer for file uploads
- CORS enabled

### Admin Panel (New)
- **Tabler Admin Template** (HTML/CSS/JS)
- Integrated with React or standalone HTML pages
- Authentication protected routes

### Database (New)
- PostgreSQL 15+ (for structured data)
- Tables: users, pages, page_sections, settings, media

### Infrastructure (New)
- Docker + Docker Compose
- Nginx as reverse proxy
- Persistent volumes for database and uploads
- Hot reload in development mode

## Database Schema

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Settings table (key-value store)
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'string',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pages table
CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  route VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Page sections table (for drag-and-drop components)
CREATE TABLE page_sections (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES pages(id) ON DELETE CASCADE,
  section_type VARCHAR(100) NOT NULL,
  content JSONB,
  position INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Media table
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  mime_type VARCHAR(100),
  size INTEGER,
  url TEXT NOT NULL,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Project Structure (After Transformation)

```
jobrythm.com/
├── docker-compose.yml
├── .env.example
├── .dockerignore
├── .gitignore
│
├── frontend/                 # React frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   └── dynamic/     # NEW: Dynamic section components
│   │   ├── pages/
│   │   │   ├── admin/       # NEW: Admin panel pages
│   │   │   └── public/      # Public facing pages
│   │   ├── services/        # NEW: API client
│   │   ├── contexts/        # NEW: Auth context
│   │   └── utils/
│   └── public/
│
├── backend/                  # NEW: Express backend
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── server.ts
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Page.ts
│   │   │   ├── PageSection.ts
│   │   │   └── Setting.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── pages.ts
│   │   │   ├── sections.ts
│   │   │   ├── settings.ts
│   │   │   └── media.ts
│   │   ├── controllers/
│   │   └── utils/
│   └── uploads/             # Persistent volume mount
│
└── database/                 # PostgreSQL init scripts
    └── init.sql
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Admin login
- POST `/api/auth/logout` - Admin logout
- GET `/api/auth/me` - Get current user
- POST `/api/auth/change-password` - Change password

### Pages
- GET `/api/pages` - List all pages
- GET `/api/pages/:id` - Get page by ID
- GET `/api/pages/route/:route` - Get page by route (for frontend)
- POST `/api/pages` - Create new page
- PUT `/api/pages/:id` - Update page
- DELETE `/api/pages/:id` - Delete page
- PUT `/api/pages/:id/publish` - Publish/unpublish page

### Page Sections
- GET `/api/pages/:pageId/sections` - Get page sections
- POST `/api/pages/:pageId/sections` - Add section to page
- PUT `/api/sections/:id` - Update section
- DELETE `/api/sections/:id` - Delete section
- PUT `/api/sections/reorder` - Reorder sections (drag-and-drop)

### Settings
- GET `/api/settings` - Get all settings
- GET `/api/settings/:key` - Get setting by key
- PUT `/api/settings/:key` - Update setting
- POST `/api/settings` - Create new setting

### Media
- POST `/api/media/upload` - Upload file
- GET `/api/media` - List all media
- DELETE `/api/media/:id` - Delete media file

## Section Types (Drag-and-Drop Components)

### Available Section Types
1. **Hero** - Hero section with headline, subheadline, CTAs
2. **Features Grid** - Grid of feature cards
3. **Pricing** - Pricing tables
4. **Testimonials** - Customer testimonials
5. **CTA Band** - Call-to-action banner
6. **Rich Text** - Markdown content
7. **Image** - Single image with caption
8. **Image Gallery** - Multiple images
9. **Video** - Embedded video
10. **FAQ** - Accordion FAQ section
11. **Contact Form** - Form builder
12. **Custom HTML** - Raw HTML/React component

### Section Data Structure
```json
{
  "id": 1,
  "section_type": "hero",
  "content": {
    "headline": "Win more work. Protect your margins.",
    "subheadline": "Quoting, job costing, invoicing...",
    "primaryCTA": {
      "text": "Start free",
      "url": "{{APP_URL}}/signup"
    },
    "secondaryCTA": {
      "text": "Book demo",
      "url": "/book-demo"
    },
    "backgroundImage": "/uploads/hero-bg.jpg"
  },
  "position": 0,
  "is_visible": true
}
```

## Docker Setup

### docker-compose.yml
```yaml
version: '3.8'

services:
  # PostgreSQL Database
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: jobrythm_cms
      POSTGRES_USER: jobrythm
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - jobrythm_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U jobrythm"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      PORT: 3000
      DATABASE_URL: postgresql://jobrythm:${DB_PASSWORD}@database:5432/jobrythm_cms
      JWT_SECRET: ${JWT_SECRET}
      DEFAULT_ADMIN_EMAIL: admin@jobrythm.com
      DEFAULT_ADMIN_PASSWORD: adminpassword
    volumes:
      - ./backend/uploads:/app/uploads
    ports:
      - "3000:3000"
    depends_on:
      database:
        condition: service_healthy
    networks:
      - jobrythm_network

  # Frontend (React + Nginx)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      VITE_API_URL: http://backend:3000
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - jobrythm_network

volumes:
  postgres_data:
    driver: local

networks:
  jobrythm_network:
    driver: bridge
```

## Admin Panel Features (Using Tabler)

### Dashboard
- Overview statistics
- Recent pages
- Quick actions

### Pages Management
- List all pages (table view)
- Create/edit/delete pages
- Publish/unpublish toggle
- SEO settings per page

### Page Builder (Drag-and-Drop)
- Left sidebar: Available sections
- Center: Preview with drag handles
- Right sidebar: Section editor (markdown, settings)
- Real-time preview
- Save draft / Publish

### Settings
- **App Domain**: Configure app.jobrythm.com URL
- Site title, description
- Logo upload
- Social media links
- Contact email
- Analytics IDs

### Media Library
- Upload images/files
- Grid view with thumbnails
- Search and filter
- Delete unused media

### Profile
- Change password
- Update profile info

## Environment Variables

### .env.example
```env
# Database
DB_PASSWORD=your_secure_password_here

# Backend
JWT_SECRET=your_jwt_secret_here
DEFAULT_ADMIN_EMAIL=admin@jobrythm.com
DEFAULT_ADMIN_PASSWORD=adminpassword

# Frontend
VITE_API_URL=http://localhost:3000
```

## Implementation Steps

### Phase 1: Backend Setup
1. Create backend directory structure
2. Set up Express + TypeScript
3. Configure PostgreSQL connection
4. Create database models
5. Implement authentication (JWT)
6. Create API routes
7. Add seed script for default admin

### Phase 2: Database & Docker
1. Create init.sql with schema
2. Write docker-compose.yml
3. Create Dockerfiles for frontend/backend
4. Test docker-compose up
5. Verify persistent volumes

### Phase 3: Admin Panel Integration
1. Download Tabler Admin template
2. Create admin routes in React
3. Integrate Tabler HTML/CSS
4. Build admin pages (Dashboard, Pages, Settings)
5. Implement authentication flow

### Phase 4: Page Builder
1. Install react-dnd or dnd-kit
2. Create section components
3. Build drag-and-drop interface
4. Implement markdown editor
5. Add section CRUD operations
6. Real-time preview

### Phase 5: Frontend Updates
1. Create API client service
2. Update pages to fetch dynamic content
3. Render sections dynamically
4. Handle {{APP_URL}} placeholder replacement
5. Add loading states

### Phase 6: Settings & Configuration
1. Create settings API
2. Build settings UI in admin
3. Implement domain configuration
4. Add settings context in frontend
5. Use settings throughout site

### Phase 7: Testing & Refinement
1. Test full docker workflow
2. Test data persistence
3. Test admin features
4. Validate security
5. Performance optimization

## Migration from Static to Dynamic

### Content Migration Strategy
1. Extract existing page content to JSON
2. Create seed script to populate database
3. Map static components to section types
4. Import initial content via API

### Backward Compatibility
- Keep existing React components
- Add dynamic rendering layer
- Gradual migration page by page

## Security Considerations

1. **Authentication**: JWT tokens, HTTP-only cookies
2. **Authorization**: Role-based access (admin only)
3. **Input Validation**: Sanitize all inputs
4. **SQL Injection**: Use parameterized queries
5. **XSS Protection**: Sanitize markdown output
6. **CSRF Protection**: CSRF tokens for forms
7. **Rate Limiting**: API rate limits
8. **File Uploads**: Validate file types and sizes

## Performance Optimization

1. **Caching**: Redis for page cache (future)
2. **CDN**: Static assets via CDN
3. **Database Indexes**: Index frequently queried fields
4. **Image Optimization**: Compress uploads
5. **Lazy Loading**: Lazy load sections

## Monitoring & Logging

1. API request logging
2. Error tracking (Sentry integration)
3. Database query logging
4. Admin action audit log

## Future Enhancements

1. Multi-language support
2. A/B testing sections
3. Analytics dashboard
4. Email templates
5. Webhooks for deployments
6. Version control for pages
7. User roles (editor, viewer)
8. API documentation (Swagger)

## Timeline Estimate

- Phase 1: Backend Setup - 2-3 days
- Phase 2: Database & Docker - 1 day
- Phase 3: Admin Panel - 2-3 days
- Phase 4: Page Builder - 3-4 days
- Phase 5: Frontend Updates - 2 days
- Phase 6: Settings - 1 day
- Phase 7: Testing - 1-2 days

**Total: ~2 weeks for full implementation**

## Notes

- This transforms a simple marketing site into a full CMS
- Significant increase in complexity and maintenance
- Consider hosting costs (database, storage)
- Backup strategy needed for production
- Consider using existing CMS (Strapi, Payload) if timeline is critical
