type Link = { label: string; url: string };
type Bucket = { title: string; links: Link[] };

const buckets: Bucket[] = [
  {
    title: "Cheat-sheets & References",
    links: [
      { label: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" },
      { label: "GTFOBins", url: "https://gtfobins.github.io/" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "ffuf", url: "https://github.com/ffuf/ffuf" },
      { label: "nmap", url: "https://nmap.org/" },
      { label: "Burp Suite", url: "https://portswigger.net/burp" },
    ],
  },
  {
    title: "Labs & Practice",
    links: [
      { label: "OverTheWire", url: "https://overthewire.org/wargames/" },
      { label: "PortSwigger Academy", url: "https://portswigger.net/web-security" },
    ],
  },
];

export default function Resources() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Useful Resources</h1>
      <p className="text-white/75">Curated links I actually use.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {buckets.map(b => (
          <article key={b.title} className="rounded-xl border border-white/10 p-4 bg-white/[0.02]">
            <h3 className="font-semibold">{b.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {b.links.map(l => (
                <li key={l.url}>
                  <a className="underline hover:text-[var(--accent)]" href={l.url} target="_blank">{l.label}</a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
