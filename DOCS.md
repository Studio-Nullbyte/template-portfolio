# API Documentation

This document provides comprehensive information about the project's structure, components, and customization options.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with error boundaries
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── demo/              # Error boundaries & image demo
│   └── projects/          # Projects pages
│       ├── page.tsx       # Projects listing
│       └── [id]/          # Individual project pages
├── components/            # Reusable React components
│   ├── error-boundaries/  # Error handling components
│   │   ├── ErrorBoundary.tsx       # Main error boundary
│   │   └── SpecificErrorBoundaries.tsx # Specialized boundaries
│   ├── ui/               # UI components
│   │   └── SafeImage.tsx # Image components with fallbacks
│   ├── navigation/       # Navigation components
│   ├── footer.tsx        # Footer component
│   ├── hero.tsx          # Hero/banner component with variants
│   ├── navigation.tsx    # Navigation header
│   ├── projects-section.tsx # Projects showcase
│   ├── skills-section.tsx   # Skills display with variants
│   ├── testimonials-section.tsx # Client testimonials with variants
│   ├── theme-provider.tsx    # Theme context provider
│   └── theme-toggle.tsx     # Dark/light mode toggle
├── data/                  # Static data and content
│   └── projects.ts        # Project information
├── lib/                   # Utility functions
│   └── utils.ts          # Common utilities & image helpers
└── types/                 # TypeScript type definitions
    └── index.ts          # Discriminated unions & shared types
```

## 🛡️ Error Boundaries

### ErrorBoundary (Main Component)

The main error boundary class component that catches errors and provides fallback UI.

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
}
```

**Usage:**
```tsx
<ErrorBoundary
  fallback={CustomErrorFallback}
  onError={(error, errorInfo) => console.log('Error:', error)}
  resetKeys={[userId, currentPage]}
>
  <YourComponent />
</ErrorBoundary>
```

### Specialized Error Boundaries

#### PageErrorBoundary
Protects entire pages with page-specific error handling.

```tsx
<PageErrorBoundary>
  <YourPageContent />
</PageErrorBoundary>
```

#### SectionErrorBoundary
Isolates page sections to prevent section failures from affecting other sections.

```tsx
<SectionErrorBoundary sectionName="Projects">
  <ProjectsSection />
</SectionErrorBoundary>
```

#### ComponentErrorBoundary
Protects individual components with component-specific error messages.

```tsx
<ComponentErrorBoundary componentName="User Avatar">
  <Avatar src={user.avatar} name={user.name} />
</ComponentErrorBoundary>
```

#### AsyncErrorBoundary
Handles errors from async operations with reset functionality.

```tsx
<AsyncErrorBoundary resetKeys={[fetchId, userId]}>
  <AsyncDataComponent />
</AsyncErrorBoundary>
```

## 🖼️ Safe Image Components

### SafeImage

Base image component with automatic fallback handling.

```typescript
interface SafeImageProps extends Omit<ImageProps, 'onError' | 'src'> {
  src: string;
  fallbackType?: 'avatar' | 'placeholder';
  fallbackSeed?: string;
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
```

**Usage:**
```tsx
<SafeImage
  src="https://example.com/image.jpg"
  alt="Description"
  width={400}
  height={300}
  fallbackType="placeholder"
  fallbackSeed="unique-seed"
/>
```

### Avatar

Specialized component for user profile images with automatic generation.

```typescript
interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}
```

**Usage:**
```tsx
<Avatar
  src={user.avatarUrl}     // Optional
  name="John Doe"          // Required for fallback generation
  size={64}
  className="rounded-full"
/>
```

### ProjectImage

Optimized component for project screenshots with project-specific fallbacks.

```typescript
interface ProjectImageProps {
  src: string;
  title: string;
  className?: string;
}
```

**Usage:**
```tsx
<ProjectImage
  src={project.imageUrl}
  title={project.title}
  className="rounded-lg"
  fill
/>
```

## 🎯 Component API with Discriminated Unions

### Hero Component

The Hero component uses discriminated unions for type-safe variants:

```typescript
export type HeroProps = {
  className?: string;
} & (
  | {
      variant: 'default';
      name?: string;
      title?: string;
      description?: string;
      resumeUrl?: string;
      showActions?: boolean;
      showStatus?: boolean;
    }
  | {
      variant: 'minimal';
      name: string;
      title: string;
      showActions?: false;
      showStatus?: false;
    }
  | {
      variant: 'custom';
      children: ReactNode;
    }
);
```

