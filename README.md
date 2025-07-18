# Portfolio Website Template

A modern, responsive portfolio website template built with Next.js, TypeScript, and Tailwind CSS. Perfect for web designers, developers, and creative professionals to showcase their work and skills.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Toggle between dark and light modes with system preference detection
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized with Next.js 15 and modern web standards
- **SEO Ready**: Built-in SEO optimization with proper meta tags
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Type Safe**: Full TypeScript support for better development experience

## 🛠️ Built With

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Headless UI](https://headlessui.com/)
- **Utilities**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd template-portfolio-workspace
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── projects/         # Projects page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable React components
│   ├── footer.tsx        # Footer component
│   ├── hero.tsx          # Hero section
│   ├── navigation.tsx    # Navigation bar
│   ├── projects-section.tsx  # Projects showcase
│   ├── theme-provider.tsx    # Theme context provider
│   └── theme-toggle.tsx      # Dark/light mode toggle
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
    └── index.ts          # Common types
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

### Images

Replace placeholder images with your own:
- Add images to the `public` folder
- Update image paths in the components
- Use Next.js Image component for optimization

## 📱 Pages

- **Home** (`/`): Hero section with introduction and featured projects
- **About** (`/about`): Personal information, skills, and experience
- **Projects** (`/projects`): Complete portfolio with filtering
- **Contact** (`/contact`): Contact form and information

## 🌟 Key Features Details

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the template, please open an issue or contact me.

---

Built with ❤️ using Next.js and Tailwind CSS

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
