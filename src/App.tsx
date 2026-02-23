import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Pwn from "./pages/Pwn";
import PwnDetail from "./pages/PwnDetail";
//import Notes from "./pages/Notes";
import Resources from "./pages/Resources";
//import NoteCapSysAdmin from "./pages/NoteCapSysAdmin";

const link = ({ isActive }: { isActive: boolean }) =>
  isActive ? "navlink navlink-active" : "navlink";

export default function App() {
  return (
    <BrowserRouter>
      <div className="site-bg min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--bg)]/75 backdrop-blur">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <NavLink to="/" className="text-base font-semibold tracking-tight">
              <span className="text-[var(--accent)]">&gt;_</span> Anas Khayar
            </NavLink>

            <nav className="flex gap-5 text-sm">
              <NavLink to="/projects" className={link}>Projects</NavLink>
              <NavLink to="/pwn" className={link}>Pwn</NavLink>
              {/* Si tu veux encore alléger: vire Resources du header et mets-le dans le footer */}
              <NavLink to="/resources" className={link}>Resources</NavLink>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            
            <Route path="/pwn" element={<Pwn />} />
            <Route path="/pwn/:slug" element={<PwnDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route
              path="*"
              element={
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold">404</h1>
                  <p className="text-white/70">Page not found.</p>
                  <NavLink to="/" className="underline hover:text-[var(--accent)]">
                    Back home
                  </NavLink>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 py-6 text-xs text-white/60">
            © {new Date().getFullYear()} Anas Khayar — Portfolio
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}