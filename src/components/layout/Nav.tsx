import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { buildWaLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import logo from "@/assets/images/logo.webp";

export function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // navegação em âncoras: rola na home; navega e rola quando em outra página
  const goToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    link: { to: string; id: string }
  ) => {
    e.preventDefault();
    setOpen(false);
    if (!link.id) {
      if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
      else navigate("/");
      return;
    }
    if (isHome) {
      document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", link.to);
    } else {
      navigate(link.to);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors",
        isHome && !scrolled
          ? "hero-bg-image bg-hero-bg bg-no-repeat bg-cover bg-center bg-fixed"
          : "bg-canvas/85 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="container-content flex h-16 md:h-20 items-center justify-between gap-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-ink"
          aria-label="Verità Essere — início"
        >
          <img src={logo} alt="" className="h-8 w-8 md:h-10 md:w-10 object-contain" aria-hidden />
          <span className="font-serif text-xl md:text-2xl">Verità Essere</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Principal"
        >
          {site.navLinks.map((l) => (
            <a
              key={l.to}
              href={l.to}
              onClick={(e) => goToSection(e, l)}
              className="text-sm text-ink/80 hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="green" size="sm">
            <a
              href={buildWaLink("generic")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale conosco agora
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-canvas">
          <nav
            className="container-content py-4 flex flex-col gap-3"
            aria-label="Mobile"
          >
            {site.navLinks.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) => goToSection(e, l)}
                className="text-ink py-2"
              >
                {l.label}
              </a>
            ))}
            <Button asChild variant="green" className="mt-2">
              <a
                href={buildWaLink("generic")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale conosco agora
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
