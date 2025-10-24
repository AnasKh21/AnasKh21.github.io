import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="space-y-10">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        {/* animated glow */}
        <div className="pointer-events-none absolute -top-32 -right-40 h-80 w-80 rounded-full bg-[var(--accent)]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-2xl" />
        {/* optional noise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: "url(/images/noise.png)" }}
        />

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="/images/anas.jpg"
            alt="Anas Khayar"
            className="h-24 w-24 rounded-full object-cover ring-2 ring-white/10"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-[var(--accent)]">&gt;_</span> Let’s talk
            </h1>
            <p className="mt-2 text-white/70 max-w-2xl">
              Interested in <strong>cybersecurity</strong>, <strong>secure software</strong>, or
              a quick brainstorm on a project? Send a message—I'll reply fast.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="mailto:anaskhayar21@gmail.com" className="btn btn-primary">Email me</a>
              <a href="https://www.linkedin.com/in/anas-khayar-7004ab2bb/" target="_blank" className="btn btn-ghost" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/AnasKh21" target="_blank" className="btn btn-ghost" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </div>

      {/* 3-COLUMN: quick cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <InfoCard
          title="Email"
          value="anaskhayar21@gmail.com"
          actionLabel="Copy"
          onAction={() => navigator.clipboard.writeText("anaskhayar21@gmail.com")}
        />
        <InfoCard
          title="Location"
          value="Île-de-France, FR"
          actionLabel="View map"
          href="https://maps.google.com/?q=Paris%2C+France"
        />
        <InfoCard
          title="Resume / CV"
          value="Anas_Khayar_CV.pdf"
          actionLabel="Download"
          href="/Anas_Khayar_CV.pdf"
        />
      </div>

      {/* CONTACT FORM */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <h2 className="text-xl font-semibold">Send a message</h2>
        <p className="text-white/70 text-sm mt-1">
          This form posts to Formspree (recommended) or falls back to mailto if you prefer.
        </p>

        {sent ? (
          <div className="mt-6 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-4 text-sm">
            Thanks! Your message was sent. I’ll get back to you soon.
          </div>
        ) : (
          <form
            className="mt-6 grid gap-4"
            // ===== OPTION A: Formspree (create a form and paste your endpoint) =====
            action="https://formspree.io/f/your_form_id" // <-- replace with your Formspree endpoint
            method="POST"
            onSubmit={() => setSent(true)}
          >
            <FloatingInput label="Your name" name="name" autoComplete="name" required />
            <FloatingInput label="Your email" name="email" type="email" autoComplete="email" required />
            <FloatingTextarea label="Message" name="message" required />

            {/* Hidden subject to make messages easier to filter */}
            <input type="hidden" name="_subject" value="Portfolio contact — Anas Khayar" />

            <div className="flex items-center gap-3">
              <button type="submit" className="btn btn-primary">Send</button>
              {/* ===== OPTION B: Mailto fallback (no backend) =====
                  If you prefer mailto, comment the <form> action above and use:
                  <a href="mailto:anaskhayar21@gmail.com?subject=Portfolio%20contact&body=Hello%20Anas," className="btn btn-primary">Open mail app</a>
              */}
              <span className="text-xs text-white/60">Response within 24h.</span>
            </div>
          </form>
        )}
      </div>

      {/* SOCIAL STRIP */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Social
          label="GitHub"
          sub="Open-source & labs"
          href="https://github.com/AnasKh21"
        />
        <Social
          label="LinkedIn"
          sub="Work & updates"
          href="https://www.linkedin.com/in/anas-khayar-7004ab2bb/"
        />
        <Social
          label="Root-Me"
          sub="Practice profile"
          href="https://www.root-me.org/AnasKh21"
        />
      </div>
    </section>
  );
}

/* ——— Small building blocks ——— */

function InfoCard({
  title,
  value,
  href,
  actionLabel,
  onAction,
}: {
  title: string;
  value: string;
  href?: string;
  actionLabel: string;
  onAction?: () => void;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-[var(--accent)] transition">
      <p className="text-xs text-white/60">{title}</p>
      <p className="mt-1 font-medium truncate">{value}</p>
      <div className="mt-3">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="btn btn-ghost text-xs">
            {actionLabel}
          </a>
        ) : (
          <button onClick={onAction} className="btn btn-ghost text-xs">
            {actionLabel}
          </button>
        )}
      </div>
    </article>
  );
}

function FloatingInput(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="group relative block">
      <input
        {...rest}
        className="peer w-full rounded-xl bg-white/[0.03] px-4 py-3 outline-none border border-white/10
                   focus:border-[var(--accent)]"
        placeholder=" " /* keep for :placeholder-shown trick */
      />
      <span
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm
                   transition-all peer-focus:top-2 peer-focus:text-xs peer-placeholder-shown:top-1/2
                   peer-placeholder-shown:text-sm"
      >
        {label}
      </span>
    </label>
  );
}

function FloatingTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="group relative block">
      <textarea
        {...rest}
        rows={5}
        className="peer w-full rounded-xl bg-white/[0.03] px-4 py-3 outline-none border border-white/10
                   focus:border-[var(--accent)] resize-y"
        placeholder=" "
      />
      <span
        className="pointer-events-none absolute left-4 top-6 text-white/50 text-sm
                   transition-all peer-focus:top-2 peer-focus:text-xs peer-placeholder-shown:top-6
                   peer-placeholder-shown:text-sm"
      >
        {label}
      </span>
    </label>
  );
}

function Social({ label, sub, href }: { label: string; sub: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5
                 hover:border-[var(--accent)] hover:bg-white/[0.04] transition block"
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold tracking-tight">{label}</h3>
        <span className="text-xs text-white/60 group-hover:text-[var(--accent)]">Open →</span>
      </div>
      <p className="mt-1 text-sm text-white/70">{sub}</p>
    </a>
  );
}
