import { Reveal } from "@/components/motion/Reveal";
import { SpecialtyCard } from "@/components/cards/SpecialtyCard";
import { specialties } from "@/content/specialties";

export function AreasSection() {
  return (
    <section className="bg-canvas">
      <div className="container-content py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">Áreas de atuação</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink max-w-2xl">
            Acompanhamento em diferentes demandas da vida.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <SpecialtyCard specialty={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
