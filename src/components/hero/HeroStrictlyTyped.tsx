import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  HeroProps,
  ForwardedRef,
  AnimationVariants,
  ButtonClickHandler
} from '@/types';

// Strict animation variants for different hero types
const heroAnimations: Record<string, AnimationVariants> = {
  default: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  minimal: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;

// Component using discriminated union for props
export const HeroStrictlyTyped = forwardRef<HTMLElement, HeroProps>(
  (props, ref: ForwardedRef<HTMLElement>) => {
    const { className } = props;

    // Type-safe handlers
    const handleViewWork: ButtonClickHandler = (event) => {
      event.preventDefault();
      const projectsSection = document.getElementById('projects');
      projectsSection?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDownloadResume = (url: string): ButtonClickHandler => (event) => {
      event.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Render based on discriminated union variant
    switch (props.variant) {
      case 'default': {
        const {
          name = 'Alex Johnson',
          title = 'Full Stack Developer',
          description = 'Creating amazing digital experiences.',
          resumeUrl = '/resume.pdf',
          showActions = true,
          showStatus = true,
        } = props;

        return (
          <section
            ref={ref}
            className={cn(
              'min-h-screen flex items-center justify-center relative overflow-hidden',
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center space-y-8">
                <motion.div
                  variants={heroAnimations.default}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground">
                    Hi, I&apos;m{' '}
                    <span className="text-primary">{name}</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
                    {title}
                  </p>
                </motion.div>

                <motion.div
                  variants={heroAnimations.default}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {description}
                  </p>
                </motion.div>

                {showActions && (
                  <motion.div
                    variants={heroAnimations.default}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                    <button
                      onClick={handleViewWork}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors"
                    >
                      View My Work
                    </button>
                    <button
                      onClick={handleDownloadResume(resumeUrl)}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-8 py-3 rounded-md font-medium transition-colors"
                    >
                      Download Resume
                    </button>
                  </motion.div>
                )}

                {showStatus && (
                  <motion.div
                    variants={heroAnimations.default}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center justify-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-muted-foreground">
                      Available for freelance
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        );
      }

      case 'minimal': {
        const { name, title } = props;

        return (
          <section
            ref={ref}
            className={cn(
              'min-h-screen flex items-center justify-center',
              className
            )}
          >
            <motion.div
              variants={heroAnimations.minimal}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <h1 className="text-5xl font-bold text-foreground">
                {name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {title}
              </p>
            </motion.div>
          </section>
        );
      }

      case 'custom': {
        return (
          <section
            ref={ref}
            className={cn('min-h-screen flex items-center justify-center', className)}
          >
            {props.children}
          </section>
        );
      }

      default: {
        // TypeScript exhaustive check - this ensures we handle all variants
        const _exhaustiveCheck: never = props;
        return null;
      }
    }
  }
);

HeroStrictlyTyped.displayName = 'HeroStrictlyTyped';
