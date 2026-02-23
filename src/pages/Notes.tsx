// src/pages/Notes.tsx
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

type Tag = "Security" | "Reverse" | "Python" | "Web" | "DevOps" | "Linux" | "Windows" | "CTF" | "Cloud";

type Note = {
  id: string;
  title: string;
  desc: string;
  track: string;
  tags: Tag[];
  level?: "Beginner" | "Intermediate" | "Advanced";
  readTime?: string;
  href?: string;
  featured?: boolean;
};

const tracks = [
  { kind: "security" as const, name: "Container Safety", subtitle: "Hardening & least privilege", tone: "Defensive" },
  { kind: "reverse" as const, name: "Reverse Engineering", subtitle: "Static & dynamic basics", tone: "Method" },
  { kind: "python" as const, name: "Python Scripts", subtitle: "Reusable tooling", tone: "Practical" },
  { kind: "web" as const, name: "Web Security", subtitle: "Defensive checklists", tone: "Blue-team" },
] as const;

/**
 * Keep only a handful of relevant notes.
 * Add more later when you actually have content pages.
 */
const notes: Note[] = [
  {
    id: "cap-sys-admin",
    title: "Docker — CAP_SYS_ADMIN (defensive brief)",
    desc: "Risks, detection signals, and mitigations for privileged containers.",
    track: "Container Safety",
    tags: ["Security", "DevOps", "Linux", "Cloud"],
    level: "Intermediate",
    readTime: "8–10 min",
    href: "/notes/cap-sys-admin",
    featured: true,
  },

  {
    id: "reverse-triage",
    title: "Reverse triage: a 10-min checklist",
    desc: "Metadata → strings → imports → behavior. Fast and repeatable.",
    track: "Reverse Engineering",
    tags: ["Reverse", "Linux", "Windows", "CTF"],
    level: "Beginner",
    readTime: "6 min",
  },

  {
    id: "python-cli",
    title: "Python CLI template (argparse + logging)",
    desc: "A clean skeleton for small tools: flags, logs, exit codes.",
    track: "Python Scripts",
    tags: ["Python"],
    level: "Beginner",
    readTime: "6 min",
  },

  {
    id: "python-http",
    title: "Python HTTP patterns",
    desc: "Timeouts, sessions, retries, safe parsing — the essentials.",
    track: "Python Scripts",
    tags: ["Python", "Web"],
    level: "Intermediate",
    readTime: "7 min",
  },

  {
    id: "web-audit",
    title: "Web audit checklist (defensive)",
    desc: "Auth, sessions, headers, secrets, logging — what to review first.",
    track: "Web Security",
    tags: ["Security", "Web"],
    level: "Beginner",
    readTime: "8 min",
  },
];

const allTags: Tag[] = ["Security", "Reverse", "Python", "Web", "DevOps", "Linux", "Windows", "CTF", "Cloud"];

function badgeTone(tag: Tag) {
  const base = "border border-white/10 bg-white/[0.03] text-white/80";
  if (tag === "Security") return `${base} border-[var(--accent)]/40`;
  return base;
}

