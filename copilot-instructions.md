# Copilot Instructions for Jobrythm Marketing Site

## Project Overview

This is the **marketing website** for Jobrythm, a SaaS platform for trades businesses. This is NOT the web app itself - it's the public-facing marketing site.

- **Marketing site URL**: https://jobrythm.io
- **Product app URL**: https://jobrythm.app
- **Target audience**: Small trade businesses and solo contractors (electricians, plumbers, builders, renovators, etc.)

## Important Context

### External Links
- **All signup CTAs** must link to: `https://jobrythm.app/signup`
- **All login CTAs** must link to: `https://jobrythm.app/login`
- **Never link to local /signup or /login routes** - they don't exist in this marketing site

### Brand Identity
- **Name**: Jobrythm
- **Tagline**: "Win more work. Protect your margins."
- **Core Value Prop**: Quoting, job costing, invoicing, and cashflow clarity in one workflow
- **Tone**: Professional, trustworthy, practical, trade-friendly

### Design Direction
- Clean modern SaaS aesthetic (think Stripe, Linear, Notion quality)
- Color palette: Deep navy (#102a43 - #334e68) + Electric blue (#0084e6) + Clean neutrals
- Rounded cards, soft shadows, generous spacing
- Mobile-first responsive design

## Tech Stack

```json
{
  "framework": "React 18+ with TypeScript",
  "bundler": "Vite",
  "routing": "React Router v6",
  "styling": "Tailwind CSS",
  "animations": "Framer Motion",
  "icons": "Lucide React"
}
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout wrapper
│   └── ui/              # Reusable UI components (Button, Card, Container)
├── pages/               # Page components (one per route)
├── data/                # Mock data and content files
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── main.tsx             # App entry point with routing
```

## Routing Architecture

All routes are defined in `src/main.tsx`:

- `/` - Home page (primary landing)
- `/features` - Features overview
- `/pricing` - Pricing plans with monthly/annual toggle
- `/about` - Mission, values, team
- `/contact` - Contact form
- `/book-demo` - Demo booking form
- `/security` - Security and compliance info
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `*` - 404 Not Found page

## Component Conventions

### UI Components (`src/components/ui/`)

#### Button
```tsx
import Button from '../components/ui/Button';

<Button variant="primary" size="lg">Click me</Button>
// Variants: primary, secondary, outline, ghost
// Sizes: sm, md, lg
// Props: fullWidth, className, ...buttonProps
```

#### Card
```tsx
import Card from '../components/ui/Card';

<Card hover className="p-8">Content</Card>
// Props: hover (adds shadow effect), className
```

#### Container
```tsx
import Container from '../components/ui/Container';

<Container size="lg">Content</Container>
// Sizes: sm (max-w-3xl), md (max-w-5xl), lg (max-w-7xl), xl (max-w-[1400px]), full
```

### Layout Components (`src/components/layout/`)

- **Layout**: Wrapper with Navbar + content + Footer
- **Navbar**: Sticky navigation with mobile menu
- **Footer**: Site-wide footer with links and social

## Styling Guidelines

### Tailwind Custom Colors

```js
// Navy shades (primary)
navy-50 to navy-900

// Electric blue shades (accent)
electric-50 to electric-900

// Use navy for text, backgrounds, and primary UI
// Use electric for CTAs, highlights, and interactive elements
```

### Common Patterns

#### Section Spacing
```tsx
<section className="py-20 lg:py-32">
  <Container>
    {/* Section content */}
  </Container>
</section>
```

#### Alternating Background Colors
```tsx
// White sections
<section className="py-20 lg:py-32 bg-white">

// Light navy background
<section className="py-20 lg:py-32 bg-navy-50">

// Dark navy background (hero/CTA bands)
<section className="py-20 lg:py-32 bg-navy-900 text-white">

// Electric accent background
<section className="py-20 lg:py-32 bg-electric-500 text-white">
```

#### Responsive Grid
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Grid items */}
</div>
```

## Animation Conventions

Use Framer Motion for scroll animations:

```tsx
import { motion } from 'framer-motion';

// Page entry animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>

// Scroll-triggered animation (use viewport={{ once: true }})
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>

