import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  text?: string;
}

export function Logo({ className, text = "Portfolio" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-bold text-foreground hover:text-primary transition-colors",
        className
      )}
    >
      {text}
    </Link>
  );
}
