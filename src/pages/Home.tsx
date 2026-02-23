import UpdatesStrip from "../components/UpdatesStrip";
import { useEffect, useState } from "react";
import TennisBall from "../components/TennisBall";
import { useMemo } from "react";
import WavingMascot from "../components/WavingMascot";

type Logo = { label: string; src?: string };
type Track = { title: string; logos: Logo[] };

const PRESENTATION: Track[] = [
  {
    title: "Frontend",
    logos: [
      { label: "TypeScript", src: "/images/logo_typescript.png" }, // pas de logo fourni => fallback texte
      { label: "HTML", src: "/images/logo_html.png" },
      { label: "CSS", src: "/images/logo_css.png" },
      { label: "React", src: "/images/logo_react.png" },
      //{ label: "Vite", src: "/images/logo_vite.png" }
    ],
  },
  {
    title: "Backend",
    logos: [
      { label: "Python", src: "/images/python_logo.png" },
      { label: "Java", src: "/images/java_logo.png" },
      { label: "JavaScript", src: "/images/js_logo.png" },
      { label: "NodeJs", src: "/images/logo_nodejs.png" },
    ],
  },
  {
    title: "Tools",
    logos: [
      { label: "AWS", src: "/images/aws_logo.png" },
      { label: "Ollama", src: "/images/logo_ollama.png" },
      { label: "Claude", src: "/images/logo_claude.png" },
      { label: "CI/CD" }, // fallback texte
    ],
  },
];

const STACK_GROUPS: { title: string; items: Logo[] }[] = [
  {
    title: "Languages",
    items: [
      { label: "C", src: "/images/logo_c.png" },
      { label: "Python", src: "/images/python_logo.png" },
      { label: "Java", src: "/images/java_logo.png" },
      { label: "JavaScript", src: "/images/js_logo.png" },
      { label: "Rust", src: "/images/logo_rust.png" },
      { label: "Solidity", src: "/images/logo_solidity.png" },
      { label: "oCaml", src: "/images/logo_Ocaml.png" },
      { label: "C++", src: "/images/logo_cplusplus.png" },
    ],
  },
  {
    title: "Data",
    items: [
      { label: "MongoDB", src: "/images/logo_mongodb.png" },
      { label: "PostGreSQL", src: "/images/logo_postgreSQL.png" },
      { label: "neo4j", src: "/images/logo_neo4j.png" },
    ],
  },
  {
    title: "Web Frameworks",
    items: [
      { label: "React", src: "/images/logo_react.png" },
      { label: "TypeScript", src: "/images/logo_typescript.png" }, // fallback si pas de logo
      { label: "Vite", src: "/images/logo_vite.png" },
      { label: "Node.js", src: "/images/logo_nodejs.png" },
      { label: "HTML", src: "/images/logo_html.png" },
      { label: "CSS", src: "/images/logo_css.png" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Ollama", src: "/images/logo_ollama.png" },
      { label: "ChatGPT", src: "/images/logo_chatGPT.png" },
      { label: "Claude", src: "/images/logo_claude.png" },
      { label: "Jira", src: "/images/logo_jira.png" },
      { label: "AWS", src: "/images/aws_logo.png" },
      { label: "Docker", src: "/images/logo_docker.png" },
    ],
  },
];

function shortLabel(x: string) {
  const map: Record<string, string> = {
    TypeScript: "TS",
    JavaScript: "JS",
    React: "R",
    Tailwind: "TW",
    "Node.js": "N",
    Express: "EX",
    Python: "PY",
    Linux: "LX",
    "CI/CD": "CI",
    WebSec: "WS",
    ThreatModel: "TM",
    "CTF/Pwn": "CTF",
  };
  return map[x] ?? x.slice(0, 3).toUpperCase();
}

function TechBubble({ label, src }: Logo) {
  return (
    <div className="tech-wrap">
      <div className="tech-bubble" aria-label={label}>
        {src ? (
          <img
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            className="tech-img"
          />
        ) : (
          <span className="tech-fallback">{shortLabel(label)}</span>
        )}
      </div>

      <div className="tech-tip" role="tooltip">
        {label}
      </div>
    </div>
  );
}



function FloatingMascot() {
  const email = "anaskhayar21@gmail.com";
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
    }
  }

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <aside className="hi-orb" aria-label="Quick contact">
      {/* Panel qui slide-out au hover */}
      <div className="hi-panel" role="dialog" aria-label="Copy my email">
        <div className="hi-panel-title">
          Hey <span className="hi-dot">•</span> <span className="hi-name">Anas</span>
        </div>

        <p className="hi-panel-sub">Want to connect? Save my email real quick.</p>

        <div className="hi-panel-actions">
          <code className="hi-email" aria-label="Email">
            {email}
          </code>
          <button className="hi-copy" onClick={copyEmail} type="button">
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>

      {/* Orb toujours visible */}
      <button className="hi-orb-btn" type="button" aria-label="Open contact">
        <span className="hi-avatar" aria-hidden="true">
          <img src="/images/mascot.png" alt="" className="hi-avatar-img" />
        </span>
        <span className="hi-badge">Hi</span>
      </button>
    </aside>
  );
}
export { FloatingMascot };



