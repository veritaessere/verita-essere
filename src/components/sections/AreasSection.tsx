import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronRight, ChevronLeft } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import { specialties } from "@/content/specialties";
import { SoftAmbience } from "@/components/ui/SoftAmbience";

const CARD_W = 300; // px — largura-alvo do card (usada só p/ decidir quantos cabem)
const GAP = 24; // px — espaço entre cards (uniforme)

export function AreasSection() {
  const [active, setActive] = useState(0);

  // largura visível do trilho (para alinhar à esquerda sem sobrar espaço/cortar)
  const viewportRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(0);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setVw(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // quantos cards cabem inteiros na largura visível; ajusta a largura p/ preencher exato
  const visible = vw > 0 ? Math.max(1, Math.round((vw + GAP) / (CARD_W + GAP))) : 1;
  const cardW = vw > 0 ? (vw - (visible - 1) * GAP) / visible : CARD_W;
  const step = cardW + GAP;
  const maxActive = Math.max(0, specialties.length - visible);
  const clampedActive = Math.min(active, maxActive);
  const offset = clampedActive * step;

  const go = (dir: -1 | 1) =>
    setActive((i) => Math.min(maxActive, Math.max(0, Math.min(i, maxActive) + dir)));

  return (
    <section id="areas" className="relative bg-canvas-tint overflow-hidden scroll-mt-20 md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <SoftAmbience />
      <div className="relative py-20 md:py-28 w-full max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Cabeçalho centralizado */}
        <Reveal>
          <div className="text-center">
            <p className="eyebrow text-primary">Áreas de atuação</p>
            <span className="mx-auto mt-3 block h-px w-12 bg-primary/60" />
            <h2 className="mt-6 font-serif font-medium text-ink leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              O que tratamos com{" "}
              <em className="italic font-normal text-hero-green">acolhimento</em>{" "}
              e ciência.
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-body leading-relaxed">
              Oferecemos atendimento psicológico para diferentes demandas
              emocionais, sempre com acolhimento, ética, escuta qualificada e
              base científica.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="green" size="lg">
                <a
                  href={buildWaLink("generic")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  Agendar consulta
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Carrossel */}
        <div className="relative mt-14 md:mt-20">
          {/* Setas */}
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={clampedActive === 0}
            aria-label="Anterior"
            className="absolute -left-4 sm:-left-8 lg:-left-16 xl:-left-20 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-ink/70 shadow-sm ring-1 ring-ink/10 backdrop-blur-sm transition hover:bg-white hover:text-ink disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={clampedActive >= maxActive}
            aria-label="Próximo"
            className="absolute -right-4 sm:-right-8 lg:-right-16 xl:-right-20 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-ink/70 shadow-sm ring-1 ring-ink/10 backdrop-blur-sm transition hover:bg-white hover:text-ink disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          {/* Trilho */}
          <div ref={viewportRef} className="overflow-hidden">
            <div
              className="flex items-stretch transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(-${offset}px)`,
              }}
            >
              {specialties.map((s, i) => (
                  <div
                    key={s.slug}
                    style={{
                      width: cardW,
                      marginLeft: i === 0 ? 0 : GAP,
                    }}
                    className="group relative shrink-0 h-[500px] overflow-hidden rounded-[28px] text-left shadow-card"
                  >
                    {/* Imagem full-bleed */}
                    <img
                      src={s.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      aria-hidden
                    />

                    {/* Degradê escuro na base */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/50 to-transparent"
                      aria-hidden
                    />

                    {/* Pill (topo-esquerda) */}
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-medium text-white">
                      {s.title}
                    </span>

                    {/* Título + descrição (base) */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-serif text-3xl font-medium leading-tight text-white">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/85">
                        {s.short}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Dots (páginas) */}
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: maxActive + 1 }, (_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ir para página ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === clampedActive ? "w-6 bg-hero-green" : "w-2 bg-ink/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
