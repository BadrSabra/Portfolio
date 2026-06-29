export interface Project {
  id: string;
  name: string;
  typeBadge: string;
  shortDescription: string;
  problem: string;
  stack: string[];
  liveUrl: string;
  slug: string;
  presentationFocus: string;
  details: {
    overview: string;
    solution: string;
    goals: string[];
    targetUsers: string;
    keyFeatures: string[];
    architecture: string;
    engineeringDecisions: string[];
    challenges: string;
    lessons: string;
    futureImprovements: string[];
  };
}

export const projects: Project[] = [
  {
    id: "tutorrl",
    name: "TutorRL",
    typeBadge: "AI Tutoring Platform",
    shortDescription: "An Arabic-language AI tutoring assistant for Egyptian secondary school (Thanaweyya Amma) students — conversational, RTL-native, and built for the Egyptian curriculum.",
    problem: "Egyptian secondary school students preparing for the Thanaweyya Amma exams have no accessible, Arabic-first digital tutor that understands the local curriculum and can explain concepts conversationally.",
    stack: ["React", "Node.js", "Express", "AI / LLM", "Arabic RTL"],
    liveUrl: "https://pasted-assets--omgasser2091999.replit.app/",
    slug: "tutorrl",
    presentationFocus: "Shows product thinking, domain specificity, and AI integration",
    details: {
      overview: "TutorRL is an Arabic-language AI-powered tutoring assistant built specifically for Egyptian secondary school (Thanaweyya Amma) students. It provides intelligent lesson explanations and step-by-step problem-solving guidance through a conversational interface — entirely in Arabic, with full RTL layout support.",
      solution: "A conversational AI interface in Arabic that meets students where they are — in their language, on their curriculum. Instead of generic study tools, TutorRL is scoped tightly to the Egyptian secondary school context, making it immediately useful without any learning curve.",
      goals: [
        "Deliver subject-matter guidance in Arabic for Thanaweyya Amma students",
        "Provide a natural conversational interface rather than a rigid Q&A format",
        "Support full Arabic RTL layout throughout the application",
        "Keep the experience simple enough for students to use independently"
      ],
      targetUsers: "Egyptian secondary school (Thanaweyya Amma) students studying for national exams",
      keyFeatures: [
        "Conversational AI interface for lesson explanations and problem-solving",
        "Full Arabic RTL UI — designed natively for right-to-left reading",
        "Configurable user preferences: theme, language, font size, and learning style",
        "Session management for ongoing study tracking",
        "Scoped to the Egyptian secondary school curriculum"
      ],
      architecture: "Client-server architecture with a React frontend and an Express.js backend that proxies requests to an LLM API. User preferences and session state are persisted server-side.",
      engineeringDecisions: [
        "Built the entire UI RTL-first rather than retrofitting — Arabic is the primary language, so layout decisions were made with that in mind from day one.",
        "Kept the settings model flexible (theme, language, font size, learning style) to accommodate different student preferences without hardcoding assumptions.",
        "Scoped the AI prompting to the Egyptian curriculum context to improve relevance and reduce off-topic responses."
      ],
      challenges: "Getting the AI to consistently respond in Arabic within the Egyptian curriculum context required careful prompt engineering. RTL layout also introduced edge cases in component spacing and text alignment that needed systematic handling.",
      lessons: "Domain specificity is a feature, not a limitation. A tool built for one clear audience (Thanaweyya Amma students) is more useful than a generic tutoring app — and it is easier to explain to those users why it exists.",
      futureImprovements: [
        "Subject-specific tutoring modes (Math, Arabic, Science, English)",
        "Exam-style practice questions with AI-graded feedback",
        "Offline support for students with limited connectivity"
      ]
    }
  },
  {
    id: "marketplace",
    name: "ميت جابر — Mit Gaber",
    typeBadge: "Hyperlocal Marketplace Platform",
    shortDescription: "A full-featured hyperlocal marketplace with multi-role management, real-time chat, driver fee negotiation, and digital wallets.",
    problem: "Local communities lack a digital commerce platform built for their actual workflows — one that handles delivery coordination, vendor management, and trust between buyers, sellers, and drivers.",
    stack: [
      "React 18", "TypeScript", "Vite", "Tailwind CSS v4",
      "Express.js 5", "PostgreSQL", "Drizzle ORM",
      "Socket.IO 4", "JWT", "TanStack Query v5",
      "shadcn/ui", "Framer Motion", "Recharts",
      "Google Cloud Storage", "Docker", "GitHub Actions"
    ],
    liveUrl: "https://104-mg-2--shahoda8601.replit.app/",
    slug: "marketplace",
    presentationFocus: "Strongest business and real-world engineering complexity",
    details: {
      overview: "Mit Gaber (ميت جابر) is a hyperlocal marketplace platform serving four distinct user roles: Admin, Customer, Store Owner, and Driver. It combines e-commerce, real-time communication, financial ledgers, and logistics into a single cohesive system — deployed on Render.com with Docker and CI/CD via GitHub Actions.",
      solution: "A modular monolith with feature-based backend modules and a React SPA frontend. The platform handles the complete order lifecycle: browsing → checkout → driver assignment → delivery OTP verification → settlement via in-app wallets.",
      goals: [
        "Support four distinct user roles with role-appropriate dashboards and permissions",
        "Implement a full order-to-delivery flow including real-time driver coordination",
        "Build a trustworthy financial layer with double-entry wallet ledgers",
        "Enable real-time communication between all parties via Socket.IO"
      ],
      targetUsers: "Local customers, store owners, delivery drivers, and platform administrators in hyperlocal communities",
      keyFeatures: [
        "4 user roles: Admin, Customer, Store Owner, Driver — each with a tailored dashboard",
        "Driver delivery fee negotiation: offer → counter-offer → accept/reject flow",
        "Delivery OTP verification for tamper-proof handoff confirmation",
        "Real-time chat rooms powered by Socket.IO",
        "Push notifications via Web Push (VAPID)",
        "Double-entry digital wallet and ledger system for all financial transactions",
        "80+ REST API endpoints with rate limiting and helmet security headers",
        "17+ database tables with referential integrity via PostgreSQL",
        "Image uploads to Google Cloud Storage via Multer",
        "Zod schema validation on all inputs",
        "CI/CD pipeline with GitHub Actions and Docker deployment on Render.com"
      ],
      architecture: "Modular Monolith with feature-based backend modules (auth, products, orders, wallets, chat, notifications, delivery). PostgreSQL as the primary data store with Drizzle ORM for type-safe queries. Socket.IO layered on the Express server for real-time events. Frontend is a React SPA using TanStack Query v5 for server state and Wouter for routing.",
      engineeringDecisions: [
        "Chose PostgreSQL over NoSQL to enforce relational integrity across 17+ interconnected tables — critical for financial ledger correctness.",
        "Implemented double-entry ledger accounting for wallets so every debit has a matching credit, making balance audits straightforward and eliminating phantom funds.",
        "Used JWT for stateless auth (scalable across services) combined with express-rate-limit and helmet to harden the API surface.",
        "Socket.IO was integrated directly on the Express server (not a separate service) to keep deployment simple while supporting real-time chat and delivery events.",
        "Chose Drizzle ORM for TypeScript-first, schema-driven DB access — types flow from schema to API to frontend with zero duplication.",
        "Designed the driver negotiation system as a state machine (OFFERED → COUNTERED → ACCEPTED / REJECTED) to prevent invalid state transitions."
      ],
      challenges: "Coordinating state across four user roles in real time — a driver accepting an order must instantly update the customer, store, and admin dashboards. Solving this without overloading the Socket.IO event bus required careful event scoping per order room.",
      lessons: "Financial systems demand correctness over cleverness. The double-entry ledger approach added upfront complexity but eliminated an entire class of balance bugs. Designing the delivery negotiation as an explicit state machine early on saved significant debugging time later.",
      futureImprovements: [
        "Native mobile apps (React Native) for drivers and customers",
        "Localized payment gateway integration (Fawry, Vodafone Cash)",
        "Advanced admin analytics with cohort tracking and revenue forecasting",
        "Automated end-to-end tests for the order lifecycle"
      ]
    }
  },
  {
    id: "system-core",
    name: "ClinicPro",
    typeBadge: "Clinic Management System",
    shortDescription: "A full-stack clinic management system covering patient records, appointments, billing, prescriptions, and Arabic RTL support.",
    problem: "Small and mid-sized clinics rely on manual or fragmented workflows for patient management, billing, and prescriptions — leading to errors, missed appointments, and poor record-keeping.",
    stack: [
      "React 18", "TypeScript", "Vite", "Tailwind CSS",
      "Express.js", "PostgreSQL", "Drizzle ORM",
      "Passport.js", "TanStack Query v5",
      "shadcn/ui", "Recharts", "jsPDF", "XLSX",
      "Zod", "react-hook-form"
    ],
    liveUrl: "https://system-core-project-2-zip--bsabra1994.replit.app/",
    slug: "system-core",
    presentationFocus: "Demonstrates ability to build organized, role-based, production-quality systems",
    details: {
      overview: "ClinicPro is a full-stack clinic management application covering the core operational lifecycle of a medical clinic. It supports four staff roles (Admin, Doctor, Nurse, Receptionist), a public patient-facing booking page, and a back-office for appointments, billing, prescriptions, inventory, and reporting — with Arabic RTL UI support throughout.",
      solution: "A unified web application that consolidates fragmented clinic workflows into a single, role-aware dashboard. Each staff role sees only what is relevant to their work, reducing operational errors and onboarding overhead.",
      goals: [
        "Replace paper-based and disconnected clinic workflows with a single system",
        "Enforce role-based access so each staff member sees only relevant data",
        "Generate professional PDF and Excel reports for billing and records",
        "Support Arabic RTL out of the box for Egyptian and Arab clinic staff"
      ],
      targetUsers: "Clinic administrators, doctors, nurses, receptionists, and patients (public booking page)",
      keyFeatures: [
        "4 staff roles: Admin, Doctor, Nurse, Receptionist — each with scoped dashboards",
        "Public patient booking page (no login required)",
        "Appointment calendar with scheduling and status management",
        "Patient medical records with full history",
        "Prescription management with reusable templates",
        "Billing, invoices, insurance company management, and payment tracking",
        "Medication inventory and supplier management",
        "PDF report export (jsPDF) and Excel export (XLSX)",
        "Audit logs for all critical actions",
        "Arabic RTL user interface",
        "33 verified REST API endpoints with Zod validation",
        "15 database tables with full referential integrity"
      ],
      architecture: "Layered architecture (Controller → Service → Repository) with PostgreSQL as the primary store and Drizzle ORM for type-safe queries. Session-based authentication via Passport.js (no JWT). React SPA frontend using TanStack Query v5 for data fetching and react-hook-form + Zod for all form validation. Recharts powers the admin analytics dashboard.",
      engineeringDecisions: [
        "Chose session-based authentication (Passport.js) over JWT — for a clinic system accessed from trusted staff devices, sessions are simpler to revoke and audit.",
        "Used Drizzle ORM to keep the database schema as the single source of truth — types flow end-to-end from schema definition to API response to React components.",
        "Implemented prescription templates as a first-class entity so doctors can reuse common prescriptions without re-entering data, reducing errors.",
        "jsPDF and XLSX were chosen for client-driven report generation — no server-side rendering needed, keeping the architecture simpler.",
        "The public booking page is fully isolated from the staff auth system, serving patients without any login friction."
      ],
      challenges: "Designing a permissions model that is strict enough for medical data compliance yet flexible enough for a small clinic's real-world workflow — where roles sometimes overlap. The audit log system also required careful design to capture meaningful change history without becoming a performance bottleneck.",
      lessons: "Domain modeling matters more than framework choice. Spending time upfront defining the 15 tables and their relationships (patients, appointments, invoices, prescriptions, insurance) prevented structural rewrites mid-project. Getting the schema right early is the highest-leverage investment in a data-heavy application.",
      futureImprovements: [
        "SMS/WhatsApp appointment reminders for patients",
        "Lab results upload and attachment to patient records",
        "Multi-clinic / multi-branch support for clinic chains",
        "HIPAA/PDPA-aligned data handling and encryption at rest"
      ]
    }
  }
];
