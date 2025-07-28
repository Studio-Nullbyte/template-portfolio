# Portfolio Template - Quick Start Guide

🎉 **Congratulations!** You've successfully set up your portfolio website. This guide will help you customize it to make it truly yours.

## 📋 Quick Customization Checklist

### 1. Update Personal Information

Edit these files to add your personal information:

# Portfolio Template - Quick Start Guide

🎉 **Congratulations!** You've successfully set up your portfolio website. This guide will help you customize it to make it truly yours.

## 📋 Quick Customization Checklist

### 1. Update Personal Information

Edit these files to add your personal information:

**`src/components/hero.tsx`** - Update the default values:
```typescript
const defaultProps: DefaultHeroProps = {
  name: "Your Name",           // 👈 Change this
  title: "Your Title",         // 👈 Change this  
  description: "Your bio...",  // 👈 Change this
  resumeUrl: "/your-resume.pdf" // 👈 Change this
};
```

**Important**: The Hero component now uses discriminated unions. Use it like this:
```tsx
<Hero variant="default" />  // Full hero with all features
<Hero variant="minimal" name="Your Name" title="Your Title" />  // Minimal version
```

**`src/app/layout.tsx`** - Update metadata:
```typescript
export const metadata: Metadata = {
  title: "Your Name - Portfolio",        // 👈 Change this
  description: "Your description...",    // 👈 Change this
  authors: [{ name: "Your Name" }],     // 👈 Change this
  // ... update other metadata
};
```

### 2. Add Your Projects

Edit `src/data/projects.ts` and replace the example projects with your own:

```typescript
export const projects: Project[] = [
  {
    id: "1",
    title: "Your Project Title",
    description: "Brief description of your project",
    image: "https://your-image-url.jpg",  // Don't worry if image breaks - automatic fallbacks!
    technologies: ["React", "TypeScript", "etc"],
    category: "web", // or "mobile", "design", "fullstack"
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/you/your-project",
    featured: true,
    completedAt: "2024-01-15",
  },
  // Add more projects...
];
```

**💡 Pro Tip**: Don't worry about broken image URLs! The template includes smart image components that automatically provide fallbacks using reliable image services.

### 3. Update Skills

In `src/app/about/page.tsx`, update the skills array with your technologies:

```typescript
const skills = [
  { name: "React/Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Your Technology", level: 85 },
  // Add your skills...
];
```

### 4. Use Component Variants

This template uses TypeScript discriminated unions for type-safe components:

```tsx
// Skills section variants
<SkillsSection variant="categories" />  // Grouped by categories
<SkillsSection variant="grid" />       // Grid layout
<SkillsSection variant="list" />       // List layout

// Testimonials variants
<TestimonialsSection variant="carousel" />  // Carousel display
<TestimonialsSection variant="grid" />     // Grid display
```

### 4. Customize Colors

In `src/app/globals.css`, update the CSS custom properties:

```css
:root {
  --primary: 262.1 83.3% 57.8%;    /* Your primary color */
  --secondary: 210 40% 96%;        /* Your secondary color */
  /* ... other colors */
}
```

### 5. Smart Image Components

The template includes intelligent image components that handle broken URLs automatically:

```tsx
import { SafeImage, Avatar, ProjectImage } from '@/components/ui/SafeImage';

// Safe image with automatic fallbacks
<SafeImage
  src="https://might-be-broken.com/image.jpg"
  alt="Description"
  width={400}
  height={300}
  fallbackType="placeholder"  // or "avatar"
/>

// Avatar component (perfect for testimonials, team members)
<Avatar
  src={user.avatarUrl}     // Optional - generates avatar if missing
  name={user.name}         // Used for consistent fallback generation
  size={64}
/>

// Project images with smart fallbacks
<ProjectImage
  src={project.imageUrl}
  title={project.title}    // Used for fallback generation
  width={600}
  height={400}
/>
```

### 6. Error Boundaries (Already Included!)

