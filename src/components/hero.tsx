"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import type { HeroProps } from "@/types";

interface DefaultHeroProps {
  name: string;
  title: string;
  description: string;
  resumeUrl: string;
}

const defaultProps: DefaultHeroProps = {
  name: "Alex Johnson",
  title: "Full Stack Developer & UI/UX Designer",
  description: "Creating beautiful, functional, and user-centered digital experiences with modern technologies and design principles.",
  resumeUrl: "/resume.pdf"
};

export function Hero(props: HeroProps = { variant: 'default' }) {
  // Type guard to ensure we're working with the right variant
  if (props.variant === 'custom') {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {props.children}
        </div>
      </section>
    );
  }

  if (props.variant === 'minimal') {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground">
                Hi, I&apos;m{" "}
                <span className="text-primary">{props.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
                {props.title}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant handling
  const {
    name = defaultProps.name,
    title = defaultProps.title,
    description = defaultProps.description,
    resumeUrl = defaultProps.resumeUrl,
    showActions = true,
    showStatus = true
  } = props;
  const scrollToProjects = (): void => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground">
              Hi, I&apos;m{" "}
              <span className="text-primary">{name}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {title}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>

          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                View My Work
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 px-8"
              >
                Get In Touch
              </Link>
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 px-8"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </motion.div>
          )}

          {showStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center space-x-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available for freelance</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors">
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to projects"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
