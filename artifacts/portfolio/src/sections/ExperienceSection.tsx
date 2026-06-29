import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Code2, Server, Database, Rocket } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-card/50 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <SectionHeading title="Experience" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative pl-8 md:pl-0"
        >
          {/* Timeline line */}
          <div className="absolute left-[11px] md:hidden top-0 bottom-0 w-px bg-border" />
          
          <div className="bg-background border border-border rounded-xl p-6 md:p-10 shadow-sm relative z-10 hover:border-accent/40 transition-colors">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-1">Independent Full Stack Development</h3>
                <p className="text-primary font-medium">Self-Employed / Independent Builder</p>
              </div>
              <div className="text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-md self-start border border-border/50">
                Present
              </div>
            </div>
            
            <p className="text-foreground/90 mb-8 leading-relaxed max-w-3xl font-medium">
              Owned the entire product lifecycle for three separate full-stack web applications. 
              Built from scratch, architected for scalability, and deployed to production.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary h-fit">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Frontend Engineering</h4>
                  <p className="text-sm text-muted-foreground">Built responsive, state-driven UIs using React, prioritizing user experience and performance.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-accent/10 p-2 rounded-lg text-accent h-fit">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Backend Architecture</h4>
                  <p className="text-sm text-muted-foreground">Designed and implemented robust REST APIs using Node.js and Express with secure authentication.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary h-fit">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Data Management</h4>
                  <p className="text-sm text-muted-foreground">Architected normalized relational schemas and flexible document models depending on project needs.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-accent/10 p-2 rounded-lg text-accent h-fit">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Deployment & DevOps</h4>
                  <p className="text-sm text-muted-foreground">Published applications to production environments, managing environment variables and monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
