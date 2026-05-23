import { Leaf, ShieldCheck, HeartHandshake, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import psicologos from "@/assets/images/psicologos.png";

const badges = [
  { icon: ShieldCheck, title: "Ambiente seguro", sub: "e acolhedor" },
  { icon: HeartHandshake, title: "Escuta ativa", sub: "humana e individualizada" },
  { icon: BookOpen, title: "Abordagem moderna", sub: "e baseada em ciência" },
];

export function Hero() {
  return (
    <section className="bg-hero-bg">
      <div className="container-content grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-10 md:pt-16 pb-0 md:pb-0 items-end">
        <div className="md:col-span-7 pb-12 md:pb-20">
          <p className="flex items-center gap-2 mb-6 text-sm font-medium text-hero-green">
            <Leaf className="h-4 w-4" aria-hidden />
            Psicologia clínica com acolhimento e ética
          </p>

          <h1 className="font-serif font-normal text-hero-ink leading-[1.05] tracking-tight text-[40px] sm:text-5xl md:text-6xl lg:text-7xl">
            Um espaço seguro para{" "}
            <em className="italic text-hero-green font-normal">cuidar</em>{" "}
            da sua saúde emocional.
          </h1>

          <p className="mt-6 text-lg text-hero-muted max-w-xl">
            Atendimento psicológico online especializado para ajudar você a
            compreender, ressignificar e viver com mais equilíbrio, leveza e
            bem-estar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="green" size="lg">
              <a href={buildWaLink("hero")} target="_blank" rel="noopener noreferrer">
                Agendar consulta
              </a>
            </Button>
            <Button asChild variant="outline-green" size="lg">
              <a href="#como-funciona">100% Online</a>
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {badges.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-hero-green/10 text-hero-green shrink-0">
                  <b.icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="text-sm">
                  <p className="font-medium text-hero-ink leading-tight">{b.title}</p>
                  <p className="text-hero-muted leading-tight">{b.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 self-end">
          <img
            src={psicologos}
            alt="Lucas Fachin e Tamara Mikaelly, psicólogos da Verità Essere"
            width={520}
            height={620}
            loading="eager"
            fetchPriority="high"
            className="block w-full h-auto max-w-[480px] mx-auto md:mx-0 md:ml-auto drop-shadow-hero-photo"
          />
        </div>
      </div>
    </section>
  );
}
