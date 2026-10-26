
import { useState } from "react";
import {
  UserRound,
  GraduationCap,
  Code2,
  BrainCircuit,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import "./AboutMe.css";

type Section = "overview" | "education" | "interests";

const sections: {
  id: Section;
  label: string;
  icon: typeof UserRound;
}[] = [
  { id: "overview", label: "Overview", icon: UserRound },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "interests", label: "Interests", icon: BrainCircuit },
];

export default function AboutMe() {
  const [activeSection, setActiveSection] =
    useState<Section>("overview");

  return (
    <div className="about-me">
      <aside className="about-sidebar">
        <div className="about-sidebar-heading">
          <UserRound size={17} />
          <span>Personal Details</span>
        </div>

        <nav
          className="about-navigation"
          aria-label="Profile sections"
        >
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                type="button"
                className={`about-nav-item ${
                  activeSection === section.id ? "selected" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={16} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="about-sidebar-footer">
          <span className="about-status-dot" />
          <span>Available for opportunities</span>
        </div>
      </aside>

      <main className="about-main">
        {activeSection === "overview" && (
          <section className="about-section">
            <div className="about-page-heading">
              <div className="about-avatar">
                <UserRound size={38} strokeWidth={1.4} />
              </div>

              <div>
                <p className="about-eyebrow">
                  WELCOME TO MY PROFILE
                </p>
                <h2>Hi, I'm A. K. M. Shahadat Hossain.</h2>
                <p className="about-subtitle">
                  Computer Science & Engineering Graduate
                </p>
              </div>
            </div>

            <div className="about-separator" />

            <h3>About me</h3>
            <p>
              I am a Computer Science and Engineering (CSE) graduate from
              BRAC University with a strong academic foundation and
              a growing passion for Machine Learning and Software Engineering.
            </p>

            <p>
              My current focus lies in software development, machine learning,
              and applied AI research. I thrive on solving complex problems,
              learning emerging technologies, and combining analytical thinking
              with creativity to deliver practical solutions.
            </p>

            <div className="about-info-strip">
              <MapPin size={16} />
              <span>Dhaka, Bangladesh</span>
            </div>

            <h3 className="about-subheading">Find me online</h3>

            <div className="about-social-links">
                <a
                href="https://github.com/shehedet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                >
                    <SiGithub size={17} />
                    <span>GitHub</span>
                    <ExternalLink size={13} />
                </a>

                
                <a
                href="https://www.linkedin.com/in/akmshahadathossain/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
                >
                    <span className="linkedin-mark" aria-hidden="true">
                        in
                    </span>
                    <span>LinkedIn</span>
                    <ExternalLink size={13} />
                </a>
            </div>
          </section>
        )}

        {activeSection === "education" && (
          <section className="about-section">
            <p className="about-eyebrow">ACADEMIC BACKGROUND</p>
            <h2>Education</h2>

            <div className="about-timeline">
              <div className="about-timeline-item">
                <span className="about-timeline-marker" />

                <div>
                  <h3>
                    B.Sc. in Computer Science and Engineering
                  </h3>
                  <p className="about-muted">BRAC University (2022 - 2026)</p>
                  <p className="about-detail">
                    CGPA: 3.59 / 4.00
                  </p>
                </div>
              </div>

              <div className="about-timeline-item">
                <span className="about-timeline-marker" />

                <div>
                  <h3>Higher Secondary Certificate (HSC)</h3>
                  <p className="about-muted">
                    St. Joseph Higher Secondary School (2019 - 2021)
                  </p>
                  <p className="about-detail">
                    GPA: 5.00 / 5.00
                  </p>
                </div>
              </div>

              <div className="about-timeline-item">
                <span className="about-timeline-marker" />

                <div>
                  <h3>Secondary School Certificate (SSC)</h3>
                  <p className="about-muted">
                    St. Joseph Higher Secondary School (2011 - 2019)
                  </p>
                  <p className="about-detail">
                    GPA: 5.00 / 5.00
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "interests" && (
          <section className="about-section">
            <p className="about-eyebrow">WHAT I'M EXPLORING</p>
            <h2>Areas of interest</h2>

            <p>
              I'm interested in combining strong software engineering
              fundamentals with practical applications of AI.
            </p>

            <div className="about-interest">
              <Code2 size={22} />

              <div>
                <h3>Software Engineering</h3>
                <p>
                  Full-stack applications, REST APIs, database design,
                  and maintainable software.
                </p>
              </div>
            </div>

            <div className="about-interest">
              <BrainCircuit size={22} />

              <div>
                <h3>AI & Machine Learning</h3>
                <p>
                  Deep learning, image processing, computer vision, model evaluation,
                  explainable AI, and data science.
                </p>
              </div>
            </div>

            <div className="about-interest">
              <GraduationCap size={22} />

              <div>
                <h3>Research & Continuous Learning</h3>
                <p>
                  Exploring research questions, experimenting with
                  models, and developing new technical skills.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
