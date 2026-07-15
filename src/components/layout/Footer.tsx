import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { site } from "@/content/site";
import { buildWaLink } from "@/lib/whatsapp";
import logo from "@/assets/images/logo.webp";

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterColumn {
  label: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    label: "Navegação",
    links: site.navLinks.map((l) => ({ title: l.label, href: l.to })),
  },
  {
    label: "Institucional",
    links: [
      { title: "Sobre", href: "/#sobre" },
      { title: "Equipe", href: "/#equipe" },
      { title: "Áreas de atuação", href: "/#areas" },
      { title: "Psicólogo em Medianeira", href: "/psicologo-em-medianeira" },
      { title: "Política de Privacidade", href: "/politica-de-privacidade" },
    ],
  },
  {
    label: "Contato",
    links: [
      { title: site.email, href: `mailto:${site.email}`, external: true, icon: Mail },
      {
        title: `${site.whatsapp.display}`,
        href: buildWaLink("generic"),
        external: true,
        icon: MessageCircle,
      },
      {
        title: `${site.hours.days}, ${site.hours.time}`,
        href: buildWaLink("generic"),
        external: true,
        icon: Clock,
      },
    ],
  },
  {
    label: "Social",
    links: [
      { title: "@veritaessere", href: site.instagram, external: true, icon: Instagram },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const content = (
    <>
      {link.icon && <link.icon className="mt-0.5 me-1 size-4 shrink-0" />}
      <span className="min-w-0 break-words">{link.title}</span>
    </>
  );
  const className =
    "flex md:inline-flex items-start gap-1 break-words text-body-muted transition-colors duration-300 hover:text-primary-on-dark";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <Link to={link.href} className={className}>
      {content}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative -mt-8 overflow-hidden rounded-t-[2rem] border-t border-white/10 bg-surface-deep text-body-on-dark md:-mt-10 md:rounded-t-[2.5rem]">
      {/* brilho radial no topo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(40%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)]"
        aria-hidden
      />
      {/* linha de destaque no topo */}
      <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 rounded-full bg-white/25 blur-sm" />

      <div className="container-content py-14 lg:py-16">
        <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">
          {/* marca */}
          <AnimatedContainer className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="h-9 w-9 md:h-10 md:w-10 object-contain" aria-hidden />
              <span className="font-serif text-xl md:text-2xl">{site.name}</span>
            </div>
            <p className="font-serif italic text-sm md:text-base text-body-muted">{site.taglineIt}</p>
            <p className="text-[13px] md:text-sm text-body-muted">{site.city}</p>
            <p className="pt-2 text-sm text-body-muted">
              © {new Date().getFullYear()} {site.name}.<br />
              Todos os direitos reservados.
            </p>
          </AnimatedContainer>

          {/* colunas de links */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4 md:gap-x-8 md:gap-y-8 xl:col-span-2">
            {footerColumns.map((column, index) => (
              <AnimatedContainer key={column.label} delay={0.1 + index * 0.1}>
                <h3 className="eyebrow text-body-on-dark">{column.label}</h3>
                <ul className="mt-4 space-y-2 text-[13px] md:text-sm">
                  {column.links.map((link) => (
                    <li key={link.title}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: string;
  children: ReactNode;
};

// Reveal ao rolar via CSS (.reveal em globals.css) — sem framer-motion.
function AnimatedContainer({ className, children }: ViewAnimationProps) {
  return <div className={className ? `reveal ${className}` : "reveal"}>{children}</div>;
}
