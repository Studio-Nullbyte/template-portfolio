import { LucideIcon } from "lucide-react";

export interface Project {
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

export type ProjectCategory = 'web' | 'mobile' | 'design' | 'fullstack' | 'other';

export interface Skill {
  name: string;
  level: number; // 1-100
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'design' | 'tools' | 'languages';

export interface SkillCategoryData {
  title: string;
  icon: LucideIcon;
  skills: string[];
  color: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  current: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

// Component Props Interfaces
export interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
  resumeUrl?: string;
}

export interface SkillsSectionProps {
  skills?: SkillCategoryData[];
  title?: string;
  description?: string;
}

export interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  title?: string;
  description?: string;
}

export interface ThemeToggleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
}

export interface NavigationProps {
  items?: NavItem[];
  className?: string;
  showLogo?: boolean;
}

export interface FooterProps {
  className?: string;
  showSocials?: boolean;
  copyrightText?: string;
}

export interface ProjectsSectionProps {
  projects?: Project[];
  title?: string;
  description?: string;
  showAll?: boolean;
}

export interface ContactPageProps {
  contactInfo?: ContactInfo[];
  socialLinks?: SocialLink[];
}

// Form Event Types
export type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
export type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

// Animation Types
export interface AnimationVariants {
  hidden: Record<string, string | number>;
  visible: Record<string, string | number>;
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';
