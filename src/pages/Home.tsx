import { Seo } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { SobreSnippet } from "@/components/sections/SobreSnippet";
import { AreasSection } from "@/components/sections/AreasSection";
import { ComoPsicoterapiaTrilha } from "@/components/sections/ComoPsicoterapiaTrilha";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Faq } from "@/components/sections/Faq";
import { homeSchema } from "@/lib/schema";

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
