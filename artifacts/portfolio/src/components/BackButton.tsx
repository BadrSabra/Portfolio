import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function BackButton({ href = "/", label = "Back to Portfolio" }: { href?: string, label?: string }) {
  return (
    <Link 
      href={href} 
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group mb-8"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      {label}
    </Link>
  );
}
