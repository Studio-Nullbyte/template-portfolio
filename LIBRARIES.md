# Recommended Third-Party Libraries

This document outlines additional third-party libraries that can be integrated to speed up development and reduce complexity for the portfolio website template.

## Already Included Libraries

### Core Dependencies
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **next-themes**: Dark/light mode theme switching
- **Framer Motion**: Animation library for React
- **Lucide React**: Beautiful icon library
- **clsx & tailwind-merge**: Utility for conditionally joining classNames

### UI Components
- **@headlessui/react**: Unstyled, accessible UI components
- **@radix-ui/react-dialog**: Modal dialogs
- **@radix-ui/react-dropdown-menu**: Dropdown menus
- **@radix-ui/react-tooltip**: Tooltips

### Form Handling
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: TypeScript-first schema declaration and validation

## Recommended Additional Libraries

### 1. Content Management
```bash
npm install @sanity/client @sanity/image-url
# or
npm install contentful
```
**Purpose**: For dynamic content management, blog posts, and project data
**Benefits**: Easy content updates without code changes

### 2. Image Optimization
```bash
npm install next-cloudinary
# or  
npm install @vercel/og
```
**Purpose**: Advanced image optimization and OG image generation
**Benefits**: Better performance and SEO

### 3. Email Services
```bash
npm install @emailjs/browser
# or
npm install nodemailer @types/nodemailer
```
**Purpose**: Handle contact form submissions
**Benefits**: Direct email functionality without backend

### 4. Analytics
```bash
npm install @vercel/analytics
# or
npm install react-ga4
```
**Purpose**: Track website usage and user behavior
**Benefits**: Data-driven insights for improvements

### 5. SEO Enhancement
```bash
npm install next-seo
npm install next-sitemap
```
**Purpose**: Advanced SEO optimization
**Benefits**: Better search engine visibility

### 6. Performance Monitoring
```bash
npm install @vercel/speed-insights
npm install web-vitals
```
**Purpose**: Monitor Core Web Vitals and performance metrics
**Benefits**: Ensure optimal user experience

### 7. Animation Enhancements
```bash
npm install lottie-react
npm install react-intersection-observer
```
**Purpose**: Lottie animations and scroll-triggered animations
**Benefits**: Rich interactive experiences

### 8. Utility Libraries
```bash
npm install date-fns
npm install react-use
npm install usehooks-ts
```
**Purpose**: Date formatting, common hooks, and utilities
**Benefits**: Faster development with pre-built utilities

### 9. Testing (Development)
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
npm install --save-dev playwright @playwright/test
```
**Purpose**: Unit and E2E testing
**Benefits**: Ensure code reliability and quality

### 10. Code Quality (Development)
```bash
npm install --save-dev prettier eslint-config-prettier husky lint-staged
```
**Purpose**: Code formatting and pre-commit hooks
**Benefits**: Consistent code style across team

## Integration Examples

### 1. Contact Form with EmailJS
```typescript
import emailjs from '@emailjs/browser';

const sendEmail = async (formData: ContactForm) => {
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    );
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
```

### 2. Content Management with Sanity
```typescript
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

export const getProjects = async () => {
  return await client.fetch('*[_type == "project"]');
};
```

### 3. SEO with next-seo
```typescript
import { NextSeo } from 'next-seo';

export default function ProjectPage({ project }) {
  return (
    <>
      <NextSeo
        title={`${project.title} - Portfolio`}
        description={project.description}
        openGraph={{
          title: project.title,
          description: project.description,
          images: [{ url: project.image }],
        }}
      />
      {/* Page content */}
    </>
  );
}
```

### 4. Analytics with Vercel Analytics
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Deployment Considerations

### Environment Variables
Create a `.env.local` file for sensitive data:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
SANITY_PROJECT_ID=your_project_id
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Performance Optimization
- Use `next/dynamic` for code splitting
- Implement proper image optimization with `next/image`
- Enable compression and caching
- Use CDN for static assets

### Security Best Practices
- Validate all form inputs
- Sanitize user-generated content
- Use HTTPS in production
- Implement rate limiting for forms
- Keep dependencies updated

## Recommended Folder Structure with Libraries

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form components with validation
│   └── animations/      # Animation components
├── lib/
│   ├── sanity.ts        # CMS client
│   ├── analytics.ts     # Analytics utilities
│   ├── email.ts         # Email service
│   └── validations.ts   # Zod schemas
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── types/               # TypeScript definitions
```

This setup provides a solid foundation for a professional portfolio website that can be easily extended and customized based on specific requirements.
