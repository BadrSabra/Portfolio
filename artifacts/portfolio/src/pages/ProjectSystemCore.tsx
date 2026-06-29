import { useLocation, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { SkillBadge } from "@/components/SkillBadge";
import { projects } from "@/data/projects";
import { ExternalLink, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./not-found";

export default function ProjectSystemCore() {
  const project = projects.find(p => p.slug === "system-core");
  
  if (!project) return <NotFound />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-8 flex items-center text-sm text-muted-foreground font-mono">
            <a href="/" className="hover:text-foreground transition-colors">Portfolio</a>
            <span className="mx-2">/</span>
            <a href="/#projects" className="hover:text-foreground transition-colors">Projects</a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{project.name}</span>
          </div>

          <BackButton href="/#projects" />
          
          <header className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-4">
                  {project.typeBadge}
                </span>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  {project.name}
                </h1>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl">
                  {project.shortDescription}
                </p>
              </div>
              
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors shrink-0"
              >
                View Live Site <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 pt-6 border-t border-border"
            >
              {project.stack.map(tech => (
                <SkillBadge key={tech}>{tech}</SkillBadge>
              ))}
            </motion.div>
          </header>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-16"
          >
            {/* Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">The Problem</h2>
                <p className="text-muted-foreground leading-relaxed bg-card p-6 rounded-xl border border-border">
                  {project.problem}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">The Solution</h2>
                <p className="text-muted-foreground leading-relaxed bg-primary/5 p-6 rounded-xl border border-primary/20">
                  {project.details.solution}
                </p>
              </section>
            </div>

            {/* Overview & Users */}
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-heading font-bold mb-4">Overview</h2>
              <p className="text-foreground/90 leading-relaxed mb-8 text-lg font-medium">
                {project.details.overview}
              </p>
              
              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-2">Target Audience</h3>
                <p className="font-medium text-foreground">{project.details.targetUsers}</p>
              </div>
            </section>

            {/* Features & Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h2 className="text-2xl font-heading font-bold mb-6">Key Features</h2>
                <ul className="space-y-4">
                  {project.details.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-heading font-bold mb-6">Project Goals</h2>
                <ul className="space-y-4">
                  {project.details.goals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border text-xs font-mono font-bold">
                        {i + 1}
                      </div>
                      <span className="mt-0.5">{goal}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Architecture & Decisions */}
            <section className="bg-background border border-border shadow-sm rounded-xl overflow-hidden">
              <div className="p-8 bg-card border-b border-border">
                <h2 className="text-2xl font-heading font-bold mb-4">Architecture</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.details.architecture}
                </p>
              </div>
              <div className="p-8">
                <h3 className="text-lg font-heading font-bold mb-6">Engineering Decisions</h3>
                <div className="space-y-6">
                  {project.details.engineeringDecisions.map((decision, i) => (
                    <div key={i} className="pl-4 border-l-2 border-primary/30">
                      <p className="text-foreground/90">{decision}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Challenges & Lessons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h2 className="text-xl font-heading font-bold mb-4 text-destructive">Challenges Overcome</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.details.challenges}
                </p>
              </section>
              <section>
                <h2 className="text-xl font-heading font-bold mb-4 text-accent">Lessons Learned</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.details.lessons}
                </p>
              </section>
            </div>

            {/* Navigation */}
            <div className="pt-12 border-t border-border mt-24">
              <Link 
                href="/projects/marketplace"
                className="group flex flex-col items-start"
              >
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-2">Previous Project</span>
                <span className="text-2xl font-heading font-bold flex items-center gap-2 group-hover:text-primary transition-colors">
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" /> Ma'a Gaber
                </span>
              </Link>
            </div>
          </motion.div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
