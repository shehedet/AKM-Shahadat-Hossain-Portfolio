
// import { useEffect, useState } from "react";
// import DesktopExperience from "./layouts/DesktopExperience";
// import TabletExperience from "./layouts/TabletExperience";
// import MobileExperience from "./layouts/MobileExperience";

// type LayoutMode = "desktop" | "tablet" | "mobile";

// function getLayoutMode(): LayoutMode {
//   if (window.matchMedia("(max-width: 767px)").matches) {
//     return "mobile";
//   }

//   if (window.matchMedia("(max-width: 1100px)").matches) {
//     return "tablet";
//   }

//   return "desktop";
// }

// function LayoutDiagnostic({ mode }: { mode: LayoutMode }) {
//   const [viewport, setViewport] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const updateViewport = () => {
//       setViewport({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", updateViewport);

//     return () => {
//       window.removeEventListener("resize", updateViewport);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 8,
//         right: 8,
//         zIndex: 99999,
//         padding: "10px 12px",
//         background: "#202020",
//         color: "#ffffff",
//         border: "1px solid #8AC6D1",
//         borderRadius: 6,
//         fontFamily: "monospace",
//         fontSize: 12,
//         lineHeight: 1.6,
//         pointerEvents: "none",
//       }}
//     >
//       <div>Layout: {mode}</div>
//       <div>
//         Viewport: {viewport.width} × {viewport.height}
//       </div>
//       <div>
//         Mobile query:{" "}
//         {window.matchMedia("(max-width: 767px)").matches
//           ? "MATCH"
//           : "NO MATCH"}
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [layoutMode, setLayoutMode] = useState<LayoutMode>(
//     getLayoutMode
//   );

//   console.log("Viewport width:", window.innerWidth);
//   console.log("Selected layout:", layoutMode);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 1100px)");

//     const updateLayout = () => {
//       setLayoutMode(getLayoutMode());
//     };

//     mediaQuery.addEventListener("change", updateLayout);

//     const mobileQuery = window.matchMedia("(max-width: 767px)");
//     mobileQuery.addEventListener("change", updateLayout);

//     return () => {
//       mediaQuery.removeEventListener("change", updateLayout);
//       mobileQuery.removeEventListener("change", updateLayout);
//     };
//   }, []);
  
//   if (layoutMode === "mobile") {
//     return <MobileExperience />;
//   }

//   if (layoutMode === "tablet") {
//     return <TabletExperience />;
//   }

//   return <DesktopExperience />;
// }

// export default App;

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

function LayoutDiagnostic({ mode }: { mode: LayoutMode }) {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [mobileQuery, setMobileQuery] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setMobileQuery(
        window.matchMedia("(max-width: 767px)").matches
      );
    };

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        right: 8,
        zIndex: 99999,
        padding: "10px 12px",
        background: "#202020",
        color: "#ffffff",
        border: "1px solid #8AC6D1",
        borderRadius: 6,
        fontFamily: "monospace",
        fontSize: 12,
        lineHeight: 1.6,
        pointerEvents: "none",
      }}
    >
      <div>Layout: {mode}</div>
      <div>
        Viewport: {viewport.width} × {viewport.height}
      </div>
      <div>
        Mobile query: {mobileQuery ? "MATCH" : "NO MATCH"}
      </div>
    </div>
  );
}

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(
    getLayoutMode
  );

  useEffect(() => {
    const updateLayout = () => {
      setLayoutMode(getLayoutMode());
    };

    const tabletQuery = window.matchMedia("(max-width: 1100px)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    tabletQuery.addEventListener("change", updateLayout);
    mobileQuery.addEventListener("change", updateLayout);

    return () => {
      tabletQuery.removeEventListener("change", updateLayout);
      mobileQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  return (
    <>
      <LayoutDiagnostic mode={layoutMode} />

      {layoutMode === "mobile" ? (
        <MobileExperience />
      ) : layoutMode === "tablet" ? (
        <TabletExperience />
      ) : (
        <DesktopExperience />
      )}
    </>
  );
}

export default App;
