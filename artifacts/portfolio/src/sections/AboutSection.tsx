import { SectionHeading } from "@/components/SectionHeading";
import { personalInfo } from "@/data/personal";
import { MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="About" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8"
            >
              {personalInfo.description}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-muted-foreground leading-relaxed"
            >
              Having zero traditional corporate experience is my strongest asset. It means my instincts are entirely focused on what works in reality, not theory. I design, build, deploy, and maintain systems independently, handling every layer of the stack with uncompromising attention to detail.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex items-center gap-2 text-muted-foreground font-mono text-sm bg-background border border-border inline-flex px-4 py-2 rounded-full"
            >
              <MapPin className="w-4 h-4 text-accent" />
              {personalInfo.location} — {personalInfo.remoteAvailable ? "Remote Available" : "On-site"}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-background border border-border rounded-xl p-8 shadow-sm"
          >
            <h3 className="font-heading text-xl font-bold mb-6">What I Do</h3>
            <ul className="space-y-4">
              {personalInfo.whatIDo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
