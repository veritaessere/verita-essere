import * as Icons from "lucide-react";
import type { Specialty } from "@/content/types";

export function SpecialtyCard({
  specialty: s,
  variant = "compact",
}: {
  specialty: Specialty;
  variant?: "compact" | "expanded";
}) {
  const Icon = Icons[s.icon] as Icons.LucideIcon;
  return (
    <article className="bg-canvas-parchment rounded-card border border-divider-soft shadow-sm p-6 flex gap-4 items-start">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-on-dark/20 text-primary-active shrink-0">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <h3 className="font-display font-medium text-lg text-ink tracking-tightish">
          {s.title}
        </h3>
        <p className="mt-1 text-sm text-body leading-relaxed">
          {variant === "expanded" ? s.description : s.short}
        </p>
      </div>
    </article>
  );
}
