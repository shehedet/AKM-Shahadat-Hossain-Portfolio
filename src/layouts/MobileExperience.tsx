
import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Download,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { 
    SiGithub,
} from "@icons-pack/react-simple-icons";

import AppContent, { type AppId } from "../components/AppContent";
import "./MobileExperience.css";

const navigation: { label: string; id: AppId }[] = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

function MobileExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="mobile-experience">
      <header className="mobile-header">
        <a
          className="mobile-brand"
          href="#mobile-home"
          onClick={closeMenu}
          aria-label="Go to home"
        >
          <span className="mobile-brand-icon">
            <Code2 size={21} />
          </span>

          <span>
            <strong>A. K. M. Shahadat Hossain</strong>
            <small>Personal Portfolio</small>
          </span>
        </a>

        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {menuOpen && (
          <nav className="mobile-menu" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#mobile-${item.id}`}
                onClick={closeMenu}
              >
                {item.label}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <div className="mobile-page">
        <section className="mobile-hero" id="mobile-home">
          <p className="mobile-eyebrow">
            COMPUTER SCIENCE &amp; ENGINEERING
          </p>

          <h1>
            Hi, I'm
            <br />
            <span>Shahadat.</span>
          </h1>

          <p className="mobile-hero-description">
            A CSE graduate from BRAC University, interested in
            building useful software and exploring AI, machine learning,
            and research.
          </p>

          <div className="mobile-hero-actions">
            <a className="mobile-primary-action" href="#mobile-projects">
              Explore my work
              <ArrowDown size={17} />
            </a>

            <a
              className="mobile-secondary-action"
              href="/resume/Shahadat-Hossain-CV.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume
              <Download size={16} />
            </a>
          </div>

          <div className="mobile-social-links">
            <a
              href="https://github.com/shehedet"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <SiGithub size={19} />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/akmshahadathossain/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <ExternalLink size={19} />
              <span>LinkedIn</span>
            </a>
          </div>
        </section>

        {navigation.map((item) => (
          <section
            className={`mobile-content-section mobile-section-${item.id}`}
            id={`mobile-${item.id}`}
            key={item.id}
          >
            <div className="mobile-section-heading">
              <span className="mobile-section-marker" />
              <h2>{item.label}</h2>
            </div>

            <div className="mobile-section-body">
              <AppContent appId={item.id} />
            </div>
          </section>
        ))}

        <footer className="mobile-footer">
          <a href="#mobile-home">Back to top ↑</a>
          <p>Designed with a little Aero nostalgia.</p>
          <p>© {new Date().getFullYear()} Shahadat Hossain</p>
        </footer>
      </div>
    </main>
  );
}

export default MobileExperience;
