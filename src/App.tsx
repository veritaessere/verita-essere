import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { SkipLink } from "@/components/layout/SkipLink";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <Nav />
      <main id="main">
        <Suspense
          fallback={<div className="container-content py-20">Carregando…</div>}
        >
          <PageTransition>
            <AppRoutes />
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
