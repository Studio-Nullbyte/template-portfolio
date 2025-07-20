import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// Base Types
export type ProjectCategory = 'web' | 'mobile' | 'design' | 'fullstack' | 'other';
export type SkillCategory = 'frontend' | 'backend' | 'design' | 'tools' | 'languages';
export type ThemeMode = 'light' | 'dark' | 'system';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type FormFieldType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';

// Discriminated Union for Button Props
export type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & (
  | {
      variant: 'primary';
      size?: ButtonSize;
      type?: 'button' | 'submit' | 'reset';
    }
  | {
      variant: 'secondary';
      size?: ButtonSize;
      type?: 'button' | 'submit' | 'reset';
    }
  | {
      variant: 'outline';
      size?: ButtonSize;
      type?: 'button' | 'submit' | 'reset';
    }
  | {
      variant: 'ghost';
      size?: ButtonSize;
      type?: 'button' | 'submit' | 'reset';
    }
  | {
      variant: 'destructive';
      size?: ButtonSize;
      type?: 'button' | 'submit' | 'reset';
      confirmText?: string;
    }
);

// Discriminated Union for Form Field Props
export type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  'aria-describedby'?: string;
} & (
  | {
      type: 'text' | 'email' | 'password' | 'tel' | 'url';
      multiline?: false;
      maxLength?: number;
      pattern?: string;
    }
  | {
      type: 'number';
      multiline?: false;
      min?: number;
      max?: number;
      step?: number;
    }
  | {
      type: 'textarea';
      multiline: true;
      rows?: number;
      cols?: number;
      maxLength?: number;
    }
);

// Strict Project Interface
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription?: string;
  readonly image: string;
  readonly images?: readonly string[];
  readonly technologies: readonly string[];
  readonly category: ProjectCategory;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly featured: boolean;
  readonly completedAt: string; // ISO date string
}

// Strict Skill Interface
export interface Skill {
  readonly name: string;
  readonly level: number; // 1-100
  readonly category: SkillCategory;
  readonly icon?: string;
  readonly description?: string;
}

export interface SkillCategoryData {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly skills: readonly string[];
  readonly color: string;
  readonly description?: string;
}

// Strict Experience Interface
export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly position: string;
  readonly duration: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly current: boolean;
  readonly startDate: string; // ISO date string
  readonly endDate?: string; // ISO date string
}

// Strict Contact Form Interface
export interface ContactForm {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

// Validation Error Types
export type ValidationError = {
  readonly field: keyof ContactForm;
  readonly message: string;
  readonly code: 'required' | 'invalid_format' | 'too_short' | 'too_long';
};

export type FormValidationResult = {
  readonly isValid: boolean;
  readonly errors: readonly ValidationError[];
};

// Strict Contact Info Interface
export interface ContactInfo {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly type: 'email' | 'phone' | 'location' | 'website';
}

// Strict Navigation Interface
export interface NavItem {
  readonly name: string;
  readonly href: string;
  readonly icon?: LucideIcon;
  readonly external?: boolean;
  readonly badge?: string;
}

// Strict Social Link Interface
export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: LucideIcon;
  readonly handle?: string;
}

// Strict Testimonial Interface
export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly content: string;
  readonly rating: 1 | 2 | 3 | 4 | 5; // Literal union for valid ratings
  readonly avatar: string;
  readonly date: string; // ISO date string
}

// ==========================================
// COMPONENT PROPS INTERFACES
// ==========================================

// Hero Component Props with Discriminated Union
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

// Navigation Props with Discriminated Union
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

// Theme Toggle Props with Strict Sizing
export interface ThemeToggleProps {
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
  readonly ariaLabel?: string;
  readonly showLabel?: boolean;
  readonly variant?: 'icon' | 'button' | 'switch';
}

// Footer Props with Configuration Options
export interface FooterProps {
  readonly className?: string;
  readonly showSocials?: boolean;
  readonly copyrightText?: string;
  readonly links?: readonly NavItem[];
  readonly socialLinks?: readonly SocialLink[];
  readonly columns?: 1 | 2 | 3 | 4;
}

// Projects Section Props with Filtering Options
export type ProjectsSectionProps = {
  className?: string;
  title?: string;
  description?: string;
} & (
  | {
      variant: 'grid';
      projects?: readonly Project[];
      showFilter?: boolean;
      itemsPerPage?: number;
      showAll?: boolean;
    }
  | {
      variant: 'carousel';
      projects: readonly Project[];
      autoPlay?: boolean;
      interval?: number;
    }
  | {
      variant: 'featured';
      featuredProjects: readonly Project[];
      maxItems?: number;
    }
);

