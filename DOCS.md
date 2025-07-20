# API Documentation

This document provides information about the project's structure, components, and customization options.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── projects/          # Projects pages
│       ├── page.tsx       # Projects listing
│       └── [id]/          # Individual project pages
├── components/            # Reusable React components
│   ├── footer.tsx         # Footer component
│   ├── hero.tsx          # Hero/banner component
│   ├── navigation.tsx     # Navigation header
│   ├── projects-section.tsx # Projects showcase
│   ├── skills-section.tsx   # Skills display
│   ├── testimonials-section.tsx # Client testimonials
│   ├── theme-provider.tsx    # Theme context provider
│   └── theme-toggle.tsx     # Dark/light mode toggle
├── data/                  # Static data and content
│   └── projects.ts        # Project information
├── lib/                   # Utility functions
│   └── utils.ts          # Common utilities
└── types/                 # TypeScript type definitions
    └── index.ts          # Shared types
```

## Component API

### Hero Component

```typescript
interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
  resumeUrl?: string;
}
```

**Props:**
- `name` - Display name (default: "Alex Johnson")
- `title` - Professional title (default: "Full Stack Developer & UI/UX Designer")
- `description` - Brief description/bio
- `resumeUrl` - Link to resume/CV file

### ProjectsSection Component

```typescript
interface ProjectsSectionProps {
  featured?: boolean;
  limit?: number;
  showAll?: boolean;
}
```

**Props:**
- `featured` - Show only featured projects
- `limit` - Maximum number of projects to display
- `showAll` - Override featured filter

### SkillsSection Component

```typescript
interface SkillsSectionProps {
  categories?: SkillCategory[];
  showProgress?: boolean;
}
```

**Props:**
- `categories` - Which skill categories to display
- `showProgress` - Show skill level progress bars

## Data Models

### Project Type

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedAt: string;
}

type ProjectCategory = 'web' | 'mobile' | 'design' | 'fullstack' | 'other';
```

### Skill Type

```typescript
interface Skill {
  name: string;
  level: number; // 1-100
  category: SkillCategory;
  icon?: string;
}

type SkillCategory = 'frontend' | 'backend' | 'design' | 'tools' | 'languages';
```

### Testimonial Type

```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}
```

## Customization Guide

### Colors and Theming

The project uses CSS custom properties for theming. Update `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;
  /* ... other color variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark theme colors */
}
```

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your component
3. Optional: Add `layout.tsx` for page-specific layouts
4. Update navigation in `src/components/navigation.tsx`

### Modifying Project Data

Edit `src/data/projects.ts` to add, remove, or modify projects:

```typescript
export const projects: Project[] = [
  {
    id: "unique-id",
    title: "Project Title",
    description: "Short description",
    longDescription: "Detailed description for project page",
    image: "https://example.com/image.jpg",
    technologies: ["React", "TypeScript", "Tailwind"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/repo",
    featured: true,
    completedAt: "2024-01-15",
  },
  // ... more projects
];
```

### Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
# Contact form (if using EmailJS)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Analytics (if using Google Analytics)
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID

# CMS (if using Sanity/Contentful)
SANITY_PROJECT_ID=your_project_id
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

### Netlify

1. Build command: `npm run build`
2. Publish directory: `out`
3. Add `next.config.js` configuration for static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Docker

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Performance Optimization

### Image Optimization

Use Next.js Image component for automatic optimization:

```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={600}
  height={400}
  priority // For above-the-fold images
  placeholder="blur" // Add blur placeholder
  blurDataURL="data:image/jpeg;base64,..." // Blur data
/>
```

### Font Optimization

Fonts are automatically optimized with Next.js:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
```

### Bundle Analysis

Analyze bundle size:

```bash
npm install --save-dev @next/bundle-analyzer
```

Add to `next.config.js`:

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

Run analysis:

```bash
ANALYZE=true npm run build
```

## Security Considerations

### Content Security Policy

Add CSP headers in `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### Form Validation

Always validate forms on both client and server:

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Client-side validation
const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: zodResolver(contactSchema)
});
```

## Testing

### Unit Testing with Jest

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Example test:

```typescript
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/hero';

describe('Hero Component', () => {
  it('renders with default props', () => {
    render(<Hero />);
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
  });
});
```

### E2E Testing with Playwright

```bash
npm install --save-dev @playwright/test
```

Example test:

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Alex Johnson');
});
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
