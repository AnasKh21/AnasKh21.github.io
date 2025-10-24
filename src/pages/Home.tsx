export default function Home() {
  return (
    <section className="space-y-10 hacker-bg">
      {/* HERO */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          <span className="text-[var(--accent)]">&gt;_</span> Anas’ Lab
        </h1>
        <p className="text-white/70 max-w-2xl">
          VirtualBox walkthroughs, concise coding notes, portfolio projects, and hand-picked resources.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a href="/pwn" className="btn btn-primary">PwnTheMachine</a>
          <a href="/projects" className="btn btn-ghost">Projects</a>
          <a href="/resources" className="btn btn-ghost">Resources</a>
        </div>
      </div>

      {/* HUB TILES */}
      <ul className="grid sm:grid-cols-2 gap-4">
        <Tile
          title="PwnTheMachine"
          desc="Exploit paths for local/CTF boxes. Import, enumerate, root."
          emoji="🧨"
          href="/pwn"
        />
        <Tile
          title="Coding Notes"
          desc="React/TS patterns, Python tooling, Rust/C safety."
          emoji="🧠"
          href="/notes"
        />
        <Tile
          title="Projects"
          desc="Case studies with repos, demo notes, and stacks."
          emoji="🧩"
          href="/projects"
        />
        <Tile
          title="Useful Resources"
          desc="Cheat-sheets, tooling, references, labs."
          emoji="🧰"
          href="/resources"
        />
      </ul>
    </section>
  );
}

function Tile({
  title,
  desc,
  emoji,
  href,
}: {
  title: string;
  desc: string;
  emoji: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition
                   hover:border-[var(--accent)] hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_var(--accent)]"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{emoji}</span>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-white/70">{desc}</p>
        <span className="mt-3 inline-block text-xs text-white/60 group-hover:text-[var(--accent)]">
          Open →
        </span>
      </a>
    </li>
  );
}
