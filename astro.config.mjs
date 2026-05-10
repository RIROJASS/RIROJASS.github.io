import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://rirojass.github.io",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
