interface FeaturedProject {
  name: string;
  summary: string;
  problem?: string;
  role?: string;
  stack: string[];
  outcome?: string;
  live?: string;
  github?: string;
}

interface MoreProject {
  name: string;
  summary: string;
  stack: string;
  live?: string;
  github?: string;
  image?: string;
  imageSize?: { width: number; height: number };
}

interface PortfolioContent {
  hero: { eyebrow: string; title: string; subtitle: string };
  cv: string;
  emails: string[];
  linkedin: string;
  github: string;
  navLinks: { href: string; label: string }[];
  labels: Record<string, string>;
  featuredSection: Record<string, string>;
  moreSection: { eyebrow: string; title: string };
  aboutSection: { eyebrow: string; title: string; lookingTitle: string; factsHeading: string };
  skillsSection: { eyebrow: string; title: string };
  workSection: { eyebrow: string; title: string };
  contactSection: { eyebrow: string; title: string; intro: string };
  footer: { brand: string; copyright: string; name: string; backToTop: string };
  featured: FeaturedProject[];
  moreProjects: MoreProject[];
  about: string;
  lookingFor: string;
  facts: { label: string; value: string }[];
  skills: { name: string; items: string[] }[];
  steps: { title: string; description: string }[];
}

export const content: PortfolioContent = {
  navLinks: [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ],
  labels: {
    home: "home",
    menuOpen: "Menu",
    menuClose: "Close",
    downloadCv: "Download CV",
    liveProject: "Live project",
    live: "Live",
    github: "GitHub",
    copyEmail: "Copy email",
    linkedin: "LinkedIn",
    copySuccess: "Email copied.",
    copyFailure: "Could not copy automatically. Please select the email address.",
    alsoReachable: "Also reachable at",
    seeMyWork: "See my work",
    scrollToExplore: "Scroll to explore",
  },
  featuredSection: {
    eyebrow: "Selected work",
    title: "Products built around real workflows.",
    intro: "A closer look at the problems, decisions and details behind my work.",
    caseStudy: "Case study",
    problemLabel: "Problem",
    roleLabel: "My role",
    stackLabel: "Stack",
    outcomeLabel: "Outcome",
  },
  moreSection: { eyebrow: "More projects", title: "Small builds, practical ideas." },
  aboutSection: {
    eyebrow: "A little about me",
    title: "Data-minded. Product-focused.",
    lookingTitle: "What I’m looking for",
    factsHeading: "The essentials",
  },
  skillsSection: {
    eyebrow: "Skills",
    title: "Tools I use to take a feature from idea to release.",
  },
  workSection: {
    eyebrow: "How I work",
    title: "Make the work clear. Make it reliable. Ship it.",
  },
  contactSection: {
    eyebrow: "Contact",
    title: "Let’s work together.",
    intro: "Have a role, a project, or a good problem to solve? I’d like to hear from you.",
  },
  footer: {
    brand: "LM",
    copyright: "©",
    name: "Lesedi Modikwe",
    backToTop: "Back to top",
  },
  hero: {
    eyebrow: "Full-stack developer · South Africa · Open to opportunities",
    title: "I build full-stack products that make everyday workflows simple.",
    subtitle:
      "AI Full Stack Software Developer with a data analytics background. I turn messy processes into reliable, well-tested web apps, from database rules to polished interfaces.",
  },
  cv: "",
  emails: ["analystmodikwe18@gmail.com", "lmodikwe10@gmail.com"],
  linkedin: "https://www.linkedin.com/in/lesedi-modikwe/",
  github: "https://github.com/analystmodikwe",
  featured: [
    {
      name: "ServiceFlow SA",
      summary: "A booking platform for independent service providers.",
      problem:
        "Bookings run on WhatsApp and paper diaries, causing double-bookings and no-shows.",
      role:
        "Built customer booking for open slots, provider tools for services, availability and requests, and admin provider verification.",
      stack: ["React", "TypeScript", "Tailwind", "Supabase", "Vitest", "GitHub Actions", "Vercel"],
      outcome:
        "Roles and permissions enforced with Supabase Row Level Security, double-booking blocked by a database constraint, and tests and CI on every pull request.",
      live: "https://serviceflow-sa.vercel.app/",
      github: "https://github.com/analystmodikwe/serviceflow-sa",
    },
    {
      name: "Guardova",
      summary: "Live location tracking and a panic button for personal safety on web and mobile.",
      role: "Team project. Drafted the key features document.",
      stack: [],
    },
    {
      name: "Riverside Community Hub",
      summary: "A 7-week full-stack capstone for a fictional nonprofit.",
      stack: ["React", "TypeScript", "Node/Express", "Supabase"],
    },
  ],
  moreProjects: [
    {
      name: "Gym membership app",
      summary: "Vanilla JS app for members, plans, grace period and dashboard stats.",
      stack: "Vanilla JavaScript",
    },
    {
      name: "E-Commerce Order Processor",
      summary: "Order-processing interface built with HTML, Tailwind and JavaScript.",
      stack: "HTML · Tailwind · JavaScript",
    },
    {
      name: "Seat Reservation System",
      summary: "Express and TypeScript backend with a separate frontend.",
      stack: "Express · TypeScript",
    },
    {
      name: "New Body — Nutrition & Meal Planner",
      summary:
        "Web app that calculates daily calorie, macro and water targets for nutrition planning.",
      stack: "React · TypeScript · Tailwind",
      live: "https://body-goals-green.vercel.app/",
      github: "https://github.com/analystmodikwe/Body-Goals.git",
      image: "/projects/new-body.png",
      imageSize: { width: 1862, height: 906 },
    },
    {
      name: "Pulse-Dashboard",
      summary:
        "Dashboard for live earthquake data from USGS and current weather readings from Open-Meteo.",
      stack: "React · JavaScript · PostgreSQL · Tailwind",
      live: "https://pulse-dashboard-olive.vercel.app/",
      github: "https://github.com/analystmodikwe/pulse-dashboard",
      image: "/projects/pulse-dashboard.png",
      imageSize: { width: 1792, height: 887 },
    },
    {
      name: "Company-Project-1",
      summary: "Redesign of an outdated website using React and Tailwind CSS.",
      stack: "JavaScript · React · Tailwind",
      live: "https://mokoena-tt-holdings.netlify.app/",
      github: "https://github.com/analystmodikwe/Company-Project-1.git",
      image: "/projects/website.png",
      imageSize: { width: 1900, height: 865 },
    },
    {
      name: "Management Dashboard",
      summary: "Dashboard to track projects, tasks and deadlines and visualize progress.",
      stack: "React · TypeScript · Vite · Tailwind",
      live: "https://claude-project-management-dashboard-mu.vercel.app/",
      github:
        "https://github.com/analystmodikwe/company-project2-project-management-dashboard.git",
      image: "/projects/dashbord.png",
      imageSize: { width: 1887, height: 890 },
    },
  ],
  about:
    "I started in data analytics, writing SQL and building Power BI dashboards, and saw how much a decision depends on how well a system is designed. That pulled me into software. I'm completing an AI Full Stack Software Development programme at Melsoft Academy and a Bachelor of Information Science at UNISA (expected 2027). I like owning a feature end to end: the data model, the permissions, the interface and the tests that keep it honest.",
  lookingFor:
    "A junior full-stack or software developer role on a team that values clean code, testing and shipping.",
  facts: [
    { label: "Based in", value: "South Africa" },
    { label: "Open to", value: "Remote and on-site" },
  ],
  skills: [
    { name: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"] },
    { name: "Backend and data", items: ["Node.js", "Express", "Supabase", "PostgreSQL", "SQL"] },
    { name: "Analytics", items: ["Power BI", "Python", "pandas", "Excel"] },
    {
      name: "Practice",
      items: [
        "Git and GitHub",
        "GitHub Actions CI",
        "Vitest",
        "REST APIs",
        "Issues-to-PR workflow",
        "Vercel",
      ],
    },
  ],
  steps: [
    { title: "Plan", description: "Start with a clear brief, PRD and designs." },
    { title: "Build", description: "Deliver in small, reviewable pull requests." },
    { title: "Test and automate", description: "Run tests and CI on every pull request." },
    { title: "Ship and demo", description: "Deploy the work and share a live link." },
  ],
};
