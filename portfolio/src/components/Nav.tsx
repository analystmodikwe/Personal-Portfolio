import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-void/80 backdrop-blur-md border-b border-edge" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        {/* <a href="#top" className="font-mono text-sm tracking-tight text-ink">
          <span className="text-signal">&gt;</span> engineer.ai
        </a> */}
        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-mute">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-ink transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-widest border border-edge px-4 py-2 rounded-full hover:border-signal hover:text-signal transition-colors"
        >
          say hi
        </a>
      </nav>
    </header>
  );
}
