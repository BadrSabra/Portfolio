import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="max-w-md w-full space-y-8">
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">
              404
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Route not found
            </h2>
            <p className="text-muted-foreground text-lg">
              The endpoint you requested does not exist in this application.
            </p>
          </div>
          
          <div className="pt-8 border-t border-border">
            <Link 
              href="/"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
