// src/pages/Pwn.tsx
import { Link } from "react-router-dom";
import { machines } from "../data/pwn-machines";

export default function Pwn() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">PwnTheMachine</h1>
        <p className="text-white/75">
          VirtualBox/CTF machines — ethical practice only. Each machine includes a download link and a challenge page.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {machines.map((m) => (
          <article key={m.slug} className="rounded-xl border border-white/10 p-4 bg-white/[0.01] hover:border-[var(--accent)]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{m.title}</h3>
                <p className="text-xs text-white/60 mt-1">{m.os} · {m.difficulty} · {m.size}</p>
              </div>
              <div>
                {m.download ? (
                  <a href={m.download} className="text-sm px-3 py-1 rounded bg-[var(--accent)] text-black" target="_blank" rel="noreferrer">Download</a>
                ) : (
                  <span className="text-sm text-white/50">No OVA</span>
                )}
              </div>
            </div>

            <p className="mt-3 text-white/80">{m.summary}</p>

            <div className="mt-3">
              <Link to={`/pwn/${m.slug}`} className="text-sm underline hover:text-[var(--accent)]">View details & start</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
