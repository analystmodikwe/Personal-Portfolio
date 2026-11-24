import { useEffect, useState } from "react";
import { content } from "./data/content";

function Wave({ fill = "var(--foam)" }: { fill?: string }) {
  return (
    <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,42 C240,86 480,0 720,36 C960,72 1200,12 1440,44 L1440,80 L0,80 Z" fill={fill} />
    </svg>
  );
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label="Main navigation">
        <a className="brand" href="#hero-scene" aria-label="Lesedi, home">LM<span>.</span></a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <div id="primary-links" className={`nav-links${menuOpen ? " is-open" : ""}`}>
          {content.navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          {content.cv && <a className="button button-small" href={content.cv} download>{content.labels.downloadCv}</a>}
        </div>
      </nav>
    </header>
  );
}

function FeaturedWork() {
  return (
    <section className="section section-light" id="work">
      <Wave />
      <div className="container section-content">
        <p className="eyebrow">{content.featuredSection.eyebrow}</p>
        <h2 className="section-title">{content.featuredSection.title}</h2>
        <p className="section-intro">{content.featuredSection.intro}</p>
        <div className="featured-grid">
          {content.featured.map((project, index) => (
            <article className={`featured-card reveal${index === 0 ? " featured-card-primary" : ""}`} key={project.name}>
              <div className="project-visual" aria-hidden="true">
                <div className="device-frame">
                  <div className="device-top"><i /><i /><i /></div>
                  <div className="device-content">
                    <span className="device-mark">{project.name}</span>
                    <span className="device-line device-line-wide" />
                    <span className="device-line" />
                    <div className="device-panels"><i /><i /><i /></div>
                    <span className="device-action" />
                  </div>
                </div>
              </div>
              <div className="featured-copy">
                <p className="eyebrow">{content.featuredSection.caseStudy} {String(index + 1).padStart(2, "0")}</p>
                <h3>{project.name}</h3>
                <p className="project-summary">{project.summary}</p>
                <dl className="case-details">
                  {project.problem && <div><dt>{content.featuredSection.problemLabel}</dt><dd>{project.problem}</dd></div>}
                  {project.role && <div><dt>{content.featuredSection.roleLabel}</dt><dd>{project.role}</dd></div>}
                  {project.stack.length > 0 && <div><dt>{content.featuredSection.stackLabel}</dt><dd>{project.stack.join(", ")}</dd></div>}
                  {project.outcome && <div><dt>{content.featuredSection.outcomeLabel}</dt><dd>{project.outcome}</dd></div>}
                </dl>
                <div className="project-links">
                  {project.live && <a className="text-link" href={project.live} target="_blank" rel="noreferrer">{content.labels.liveProject} <span aria-hidden="true">↗</span></a>}
                  {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer">{content.labels.github} <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreProjects() {
  return (
    <section className="section section-dark" id="more-work">
      <Wave fill="var(--sea-deep)" />
      <div className="container section-content">
        <p className="eyebrow">{content.moreSection.eyebrow}</p>
        <h2 className="section-title">{content.moreSection.title}</h2>
        <ul className="project-list">
          {content.moreProjects.map((project) => (
            <li className="project-row reveal" key={project.name}>
              {project.image && (
                <img
                  className="project-thumb"
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  width={project.imageSize?.width}
                  height={project.imageSize?.height}
                  loading="lazy"
                />
              )}
              <div className="project-row-copy">
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
              <span className="project-tech">{project.stack}</span>
              <div className="project-links">
                {project.live && <a className="text-link" href={project.live} target="_blank" rel="noreferrer">{content.labels.live} <span aria-hidden="true">↗</span></a>}
                {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer">{content.labels.github} <span aria-hidden="true">↗</span></a>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section-light" id="about">
      <Wave />
      <div className="container about-layout section-content">
        <div className="reveal">
          <p className="eyebrow">{content.aboutSection.eyebrow}</p>
          <h2 className="section-title">{content.aboutSection.title}</h2>
          <p className="about-copy">{content.about}</p>
          <h3 className="looking-title">{content.aboutSection.lookingTitle}</h3>
          <p className="about-copy">{content.lookingFor}</p>
        </div>
        <aside className="facts-card reveal" aria-label="About Lesedi">
          <p className="eyebrow">{content.aboutSection.factsHeading}</p>
          {content.facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section section-dark" id="skills">
      <Wave fill="var(--sea-deep)" />
      <div className="container section-content">
        <p className="eyebrow">{content.skillsSection.eyebrow}</p>
        <h2 className="section-title">{content.skillsSection.title}</h2>
        <div className="skills-grid">
          {content.skills.map((group) => (
            <div className="skill-group reveal" key={group.name}>
              <h3>{group.name}</h3>
              <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowIWork() {
  return (
    <section className="section section-light" id="approach">
      <Wave />
      <div className="container section-content">
        <p className="eyebrow">{content.workSection.eyebrow}</p>
        <h2 className="section-title">{content.workSection.title}</h2>
        <ol className="steps">
          {content.steps.map((step, index) => (
            <li className="step reveal" key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const primaryEmail = content.emails[0];

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(primaryEmail);
      setCopyStatus(content.labels.copySuccess);
    } catch {
      setCopyStatus(content.labels.copyFailure);
    }
  }

  return (
    <section className="section section-dark contact-section" id="contact">
      <Wave fill="var(--sea-deep)" />
      <div className="container section-content reveal">
        <p className="eyebrow">{content.contactSection.eyebrow}</p>
        <h2 className="section-title">{content.contactSection.title}</h2>
        <p className="section-intro">{content.contactSection.intro}</p>
        <div className="contact-actions">
          {primaryEmail && <>
            <a className="button" href={`mailto:${primaryEmail}`}>{primaryEmail}</a>
            <button className="button button-outline" type="button" onClick={copyEmail}>{content.labels.copyEmail}</button>
          </>}
          {content.linkedin && <a className="button button-outline" href={content.linkedin} target="_blank" rel="noreferrer">{content.labels.linkedin} <span aria-hidden="true">↗</span></a>}
          {content.github && <a className="button button-outline" href={content.github} target="_blank" rel="noreferrer">{content.labels.github} <span aria-hidden="true">↗</span></a>}
          {content.cv && <a className="button button-outline" href={content.cv} download>{content.labels.downloadCv}</a>}
        </div>
        {content.emails.slice(1).map((email) => (
          <p className="alternate-email" key={email}>{content.labels.alsoReachable} <a href={`mailto:${email}`}>{email}</a></p>
        ))}
        <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-reveal");
    if (!("IntersectionObserver" in window)) {
      root.classList.remove("has-reveal");
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove("has-reveal");
    };
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <section className="hero" id="hero-scene">
          <div className="hero-scrim" aria-hidden="true" />
          <div className="container hero-content">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1>{content.hero.title}</h1>
            <p className="hero-subtitle">{content.hero.subtitle}</p>
            <div className="hero-actions">
              <a className="button" href="#work">{content.labels.seeMyWork}</a>
              {content.cv && <a className="button button-outline" href={content.cv} download>{content.labels.downloadCv}</a>}
            </div>
          </div>
          <a className="scroll-cue" href="#work">{content.labels.scrollToExplore} <span aria-hidden="true">↓</span></a>
        </section>
        <FeaturedWork />
        <MoreProjects />
        <About />
        <Skills />
        <HowIWork />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="#hero-scene">{content.footer.brand}<span>.</span></a>
          <p>{content.footer.copyright} {new Date().getFullYear()} — {content.footer.name}</p>
          <a className="text-link" href="#hero-scene">{content.footer.backToTop} ↑</a>
        </div>
      </footer>
    </>
  );
}
