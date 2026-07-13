import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Rola até a seção indicada no hash da URL (ex: /#sobre), inclusive quando
// a navegação vem de outra página — tenta por alguns frames até o elemento existir.
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    let tries = 0;
    let raf = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (tries++ < 30) {
        raf = requestAnimationFrame(tryScroll);
      }
    };
    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
