export interface Project {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  year: string;
  href?: string;
  repo?: string;
  metric?: string; // a single standout number/result, shown as a caption
  image?: string; // path in /public, e.g. "/projects/new-body.jpg" — shown as the card background
}

/**
 * Edit this list with your own work. Each entry becomes one node in the
 * orbit. Keep `summary` short (~120 characters) — it has to read while
 * mid-motion. `metric` is optional but works well for a one-line result,
 * e.g. "38% latency drop" or "12k inference calls/day".
 */
export const projects: Project[] = [
  {
    id: "proj-01",
    title: "service-flow",
    summary:
      "ServiceFlow SA gives independent barbers, braiders and nail techs a simple booking link, so clients book instantly and providers stop losing money to double-bookings, no-shows and buried WhatsApp messages.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2026",
    // metric: "40ms p95 retrieval",
    href: "https://serviceflow-sa.vercel.app/",
    repo: "https://github.com/analystmodikwe/serviceflow-sa.git",
    image: "/projects/service-flow.png",
  },

  {
    id: "proj-02",
    title: "Straina",
    summary:
      "An intelligent antimicrobial-resistance mapping platform that visualises where drug-resistant organisms are emerging, tracks how resistance patterns change over time, and identifies potential hotspots before they become larger public-health threats.",
    stack: ["React.js", "TypeScript", "PostresSQL", "Tailwind CSS", "Vite"],
    year: "2026",
    // metric: "40ms p95 retrieval",
    href: "https://straina-eight.vercel.app/",
    repo: "https://github.com/analystmodikwe/Straina.git",
    image: "/projects/straina.png",
  },

  {
    id: "proj-03",
    title: "New Body — Nutrition & Meal Planner",
    summary:
      "web app that calculates personalised daily calorie, macro, and water targets for losing fat while building muscle",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2026",
    // metric: "40ms p95 retrieval",
    href: "https://body-goals-green.vercel.app/",
    repo: "https://github.com/analystmodikwe/Body-Goals.git",
    image: "/projects/new-body.png",
  },
  {
    id: "proj-04",
    title: "Company-Project-1",
    summary: "Redesigning an outdated website using React and Tailwind CSS",
    stack: ["JavaScript", "React.js", "TailWind"],
    year: "2026",
    // metric: "92% field accuracy",
    href: "https://mokoena-tt-holdings.netlify.app/",
    repo: "https://github.com/analystmodikwe/Company-Project-1.git",
    image: "/projects/website.png",
  },
   {
    id: "proj-05",
    title: "Assess-to-Intervene Colleague (Hackerthon)",
    summary: "A team of seven AI agents that marks a class set against a rubric, checks and corrects its own marks, finds each learner's main gap, and writes a catch-up task for every learner who needs one. The teacher reads a short brief and approves before any feedback is sent.",
    stack: ["JavaScript"],
    year: "2026",
    // metric: "92% field accuracy",
    href: "https://github.com/mandlenkosii/The-Assess-to-Intervene-Colleague",
    repo: "https://github.com/mandlenkosii/The-Assess-to-Intervene-Colleague.git",
    image: "/projects/Asses-to-Intervene-colleague.png",
  },

  // {
  //   id: "proj-04",
  //   title: "Signal Router",
  //   summary:
  //     "Multi-agent orchestration layer that routes tasks between specialist agents based on live confidence scores.",
  //   stack: ["Python", "LangGraph", "Redis", "gRPC"],
  //   year: "2024",
  //   metric: "6 agents in production",
  //   href: "#",
  //   repo: "#",
  // },
];
