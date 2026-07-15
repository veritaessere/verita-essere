import type { Specialty } from "./types";
import ansiedadeImg from "@/assets/images/ansiedade.webp";
import depressaoImg from "@/assets/images/depressao.webp";
import estresseImg from "@/assets/images/estresse.webp";
import traumasImg from "@/assets/images/traumas.webp";
import sonoImg from "@/assets/images/sono.webp";
import autoestimaImg from "@/assets/images/autoestima.webp";
import terceiraIdadeImg from "@/assets/images/terceira_idade.webp";
import relacionamentosImg from "@/assets/images/relacionamentos.webp";
import lutoImg from "@/assets/images/luto.webp";
import viciosImg from "@/assets/images/vicios.webp";

export const specialties: Specialty[] = [
  {
    slug: "ansiedade",
    title: "Ansiedade",
    short: "Manejo de sintomas, regulação e qualidade de vida.",
    description:
      "Atendimento para diferentes apresentações de ansiedade — generalizada, social, crises de pânico. Trabalhamos compreensão dos gatilhos, estratégias de regulação emocional e construção de uma rotina mais leve.",
    icon: "Brain",
    image: ansiedadeImg,
  },
  {
    slug: "depressao",
    title: "Depressão",
    short: "Acolhimento e construção de novos sentidos.",
    description:
      "Espaço de acolhimento para quem atravessa episódios depressivos. O processo busca compreender o contexto, fortalecer recursos internos e reconstruir vínculos com aquilo que faz sentido.",
    icon: "CloudDrizzle",
    image: depressaoImg,
  },
  {
    slug: "estresse-burnout",
    title: "Estresse e Burnout",
    short: "Manejo do esgotamento e reequilíbrio da rotina.",
    description:
      "Apoio para lidar com o estresse crônico e o esgotamento profissional (burnout), com estratégias de regulação, definição de limites e recuperação do bem-estar.",
    icon: "Activity",
    image: estresseImg,
  },
  {
    slug: "traumas",
    title: "Traumas",
    short: "Elaboração de experiências difíceis.",
    description:
      "Espaço seguro para elaborar experiências traumáticas, reduzir o impacto emocional e reconstruir a sensação de segurança e controle sobre a própria vida.",
    icon: "Brain",
    image: traumasImg,
  },
  {
    slug: "sono",
    title: "Sono",
    short: "Insônia, rotina e qualidade do sono.",
    description:
      "Acompanhamento para dificuldades de sono — insônia, sono não reparador — com intervenções comportamentais e manejo dos fatores emocionais envolvidos.",
    icon: "Activity",
    image: sonoImg,
  },
  {
    slug: "autoestima-autoconhecimento",
    title: "Autoestima e autoconhecimento",
    short: "Fortalecimento da relação consigo mesmo.",
    description:
      "Processo de autoconhecimento para fortalecer a autoestima, reconhecer os próprios valores e recursos e construir uma relação mais gentil e confiante consigo mesmo.",
    icon: "Heart",
    image: autoestimaImg,
  },
  {
    slug: "terceira-idade",
    title: "Terceira Idade",
    short: "Saúde mental e qualidade de vida na maturidade.",
    description:
      "Acompanhamento psicológico para questões próprias dessa fase: luto, ressignificação de papéis, solidão, saúde mental e bem-estar. Atendimento online acessível, no conforto de casa.",
    icon: "Users",
    image: terceiraIdadeImg,
  },
  {
    slug: "relacionamentos",
    title: "Relacionamentos",
    short: "Vínculos afetivos, familiares e profissionais.",
    description:
      "Espaço para refletir sobre os vínculos da vida — afetivos, familiares, profissionais. Identificar padrões, fortalecer comunicação e construir relações mais saudáveis.",
    icon: "Heart",
    image: relacionamentosImg,
  },
  {
    slug: "vicios",
    title: "Vícios",
    short: "Apoio no manejo de dependências e apostas.",
    description:
      "Acompanhamento para dependências de substâncias e comportamentos compulsivos, como apostas. Foco em compreender gatilhos, reduzir danos e reconstruir o controle sobre a própria vida.",
    icon: "Activity",
    image: viciosImg,
  },
  {
    slug: "luto",
    title: "Luto e perdas",
    short: "Apoio psicológico em processos de perda.",
    description:
      "Acolhimento para os múltiplos processos de luto — morte, separações, perdas funcionais e simbólicas. Cada luto tem seu tempo; o processo terapêutico oferece companhia nesse caminho.",
    icon: "Sprout",
    image: lutoImg,
  },
];
