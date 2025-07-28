"use client";

import { HeroHeader, HeroDescription, HeroActions, HeroStatus, ScrollIndicator } from "./hero/index";
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

export function Hero({
  name = defaultProps.name,
  title = defaultProps.title,
  description = defaultProps.description,
  resumeUrl = defaultProps.resumeUrl
}: HeroProps = {}) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <HeroHeader name={name} title={title} />
          <HeroDescription description={description} />
          <HeroActions resumeUrl={resumeUrl} />
          <HeroStatus resumeUrl={resumeUrl} />
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
