import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const Politica = lazy(() => import("./pages/Politica"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="/politica-de-privacidade" element={<Politica />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
