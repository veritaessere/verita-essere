import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { SkipLink } from "@/components/layout/SkipLink";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <main id="main">
        <Suspense fallback={<div className="container-content py-20">Carregando…</div>}>
          <AppRoutes />
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
