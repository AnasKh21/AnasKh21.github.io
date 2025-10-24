// src/pages/NoteCapSysAdmin.tsx
export default function NoteCapSysAdmin() {
    return (
      <article className="space-y-8">
        {/* HERO */}
        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="pointer-events-none absolute -top-32 -right-40 h-80 w-80 rounded-full bg-[var(--accent)]/15 blur-3xl" />
          <h1 className="text-3xl font-bold tracking-tight">Docker — CAP_SYS_ADMIN container escape (defensive brief)</h1>
          <p className="mt-2 text-white/70 max-w-3xl">
            Why the <code>CAP_SYS_ADMIN</code> capability is dangerous in containers, what the attack surface looks like,
            and how to detect & mitigate it responsibly. No exploit details here — this page focuses on blue-team practices.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Badge>Linux</Badge><Badge>Containers</Badge><Badge>Capabilities</Badge><Badge>Defense</Badge>
          </div>
        </header>
  
        {/* TL;DR */}
        <Callout title="TL;DR">
          <p>
            <strong>CAP_SYS_ADMIN</strong> is a broad, near-root capability. In overly privileged containers,
            it expands the attack surface (mount namespaces, cgroups operations, etc.) and can enable container escape
            if other controls are weak. Treat it as <em>“danger: use only if absolutely required.”</em>
          </p>
        </Callout>
  
        {/* Threat model */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Threat model & prerequisites</h2>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li>Container runs as <code>root</code> and is <code>--privileged</code> or has <code>--cap-add=SYS_ADMIN</code>.</li>
            <li>LSM/filters permissive (e.g., AppArmor/SELinux unconfined, seccomp permissive).</li>
            <li>Attacker has code execution inside the container.</li>
          </ul>
        </section>
  
        {/* High level path (sans commandes) */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">High-level abuse path (red-team in one picture)</h2>
          <ol className="list-decimal list-inside text-white/80 space-y-1">
            <li>Leverage filesystem-related privileges enabled by <code>CAP_SYS_ADMIN</code>.</li>
            <li>Abuse mount namespace operations to gain visibility over host paths (conceptual).</li>
            <li>If isolation is weak, pivot into a view dominated by the host filesystem.</li>
            <li>Post-condition: access to sensitive host files or ability to execute host binaries (depending on policy).</li>
          </ol>
          <p className="text-xs text-white/50">
            Details intentionally omitted. This note is for awareness, detection, and mitigation.
          </p>
        </section>
  
        {/* Detection */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Detection & telemetry</h2>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li><strong>Mount events</strong>: watch kernel/audit logs for unusual mount operations from containerized PIDs.</li>
            <li><strong>cgroups</strong>: alert on unexpected write events to cgroup fs (esp. legacy v1 knobs).</li>
            <li><strong>Process activity</strong>: visibility for namespace-enter tools, suspicious host paths access.</li>
            <li><strong>eBPF/auditd</strong>: rules on <code>mount</code>, <code>pivot_root</code>, <code>chroot</code> syscalls from container cgroups.</li>
          </ul>
        </section>
  
        {/* Mitigations */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Mitigations</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            <li><Check>Never use <code>--privileged</code> for app workloads.</Check></li>
            <li><Check>Drop capabilities: use a minimal set; avoid <code>CAP_SYS_ADMIN</code>.</Check></li>
            <li><Check>Enable AppArmor/SELinux profiles; keep seccomp restrictive.</Check></li>
            <li><Check>Run as non-root / rootless containers where possible.</Check></li>
            <li><Check>Read-only rootfs, no host device mounts unless strictly needed.</Check></li>
            <li><Check>Regularly scan and validate runtime configs (policy as code).</Check></li>
          </ul>
        </section>
  
        {/* Ethical note + references */}
        <Callout title="Ethical note">
          <p>
            This portfolio does not publish step-by-step exploit content. If you’re a reviewer and want the red-team appendix,
            contact me — I can share a private, responsible disclosure style brief.
          </p>
        </Callout>
  
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">References</h2>
          <ul className="list-disc list-inside text-sm text-white/75 space-y-1">
            <li>Docker docs on capabilities & security</li>
            <li>Linux capabilities overview (<code>man 7 capabilities</code>)</li>
            <li>Root-Me: “Docker — I am Groot” (challenge reference)</li>
            <li>Public research on container escape hardening (cgroups, namespaces, LSM)</li>
          </ul>
        </section>
  
        {/* Link to challenge (safe) */}
        <div className="flex flex-wrap gap-3">
          <a href="https://www.root-me.org/" target="_blank" rel="noreferrer" className="btn btn-ghost text-sm">
            Root-Me (challenge hub)
          </a>
          <a href="/notes" className="btn btn-primary text-sm">Back to notes</a>
        </div>
      </article>
    );
  }
  
  /* ——— tiny UI atoms ——— */
  function Badge({ children }: { children: React.ReactNode }) {
    return <span className="text-xs rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1">{children}</span>;
  }
  function Check({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
        <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
        <span className="text-sm">{children}</span>
      </div>
    );
  }
  function Callout({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4">
        <p className="font-medium">{title}</p>
        <div className="mt-2 text-white/80 text-sm space-y-2">{children}</div>
      </div>
    );
  }
  