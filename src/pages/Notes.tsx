import { Link } from "react-router-dom";

type Note = {
  title: string;
  bullets?: string[];
  href?: string;     // optionnel: lien vers une note détaillée
  desc?: string;     // optionnel: petit résumé
};

const sections: { area: string; notes: Note[] }[] = [
  {
    area: "TypeScript / React",
    notes: [
      { title: "Component patterns", bullets: ["Props vs. context", "Memoization dos/don’ts", "Keys on lists"] },
      { title: "Router hygiene", bullets: ["SPA 404 on GH Pages", "Code-splitting routes"] },
    ],
  },
  {
    area: "Python",
    notes: [
      { title: "CLI ergonomics", bullets: ["argparse vs. typer", "logging config", "virtualenv tips"] },
      { title: "Security", bullets: ["venv integrity", "pinning deps", "bandit checks"] },
    ],
  },
  {
    area: "Rust / C (safety)",
    notes: [
      { title: "Memory safety basics", bullets: ["RAII", "Lifetimes 101", "UB traps in C"] },
    ],
  },
  {
    area: "Security",
    notes: [
      {
        title: "Docker — CAP_SYS_ADMIN (defensive brief)",
        desc: "Risk, detection signals, and mitigations for overly-privileged containers. No exploit steps.",
        href: "/notes/cap-sys-admin",
      },
    ],
  },
];

export default function Notes() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Coding Notes</h1>
        <p className="text-white/75">Short, practical notes I actually reuse. Security notes are defensive-only.</p>
      </header>

      {/* Featured card (Security brief) */}
      <Featured />

      {/* Regular sections */}
      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <article
            key={s.area}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition
                       hover:border-[var(--accent)] hover:bg-white/[0.04]"
          >
            <h3 className="font-semibold">{s.area}</h3>

            <ul className="mt-3 space-y-4 text-sm text-white/80">
              {s.notes.map((n) => (
                <li key={n.title}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{n.title}</p>
                    {n.href && (
                      <Link
                        to={n.href}
                        className="text-xs underline decoration-white/30 hover:text-[var(--accent)]"
                      >
                        Open
                      </Link>
                    )}
                  </div>

                  {n.desc && <p className="mt-1 text-white/60">{n.desc}</p>}

                  {n.bullets && (
                    <ul className="mt-2 list-disc list-inside text-white/70">
                      {n.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ——— small featured strip for the CAP_SYS_ADMIN note ——— */
function Featured() {
  return (
    <Link
      to="/notes/cap-sys-admin"
      className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 relative overflow-hidden
                 hover:border-[var(--accent)] transition"
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute -top-20 -right-24 h-64 w-64 rounded-full bg-[var(--accent)]/15 blur-3xl" />
      <div className="relative">
        <p className="text-xs text-white/60">Security brief</p>
        <h2 className="text-xl font-semibold mt-1">Docker — CAP_SYS_ADMIN (defensive)</h2>
        <p className="text-white/70 mt-1 text-sm max-w-2xl">
          Why it’s dangerous, what to monitor (mounts, cgroups, namespaces), and how to mitigate (drop caps, LSM, seccomp).
        </p>
        <span className="mt-3 inline-block text-xs text-white/60 underline decoration-white/30">
          Read the note →
        </span>
      </div>
    </Link>
  );
}
