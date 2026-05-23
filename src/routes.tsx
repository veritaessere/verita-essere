import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Equipe = lazy(() => import("./pages/Equipe"));
const Especialidades = lazy(() => import("./pages/Especialidades"));
const Contato = lazy(() => import("./pages/Contato"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const Politica = lazy(() => import("./pages/Politica"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/equipe" element={<Equipe />} />
      <Route path="/especialidades" element={<Especialidades />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="/politica-de-privacidade" element={<Politica />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
