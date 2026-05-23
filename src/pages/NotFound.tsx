import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Página não encontrada" noindex />
      <section className="bg-canvas">
        <div className="container-content py-24 md:py-32 max-w-2xl text-center">
          <p className="eyebrow">Erro 404</p>
          <h1 className="mt-3 font-display font-light text-5xl tracking-tight text-ink">
            Página não encontrada.
          </h1>
          <p className="mt-5 text-body">A página que você procura pode ter sido removida ou movida.</p>
          <div className="mt-8">
            <Button asChild variant="outline"><Link to="/">Voltar para a Home</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
