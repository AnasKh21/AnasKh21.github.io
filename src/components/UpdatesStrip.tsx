import updates from "../data/updates.json";

export default function UpdatesStrip() {
  const top = updates
    .slice(0, 3)
    .map((u) => ({ ...u, date: new Date(u.date) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (top.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm flex items-center gap-3">
      <span className="text-[var(--accent)] font-semibold">Updates</span>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {top.map((u, i) => (
          <li key={i} className="text-white/70">
            <a className="hover:text-[var(--accent)] underline/30" href={u.href}>
              {u.title}
            </a>
            <span className="ml-2 text-xs text-white/45">({u.date.toISOString().slice(0, 10)})</span>
          </li>
        ))}
      </ul>
      <a href="/now" className="ml-auto text-xs text-white/60 hover:text-[var(--accent)] underline/30">
        See all
      </a>
    </div>
  );
}
