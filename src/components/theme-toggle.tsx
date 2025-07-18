"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ThemeToggleProps } from "@/types";

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10", 
  lg: "h-12 w-12"
} as const;

const iconSizes = {
  sm: "h-[1rem] w-[1rem]",
  md: "h-[1.2rem] w-[1.2rem]",
  lg: "h-[1.4rem] w-[1.4rem]"
} as const;

export function ThemeToggle({ 
  size = "md", 
  className = "",
  ariaLabel = "Toggle theme"
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <button 
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent hover:bg-accent hover:text-accent-foreground",
          sizeClasses[size],
          className
        )}
        disabled
        aria-label="Loading theme toggle"
      >
        <div className={iconSizes[size]} />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent hover:bg-accent hover:text-accent-foreground",
        sizeClasses[size],
        className
      )}
      aria-label={ariaLabel}
    >
      <Sun className={cn(iconSizes[size], "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0")} />
      <Moon className={cn("absolute", iconSizes[size], "rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100")} />
    </button>
  );
}