Your template comes with comprehensive error handling. Components are automatically protected:

```tsx
// Already implemented in layout.tsx and pages
<PageErrorBoundary>        // Protects entire pages
  <SectionErrorBoundary>   // Protects page sections  
    <ComponentErrorBoundary> // Protects individual components
      <YourComponent />
    </ComponentErrorBoundary>
  </SectionErrorBoundary>
</PageErrorBoundary>
```

**🧪 Test It**: Visit `/demo` to see error boundaries and image components in action!

### 7. Update Contact Information

Update contact details in `src/app/contact/page.tsx`:

```typescript
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "your@email.com",        // 👈 Change this
    href: "mailto:your@email.com",  // 👈 Change this
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",     // 👈 Change this
    href: "tel:+15551234567",       // 👈 Change this
  },
  // ... more contact info
];
```

If you want a working contact form, sign up for [EmailJS](https://www.emailjs.com/) and add your credentials to `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 8. Set Up Analytics (Optional)

Add Google Analytics by creating `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🧪 Testing Your Setup

### Demo Page
Visit `http://localhost:3000/demo` to test:
- Error boundary functionality
- Image fallback behavior  
- Component variants
- Interactive error scenarios

### Type Safety
The template uses discriminated unions. TypeScript will guide you:
```tsx
// ✅ Valid
<Hero variant="default" />
<Hero variant="minimal" name="John" title="Developer" />

// ❌ Invalid - TypeScript will catch this
<Hero variant="minimal" />  // Missing required props

// ✅ Valid with all image components
<SafeImage src="any-url" alt="description" width={400} height={300} />
<Avatar name="John Doe" />  // Automatic avatar generation
<ProjectImage src="project-url" title="My Project" />
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard (if using EmailJS)
5. Deploy!

Your site will be live at `https://your-project.vercel.app`

**✨ Benefits of this template for deployment:**
- Error boundaries prevent deployment crashes
- Image fallbacks ensure no broken images in production
- Type safety catches errors before deployment
- Optimized performance with Next.js 15

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `out`
3. Add this to `next.config.js`:

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

## 📱 Social Media Links

Update social media links in the navigation and footer components:

**`src/components/navigation.tsx`**
**`src/components/footer.tsx`**

## 🔧 Advanced Customization

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Update navigation links

### Adding a Blog

Consider integrating with:
- [Sanity](https://www.sanity.io/) - Headless CMS
- [Contentful](https://www.contentful.com/) - Content management
- [MDX](https://mdxjs.com/) - Markdown with React components

### Adding Authentication

For admin features, consider:
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Clerk](https://clerk.dev/) - User management

## 🆘 Need Help?

- 📖 Check the [Main Documentation](README.md)
- 🛡️ [Error Boundaries Guide](ERROR_BOUNDARIES_IMPLEMENTATION.md) - Comprehensive error handling
- 🎯 [TypeScript Guide](STRICT_TYPING.md) - Discriminated unions and type safety
- 🧪 **Test the demo**: Visit `/demo` in your browser
- 🐛 [Report a bug](https://github.com/Studio-Nullbyte/template-portfolio/issues)
- 💬 [Start a discussion](https://github.com/Studio-Nullbyte/template-portfolio/discussions)
- ⭐ [Star this repository](https://github.com/Studio-Nullbyte/template-portfolio) if it helped you!

## 🎯 Key Features You Get

✅ **Error Boundaries**: Your app won't crash when components fail  
✅ **Smart Images**: Broken images automatically get fallbacks  
✅ **Type Safety**: Discriminated unions prevent runtime errors  
✅ **Performance**: Next.js 15 optimization out of the box  
✅ **Responsive**: Mobile-first design that works everywhere  
✅ **Accessible**: WCAG compliant with proper ARIA labels  
✅ **SEO Ready**: Optimized meta tags and performance  

---

**Happy coding! 🎉** Don't forget to ⭐ star this repository if it helped you create an amazing portfolio!
