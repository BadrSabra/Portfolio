import { SectionHeading } from "@/components/SectionHeading";
import { personalInfo } from "@/data/personal";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <SectionHeading 
          title="Initialize Connection" 
          subtitle="Ready to build something real. Available for new opportunities."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="p-6 bg-background border border-border rounded-xl">
              <p className="text-sm font-mono text-accent mb-4 uppercase tracking-wider">Status</p>
              <p className="font-medium text-foreground">{personalInfo.availability}</p>
            </div>
            
            <div className="space-y-6">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-border/50">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="font-mono text-sm">{personalInfo.email}</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border/50">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Phone</p>
                  <p className="font-mono text-sm">{personalInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border/50">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Location</p>
                  <p className="font-mono text-sm">{personalInfo.location}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4 border-t border-border">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-secondary rounded-lg text-foreground hover:bg-accent hover:text-white transition-colors border border-border/50"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-secondary rounded-lg text-foreground hover:bg-primary hover:text-white transition-colors border border-border/50"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-background border border-border rounded-xl p-8 shadow-sm"
          >
            <h3 className="font-heading text-xl font-bold mb-6">Direct Message</h3>
            
            <form 
              action={`mailto:${personalInfo.email}`} 
              method="POST" 
              encType="text/plain"
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required 
                  className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground"
                  placeholder="Opportunity: Full Stack Developer"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required 
                  className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground resize-none"
                  placeholder="Hello Badr, I'm reaching out because..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors mt-4"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
