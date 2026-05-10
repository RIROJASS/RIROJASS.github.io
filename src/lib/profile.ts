import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import yaml from "js-yaml";

// Resolve from project root so the path stays valid after Vite bundles this file.
const profilePath = resolve(process.cwd(), "src/data/profile.yml");

export const profileYamlRaw = readFileSync(profilePath, "utf-8");

export interface Affiliation {
  org: string;
  role?: string;
  advisor?: string;
  institution?: string;
  since?: string;
}

export interface Manuscript {
  id: string;
  title: string;
  status?: string;
  year?: number;
  lab?: string;
  authors?: string[];
  contribution?: string;
  coverage?: string;
  summary?: string;
  thesis?: string;
  collaborators?: string[];
  selected?: boolean;
}

export interface Project {
  id: string;
  name: string;
  category: "research" | "builds";
  one_line: string;
  detail?: string;
  importance: number;
  [key: string]: unknown;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  dates?: string;
  summary?: string;
}

export interface NewsEntry {
  date: string;
  text: string;
}

export interface Section {
  id: string;
  title: string;
  kind: "prose" | "list";
  body?: string;
  items?: string[];
}

export interface Profile {
  identity: {
    name: string;
    preferred_name: string;
    status: string;
    education?: { institution: string; degrees: string[]; expected: string }[];
    affiliations?: Affiliation[];
    contact: {
      email: string;
      github?: string;
      linkedin?: string;
      phone?: string;
    };
    locations?: string[];
    languages?: { name: string; level: string }[];
  };
  positioning: {
    tagline: string;
    one_lens_two_majors?: string;
    long_arc?: string;
    intellectual_frame?: { influences?: string[]; motif?: string };
  };
  research?: { manuscripts: Manuscript[] };
  projects?: Project[];
  experience?: ExperienceEntry[];
  advisors?: { name: string; org: string; role?: string }[];
  news?: NewsEntry[];
  beyond?: string[];
  sections?: Section[];
  meta?: Record<string, unknown>;
}

export const profile = yaml.load(profileYamlRaw) as Profile;
