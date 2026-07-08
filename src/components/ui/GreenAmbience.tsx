// Camadas de ambiência para seções de fundo verde escuro (surface-forest):
// profundidade + brilhos difusos (verde/dourado) + brilho/linha no topo + grão.
// Uso: pôr como 1º filho de uma <section relative overflow-hidden>.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GreenAmbience() {
  return (
    <>
      {/* profundidade: gradiente diagonal (mais claro no topo, mais fundo embaixo) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/25"
        aria-hidden
      />
      {/* brilho verde difuso à esquerda */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-hero-green/40 blur-[120px]"
        aria-hidden
      />
      {/* brilho dourado difuso à direita */}
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-primary/15 blur-[130px]"
        aria-hidden
      />
      {/* brilho radial no topo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(40%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)]"
        aria-hidden
      />
      {/* linha de destaque no topo */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 rounded-full bg-white/25 blur-sm"
        aria-hidden
      />
      {/* textura de grão sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{ backgroundImage: NOISE }}
        aria-hidden
      />
    </>
  );
}
