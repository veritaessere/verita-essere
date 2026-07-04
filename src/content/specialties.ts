import type { Specialty } from "./types";
import ansiedadeImg from "@/assets/images/ansiedade.png";
import depressaoImg from "@/assets/images/depressao.png";
import autistaImg from "@/assets/images/autista.png";
import psicologiaInfantilImg from "@/assets/images/psicologia_infantil.png";
import sociaisImg from "@/assets/images/sociais.png";
import terceiraIdadeImg from "@/assets/images/terceira_idade.png";
import transtornoImg from "@/assets/images/transtorno.png";
import relacionamentosImg from "@/assets/images/relacionamentos.png";
import lutoImg from "@/assets/images/luto.png";

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
    slug: "autismo",
    title: "Espectro Autista",
    short: "Suporte para a pessoa autista e família.",
    description:
      "Acompanhamento clínico para pessoas autistas em diferentes fases da vida e suas famílias. Foco em autoconhecimento, desenvolvimento de habilidades e redução de sobrecarga sensorial e emocional.",
    icon: "Puzzle",
    image: autistaImg,
  },
  {
    slug: "psicologia-infantil",
    title: "Psicologia Infantil",
    short: "Atendimento clínico com crianças.",
    description:
      "Atendimento de crianças em ambiente seguro e adequado à faixa etária, com participação ativa dos responsáveis no processo. Trabalho com regulação emocional, comportamento e relações.",
    icon: "Baby",
    image: psicologiaInfantilImg,
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
    slug: "transtornos-humor",
    title: "Transtornos de Humor",
    short: "Acompanhamento clínico continuado.",
    description:
      "Acompanhamento psicológico para pessoas com transtornos de humor, em complemento ao tratamento médico. Foco em manejo, autoconhecimento e prevenção de recaídas.",
    icon: "Activity",
    image: transtornoImg,
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
    slug: "habilidades-sociais",
    title: "Habilidades Sociais",
    short: "Comunicação, assertividade e autoconfiança.",
    description:
      "Desenvolvimento de competências interpessoais: comunicação assertiva, escuta, manejo de conflitos e autoconfiança em contextos sociais e profissionais.",
    icon: "MessagesSquare",
    image: sociaisImg,
  },
  {
    slug: "luto",
    title: "Luto",
    short: "Apoio psicológico em processos de perda.",
    description:
      "Acolhimento para os múltiplos processos de luto — morte, separações, perdas funcionais e simbólicas. Cada luto tem seu tempo; o processo terapêutico oferece companhia nesse caminho.",
    icon: "Sprout",
    image: lutoImg,
  },
];
