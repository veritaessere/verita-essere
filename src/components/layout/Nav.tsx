import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { buildWaLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import fundo from "@/assets/images/fundo.png";

export function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors",
        isHome
          ? "bg-hero-bg bg-no-repeat bg-cover bg-center bg-fixed"
          : "bg-canvas/95",
        scrolled && "backdrop-blur-md shadow-sm"
      )}
      style={isHome ? { backgroundImage: `url(${fundo})` } : undefined}
    >
      <div className="container-content flex h-16 md:h-20 items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-ink"
          aria-label="Verità Essere — início"
        >
          <Leaf className="h-5 w-5 text-hero-green" aria-hidden />
          <span className="font-serif text-xl md:text-2xl">Verità Essere</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Principal"
        >
          {site.navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm text-ink/80 hover:text-ink transition-colors",
                  isActive && "text-ink font-medium"
                )
              }
            >
              {l.label}
            </NavLink>
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
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className="text-ink py-2"
              >
                {l.label}
              </NavLink>
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
