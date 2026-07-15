import { Seo } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { SobreSnippet } from "@/components/sections/SobreSnippet";
import { AreasSection } from "@/components/sections/AreasSection";
import { ComoPsicoterapiaTrilha } from "@/components/sections/ComoPsicoterapiaTrilha";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Faq } from "@/components/sections/Faq";
import { homeSchema } from "@/lib/schema";

// Tudo eager: a página é pré-renderizada (SSG) e hidratada por cima do HTML.
// Lazy aqui não reduz TBT (o trabalho total de JS é o mesmo) e ainda causa CLS
// (seções entrando depois) + aviso de Suspense no SSR. O que reduz TBT é ter
// menos JS no total — por isso as animações usam CSS em vez de framer-motion.
export default function Home() {
  return (
    <>
      <Seo
        path="/"
        description="Psicólogo em Medianeira (PR) e psicoterapia online, com atendimento humano, ético e baseado em evidências. Agende sua consulta pelo WhatsApp."
        jsonLd={homeSchema}
      />
      <Hero />
      <SobreSnippet />
      <AreasSection />
      <ComoPsicoterapiaTrilha />
      <Faq />
      <ComoFunciona />
    </>
  );
}
