import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

export function SobreSnippet() {
  return (
    <section className="bg-canvas">
      <div className="container-content py-20 md:py-28 max-w-3xl">
        <Reveal>
          <p className="eyebrow">Sobre a clínica</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink">
            Um espaço pensado para o seu tempo.
          </h2>
          <p className="mt-6 text-lg text-body leading-relaxed">
            A Verità Essere reúne psicólogos comprometidos com um atendimento ético,
            humano e baseado em evidências. Acreditamos que cada pessoa carrega uma história
            singular, e que o processo terapêutico é construído no encontro.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/sobre">Conheça nossa filosofia</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
