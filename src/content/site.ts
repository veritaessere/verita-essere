export const site = {
  name: "Verità Essere",
  taglinePt: "A Verdade do Ser",
  taglineIt: "La verità dell'essere",
  url: "https://clinicaveritaessere.com",
  description:
    "Clínica de psicologia online com atendimento humano, ético e baseado em evidências.",
  whatsapp: {
    raw: "5545988162056",
    display: "(45) 98816-2056",
  },
  email: "veritaessere@gmail.com",
  instagram: "https://instagram.com/veritaessere",
  city: "Medianeira - PR",
  hours: { days: "Segunda a sábado", time: "07h às 23h" },
  platform: "Google Meet",
  modality: "100% Online",
  // navegação em âncoras (one-pager): `id` = seção alvo na home ("" = topo)
  navLinks: [
    { to: "/", id: "", label: "Início" },
    { to: "/#sobre", id: "sobre", label: "Sobre" },
    { to: "/#equipe", id: "equipe", label: "Equipe" },
    { to: "/#areas", id: "areas", label: "Áreas de atuação" },
    { to: "/#como-funciona", id: "como-funciona", label: "Contato" },
  ],
} as const;
