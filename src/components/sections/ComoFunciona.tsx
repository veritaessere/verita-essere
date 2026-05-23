import { CalendarCheck, MessageCircle, Monitor, CalendarDays, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import fundoareas from "@/assets/images/fundoareas.png";

const steps = [
  {
    n: 1,
    icon: CalendarCheck,
    title: "Clique em agendar",
    body: "Inicie seu atendimento a partir do botão disponível no site.",
  },
  {
    n: 2,
    icon: MessageCircle,
    title: "Alinhe pelo WhatsApp",
    body: "Defina o horário da consulta em contato direto com o psicólogo.",
  },
  {
    n: 3,
    icon: Monitor,
    title: "Entre na sessão online",
    body: "Acesse a videochamada no dia e hora combinados.",
  },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="bg-canvas-parchment bg-no-repeat bg-cover bg-center md:min-h-[calc(100vh-5rem)] md:flex md:items-center"
      style={{ backgroundImage: `url(${fundoareas})` }}
    >
      <div className="py-20 md:py-28 w-full max-w-[1240px] mx-auto px-6 md:px-10 grid gap-12 md:grid-cols-12 md:gap-10 items-center">
        <Reveal className="md:col-span-5">
          <div>
            <p className="eyebrow text-primary">Como funciona</p>
            <span className="mt-3 block h-px w-16 bg-primary/60" />
            <h2 className="mt-8 font-serif font-medium text-ink leading-[1.05] tracking-tight text-5xl md:text-6xl lg:text-7xl">
              Da escolha do horário à sua{" "}
              <em className="italic font-normal text-hero-green">consulta</em>
            </h2>
            <span className="mt-8 block h-px w-24 bg-primary/60" />
            <p className="mt-6 max-w-md text-body leading-relaxed">
              Organizamos o atendimento de forma prática para que você tenha
              conforto desde o primeiro clique até a chamada online.
            </p>
            <div className="mt-8">
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

        <div className="md:col-span-7 relative">
          <span
            className="hidden md:block absolute left-6 top-12 bottom-12 w-px bg-primary/40"
            aria-hidden
          />
          <ul className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="relative flex items-stretch gap-5 md:gap-6 md:pl-0">
                  <span
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/60 bg-canvas font-serif text-xl text-ink self-center"
                    aria-hidden
                  >
                    {s.n}
                  </span>
                  <article className="relative flex-1 rounded-[20px] border border-divider-soft bg-canvas/85 shadow-sm px-6 py-6 md:px-8 md:py-7 flex items-center gap-5">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-canvas-parchment text-ink/80">
                      <s.icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl text-ink">{s.title}</h3>
                      <p className="mt-2 text-body leading-relaxed">{s.body}</p>
                    </div>
                  </article>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
