import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Nav } from "@/components/layout/Nav";
import { ScrollToHash } from "@/components/layout/ScrollToHash";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
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
      <WhatsAppFloat />
      <Footer />
    </BrowserRouter>
  );
}
