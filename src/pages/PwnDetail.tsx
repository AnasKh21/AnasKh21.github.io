// src/pages/PwnDetail.tsx
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { machines } from "../data/pwn-machines";

async function sha256Hex(input: string) {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function storageKey(slug: string) {
  return `pwn_completed_${slug}`;
}

export default function PwnDetail() {
  const { slug } = useParams<{ slug: string }>();

  const machine = useMemo(
    () => machines.find((m) => m.slug === slug),
    [slug]
  );

  const [flag, setFlag] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "bad" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [isCompleted, setIsCompleted] = useState(() => {
    if (!slug) return false;
    return localStorage.getItem(storageKey(slug)) === "true";
  });

  if (!machine) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Machine not found</h1>
        <Link className="underline hover:text-[var(--accent)]" to="/pwn">
          Back to PwnTheMachine
        </Link>
      </section>
    );
  }

  const verify = async () => {
    try {
      setStatus("idle");
      setMsg("");

      const cleaned = flag.trim();
      if (!cleaned) {
        setStatus("error");
        setMsg("Enter a flag first.");
        return;
      }

      if (!machine.flagHash) {
        setStatus("error");
        setMsg("Flag verification is not configured for this machine yet.");
        return;
      }

      const h = await sha256Hex(cleaned);

      if (h === machine.flagHash.toLowerCase()) {
        setStatus("ok");
        setMsg("Correct flag ✅ GG!");
        localStorage.setItem(storageKey(machine.slug), "true");
        setIsCompleted(true);
      } else {
        setStatus("bad");
        setMsg("Wrong flag ❌ Try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Verification failed (browser crypto).");
    }
  };

  const resetProgress = () => {
    localStorage.removeItem(storageKey(machine.slug));
    setIsCompleted(false);
    setStatus("idle");
    setMsg("");
    setFlag("");
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {machine.title}
              {isCompleted ? (
                <span className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10 text-white/80">
                  Completed ✅
                </span>
              ) : null}
            </h1>
            <p className="text-xs text-white/60 mt-1">
              {machine.os} · {machine.difficulty}
              {machine.size ? ` · ${machine.size}` : ""}
            </p>
          </div>

          <Link
            to="/pwn"
            className="text-sm underline hover:text-[var(--accent)]"
          >
            Back
          </Link>
        </div>

        <p className="text-white/80">{machine.summary}</p>

        <div className="flex gap-2 pt-2">
          {machine.download ? (
            <a
              href={machine.download}
              className="text-sm px-3 py-1 rounded bg-[var(--accent)] text-black"
              target="_blank"
              rel="noreferrer"
            >
              Download OVA
            </a>
          ) : (
            <span className="text-sm text-white/50">No OVA</span>
          )}

          {isCompleted ? (
            <button
              onClick={resetProgress}
              className="text-sm px-3 py-1 rounded border border-white/15 hover:border-[var(--accent)]"
              type="button"
            >
              Reset
            </button>
          ) : null}
        </div>
      </header>

      {/* Start */}
      <div className="rounded-xl border border-white/10 p-4 bg-white/[0.01] space-y-2">
        <h2 className="text-lg font-semibold">Start</h2>
        <ul className="text-sm text-white/75 list-disc pl-5 space-y-1">
          <li>Import the OVA into VirtualBox and boot the VM.</li>
          <li>Use NAT or Host-Only networking (avoid exposing it on your LAN).</li>
          <li>Enumerate, exploit, escalate — then grab the flag.</li>
        </ul>
      </div>

      {/* Hints */}
      {machine.hints?.length ? (
        <div className="rounded-xl border border-white/10 p-4 bg-white/[0.01] space-y-2">
          <h2 className="text-lg font-semibold">Hints</h2>
          <ul className="text-sm text-white/75 list-disc pl-5 space-y-1">
            {machine.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Notes */}
      {machine.notes?.length ? (
        <div className="rounded-xl border border-white/10 p-4 bg-white/[0.01] space-y-2">
          <h2 className="text-lg font-semibold">Notes</h2>
          <ul className="text-sm text-white/75 list-disc pl-5 space-y-1">
            {machine.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Flag verification */}
      <div className="rounded-xl border border-white/10 p-4 bg-white/[0.01] space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Flag verification</h2>
          {machine.flagFormatHint ? (
            <span className="text-xs text-white/50">
              Format: {machine.flagFormatHint}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            placeholder="Paste your flag here"
            className="w-full rounded-lg px-3 py-2 bg-black/30 border border-white/10 focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            onClick={verify}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-medium"
            type="button"
          >
            Verify
          </button>
        </div>

        {msg ? (
          <p
            className={[
              "text-sm",
              status === "ok" ? "text-green-400" : "",
              status === "bad" ? "text-red-400" : "",
              status === "error" ? "text-yellow-300" : "",
            ].join(" ")}
          >
            {msg}
          </p>
        ) : null}

        <p className="text-xs text-white/50">
          Note: verification runs locally in your browser (front-end). For a
          “real” secure verification, you’d need a backend.
        </p>
      </div>
    </section>
  );
}
