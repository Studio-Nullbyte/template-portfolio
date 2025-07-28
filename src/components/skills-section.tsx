"use client";

import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Database, Globe, Zap } from "lucide-react";
import type { SkillsSectionProps, SkillCategoryData } from "@/types";

const defaultSkillCategories: SkillCategoryData[] = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
    color: "from-blue-500 to-purple-600",
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    skills: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Prototyping"],
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "Dart", "Swift", "Kotlin", "Expo"],
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Backend & Database",
    icon: Database,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", "Supabase"],
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Web Technologies",
    icon: Globe,
    skills: ["REST APIs", "GraphQL", "WebSockets", "PWA", "SEO", "Performance"],
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Tools & DevOps",
    icon: Zap,
    skills: ["Git", "Docker", "AWS", "Vercel", "Webpack", "Vite", "Tailwind CSS", "Framer Motion", "Testing"],
    color: "from-purple-500 to-indigo-600",
  },
];

export function SkillsSection(props: SkillsSectionProps = { variant: 'categories' }) {
  // Extract common properties
  const { variant = 'categories', title = "Skills & Technologies", description = "A comprehensive overview of the technologies and tools I use to bring ideas to life." } = props;

  // Handle discriminated union properly
  let skills: readonly SkillCategoryData[];

  if (variant === 'categories') {
    const categoriesVariantProps = props as Extract<SkillsSectionProps, { variant: 'categories' }>;
    skills = categoriesVariantProps.skills ?? defaultSkillCategories;
  } else {
    // For other variants, use default skills (this component seems designed for categories variant)
    skills = defaultSkillCategories;
  }
  return (
    <section className="py-16 bg-background" id="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category: SkillCategoryData, index: number) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
