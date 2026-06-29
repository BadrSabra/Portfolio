import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-card/30 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Live Products" 
          subtitle="Three self-built, fully deployed web applications solving real problems."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