**Usage Examples:**
```tsx
// Default variant - full featured
<Hero variant="default" />

// Minimal variant - requires name and title
<Hero 
  variant="minimal" 
  name="John Doe" 
  title="Developer" 
/>

// Custom variant - provide your own content
<Hero variant="custom">
  <div>Custom hero content</div>
</Hero>
```
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

The SkillsSection component uses discriminated unions for different display variants:

```typescript
export type SkillsSectionProps = {
  className?: string;
} & (
  | {
      variant: 'categories';
      skills?: SkillCategory[];
      showProgress?: boolean;
    }
  | {
      variant: 'grid';
      skills: Skill[];
      columns?: 2 | 3 | 4;
    }
  | {
      variant: 'list';
      skills: Skill[];
      showIcons?: boolean;
    }
);
```

**Usage Examples:**
```tsx
// Categories variant - grouped by skill type
<SkillsSection 
  variant="categories" 
  showProgress={true}
/>

// Grid variant - skills in a grid layout
<SkillsSection 
  variant="grid" 
  skills={customSkills}
  columns={3}
/>

// List variant - simple list display
<SkillsSection 
  variant="list" 
  skills={customSkills}
  showIcons={true}
/>
```

### TestimonialsSection Component

The TestimonialsSection component supports different display modes:

```typescript
export type TestimonialsSectionProps = {
  className?: string;
} & (
  | {
      variant: 'carousel';
      testimonials?: Testimonial[];
      autoPlay?: boolean;
      showDots?: boolean;
    }
  | {
      variant: 'grid';
      testimonials: Testimonial[];
      columns?: 1 | 2 | 3;
    }
);
```

**Usage Examples:**
```tsx
// Carousel variant - sliding testimonials
<TestimonialsSection 
  variant="carousel" 
  autoPlay={true}
  showDots={true}
/>

// Grid variant - static grid layout
<TestimonialsSection 
  variant="grid" 
  testimonials={customTestimonials}
  columns={2}
/>
```

### Navigation Component

The Navigation component uses discriminated unions for different navigation types:

```typescript
export type NavigationProps = {
  className?: string;
} & (
  | {
      variant: 'header';
      items?: readonly NavItem[];
      showLogo?: boolean;
      sticky?: boolean;
    }
  | {
      variant: 'sidebar';
      items: readonly NavItem[];
      isOpen: boolean;
      onClose: () => void;
    }
  | {
      variant: 'footer';
      items: readonly NavItem[];
      columns?: 1 | 2 | 3 | 4;
    }
);
```

**Usage Examples:**
```tsx
// Header navigation (most common)
<Navigation variant="header" showLogo={true} />

// Sidebar navigation for mobile
<Navigation 
  variant="sidebar" 
  items={navItems}
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>

// Footer navigation
<Navigation 
  variant="footer" 
  items={footerLinks}
  columns={3}
/>
```

## 📊 Data Structures

### Project Type

```typescript
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;              // URL - fallbacks handled automatically
  readonly technologies: readonly TechStack[];
  readonly category: ProjectCategory;  // 'web' | 'mobile' | 'design' | 'fullstack' | 'other'
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly featured: boolean;
  readonly completedAt: string;        // ISO date string
}
```

### Testimonial Type

```typescript
export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly content: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;  // Literal union for valid ratings
  readonly avatar: string;             // URL - fallbacks handled automatically
  readonly date: string;               // ISO date string
}
```

### Skill Types

```typescript
export interface Skill {
  readonly name: string;
  readonly level: number;              // 1-100
  readonly category: SkillCategory;    // 'frontend' | 'backend' | 'design' | 'tools' | 'languages'
  readonly icon?: LucideIcon;
}

export type SkillCategory = 'frontend' | 'backend' | 'design' | 'tools' | 'languages';
```

### Navigation Item

```typescript
export interface NavItem {
  readonly name: string;
  readonly href: string;
  readonly icon?: LucideIcon;
  readonly external?: boolean;
}
```

## 🎨 Theming & Customization

### CSS Custom Properties

The template uses CSS custom properties for theming. Update these in `src/app/globals.css`:

