import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface HeroStatusProps {
  resumeUrl: string;
}

export function HeroStatus({ resumeUrl }: HeroStatusProps) {
  return (
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
      <a 
        href={resumeUrl}
        download
        className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Download CV</span>
      </a>
    </motion.div>
  );
}
