// Converte imagens grandes do hero para WebP (corta ~90% dos bytes).
// Rodar: node scripts/optimize-images.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => path.join(root, ...s);

const jobs = [
  // fundo do hero (background CSS) → public/ com nome estável p/ preload
  {
    in: p("src/assets/images/fundo.png"),
    out: p("public/fundo.webp"),
    quality: 90,
  },
  // foto do psicólogo (<img>) → src/assets (Vite faz hash)
  {
    in: p("src/assets/images/lucas.png"),
    out: p("src/assets/images/lucas.webp"),
    quality: 86,
  },
  // variante menor p/ mobile (srcset)
  {
    in: p("src/assets/images/lucas.png"),
    out: p("src/assets/images/lucas-560.webp"),
    quality: 84,
    width: 560,
  },
];

for (const job of jobs) {
  let pipe = sharp(job.in);
  if (job.width) pipe = pipe.resize({ width: job.width });
  const info = await pipe
    .webp({ quality: job.quality, effort: 6 })
    .toFile(job.out);
  const before = (await sharp(job.in).metadata()).size ?? 0;
  console.log(
    `${path.basename(job.in)} -> ${path.basename(job.out)}  ` +
      `${(before / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB  (${info.width}x${info.height})`
  );
}
