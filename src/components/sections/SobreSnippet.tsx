import { ShieldCheck, UserRound, Leaf } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SoftAmbience } from "@/components/ui/SoftAmbience";
import fundocard from "@/assets/images/fundocard.webp";
import lucasImg from "@/assets/images/lucas.webp";

const psicologos = [
  {
    id: "lucas",
    role: "Psicólogo clínico",
    crp: "CRP-08/46660",
    name: "Lucas Fachin",
    photo: lucasImg,
    bio: "Atendo pela abordagem da Terapia Cognitivo-Comportamental, com práticas baseadas em evidências. Cada pessoa que chega até mim traz um mundo diferente, e meu compromisso é estar preparado para acolher cada um.",
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
    body: "Psicoterapia baseada em evidências.",
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
    <section id="sobre" className="relative overflow-hidden bg-canvas-tint scroll-mt-20 md:min-h-[calc(100vh-5rem)] md:flex md:items-center">
      <SoftAmbience />
      <div className="relative pt-20 pb-10 md:pt-28 md:pb-12 w-full max-w-[1240px] mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-center text-primary">Sobre nós</p>
          <h2 className="mt-4 text-center font-serif font-medium text-ink leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Quem <em className="italic font-normal text-hero-green">cuida</em>{" "}
            de você
          </h2>
          <OliveDivider />
          <p className="mt-8 mx-auto max-w-3xl text-center text-base md:text-lg text-body leading-relaxed">
            Nosso trabalho é baseado em evidências, guiado pela ciência e
            sustentado por um objetivo muito claro: ajudar pessoas de forma
            real. Não acreditamos em um cuidado vazio, em promessas bonitas ou
            em uma psicologia sem entrega. Acreditamos em escuta qualificada,
            comprometimento com o processo terapêutico e resultados que façam
            sentido na vida de cada cliente.
          </p>
        </Reveal>

        <div id="equipe" className="mt-24 md:mt-32 max-w-2xl mx-auto scroll-mt-24">
          {psicologos.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <article className="relative sm:aspect-[1.7/1]">
                <div
                  className="absolute inset-0 rounded-[28px] border border-primary/30 bg-no-repeat bg-center shadow-card overflow-hidden"
                  style={{
                    backgroundImage: `url(${fundocard})`,
                    backgroundSize: "130% 140%",
                  }}
                />
                <div className="relative flex flex-col sm:grid sm:grid-cols-12 items-stretch h-full">
                  <div className="relative h-64 sm:h-full sm:col-span-5">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-full sm:h-[112%] max-w-none object-contain object-bottom drop-shadow-hero-photo pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-6 pb-7 pt-2 sm:col-span-7 sm:p-5 sm:pl-6 sm:pt-8 md:p-7 md:pl-10">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/60">
                        <UserRound className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="text-sm font-medium">{p.role}</span>
                    </div>
                    <h3 className="mt-3 font-serif font-normal text-ink text-2xl md:text-3xl tracking-tight leading-tight">
                      {p.name}
                    </h3>
                    <span className="mt-1 block text-sm text-primary/80 font-medium">
                      {p.crp}
                    </span>
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
