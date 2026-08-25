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
    title: "New Body — Nutrition & Meal Planner",
    summary:
      "web app that calculates personalised daily calorie, macro, and water targets for losing fat while building muscle",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2026",
    // metric: "40ms p95 retrieval",
    href: "https://body-goals-green.vercel.app/",
    repo: "https://github.com/analystmodikwe/Body-Goals.git",
    image: "/projects/new-body.png"
  },
  {
    id: "proj-02",
    title: "Company-Project-1",
    summary:
      "Redesigning an outdated website using React and Tailwind CSS",
    stack: ["JavaScript", "React.js", "TailWind"],
    year: "2026",
    // metric: "92% field accuracy",
    href: "https://mokoena-tt-holdings.netlify.app/",
    repo: "https://github.com/analystmodikwe/Company-Project-1.git",
    image: "/projects/website.png"
  },
  {                                                                 
    id: "proj-03",
    title: "Mangement DashBoard",
    summary:
      " management dashboard to. Track projects, manage tasks, monitor deadlines, and visualize progress — all in a fast, responsive UI.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    year: "2024",
    // metric: "3x faster eval cycle",
    href: "https://claude-project-management-dashboard-mu.vercel.app/",
    repo: "https://github.com/analystmodikwe/company-project2-project-management-dashboard.git",
    image: "/projects/dashbord.png"
  },
  {
    id: "proj-04",
    title: "Signal Router",
    summary:
      "Multi-agent orchestration layer that routes tasks between specialist agents based on live confidence scores.",
    stack: ["Python", "LangGraph", "Redis", "gRPC"],
    year: "2024",
    metric: "6 agents in production",
    href: "#",
    repo: "#",
  },
  {
    id: "proj-05",
    title: "Pixel Loom",
    summary:
      "Diffusion-based texture synthesis tool for indie game artists, packaged as a lightweight desktop app.",
    stack: ["Rust", "Tauri", "Stable Diffusion", "ONNX"],
    year: "2023",
    metric: "4.8★, 2k+ downloads",
    href: "#",
    repo: "#",
  },
];
