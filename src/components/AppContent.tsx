
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Resume from "./Resume";
import Skills from "./Skills";
import Contact from "./Contact";

export type AppId =
  | "about"
  | "projects"
  | "resume"
  | "skills"
  | "contact";

type AppContentProps = {
  appId: AppId;
};

function AppContent({ appId }: AppContentProps) {
  switch (appId) {
    case "about":
      return <AboutMe />;
    case "projects":
      return <Projects />;
    case "resume":
      return <Resume />;
    case "skills":
      return <Skills />;
    case "contact":
      return <Contact />;
    default:
      return null;
  }
}

export default AppContent;