// Skills Section Props with Layout Variants
export type SkillsSectionProps = {
  className?: string;
  title?: string;
  description?: string;
} & (
  | {
      variant: 'categories';
      skills?: readonly SkillCategoryData[];
      showProgress?: boolean;
    }
  | {
      variant: 'cloud';
      skills: readonly Skill[];
      maxItems?: number;
    }
  | {
      variant: 'list';
      skills: readonly Skill[];
      groupByCategory?: boolean;
    }
);

// Testimonials Section Props with Display Options
export type TestimonialsSectionProps = {
  className?: string;
  title?: string;
  description?: string;
} & (
  | {
      variant: 'grid';
      testimonials?: readonly Testimonial[];
      columns?: 1 | 2 | 3;
    }
  | {
      variant: 'slider';
      testimonials: readonly Testimonial[];
      autoPlay?: boolean;
      showDots?: boolean;
    }
  | {
      variant: 'single';
      testimonial: Testimonial;
      showNavigation?: boolean;
    }
);

// Contact Page Props with Layout Control
export interface ContactPageProps {
  readonly contactInfo?: readonly ContactInfo[];
  readonly socialLinks?: readonly SocialLink[];
  readonly showMap?: boolean;
  readonly mapEmbedUrl?: string;
  readonly layout?: 'split' | 'stacked' | 'centered';
}

// ==========================================
// EVENT HANDLER TYPES
// ==========================================

// Form Event Handlers with Strict Typing
export type FormSubmitHandler<T = ContactForm> = (
  event: React.FormEvent<HTMLFormElement>,
  data: T
) => void | Promise<void>;

export type InputChangeHandler = (
  name: string,
  value: string,
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type ButtonClickHandler = (
  event: React.MouseEvent<HTMLButtonElement>
) => void | Promise<void>;

export type NavigationHandler = (
  item: NavItem,
  event: React.MouseEvent<HTMLAnchorElement>
) => void;

// ==========================================
// HOOK TYPES
// ==========================================

// Form Validation Hook Return Type
export interface UseFormValidationReturn<T> {
  readonly formData: T;
  readonly errors: Partial<Record<keyof T, string>>;
  readonly isSubmitting: boolean;
  readonly isValid: boolean;
  readonly isDirty: boolean;
  readonly touchedFields: Partial<Record<keyof T, boolean>>;
  
  readonly setIsSubmitting: (loading: boolean) => void;
  readonly handleChange: (field: keyof T, value: string) => void;
  readonly handleBlur: (field: keyof T) => void;
  readonly validateForm: () => boolean;
  readonly validateField: (field: keyof T) => boolean;
  readonly resetForm: () => void;
  readonly setFieldError: (field: keyof T, error: string) => void;
  readonly clearFieldError: (field: keyof T) => void;
}

// Project Filter Hook Return Type
export interface UseProjectFilterReturn {
  readonly activeCategory: string;
  readonly filteredProjects: readonly Project[];
  readonly availableCategories: readonly string[];
  readonly setCategory: (category: string) => void;
  readonly resetFilter: () => void;
}

// Modal Hook Return Type
export interface UseModalReturn {
  readonly isOpen: boolean;
  readonly openModal: () => void;
  readonly closeModal: () => void;
  readonly toggleModal: () => void;
}

// Navigation Hook Return Type
export interface UseMobileNavigationReturn {
  readonly isOpen: boolean;
  readonly toggleMenu: () => void;
  readonly closeMenu: () => void;
  readonly openMenu: () => void;
}

// ==========================================
// UTILITY TYPES
// ==========================================

// Generic API Response Type
export type ApiResponse<T> = {
  readonly success: true;
  readonly data: T;
  readonly message?: string;
} | {
  readonly success: false;
  readonly error: string;
  readonly code?: string;
};

// Loading State Type
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Generic Async State Type
export interface AsyncState<T> {
  readonly data: T | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly lastUpdated: Date | null;
}

// Component Ref Types
export type ComponentRef<T = HTMLElement> = React.RefObject<T>;
export type ForwardedRef<T = HTMLElement> = React.ForwardedRef<T>;

// Animation Types compatible with Framer Motion
export interface AnimationVariants {
  readonly hidden: Record<string, string | number>;
  readonly visible: Record<string, string | number>;
  readonly [key: string]: Record<string, string | number>; // Index signature for Framer Motion compatibility
}
