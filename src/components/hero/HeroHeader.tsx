import { motion } from "framer-motion";

interface HeroHeaderProps {
  name: string;
  title: string;
}

export function HeroHeader({ name, title }: HeroHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground">
        Hi, I&apos;m{" "}
        <span className="text-primary">{name}</span>
      </h1>
      <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
        {title}
      </p>
    </motion.div>
  );
}
