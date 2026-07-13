import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/button-1";
import { Stepper, StepperItem, StepperIndicator } from "@/components/stepper";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { buildWaLink } from "@/lib/whatsapp";
import { GreenAmbience } from "@/components/ui/GreenAmbience";
import img1 from "@/assets/images/comocard1.png";
import img2 from "@/assets/images/comocard2.png";
import img3 from "@/assets/images/comocard3.png";

const steps = [
  {
    n: 1,
    img: img1,
    title: "Agende sua sessão",
    body: "Escolha o melhor dia e horário \n para você com apenas alguns cliques.",
    // fração do scroll em que o marcador é preenchido
    fill: 0,
  },
  {
    n: 2,
    img: img2,
    title: "Fale pelo WhatsApp",
    body: "Confirmamos sua sessão\ne tiramos todas as suas \ndúvidas.",
    fill: 0.5,
  },
  {
    n: 3,
    img: img3,
    title: "Entre na sessão online",
    body: "No dia e horário marcados, é só acessar e cuidar do que realmente importa: você.",
    fill: 1,
  },
];

const completedIndicator = <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />;

function StepTimeline() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(reduced ? 1 : 0);

  // progresso do scroll enquanto a timeline cruza a viewport
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 55%"],
  });
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduced) setProgress(v);
  });

  return (
    <Stepper value={1} indicators={{ completed: completedIndicator }}>
      <div className="mt-16 md:mt-20">
        {/* linha + marcadores */}
        <div ref={trackRef} className="relative">
          {/* trilho de fundo (centro a centro dos marcadores) */}
          <div className="absolute left-5 right-5 top-5 h-[2px] -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-primary-on-dark/25" aria-hidden />
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-primary"
              style={{ width: reduced ? "100%" : fillWidth }}
              aria-hidden
            />
          </div>

          {/* marcadores */}
          <div className="relative z-10 flex justify-between">
            {steps.map((s) => (
              <StepperItem
                key={s.n}
                step={s.n}
                completed={progress >= s.fill}
                className="flex-none"
              >
                <StepperIndicator className="size-10 border border-primary-on-dark/50 bg-surface-deep font-serif text-base text-body-on-dark/70 transition-colors duration-500 data-[state=completed]:border-primary data-[state=completed]:bg-primary data-[state=completed]:text-ink">
                  {s.n}
                </StepperIndicator>
              </StepperItem>
            ))}
          </div>
        </div>

        {/* cards de cada passo, alinhados às colunas dos marcadores */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <article
                className="relative flex h-[330px] flex-col overflow-hidden rounded-[24px] bg-canvas-parchment bg-cover bg-center p-6 text-left shadow-sm transition-shadow duration-300 hover:shadow-card md:h-[360px]"
                style={{ backgroundImage: `url(${s.img})` }}
                role="img"
                aria-label={s.title}
              >
                {/* overlay sutil só para legibilidade do texto */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas-parchment/35 via-transparent to-transparent"
                  aria-hidden
                />

                {/* número (topo) */}
                <span className="relative flex items-center gap-3">
                  <span className="font-serif text-lg font-medium text-primary">
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-primary/50" aria-hidden />
                </span>

                {/* título + corpo */}
                <div className="relative mt-4 pr-12">
                  <h3 className="font-serif text-xl font-medium leading-tight text-black md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-[15rem] whitespace-pre-line text-[0.8rem] font-medium leading-relaxed text-black">
                    {s.body}
                  </p>
                </div>

              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Stepper>
  );
}

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-surface-forest scroll-mt-20 md:min-h-[calc(100vh-5rem)] md:flex md:items-center"
    >
      <GreenAmbience />

      <div className="relative py-20 md:py-28 w-full max-w-[1100px] mx-auto px-6 md:px-10">
        {/* cabeçalho */}
        <Reveal className="text-center">
          <div className="flex flex-col items-center">
            <p className="eyebrow text-primary">Como funciona</p>
            <span className="mt-3 block h-px w-16 bg-primary/60" />
            <h2 className="mt-6 font-serif font-medium text-body-on-dark leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl">
              Começar sua terapia é{" "}
              <em className="italic font-normal text-primary-on-dark">simples</em>
            </h2>
            <p className="mt-5 text-lg text-body-on-dark/85 leading-relaxed">
              Um processo acolhedor, prático e 100% online.
            </p>
            <div className="mt-8">
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
                  Agendar minha primeira sessão
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* passo a passo com preenchimento no scroll */}
        <StepTimeline />
      </div>
    </section>
  );
}
