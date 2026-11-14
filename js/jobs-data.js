// ============================================
// JOBS DATA — single source of truth
// Add/remove jobs here. Both index and detail page use this.
// ============================================
const jobs = [
  {
    id: "senior-react-engineer",
    title: "Senior React Engineer",
    company: "Acme Corp",
    location: "Remote",
    type: "Full-time",
    salaryMin: 120000,
    salaryMax: 160000,
    currency: "$",
    tags: ["React", "TypeScript", "Remote"],
    postedDaysAgo: 2,
    description: "We are looking for a Senior React Engineer to lead our frontend team. You will build fast, accessible UIs with React and TypeScript, mentor junior engineers, and own our design system. This is a fully remote role with flexible hours.",
    requirements: [
      "5+ years building production React apps",
      "Strong TypeScript skills",
      "Experience with design systems",
      "Excellent written communication (remote team)",
    ],
  },
  {
    id: "backend-engineer-go",
    title: "Backend Engineer (Go)",
    company: "Beta Co",
    location: "Berlin",
    type: "Full-time",
    salaryMin: 80000,
    salaryMax: 110000,
    currency: "€",
    tags: ["Go", "PostgreSQL", "Docker"],
    postedDaysAgo: 5,
    description: "Join our backend team building high-throughput APIs in Go. You will work on services handling millions of requests per day, optimize PostgreSQL queries, and deploy with Docker + Kubernetes.",
    requirements: [
      "3+ years writing Go in production",
      "Strong SQL / PostgreSQL knowledge",
      "Experience with Docker and CI/CD",
      "EU work authorization required",
    ],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    company: "Gamma Studio",
    location: "New York",
    type: "Contract",
    salaryMin: 90000,
    salaryMax: 130000,
    currency: "$",
    tags: ["Figma", "UI/UX", "Design systems"],
    postedDaysAgo: 1,
    description: "We are hiring a Product Designer for a 6-month contract (with extension potential). You will design end-to-end user flows, build Figma prototypes, and collaborate daily with engineers and product managers.",
    requirements: [
      "Strong portfolio of shipped products",
      "Expert in Figma and design systems",
      "Comfortable leading design critiques",
      "US time zone overlap (EST)",
    ],
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    company: "Delta Analytics",
    location: "Remote",
    type: "Full-time",
    salaryMin: 140000,
    salaryMax: 180000,
    currency: "$",
    tags: ["Python", "SQL", "Airflow"],
    postedDaysAgo: 3,
    description: "Build and maintain our data platform: ingestion pipelines, warehouses, and transformation jobs. You will own our Airflow clusters, write reliable SQL and Python, and make data accessible to the whole company.",
    requirements: [
      "4+ years as a Data Engineer",
      "Deep Python + SQL expertise",
      "Airflow or similar orchestration experience",
      "Familiarity with Snowflake / BigQuery",
    ],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    company: "Epsilon Labs",
    location: "London",
    type: "Full-time",
    salaryMin: 60000,
    salaryMax: 85000,
    currency: "£",
    tags: ["Vue", "CSS", "JavaScript"],
    postedDaysAgo: 7,
    description: "We are looking for a Frontend Developer to work on our customer-facing dashboard. You will build features in Vue 3, write accessible CSS, and collaborate closely with our design team.",
    requirements: [
      "2+ years with Vue (or React/Angular with desire to learn Vue)",
      "Strong CSS skills (flexbox, grid, responsive design)",
      "Understanding of accessibility best practices",
      "UK work authorization required",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    company: "Zeta Systems",
    location: "Remote",
    type: "Full-time",
    salaryMin: 130000,
    salaryMax: 170000,
    currency: "$",
    tags: ["Kubernetes", "AWS", "Terraform"],
    postedDaysAgo: 4,
    description: "Own our infrastructure and deployment pipeline. You will manage Kubernetes clusters, write Terraform modules, and improve our observability stack. On-call rotation shared across the team.",
    requirements: [
      "3+ years managing production Kubernetes",
      "Strong Terraform / IaC experience",
      "AWS certifications a plus",
      "Comfortable with 24/7 on-call (with compensation)",
    ],
  },
  {
    id: "mobile-developer-ios",
    title: "Mobile Developer (iOS)",
    company: "Eta Mobile",
    location: "Berlin",
    type: "Full-time",
    salaryMin: 75000,
    salaryMax: 100000,
    currency: "€",
    tags: ["Swift", "iOS", "Mobile"],
    postedDaysAgo: 6,
    description: "Build and ship features for our iOS app (500k+ downloads). You will write Swift, work with SwiftUI, and collaborate with our Android team on shared design patterns.",
    requirements: [
      "3+ years iOS development",
      "Strong Swift + SwiftUI knowledge",
      "Experience with App Store releases",
      "EU work authorization required",
    ],
  },
  {
    id: "technical-writer",
    title: "Technical Writer",
    company: "Theta Docs",
    location: "Remote",
    type: "Part-time",
    salaryMin: 40000,
    salaryMax: 60000,
    currency: "$",
    tags: ["Writing", "Documentation", "Remote"],
    postedDaysAgo: 10,
    description: "Write developer documentation for our API products. You will work with engineers to document new features, improve existing guides, and maintain our docs site. 20 hours per week, fully remote.",
    requirements: [
      "2+ years technical writing experience",
      "Comfortable reading code (Python and JS preferred)",
      "Experience with static site generators (Docusaurus, MkDocs)",
      "Excellent written English",
    ],
  },
  {
    id: "ux-researcher",
    title: "UX Researcher",
    company: "Your Company",
    location: "Remote",
    type: "Full-time",
    salaryMin: 90000,
    salaryMax: 120000,
    currency: "$",
    tags: ["Research", "Figma", "Remote"],
    postedDaysAgo: 1,
    description: "Lead user research for our product team. You will design and run studies, synthesize findings into actionable insights, and help the team make user-centered decisions.",
    requirements: [
      "3+ years UX research experience",
      "Strong qualitative research skills",
      "Experience presenting to stakeholders",
      "Remote-friendly (US or EU time zones)",
    ],
  },
];

// Helper: find a job by id
function getJobById(id) {
  return jobs.find((j) => j.id === id);
}

// Helper: formatted date
function postedText(daysAgo) {
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} week${daysAgo < 14 ? "" : "s"} ago`;
  return `${Math.floor(daysAgo / 30)} month${daysAgo < 60 ? "" : "s"} ago`;
}