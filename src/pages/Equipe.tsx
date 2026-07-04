import { Seo } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { ProfessionalCard } from "@/components/cards/ProfessionalCard";
import { professionals } from "@/content/professionals";
import { specialties } from "@/content/specialties";
import { personSchemas } from "@/lib/schema";

export default function Equipe() {
  return (
    <>
      <Seo
        path="/equipe"
        title="Equipe"
        description="Conheça os psicólogos da Verità Essere."
        jsonLd={personSchemas}
      />

      <section className="bg-canvas-tint">
        <div className="container-content pt-16 md:pt-24 pb-10">
          <p className="eyebrow">Equipe</p>
          <h1 className="mt-3 font-display font-light text-5xl md:text-6xl tracking-tight text-ink max-w-3xl">
            Profissionais para acompanhar a sua jornada.
          </h1>
        </div>
      </section>

      <section className="bg-canvas-tint">
        <div className="container-content pb-20 md:pb-28 grid gap-12">
          {professionals.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div className="grid gap-8 md:grid-cols-12 items-start">
                <div className="md:col-span-5">
                  <ProfessionalCard professional={p} variant="expanded" />
                </div>
                <div className="md:col-span-7">
                  <h2 className="font-display font-light text-3xl text-ink tracking-tightish">{p.name}</h2>
                  <p className="text-sm text-ink-muted-48 mt-1">{p.crp}</p>
                  <p className="mt-5 text-body leading-relaxed">{p.fullBio}</p>

                  <div className="mt-6">
                    <p className="eyebrow mb-2">Áreas que atende</p>
                    <ul className="flex flex-wrap gap-2">
                      {p.areas.map((slug) => {
                        const s = specialties.find((x) => x.slug === slug);
                        if (!s) return null;
                        return (
                          <li key={slug} className="text-sm bg-canvas-parchment border border-divider-soft rounded-pill px-3 py-1 text-body">
                            {s.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
