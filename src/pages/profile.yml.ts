import type { APIRoute } from "astro";
import { profileYamlRaw } from "../lib/profile";

export const GET: APIRoute = () =>
  new Response(profileYamlRaw, {
    headers: {
      "Content-Type": "application/yaml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
