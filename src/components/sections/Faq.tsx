import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    q: "Como funciona a psicoterapia online?",
    a: "As sessões acontecem por videochamada no Google Meet, em ambiente reservado e seguro. O cuidado clínico segue o mesmo rigor do atendimento presencial, conforme orientações do Conselho Federal de Psicologia.",
  },
  {
    q: "Qual a duração de cada sessão?",
    a: "Em geral, cada sessão tem cerca de 50 minutos. A frequência é definida em conjunto com o profissional a partir das suas necessidades.",
  },
  {
    q: "Por quanto tempo preciso fazer terapia?",
    a: "Não existe um prazo único. O tempo varia conforme os objetivos do processo, a demanda apresentada e o ritmo de cada pessoa.",
  },
  {
    q: "As sessões são sigilosas?",
    a: "Sim. O sigilo é um pilar da prática psicológica e está previsto no Código de Ética Profissional do Psicólogo.",
  },
  {
    q: "Vocês atendem por convênio?",
    a: "No momento, o atendimento é exclusivamente particular. É possível solicitar recibo para eventual reembolso junto ao seu plano de saúde.",
  },
  {
    q: "Como faço para agendar?",
    a: "O agendamento é feito diretamente pelo WhatsApp. Basta clicar em “Agendar consulta” e enviar uma mensagem.",
  },
];

export function Faq() {
  return (
    <section className="bg-canvas md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <div className="container-content py-20 md:py-28 w-full">
        <Reveal>
          <p className="eyebrow text-primary text-center">Dúvidas frequentes</p>
          <h2 className="mt-4 text-center font-serif font-medium text-ink leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl">
            Perguntas comuns sobre o atendimento
          </h2>
        </Reveal>

        <div className="mt-16 mx-auto max-w-3xl divide-y divide-hairline">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="group py-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-display text-lg text-ink">
                  {item.q}
                  <span className="text-primary text-2xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-body leading-relaxed">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
