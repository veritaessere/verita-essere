import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

const rootEl = document.getElementById("root")!;

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Em produção o HTML já vem pré-renderizado (SSG via scripts/prerender.mjs +
// entry-server.tsx) → hidrata por cima do markup. Em dev o #root é vazio →
// render normal.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
