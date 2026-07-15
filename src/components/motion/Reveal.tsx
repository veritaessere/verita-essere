import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; delay?: number; className?: string };

// Reveal 100% CSS (classe .reveal em globals.css, via animation-timeline: view()).
// Sem framer-motion, sem estado JS: o markup renderizado é idêntico no servidor
// (prerender) e no cliente → hidratação sem mismatch (React #418). Navegadores
// sem scroll-timeline simplesmente mostram o conteúdo (degradação graciosa).
export function Reveal({ children, className }: Props) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
