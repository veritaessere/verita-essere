import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/button-1";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { buildWaLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { GreenAmbience } from "@/components/ui/GreenAmbience";
import { Card } from "@/components/ui/animated-glow-card";

type Entry = {
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
};

const entries: Entry[] = [
  {
    title: "O que é a psicoterapia",
    subtitle: "O tratamento",
    description:
      "Psicoterapia é um processo terapêutico estruturado, conduzido por um profissional habilitado, que utiliza métodos psicológicos baseados em teorias e evidências científicas para ajudar a pessoa a compreender e modificar padrões de pensamento, emoção e comportamento que causam sofrimento ou prejudicam seu funcionamento.",
    items: [
      "Identifica padrões de pensamento, comportamento e emoção",
      "Apoia mudanças que promovem mais qualidade de vida",
    ],
  },
  {
    title: "Quanto tempo dura",
    subtitle: "O processo",
    description:
      "Estudos clínicos indicam melhora significativa entre 12 e 18 sessões de Terapia Cognitivo-Comportamental na maioria dos casos leves a moderados.",
    items: [
      "O ritmo depende de diagnóstico, vínculo e motivação",
      "Cada processo é único e respeitado como tal",
    ],
  },
  {
    title: "Prática baseada em evidências",
    subtitle: "O método",
    description:
      "Na Verità Essere, o atendimento é amparado na Prática Baseada em Evidências, técnicas com eficácia comprovada cientificamente.",
    items: [
      "Abordagens validadas pela ciência",
      "Atendimento individualizado à sua realidade",
    ],
  },
  {
    title: "Um caminho com direção",
    subtitle: "O resultado",
    description:
      "A vida seguirá apresentando desafios, incertezas e mudanças. A diferença é que, agora, você não depende da ausência dos problemas para encontrar equilíbrio. Você desenvolveu recursos para compreender suas emoções, tomar decisões mais conscientes e seguir em frente com autonomia. Este não é o fim do processo, mas o início de uma nova forma de caminhar.",
  },
];

// alinhamento de cada card na trilha (desktop)
const ALIGN = ["md:self-start", "md:self-end", "md:self-start", "md:self-center"];

export function ComoPsicoterapiaTrilha() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geo, setGeo] = useState<{ w: number; h: number; d: string } | null>(
    null
  );

  // desenha o caminho a partir das posições reais dos cards:
  // entra por um lado, cruza por trás (card com fundo sólido) e sai do oposto;
  // no último card, entra por cima e para no centro.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const compute = () => {
      if (!window.matchMedia("(min-width: 768px)").matches) {
        setGeo(null);
        return;
      }
      const nodes = cardRefs.current;
      if (nodes.some((n) => !n)) return;
      // offsetTop/Left são posições de layout — imunes a transforms de animação.
      // Entrada pelo TOPO e saída pela BASE (centro do card): o vai-e-vem fica nos
      // vãos horizontais entre cards; junto ao card só aparece o toco vertical.
      const r = nodes.map((n) => ({
        cx: n!.offsetLeft + n!.offsetWidth / 2,
        top: n!.offsetTop,
        bottom: n!.offsetTop + n!.offsetHeight,
        cy: n!.offsetTop + n!.offsetHeight / 2,
      }));
      const W = el.clientWidth;
      const H = el.offsetHeight;
      const [r1, r2, r3, r4] = r;
      const k = 70; // clearance vertical (tangente reta ao entrar/sair)

      const d = [
        // uma única curva suave: começa quase vertical (leve curvatura) e entra
        // no topo do card 1 pela vertical — sem emenda, evitando "kink"
        `M ${W / 2} 0`,
        `C ${W / 2 + 20} ${r1.top * 0.33}, ${r1.cx} ${r1.top - k * 1.4}, ${r1.cx} ${r1.top}`,
        `L ${r1.cx} ${r1.bottom}`,
        // sai pela base do card 1, cruza o vão e entra no topo do card 2
        `C ${r1.cx} ${r1.bottom + k}, ${r2.cx} ${r2.top - k}, ${r2.cx} ${r2.top}`,
        `L ${r2.cx} ${r2.bottom}`,
        // idem para o card 3
        `C ${r2.cx} ${r2.bottom + k}, ${r3.cx} ${r3.top - k}, ${r3.cx} ${r3.top}`,
        `L ${r3.cx} ${r3.bottom}`,
        // entra no topo do card 4 e para no centro (não sai)
        `C ${r3.cx} ${r3.bottom + k}, ${r4.cx} ${r4.top - k}, ${r4.cx} ${r4.top}`,
        `L ${r4.cx} ${r4.cy}`,
      ].join(" ");

      setGeo({ w: W, h: H, d });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // preenchimento da trilha conforme o scroll cruza a área dos cards
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.7"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

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
              Nosso caminho para te{" "}
              <em className="italic font-normal text-primary-on-dark">
                ajudar.
              </em>
            </h2>
          </div>
        </Reveal>

        {/* trilha + cards */}
        <div
          ref={trackRef}
          className="relative mt-10 flex flex-col gap-10 pt-2 md:mt-20 md:gap-36 md:pt-28"
        >
          {/* caminho (desktop) — trilho apagado + traço dourado que segue o scroll */}
          {geo && (
            <svg
              className="pointer-events-none absolute left-0 top-0 z-0 hidden md:block"
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              fill="none"
              overflow="visible"
              aria-hidden
            >
              <path
                d={geo.d}
                stroke="#D4B679"
                strokeOpacity="0.18"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <motion.path
                d={geo.d}
                stroke="#C5A059"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ pathLength: reduced ? 1 : pathLength }}
              />
            </svg>
          )}

          {entries.map((entry, i) => {
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn("relative z-10 md:w-[46%]", ALIGN[i])}
              >
                {/* card com borda de brilho dourado; fundo sólido p/ o caminho passar por trás */}
                <Card className="w-full">
                  <div className="p-6 md:p-7">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-primary/80">
                        {entry.subtitle}
                      </span>
                      <h3 className="font-serif text-xl text-body-on-dark md:text-2xl">
                        {entry.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-body-on-dark/85">
                      {entry.description}
                    </p>

                    {entry.items && entry.items.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {entry.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-body-on-dark/75"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Card>
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
