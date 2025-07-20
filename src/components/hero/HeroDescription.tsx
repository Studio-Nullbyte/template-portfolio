import { motion } from "framer-motion";

interface HeroDescriptionProps {
  description: string;
}

export function HeroDescription({ description }: HeroDescriptionProps) {
  return (
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
  );
}
