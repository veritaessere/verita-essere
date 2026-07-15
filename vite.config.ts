/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Inlina o CSS de entrada (o <link> injetado no index.html) como <style>,
// eliminando a requisição que bloqueia a renderização. Não toca no CSS de
// chunks dinâmicos (carregados via JS), que não aparecem no index.html.
function inlineEntryCss(): Plugin {
  return {
    name: "inline-entry-css",
    apply: "build",
    enforce: "post",
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      let result = html;
      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (chunk.type !== "asset" || !fileName.endsWith(".css")) continue;
        const base = (fileName.split("/").pop() ?? "").replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        const re = new RegExp(`<link[^>]+href="[^"]*${base}"[^>]*>`);
        if (!re.test(result)) continue; // não está linkado no HTML → mantém
        const css =
          typeof chunk.source === "string"
            ? chunk.source
            : Buffer.from(chunk.source).toString("utf8");
        result = result.replace(re, `<style>${css}</style>`);
        delete ctx.bundle[fileName]; // remove o asset agora embutido
      }
      return result;
    },
  };
}

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react() as any, inlineEntryCss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
