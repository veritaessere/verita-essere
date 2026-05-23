import type * as React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { site } from "@/content/site";
import { professionals } from "@/content/professionals";

export function Footer() {
  return (
    <footer className="bg-surface-deep text-body-on-dark">
      <div className="container-content py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="h-5 w-5 text-primary-on-dark" aria-hidden />
            <span className="font-serif text-2xl">Verità Essere</span>
          </div>
          <p className="font-serif italic text-body-muted">{site.taglineIt}</p>
          <p className="text-body-muted text-sm mt-2">{site.city}</p>
        </div>

        <div>
          <p className="eyebrow text-body-muted mb-3">Equipe</p>
          <ul className="space-y-1 text-sm">
            {professionals.map((p) => (
              <li key={p.id}>
                <span className="text-body-on-dark">{p.name}</span>
                <span className="text-body-muted"> — {p.crp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-body-muted mb-3">Contato</p>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-primary-on-dark"
              >
                {site.email}
              </a>
            </li>
            <li className="text-body-muted">
              WhatsApp {site.whatsapp.display}
            </li>
            <li className="text-body-muted">
              {site.hours.days}, {site.hours.time}
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary-on-dark"
              >
                <InstagramIcon className="h-4 w-4" /> @veritaessere
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-body-muted">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos
            reservados.
          </p>
          <Link
            to="/politica-de-privacidade"
            className="hover:text-primary-on-dark"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
