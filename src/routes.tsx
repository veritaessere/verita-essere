import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
// Home é o one-pager principal: importada de forma síncrona para que a hero
// apareça de primeira, sem o fallback "Carregando…" do Suspense.
import Home from "./pages/Home";

const Obrigado = lazy(() => import("./pages/Obrigado"));
const Politica = lazy(() => import("./pages/Politica"));
const PsicologoMedianeira = lazy(() => import("./pages/PsicologoMedianeira"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="/politica-de-privacidade" element={<Politica />} />
      <Route path="/psicologo-em-medianeira" element={<PsicologoMedianeira />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
