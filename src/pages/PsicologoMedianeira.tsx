import { Leaf, MapPin, CalendarDays, ChevronRight, Video } from "lucide-react";
import { Seo } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { SoftAmbience } from "@/components/ui/SoftAmbience";
import { buildWaLink } from "@/lib/whatsapp";
import { specialties } from "@/content/specialties";
import { medicalBusinessSchema } from "@/lib/schema";

const cidades = [
  "Medianeira",
  "Matelândia",
  "Missal",
  "Serranópolis do Iguaçu",
  "São Miguel do Iguaçu",
  "Itaipulândia",
  "Ramilândia",
  "Céu Azul",
  "Foz do Iguaçu",
  "Cascavel",
];

export default function PsicologoMedianeira() {
  return (
    <>
      <Seo
        path="/psicologo-em-medianeira"
        title="Psicólogo em Medianeira e Região"
        description="Psicólogo em Medianeira (PR) com atendimento online para você e toda a região oeste do Paraná. Psicoterapia baseada em evidências, no conforto de casa. Agende pelo WhatsApp."
        jsonLd={medicalBusinessSchema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-canvas-tint">
        <SoftAmbience />
        <div className="relative container-content py-20 md:py-28 max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow inline-flex items-center justify-center gap-2 text-primary">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Medianeira · Oeste do Paraná
            </p>
            <h1 className="mt-4 font-serif font-medium text-ink leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Psicólogo em{" "}
              <em className="italic font-normal text-hero-green">Medianeira</em>{" "}
              e região
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-body leading-relaxed">
              Psicoterapia baseada em evidências, com atendimento{" "}
              <strong className="font-medium text-ink">100% online</strong> para
              moradores de Medianeira e de toda a região oeste do Paraná. O mesmo
              cuidado clínico do consultório, no conforto e na privacidade da sua
              casa.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="green" size="lg">
                <a
                  href={buildWaLink("generic")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  Agendar consulta
                </a>
              </Button>
              <Button asChild variant="outline-green" size="lg">
                <a href="/#areas">Ver áreas de atuação</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Atendimento online + cidades atendidas */}
      <section className="relative overflow-hidden bg-canvas">
        <div className="relative container-content py-16 md:py-24 max-w-4xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-deep text-primary-on-dark ring-2 ring-primary/40">
                <Video className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-5 font-serif font-medium text-ink leading-[1.15] tracking-tight text-2xl sm:text-3xl md:text-4xl">
                Atendimento online para Medianeira e toda a região
              </h2>
              <p className="mt-5 text-base md:text-lg text-body leading-relaxed">
                As sessões acontecem por videochamada no Google Meet, em ambiente
                reservado e seguro, seguindo o mesmo rigor do atendimento
                presencial e as orientações do Conselho Federal de Psicologia.
                Sem deslocamento, com horários flexíveis (segunda a sábado) e a
                mesma escuta qualificada — onde quer que você esteja na região.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
              {cidades.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-pill border border-primary/30 bg-canvas-tint px-3.5 py-1.5 text-sm text-body"
                >
                  <Leaf className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm text-ink-muted-48">
              Não encontrou sua cidade? O atendimento online alcança todo o Brasil.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Áreas de atuação (texto indexável) */}
      <section className="relative overflow-hidden bg-canvas-tint">
        <SoftAmbience />
        <div className="relative container-content py-16 md:py-24 max-w-4xl">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow text-primary">Em que posso ajudar</p>
              <h2 className="mt-4 font-serif font-medium text-ink leading-[1.15] tracking-tight text-2xl sm:text-3xl md:text-4xl">
                Principais demandas atendidas
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {specialties.map((s) => (
                <li
                  key={s.slug}
                  className="rounded-card border border-hairline bg-canvas p-5 shadow-sm"
                >
                  <h3 className="font-display font-medium text-ink tracking-tightish">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-body leading-relaxed">
                    {s.short}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-surface-forest">
        <div className="relative container-content py-16 md:py-24 max-w-2xl text-center">
          <Reveal>
            <h2 className="font-serif font-medium text-body-on-dark leading-[1.1] tracking-tight text-2xl sm:text-3xl md:text-4xl">
              Dê o primeiro passo hoje
            </h2>
            <p className="mt-5 text-base md:text-lg text-body-on-dark/85 leading-relaxed">
              Agende sua consulta com um psicólogo em Medianeira e comece uma
              psicoterapia online, prática e acolhedora.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-pill bg-primary px-8 text-base text-ink shadow-sm hover:bg-primary-hover"
              >
                <a
                  href={buildWaLink("generic")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Agendar pelo WhatsApp
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
