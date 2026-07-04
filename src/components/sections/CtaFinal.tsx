import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { buildWaLink } from "@/lib/whatsapp";
import { SoftAmbience } from "@/components/ui/SoftAmbience";
import ctafundo from "@/assets/images/fundocta.png";

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-canvas-tint md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <SoftAmbience />
      <div className="relative container-content py-20 md:py-28 w-full">
        <Reveal>
          <div
            className="relative min-h-[440px] overflow-hidden rounded-[28px] bg-cover bg-center shadow-lift md:min-h-[520px] md:flex md:items-center"
            style={{ backgroundImage: `url(${ctafundo})` }}
          >
            {/* escurece a foto para dar legibilidade ao texto */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/10"
              aria-hidden
            />

            <div className="relative z-10 max-w-xl px-8 py-16 md:px-16 md:py-24">
              <p className="eyebrow text-primary-on-dark">Próximo passo</p>
              <h2 className="mt-4 font-serif font-medium leading-[1.1] tracking-tight text-body-on-dark text-3xl sm:text-4xl md:text-5xl">
                Pronto para dar o primeiro passo no seu cuidado?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-body-on-dark/85">
                Agende uma conversa inicial e descubra como podemos caminhar
                juntos, no seu tempo.
              </p>
              <div className="mt-8">
                <Button asChild variant="green" size="lg">
                  <a
                    href={buildWaLink("generic")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar uma conversa
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
