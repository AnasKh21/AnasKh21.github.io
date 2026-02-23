import { useMemo, useState } from "react";

/* =========================
   TYPES
========================= */

type Project = {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  stack: string[];
  cover?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

/* =========================
   STACK LOGOS MAPPING
========================= */

const STACK_LOGOS: Record<string, string> = {
  React: "/images/logo_react.png",
  JavaScript: "/images/js_logo.png",
  Python: "/images/python_logo.png",
  Java: "/images/java_logo.png",
  C: "/images/logo_c.png",
  Docker: "/images/logo_docker.png",
  AWS: "/images/aws_logo.png",
  Rust: "/images/logo_rust.png",
  Solidity: "/images/solidity_logo.png",
  SpringBoot: "/images/logo_springboot.png",
  Vite :"images/logo_vite.png"
};

/* =========================
   PROJECTS DATA
========================= */

const ALL: Project[] = [
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    oneLiner: "Full-stack online store with auth and admin dashboard.",
    description:
      "Built with React and Node.js, including authentication, product management and order flow.",
    stack: ["React", "SpringBoot", "Java", "Docker"],
    cover: "/projects/cover_ecommerce_store.png",
    repoUrl: "#",
    featured: true,
  },
  {
    id: "cve-explorer",
    title: "CVE Explorer",
    oneLiner: "Security-focused vulnerability search interface.",
    description:
      "Web app to explore CVEs with filtering and clean UI presentation.",
    stack: ["React", "SpringBoot","Vite"],
    cover: "/projects/cve_explorer_cover.png",
    repoUrl: "#",
  },
];

/* =========================
   MAIN COMPONENT
========================= */

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const list = useMemo(() => {
    if (filter === "featured") return ALL.filter((p) => p.featured);
    return ALL;
  }, [filter]);

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Projects
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Selected work and experiments.
          </p>
        </div>

        <div className="flex gap-2">
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All
          </FilterButton>
          <FilterButton
            active={filter === "featured"}
            onClick={() => setFilter("featured")}
          >
            Featured
          </FilterButton>
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className="project-card text-left group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden focus:outline-none focus:border-[var(--accent)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              {p.cover ? (
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="project-cover h-full w-full object-cover opacity-90"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/10" />
              )}
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-1 text-sm text-white/70">{p.oneLiner}</p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                {p.stack.map((tech) => (
                  <TechBubble key={tech} label={tech} />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

/* =========================
   FILTER BUTTON
========================= */

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition border ${
        active
          ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
          : "border-white/10 text-white/70 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/* =========================
   TECH BUBBLE
========================= */

function TechBubble({ label }: { label: string }) {
  const src = STACK_LOGOS[label];

  return (
    <span className="tech-wrap">
      <span className="tech-bubble">
        {src ? (
          <img src={src} alt={label} className="tech-img" />
        ) : (
          <span className="tech-fallback">
            {label.slice(0, 3).toUpperCase()}
          </span>
        )}
      </span>
      <span className="tech-tip">{label}</span>
    </span>
  );
}

/* =========================
   MODAL
========================= */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        className="modal-panel max-w-3xl w-full rounded-2xl border border-white/10 bg-[#0f1117] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">{project.title}</h2>
        <p className="mt-2 text-sm text-white/70">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <TechBubble key={tech} label={tech} />
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} className="btn btn-primary">
              Live
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} className="btn">
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}