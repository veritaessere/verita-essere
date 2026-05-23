import { Seo } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { SobreSnippet } from "@/components/sections/SobreSnippet";
import { AreasSection } from "@/components/sections/AreasSection";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Faq } from "@/components/sections/Faq";
import { CompromissoEtico } from "@/components/sections/CompromissoEtico";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { medicalBusinessSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={medicalBusinessSchema} />
      <Hero />
      <SobreSnippet />
      <AreasSection />
      <ComoFunciona />
      <Faq />
      <CompromissoEtico />
      <CtaFinal />
    </>
  );
}
