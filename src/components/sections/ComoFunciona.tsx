import { Video, CalendarClock, Globe2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

const items = [
  { icon: Globe2, title: site.modality, sub: "Atendimento de qualquer lugar do Brasil" },
  { icon: Video, title: site.platform, sub: "Sessões por videochamada segura" },
  { icon: CalendarClock, title: `${site.hours.days}`, sub: site.hours.time },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-surface-deep text-body-on-dark">
      <div className="container-content py-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-body-muted">Como funciona</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-body-on-dark max-w-2xl">
            Atendimento online, no seu ritmo.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="flex flex-col gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-primary-on-dark">
                  <it.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display font-light text-2xl tracking-tightish">{it.title}</h3>
                <p className="text-body-muted">{it.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
