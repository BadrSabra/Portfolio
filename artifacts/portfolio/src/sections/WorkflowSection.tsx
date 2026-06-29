import { SectionHeading } from "@/components/SectionHeading";
import { workflowSteps } from "@/data/workflow";
import { motion } from "framer-motion";

export function WorkflowSection() {
  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Engineering Process" 
          subtitle="How I take an idea from conception to production."
          align="center"
        />
        
        <div className="max-w-4xl mx-auto mt-16 relative">
          {/* Vertical line connector */}
          <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border/80" />
          
          <div className="space-y-12">
            {workflowSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content block */}
                  <div className={`md:w-1/2 ${isEven ? "md:text-left" : "md:text-right"} pl-16 md:pl-0`}>
                    <div className={`bg-card border border-border p-6 rounded-xl shadow-sm hover:border-primary/30 transition-colors ${
                      isEven ? "md:ml-8" : "md:mr-8"
                    }`}>
                      <h3 className="text-xl font-heading font-bold mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-primary text-primary font-mono font-bold z-10 shadow-[0_0_15px_rgba(var(--primary)/20)]">
                    0{step.step}
                  </div>
                  
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
