export default function About() {
  return (
    <section className="space-y-14">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Software & cybersecurity engineer — focused on secure automation, threat-driven development,
          and building things that don’t break.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-2xl font-semibold">Education</h2>

        <div className="space-y-6 border-l border-white/10 pl-6">
          <div>
            <p className="text-xs text-white/50">2023 — 2025</p>
            <h3 className="font-semibold">ENSIIE — Software & Cybersecurity Engineer</h3>
            <p className="text-white/70 text-sm max-w-3xl mt-1">
              Specialization in secure software design, offensive & defensive security,
              systems programming, DevSecOps and risk-based analysis.
            </p>
          </div>

          <div>
            <p className="text-xs text-white/50">2021 — 2023</p>
            <h3 className="font-semibold">Classe Préparatoire Scientifique — Lycée La Résidence, Casablanca</h3>
            <p className="text-white/70 text-sm max-w-3xl mt-1">
              Intensive mathematics / physics training.
              Built resilience, rigor and the habit of solving hard problems under pressure.
            </p>
          </div>
        </div>
      </div>

      {/* Technical focus */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Technical Focus</h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            Secure development (zero-trust mindset, code reviews, CI security checks)
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            Software engineering — Python, React, Java, Linux internals
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            Offensive & defensive security (web/network, malware basics)
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            Automation, scripting, and observability tooling (SIEM/IDS)
          </li>
        </ul>
      </div>

      {/* Certifications */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Certifications</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {[
            { name: "Google Cybersecurity Certificate", year: "2024" },
            { name: "Cisco Networking Academy — Introduction to Cybersecurity", year: "2023" },
          ].map((c) => (
            <li
              key={c.name}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm flex justify-between"
            >
              <span className="text-white/80">{c.name}</span>
              <span className="text-white/50">{c.year}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Personal touch */}
      <div className="max-w-3xl mx-auto pt-6 border-t border-white/10">
        <p className="text-white/65 text-sm text-center leading-relaxed max-w-xl mx-auto">
          I like systems I can break and systems I can fix.
          Cybersecurity is where both meet.
        </p>
      </div>
    </section>
  );
}
