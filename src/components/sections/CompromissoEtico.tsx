import { Reveal } from "@/components/motion/Reveal";

export function CompromissoEtico() {
  return (
    <section className="bg-canvas-parchment md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <div className="container-content py-20 md:py-28 w-full">
        <Reveal>
          <p className="eyebrow text-primary text-center">Compromisso ético</p>
          <h2 className="mt-4 text-center font-serif font-medium text-ink leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl">
            Cuidado guiado por ética e responsabilidade
          </h2>
          <p className="mt-8 mx-auto max-w-3xl text-center text-lg text-body leading-relaxed">
            Nossa prática segue integralmente o Código de Ética Profissional do
            Psicólogo e as resoluções do Conselho Federal de Psicologia. Toda
            sessão é conduzida com sigilo, respeito à autonomia do paciente e
            transparência sobre o processo terapêutico.
          </p>
          <div className="mt-10 mx-auto max-w-2xl grid gap-3 text-center text-body">
            <p>
              <span className="font-medium text-ink">Lucas Fachin</span>{" "}
              — CRP 08/46660
            </p>
            <p>
              <span className="font-medium text-ink">Tamara Mikaelly</span>{" "}
              — CRP 08/46551
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