export default function Home() {
  return (
    <section className="space-y-10">
      {/* HERO — Signature */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-10 md:px-10">
      
        <TennisBall />
        {/* background arc */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="absolute -bottom-[420px] left-1/2 h-[720px] w-[1200px] -translate-x-1/2 rounded-full bg-white/[0.04]" />
          <div className="absolute -bottom-[460px] left-1/2 h-[780px] w-[1320px] -translate-x-1/2 rounded-full border border-white/10" />
        </div>

        <div className="relative grid items-center gap-10 md:grid-cols-2">
          {/* LEFT */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
              <span className="text-[var(--accent)]">&gt;_</span>
              Junior Software Engineer · Open to full-time
            </div>

            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight">
              Hi, I’m <span className="text-[var(--accent)]">Anas</span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-white/70">
              I’m a junior dev who genuinely loves building stuff — clean UI, solid backend, and the little details that
              make products feel good. I’m big on <b>modern dev</b>, <b>AI workflows</b>, and <b>cloud</b>, and I learn
              the fastest by shipping real projects (and yes, breaking things a bit along the way).
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  document
                    .getElementById("who")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                Discover who I am
              </button>

              <a
                href="/projects"
                className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
              >
                See projects
              </a>
            </div>
          </div>

          {/* RIGHT — Mascot */}
          <div className="flex justify-center md:justify-end">
            <div className="mascot-hero">
              <img
                src="/images/mascot.png"
                alt="Anas mascot waving"
                loading="lazy"
                decoding="async"
                className="mascot-hero-img"
              />
              <div className="mascot-hero-caption">
                <span className="text-[var(--accent)]"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRESENTATION */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white/90">
            My toolbox
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/60">
            I’m comfortable adapting to different stacks — I care more about shipping clean solutions than chasing hype.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PRESENTATION.map((t) => (
            <div key={t.title} className="present-card">
              <h3 className="text-base font-semibold tracking-tight">{t.title}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {t.logos.map((l) => (
                  <TechBubble key={l.label} {...l} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHO I AM */}
      <div
        id="who"
        className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Who I am
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/70">
              I’m a junior software engineer based in Paris, focused on software development (backend / full-stack), with a strong interest in AI and cybersecurity. I’ve worked on <b>Python </b> for embedded tooling,
              shipped <b>full-stack</b> apps, and I’m always leveling up on <b>AI-assisted workflows</b>, <b>cloud</b>,
              and <b>security-by-design</b>.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-white/75">
              <li className="flex gap-3">
                <span className="text-[var(--accent)]">•</span>I like clean code, clear structure, and docs that actually help.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--accent)]">•</span>Autodidact energy: I learn fast, iterate, and improve with feedback.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--accent)]">•</span>Security mindset: I think about safe defaults, edge cases, and attack surfaces.
              </li>
            </ul>

            <p className="mt-5 text-sm text-white/70">
              And yeah — outside “classic dev”, I’m also into CTFs (Root-Me) under <b>AnasKh21</b>. It keeps my brain sharp and my code safer.
            </p>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
        <WavingMascot />
        </div>
      </div>

      {/* STACKS */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Stacks</h2>
            <p className="mt-1 text-sm text-white/70">
              Quick overview here — real proof lives in the projects.
            </p>
          </div>

          <a
            href="/projects"
            className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
          >
            View projects
          </a>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {STACK_GROUPS.map((g) => (
            <div key={g.title} className="stack-block">
              <h3 className="font-semibold tracking-tight">{g.title}</h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {g.items.map((it) => (
                  <div key={it.label} className="flex items-center gap-2">
                    <TechBubble {...it} />
                    <span className="text-sm text-white/70">{it.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IDENTITY PANEL */}
      <IdentityPanel />

      {/* Certifications */}
      <div className="reveal" style={{ ["--d" as any]: "120ms" }}>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Certifications</h2>
              <p className="mt-2 text-sm text-white/70">
                A couple of credentials to back the fundamentals (and yes, I still keep learning daily).
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <a
              href="https://www.coursera.org/account/accomplishments/specialization/TIRYZI1ZP4SJ"
              target="_blank"
              rel="noreferrer"
              className="cert-card group"
            >
              <div className="cert-left">
                <span className="cert-logo">
                  <img
                    src="/images/logo_google.png"
                    alt="Google"
                    loading="lazy"
                    decoding="async"
                    className="cert-logo-img"
                  />
                </span>

                <div>
                  <div className="cert-title">Google Cybersecurity Certificate</div>
                  <div className="cert-sub">Coursera · Specialization</div>
                </div>
              </div>

              <span className="cert-cta">View credential →</span>
            </a>
          </div>
        </div>
      </div>

      {/* UPDATES moved to bottom */}
      <div className="pt-2">
        <UpdatesStrip />
      </div>
      <FloatingMascot />
    </section>
  );
}

function IdentityPanel() {
  const TABS = useMemo(
    () => [
      {
        key: "who",
        label: "Who I am",
        title: "Just a dev who enjoys building.",
        body:
          "I’m a junior software engineer who loves programming for real: building features, polishing UX, and keeping the codebase clean. I grow fast by shipping projects and learning obsessively.",
        bullets: ["Clean code & simple architecture", "High autonomy, fast iterations", "Security mindset (CTF habits)"],
      },
      {
        key: "strengths",
        label: "Strengths",
        title: "Curious, hands-on, and motivated.",
        body:
          "Trained as a software engineer with a background in cybersecurity, I’m now focusing on development roles. I like learning by doing and improving step by step.",
        bullets: [
          "Autodidact mindset, always experimenting",
          "Good software engineering foundations",
          "Security awareness when writing code",
        ],
      },
      {
        key: "looking",
        label: "Looking for",
        title: "A team where I can keep leveling up.",
        body:
          "A full-time dev role with real product constraints, good engineering culture, and room to grow in cloud + AI-assisted workflows (without losing quality).",
        bullets: ["Full-stack / backend", "Cloud & DevOps exposure", "Security-aware delivery"],
      },
    ],
    []
  );

  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("who");
  const current = TABS.find((t) => t.key === active)!;

  return (
    <section className="id-panel">
      <div className="id-panel-bg" aria-hidden="true" />

      <div className="id-panel-grid">
        {/* LEFT */}
        <div className="id-left">
          <div className="id-kicker">Identity</div>
          <h2 className="id-title">
            A focused junior profile,
            <span className="id-title-soft"> built to ship.</span>
          </h2>
          <p className="id-desc">
            This page is here for one thing: show how I think, how I build, and what I’m aiming for — clearly, without
            the fluff.
          </p>

          <div className="id-pills">
            <span className="id-pill">AI workflows</span>
            <span className="id-pill">Cloud</span>
            <span className="id-pill">Software engineering</span>
          </div>

    
        </div>

        {/* RIGHT */}
        <div className="id-right">
          <div className="id-tabs" role="tablist" aria-label="Identity tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active === t.key}
                className={`id-tab ${active === t.key ? "is-active" : ""}`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
            <div className={`id-underline u-${active}`} aria-hidden="true" />
          </div>

          <div className="id-card" role="tabpanel">
            <div className="id-card-head">
              <div className="id-card-title">{current.title}</div>
              <div className="id-card-badge">Anas</div>
            </div>

            <p className="id-card-body">{current.body}</p>

            <ul className="id-card-list">
              {current.bullets.map((b) => (
                <li key={b}>
                  <span className="id-dot" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}