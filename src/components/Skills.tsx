
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiGit,
  SiGithub,
  SiLinux,
  SiVite,
  SiTailwindcss,
} from "@icons-pack/react-simple-icons";
import {
  Database,
  ChartNoAxesCombined,
  BrainCircuit,
  Wrench,
} from "lucide-react";
import "./Skills.css";

type Skill = {
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
};

type SkillGroup = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    id: "software",
    title: "Software Engineering",
    description: "Building web applications and APIs",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#D6A800" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: SiReact, color: "#149ECA" },
      { name: "Node.js", icon: SiNodedotjs, color: "#43853D" },
      { name: "Express", icon: SiExpress, color: "#555555" },
      { name: "Vite", icon: SiVite, color: "#8B6BE8" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06A6C8" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "MongoDB", icon: SiMongodb, color: "#419B46" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Model development, evaluation, and computer vision",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF8F00" },
      {
        name: "Scikit-learn",
        icon: SiScikitlearn,
        color: "#D58A28",
      },
      {
        name: "Computer Vision",
        icon: BrainCircuit,
        color: "#6E72B8",
      },
    ],
  },
  {
    id: "data",
    title: "Data Science",
    description: "Data preparation, analysis, and visualization",
    skills: [
      { name: "Pandas", icon: SiPandas, color: "#7952B3" },
      { name: "NumPy", icon: SiNumpy, color: "#4D77CF" },
      {
        name: "Data Visualization",
        icon: ChartNoAxesCombined,
        color: "#398A80",
      },
      {
        name: "SQL",
        icon: Database,
        color: "#477AA3",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    description: "Development environments and version control",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#303030" },
      { name: "Linux", icon: SiLinux, color: "#D6A800" },
      { name: "Jupyter", icon: SiJupyter, color: "#E87528" },
      { name: "Developer Tools", icon: Wrench, color: "#687B7B" },
    ],
  },
];

export default function Skills() {
  return (
    <div className="skills-app">
      <header className="skills-header">
        <p className="skills-eyebrow">TECHNICAL TOOLKIT</p>
        <h1>Skills & Technologies</h1>
        <p>
          The tools and technologies I use to build software, explore data,
          and develop machine learning solutions.
        </p>
      </header>

      <main className="skills-groups">
        {skillGroups.map((group) => (
          <section className="skills-group" key={group.id}>
            <div className="skills-group-heading">
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <span className="skills-count">
                {group.skills.length} skills
              </span>
            </div>

            <div className="skills-grid">
              {group.skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div className="skill-item" key={skill.name}>
                    <div className="skill-icon">
                      <Icon size={25} color={skill.color} />
                    </div>
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
