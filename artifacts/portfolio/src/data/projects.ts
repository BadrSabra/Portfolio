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
    typeBadge: "Smart Tutoring Platform",
    shortDescription: "An intelligent tutoring platform that connects students with learning resources.",
    problem: "Students need accessible, structured learning support without navigating complex interfaces.",
    stack: ["React", "Node.js", "Express", "Replit"],
    liveUrl: "https://pasted-assets--omgasser2091999.replit.app/",
    slug: "tutorrl",
    presentationFocus: "Most visually compelling / shows product thinking",
    details: {
      overview: "TutorRL is a full-stack educational web application designed to bridge the gap between students and structured learning materials. Built entirely from scratch and deployed independently.",
      solution: "A streamlined, intuitive interface that organizes learning modules and resources, backed by a robust API designed for fast data retrieval.",
      goals: [
        "Create a frictionless onboarding experience for new students",
        "Structure complex educational data into digestible formats",
        "Ensure high performance and responsiveness across all devices"
      ],
      targetUsers: "Students seeking structured learning paths and independent educators",
      keyFeatures: [
        "User authentication and personalized learning dashboards",
        "Resource categorization and search functionality",
        "Progress tracking for individual learning modules",
        "Responsive, mobile-first student interface"
      ],
      architecture: "Client-server architecture utilizing a RESTful API. The frontend is a React Single Page Application (SPA) communicating with an Express.js backend. Data is handled via a structured schema optimized for read-heavy operations.",
      engineeringDecisions: [
        "Chose React for the frontend to enable dynamic, instant UI updates without page reloads, essential for a learning environment.",
        "Implemented token-based authentication to ensure secure access to personalized student data.",
        "Designed the database schema to normalize user progress data, preventing duplication and ensuring consistency."
      ],
      challenges: "Managing complex state across multiple learning modules while keeping the UI responsive. The challenge was ensuring that progress updates were immediately reflected without causing unnecessary API calls.",
      lessons: "Gained deep insights into React state management and the importance of optimistic UI updates for perceived performance.",
      futureImprovements: [
        "Integration of gamification elements to boost engagement",
        "Offline support via Service Workers",
        "Advanced analytics dashboard for educators"
      ]
    }
  },
  {
    id: "marketplace",
    name: "Souk Mit Gaber",
    typeBadge: "Local Marketplace",
    shortDescription: "A digital marketplace bringing traditional Egyptian local commerce online.",
    problem: "Local businesses in Mit Gaber need a digital presence but lack technical expertise and resources.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://104-mg-2--shahoda8601.replit.app/",
    slug: "marketplace",
    presentationFocus: "Strongest business/real-world value",
    details: {
      overview: "Souk Mit Gaber is a localized e-commerce platform designed specifically for the dynamics of a traditional Egyptian market, giving local vendors a modern digital storefront.",
      solution: "A simplified, vendor-centric marketplace that lowers the barrier to entry for digital commerce, focusing on localized delivery and direct vendor-to-customer communication.",
      goals: [
        "Digitize local commerce with a zero-friction vendor onboarding",
        "Provide a familiar, culturally relevant shopping experience",
        "Build a scalable foundation to support an entire town's commerce"
      ],
      targetUsers: "Local vendors in Mit Gaber and residents looking for local goods",
      keyFeatures: [
        "Multi-vendor product listings with categorical organization",
        "Simplified checkout process optimized for local delivery",
        "Vendor dashboard for basic inventory management",
        "Arabic-first, localized user interface"
      ],
      architecture: "Monolithic modular architecture where the backend serves a REST API consumed by a React frontend. The data layer uses a NoSQL database to flexibly handle varied product attributes from different vendor types.",
      engineeringDecisions: [
        "Opted for a flexible schema design to accommodate the wildly different product types found in a traditional souk (from produce to electronics).",
        "Prioritized mobile responsiveness as the primary access method for both vendors and customers in the region is via smartphones.",
        "Implemented a straightforward, stateless API design to ensure horizontal scalability if the marketplace grows."
      ],
      challenges: "Designing an interface that is intuitive for users who may have low digital literacy. Technical challenge included optimizing image delivery for varying network conditions.",
      lessons: "Learned that the best engineering solution is the one that actually fits the user context. Technical complexity must be hidden behind absolute simplicity.",
      futureImprovements: [
        "WhatsApp integration for direct vendor communication",
        "Localized payment gateways",
        "Vendor analytics and sales reporting"
      ]
    }
  },
  {
    id: "system-core",
    name: "System Core",
    typeBadge: "System Architecture",
    shortDescription: "A structured system-level application demonstrating clean engineering patterns.",
    problem: "Complex enterprise workflows often suffer from disorganized architecture and unmaintainable codebases.",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    liveUrl: "https://system-core-project-2-zip--bsabra1994.replit.app/",
    slug: "system-core",
    presentationFocus: "Proves ability to build organized, maintainable systems",
    details: {
      overview: "System Core is an architectural proof-of-concept demonstrating how to build a scalable, maintainable application with robust data management and clean code principles.",
      solution: "A rigorously typed, layered architecture that strictly separates concerns between the data layer, business logic, and presentation.",
      goals: [
        "Implement a highly maintainable, strongly-typed codebase",
        "Demonstrate advanced data relational modeling",
        "Establish patterns that scale to enterprise-level complexity"
      ],
      targetUsers: "Internal teams, system administrators, and developers",
      keyFeatures: [
        "Strict TypeScript implementation across the full stack",
        "Complex relational data management and querying",
        "Role-based access control (RBAC) foundation",
        "Comprehensive error handling and logging patterns"
      ],
      architecture: "Layered architecture (Controller-Service-Repository pattern). Uses a relational database with strict constraints to ensure data integrity, accessed via an ORM/Query Builder.",
      engineeringDecisions: [
        "Used TypeScript universally to share types between client and server, catching errors at compile time rather than runtime.",
        "Implemented the Repository pattern to abstract database operations, making the business logic testable and independent of the data source.",
        "Designed the API with comprehensive validation layers to ensure dirty data never reaches the database."
      ],
      challenges: "Balancing the overhead of strict typing and architectural patterns with development velocity. Ensuring that the layered approach didn't introduce unnecessary performance bottlenecks.",
      lessons: "Mastered the art of designing systems for the long term. Code organization and architectural boundaries are just as important as the feature set.",
      futureImprovements: [
        "Implementation of a caching layer (Redis) for read-heavy endpoints",
        "Automated CI/CD pipeline configuration",
        "Comprehensive unit and integration test coverage"
      ]
    }
  }
];
