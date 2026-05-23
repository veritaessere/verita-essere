import { MessageCircle } from "lucide-react";
import { buildWaLink } from "@/lib/whatsapp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function WhatsAppFloat() {
  const reduced = usePrefersReducedMotion();
  return (
    <a
      href={buildWaLink("generic")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-surface-sage text-white shadow-lift transition-transform hover:scale-105 active:scale-95">
        {!reduced && (
          <span
            className="absolute inset-0 rounded-full bg-surface-sage/40 animate-pulse-ring"
            aria-hidden
          />
        )}
        <MessageCircle className="h-6 w-6 relative" aria-hidden />
      </span>
    </a>
  );
}
