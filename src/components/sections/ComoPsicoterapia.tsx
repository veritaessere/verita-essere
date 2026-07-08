import { useEffect, useRef, useState } from "react";
import { Brain, CalendarCheck, FlaskConical, Compass } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/button-1";
import { buildWaLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { GreenAmbience } from "@/components/ui/GreenAmbience";

type Entry = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
};

const entries: Entry[] = [
  {
    icon: Brain,
    title: "O que é a psicoterapia",
    subtitle: "O tratamento",
    description:
      "Um tratamento que aplica técnicas e abordagens terapêuticas para ajudar você a lidar com seus desafios de forma mais assertiva.",
    items: [
      "Identifica padrões de pensamento, comportamento e emoção",
      "Apoia mudanças que promovem mais qualidade de vida",
      "Espaço de escuta qualificada, ético e sem julgamentos",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Quanto tempo dura",
    subtitle: "O processo",
    description:
      "Estudos clínicos indicam melhora significativa entre 12 e 18 sessões de Terapia Cognitivo-Comportamental na maioria dos casos leves a moderados.",
    items: [
      "O ritmo depende de diagnóstico, vínculo e motivação",
      "Cada processo é único e respeitado como tal",
      "Reavaliações periódicas ao longo do acompanhamento",
    ],
  },
  {
    icon: FlaskConical,
    title: "Prática baseada em evidências",
    subtitle: "O método",
    description:
      "Na Verità Essere, o atendimento é amparado na Prática Baseada em Evidências — técnicas com eficácia comprovada cientificamente.",
    items: [
      "Abordagens validadas pela ciência",
      "Atendimento individualizado à sua realidade",
      "Profissional qualificado e comprometido com o seu cuidado",
    ],
  },
  {
    icon: Compass,
    title: "Um caminho com direção",
    subtitle: "O resultado",
    description:
      "É como seguir um mapa confiável, que orienta cada passo em direção a uma vida com mais leveza e sentido.",
  },
];

export function ComoPsicoterapia() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // O card mais próximo do topo/centro da viewport fica ativo (expandido).
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      setActiveIndex((prev) => (prev === bestIndex ? prev : bestIndex));
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="psicoterapia"
      className="relative overflow-hidden bg-surface-forest scroll-mt-20"
    >
      <GreenAmbience />

      <div className="relative py-20 md:py-28 w-full max-w-[1100px] mx-auto px-6 md:px-10">
        {/* cabeçalho */}
        <Reveal className="text-center">
          <div className="flex flex-col items-center">
            <p className="eyebrow text-primary">Como funciona a psicoterapia</p>
            <span className="mt-3 block h-px w-16 bg-primary/60" />
            <h2 className="mt-6 font-serif font-medium text-body-on-dark leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl">
              E como podemos te ajudar?{" "}
              <em className="italic font-normal text-primary-on-dark">
                Com a psicoterapia.
              </em>
            </h2>
          </div>
        </Reveal>

        {/* timeline com card ativo por scroll */}
        <div className="mx-auto mt-16 max-w-3xl space-y-14 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const Icon = entry.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:gap-12"
                aria-current={isActive ? "true" : "false"}
              >
                {/* coluna meta (sticky no desktop) */}
                <div className="top-28 flex h-min w-64 shrink-0 items-center gap-3 md:sticky">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                      isActive
                        ? "bg-primary text-ink ring-1 ring-primary"
                        : "bg-white/10 text-body-on-dark/60 ring-1 ring-primary-on-dark/25"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg text-body-on-dark">
                      {entry.title}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-primary/80">
                      {entry.subtitle}
                    </span>
                  </div>
                </div>

                {/* sentinela p/ medir proximidade ao centro da viewport */}
                <div
                  ref={(el) => {
                    sentinelRefs.current[index] = el;
                  }}
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                {/* card de conteúdo */}
                <article
                  className={cn(
                    "flex flex-col rounded-[24px] border p-6 transition-all duration-300 md:p-7",
                    isActive
                      ? "border-primary/40 bg-white/[0.06] shadow-2xl"
                      : "border-primary-on-dark/15 bg-white/[0.03]"
                  )}
                >
                  <p
                    className={cn(
                      "leading-relaxed transition-all duration-300 text-body-on-dark/85",
                      isActive ? "line-clamp-none" : "line-clamp-2 text-body-on-dark/60"
                    )}
                  >
                    {entry.description}
                  </p>

                  {entry.items && entry.items.length > 0 && (
                    <div
                      aria-hidden={!isActive}
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isActive
                          ? "mt-4 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-2 rounded-2xl border border-primary-on-dark/15 bg-black/10 p-4">
                          {entry.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-body-on-dark/80"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </article>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-pill bg-primary px-8 text-base text-ink shadow-sm hover:bg-primary-hover"
          >
            <a
              href={buildWaLink("generic")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar psicólogo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
