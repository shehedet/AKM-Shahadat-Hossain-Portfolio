
import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";
import AppContent, { type AppId } from "../components/AppContent";
import {
  UserRound,
  FolderOpen,
  FileText,
  ContactRound,
  Search,
  Power,
  X,
  ChevronRight,
  Monitor,
  Minus,
  Square,
  Code2,
} from "lucide-react";
import "../App.css";

type WindowState = {
  id: AppId;
  title: string;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type AppInfo = {
  id: AppId;
  name: string;
  description: string;
  icon: typeof UserRound;
};

const apps: AppInfo[] = [
  {
    id: "about",
    name: "About Me",
    description: "My background, interests, and professional journey.",
    icon: UserRound,
  },
  {
    id: "projects",
    name: "Projects",
    description: "Explore my software engineering projects.",
    icon: FolderOpen,
  },
  {
    id: "skills",
    name: "Skills",
    description: "My technical skills, tools, and technologies.",
    icon: Code2,
  },
  {
    id: "resume",
    name: "Resume",
    description: "My experience, education, and technical skills.",
    icon: FileText,
  },
  {
    id: "contact",
    name: "Contact",
    description: "Get in touch and find my professional profiles.",
    icon: ContactRound,
  },
];

function DesktopExperience() {
  const [startOpen, setStartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [clock, setClock] = useState(new Date());
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: "about",
      title: "About Me",
      minimized: false,
      maximized: false,
      zIndex: 10,
      x: 100,
      y: 60,
      width: 640,
      height: 420,
    },
  ]);

  const [focusedWindow, setFocusedWindow] = useState<AppId | null>("about");
  const [nextZIndex, setNextZIndex] = useState(10);

  const openWindow = (app: AppInfo) => {
    const existingWindow = windows.find(
      (window) => window.id === app.id
    );

    if (existingWindow) {
      setWindows((current) =>
        current.map((window) =>
          window.id === app.id
            ? {
                ...window,
                minimized: false,
                zIndex: nextZIndex,
              }
            : window
        )
      );

      setFocusedWindow(app.id);
      setNextZIndex((current) => current + 1);
      return;
    }

    const offset = windows.length * 28;

    const newWindow: WindowState = {
      id: app.id,
      title: app.name,
      minimized: false,
      maximized: false,
      zIndex: nextZIndex,
      x: 100 + offset,
      y: 60 + offset,
      width: 640,
      height: 420,
    };

    setWindows((current) => [...current, newWindow]);
    setFocusedWindow(app.id);
    setNextZIndex((current) => current + 1);
  };

  const focusWindow = (id: AppId) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? { ...window, minimized: false, zIndex: nextZIndex }
          : window
      )
    );

    setFocusedWindow(id);
    setNextZIndex((current) => current + 1);
  };

  const openApp = (app: AppInfo) => {
    openWindow(app);
    setStartOpen(false);
    setSearch("");
  };

  const closeWindow = (id: AppId) => {
    setWindows((current) =>
      current.filter((window) => window.id !== id)
    );

    setFocusedWindow((current) => (current === id ? null : current));
  };

  const toggleMinimize = (id: AppId) => {
    const target = windows.find((window) => window.id === id);
    if (!target) return;

    if (!target.minimized && focusedWindow === id) {
      setWindows((current) =>
        current.map((window) =>
          window.id === id ? { ...window, minimized: true } : window
        )
      );

      setFocusedWindow(null);
    } else {
      focusWindow(id);
    }
  };

  const toggleMaximize = (id: AppId) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? { ...window, maximized: !window.maximized }
          : window
      )
    );

    focusWindow(id);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const dateText = clock.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeText = clock.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main
      className="desktop"
      onClick={() => {
        if (startOpen) setStartOpen(false);
      }}
    >
      <div className="desktop-icons">
        {apps.map((app) => {
          const Icon = app.icon;

          return (
            <button
              className="desktop-icon"
              key={app.id}
              onClick={(event) => {
                event.stopPropagation();
                openApp(app);
              }}
            >
              <Icon size={34} strokeWidth={1.5} />
              <span>{app.name}</span>
            </button>
          );
        })}
      </div>

      {windows.map((win) => {
        const app = apps.find((item) => item.id === win.id);
        if (!app) return null;

        const Icon = app.icon;

        return (
          <Rnd
            key={win.id}
            bounds=".desktop"
            dragHandleClassName="window-titlebar"
            minWidth={360}
            minHeight={240}
            position={{
              x: win.maximized ? 0 : win.x,
              y: win.maximized ? 0 : win.y,
            }}
            size={{
              width: win.maximized ? "100%" : win.width,
              height: win.maximized ? "100%" : win.height,
            }}
            disableDragging={win.maximized}
            enableResizing={!win.maximized}
            style={{
              zIndex: win.zIndex,
              display: win.minimized ? "none" : "block",
            }}
            onDragStart={() => focusWindow(win.id)}
            onDragStop={(_event, data) => {
              setWindows((current) =>
                current.map((window) =>
                  window.id === win.id
                    ? { ...window, x: data.x, y: data.y }
                    : window
                )
              );
            }}
            onResizeStart={() => focusWindow(win.id)}
            onResizeStop={(_event, _direction, ref, _delta, position) => {
              setWindows((current) =>
                current.map((window) =>
                  window.id === win.id
                    ? {
                        ...window,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        x: position.x,
                        y: position.y,
                      }
                    : window
                )
              );
            }}
          >
            <section
              className={`app-window ${
                win.maximized ? "window-maximized" : ""
              }`}
              aria-label={win.title}
              onMouseDown={() => focusWindow(win.id)}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="window-titlebar">
                <div className="window-title">
                  <Icon size={17} />
                  <span>{win.title}</span>
                </div>

                <div className="window-controls">
                  <button
                    className="window-control"
                    aria-label="Minimize window"
                    onClick={() => toggleMinimize(win.id)}
                  >
                    <Minus size={14} />
                  </button>

                  <button
                    className="window-control"
                    aria-label={
                      win.maximized ? "Restore window" : "Maximize window"
                    }
                    onClick={() => toggleMaximize(win.id)}
                  >
                    <Square size={12} />
                  </button>

                  <button
                    className="window-close"
                    aria-label="Close window"
                    onClick={() => closeWindow(win.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </header>

              <div className="window-content">
                <AppContent appId={win.id} />
              </div>
            </section>
          </Rnd>
        );
      })}

      {startOpen && (
        <section
          className="start-menu"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="start-profile">
            <div className="profile-avatar">
              <UserRound size={30} />
            </div>
            <div>
              <strong>Shahadat</strong>
              <span>CSE Graduate</span>
            </div>
          </div>

          <div className="start-search">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search programs and files"
              aria-label="Search applications"
            />
            <Search size={17} />
          </div>

          <div className="start-app-list">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => {
                const Icon = app.icon;

                return (
                  <button
                    className="start-app"
                    key={app.id}
                    onClick={() => openApp(app)}
                  >
                    <Icon size={24} />
                    <span>{app.name}</span>
                    <ChevronRight size={14} className="app-chevron" />
                  </button>
                );
              })
            ) : (
              <p className="no-results">No programs found.</p>
            )}
          </div>

          <div className="start-footer">
            <span>All programs</span>
            <button
              aria-label="Close Start menu"
              onClick={() => setStartOpen(false)}
            >
              <Power size={17} />
              <span>Close menu</span>
            </button>
          </div>
        </section>
      )}

      <footer
        className="taskbar"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={`start-button ${startOpen ? "start-active" : ""}`}
          aria-label="Open Start menu"
          aria-expanded={startOpen}
          onClick={() => setStartOpen((open) => !open)}
        >
          <span className="windows-orb">
            <span className="windows-mark">
              <span />
              <span />
              <span />
              <span />
            </span>
          </span>
        </button>

        <div className="taskbar-divider" />

        <div className="taskbar-apps">
          {windows.map((win) => {
            const app = apps.find((item) => item.id === win.id);
            if (!app) return null;

            const Icon = app.icon;

            return (
              <button
                key={win.id}
                className={`taskbar-app ${
                  focusedWindow === win.id && !win.minimized
                    ? "active-task"
                    : ""
                }`}
                title={win.title}
                aria-label={`Switch to ${win.title}`}
                onClick={() => toggleMinimize(win.id)}
              >
                <Icon size={23} />
              </button>
            );
          })}
        </div>

        <div className="system-tray">
          <div className="tray-status">
            <Monitor size={15} />
          </div>

          <button
            className="clock"
            aria-label={`Current time ${timeText}, ${dateText}`}
            title={dateText}
          >
            <span>{timeText}</span>
            <span>{dateText}</span>
          </button>

          <div className="show-desktop" title="Show desktop">
            <span />
          </div>
        </div>
      </footer>
    </main>
  );
}

export default DesktopExperience;
