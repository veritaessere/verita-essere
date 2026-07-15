export type FaqItem = { id: string; q: string; a: string };

export const faqs: FaqItem[] = [
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
