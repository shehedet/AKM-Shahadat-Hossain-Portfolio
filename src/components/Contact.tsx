
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { 
    SiGithub,
    SiFacebook,
} from "@icons-pack/react-simple-icons";
import { useState } from "react";
import "./Contact.css";

const email = "akm.hossain.shahadat@gmail.com";
const githubUrl = "https://github.com/shehedet";
const linkedinUrl = "https://www.linkedin.com/in/akmshahadathossain/";
const facebookUrl = "https://www.facebook.com/shohodot"

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="contact-app">
      <header className="contact-header">
        <p className="contact-eyebrow">GET IN TOUCH</p>
        <h1>Let's connect.</h1>
        <p>
          Have an opportunity, a project idea, or a research topic to discuss?
          Feel free to reach out.
        </p>
      </header>

      <main className="contact-content">
        <section className="contact-email-section">
          <div className="contact-section-heading">
            <Mail size={19} />
            <h2>Email</h2>
          </div>

          <div className="contact-email-row">
            <div className="contact-email-address">
              <span className="contact-label">Preferred contact</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>

            <button
              type="button"
              className="contact-copy-button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Copied" : "Copy email"}</span>
            </button>
          </div>
        </section>

        <section className="contact-profiles-section">
          <div className="contact-section-heading">
            <ExternalLink size={19} />
            <h2>Find me online</h2>
          </div>

          <a
            className="contact-profile-link"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-profile-icon">
              <SiGithub size={23} />
            </span>
            <span className="contact-profile-text">
              <strong>GitHub</strong>
              <span>Explore my projects and code</span>
            </span>
            <ArrowUpRight size={18} className="contact-profile-arrow" />
          </a>

          <a
            className="contact-profile-link"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-profile-icon contact-linkedin-icon">
              in
            </span>
            <span className="contact-profile-text">
              <strong>LinkedIn</strong>
              <span>Connect with me professionally</span>
            </span>
            <ArrowUpRight size={18} className="contact-profile-arrow" />
          </a>
          
            <a
            className="contact-profile-link"
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            >
                <span className="contact-profile-icon">
                    <SiFacebook size={23} color="#1877F2" />
                </span>
                <span className="contact-profile-text">
                    <strong>Facebook</strong>
                    <span>Find me on Facebook</span>
                </span>
                <ArrowUpRight size={18} className="contact-profile-arrow" />
            </a>
        </section>

        <a className="contact-compose-button" href={`mailto:${email}`}>
          <Mail size={17} />
          <span>Send me an email</span>
          <ArrowUpRight size={16} />
        </a>
      </main>

      <footer className="contact-footer">
        <span>Dhaka, Bangladesh</span>
        <span>Usually best reached by email</span>
      </footer>
    </div>
  );
}
