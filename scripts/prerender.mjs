// SSG: gera o HTML estático de cada rota com o renderizador de servidor do React
// (dist-ssr/entry-server.js). Roda no fim do `npm run build`, depois dos dois
// `vite build` (client + ssr). Sem browser — funciona em qualquer CI (Netlify).
// O renderToString produz o mesmo markup do 1º render do cliente → hidratação
// limpa (sem React #418), e o <head> por rota vem do react-helmet-async.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const { render } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

const template = readFileSync(path.join(dist, "index.html"), "utf8");

const ROUTES = [
  "/",
  "/psicologo-em-medianeira",
  "/politica-de-privacidade",
  "/obrigado",
];

for (const route of ROUTES) {
  const { html, helmet } = render(route);
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script]
        .map((h) => (h ? h.toString() : ""))
        .join("")
    : "";
  const page = template
    .replace("<!--app-head-->", head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const outDir = route === "/" ? dist : path.join(dist, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "index.html"), page, "utf8");
  console.log(`prerender: ${route} (${(page.length / 1024).toFixed(0)} KiB)`);
}
console.log(`prerender: ${ROUTES.length} rotas`);
