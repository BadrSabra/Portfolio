import { SectionHeading } from "@/components/SectionHeading";
import { personalInfo } from "@/data/personal";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

export function ContactSection() {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string;
  const [state, handleSubmit] = useForm(formspreeId);

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

            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-lg font-semibold text-foreground">Message sent!</p>
                <p className="text-muted-foreground text-sm">Thanks for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      disabled={state.submitting}
                      className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground disabled:opacity-50"
                      placeholder="John Doe"
                    />
                    <ValidationError field="name" prefix="Name" errors={state.errors} className="text-xs text-red-500 mt-1" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      disabled={state.submitting}
                      className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                    <ValidationError field="email" prefix="Email" errors={state.errors} className="text-xs text-red-500 mt-1" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required 
                    disabled={state.submitting}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground disabled:opacity-50"
                    placeholder="Opportunity: Full Stack Developer"
                  />
                  <ValidationError field="subject" prefix="Subject" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    disabled={state.submitting}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground resize-none disabled:opacity-50"
                    placeholder="Hello Badr, I'm reaching out because..."
                  />
                  <ValidationError field="message" prefix="Message" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>

                {state.errors && !state.submitting && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Something went wrong. Please try again or email me directly.</span>
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={state.submitting}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
