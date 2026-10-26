
import { useEffect, useState } from "react";
import DesktopExperience from "./layouts/DesktopExperience";
import TabletExperience from "./layouts/TabletExperience";
import MobileExperience from "./layouts/MobileExperience";

type LayoutMode = "desktop" | "tablet" | "mobile";

function getLayoutMode(): LayoutMode {
  if (window.matchMedia("(max-width: 767px)").matches) {
    return "mobile";
  }

  if (window.matchMedia("(max-width: 1100px)").matches) {
    return "tablet";
  }

  return "desktop";
}

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(
    getLayoutMode
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1100px)");

    const updateLayout = () => {
      setLayoutMode(getLayoutMode());
    };

    mediaQuery.addEventListener("change", updateLayout);

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    mobileQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
      mobileQuery.removeEventListener("change", updateLayout);
    };
  }, []);
  
  if (layoutMode === "mobile") {
    return <MobileExperience />;
  }

  if (layoutMode === "tablet") {
    return <TabletExperience />;
  }

  return <DesktopExperience />;
}

export default App;
