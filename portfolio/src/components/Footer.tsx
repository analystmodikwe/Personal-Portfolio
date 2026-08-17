export default function Footer() {
  return (
    <footer className="border-t border-edge px-6 md:px-10 py-8">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-mute">
        <p>© {new Date().getFullYear()} — built with React, TypeScript &amp; Tailwind.</p>
        <p className="text-mute/70">back to top ↑</p>
      </div>
    </footer>
  );
}
