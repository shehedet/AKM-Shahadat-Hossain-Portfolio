import { useMemo, useState } from "react";
import {
  FolderOpen,
  Code2,
  BrainCircuit,
  FlaskConical,
  ArrowLeft,
  ExternalLink,
  Search,
  X,
  Layers,
  CalendarDays,
} from "lucide-react";
import "./Projects.css";

type Category = "All Projects" | "Software Engineering" | "AI & Machine Learning" | "Research";

type Project = {
  id: string;
  title: string;
  category: Exclude<Category, "All Projects">;
  date: string;
  description: string;
  stack: string[];
  highlights: string[];
  github: string;
  demo?: string;
};

const categories: {
  label: Category;
  icon: typeof FolderOpen;
}[] = [
  { label: "All Projects", icon: FolderOpen },
  { label: "Software Engineering", icon: Code2 },
  { label: "AI & Machine Learning", icon: BrainCircuit },
  { label: "Research", icon: FlaskConical },
];

const projects: Project[] = [
  {
    id: "see-menu",
    title: "SeeMenu",
    category: "Software Engineering",
    date: "Sep 2026 – Oct 2026",
    description:
      "A community-driven restaurant and food menu discovery platform designed for Bangladeshi food places.",
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "REST APIs",
      "Supabase",
      "PostgreSQL",
    ],
    highlights: [
      "Built responsive restaurant discovery, search, and filtering interfaces.",
      "Integrated Supabase authentication, email verification, and role-aware access for contributors, moderators, and admins.",
      "Designed a PostgreSQL schema for profiles, restaurants, menus, comments, votes, reports, and moderation workflows.",
      "Implemented menu image uploads, database-backed features, and moderation permissions.",
    ],
    github: "https://github.com/shehedet/SeeMenu",
    demo: "https://see-menu.vercel.app",
  },
  {
    id: "veggie-valley",
    title: "Veggie-Valley",
    category: "Software Engineering",
    date: "Aug 2025 – Sep 2025",
    description:
      "A full-stack marketplace connecting local produce growers with buyers through product listings, shopping carts, checkout, and order history.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "JWT",
      "Supabase Storage",
      "Tailwind CSS",
    ],
    highlights: [
      "Built authentication and REST APIs for product catalog, cart, and order management.",
      "Implemented role-based authorization to separate buyer and seller permissions.",
      "Designed MongoDB collections for users, products, and orders.",
      "Integrated sandbox payments with checkout, order confirmation, order history, and failure/retry flows.",
    ],
    github: "https://github.com/shehedet/Veggie-Valley",
    demo: "https://veggie-valley-final.vercel.app",
  },
  {
    id: "sugar-detection",
    title: "Ensemble Deep Learning with Mahalanobis-Based OOD Detection and Grad-CAM Explainability for Non-Destructive Sugar Adulteration Detection Using Smartphone RGB Imagery",
    category: "Research",
    date: "May 2025 – Apr 2026",
    description:
      "Undergraduate thesis. A hypertuned multimodal CNN architecture comprised of ResNet50, DenseNet121 and ConvNeXt-Tiny with XAI that classifies fresh sugar and adulterated sugar.",
    stack: [
      "Python",
      "PyTorch",
      "ResNet50",
      "DenseNet121",
      "ConvNeXt-Tiny",
      "scikit-learn",
      "NumPy",
      "Pandas",
    ],
    highlights: [
      "Developed a three-backbone ensemble that achieved 96.3% accuracy, compared with 90.6% for the strongest individual backbone.",
      "Captured and labelled 3,200 images across five classes and built the training, augmentation, and fine-tuning pipeline.",
      "Evaluated models using stratified five-fold evaluation.",
      "Explored Mahalanobis-distance-based out-of-distribution detection on previously unseen urea and saccharine adulterants.",
      "Integrated Grad-CAM to visualize image regions influencing predictions.",
    ],
    github:
      "https://github.com/shehedet/Ensemble-CNN-for-Sugar-Adulteration-Detection-with-OOD-Rejection-Grad-CAM",
  },
  {
    id: "aerial-detection",
    title: "Vehicles and Human Detection & Counting using YOLOv8s trained on Drone Images",
    category: "AI & Machine Learning",
    date: "May 2026",
    description:
      "A computer vision pipeline that detects and counts vehicles and pedestrians in drone footage, with frame-to-frame tracking to avoid counting the same object repeatedly.",
    stack: [
      "Python",
      "PyTorch",
      "YOLOv8s",
      "OpenCV",
      "NumPy",
      "Linux",
      "Git",
    ],
    highlights: [
      "Trained and evaluated an object detector on 8,629 annotated aerial images.",
      "Achieved 92% mAP@0.5 and reported 75 FPS inference on an NVIDIA RTX 4050.",
      "Tuned augmentation and detection settings for small, densely packed objects at varying altitudes.",
      "Implemented object tracking to support per-class vehicle and pedestrian counting across video frames.",
    ],
    github:
      "https://github.com/shehedet/Vehicle-and-Human-Detection-and-Counting-System-using-Drone-Images",
  },
  {
    id: "renal-tumor",
    title: "Cross-Modality Knowledge Transfer for Renal Tumor Detection",
    category: "Research",
    date: "Aug 2026 – Sep 2026",
    description:
      "Research into improving kidney tumor detection on non-contrast CT (NCCT) scans by investigating knowledge transfer from contrast-enhanced CT (CECT).",
    stack: ["Python", "PyTorch", "Pandas", "NumPy", "Matplotlib"],
    highlights: [
      "Investigated why machine learning models can perform poorly on NCCT compared with CECT scans.",
      "Explored cross-modality transfer learning from CECT to NCCT.",
      "Focused on improving the reliability of kidney tumor detection when contrast-enhanced scans are unavailable.",
    ],
    github:
      "https://github.com/shehedet/Kidney-Tumor-Detection-using-NCCT-Scans-KiTs19-",
  },
  {
    id: "breast-cancer",
    title: "A Multi-Cohort Evaluation of Machine Learning Generalisation Across RNA-seq and Microarray Platforms",
    category: "Research",
    date: "Mar 2026",
    description:
      "Multi-platform gene expression analysis for breast cancer detection. An evaluation of intra-cohort and inter-cohort generalization of machine learning models.",
    stack: ["Python", "PyTorch", "NumPy"],
    highlights: [
      "Studied variation in model performance across different gene-expression platforms and cohorts.",
      "Investigated challenges that affect cross-platform generalization.",
      "Explored systematic approaches for making results more consistent across datasets.",
    ],
    github:
      "https://github.com/shehedet/A-Multi-Cohort-Evaluation-of-Machine-Learning-Generalisation-Across-RNA-seq-and-Microarray-Platforms",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All Projects");
  const [search, setSearch] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All Projects" ||
        project.category === activeCategory;

      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...project.stack,
        ...project.highlights,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [activeCategory, search]);

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  const selectCategory = (category: Category) => {
    setActiveCategory(category);
    setSelectedProjectId(null);
  };

  return (
    <div className="projects-app">
      <aside className="projects-sidebar">
        <div className="projects-sidebar-heading">
          <FolderOpen size={17} />
          <span>Project Explorer</span>
        </div>

        <p className="projects-sidebar-label">CATEGORIES</p>

        <nav className="projects-navigation" aria-label="Project categories">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                type="button"
                key={category.label}
                className={`projects-nav-item ${
                  activeCategory === category.label ? "selected" : ""
                }`}
                onClick={() => selectCategory(category.label)}
              >
                <Icon size={16} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="projects-sidebar-footer">
          <BrainCircuit size={16} />
          <span>
            Exploring AI/ML, Data Science, Software Engineering, and research.
          </span>
        </div>
      </aside>

      <main className="projects-main">
        {selectedProject ? (
          <section className="project-detail">
            <button
              type="button"
              className="projects-back-button"
              onClick={() => setSelectedProjectId(null)}
            >
              <ArrowLeft size={15} />
              Back to projects
            </button>

            <p className="projects-eyebrow">{selectedProject.category}</p>
            <h2>{selectedProject.title}</h2>

            <div className="project-meta">
              <CalendarDays size={14} />
              <span>{selectedProject.date}</span>
            </div>

            <p className="project-description">
              {selectedProject.description}
            </p>

            <h3>Technology stack</h3>
            <div className="project-tech-list">
              {selectedProject.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <h3>Key contributions</h3>
            <ul className="project-highlights">
              {selectedProject.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <div className="project-links">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} />
                GitHub repository
              </a>

              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
                  Live demo
                </a>
              )}
            </div>
          </section>
        ) : (
          <section className="projects-list-view">
            <div className="projects-page-heading">
              <div className="projects-heading-icon">
                <Layers size={25} />
              </div>

              <div>
                <p className="projects-eyebrow">PORTFOLIO DIRECTORY</p>
                <h2>{activeCategory}</h2>
                <p className="projects-subtitle">
                  {projects.length} projects · Select one to explore its details
                </p>
              </div>
            </div>

            <label className="projects-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects or technologies..."
                aria-label="Search projects"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear project search"
                  onClick={() => setSearch("")}
                >
                  <X size={14} />
                </button>
              )}
            </label>

            <div className="projects-results-heading">
              <span>NAME</span>
              <span>CATEGORY</span>
            </div>

            <div className="projects-results">
              {filteredProjects.map((project) => {
                const Icon =
                  project.category === "Software Engineering"
                    ? Code2
                    : project.category === "Research"
                      ? FlaskConical
                      : BrainCircuit;

                return (
                  <button
                    type="button"
                    key={project.id}
                    className="project-row"
                    onClick={() => setSelectedProjectId(project.id)}
                  >
                    <span className="project-row-icon">
                      <Icon size={20} />
                    </span>

                    <span className="project-row-info">
                      <strong>{project.title}</strong>
                      <span>{project.date}</span>
                    </span>

                    <span className="project-row-category">
                      {project.category === "Software Engineering"
                        ? "Software"
                        : project.category === "AI & Machine Learning"
                          ? "AI / ML"
                          : "Research"}
                    </span>
                  </button>
                );
              })}

              {filteredProjects.length === 0 && (
                <div className="projects-empty-state">
                  <Search size={25} />
                  <strong>No projects found</strong>
                  <span>Try another search term or category.</span>
                </div>
              )}
            </div>

            <div className="projects-list-footer">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </section>
        )}
      </main>
    </div>
  );
}