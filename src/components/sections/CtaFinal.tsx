import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { buildWaLink } from "@/lib/whatsapp";

export function CtaFinal() {
  return (
    <section className="bg-canvas-parchment">
      <div className="container-content py-20 md:py-28 text-center max-w-2xl">
        <Reveal>
          <p className="eyebrow">Próximo passo</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink">
            Pronto para começar?
          </h2>
          <p className="mt-5 text-lg text-body leading-relaxed">
            Agende uma conversa inicial e descubra como podemos caminhar juntos.
          </p>
          <div className="mt-8">
            <Button asChild variant="primary" size="lg">
              <a href={buildWaLink("generic")} target="_blank" rel="noopener noreferrer">
                Agendar uma conversa
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
