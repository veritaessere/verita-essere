import { site } from "@/content/site";
import { specialties } from "@/content/specialties";
import type { WhatsAppContext } from "@/content/types";

export const waMessages = {
  hero: "Olá! Vim pelo site e gostaria de agendar uma consulta.",
  generic: "Olá! Vim pelo site da Verità Essere e gostaria de mais informações.",
  lucas: "Olá, Lucas! Vim pelo site e gostaria de agendar uma sessão com você.",
} as const;

export function buildWaLink(context: WhatsAppContext): string {
  let message: string;
  if (context.startsWith("specialty:")) {
    const slug = context.slice("specialty:".length);
    const specialty = specialties.find((s) => s.slug === slug);
    message = specialty
      ? `Olá! Vim pelo site e gostaria de conversar sobre ${specialty.title}.`
      : waMessages.generic;
  } else {
    message = waMessages[context as keyof typeof waMessages] ?? waMessages.generic;
  }
  return `https://wa.me/${site.whatsapp.raw}?text=${encodeURIComponent(message)}`;
}
