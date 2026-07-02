import { motion } from "framer-motion";
import { ArrowDown, Download, Terminal } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { projects } from "@/data/projects";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background technical elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute right-[10%] top-[20%] w-[30vw] h-[30vw] border border-primary/20 rounded-full blur-[100px] bg-primary/10" />
        <div className="absolute left-[5%] bottom-[20%] w-[20vw] h-[20vw] border border-accent/20 rounded-full blur-[80px] bg-accent/10" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(hsl(var(--muted-foreground)/0.2) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <Terminal className="w-5 h-5 text-accent" />
            <span className="font-mono text-sm tracking-tight text-muted-foreground uppercase">
              System Online / Ready for deployment
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[1.1] mb-6"
          >
            {personalInfo.name}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground mt-2">
              {personalInfo.role}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 font-medium"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(var(--primary)/20)] hover:shadow-[0_0_30px_rgba(var(--primary)/40)]"
            >
              View My Work
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv.pdf`}
              download="CV-Badr-Aldien-Sabra.pdf"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 border border-border transition-colors"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </motion.div>

          {/* Live Projects Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col gap-4 border-t border-border pt-8"
          >
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Active Deployments</p>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm font-medium"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {project.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              3 Live Projects
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Full Stack
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Self-Taught
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Available for Work
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <a href="#about" aria-label="Scroll down" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
