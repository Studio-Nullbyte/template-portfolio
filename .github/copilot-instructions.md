```instructions
When performing a code review, validate that there are changes in the `README.md` file that match the changes in the pull request. If there are no changes, or if the changes do not match, then the pull request is not ready to be merged.

When performing a code review, ensure that the values in the front matter are wrapped in single quotes.

When performing a code review, ensure that the `description` field in the front matter is not empty.

When performing a code review on a `.instructions.md` file, ensure there is an `applyTo` property in the front matter that specifies the file or files to which the instructions apply.
```

# Portfolio Website Template Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js portfolio website template built with:
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theme**: Dark/Light mode with next-themes
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Headless UI

## Code Standards

### Component Structure
- Use functional components with TypeScript
- Implement proper prop types with interfaces
- Follow the composition pattern for reusable components
- Use custom hooks for shared logic

### Styling Guidelines
- Use Tailwind CSS classes for styling
- Implement responsive design with mobile-first approach
- Use CSS variables for theme-aware colors
- Combine classes with `clsx` and `tailwind-merge` utilities

### Theme Implementation
- Use `next-themes` for theme switching
- Support system preference detection
- Implement proper theme-aware color schemes
- Use CSS custom properties for dynamic theming

### Animation Guidelines
- Use Framer Motion for smooth animations
- Implement scroll-triggered animations
- Keep animations subtle and professional
- Ensure animations respect user's motion preferences

### Portfolio Features
- Create sections for projects, about, contact, and skills
- Implement project filtering and categorization
- Support multiple project types (web, mobile, design)
- Include project details with technologies used

### Performance
- Optimize images with Next.js Image component
- Implement lazy loading for heavy content
- Use dynamic imports for code splitting
- Follow Next.js best practices for SEO

### Accessibility
- Ensure proper semantic HTML structure
- Implement keyboard navigation
- Include proper ARIA labels
- Support screen readers
- Maintain good color contrast ratios

### File Organization
- Components in `/src/components/` with descriptive names
- Pages in `/src/app/` following App Router structure
- Utilities in `/src/lib/` for shared functions
- Types in `/src/types/` for TypeScript definitions
- Styles in global.css and component-specific modules

### Color Scheme
- Professional and creative color palette
- Proper contrast for both light and dark themes
- Consistent use of brand colors throughout
- Theme-aware color utilities in Tailwind config
