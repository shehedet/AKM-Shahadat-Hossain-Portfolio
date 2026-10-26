
import { Download, ExternalLink, FileText } from "lucide-react";
import "./Resume.css";

const resumePdf = "/resume/A. K. M. Shahadat Hossain.pdf";

export default function Resume() {
  return (
    <div className="resume-app">
      <header className="resume-toolbar">
        <div className="resume-toolbar-title">
          <FileText size={18} />
          <span>My Resume</span>
        </div>

        <div className="resume-toolbar-actions">
          <a
            href={resumePdf}
            download="A. K. M. Shahadat Hossain.pdf"
            className="resume-action-button"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </a>

          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-action-button resume-open-button"
          >
            <ExternalLink size={15} />
            <span>Open PDF</span>
          </a>
        </div>
      </header>

      <main className="resume-content">
        <section className="resume-intro">
          <p className="resume-eyebrow">CURRICULUM VITAE</p>
          <h1>A. K. M. Shahadat Hossain</h1>
          <p className="resume-subtitle">
            Computer Science & Engineering Graduate
          </p>
          <p className="resume-description">
            Interested in software engineering, artificial intelligence,
            machine learning, data science, and research.
          </p>
        </section>

        <section className="resume-pdf-section">
          <div className="resume-pdf-heading">
            <FileText size={18} />
            <h2>Full Resume</h2>
          </div>

          <iframe
            src={`${resumePdf}#view=FitH`}
            title="A. K. M. Shahadat Hossain's Resume"
            className="resume-pdf-viewer"
          />
          <p className="resume-pdf-fallback">
            If the PDF doesn't appear, use Download PDF or Open PDF above.
          </p>
        </section>
      </main>
    </div>
  );
}
