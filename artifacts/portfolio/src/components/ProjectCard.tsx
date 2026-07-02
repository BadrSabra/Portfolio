import { motion } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";
import { SkillBadge } from "./SkillBadge";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors"
    >
      {project.image && (
        <div className="overflow-hidden h-48 bg-secondary/30">
          <img
            src={import.meta.env.BASE_URL.replace(/\/$/, '') + project.image}
            alt={`${project.name} screenshot`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-4">
              {project.typeBadge}
            </span>
            <h3 className="text-2xl font-heading font-bold group-hover:text-accent transition-colors">
              {project.name}
            </h3>
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-secondary rounded-full text-secondary-foreground hover:bg-accent hover:text-white transition-colors"
            aria-label={`View live site for ${project.name}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="mb-6 flex-1">
          <p className="text-foreground font-medium mb-2">
            {project.shortDescription}
          </p>
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold text-foreground/70">Problem:</span> {project.problem}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech) => (
            <SkillBadge key={tech}>{tech}</SkillBadge>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-border">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            Deep dive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
