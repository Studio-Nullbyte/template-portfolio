import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />
    </div>
  );
}
