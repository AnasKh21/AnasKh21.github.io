// src/data/pwn-machines.ts
export type Machine = {
    slug: string;
    title: string;
    summary: string;
    os: "Linux" | "Windows" | "Mixed";
    difficulty: "Easy" | "Medium" | "Hard";
    size?: string;
    download?: string; // direct download URL (Drive or Release asset)
    hints?: string[];
    notes?: string[];
  };
  
  export const machines: Machine[] = [
    {
      slug: "vm-one",
      title: "VM 1",
      summary:
        "A small VirtualBox challenge focused on service enumeration and basic privilege escalation. The root flag is located in /home/root.",
      os: "Linux",
      difficulty: "Easy",
      size: "approx. 800MB",
      download: "https://drive.google.com/uc?export=download&id=19MQ60L8ZqqkT7IPFgiGLaCO9l1tMYHUr",
      hints: [
        "Start with a port scan and web enumeration.",
        "Check common log files and web directories for interesting files.",
        "Privilege escalation involves a misconfigured local service account.",
      ],
      notes: [
        "Import in VirtualBox. Use NAT or host-only network.",
        "Snapshot after import so you can reset state quickly.",
      ],
    },
    {
      slug: "vm-two",
      title: "VM 2 ",
      summary:
        "This VM is not directly accessible, you have to use the VM 1. The root flag is located in /home/root.",
      os: "Linux",
      difficulty: "Medium",
      size: "approx. 1.4GB",
      download: "https://drive.google.com/uc?export=download&id=1kcFk1aMvu1beEk9D07I8obBMi-1T-VGF",
      hints: [
        "Look for scheduled tasks (cron) and configuration files with weak permissions.",
        "Log files may contain clues to paths or credentials (think high-level).",
      ],
      notes: [
        "Always run in an isolated network. Avoid exposing the VM on your LAN.",
        "If file is large, prefer GitHub Releases to host the OVA.",
      ],
    },
  ];
  