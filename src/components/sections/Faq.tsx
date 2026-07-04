import { Reveal } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SoftAmbience } from "@/components/ui/SoftAmbience";

const faqs = [
  {
    id: "item-1",
    q: "Como funciona a psicoterapia online?",
    a: "As sessões acontecem por videochamada no Google Meet, em ambiente reservado e seguro. O cuidado clínico segue o mesmo rigor do atendimento presencial, conforme orientações do Conselho Federal de Psicologia.",
  },
  {
    id: "item-2",
    q: "Qual a duração de cada sessão?",
    a: "Em geral, cada sessão tem cerca de 50 minutos. A frequência é definida em conjunto com o profissional a partir das suas necessidades.",
  },
  {
    id: "item-3",
    q: "Por quanto tempo preciso fazer terapia?",
    a: "Não existe um prazo único. O tempo varia conforme os objetivos do processo, a demanda apresentada e o ritmo de cada pessoa.",
  },
  {
    id: "item-4",
    q: "As sessões são sigilosas?",
    a: "Sim. O sigilo é um pilar da prática psicológica e está previsto no Código de Ética Profissional do Psicólogo.",
  },
  {
    id: "item-5",
    q: "Vocês atendem por convênio?",
    a: "No momento, o atendimento é exclusivamente particular. É possível solicitar recibo para eventual reembolso junto ao seu plano de saúde.",
  },
  {
    id: "item-6",
    q: "Como faço para agendar?",
    a: "O agendamento é feito diretamente pelo WhatsApp. Basta clicar em “Agendar consulta” e enviar uma mensagem.",
  },
];

export function Faq() {
  return (
    <section className="relative overflow-hidden bg-canvas-tint md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <SoftAmbience />
      <div className="relative container-content py-20 md:py-28 w-full">
        <Reveal>
          <p className="eyebrow text-primary text-center">Dúvidas frequentes</p>
          <h2 className="mt-4 text-center font-serif font-medium text-ink leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Perguntas comuns sobre o atendimento
          </h2>
        </Reveal>

        <Reveal className="mt-16 mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-hairline"
              >
                <AccordionTrigger className="py-5 font-display text-lg text-ink hover:no-underline [&>svg]:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-base text-body leading-relaxed">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