// Staggered animations
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Item */}
  </motion.div>
))}
```

## Form Patterns

### Client-Side Form Handling

Since there's no backend, all forms use client-side validation and console.log for submissions:

```tsx
const [formData, setFormData] = useState({ /* fields */ });
const [errors, setErrors] = useState<Record<string, string>>({});
const [submitted, setSubmitted] = useState(false);

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  // Add validation logic
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    console.log('Form submission:', formData);
    setSubmitted(true);
    // TODO: Send to backend when available
  }
};
```

### Form Field Pattern
```tsx
<div>
  <label htmlFor="email" className="block text-sm font-medium text-navy-900 mb-2">
    Email *
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    className={`w-full px-4 py-3 rounded-lg border ${
      errors.email ? 'border-red-500' : 'border-gray-300'
    } focus:outline-none focus:ring-2 focus:ring-electric-500`}
    placeholder="john@example.com"
  />
  {errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
  )}
</div>
```

## SEO Optimization

### Page Title Pattern
```tsx
// In index.html or via Helmet/React Helmet
<title>Page Title - Jobrythm</title>
```

### Meta Tags
All meta tags are defined in `index.html`:
- Description
- Keywords
- Open Graph (og:title, og:description, og:image)
- Twitter Card

### Accessibility

- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- Include `aria-label` on icon-only buttons
- Ensure keyboard navigation works (focus states)
- Maintain color contrast ratios (WCAG AA)
- Use proper heading hierarchy (h1 -> h2 -> h3)

## Content Guidelines

### Testimonials & Social Proof
- Always mark testimonials as **fictional** or **illustrative**
- Use placeholder company logos (generic names like "Trade Co", not real brands)
- Clearly label any illustrative statistics

### Pricing Information
- Keep pricing in sync with actual app pricing
- Show both monthly and annual options
- Be clear about what's included in each tier

### Legal Pages
- Privacy policy and Terms are comprehensive templates
- Update "Last updated" date when making changes
- Contact email: `hello@jobrythm.aricummings.com`

## Development Workflow

### Adding a New Page

1. Create page component in `src/pages/PageName.tsx`
2. Follow existing page structure (Hero → Sections → CTA)
3. Add route in `src/main.tsx`
4. Add navigation link in `Navbar.tsx` (if applicable)
5. Add link in `Footer.tsx` (if applicable)

### Adding a New Component

1. Create in `src/components/ui/` or `src/components/layout/`
2. Use TypeScript with proper prop types
3. Export as default
4. Follow existing naming conventions

### Styling Rules

- Use Tailwind utility classes (no custom CSS unless necessary)
- Mobile-first approach (use `md:` and `lg:` breakpoints)
- Use custom navy and electric colors from config
- Maintain consistent spacing (py-20 lg:py-32 for sections)

## Performance Considerations

- Use lazy loading for images where appropriate
- Keep bundle size manageable (current setup is optimal)
- Framer Motion animations are optimized (viewport={{ once: true }})
- No heavy external dependencies

## Testing Checklist

When making changes, verify:
- [ ] Mobile responsiveness (320px to 1920px)
- [ ] All CTAs link to correct URLs (jobrythm.app)
- [ ] Forms validate properly
- [ ] Animations work smoothly
- [ ] Navigation works on all pages
- [ ] Accessibility (keyboard nav, focus states)
- [ ] No console errors

## Common Tasks

### Update Pricing
1. Edit pricing data in `src/pages/PricingPage.tsx`
2. Update pricing teaser on Home page if needed
3. Ensure FAQ reflects current pricing

### Add New Feature
1. Add feature to Home page features section
2. Add detailed section to Features page
3. Update comparison table if relevant
4. Consider adding to "What's included" in pricing

### Change Brand Colors
1. Update `tailwind.config.js` color definitions
2. Test across all pages
3. Verify contrast ratios for accessibility

## Important Notes

- **No backend**: All forms are client-side only (console.log submissions)
- **External links**: Always use external app URLs for signup/login
- **Placeholder content**: Testimonials and stats are illustrative
- **SEO**: Meta tags are in index.html, update when needed
- **Mobile-first**: Always test mobile layouts first

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Router Docs](https://reactrouter.com/en/main)
- [Lucide Icons](https://lucide.dev/)

## Contact for Questions

For questions about business requirements or content, contact the product team at `hello@jobrythm.aricummings.com`.