```css
:root {
  /* Primary colors */
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;
  
  /* Secondary colors */
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  
  /* Background colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  /* UI colors */
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  
  /* Border and input */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 262.1 83.3% 57.8%;
  
  /* Destructive (error) colors */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
}

.dark {
  /* Dark theme overrides */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... other dark theme colors */
}
```

### Component Styling

Components can be styled using:

1. **Tailwind Classes**: Direct utility classes
2. **CSS Custom Properties**: Theme-aware colors
3. **Conditional Classes**: Using `cn()` utility

```tsx
<div className={cn(
  'bg-background text-foreground',
  'border border-border rounded-lg p-4',
  isActive && 'bg-accent text-accent-foreground',
  className
)} />
```

## 🔒 Error Handling Best Practices

### Where to Use Error Boundaries

1. **Page Level**: Wrap entire pages to prevent white screens
2. **Section Level**: Isolate major page sections  
3. **Component Level**: Protect critical or data-dependent components
4. **Async Operations**: Wrap components that perform async operations

### Error Boundary Hierarchy

```tsx
<PageErrorBoundary>                    // Top level - prevents white screen
  <Layout>
    <SectionErrorBoundary>             // Section level - isolates failures
      <Header />
      <ComponentErrorBoundary>         // Component level - specific protection
        <UserProfile />
      </ComponentErrorBoundary>
      <AsyncErrorBoundary>             // Async operations
        <DataFetchingComponent />
      </AsyncErrorBoundary>
    </SectionErrorBoundary>
  </Layout>
</PageErrorBoundary>
```

### Custom Error Handling

```tsx
const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
  // Log to external service
  console.error('Component error:', error);
  
  // Track in analytics
  analytics.track('error_boundary_triggered', {
    error: error.message,
    componentStack: errorInfo.componentStack
  });
};

<ErrorBoundary onError={handleError}>
  <YourComponent />
</ErrorBoundary>
```

## 📱 Responsive Design

### Breakpoints

```css
/* Tailwind CSS breakpoints */
sm: 640px    /* Small devices and up */
md: 768px    /* Medium devices and up */
lg: 1024px   /* Large devices and up */
xl: 1280px   /* Extra large devices and up */
2xl: 1536px  /* 2X large devices and up */
```

### Responsive Components

Components automatically adapt to screen sizes:

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Responsive text
<h1 className="text-2xl md:text-4xl lg:text-6xl">

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
```

## 🚀 Performance Optimization

### Image Optimization

- **Automatic fallbacks** prevent loading failures
- **Next.js Image component** for optimization
- **Lazy loading** for off-screen images
- **WebP/AVIF support** where available

### Code Splitting

- **Component-level splitting** with `React.lazy()`
- **Route-based splitting** with App Router
- **Error boundary isolation** prevents cascade failures

### Bundle Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze  # If analyze script is configured
```

## 🧪 Testing

### Demo Page

Visit `/demo` to test:
- Error boundary behavior
- Image fallback functionality
- Component variants
- Interactive error scenarios

### Manual Testing Checklist

- [ ] Error boundaries catch and display errors
- [ ] Broken images show fallbacks
- [ ] Theme switching works correctly
- [ ] Responsive design on all breakpoints
- [ ] Navigation works on all devices
- [ ] Form validation and submission
- [ ] All component variants render correctly

## 🚀 Deployment Considerations

### Environment Variables

```env
# Optional - for contact form
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Optional - for analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Build Configuration

The template is optimized for various deployment platforms:

```javascript
// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  // For static exports (Netlify, GitHub Pages)
  output: process.env.BUILD_STANDALONE ? 'export' : undefined,
  
  // Image optimization
  images: {
    domains: ['api.dicebear.com', 'picsum.photos'],
    unoptimized: process.env.BUILD_STANDALONE === 'true'
  }
};
```

### Error Monitoring

Consider integrating error monitoring services:

```tsx
import * as Sentry from '@sentry/nextjs';

const errorHandler = (error: Error, errorInfo: React.ErrorInfo) => {
  Sentry.captureException(error, { 
    contexts: { react: errorInfo } 
  });
};
```

---

This documentation covers the enhanced portfolio template with error boundaries, smart image handling, and discriminated union types. For quick setup, see [QUICKSTART.md](QUICKSTART.md). For implementation details, see [ERROR_BOUNDARIES_IMPLEMENTATION.md](ERROR_BOUNDARIES_IMPLEMENTATION.md) and [STRICT_TYPING.md](STRICT_TYPING.md).
