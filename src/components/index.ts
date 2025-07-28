// Core components
export { Navigation } from "./navigation";
export { Footer } from "./footer";
export { Hero } from "./hero";
export { ProjectsSection } from "./projects-section";
export { SkillsSection } from "./skills-section";
export { TestimonialsSection } from "./testimonials-section";
export { ThemeProvider } from "./theme-provider";
export { ThemeToggle } from "./theme-toggle";

// Error boundaries
export {
  ErrorBoundary,
  PageErrorBoundary,
  SectionErrorBoundary,
  ComponentErrorBoundary,
  AsyncErrorBoundary,
  withErrorBoundary,
  useErrorHandler,
  useErrorBoundaryContext
} from "./error-boundaries";

// UI components
export { SafeImage, Avatar, ProjectImage } from './ui/SafeImage';
export { default as ProjectGallery } from './project-gallery';
