import { Seo } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { SpecialtyCard } from "@/components/cards/SpecialtyCard";
import { specialties } from "@/content/specialties";

export default function Especialidades() {
  return (
    <>
      <Seo
        path="/especialidades"
        title="Áreas de atuação"
        description="Conheça as áreas de atuação da Verità Essere: ansiedade, depressão, autismo, infantil e mais."
      />

      <section className="bg-canvas">
        <div className="container-content pt-16 md:pt-24 pb-10 max-w-3xl">
          <p className="eyebrow">Áreas de atuação</p>
          <h1 className="mt-3 font-display font-light text-5xl md:text-6xl tracking-tight text-ink">
            Acompanhamento em diferentes demandas da vida.
          </h1>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="container-content pb-20 md:pb-28 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <SpecialtyCard specialty={s} variant="expanded" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
