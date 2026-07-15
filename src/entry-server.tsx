import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";

// Renderizador de servidor usado no build (scripts/prerender.mjs) para gerar o
// HTML estático de cada rota. O renderToString produz exatamente o 1º render do
// cliente (effects não rodam aqui) → a hidratação no browser casa sem mismatch.
export function render(url: string): { html: string; helmet?: HelmetServerState } {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
  return { html, helmet: helmetContext.helmet };
}
