# Portfolio Website Template

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwind-css)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[![CI/CD](https://github.com/Studio-Nullbyte/template-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Studio-Nullbyte/template-portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/Studio-Nullbyte/template-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Studio-Nullbyte/template-portfolio/actions/workflows/deploy.yml)

**A modern, responsive portfolio website template built with Next.js, TypeScript, and Tailwind CSS.**

[View Demo](https://template-portfolio-demo.vercel.app) • 
[Getting Started](#-quick-start) • 
[Documentation](DOCS.md) • 
[Quick Start Guide](QUICKSTART.md)

</div>

## 📸 Preview

<div align="center">
  <img src="https://via.placeholder.com/800x400/262626/ffffff?text=Desktop+Preview" alt="Desktop Preview" width="800"/>
  <br/>
  <img src="https://via.placeholder.com/300x600/262626/ffffff?text=Mobile+Preview" alt="Mobile Preview" width="300"/>
</div>

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Toggle between dark and light modes with system preference detection
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized with Next.js 15 and modern web standards
- **SEO Ready**: Built-in SEO optimization with proper meta tags
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Type Safe**: Full TypeScript support with discriminated unions for better development experience
- **Error Boundaries**: Comprehensive error handling system with graceful fallbacks
- **Image Reliability**: Smart image loading with automatic fallbacks for broken URLs
- **Demo Page**: Interactive demo page to test error boundaries and image components (`/demo`)

## 🛡️ Error Handling & Reliability

This template includes a robust error handling system:

- **Multi-Level Protection**: Page, section, and component-level error boundaries
- **Graceful Degradation**: Errors in one component don't crash the entire application
- **Smart Image Loading**: Automatic fallbacks for broken images using reliable image services
- **Development Feedback**: Clear error information in development mode
- **Production Ready**: User-friendly error messages in production

## 🖼️ Image Management

- **SafeImage Component**: Automatic fallback handling for broken images
- **Avatar Component**: Specialized for user profile images with DiceBear API integration
- **ProjectImage Component**: Optimized for project screenshots with placeholder generation
- **Reliable Services**: Uses DiceBear and Picsum for consistent fallback images

## 🛠️ Built With

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Headless UI](https://headlessui.com/)
- **Utilities**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Image Services**: [DiceBear API](https://dicebear.com/), [Picsum](https://picsum.photos/)
- **Error Handling**: Custom React Error Boundaries with TypeScript discriminated unions

## 🚀 Quick Start

### Option 1: Use as Template (Recommended)

1. Click the **"Use this template"** button at the top of this repository
2. Create a new repository from this template
3. Clone your new repository:
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### Option 2: Fork or Clone

```bash
# Fork this repository, then clone your fork
git clone https://github.com/YOUR_USERNAME/template-portfolio.git
cd template-portfolio

# Or clone directly (for contribution)
git clone https://github.com/Studio-Nullbyte/template-portfolio.git
cd template-portfolio
```

### Installation & Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📖 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Full Documentation](DOCS.md)** - Complete API and customization guide
- **[Contributing](CONTRIBUTING.md)** - How to contribute to this project

## 🛠️ Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── projects/         # Projects page
│   ├── demo/             # Error boundaries & image demo page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with error boundaries
│   └── page.tsx          # Home page
├── components/           # Reusable React components
│   ├── error-boundaries/ # Error boundary components
│   │   ├── ErrorBoundary.tsx       # Main error boundary
│   │   └── SpecificErrorBoundaries.tsx  # Specialized boundaries
│   ├── ui/              # UI components
│   │   └── SafeImage.tsx # Image components with fallbacks
│   ├── navigation/      # Navigation components
│   ├── footer.tsx       # Footer component
│   ├── hero.tsx         # Hero section with variants
│   ├── navigation.tsx   # Navigation bar
│   ├── projects-section.tsx  # Projects showcase
│   ├── theme-provider.tsx    # Theme context provider
│   └── theme-toggle.tsx      # Dark/light mode toggle
├── data/                # Static data
│   └── projects.ts      # Project information
├── lib/                 # Utility functions
│   └── utils.ts         # Helper functions & image utilities
└── types/               # TypeScript type definitions
    └── index.ts         # Discriminated unions & common types
```

## 🎨 Customization

### Colors and Theme

The color scheme is defined in `tailwind.config.ts` and `src/app/globals.css`. You can customize the colors by modifying the CSS custom properties:

```css
:root {
  --primary: 262.1 83.3% 57.8%;    /* Primary color */
  --secondary: 210 40% 96%;        /* Secondary color */
  --background: 0 0% 100%;         /* Background color */
  --foreground: 222.2 84% 4.9%;    /* Text color */
  /* ... more colors */
}
```

### Content

1. **Personal Information**: Update the name, title, and bio in:
   - `src/components/hero.tsx`
   - `src/app/about/page.tsx`
   - `src/components/footer.tsx`

2. **Projects**: Modify the projects array in:
   - `src/components/projects-section.tsx`
   - `src/app/projects/page.tsx`

3. **Contact Information**: Update contact details in:
   - `src/app/contact/page.tsx`
   - `src/components/footer.tsx`

4. **Skills and Experience**: Edit the data in:
   - `src/app/about/page.tsx`

## 🎨 Customization

### Colors and Theme

The color scheme is defined in `tailwind.config.ts` and `src/app/globals.css`. You can customize the colors by modifying the CSS custom properties:

```css
:root {
  --primary: 262.1 83.3% 57.8%;    /* Primary color */
  --secondary: 210 40% 96%;        /* Secondary color */
  --background: 0 0% 100%;         /* Background color */
  --foreground: 222.2 84% 4.9%;    /* Text color */
  /* ... more colors */
}
```

### Content

1. **Personal Information**: Update the name, title, and bio in:
   - `src/components/hero.tsx` (defaultProps object)
   - `src/app/about/page.tsx`
   - `src/components/footer.tsx`

2. **Projects**: Modify the projects array in:
   - `src/data/projects.ts`

3. **Contact Information**: Update contact details in:
   - `src/app/contact/page.tsx`
   - `src/components/footer.tsx`

4. **Skills and Experience**: Edit the data in:
   - `src/app/about/page.tsx`

### Using Component Variants

This template uses TypeScript discriminated unions for type-safe component variants:

```tsx
// Hero component variants
<Hero variant="default" />                    // Full hero with all features
<Hero variant="minimal" name="John" title="Developer" />  // Minimal hero
<Hero variant="custom">                       // Custom hero with children
  <CustomContent />
</Hero>

// Skills section variants
<SkillsSection variant="categories" />        // Grouped by categories
<SkillsSection variant="grid" />             // Grid layout
<SkillsSection variant="list" />             // List layout

// Testimonials variants
<TestimonialsSection variant="carousel" />   // Carousel display
<TestimonialsSection variant="grid" />       // Grid display
```

### Error Boundaries

Wrap components for error isolation:

```tsx
import { PageErrorBoundary, SectionErrorBoundary, ComponentErrorBoundary } from '@/components/error-boundaries';

// Page level protection
<PageErrorBoundary>
  <YourPage />
</PageErrorBoundary>

// Section level protection
<SectionErrorBoundary sectionName="Projects">
  <ProjectsSection />
</SectionErrorBoundary>

// Component level protection
<ComponentErrorBoundary componentName="User Avatar">
  <Avatar src={user.avatar} name={user.name} />
</ComponentErrorBoundary>
```

### Safe Image Components

Use the provided image components for reliable image loading:

```tsx
import { SafeImage, Avatar, ProjectImage } from '@/components/ui/SafeImage';

// Safe image with automatic fallbacks
<SafeImage
  src="https://example.com/image.jpg"
  alt="Description"
  width={400}
  height={300}
  fallbackType="placeholder"
/>

// Avatar with automatic generation
<Avatar
  src={user.avatarUrl}     // Optional - will generate if missing
  name={user.name}         // Used for fallback generation
  size={64}
/>

// Project image with project-specific fallbacks
<ProjectImage
  src={project.imageUrl}
  title={project.title}
  width={600}
  height={400}
/>
```

### Images

The template includes smart image handling:
- **Automatic Fallbacks**: Broken images are replaced with generated alternatives
- **Reliable Services**: Uses DiceBear for avatars and Picsum for placeholders
- **Utility Functions**: Helper functions in `src/lib/utils.ts` for image generation

## 📱 Pages

- **Home** (`/`): Hero section with introduction and featured projects
- **About** (`/about`): Personal information, skills, and experience
- **Projects** (`/projects`): Complete portfolio with filtering
- **Contact** (`/contact`): Contact form and information
- **Demo** (`/demo`): Interactive demo for testing error boundaries and image components

## 🌟 Key Features Details

### Error Boundaries
- Multi-level error isolation (Page, Section, Component)
- Graceful degradation with user-friendly error messages
- Development vs production error display
- Retry functionality for recoverable errors

### Image Reliability
- Automatic fallback for broken images
- DiceBear API integration for consistent avatars
- Picsum service for reliable placeholder images
- Smart image components with error handling

### Type Safety
- Discriminated unions for component variants
- Strict TypeScript typing throughout
- Type-safe form handling
- Compile-time error prevention

### Theme Switching
- Automatic system preference detection
- Manual toggle with smooth transitions
- Persistent theme selection

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized layouts for all screen sizes

### Animations
- Smooth page transitions
- Scroll-triggered animations
- Hover effects and micro-interactions
- Respects user's motion preferences

### Performance
- Next.js Image optimization
- Code splitting and lazy loading
- Minimal bundle size
- Fast loading times
- Error boundary isolation prevents cascading failures

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## � Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Error Boundaries Implementation](ERROR_BOUNDARIES_IMPLEMENTATION.md)** - Comprehensive error handling guide
- **[Strict Typing Guide](STRICT_TYPING.md)** - TypeScript discriminated unions and type safety
- **[Full Documentation](DOCS.md)** - Complete API and customization guide
- **[Contributing](CONTRIBUTING.md)** - How to contribute to this project

## 🧪 Testing

Visit `/demo` in your browser to test:
- Error boundary functionality with controllable error states
- Image component behavior with working and broken URLs
- Different component variants and error scenarios

## �📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the template, please open an issue or contact me.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

**Key Implementation Highlights:**
- 🛡️ **Robust Error Handling**: Comprehensive error boundary system
- 🖼️ **Smart Image Loading**: Automatic fallbacks for reliability
- 🎯 **Type Safety**: Discriminated unions for compile-time correctness
- 🎨 **Modern Design**: Professional UI with smooth animations
- 📱 **Responsive**: Mobile-first design approach
- ⚡ **Performance**: Optimized for speed and reliability
