import type { APIRoute } from "astro";
import { profile } from "../lib/profile";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(profile, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
