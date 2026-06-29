import { SectionHeading } from "@/components/SectionHeading";
import { education } from "@/data/education";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";

export function EducationSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <SectionHeading title="Education" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start"
        >
          <div className="bg-secondary p-4 rounded-full text-foreground shrink-0 border border-border/50">
            <GraduationCap className="w-8 h-8" />
          </div>
          
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <h3 className="text-2xl font-heading font-bold">{education.institution}</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                {education.status}
              </span>
            </div>
            
            <h4 className="text-lg text-primary font-medium mb-2">{education.program}</h4>
            <p className="text-foreground font-medium mb-4">{education.department}</p>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-mono">
              <MapPin className="w-4 h-4" />
              {education.location}
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {education.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
