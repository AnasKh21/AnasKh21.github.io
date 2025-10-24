import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pwn from "./pages/Pwn";
import Notes from "./pages/Notes";
import Resources from "./pages/Resources";
import NoteCapSysAdmin from "./pages/NoteCapSysAdmin";

const link = ({ isActive }: { isActive: boolean }) =>
  "px-3 py-2 rounded " + (isActive ? "bg-[var(--accent)] text-black" : "hover:bg-white/10");

export default function App() {
  return (
    <BrowserRouter>
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-extrabold">
            <span className="text-[var(--accent)]">&gt;_</span> Anas Khayar
          </NavLink>
          <nav className="flex gap-2 text-sm">
            <NavLink to="/" className={link} end>Home</NavLink>
            <NavLink to="/projects" className={link}>Projects</NavLink>
            <NavLink to="/about" className={link}>About</NavLink>
            <NavLink to="/contact" className={link}>Contact</NavLink>
	    <NavLink to="/pwn" className={link}>PwnTheMachine</NavLink>
            <NavLink to="/notes" className={link}>Coding Notes</NavLink>
            <NavLink to="/resources" className={link}>Resources</NavLink>

          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
	<Routes>
  		<Route path="/" element={<Home />} />
  		<Route path="/projects" element={<Projects />} />
  		<Route path="/about" element={<About />} />
  		<Route path="/contact" element={<Contact />} />
		<Route path="/pwn" element={<Pwn />} />
		<Route path="/notes" element={<Notes />} />
		<Route path="/projects" element={<Projects />} />
		<Route path="/resources" element={<Resources />} />
    <Route path="/notes/cap-sys-admin" element={<NoteCapSysAdmin />} />
	</Routes>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-6 text-xs text-white/60">
          © {new Date().getFullYear()} Anas Khayar — Portfolio
        </div>
      </footer>
    </BrowserRouter>
  );
}
