import { Seo } from "@/lib/seo";
import { ContatoForm } from "@/components/sections/ContatoForm";
import { site } from "@/content/site";
import { Mail, MessageCircle, Clock } from "lucide-react";

export default function Contato() {
  return (
    <>
      <Seo path="/contato" title="Contato" description="Entre em contato com a Verità Essere por email ou WhatsApp." />

      <section className="bg-canvas">
        <div className="container-content pt-16 md:pt-24 pb-10 max-w-3xl">
          <p className="eyebrow">Contato</p>
          <h1 className="mt-3 font-display font-light text-5xl md:text-6xl tracking-tight text-ink">
            Vamos conversar.
          </h1>
          <p className="mt-5 text-lg text-body leading-relaxed">
            Preencha o formulário ou fale conosco pelo canal de sua preferência. Respondemos em horário comercial.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="container-content pb-20 md:pb-28 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContatoForm />
          </div>
          <aside className="space-y-6 text-sm">
            <div>
              <p className="eyebrow mb-2">Email</p>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-ink hover:text-primary-active">
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">WhatsApp</p>
              <span className="inline-flex items-center gap-2 text-ink">
                <MessageCircle className="h-4 w-4" /> {site.whatsapp.display}
              </span>
            </div>
            <div>
              <p className="eyebrow mb-2">Horários</p>
              <p className="inline-flex items-center gap-2 text-ink">
                <Clock className="h-4 w-4" /> {site.hours.days}, {site.hours.time}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">Atendimento</p>
              <p className="text-body">{site.modality} via {site.platform}.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
