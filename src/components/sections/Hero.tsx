import { Leaf, ShieldCheck, HeartHandshake, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import psicologos from "@/assets/images/psicologos.png";
import fundo from "@/assets/images/fundo.png";

const badges = [
  { icon: ShieldCheck, title: "Ambiente seguro", sub: "e acolhedor" },
  { icon: HeartHandshake, title: "Escuta ativa", sub: "humana e individualizada" },
  { icon: BookOpen, title: "Abordagem moderna", sub: "e baseada em ciência" },
];

export function Hero() {
  return (
    <section
      className="bg-hero-bg bg-no-repeat bg-cover bg-center bg-fixed md:h-[calc(100vh-5rem)] md:flex md:items-end md:overflow-hidden"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="w-full px-4 md:px-20 lg:px-28 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 pt-10 md:pt-16 pb-0 md:pb-0 md:items-start">
        <div className="md:col-span-6 pb-12 md:pb-0">
          <p className="flex items-center gap-2 mb-6 text-sm font-medium text-hero-green">
            <Leaf className="h-4 w-4" aria-hidden />
            Psicologia clínica com acolhimento e ética
          </p>

          <h1 className="font-serif font-medium text-hero-ink leading-[1.05] tracking-tight text-[44px] sm:text-[56px] md:text-7xl lg:text-[84px]">
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

        <div className="md:col-span-6 md:self-end overflow-visible flex md:justify-end">
          <img
            src={psicologos}
            alt="Lucas Fachin e Tamara Mikaelly, psicólogos da Verità Essere"
            width={520}
            height={620}
            loading="eager"
            fetchPriority="high"
            className="block w-full h-auto md:w-auto md:h-[calc(100vh-5rem)] md:max-h-[80vh] max-w-none drop-shadow-hero-photo"
          />
        </div>
      </div>
    </section>
  );
}
