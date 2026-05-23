import { site } from "@/content/site";
import { professionals } from "@/content/professionals";

export const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: site.name,
  url: site.url,
  description: site.description,
  telephone: `+${site.whatsapp.raw}`,
  email: site.email,
  areaServed: { "@type": "Country", name: "BR" },
  availableService: { "@type": "MedicalTherapy", name: "Psicoterapia online" },
};

export const personSchemas = professionals.map((p) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: p.name,
  jobTitle: "Psicólogo(a) clínico(a)",
  identifier: p.crp,
  worksFor: { "@type": "MedicalBusiness", name: site.name },
}));
