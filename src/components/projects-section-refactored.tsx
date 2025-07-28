"use client";

import { motion } from "framer-motion";
import { useProjectFilter } from "@/hooks";
import { CategoryFilter, ProjectGrid, SectionHeader } from "./projects";
import type { ProjectCategory } from "@/types";
import { projects } from "@/data/projects";

const categories: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Design", value: "design" },
];

export function ProjectsSection() {
  const { activeCategory, filteredProjects, setCategory } = useProjectFilter(projects, "all");

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Projects"
          description="Here are some of my recent projects that showcase my skills and passion for creating exceptional digital experiences."
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setCategory}
          />
        </motion.div>

        {/* Projects Grid */}
        <ProjectGrid projects={[...filteredProjects]} />
      </div>
    </section>
  );
}
