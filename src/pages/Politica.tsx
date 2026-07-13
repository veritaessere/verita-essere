import { Seo } from "@/lib/seo";
import { site } from "@/content/site";

export default function Politica() {
  return (
    <>
      <Seo path="/politica-de-privacidade" title="Política de Privacidade" />
      <section className="bg-canvas-tint">
        <div className="container-content py-16 md:py-24 max-w-3xl">
          <p className="eyebrow">LGPD</p>
          <h1 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink">
            Política de Privacidade
          </h1>

          <div className="mt-8 space-y-6 text-body leading-relaxed">
            <p>
              A {site.name} (&quot;nós&quot;) respeita a privacidade dos visitantes deste site e está
              comprometida com o tratamento responsável dos dados pessoais, em conformidade com
              a Lei Geral de Proteção de Dados (Lei 13.709/2018 — LGPD).
            </p>

            <h2 className="font-display font-light text-2xl text-ink mt-8">Quais dados coletamos</h2>
            <p>
              Coletamos apenas os dados que você nos fornece voluntariamente pelo formulário de
              contato: nome, email, telefone, motivo do contato e mensagem.
            </p>

            <h2 className="font-display font-light text-2xl text-ink mt-8">Finalidade</h2>
            <p>
              Os dados são utilizados exclusivamente para responder ao seu contato e eventual
              agendamento de atendimento psicológico. Não compartilhamos seus dados com terceiros.
            </p>

            <h2 className="font-display font-light text-2xl text-ink mt-8">Retenção e descarte</h2>
            <p>
              Mantemos seus dados pelo tempo necessário para atendimento da finalidade. Você pode
              solicitar a exclusão a qualquer momento.
            </p>

            <h2 className="font-display font-light text-2xl text-ink mt-8">Contato do controlador</h2>
            <p>
              Para exercer seus direitos (acesso, correção, exclusão), entre em contato pelo
              email <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
            </p>

            <p className="text-sm text-ink-muted-48 pt-8">
              Última atualização: 13/07/2026.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
