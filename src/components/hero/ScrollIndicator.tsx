import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useSmoothScroll } from "@/hooks";

export function ScrollIndicator() {
  const { scrollToElement } = useSmoothScroll();

  const handleScroll = () => {
    scrollToElement("projects");
  };

  return (
    <motion.button
      onClick={handleScroll}
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
  );
}
