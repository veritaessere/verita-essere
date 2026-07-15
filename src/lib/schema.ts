import { site } from "@/content/site";
import { professionals } from "@/content/professionals";
import { faqs } from "@/content/faq";

const BUSINESS_ID = `${site.url}/#clinica`;

// Coordenadas aproximadas de Medianeira - PR
const GEO = { latitude: -25.2958, longitude: -54.0942 };

// Cidades reais atendidas na região oeste do Paraná (área de atendimento online)
const AREA_SERVED = [
  "Medianeira",
  "Matelândia",
  "Serranópolis do Iguaçu",
  "Missal",
  "São Miguel do Iguaçu",
  "Itaipulândia",
  "Ramilândia",
  "Céu Azul",
  "Foz do Iguaçu",
  "Cascavel",
].map((name) => ({ "@type": "City", name }));

export const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Psychologist", "MedicalBusiness", "LocalBusiness"],
  "@id": BUSINESS_ID,
  name: site.name,
  url: site.url,
  description: site.description,
  telephone: `+${site.whatsapp.raw}`,
  email: site.email,
  image: `${site.url}/og-image.jpg`,
  logo: `${site.url}/logo.png`,
  priceRange: "$$",
  currenciesAccepted: "BRL",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Medianeira",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", ...GEO },
  areaServed: AREA_SERVED,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "23:00",
    },
  ],
  sameAs: [site.instagram],
  availableService: {
    "@type": "MedicalTherapy",
    name: "Psicoterapia online",
  },
};

export const personSchemas = professionals.map((p) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: p.name,
  jobTitle: "Psicólogo(a) clínico(a)",
  identifier: p.crp,
  worksFor: { "@id": BUSINESS_ID },
}));

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Conjunto de dados estruturados injetado na home.
export const homeSchema = [
  medicalBusinessSchema,
  faqPageSchema,
  ...personSchemas,
];
