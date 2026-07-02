import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { navigation } from "@/data/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (isHomePage && href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border"
          : "bg-background/0 border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-heading font-bold text-xl tracking-tighter hover:text-accent transition-colors">
            BS<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(e) => {
                  if (isHomePage && item.href.startsWith("#")) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pl-4 border-l border-border flex items-center">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md absolute w-full left-0">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(e) => {
                  if (isHomePage && item.href.startsWith("#")) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="text-sm font-medium p-2 rounded-md hover:bg-muted text-foreground"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
