import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export default function Obrigado() {
  return (
    <>
      <Seo path="/obrigado" title="Recebido" noindex />
      <section className="bg-canvas-tint">
        <div className="container-content py-24 md:py-32 max-w-2xl text-center">
          <p className="eyebrow">Recebido</p>
          <h1 className="mt-3 font-display font-light text-5xl tracking-tight text-ink">
            Obrigado pelo contato.
          </h1>
          <p className="mt-5 text-lg text-body leading-relaxed">
            Sua mensagem foi encaminhada. Em breve retornaremos pelo canal que você escolheu.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline"><Link to="/">Voltar para a Home</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
