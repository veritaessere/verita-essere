import { Seo } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { ShieldCheck, UserRound, Leaf } from "lucide-react";
import fundosobre from "@/assets/images/fundosobre.png";
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

export default function Sobre() {
  return (
    <>
      <Seo
        path="/sobre"
        title="Sobre a clínica"
        description="Conheça a Verità Essere — clínica de psicologia online com atendimento humano, ético e baseado em evidências."
      />

      <section
        className="bg-canvas-parchment bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${fundosobre})` }}
      >
        <div className="container-content py-20 md:py-28">
          <Reveal>
            <p className="eyebrow text-center text-primary">Sobre nós</p>
            <h1 className="mt-4 text-center font-serif font-medium text-ink leading-[1.1] tracking-tight text-5xl md:text-6xl lg:text-7xl">
              Quem <em className="italic font-normal text-hero-green">cuida</em>{" "}
              de você
            </h1>
            <OliveDivider />
            <p className="mt-8 mx-auto max-w-3xl text-center text-lg text-body leading-relaxed">
              Na Verità Essere, acreditamos que cada pessoa carrega uma história
              única. Nossa missão é oferecer um atendimento psicológico ético,
              acolhedor e baseado em evidências científicas, para promover saúde
              emocional e qualidade de vida.
            </p>
          </Reveal>

          <div className="mt-16 md:mt-20 grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {psicologos.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <article
                  className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-no-repeat bg-cover bg-center shadow-card"
                  style={{ backgroundImage: `url(${fundocard})` }}
                >
                  <div className="grid grid-cols-5 items-end min-h-[360px]">
                    <div className="col-span-2 flex items-end justify-center h-full">
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="block w-full h-auto max-h-[420px] object-contain object-bottom"
                        loading="lazy"
                      />
                    </div>
                    <div className="col-span-3 p-6 md:p-8 pl-2 md:pl-4 pb-10">
                      <div className="flex items-center gap-2 text-primary">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/60">
                          <UserRound className="h-3.5 w-3.5" aria-hidden />
                        </span>
                        <span className="text-sm font-medium">{p.role}</span>
                      </div>
                      <h2 className="mt-4 font-serif font-normal text-ink text-3xl md:text-4xl tracking-tight leading-tight">
                        {p.name}
                      </h2>
                      <span className="mt-3 block h-px w-12 bg-primary" />
                      <p className="mt-4 text-body leading-relaxed">{p.bio}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 md:mt-16 max-w-6xl mx-auto rounded-[28px] border border-primary/30 bg-canvas/40 backdrop-blur-sm px-6 py-6 md:px-10 md:py-8">
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
    </>
  );
}
