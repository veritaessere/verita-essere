// Camadas de ambiência para seções claras (bege-tint): brilhos difusos (verde/dourado)
// + textura de grão. Mesmo estilo da seção "Como Funciona", calibrado para fundo claro.
// As bordas superior/inferior somem (máscara vertical) para que o topo e a base de cada
// seção fiquem na cor pura — sem emenda brusca entre uma seção e a seguinte.
// Uso: pôr como 1º filho de uma <section relative overflow-hidden>.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const EDGE_FADE =
  "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)";

export function SoftAmbience() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      aria-hidden
    >
      {/* brilho verde difuso à esquerda */}
      <div className="absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-hero-green/[0.06] blur-[120px]" />
      {/* brilho dourado difuso à direita */}
      <div className="absolute -right-32 bottom-1/4 h-[460px] w-[460px] rounded-full bg-primary/[0.10] blur-[130px]" />
      {/* textura de grão sutil */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: NOISE }}
      />
    </div>
  );
}
