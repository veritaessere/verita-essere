import { Reveal } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SoftAmbience } from "@/components/ui/SoftAmbience";
import { faqs } from "@/content/faq";

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
