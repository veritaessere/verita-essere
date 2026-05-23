import { Reveal } from "@/components/motion/Reveal";
import { ProfessionalCard } from "@/components/cards/ProfessionalCard";
import { professionals } from "@/content/professionals";

export function EquipeSection() {
  return (
    <section className="bg-canvas-parchment md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <div className="container-content py-20 md:py-28 w-full">
        <Reveal>
          <p className="eyebrow">Equipe</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink max-w-2xl">
            Profissionais para acompanhar a sua jornada.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {professionals.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProfessionalCard professional={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
