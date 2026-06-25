import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import lucas from "@/assets/images/lucas.png";
import fundo from "@/assets/images/fundo.png";

export function Hero() {
  return (
    <section
      className="bg-hero-bg bg-no-repeat bg-cover bg-center md:bg-fixed lg:flex lg:items-stretch lg:h-[calc(100vh-5rem)] lg:overflow-hidden"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 pt-10 sm:pt-12 lg:pt-16 pb-0 lg:items-stretch">
        <div className="lg:col-span-6 pb-12 lg:pb-0 text-center sm:text-left lg:flex lg:flex-col lg:justify-center lg:-translate-y-20">
          <h1 className="font-serif font-medium text-hero-ink leading-[1.05] tracking-tight text-[40px] min-[400px]:text-[48px] sm:text-[60px] md:text-7xl lg:text-6xl xl:text-[76px] 2xl:text-8xl">
            Você não chegou até aqui{" "}
            <em className="italic text-hero-green font-normal">por acaso.</em>
          </h1>

          <blockquote className="mt-7 lg:mt-5 border-l-2 border-hero-green/40 pl-4 text-lg sm:text-xl lg:text-lg xl:text-xl italic font-serif text-hero-ink max-w-xl mx-auto sm:mx-0">
            A mente que se desafia a conhecer a si mesma é a que encontra
            equilíbrio e clareza.
          </blockquote>

          <p className="mt-7 lg:mt-5 flex items-center justify-center sm:justify-start gap-2 text-base font-medium text-hero-muted">
            <Leaf className="h-4 w-4 text-hero-green" aria-hidden />
            Psicologia clínica online com práticas baseadas em evidências
          </p>

          <div className="mt-8 lg:mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
            <Button asChild variant="green" size="lg">
              <a href={buildWaLink("hero")} target="_blank" rel="noopener noreferrer">
                Agendar consulta
              </a>
            </Button>
            <Button asChild variant="outline-green" size="lg">
              <a href="#como-funciona">100% Online</a>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6 lg:self-end flex justify-center lg:justify-end">
          <img
            src={lucas}
            alt="Lucas Fachin, psicólogo da Verità Essere"
            width={520}
            height={620}
            loading="eager"
            fetchPriority="high"
            className="block w-full max-w-sm sm:max-w-md h-auto object-contain lg:w-auto lg:max-w-none lg:h-[66vh] xl:h-[74vh] 2xl:h-auto 2xl:max-h-[820px] drop-shadow-hero-photo"
          />
        </div>
      </div>
    </section>
  );
}
