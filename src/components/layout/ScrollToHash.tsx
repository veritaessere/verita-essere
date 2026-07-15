import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const KEY = "scroll:";

function readSaved(pathname: string): number | null {
  try {
    const raw = sessionStorage.getItem(KEY + pathname);
    if (raw == null || raw === "") return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
  } catch {
    return null; // sessionStorage indisponível (ex: modo privado)
  }
}

// Gerencia a rolagem da SPA:
// - salva a posição de cada rota continuamente (por sessão);
// - no 1º load / F5, restaura a posição exata onde o usuário estava
//   (ou rola até o hash, se houver) — instantâneo, sem animação;
// - em navegações dentro do app, rola suavemente até o hash / topo.
//
// Desliga a restauração nativa do navegador porque o conteúdo monta de forma
// assíncrona (fontes, imagens, animações) e o navegador restaura antes da
// altura final existir, perdendo a posição.
export function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const reduced = usePrefersReducedMotion();

  // Captura o alvo do 1º load ANTES de qualquer efeito rodar, para o save em
  // cleanup (StrictMode) não sobrescrever a posição salva antes de lermos.
  const [initialTarget] = useState(() =>
    typeof window === "undefined"
      ? { y: null as number | null, id: "" }
      : {
          y: readSaved(window.location.pathname),
          id: window.location.hash ? window.location.hash.slice(1) : "",
        }
  );

  const initialDone = useRef(false);
  const prevKey = useRef<string | null>(null);

  // Assume o controle da restauração de rolagem.
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  // Salva a posição da rota atual (throttle por frame) e ao sair da página.
  useEffect(() => {
    const storageKey = KEY + pathname;
    let raf = 0;
    const save = () => {
      raf = 0;
      try {
        sessionStorage.setItem(storageKey, String(window.scrollY));
      } catch {
        /* ignora */
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(save);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", save);
      if (raf) cancelAnimationFrame(raf);
      save(); // grava a posição ao trocar de rota
    };
  }, [pathname]);

  // Restaura (1º load) ou rola (navegação) quando a localização muda.
  useEffect(() => {
    const locKey = pathname + hash;
    const changed = prevKey.current !== null && prevKey.current !== locKey;
    prevKey.current = locKey;

    let raf = 0;

    // --- 1º load / F5: restaura posição exata (ou hash), instantâneo ---------
    if (!initialDone.current) {
      const { y, id } = initialTarget;
      if (y == null && !id) {
        initialDone.current = true;
        return;
      }
      let tries = 0;
      const attempt = () => {
        if (y != null) {
          // espera o documento ter altura suficiente pro alvo (imgs/fontes)
          const maxY =
            document.documentElement.scrollHeight - window.innerHeight;
          if (maxY >= y - 2 || tries >= 40) {
            window.scrollTo({ top: y, behavior: "instant" });
            initialDone.current = true;
            return;
          }
        } else if (id) {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "instant" });
            initialDone.current = true;
            return;
          }
        }
        if (tries++ < 40) raf = requestAnimationFrame(attempt);
        else initialDone.current = true;
      };
      raf = requestAnimationFrame(attempt);
      return () => cancelAnimationFrame(raf);
    }

    // --- navegação dentro do app: rola até o hash ou ao topo -----------------
    if (!changed) return;
    const behavior: ScrollBehavior = reduced ? "instant" : "smooth";
    const id = hash ? hash.slice(1) : "";
    if (id) {
      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior });
          return;
        }
        if (tries++ < 30) raf = requestAnimationFrame(attempt);
      };
      raf = requestAnimationFrame(attempt);
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, behavior });
  }, [pathname, hash, reduced, initialTarget]);

  return null;
}
