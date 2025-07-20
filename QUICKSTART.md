# Portfolio Template - Quick Start Guide

🎉 **Congratulations!** You've successfully set up your portfolio website. This guide will help you customize it to make it truly yours.

## 📋 Quick Customization Checklist

### 1. Update Personal Information

Edit these files to add your personal information:

**`src/components/hero.tsx`** - Update the default values:
```typescript
const defaultProps = {
  name: "Your Name",           // 👈 Change this
  title: "Your Title",         // 👈 Change this  
  description: "Your bio...",  // 👈 Change this
  resumeUrl: "/your-resume.pdf" // 👈 Change this
};
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
    image: "https://your-image-url.jpg",
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

### 3. Update Skills

In `src/types/index.ts`, update the skills data structure and add your skills.

### 4. Customize Colors

In `src/app/globals.css`, update the CSS custom properties:

```css
:root {
  --primary: 262.1 83.3% 57.8%;    /* Your primary color */
  --secondary: 210 40% 96%;        /* Your secondary color */
  /* ... other colors */
}
```

### 5. Add Your Images

- Replace images in the `public/` folder
- Update image URLs in your project data
- Add your profile picture/avatar

### 6. Update Contact Information

If you want a working contact form, sign up for [EmailJS](https://www.emailjs.com/) and add your credentials to `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 7. Set Up Analytics (Optional)

Add Google Analytics by creating `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

Your site will be live at `https://your-project.vercel.app`

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

- 📖 Check the [Documentation](DOCS.md)
- 🐛 [Report a bug](https://github.com/Studio-Nullbyte/template-portfolio/issues)
- 💬 [Start a discussion](https://github.com/Studio-Nullbyte/template-portfolio/discussions)
- ⭐ [Star this repository](https://github.com/Studio-Nullbyte/template-portfolio) if it helped you!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy coding! 🎉** Don't forget to ⭐ star this repository if it helped you create an amazing portfolio!
