import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";
import { useSmoothScroll } from "@/hooks";

interface HeroActionsProps {
  resumeUrl: string;
}

export function HeroActions({ resumeUrl }: HeroActionsProps) {
  const { scrollToElement } = useSmoothScroll();

  const handleViewWork = () => {
    scrollToElement("projects");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <button
        onClick={handleViewWork}
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
  );
}
