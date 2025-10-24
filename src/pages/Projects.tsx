// src/pages/Projects.tsx
import { useMemo, useState } from "react";

type Project = {
  slug: string;
  title: string;
  blurb: string;
  stack: string[];
  category: "Security" | "Software" | "Data";
  year: string;
  repo?: string;
  demo?: string;
};

const ALL: Project[] = [
  {
    slug: "ucg-uds-generator",
    title: "UCG — UDS Code Generator",
    blurb:
      "Parses AUTOSAR ARXML/CDD and generates UDS diagnostic configs + C callbacks for ECUs. Includes Windows UI and bilingual docs.",
    stack: ["Python", "C", "AUTOSAR", "ISO 14229"],
    category: "Software",
    year: "2024",
    repo: "https://github.com/AnasKh21", // replace with exact repo
  },
  {
    slug: "phishml",
    title: "PhishML — Email Phishing Detection",
    blurb:
      "Text-based features + classical ML models. Gmail API integration for live scanning. Focus on explainability and pipeline hygiene.",
    stack: ["Python", "scikit-learn", "Gmail API"],
    category: "Security",
    year: "2024",
    repo: "https://github.com/AnasKh21/PhishML",
  },
  {
    slug: "cybergraph",
    title: "CyberGraph — Network Attack Mapping",
    blurb:
      "Builds host/service/vuln graphs from nmap/pcap, then computes paths (betweenness, Louvain, shortest paths). Streamlit UI.",
    stack: ["Python", "Neo4j", "Py2neo", "Streamlit"],
    category: "Data",
    year: "2024",
  },
  {
    slug: "vulnscanner-lite",
    title: "VulnScanner Lite",
    blurb:
      "Lightweight web scanner for quick checks (SQLi/XSS/LFI). Modular signatures + HTML report. Focus: safe defaults & speed.",
    stack: ["Python", "Requests", "HTML"],
    category: "Security",
    year: "2023",
  },
  {
    slug: "ctf-toolkitbuilder",
    title: "CTF ToolkitBuilder",
    blurb:
      "CLI utilities for CTFs: encoders/decoders, mini fuzzers, small bruteforce helpers. Designed for portability.",
    stack: ["Python"],
    category: "Security",
    year: "2023",
  },
  {
    slug: "android-footprint",
    title: "Android — Environmental Impact",
    blurb:
      "Estimates energy footprint from user activities. Multithreading, persistence, and reporting. Clean mobile UI.",
    stack: ["Java", "Android Studio"],
    category: "Software",
    year: "2022",
  },
];

const CATEGORIES = ["All", "Security", "Software", "Data"] as const;

export default function Projects() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return ALL.filter((p) => {
      const matchesCat = cat === "All" ? true : p.category === cat;
      const matchesText =
        text.length === 0 ||
        p.title.toLowerCase().includes(text) ||
        p.blurb.toLowerCase().includes(text) ||
        p.stack.join(" ").toLowerCase().includes(text);
      return matchesCat && matchesText;
    });
  }, [q, cat]);

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-white/70 max-w-2xl">
          Selected security, software, and data projects. Each card links to code or a demo when available.
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="flex-1">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, stack, or description…"
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 outline-none
                         focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as any)}
              className="rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2
                         focus:border-[var(--accent)]"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* List */}
      <ul className="grid md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <li key={p.slug}>
            <article
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition
                         hover:border-[var(--accent)] hover:bg-white/[0.04] hover:shadow-[0_0_0_1px_var(--accent)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <span className="text-xs text-white/60">{p.year}</span>
              </div>

              <p className="mt-2 text-sm text-white/75">{p.blurb}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    className="btn btn-ghost text-sm"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    className="btn btn-primary text-sm"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-xl border border-white/10 p-6 text-sm text-white/70">
          No project matches your filters. Try another keyword or category.
        </div>
      )}
    </section>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1">
      {label}
    </span>
  );
}
