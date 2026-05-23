import * as Icons from "lucide-react";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import { specialties } from "@/content/specialties";
import fundosobre from "@/assets/images/fundoareas.png";

export function AreasSection() {
  return (
    <section
      className="bg-canvas-parchment bg-no-repeat bg-cover bg-center md:min-h-[calc(100vh-5rem)] md:flex md:items-center"
      style={{ backgroundImage: `url(${fundosobre})` }}
    >
      <div className="py-20 md:py-28 w-full max-w-[1240px] mx-auto px-6 md:px-10 grid gap-12 md:grid-cols-12 md:gap-10 items-center">
        <Reveal className="md:col-span-5">
          <div>
            <p className="eyebrow text-primary">Áreas de atuação</p>
            <h2 className="mt-4 font-serif font-medium text-ink leading-[1.1] tracking-tight text-5xl md:text-6xl lg:text-7xl">
              O que tratamos{" "}
              <span className="block">
                com{" "}
                <em className="italic font-normal text-hero-green">
                  acolhimento
                </em>
              </span>
              e ciência.
            </h2>
            <span className="mt-8 block h-px w-24 bg-primary/60" />
            <p className="mt-6 max-w-md text-body leading-relaxed">
              Oferecemos atendimento psicológico para diferentes demandas
              emocionais, sempre com acolhimento, ética, escuta qualificada e
              base científica.
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

        <div className="md:col-span-7 grid gap-5 grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => {
            const Icon = Icons[s.icon as keyof typeof Icons] as Icons.LucideIcon;
            return (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <article
                  className="relative h-full rounded-[24px] border border-divider-soft shadow-sm px-6 py-7 flex flex-col items-center text-center bg-no-repeat bg-cover bg-center overflow-hidden"
                  style={{ backgroundImage: `url(${fundosobre})` }}
                >
                  <div className="absolute inset-0 bg-canvas/85 rounded-[24px]" />
                  <span className="relative text-ink/80">
                    <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="relative mt-4 font-serif text-xl text-ink">{s.title}</h3>
                  <span className="relative mt-2 block h-px w-8 bg-primary/70" />
                  <p className="relative mt-3 text-sm text-body leading-relaxed">
                    {s.short}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
