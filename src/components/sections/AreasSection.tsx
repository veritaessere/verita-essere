import { useState } from "react";
import * as Icons from "lucide-react";
import {
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import { specialties } from "@/content/specialties";
import fundocard from "@/assets/images/fundocard.png";

const COLLAPSED_W = 230; // px — largura do card recolhido
const EXPANDED_W = 312; // px — largura do card ativo (expandido)
const GAP = 20; // px — espaço entre cards
const STEP = COLLAPSED_W + GAP;

const pad = (n: number) => String(n).padStart(2, "0");

export function AreasSection() {
  const [active, setActive] = useState(0);

  const go = (dir: -1 | 1) =>
    setActive((i) => Math.min(specialties.length - 1, Math.max(0, i + dir)));

  return (
    <section className="bg-white overflow-hidden md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <div className="py-20 md:py-28 w-full max-w-[1240px] mx-auto px-6 md:px-10">
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
            disabled={active === 0}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-surface-deep text-primary-on-dark shadow-card transition disabled:opacity-30 hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === specialties.length - 1}
            aria-label="Próximo"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-surface-deep text-primary-on-dark shadow-card transition disabled:opacity-30 hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          {/* Trilho */}
          <div className="overflow-hidden px-6">
            <div
              className="flex items-stretch transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                gap: GAP,
                transform: `translateX(calc(50% - ${
                  active * STEP + EXPANDED_W / 2
                }px))`,
              }}
            >
              {specialties.map((s, i) => {
                const Icon = Icons[
                  s.icon as keyof typeof Icons
                ] as Icons.LucideIcon;
                const isActive = i === active;
                return (
                  <button
                    type="button"
                    key={s.slug}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    style={{ width: isActive ? EXPANDED_W : COLLAPSED_W }}
                    className={`group relative shrink-0 h-[460px] overflow-hidden rounded-[28px] border text-left transition-[width,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "bg-hero-green border-hero-green shadow-2xl"
                        : "bg-canvas-parchment border-divider-soft shadow-sm hover:border-primary/40"
                    }`}
                  >
                    {/* Conteúdo recolhido — número + ícone/título no rodapé */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between p-7 transition-opacity duration-300 ${
                        isActive
                          ? "opacity-0 pointer-events-none"
                          : "opacity-100 delay-200"
                      }`}
                    >
                      <span className="font-serif text-6xl leading-none text-ink/15">
                        {pad(i + 1)}
                      </span>
                      <span className="flex flex-col items-start gap-3">
                        <Icon
                          className="h-7 w-7 text-hero-green"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <h3 className="font-serif text-xl text-ink">
                          {s.title}
                        </h3>
                      </span>
                    </div>

                    {/* Conteúdo expandido — card ativo */}
                    <div
                      className={`absolute inset-0 flex flex-col p-7 transition-opacity duration-500 ${
                        isActive
                          ? "opacity-100 delay-200"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <span className="flex items-start justify-between">
                        <ArrowUpRight
                          className="h-7 w-7 text-primary-on-dark"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>
                      <span className="mt-2 font-serif text-7xl leading-none text-primary-on-dark/90">
                        {pad(i + 1)}
                      </span>
                      <h3 className="mt-5 font-serif text-3xl text-body-on-dark">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-body-on-dark/70">
                        {s.short}
                      </p>
                      <span
                        className="mt-auto h-36 w-full rounded-2xl bg-canvas-parchment bg-cover bg-center"
                        style={{ backgroundImage: `url(${fundocard})` }}
                        aria-hidden
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-10 flex justify-center gap-2">
            {specialties.map((s, i) => (
              <button
                type="button"
                key={s.slug}
                onClick={() => setActive(i)}
                aria-label={`Ir para ${s.title}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-hero-green" : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
