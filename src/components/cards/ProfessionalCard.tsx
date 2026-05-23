import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import type { Professional } from "@/content/types";

export function ProfessionalCard({
  professional: p,
  variant = "compact",
}: {
  professional: Professional;
  variant?: "compact" | "expanded";
}) {
  const wa = buildWaLink(p.id);
  return (
    <article className="bg-canvas rounded-card border border-hairline shadow-card overflow-hidden flex flex-col transition-shadow hover:shadow-lift">
      <div className="aspect-[4/5] bg-canvas-parchment flex items-center justify-center">
        {p.photo ? (
          <img
            src={p.photo}
            alt={p.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-ink-muted-48 text-sm">Foto em breve</span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display font-light text-2xl text-ink tracking-tightish">
          {p.name}
        </h3>
        <p className="text-xs text-ink-muted-48 mt-1">{p.crp}</p>
        <p className="mt-3 text-sm text-body leading-relaxed">
          {variant === "expanded" ? p.fullBio : p.shortBio}
        </p>
        <div className="mt-5">
          <Button asChild variant="primary" size="sm">
            <a href={wa} target="_blank" rel="noopener noreferrer">
              Agendar com {p.firstName}
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
