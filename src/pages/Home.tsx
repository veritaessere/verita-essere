import { Seo } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { SobreSnippet } from "@/components/sections/SobreSnippet";
import { EquipeSection } from "@/components/sections/EquipeSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { medicalBusinessSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={medicalBusinessSchema} />
      <Hero />
      <SobreSnippet />
      <EquipeSection />
      <AreasSection />
      <ComoFunciona />
      <CtaFinal />
    </>
  );
}
