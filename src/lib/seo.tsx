import { Helmet } from "react-helmet-async";
import { site } from "@/content/site";

type Props = {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
  jsonLd?: unknown;
};

export function Seo({ title, description, path = "/", noindex, jsonLd }: Props) {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.taglinePt}`;
  const desc = description ?? site.description;
  const url = `${site.url}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.url}/og-image.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${site.url}/og-image.jpg`} />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
}
