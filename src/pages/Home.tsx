import { Seo } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { medicalBusinessSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={medicalBusinessSchema} />
      <Hero />
    </>
  );
}
