import { Routes, Route } from "react-router-dom";
// Importes síncronos: todas as rotas são pré-renderizadas (SSG) e hidratadas por
// cima do HTML estático. React.lazy aqui causaria mismatch de hidratação, então
// as páginas entram no bundle principal (são pequenas).
import Home from "./pages/Home";
import Obrigado from "./pages/Obrigado";
import Politica from "./pages/Politica";
import PsicologoMedianeira from "./pages/PsicologoMedianeira";
import NotFound from "./pages/NotFound";

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
