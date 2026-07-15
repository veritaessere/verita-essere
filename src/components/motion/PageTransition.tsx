import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

// Transição leve entre rotas via CSS — mantém o framer-motion FORA do bundle
// inicial (ele só entra nos chunks das seções que animam ao rolar).
// Não anima o 1º carregamento (a hero/LCP aparece imediatamente); anima apenas
// nas navegações seguintes. prefers-reduced-motion desliga via media query global.
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const firstRef = useRef(true);
  const isFirst = firstRef.current;
  useEffect(() => {
    firstRef.current = false;
  }, []);
  return (
    <div key={pathname} className={isFirst ? undefined : "page-enter"}>
      {children}
    </div>
  );
}
