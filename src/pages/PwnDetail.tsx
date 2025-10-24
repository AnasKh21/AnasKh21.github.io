// src/pages/PwnDetail.tsx
import { useParams } from "react-router-dom";
import { machines } from "../data/pwn-machines";

export default function PwnDetail() {
  const { slug } = useParams();
  const m = machines.find((x) => x.slug === slug);

  if (!m) return <p>Machine not found.</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{m.title}</h1>
      <p className="text-white/80">{m.summary}</p>

      <div className="rounded-lg border border-white/10 p-4 bg-white/[0.02]">
        <h3 className="font-semibold">Objective</h3>
        <p className="text-white/80">Find the root flag (typically located in <code>/home/root</code> on the VM).</p>

        <h4 className="mt-3 font-medium">Download & Import</h4>
        <ol className="list-decimal list-inside text-sm text-white/75">
          <li>Download the OVA from the link on the Pwn listing (or from the Releases link).</li>
          <li>In VirtualBox: File → Import Appliance → select the OVA and import.</li>
          <li>Run the VM in an isolated network (NAT or host-only) — <strong>do not</strong> use bridged mode on a public network.</li>
        </ol>

        <h4 className="mt-3 font-medium">Allowed tools</h4>
        <p className="text-sm text-white/75">nmap, curl, nikto, gobuster, local enumeration tools. Avoid destructive scans on shared networks.</p>

        <h4 className="mt-3 font-medium">Hints (high-level)</h4>
        <ul className="list-disc list-inside text-sm text-white/75">
          {m.hints?.map((h, i) => <li key={i}>{h}</li>)}
        </ul>

        <h4 className="mt-3 font-medium">Notes</h4>
        <ul className="list-disc list-inside text-sm text-white/75">
          {m.notes?.map((n, i) => <li key={i}>{n}</li>)}
        </ul>

        <h4 className="mt-3 font-medium">Flag handling</h4>
        <p className="text-sm text-white/75">I do not host a flag submission service publicly. Keep your flag for practice or contact me if you want a verification.</p>
      </div>
    </section>
  );
}
