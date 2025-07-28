"use client";

import { ThemeToggle } from "./theme-toggle";
import { Logo, NavLinks, MobileMenuButton, MobileMenu } from "./navigation/index";
import { useMobileNavigation, useScrollDetection } from "@/hooks";
import { cn } from "@/lib/utils";
import type { NavigationProps, NavItem } from "@/types";

const defaultNavItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Demo", href: "/demo" },
];

export function Navigation(props: NavigationProps) {
  // Type guard to ensure we're working with header variant
  if (props.variant !== 'header') {
    throw new Error('Navigation component only supports header variant');
  }

  const {
    items = defaultNavItems,
    className = "",
    showLogo = true
  } = props;
  const { isOpen, toggleMenu } = useMobileNavigation();
  const scrolled = useScrollDetection(50);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent",
        className
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {showLogo && <Logo />}

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavLinks items={items} />
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <MobileMenuButton
              isOpen={isOpen}
              onToggle={toggleMenu}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu isOpen={isOpen} items={items} />
      </nav>
    </header>
  );
}
