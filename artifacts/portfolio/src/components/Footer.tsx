import { Link, useLocation } from "wouter";
import { personalInfo } from "@/data/personal";
import { navigation } from "@/data/navigation";

export function Footer() {
  const [location] = useLocation();
  const isHomePage = location === "/";

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">
              Badr Aldien Sabra<span className="text-accent">.</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Built with React + Vite. Three live projects. One focused developer.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {isHomePage ? (
                navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="hover:text-accent transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))
              ) : (
                navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={`/${item.href}`} className="hover:text-accent transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a></li>
              <li><a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href={`mailto:${personalInfo.email}`} className="hover:text-accent transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <span>React</span>
            <span>TypeScript</span>
            <span>Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
