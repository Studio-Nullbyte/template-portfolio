import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FooterProps, SocialLink } from "@/types";

const defaultSocialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "Linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: "Twitter",
  },
  {
    name: "Email",
    url: "mailto:contact@example.com",
    icon: "Mail",
  },
];

const iconMap = {
  Github,
  Linkedin,
  Twitter,
  Mail,
} as const;

export function Footer({
  className = "",
  showSocials = true,
  copyrightText
}: FooterProps = {}) {
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} Portfolio. All rights reserved. Built with Next.js & Tailwind CSS.`;

  return (
    <footer className={cn("bg-background border-t", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Portfolio</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A creative web designer and developer passionate about creating
              beautiful, functional, and user-centered digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          {showSocials && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Connect</h3>
              <div className="flex space-x-4">
                {defaultSocialLinks.map((link: SocialLink) => {
                  const Icon = iconMap[link.icon as keyof typeof iconMap];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={link.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-muted-foreground text-sm">
            {copyrightText || defaultCopyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
