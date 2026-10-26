
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Code2,
  ContactRound,
  FileText,
  FolderOpen,
  Home,
  UserRound,
} from "lucide-react";
import AppContent, { type AppId } from "../components/AppContent";
import "./TabletExperience.css";

type TabletApp = {
  id: AppId;
  name: string;
  description: string;
  icon: typeof UserRound;
};

const apps: TabletApp[] = [
  {
    id: "about",
    name: "About Me",
    description: "A little about my background.",
    icon: UserRound,
  },
  {
    id: "projects",
    name: "Projects",
    description: "Things I've built and researched.",
    icon: FolderOpen,
  },
  {
    id: "skills",
    name: "Skills",
    description: "Technologies and tools I use.",
    icon: Code2,
  },
  {
    id: "resume",
    name: "Resume",
    description: "Education and experience.",
    icon: FileText,
  },
  {
    id: "contact",
    name: "Contact",
    description: "Get in touch with me.",
    icon: ContactRound,
  },
];

function TabletExperience() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const monthStart = new Date(
    clock.getFullYear(),
    clock.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    clock.getFullYear(),
    clock.getMonth() + 1,
    0
  ).getDate();

  const calendarCells = [
    ...Array.from({ length: monthStart }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const timeText = clock.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateText = clock.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const monthText = clock.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const openApp = (id: AppId) => {
    setActiveApp(id);
  };

  const goBack = () => {
    if (activeApp !== null) {
      setActiveApp(null);
    }
  };

  const goHome = () => {
    setActiveApp(null);
  };

  const activeAppInfo = apps.find((app) => app.id === activeApp);

  return (
    <main className="tablet-experience">
      <header className="tablet-statusbar">
        <div className="tablet-status-left">
          <span>{dateText}</span>
        </div>

        <div className="tablet-active-title">
          {activeAppInfo?.name ?? ""}
        </div>

        <div className="tablet-status-right">
          <span className="tablet-status-dot" aria-hidden="true" />
          <span>{timeText}</span>
        </div>
      </header>

      <section
        className={`tablet-workspace ${
          activeApp ? "tablet-workspace-app" : "tablet-workspace-home"
        }`}
      >
        {activeApp === null ? (
          <div className="tablet-home">
            <div className="tablet-welcome">
              <p className="tablet-eyebrow">PERSONAL PORTFOLIO</p>
              <h1>A. K. M. Shahadat Hossain</h1>
            </div>

            <div className="tablet-home-layout">
              <section
                className="tablet-calendar"
                aria-label="Monthly calendar"
              >
                <div className="tablet-calendar-heading">
                  <div className="tablet-calendar-icon">
                    <CalendarDays size={21} />
                  </div>
                  <div>
                    <h2>{monthText}</h2>
                    <p>Your calendar</p>
                  </div>
                </div>

                <div className="tablet-calendar-grid">
                  {["S", "M", "T", "W", "T", "F", "S"].map(
                    (day, index) => (
                      <span
                        className="tablet-weekday"
                        key={`${day}-${index}`}
                      >
                        {day}
                      </span>
                    )
                  )}

                  {calendarCells.map((day, index) => (
                    <span
                      key={index}
                      className={`tablet-calendar-day ${
                        day === clock.getDate()
                          ? "tablet-calendar-today"
                          : ""
                      }`}
                    >
                      {day ?? ""}
                    </span>
                  ))}
                </div>

                <div className="tablet-calendar-footer">
                  {clock.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </section>

              <section className="tablet-app-launcher">
                <div className="tablet-section-heading">
                  <h2>Applications</h2>
                  <span>{apps.length} apps</span>
                </div>

                <div className="tablet-app-grid">
                  {apps.map((app) => {
                    const Icon = app.icon;

                    return (
                      <button
                        key={app.id}
                        className="tablet-app-icon"
                        onClick={() => openApp(app.id)}
                        aria-label={`Open ${app.name}`}
                      >
                        <span className={`tablet-icon-tile tablet-icon-${app.id}`}>
                          <Icon size={31} strokeWidth={1.6} />
                        </span>
                        <span className="tablet-app-name">{app.name}</span>
                        <span className="tablet-app-description">
                          {app.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        ) : (
          <section className="tablet-app-screen">
            <div className="tablet-app-toolbar">
              <button
                className="tablet-app-back"
                onClick={goBack}
                aria-label="Back to home screen"
              >
                <ArrowLeft size={18} />
                <span>Back to apps</span>
              </button>

              <span className="tablet-app-toolbar-title">
                {activeAppInfo?.name}
              </span>
            </div>

            <div className="tablet-app-content">
              <AppContent appId={activeApp} />
            </div>
          </section>
        )}
      </section>

      <nav className="tablet-navigation" aria-label="System navigation">
        <button
          className="tablet-nav-button"
          onClick={goBack}
          disabled={activeApp === null}
          aria-label="Back"
          title="Back"
        >
          <ArrowLeft size={21} />
          <span>Back</span>
        </button>

        <button
          className={`tablet-home-button ${
            activeApp === null ? "tablet-home-button-active" : ""
          }`}
          onClick={goHome}
          aria-label="Home"
          title="Home"
        >
          <Home size={21} />
          <span>Home</span>
        </button>
      </nav>
    </main>
  );
}

export default TabletExperience;
