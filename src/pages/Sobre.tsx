import { Seo } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

const pilares = [
  {
    title: "Ética",
    body: "Sigilo, respeito e conduta alinhada às diretrizes do Conselho Federal de Psicologia.",
  },
  {
    title: "Acolhimento",
    body: "Cada pessoa é recebida no seu tempo, sem julgamento, com escuta atenta e cuidadosa.",
  },
  {
    title: "Evidência",
    body: "Práticas psicoterapêuticas baseadas em evidências científicas atualizadas.",
  },
];

export default function Sobre() {
  return (
    <>
      <Seo path="/sobre" title="Sobre a clínica" description="Conheça a Verità Essere — clínica de psicologia online com atendimento humano, ético e baseado em evidências." />

      <section className="bg-surface-deep text-body-on-dark">
        <div className="container-content py-20 md:py-28 max-w-3xl">
          <p className="eyebrow text-body-muted">Sobre a clínica</p>
          <h1 className="mt-3 font-display font-light text-5xl md:text-6xl tracking-tight">
            <span className="font-serif italic text-primary-on-dark">La verità dell&apos;essere</span>
            <span className="block mt-2">A verdade do ser.</span>
          </h1>
          <p className="mt-6 text-lg text-body-muted leading-relaxed">
            A Verità Essere nasce do desejo de oferecer um espaço onde a verdade do ser
            possa ser acolhida. Acreditamos que a psicoterapia é um encontro
            transformador — espaço de escuta, reflexão e cuidado.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="container-content py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">Filosofia</p>
            <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink max-w-2xl">
              Nossos princípios.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pilares.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div>
                  <h3 className="font-display font-light text-2xl text-ink tracking-tightish">{p.title}</h3>
                  <p className="mt-3 text-body leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas-parchment">
        <div className="container-content py-20 md:py-28 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Atendimento</p>
            <h2 className="mt-3 font-display font-light text-3xl md:text-4xl tracking-tight text-ink">
              {site.modality} via {site.platform}.
            </h2>
            <p className="mt-5 text-lg text-body leading-relaxed">
              {site.hours.days}, das {site.hours.time}. Atendemos exclusivamente em
              modalidade particular, sem convênios.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
