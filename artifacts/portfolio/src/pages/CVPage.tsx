import { Printer, ArrowLeft } from "lucide-react";

export default function CVPage() {
  return (
    <>
      {/* ─── Print overrides ─────────────────────────────────────── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .cv-wrapper { padding-top: 0 !important; }
          @page { margin: 18mm 14mm; }
        }
      `}</style>

      {/* ─── Toolbar (hidden when printing) ──────────────────────── */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-5 py-3 flex items-center justify-between gap-4 print:hidden">
        <a
          href={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </a>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 h-9 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      {/* ─── CV body ─────────────────────────────────────────────── */}
      <div className="cv-wrapper pt-16 bg-white min-h-screen">
        <div
          style={{
            fontFamily: "'Segoe UI', Arial, sans-serif",
            color: "#111",
            background: "#fff",
            padding: "40px",
            maxWidth: "820px",
            margin: "0 auto",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          {/* Header */}
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a" }}>
            Badr Aldien Sabra
          </h1>
          <div style={{ fontSize: "16px", color: "#475569", margin: "4px 0 12px" }}>
            Independent Full Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              fontSize: "13px",
              color: "#64748b",
              marginBottom: "8px",
            }}
          >
            <span>📧 <a href="mailto:badraldien1@yahoo.com" style={{ color: "#3b82f6" }}>badraldien1@yahoo.com</a></span>
            <span>📱 <a href="https://wa.me/201014938003" style={{ color: "#3b82f6" }}>+201014938003</a></span>
            <span>📍 Belbeis, Sharqia, Egypt</span>
            <span>🔗 <a href="https://github.com/BadrSabra" target="_blank" rel="noreferrer" style={{ color: "#3b82f6" }}>GitHub</a></span>
            <span>💼 <a href="https://www.linkedin.com/in/badr-aldien-sabra" target="_blank" rel="noreferrer" style={{ color: "#3b82f6" }}>LinkedIn</a></span>
          </div>

          <SectionTitle>Profile</SectionTitle>
          <p style={{ color: "#374151" }}>
            Self-taught full stack developer who designs, builds, tests, and ships complete software products
            independently. Experienced with the full product lifecycle — from problem discovery through
            architecture, development, and deployment. Passionate about building software that solves real
            problems for real people.
          </p>

          <SectionTitle>Skills</SectionTitle>
          <TagCloud tags={[
            "React", "Vite", "TypeScript", "JavaScript", "HTML5", "CSS3",
            "Tailwind CSS", "Node.js", "Express", "Python", "PostgreSQL",
            "Drizzle ORM", "Git", "Docker", "Linux", "Figma",
            "REST APIs", "Authentication", "RTL / Arabic i18n",
          ]} />

          <SectionTitle>Projects</SectionTitle>

          <ProjectBlock
            title="TutorRL — AI Tutoring Platform"
            url="https://pasted-assets--omgasser2091999.replit.app/"
            description="An Arabic-language AI-powered tutoring assistant for Egyptian secondary school (Thanaweyya Amma) students. Provides intelligent lesson explanations and problem-solving guidance via a conversational AI interface, with full Arabic RTL support."
            tags={["React", "AI / LLM", "Arabic RTL", "Node.js"]}
          />

          <ProjectBlock
            title="Mit Gaber Market — Hyperlocal Marketplace"
            url="https://104-mg-2--shahoda8601.replit.app/"
            description="A full-stack local marketplace platform connecting neighbourhood shops in the Mit Gaber area with customers and delivery agents. Features multi-role authentication (customers, shop owners, delivery), product catalogue management, cart, checkout, and order management."
            tags={["React", "Node.js", "PostgreSQL", "Multi-role Auth", "Arabic RTL"]}
          />

          <ProjectBlock
            title="MediCare Gateway — Hospital Management System"
            url="https://system-core-project-2-zip--bsabra1994.replit.app"
            description="A role-based hospital administration portal providing secure authentication, role-based access control, and administrative dashboards for managing hospital workflows and data."
            tags={["React", "Express", "JWT Auth", "RBAC", "PostgreSQL"]}
          />

          <SectionTitle>Education</SectionTitle>
          <div style={{ marginBottom: "8px" }}>
            <div style={{ fontWeight: 600 }}>Advanced Technical School</div>
            <div style={{ color: "#64748b", fontSize: "13px" }}>
              Five-Year Program — Computer &amp; Electronics Department
            </div>
            <div style={{ color: "#64748b", fontSize: "13px" }}>Belbeis, Sharqia, Egypt</div>
          </div>

          <SectionTitle>Languages</SectionTitle>
          <ul style={{ paddingLeft: "18px" }}>
            <li style={{ marginBottom: "4px", color: "#374151" }}>Arabic — Native</li>
            <li style={{ marginBottom: "4px", color: "#374151" }}>English — Professional working proficiency</li>
          </ul>

          {/* Print hint — hidden in screen view via the no-print toolbar */}
          <div
            className="no-print"
            style={{
              marginTop: "32px",
              fontSize: "11px",
              color: "#94a3b8",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "12px",
            }}
          >
            Click the <strong>Save as PDF</strong> button above, or press{" "}
            <kbd style={{ fontFamily: "monospace" }}>Ctrl+P</kbd> /{" "}
            <kbd style={{ fontFamily: "monospace" }}>⌘P</kbd> → Save as PDF.
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Small helpers ─────────────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "13px",
        fontWeight: 600,
        color: "#3b82f6",
        textTransform: "uppercase",
        letterSpacing: "1px",
        marginBottom: "10px",
        marginTop: "28px",
        borderBottom: "1px solid #e2e8f0",
        paddingBottom: "4px",
      }}
    >
      {children}
    </h2>
  );
}

function TagCloud({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {tags.map((t) => (
        <span
          key={t}
          style={{
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            borderRadius: "4px",
            padding: "2px 8px",
            fontSize: "11px",
            color: "#475569",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectBlock({
  title, url, description, tags,
}: {
  title: string;
  url: string;
  description: string;
  tags: string[];
}) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ fontWeight: 600, fontSize: "15px", color: "#1e293b" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "#3b82f6" }}>
        <a href={url} target="_blank" rel="noreferrer" style={{ color: "#3b82f6" }}>
          {url}
        </a>
      </div>
      <div style={{ color: "#374151", marginTop: "4px" }}>{description}</div>
      <TagCloud tags={tags} />
    </div>
  );
}
