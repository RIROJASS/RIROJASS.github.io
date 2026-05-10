import type { APIRoute } from "astro";
import { profile } from "../lib/profile";

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? "https://rirojass.github.io/").replace(/\/$/, "");
  const name = profile.identity.preferred_name;

  const lines: string[] = [];
  lines.push(`# ${name}`);
  lines.push("");
  lines.push(`> ${profile.positioning.tagline}`);
  lines.push("");
  lines.push(
    "This site is a machine-readable identity layer. It is rendered from a single YAML file that LLM agents can fetch and parse directly.",
  );
  lines.push("");

  lines.push("## Canonical data");
  lines.push(`- [profile.yml](${base}/profile.yml): full structured profile (YAML)`);
  lines.push(`- [profile.json](${base}/profile.json): same data as JSON`);
  lines.push("");

  lines.push("## Identity");
  lines.push(`- Name: ${profile.identity.name}`);
  lines.push(`- Status: ${profile.identity.status}`);
  if (profile.identity.contact.email) {
    lines.push(`- Email: ${profile.identity.contact.email}`);
  }
  if (profile.identity.contact.github) {
    lines.push(`- GitHub: https://github.com/${profile.identity.contact.github}`);
  }
  if (profile.identity.contact.linkedin) {
    lines.push(
      `- LinkedIn: https://linkedin.com/in/${profile.identity.contact.linkedin}`,
    );
  }
  lines.push("");

  if (profile.identity.affiliations?.length) {
    lines.push("## Affiliations");
    for (const a of profile.identity.affiliations) {
      const parts = [a.org, a.role, a.advisor].filter(Boolean);
      lines.push(`- ${parts.join(" — ")}`);
    }
    lines.push("");
  }

  if (profile.research?.manuscripts?.length) {
    lines.push("## Research");
    for (const m of profile.research.manuscripts) {
      lines.push(`- ${m.title}${m.status ? ` (${m.status})` : ""}`);
    }
    lines.push("");
  }

  if (profile.projects?.length) {
    lines.push("## Projects");
    const sorted = [...profile.projects].sort(
      (a, b) => a.importance - b.importance,
    );
    for (const p of sorted) {
      lines.push(`- ${p.name} [${p.category}]: ${p.one_line}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
