import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SectionErrorBoundary } from "@/components/error-boundaries";

export default function Home() {
  return (
    <div className="pt-16">
      <SectionErrorBoundary sectionName="Hero Section">
        <Hero variant="default" />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Skills Section">
        <SkillsSection variant="categories" />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Projects Section">
        <ProjectsSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Testimonials Section">
        <TestimonialsSection variant="grid" />
      </SectionErrorBoundary>
    </div>
  );
}