export default function Notes() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Tag | "All">("All");

  const featured = notes.find((n) => n.featured);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return notes
      .filter((n) => !n.featured)
      .filter((n) => {
        const matchesTag = active === "All" ? true : n.tags.includes(active);
        const matchesQuery =
          !query ||
          n.title.toLowerCase().includes(query) ||
          n.desc.toLowerCase().includes(query) ||
          n.track.toLowerCase().includes(query) ||
          n.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTag && matchesQuery;
      });
  }, [q, active]);

  return (
    <section className="space-y-8 relative">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-[-140px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Coding Notes</h1>
            <p className="text-white/70 max-w-2xl">Short notes I actually reuse. Security content is defensive-only.</p>
          </div>

          {/* Search */}
          <div className="w-full sm:w-[340px]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-2 flex items-center gap-2">
              <span className="text-white/50 text-xs px-2">Search</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, tags, tracks…"
                className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40 px-1 py-2"
              />
              {q ? (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="text-xs px-3 py-2 rounded-xl hover:bg-white/10 text-white/70"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Tag filters (compact) */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive("All")}
            className={
              "text-xs px-3 py-2 rounded-2xl border " +
              (active === "All"
                ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-white/80")
            }
          >
            All
          </button>

          {allTags.slice(0, 6).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              className={
                "text-xs px-3 py-2 rounded-2xl border " +
                (active === t
                  ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-white/80")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* Tracks (clean + light) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tracks.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setQ(t.name)}
            className="text-left rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition
                       hover:bg-white/[0.035] hover:border-white/20 focus:outline-none focus:border-[var(--accent)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Logo kind={t.kind} />
                <div className="leading-tight">
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-xs text-white/60 mt-1 line-clamp-1">{t.subtitle}</p>
                </div>
              </div>

              <span className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/[0.02] text-white/60">
                {t.tone}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured ? <Featured note={featured} /> : null}

      {/* List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((n) => (
          <NoteCard key={n.id} note={n} />
        ))}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-white/70">
          No notes match your filters.
        </div>
      )}
    </section>
  );
}

function Featured({ note }: { note: Note }) {
  return (
    <Link
      to={note.href ?? "/notes"}
      className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 relative overflow-hidden hover:border-[var(--accent)] transition"
    >
      <div className="pointer-events-none absolute -top-20 -right-24 h-64 w-64 rounded-full bg-[var(--accent)]/12 blur-3xl" />
      <div className="relative space-y-2">
        <p className="text-xs text-white/60">Featured • {note.track}</p>
        <h2 className="text-xl font-semibold">{note.title}</h2>
        <p className="text-white/70 text-sm max-w-3xl">{note.desc}</p>

        <div className="flex items-center gap-2 text-xs text-white/60 pt-2">
          {note.level ? (
            <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.02]">{note.level}</span>
          ) : null}
          {note.readTime ? (
            <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.02]">{note.readTime}</span>
          ) : null}
          <span className="text-white/40">•</span>
          <span className="underline decoration-white/30 text-white/70">Read →</span>
        </div>
      </div>
    </Link>
  );
}

function NoteCard({ note }: { note: Note }) {
  const Wrapper = note.href ? Link : "div";
  const wrapperProps = note.href ? ({ to: note.href } as any) : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-[var(--accent)] hover:bg-white/[0.04] transition block"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs text-white/60">{note.track}</p>
          <h3 className="font-semibold leading-snug">{note.title}</h3>
        </div>

        <span className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/[0.02] text-white/60">
          {note.href ? "Open" : "Soon"}
        </span>
      </div>

      <p className="mt-2 text-sm text-white/70 line-clamp-2">{note.desc}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.slice(0, 3).map((t) => (
          <span key={t} className={`text-[10px] px-2 py-1 rounded-full ${badgeTone(t)}`}>
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}

function Logo({ kind }: { kind: "python" | "web" | "security" | "reverse" }) {
  const base =
    "h-9 w-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/80";

  if (kind === "python") {
    return (
      <div className={base} aria-label="Python">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2c4 0 4 2.5 4 2.5V7H8V4.7C8 3.2 9.2 2 12 2Z" stroke="currentColor" opacity="0.85" />
          <path d="M8 7h8c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4h-1" stroke="currentColor" opacity="0.85" />
          <path d="M12 22c-4 0-4-2.5-4-2.5V17h8v2.3c0 1.5-1.2 2.7-4 2.7Z" stroke="currentColor" opacity="0.85" />
          <path d="M16 17H8c-2.2 0-4-1.8-4-4v-2c0-2.2 1.8-4 4-4h1" stroke="currentColor" opacity="0.85" />
        </svg>
      </div>
    );
  }

  if (kind === "web") {
    return (
      <div className={base} aria-label="Web">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 22a10 10 0 1 0-0.001-20.001A10 10 0 0 0 12 22Z" stroke="currentColor" opacity="0.85" />
          <path d="M2 12h20" stroke="currentColor" opacity="0.85" />
          <path d="M12 2c3.2 3 3.2 17 0 20" stroke="currentColor" opacity="0.85" />
          <path d="M12 2c-3.2 3-3.2 17 0 20" stroke="currentColor" opacity="0.85" />
        </svg>
      </div>
    );
  }

  if (kind === "security") {
    return (
      <div className={base} aria-label="Security">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l8 4v6c0 5-3.2 9.4-8 10-4.8-.6-8-5-8-10V6l8-4Z" stroke="currentColor" opacity="0.85" />
          <path d="M9.5 12l1.8 1.8L14.8 10" stroke="currentColor" opacity="0.85" />
        </svg>
      </div>
    );
  }

  return (
    <div className={base} aria-label="Reverse Engineering">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 4h14v16H5z" stroke="currentColor" opacity="0.85" />
        <path d="M8 7h8M8 12h5M8 17h8" stroke="currentColor" opacity="0.85" />
      </svg>
    </div>
  );
}
