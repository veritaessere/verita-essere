import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; delay?: number; className?: string };

// Reveal ao entrar na viewport — dispara UMA vez e mantém visível (como antes,
// com framer whileInView once). Usa IntersectionObserver + classe adicionada de
// forma imperativa (não via render), então o markup do SSG bate com o 1º render
// do cliente → hidratação limpa. Sem framer-motion e sem reflow forçado.
// A classe .reveal / .reveal-in vive em globals.css (só sob prefers-reduced-
// motion: no-preference; com movimento reduzido o conteúdo já nasce visível).
export function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
