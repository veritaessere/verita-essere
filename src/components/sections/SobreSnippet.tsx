import { ShieldCheck, UserRound, Leaf } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import fundocard from "@/assets/images/fundocard.png";
import lucasImg from "@/assets/images/lucas.png";
import tamaraImg from "@/assets/images/tamara.png";

const psicologos = [
  {
    id: "lucas",
    role: "Psicólogo clínico",
    name: "Lucas Fachin",
    photo: lucasImg,
    bio: "Atendimento psicológico com foco na compreensão profunda das emoções, comportamentos e relações humanas.",
  },
  {
    id: "tamara",
    role: "Psicóloga clínica",
    name: "Tamara Mikaelly",
    photo: tamaraImg,
    bio: "Acolhimento empático e intervenções personalizadas para promover equilíbrio emocional e bem-estar duradouro.",
  },
];

const pilares = [
  {
    icon: ShieldCheck,
    title: "Ética e sigilo absoluto",
    body: "Respeito à sua história e privacidade em todas as etapas.",
  },
  {
    icon: UserRound,
    title: "Abordagem humanizada",
    body: "Cada pessoa é única. Nosso cuidado é personalizado para você.",
  },
  {
    icon: Leaf,
    title: "Base científica",
    body: "Técnicas e métodos reconhecidos pela psicologia moderna.",
  },
];

function OliveDivider() {
  return (
    <div className="mt-6 flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-24 md:w-32 bg-primary/60" />
      <Leaf className="h-4 w-4 text-primary -rotate-45" />
      <span className="h-px w-24 md:w-32 bg-primary/60" />
    </div>
  );
}

export function SobreSnippet() {
  return (
    <section className="bg-white md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <div className="py-20 md:py-28 w-full max-w-[1240px] mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-center text-primary">Sobre nós</p>
          <h2 className="mt-4 text-center font-serif font-medium text-ink leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Quem <em className="italic font-normal text-hero-green">cuida</em>{" "}
            de você
          </h2>
          <OliveDivider />
          <p className="mt-8 mx-auto max-w-3xl text-center text-lg text-body leading-relaxed">
            Na Verità Essere, acreditamos que cada pessoa carrega uma história
            única. Nossa missão é oferecer um atendimento psicológico ético,
            acolhedor e baseado em evidências científicas, para promover saúde
            emocional e qualidade de vida.
          </p>
        </Reveal>

        <div className="mt-24 md:mt-32 grid gap-8 md:grid-cols-2">
          {psicologos.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <article className="relative aspect-[1.7/1]">
                <div
                  className="absolute inset-0 rounded-[28px] border border-primary/30 bg-no-repeat bg-center shadow-card overflow-hidden"
                  style={{
                    backgroundImage: `url(${fundocard})`,
                    backgroundSize: "130% 140%",
                  }}
                />
                <div className="relative grid grid-cols-12 items-stretch h-full">
                  <div className="col-span-5 relative h-full">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-[112%] max-w-none object-contain object-bottom drop-shadow-hero-photo pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                  <div className="col-span-7 p-5 md:p-7 pl-0 pt-8">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/60">
                        <UserRound className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="text-sm font-medium">{p.role}</span>
                    </div>
                    <h3 className="mt-3 font-serif font-normal text-ink text-2xl md:text-3xl tracking-tight leading-tight">
                      {p.name}
                    </h3>
                    <span className="mt-2 block h-px w-10 bg-primary" />
                    <p className="mt-3 text-sm text-body leading-relaxed">{p.bio}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 md:mt-16 px-6 py-6 md:px-10 md:py-8">
            <ul className="grid gap-8 md:grid-cols-3">
              {pilares.map((p) => (
                <li key={p.title} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-deep text-primary-on-dark ring-2 ring-primary/40 ring-offset-2 ring-offset-canvas-parchment">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display font-medium text-ink tracking-tightish">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-body leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
