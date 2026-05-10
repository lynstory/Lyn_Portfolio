import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://lynstory.github.io",
  base: "/Lyn_Portfolio/",
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
