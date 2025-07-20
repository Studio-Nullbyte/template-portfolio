import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

interface NavLinksProps {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function NavLinks({
  items,
  className,
  linkClassName,
  orientation = 'horizontal'
}: NavLinksProps) {
  const pathname = usePathname();

  const containerClasses = cn(
    orientation === 'horizontal'
      ? "flex items-center space-x-8"
      : "flex flex-col space-y-1",
    className
  );

  const defaultLinkClasses = orientation === 'horizontal'
    ? "text-sm font-medium transition-colors hover:text-primary"
    : "block px-3 py-2 rounded-md text-base font-medium transition-colors";

  return (
    <div className={containerClasses}>
      {items.map((item: NavItem) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            defaultLinkClasses,
            pathname === item.href
              ? orientation === 'horizontal'
                ? "text-primary"
                : "text-primary bg-primary/10"
              : orientation === 'horizontal'
                ? "text-muted-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
            linkClassName
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
