# Site Verità Essere — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site institucional v1 da clínica Verità Essere (8 rotas, hero customizado seguindo inspiração visual, demais seções no design system do briefing, CTAs WhatsApp, conformidade CFP/LGPD).

**Architecture:** SPA estática (Vite + React + TS + Tailwind + shadcn/ui + react-router + framer-motion). Sem backend — form usa mailto/WhatsApp. Toda copy em arquivos `content/*.ts` para edição sem mexer em componentes. `lib/whatsapp.ts` é a única fonte de links WhatsApp contextuais.

**Tech Stack:** Vite 5, React 18, TypeScript strict, Tailwind 3, shadcn/ui (Radix + react-hook-form + zod), react-router-dom v6, framer-motion, lucide-react, react-helmet-async, @fontsource (Cormorant Garamond, Sora, Inter), Vitest para testes unitários.

**Spec:** [`docs/superpowers/specs/2026-05-23-site-verita-essere-design.md`](../specs/2026-05-23-site-verita-essere-design.md)

---

## Convenções para todas as tasks

- Working directory: `d:\Projetos\verita-essere`
- Shell: PowerShell (Windows). Comandos `npm`/`npx` funcionam normalmente.
- Após qualquer mudança visual, rodar `npm run dev` e abrir `http://localhost:5173` no navegador para validar manualmente (a menos que a task seja puramente de código não-visual).
- TDD obrigatório apenas para tasks marcadas com **[TDD]**. Demais tasks usam verificação manual (browser + tipo-check + build).
- Antes de cada commit: `npm run typecheck` deve passar (ver Task 1 para configuração).
- Mensagens de commit: prefixos `chore:`, `feat:`, `fix:`, `style:`, `test:`, `docs:`.

---

## Task 1: Scaffold do projeto

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `index.html`, `.gitignore`, `.eslintrc.cjs`, `.prettierrc`, `components.json`, `src/main.tsx`, `src/App.tsx`, `src/styles/globals.css`, `src/vite-env.d.ts`

- [ ] **Step 1.1: Inicializar Vite + React + TS**

```powershell
npm create vite@latest . -- --template react-ts
```

Quando perguntar se sobrescreve arquivos existentes (BRIEFING.md, docs/), responder **No** mas continuar a instalação. Aceitar criação dos arquivos `package.json`, `src/`, etc.

- [ ] **Step 1.2: Instalar dependências de runtime**

```powershell
npm install react-router-dom framer-motion react-helmet-async react-hook-form zod @hookform/resolvers lucide-react class-variance-authority clsx tailwind-merge
npm install @fontsource/cormorant-garamond @fontsource/sora @fontsource/inter
```

- [ ] **Step 1.3: Instalar dependências de dev**

```powershell
npm install -D tailwindcss postcss autoprefixer @types/node vitest @testing-library/react @testing-library/jest-dom jsdom prettier eslint-config-prettier
npx tailwindcss init -p
```

- [ ] **Step 1.4: Configurar path alias `@/`**

Substituir `tsconfig.json` por:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Substituir `vite.config.ts` por:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

- [ ] **Step 1.5: Adicionar scripts em package.json**

Adicionar/substituir o bloco `"scripts"`:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "typecheck": "tsc -b --noEmit",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "format": "prettier --write .",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 1.6: Criar setup de testes**

Criar `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 1.7: Verificar build inicial**

Substituir `src/App.tsx` por placeholder mínimo:

```tsx
export default function App() {
  return <div>Verità Essere — em construção</div>;
}
```

Rodar:

```powershell
npm run dev
```

Esperado: dev server inicia em `http://localhost:5173`, página exibe "Verità Essere — em construção". Parar com Ctrl+C.

```powershell
npm run typecheck
npm run build
```

Esperado: ambos passam sem erros.

- [ ] **Step 1.8: Commit**

```powershell
git init
```

Criar `.gitignore` (se Vite não criou) com:

```
node_modules
dist
.DS_Store
*.local
.env*
```

Mover as imagens da raiz para `src/assets/images/`:

```powershell
New-Item -ItemType Directory -Force src/assets/images
Move-Item heroinpiration.png src/assets/images/
Move-Item psicologos.png src/assets/images/
```

Commit:

```powershell
git add -A
git commit -m "chore: scaffold Vite + React + TS + Tailwind"
```

---

## Task 2: Tokens, fontes e estilos globais

**Files:**
- Modify: `tailwind.config.ts`, `src/styles/globals.css`, `src/main.tsx`, `postcss.config.js`

- [ ] **Step 2.1: Substituir tailwind.config.ts pelos tokens do briefing**

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: { DEFAULT: "#C5A059", hover: "#B58A3E", active: "#9E7530", "on-dark": "#D4B679" },
        // Ink
        ink: "#0F1815",
        body: "#1A2820",
        "body-on-dark": "#FAFCFF",
        "body-muted": "#CFDAE5",
        "ink-muted-80": "#3A4A40",
        "ink-muted-48": "#7A8A82",
        // Surfaces (briefing)
        canvas: "#FFFFFF",
        "canvas-parchment": "#F7F4ED",
        "surface-deep": "#0F1815",
        "surface-navy-green": "#1A2820",
        "surface-sage": "#3A5042",
        hairline: "#D8DEE0",
        "divider-soft": "#EDE6D6",
        // Hero overrides (apenas para o hero da Home)
        "hero-bg": "#F5EFE6",
        "hero-green": { DEFAULT: "#1F3D2F", hover: "#2A5240" },
        "hero-ink": "#1A1A1A",
        "hero-muted": "#5C5C5C",
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      boxShadow: {
        sm: "rgba(15, 24, 21, 0.06) 0px 1px 3px 0px",
        card: "rgba(15, 24, 21, 0.06) 0px 1px 3px 0px, rgba(15, 24, 21, 0.04) 0px 4px 8px 0px",
        lift: "rgba(15, 24, 21, 0.08) 0px 4px 12px 0px",
        press: "rgba(15, 24, 21, 0.05) 0px 1px 2px 0px",
        "gold-focus": "rgba(197, 160, 89, 0.15) 0px 0px 0px 4px",
        "hero-photo": "rgba(15, 24, 21, 0.08) 0px 12px 32px -8px",
      },
      borderRadius: { card: "16px", pill: "9999px" },
      letterSpacing: { tightish: "-0.01em", tight: "-0.02em", tighter: "-0.03em" },
      maxWidth: { content: "1200px" },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: { "pulse-ring": "pulse-ring 2s ease-out infinite" },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 2.2: Substituir src/styles/globals.css**

```css
@import "@fontsource/cormorant-garamond/400.css";
@import "@fontsource/cormorant-garamond/400-italic.css";
@import "@fontsource/cormorant-garamond/500.css";
@import "@fontsource/sora/300.css";
@import "@fontsource/sora/400.css";
@import "@fontsource/sora/500.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply font-body text-body bg-canvas antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3, h4 { @apply font-display text-ink; }
  :focus-visible {
    @apply outline-none ring-4 ring-primary/20;
    border-radius: 4px;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer components {
  .eyebrow {
    @apply font-body text-xs font-medium uppercase tracking-[0.18em] text-ink-muted-48;
  }
  .container-content { @apply mx-auto max-w-content px-6 md:px-10; }
}
```

- [ ] **Step 2.3: Importar globals em main.tsx**

Substituir `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Apagar `src/index.css` e `src/App.css` se existirem (geradas pelo template Vite).

- [ ] **Step 2.4: Validar visualmente**

Atualizar `src/App.tsx` temporariamente:

```tsx
export default function App() {
  return (
    <div className="container-content py-20 space-y-4">
      <p className="eyebrow">Eyebrow</p>
      <h1 className="text-6xl font-display font-light tracking-tight">Display Sora 300</h1>
      <p className="font-serif text-5xl italic text-hero-green">Cormorant italic</p>
      <p className="font-body">Inter body — bg primary: <span className="bg-primary px-2 py-1 text-ink rounded-pill">gold</span></p>
    </div>
  );
}
```

Rodar `npm run dev`, abrir o navegador. Esperado: três fontes diferentes renderizadas corretamente, cores corretas.

- [ ] **Step 2.5: Commit**

```powershell
git add -A
git commit -m "feat: add design tokens, fonts and global styles"
```

---

## Task 3: Conteúdo (site.ts, professionals.ts, specialties.ts)

**Files:**
- Create: `src/content/site.ts`, `src/content/professionals.ts`, `src/content/specialties.ts`, `src/content/types.ts`

- [ ] **Step 3.1: Tipos**

Criar `src/content/types.ts`:

```ts
export type Professional = {
  id: "lucas" | "tamara";
  name: string;
  firstName: string;
  crp: string;
  shortBio: string; // 2 linhas — usado em card da Home
  fullBio: string;  // usado em /equipe
  areas: string[];  // áreas que atende (slugs)
  photo?: string;   // path em /src/assets — opcional, placeholder se ausente
};

export type Specialty = {
  slug: string;
  title: string;
  short: string;       // 1 linha — Home grid
  description: string; // ~3 linhas — /especialidades
  icon:
    | "Brain"
    | "CloudDrizzle"
    | "Puzzle"
    | "Baby"
    | "Users"
    | "Activity"
    | "Heart"
    | "MessagesSquare"
    | "Sprout";
};

export type WhatsAppContext =
  | "hero"
  | "generic"
  | "lucas"
  | "tamara"
  | `specialty:${string}`;
```

- [ ] **Step 3.2: site.ts**

Criar `src/content/site.ts`:

```ts
export const site = {
  name: "Verità Essere",
  taglinePt: "A Verdade do Ser",
  taglineIt: "La verità dell'essere",
  url: "https://www.veritaessere.com.br",
  description:
    "Clínica de psicologia online com atendimento humano, ético e baseado em evidências.",
  whatsapp: {
    raw: "5545888162056", // PLACEHOLDER — confirmar com cliente (formato atípico)
    display: "(45) 88816-2056",
  },
  email: "contato@veritaessere.com.br", // PLACEHOLDER — pendente cliente
  instagram: "https://instagram.com/veritaessere",
  city: "Medianeira - PR",
  hours: { days: "Segunda a sábado", time: "07h às 23h" },
  platform: "Google Meet",
  modality: "100% Online",
  navLinks: [
    { to: "/", label: "Início" },
    { to: "/sobre", label: "Sobre" },
    { to: "/equipe", label: "Equipe" },
    { to: "/especialidades", label: "Áreas de atuação" },
    { to: "/contato", label: "Contato" },
  ],
} as const;
```

- [ ] **Step 3.3: professionals.ts**

Criar `src/content/professionals.ts`:

```ts
import type { Professional } from "./types";

export const professionals: Professional[] = [
  {
    id: "lucas",
    name: "Lucas Fachin",
    firstName: "Lucas",
    crp: "CRP 08/46660",
    // PLACEHOLDER — texto realista até cliente enviar bio oficial
    shortBio:
      "Psicólogo clínico com atuação em adultos. Trabalha com escuta acolhedora e abordagens baseadas em evidências.",
    fullBio:
      "Lucas Fachin é psicólogo clínico (CRP 08/46660) com atuação em adultos e adolescentes. Combina escuta acolhedora com abordagens psicoterapêuticas baseadas em evidências, oferecendo um espaço de reflexão e ressignificação. Atende em modalidade online via Google Meet.",
    areas: ["ansiedade", "depressao", "transtornos-humor", "relacionamentos", "habilidades-sociais", "luto"],
  },
  {
    id: "tamara",
    name: "Tamara Mikaelly",
    firstName: "Tamara",
    crp: "CRP 08/46551",
    shortBio:
      "Psicóloga clínica com atuação em crianças, adolescentes e adultos. Atendimento humanizado e baseado em evidências.",
    fullBio:
      "Tamara Mikaelly é psicóloga clínica (CRP 08/46551) com atuação em crianças, adolescentes, adultos e na terceira idade. Conduz o atendimento de forma humanizada, ancorada em práticas psicoterapêuticas baseadas em evidências. Atende em modalidade online via Google Meet.",
    areas: ["ansiedade", "depressao", "autismo", "psicologia-infantil", "terceira-idade", "luto"],
  },
];
```

- [ ] **Step 3.4: specialties.ts**

Criar `src/content/specialties.ts`:

```ts
import type { Specialty } from "./types";

// PLACEHOLDER — descrições serão revisadas pelo cliente
export const specialties: Specialty[] = [
  {
    slug: "ansiedade",
    title: "Ansiedade",
    short: "Manejo de sintomas, regulação e qualidade de vida.",
    description:
      "Atendimento para diferentes apresentações de ansiedade — generalizada, social, crises de pânico. Trabalhamos compreensão dos gatilhos, estratégias de regulação emocional e construção de uma rotina mais leve.",
    icon: "Brain",
  },
  {
    slug: "depressao",
    title: "Depressão",
    short: "Acolhimento e construção de novos sentidos.",
    description:
      "Espaço de acolhimento para quem atravessa episódios depressivos. O processo busca compreender o contexto, fortalecer recursos internos e reconstruir vínculos com aquilo que faz sentido.",
    icon: "CloudDrizzle",
  },
  {
    slug: "autismo",
    title: "Espectro Autista",
    short: "Suporte para a pessoa autista e família.",
    description:
      "Acompanhamento clínico para pessoas autistas em diferentes fases da vida e suas famílias. Foco em autoconhecimento, desenvolvimento de habilidades e redução de sobrecarga sensorial e emocional.",
    icon: "Puzzle",
  },
  {
    slug: "psicologia-infantil",
    title: "Psicologia Infantil",
    short: "Atendimento clínico com crianças.",
    description:
      "Atendimento de crianças em ambiente seguro e adequado à faixa etária, com participação ativa dos responsáveis no processo. Trabalho com regulação emocional, comportamento e relações.",
    icon: "Baby",
  },
  {
    slug: "terceira-idade",
    title: "Terceira Idade",
    short: "Saúde mental e qualidade de vida na maturidade.",
    description:
      "Acompanhamento psicológico para questões próprias dessa fase: luto, ressignificação de papéis, solidão, saúde mental e bem-estar. Atendimento online acessível, no conforto de casa.",
    icon: "Users",
  },
  {
    slug: "transtornos-humor",
    title: "Transtornos de Humor",
    short: "Acompanhamento clínico continuado.",
    description:
      "Acompanhamento psicológico para pessoas com transtornos de humor, em complemento ao tratamento médico. Foco em manejo, autoconhecimento e prevenção de recaídas.",
    icon: "Activity",
  },
  {
    slug: "relacionamentos",
    title: "Relacionamentos",
    short: "Vínculos afetivos, familiares e profissionais.",
    description:
      "Espaço para refletir sobre os vínculos da vida — afetivos, familiares, profissionais. Identificar padrões, fortalecer comunicação e construir relações mais saudáveis.",
    icon: "Heart",
  },
  {
    slug: "habilidades-sociais",
    title: "Habilidades Sociais",
    short: "Comunicação, assertividade e autoconfiança.",
    description:
      "Desenvolvimento de competências interpessoais: comunicação assertiva, escuta, manejo de conflitos e autoconfiança em contextos sociais e profissionais.",
    icon: "MessagesSquare",
  },
  {
    slug: "luto",
    title: "Luto",
    short: "Apoio psicológico em processos de perda.",
    description:
      "Acolhimento para os múltiplos processos de luto — morte, separações, perdas funcionais e simbólicas. Cada luto tem seu tempo; o processo terapêutico oferece companhia nesse caminho.",
    icon: "Sprout",
  },
];
```

- [ ] **Step 3.5: Validar tipos**

```powershell
npm run typecheck
```

Esperado: PASS.

- [ ] **Step 3.6: Commit**

```powershell
git add -A
git commit -m "feat: add content modules (site, professionals, specialties)"
```

---

## Task 4: lib/whatsapp.ts **[TDD]**

**Files:**
- Create: `src/lib/whatsapp.ts`, `src/lib/whatsapp.test.ts`

- [ ] **Step 4.1: Escrever testes (falhando)**

Criar `src/lib/whatsapp.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { buildWaLink, waMessages } from "./whatsapp";

describe("buildWaLink", () => {
  it("usa o número configurado", () => {
    expect(buildWaLink("generic")).toMatch(/^https:\/\/wa\.me\/5545888162056\?text=/);
  });

  it("url-encoda a mensagem do contexto", () => {
    const url = buildWaLink("hero");
    expect(url).toContain(encodeURIComponent(waMessages.hero));
  });

  it("usa mensagem específica para Lucas", () => {
    const url = buildWaLink("lucas");
    expect(url).toContain(encodeURIComponent(waMessages.lucas));
  });

  it("usa mensagem específica para Tamara", () => {
    const url = buildWaLink("tamara");
    expect(url).toContain(encodeURIComponent(waMessages.tamara));
  });

  it("monta mensagem de especialidade interpolando o título", () => {
    const url = buildWaLink("specialty:ansiedade");
    expect(decodeURIComponent(url)).toContain("Ansiedade");
  });

  it("cai para mensagem genérica quando slug não existe", () => {
    const url = buildWaLink("specialty:nao-existe");
    expect(url).toContain(encodeURIComponent(waMessages.generic));
  });
});
```

- [ ] **Step 4.2: Rodar e ver falhar**

```powershell
npm test
```

Esperado: FAIL — `Cannot find module './whatsapp'`.

- [ ] **Step 4.3: Implementar**

Criar `src/lib/whatsapp.ts`:

```ts
import { site } from "@/content/site";
import { specialties } from "@/content/specialties";
import type { WhatsAppContext } from "@/content/types";

export const waMessages = {
  hero: "Olá! Vim pelo site e gostaria de agendar uma consulta.",
  generic: "Olá! Vim pelo site da Verità Essere e gostaria de mais informações.",
  lucas: "Olá, Lucas! Vim pelo site e gostaria de agendar uma sessão com você.",
  tamara: "Olá, Tamara! Vim pelo site e gostaria de agendar uma sessão com você.",
} as const;

export function buildWaLink(context: WhatsAppContext): string {
  let message: string;
  if (context.startsWith("specialty:")) {
    const slug = context.slice("specialty:".length);
    const specialty = specialties.find((s) => s.slug === slug);
    message = specialty
      ? `Olá! Vim pelo site e gostaria de conversar sobre ${specialty.title}.`
      : waMessages.generic;
  } else {
    message = waMessages[context as keyof typeof waMessages] ?? waMessages.generic;
  }
  return `https://wa.me/${site.whatsapp.raw}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 4.4: Rodar e ver passar**

```powershell
npm test
```

Esperado: 6 tests passed.

- [ ] **Step 4.5: Commit**

```powershell
git add -A
git commit -m "feat: add whatsapp link builder with contextual messages"
```

---

## Task 5: SEO wrapper

**Files:**
- Create: `src/lib/seo.tsx`, `src/lib/schema.ts`, `src/lib/cn.ts`
- Modify: `src/main.tsx`

- [ ] **Step 5.1: Helper cn**

Criar `src/lib/cn.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

- [ ] **Step 5.2: Schema.org snippets**

Criar `src/lib/schema.ts`:

```ts
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
```

- [ ] **Step 5.3: Componente Seo**

Criar `src/lib/seo.tsx`:

```tsx
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
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.url}/og-image.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${site.url}/og-image.png`} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
```

- [ ] **Step 5.4: Wrap em HelmetProvider**

Substituir `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
```

- [ ] **Step 5.5: Verificar**

```powershell
npm run typecheck
```

Esperado: PASS.

- [ ] **Step 5.6: Commit**

```powershell
git add -A
git commit -m "feat: add SEO wrapper and Schema.org snippets"
```

---

## Task 6: Routing + page stubs

**Files:**
- Create: `src/routes.tsx`, `src/pages/Home.tsx`, `src/pages/Sobre.tsx`, `src/pages/Equipe.tsx`, `src/pages/Especialidades.tsx`, `src/pages/Contato.tsx`, `src/pages/Obrigado.tsx`, `src/pages/Politica.tsx`, `src/pages/NotFound.tsx`, `src/components/layout/SkipLink.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 6.1: SkipLink**

Criar `src/components/layout/SkipLink.tsx`:

```tsx
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-body-on-dark focus:px-4 focus:py-2 focus:rounded-pill"
    >
      Pular para o conteúdo
    </a>
  );
}
```

- [ ] **Step 6.2: Page stubs**

Criar 8 arquivos em `src/pages/` — cada um exporta um componente simples para validar o routing antes de implementar o conteúdo. Padrão (substituir nome e texto):

`src/pages/Home.tsx`:
```tsx
export default function Home() { return <div className="container-content py-20">Home</div>; }
```

`src/pages/Sobre.tsx`:
```tsx
export default function Sobre() { return <div className="container-content py-20">Sobre</div>; }
```

`src/pages/Equipe.tsx`:
```tsx
export default function Equipe() { return <div className="container-content py-20">Equipe</div>; }
```

`src/pages/Especialidades.tsx`:
```tsx
export default function Especialidades() { return <div className="container-content py-20">Especialidades</div>; }
```

`src/pages/Contato.tsx`:
```tsx
export default function Contato() { return <div className="container-content py-20">Contato</div>; }
```

`src/pages/Obrigado.tsx`:
```tsx
export default function Obrigado() { return <div className="container-content py-20">Obrigado</div>; }
```

`src/pages/Politica.tsx`:
```tsx
export default function Politica() { return <div className="container-content py-20">Política de Privacidade</div>; }
```

`src/pages/NotFound.tsx`:
```tsx
export default function NotFound() { return <div className="container-content py-20">404 — Página não encontrada</div>; }
```

- [ ] **Step 6.3: Routes**

Criar `src/routes.tsx`:

```tsx
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Equipe = lazy(() => import("./pages/Equipe"));
const Especialidades = lazy(() => import("./pages/Especialidades"));
const Contato = lazy(() => import("./pages/Contato"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const Politica = lazy(() => import("./pages/Politica"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/equipe" element={<Equipe />} />
      <Route path="/especialidades" element={<Especialidades />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="/politica-de-privacidade" element={<Politica />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

- [ ] **Step 6.4: App shell**

Substituir `src/App.tsx`:

```tsx
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { SkipLink } from "@/components/layout/SkipLink";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <main id="main">
        <Suspense fallback={<div className="container-content py-20">Carregando…</div>}>
          <AppRoutes />
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
```

- [ ] **Step 6.5: Validar navegação**

```powershell
npm run dev
```

Acessar manualmente: `/`, `/sobre`, `/equipe`, `/especialidades`, `/contato`, `/obrigado`, `/politica-de-privacidade`, `/qualquer-coisa-inexistente`. Cada rota mostra seu título.

```powershell
npm run typecheck
npm run build
```

Esperado: ambos passam.

- [ ] **Step 6.6: Commit**

```powershell
git add -A
git commit -m "feat: add routing, lazy-loaded page stubs and skip link"
```

---

## Task 7: Nav + Footer + shadcn Button

**Files:**
- Create: `src/components/ui/button.tsx`, `src/components/layout/Nav.tsx`, `src/components/layout/Footer.tsx`
- Modify: `src/App.tsx`, `components.json`

- [ ] **Step 7.1: Instalar shadcn Button**

Inicializar shadcn (responder defaults: New York style, Slate base, sim para CSS vars, `src/components`, alias `@/components`):

```powershell
npx shadcn@latest init
```

Depois adicionar o Button:

```powershell
npx shadcn@latest add button
```

Isso cria `src/components/ui/button.tsx`. Verificar que o arquivo importa `@/lib/cn` (ou similar — se importar `@/lib/utils`, criar alias renomeando para nosso `cn.ts` ou criar `src/lib/utils.ts` re-exportando). Para simplificar, criar `src/lib/utils.ts`:

```ts
export { cn } from "./cn";
```

- [ ] **Step 7.2: Estender variants do Button**

Editar `src/components/ui/button.tsx` — substituir o `buttonVariants` por:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Acento dourado do briefing — CTA decisivo
        primary:
          "bg-primary text-ink shadow-sm hover:bg-primary-hover hover:shadow-lift active:bg-primary-active active:shadow-press rounded-pill",
        // CTA verde do hero/nav (overrides locais)
        green:
          "bg-hero-green text-white shadow-sm hover:bg-hero-green-hover hover:shadow-lift active:shadow-press rounded-pill",
        // Outline para uso em superfície escura
        "outline-on-dark":
          "border border-white/40 text-white hover:bg-white/10 rounded-pill",
        // Outline verde do hero
        "outline-green":
          "border border-hero-green text-hero-green hover:bg-hero-green/5 rounded-pill",
        // Outline neutro para superfícies claras
        outline:
          "border border-hairline text-ink hover:bg-canvas-parchment rounded-pill",
        ghost: "text-ink hover:bg-canvas-parchment rounded-pill",
      },
      size: {
        default: "h-11 px-6",
        lg: "h-12 px-7 text-base",
        sm: "h-9 px-4",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);
```

(Manter o resto do arquivo: imports, `Button` component, `forwardRef`, etc.)

- [ ] **Step 7.3: Nav**

Criar `src/components/layout/Nav.tsx`:

```tsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { buildWaLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

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

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors",
        isHome ? "bg-hero-bg/95" : "bg-canvas/95",
        scrolled && "backdrop-blur-md shadow-sm"
      )}
    >
      <div className="container-content flex h-16 md:h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 text-ink" aria-label="Verità Essere — início">
          <Leaf className="h-5 w-5 text-hero-green" aria-hidden />
          <span className="font-serif text-xl md:text-2xl">Verità Essere</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
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
            <a href={buildWaLink("generic")} target="_blank" rel="noopener noreferrer">
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
          <nav className="container-content py-4 flex flex-col gap-3" aria-label="Mobile">
            {site.navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className="text-ink py-2">
                {l.label}
              </NavLink>
            ))}
            <Button asChild variant="green" className="mt-2">
              <a href={buildWaLink("generic")} target="_blank" rel="noopener noreferrer">
                Fale conosco agora
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
```

Adicionar suporte a `asChild` no Button — verificar que o Button gerado pelo shadcn já tem (usa `@radix-ui/react-slot`). Se não tiver, rodar `npm install @radix-ui/react-slot` e ajustar.

- [ ] **Step 7.4: Footer**

Criar `src/components/layout/Footer.tsx`:

```tsx
import { Link } from "react-router-dom";
import { Leaf, Instagram } from "lucide-react";
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
            <li><a href={`mailto:${site.email}`} className="hover:text-primary-on-dark">{site.email}</a></li>
            <li className="text-body-muted">WhatsApp {site.whatsapp.display}</li>
            <li className="text-body-muted">{site.hours.days}, {site.hours.time}</li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary-on-dark">
                <Instagram className="h-4 w-4" /> @veritaessere
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-body-muted">
          <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
          <Link to="/politica-de-privacidade" className="hover:text-primary-on-dark">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 7.5: Plugar Nav + Footer no App**

Substituir `src/App.tsx`:

```tsx
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { SkipLink } from "@/components/layout/SkipLink";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <Nav />
      <main id="main">
        <Suspense fallback={<div className="container-content py-20">Carregando…</div>}>
          <AppRoutes />
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```

- [ ] **Step 7.6: Validar**

`npm run dev`, conferir:
- Nav presente em todas as rotas, com fundo creme em `/` e branco nas demais
- Links funcionam, ativo destacado
- Botão "Fale conosco agora" abre WhatsApp em nova aba
- Menu mobile funciona (redimensionar para < 768px)
- Footer presente em todas as rotas, CRPs visíveis

```powershell
npm run typecheck
```

- [ ] **Step 7.7: Commit**

```powershell
git add -A
git commit -m "feat: add nav, footer and button component"
```

---

## Task 8: Motion primitives + PageTransition

**Files:**
- Create: `src/components/motion/Reveal.tsx`, `src/components/motion/PageTransition.tsx`, `src/hooks/usePrefersReducedMotion.ts`
- Modify: `src/App.tsx`

- [ ] **Step 8.1: Hook prefers-reduced-motion**

Criar `src/hooks/usePrefersReducedMotion.ts`:

```ts
import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
```

- [ ] **Step 8.2: Reveal**

Criar `src/components/motion/Reveal.tsx`:

```tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = { children: ReactNode; delay?: number; className?: string };

export function Reveal({ children, delay = 0, className }: Props) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 8.3: PageTransition**

Criar `src/components/motion/PageTransition.tsx`:

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduced = usePrefersReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 8.4: Plugar PageTransition**

Atualizar `src/App.tsx` — envolver `<AppRoutes />` com `<PageTransition>`:

```tsx
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { SkipLink } from "@/components/layout/SkipLink";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <Nav />
      <main id="main">
        <Suspense fallback={<div className="container-content py-20">Carregando…</div>}>
          <PageTransition>
            <AppRoutes />
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```

- [ ] **Step 8.5: Validar**

`npm run dev`. Navegar entre rotas — observar fade suave. Em DevTools → Rendering → Emulate "prefers-reduced-motion: reduce" → transição deve ser imediata.

```powershell
npm run typecheck
```

- [ ] **Step 8.6: Commit**

```powershell
git add -A
git commit -m "feat: add motion primitives and page transitions"
```

---

## Task 9: WhatsAppFloat

**Files:**
- Create: `src/components/WhatsAppFloat.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 9.1: Componente**

Criar `src/components/WhatsAppFloat.tsx`:

```tsx
import { MessageCircle } from "lucide-react";
import { buildWaLink } from "@/lib/whatsapp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function WhatsAppFloat() {
  const reduced = usePrefersReducedMotion();
  return (
    <a
      href={buildWaLink("generic")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-surface-sage text-white shadow-lift transition-transform hover:scale-105 active:scale-95">
        {!reduced && (
          <span
            className="absolute inset-0 rounded-full bg-surface-sage/40 animate-pulse-ring"
            aria-hidden
          />
        )}
        <MessageCircle className="h-6 w-6 relative" aria-hidden />
      </span>
    </a>
  );
}
```

- [ ] **Step 9.2: Plugar no App**

Em `src/App.tsx`, importar e renderizar `<WhatsAppFloat />` antes do `<Footer />`:

```tsx
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
// ...
      </main>
      <WhatsAppFloat />
      <Footer />
```

- [ ] **Step 9.3: Validar**

`npm run dev`. Botão sage green flutua no canto inferior direito em todas as páginas, com anel pulsante. Clique abre WhatsApp. Reduced-motion suprime o pulso.

- [ ] **Step 9.4: Commit**

```powershell
git add -A
git commit -m "feat: add WhatsApp floating button"
```

---

## Task 10: Hero da Home (componente especial)

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 10.1: Hero**

Criar `src/components/sections/Hero.tsx`:

```tsx
import { Leaf, ShieldCheck, HeartHandshake, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import psicologos from "@/assets/images/psicologos.png";

const badges = [
  { icon: ShieldCheck, title: "Ambiente seguro", sub: "e acolhedor" },
  { icon: HeartHandshake, title: "Escuta ativa", sub: "humana e individualizada" },
  { icon: BookOpen, title: "Abordagem moderna", sub: "e baseada em ciência" },
];

export function Hero() {
  return (
    <section className="bg-hero-bg">
      <div className="container-content grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-10 md:pt-16 pb-0 md:pb-0 items-end">
        <div className="md:col-span-7 pb-12 md:pb-20">
          <p className="flex items-center gap-2 mb-6 text-sm font-medium text-hero-green">
            <Leaf className="h-4 w-4" aria-hidden />
            Psicologia clínica com acolhimento e ética
          </p>

          <h1 className="font-serif font-normal text-hero-ink leading-[1.05] tracking-tight text-[40px] sm:text-5xl md:text-6xl lg:text-7xl">
            Um espaço seguro para{" "}
            <em className="italic text-hero-green font-normal">cuidar</em>{" "}
            da sua saúde emocional.
          </h1>

          <p className="mt-6 text-lg text-hero-muted max-w-xl">
            Atendimento psicológico online especializado para ajudar você a
            compreender, ressignificar e viver com mais equilíbrio, leveza e
            bem-estar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="green" size="lg">
              <a href={buildWaLink("hero")} target="_blank" rel="noopener noreferrer">
                Agendar consulta
              </a>
            </Button>
            <Button asChild variant="outline-green" size="lg">
              <a href="#como-funciona">100% Online</a>
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {badges.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-hero-green/10 text-hero-green shrink-0">
                  <b.icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="text-sm">
                  <p className="font-medium text-hero-ink leading-tight">{b.title}</p>
                  <p className="text-hero-muted leading-tight">{b.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 self-end">
          <img
            src={psicologos}
            alt="Lucas Fachin e Tamara Mikaelly, psicólogos da Verità Essere"
            width={520}
            height={620}
            loading="eager"
            fetchPriority="high"
            className="block w-full h-auto max-w-[480px] mx-auto md:mx-0 md:ml-auto drop-shadow-hero-photo"
          />
        </div>
      </div>
    </section>
  );
}
```

Nota: `drop-shadow-hero-photo` precisa existir. Confirmar em `tailwind.config.ts` que `shadow.hero-photo` está definido (já está, Step 2.1) — mas para `drop-shadow` precisamos adicionar. Adicionar em `tailwind.config.ts` dentro de `theme.extend`:

```ts
dropShadow: {
  "hero-photo": "0 12px 24px rgba(15, 24, 21, 0.18)",
},
```

- [ ] **Step 10.2: Usar Hero na Home**

Substituir `src/pages/Home.tsx`:

```tsx
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
```

- [ ] **Step 10.3: Validar visualmente**

`npm run dev` → abrir `/`. Comparar com `src/assets/images/heroinpiration.png`:
- ✅ Layout 2 colunas (texto esquerda, foto direita)
- ✅ Fundo creme
- ✅ Eyebrow com folha
- ✅ H1 serifa grande com "cuidar" em itálico verde
- ✅ Lead cinza
- ✅ 2 CTAs (verde sólido + outline verde)
- ✅ 3 mini-badges com ícone+título+subtítulo
- ✅ Foto encostando na base do hero
- ✅ Mobile: foto empilha acima

Ajustar tamanhos/espaçamentos até bater visualmente.

- [ ] **Step 10.4: Commit**

```powershell
git add -A
git commit -m "feat: implement Home hero matching inspiration"
```

---

## Task 11: Cards (ProfessionalCard, SpecialtyCard)

**Files:**
- Create: `src/components/cards/ProfessionalCard.tsx`, `src/components/cards/SpecialtyCard.tsx`

- [ ] **Step 11.1: ProfessionalCard**

Criar `src/components/cards/ProfessionalCard.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { buildWaLink } from "@/lib/whatsapp";
import type { Professional } from "@/content/types";

export function ProfessionalCard({ professional: p, variant = "compact" }: {
  professional: Professional;
  variant?: "compact" | "expanded";
}) {
  const wa = buildWaLink(p.id);
  return (
    <article className="bg-canvas rounded-card border border-hairline shadow-card overflow-hidden flex flex-col transition-shadow hover:shadow-lift">
      <div className="aspect-[4/5] bg-canvas-parchment flex items-center justify-center">
        {p.photo ? (
          <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-ink-muted-48 text-sm">Foto em breve</span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display font-light text-2xl text-ink tracking-tightish">{p.name}</h3>
        <p className="text-xs text-ink-muted-48 mt-1">{p.crp}</p>
        <p className="mt-3 text-sm text-body leading-relaxed">
          {variant === "expanded" ? p.fullBio : p.shortBio}
        </p>
        <div className="mt-5">
          <Button asChild variant="primary" size="sm">
            <a href={wa} target="_blank" rel="noopener noreferrer">
              Agendar com {p.firstName}
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 11.2: SpecialtyCard**

Criar `src/components/cards/SpecialtyCard.tsx`:

```tsx
import * as Icons from "lucide-react";
import type { Specialty } from "@/content/types";

export function SpecialtyCard({ specialty: s, variant = "compact" }: {
  specialty: Specialty;
  variant?: "compact" | "expanded";
}) {
  const Icon = Icons[s.icon] as Icons.LucideIcon;
  return (
    <article className="bg-canvas-parchment rounded-card border border-divider-soft shadow-sm p-6 flex gap-4 items-start">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-on-dark/20 text-primary-active shrink-0">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <h3 className="font-display font-medium text-lg text-ink tracking-tightish">{s.title}</h3>
        <p className="mt-1 text-sm text-body leading-relaxed">
          {variant === "expanded" ? s.description : s.short}
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 11.3: Validar tipos**

```powershell
npm run typecheck
```

Esperado: PASS.

- [ ] **Step 11.4: Commit**

```powershell
git add -A
git commit -m "feat: add ProfessionalCard and SpecialtyCard"
```

---

## Task 12: Demais seções da Home

**Files:**
- Create: `src/components/sections/SobreSnippet.tsx`, `src/components/sections/EquipeSection.tsx`, `src/components/sections/AreasSection.tsx`, `src/components/sections/ComoFunciona.tsx`, `src/components/sections/CtaFinal.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 12.1: SobreSnippet** (surface branco)

Criar `src/components/sections/SobreSnippet.tsx`:

```tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

export function SobreSnippet() {
  return (
    <section className="bg-canvas">
      <div className="container-content py-20 md:py-28 max-w-3xl">
        <Reveal>
          <p className="eyebrow">Sobre a clínica</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink">
            Um espaço pensado para o seu tempo.
          </h2>
          <p className="mt-6 text-lg text-body leading-relaxed">
            A Verità Essere reúne psicólogos comprometidos com um atendimento ético,
            humano e baseado em evidências. Acreditamos que cada pessoa carrega uma história
            singular, e que o processo terapêutico é construído no encontro.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/sobre">Conheça nossa filosofia</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.2: EquipeSection** (surface parchment)

Criar `src/components/sections/EquipeSection.tsx`:

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { ProfessionalCard } from "@/components/cards/ProfessionalCard";
import { professionals } from "@/content/professionals";

export function EquipeSection() {
  return (
    <section className="bg-canvas-parchment">
      <div className="container-content py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">Equipe</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink max-w-2xl">
            Profissionais para acompanhar a sua jornada.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {professionals.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProfessionalCard professional={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.3: AreasSection** (surface branco)

Criar `src/components/sections/AreasSection.tsx`:

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { SpecialtyCard } from "@/components/cards/SpecialtyCard";
import { specialties } from "@/content/specialties";

export function AreasSection() {
  return (
    <section className="bg-canvas">
      <div className="container-content py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">Áreas de atuação</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink max-w-2xl">
            Acompanhamento em diferentes demandas da vida.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <SpecialtyCard specialty={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.4: ComoFunciona** (surface deep-green)

Criar `src/components/sections/ComoFunciona.tsx`:

```tsx
import { Video, CalendarClock, Globe2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

const items = [
  { icon: Globe2, title: site.modality, sub: "Atendimento de qualquer lugar do Brasil" },
  { icon: Video, title: site.platform, sub: "Sessões por videochamada segura" },
  { icon: CalendarClock, title: `${site.hours.days}`, sub: site.hours.time },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-surface-deep text-body-on-dark">
      <div className="container-content py-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-body-muted">Como funciona</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-body-on-dark max-w-2xl">
            Atendimento online, no seu ritmo.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="flex flex-col gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-primary-on-dark">
                  <it.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display font-light text-2xl tracking-tightish">{it.title}</h3>
                <p className="text-body-muted">{it.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.5: CtaFinal** (surface parchment)

Criar `src/components/sections/CtaFinal.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { buildWaLink } from "@/lib/whatsapp";

export function CtaFinal() {
  return (
    <section className="bg-canvas-parchment">
      <div className="container-content py-20 md:py-28 text-center max-w-2xl">
        <Reveal>
          <p className="eyebrow">Próximo passo</p>
          <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink">
            Pronto para começar?
          </h2>
          <p className="mt-5 text-lg text-body leading-relaxed">
            Agende uma conversa inicial e descubra como podemos caminhar juntos.
          </p>
          <div className="mt-8">
            <Button asChild variant="primary" size="lg">
              <a href={buildWaLink("generic")} target="_blank" rel="noopener noreferrer">
                Agendar uma conversa
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.6: Compor a Home**

Substituir `src/pages/Home.tsx`:

```tsx
import { Seo } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { SobreSnippet } from "@/components/sections/SobreSnippet";
import { EquipeSection } from "@/components/sections/EquipeSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { medicalBusinessSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={medicalBusinessSchema} />
      <Hero />
      <SobreSnippet />
      <EquipeSection />
      <AreasSection />
      <ComoFunciona />
      <CtaFinal />
    </>
  );
}
```

- [ ] **Step 12.7: Validar visualmente**

`npm run dev` → percorrer `/` do topo ao rodapé. Verificar:
- Hero (creme + serifa) → transição para Sobre (branco)
- Surfaces alternam branco/parchment/branco/deep-green/parchment
- Reveals disparam ao rolar
- CRPs visíveis nos cards
- Botão "Agendar com Lucas" usa mensagem WhatsApp do Lucas; "Agendar com Tamara" usa da Tamara
- Âncora `#como-funciona` no hero scrolla suavemente

- [ ] **Step 12.8: Commit**

```powershell
git add -A
git commit -m "feat: implement remaining Home sections"
```

---

## Task 13: Página /sobre

**Files:**
- Modify: `src/pages/Sobre.tsx`

- [ ] **Step 13.1: Implementar**

Substituir `src/pages/Sobre.tsx`:

```tsx
import { Seo } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

const pilares = [
  {
    title: "Ética",
    body: "Sigilo, respeito e conduta alinhada às diretrizes do Conselho Federal de Psicologia.",
  },
  {
    title: "Acolhimento",
    body: "Cada pessoa é recebida no seu tempo, sem julgamento, com escuta atenta e cuidadosa.",
  },
  {
    title: "Evidência",
    body: "Práticas psicoterapêuticas baseadas em evidências científicas atualizadas.",
  },
];

export default function Sobre() {
  return (
    <>
      <Seo path="/sobre" title="Sobre a clínica" description="Conheça a Verità Essere — clínica de psicologia online com atendimento humano, ético e baseado em evidências." />

      <section className="bg-surface-deep text-body-on-dark">
        <div className="container-content py-20 md:py-28 max-w-3xl">
          <p className="eyebrow text-body-muted">Sobre a clínica</p>
          <h1 className="mt-3 font-display font-light text-5xl md:text-6xl tracking-tight">
            <span className="font-serif italic text-primary-on-dark">La verità dell'essere</span>
            <span className="block mt-2">A verdade do ser.</span>
          </h1>
          <p className="mt-6 text-lg text-body-muted leading-relaxed">
            {/* PLACEHOLDER — texto institucional pendente do cliente */}
            A Verità Essere nasce do desejo de oferecer um espaço onde a verdade do ser
            possa ser acolhida. Acreditamos que a psicoterapia é um encontro
            transformador — espaço de escuta, reflexão e cuidado.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="container-content py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">Filosofia</p>
            <h2 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink max-w-2xl">
              Nossos princípios.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pilares.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div>
                  <h3 className="font-display font-light text-2xl text-ink tracking-tightish">{p.title}</h3>
                  <p className="mt-3 text-body leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas-parchment">
        <div className="container-content py-20 md:py-28 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Atendimento</p>
            <h2 className="mt-3 font-display font-light text-3xl md:text-4xl tracking-tight text-ink">
              {site.modality} via {site.platform}.
            </h2>
            <p className="mt-5 text-lg text-body leading-relaxed">
              {site.hours.days}, das {site.hours.time}. Atendemos exclusivamente em
              modalidade particular, sem convênios.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 13.2: Validar**

`npm run dev` → abrir `/sobre`. Hero deep-green com tagline italiana, depois 3 pilares em surface branco, depois bloco de atendimento em parchment.

- [ ] **Step 13.3: Commit**

```powershell
git add -A
git commit -m "feat: implement /sobre page"
```

---

## Task 14: Página /equipe

**Files:**
- Modify: `src/pages/Equipe.tsx`

- [ ] **Step 14.1: Implementar**

Substituir `src/pages/Equipe.tsx`:

```tsx
import { Seo } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { ProfessionalCard } from "@/components/cards/ProfessionalCard";
import { professionals } from "@/content/professionals";
import { specialties } from "@/content/specialties";
import { personSchemas } from "@/lib/schema";

export default function Equipe() {
  return (
    <>
      <Seo
        path="/equipe"
        title="Equipe"
        description="Conheça os psicólogos da Verità Essere."
        jsonLd={personSchemas}
      />

      <section className="bg-canvas">
        <div className="container-content pt-16 md:pt-24 pb-10">
          <p className="eyebrow">Equipe</p>
          <h1 className="mt-3 font-display font-light text-5xl md:text-6xl tracking-tight text-ink max-w-3xl">
            Profissionais para acompanhar a sua jornada.
          </h1>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="container-content pb-20 md:pb-28 grid gap-12">
          {professionals.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div className="grid gap-8 md:grid-cols-12 items-start">
                <div className="md:col-span-5">
                  <ProfessionalCard professional={p} variant="expanded" />
                </div>
                <div className="md:col-span-7">
                  <h2 className="font-display font-light text-3xl text-ink tracking-tightish">{p.name}</h2>
                  <p className="text-sm text-ink-muted-48 mt-1">{p.crp}</p>
                  <p className="mt-5 text-body leading-relaxed">{p.fullBio}</p>

                  <div className="mt-6">
                    <p className="eyebrow mb-2">Áreas que atende</p>
                    <ul className="flex flex-wrap gap-2">
                      {p.areas.map((slug) => {
                        const s = specialties.find((x) => x.slug === slug);
                        if (!s) return null;
                        return (
                          <li key={slug} className="text-sm bg-canvas-parchment border border-divider-soft rounded-pill px-3 py-1 text-body">
                            {s.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 14.2: Validar**

`/equipe` mostra os dois profissionais com card + bio completa + chips de áreas. CRP visível.

- [ ] **Step 14.3: Commit**

```powershell
git add -A
git commit -m "feat: implement /equipe page"
```

---

## Task 15: Página /especialidades

**Files:**
- Modify: `src/pages/Especialidades.tsx`

- [ ] **Step 15.1: Implementar**

Substituir `src/pages/Especialidades.tsx`:

```tsx
import { Seo } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { SpecialtyCard } from "@/components/cards/SpecialtyCard";
import { specialties } from "@/content/specialties";

export default function Especialidades() {
  return (
    <>
      <Seo
        path="/especialidades"
        title="Áreas de atuação"
        description="Conheça as áreas de atuação da Verità Essere: ansiedade, depressão, autismo, infantil e mais."
      />

      <section className="bg-canvas">
        <div className="container-content pt-16 md:pt-24 pb-10 max-w-3xl">
          <p className="eyebrow">Áreas de atuação</p>
          <h1 className="mt-3 font-display font-light text-5xl md:text-6xl tracking-tight text-ink">
            Acompanhamento em diferentes demandas da vida.
          </h1>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="container-content pb-20 md:pb-28 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <SpecialtyCard specialty={s} variant="expanded" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 15.2: Validar**

`/especialidades` mostra grid 3 colunas com descrições mais longas.

- [ ] **Step 15.3: Commit**

```powershell
git add -A
git commit -m "feat: implement /especialidades page"
```

---

## Task 16: Página /contato (form com mailto/WhatsApp)

**Files:**
- Create: `src/components/sections/ContatoForm.tsx`
- Modify: `src/pages/Contato.tsx`, `src/pages/Obrigado.tsx`

Antes de começar, instalar shadcn form pieces:

```powershell
npx shadcn@latest add input textarea label select checkbox form
```

- [ ] **Step 16.1: ContatoForm**

Criar `src/components/sections/ContatoForm.tsx`:

```tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { site } from "@/content/site";

const motivos = ["Agendar consulta", "Tirar dúvidas", "Acompanhamento para familiar", "Outro"] as const;

const schema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(8, "Informe um telefone válido"),
  motivo: z.enum(motivos, { errorMap: () => ({ message: "Selecione um motivo" }) }),
  mensagem: z.string().min(10, "Conte um pouco mais (mín. 10 caracteres)"),
  consent: z.literal(true, { errorMap: () => ({ message: "Necessário consentir com o uso dos dados" }) }),
  // honeypot
  website: z.string().max(0, "spam detectado").optional(),
});

type FormData = z.infer<typeof schema>;

function buildBody(d: FormData) {
  return `Nome: ${d.nome}\nEmail: ${d.email}\nTelefone: ${d.telefone}\nMotivo: ${d.motivo}\n\n${d.mensagem}`;
}

export function ContatoForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState<"mail" | "wa" | null>(null);
  const {
    register, handleSubmit, formState: { errors }, getValues, setValue, watch,
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { website: "" } });

  const consent = watch("consent");

  const sendMail = handleSubmit((d) => {
    setSubmitting("mail");
    const subject = `Contato pelo site — ${d.motivo}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody(d))}`;
    setTimeout(() => navigate("/obrigado"), 400);
  });

  const sendWa = handleSubmit((d) => {
    setSubmitting("wa");
    const text = `Olá! Vim pelo site.\n\n${buildBody(d)}`;
    window.open(`https://wa.me/${site.whatsapp.raw}?text=${encodeURIComponent(text)}`, "_blank");
    navigate("/obrigado");
  });

  return (
    <form noValidate className="grid gap-5">
      {/* honeypot — escondido */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        {...register("website")}
        className="hidden"
      />

      <div className="grid gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" {...register("nome")} aria-invalid={!!errors.nome} />
        {errors.nome && <p className="text-sm text-red-700">{errors.nome.message}</p>}
      </div>

      <div className="grid gap-2 md:grid-cols-2 md:gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="telefone">Telefone / WhatsApp</Label>
          <Input id="telefone" type="tel" {...register("telefone")} aria-invalid={!!errors.telefone} />
          {errors.telefone && <p className="text-sm text-red-700">{errors.telefone.message}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="motivo">Motivo</Label>
        <select
          id="motivo"
          {...register("motivo")}
          className="h-11 rounded-pill border border-hairline bg-canvas px-4 text-sm focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:outline-none"
        >
          <option value="">Selecione…</option>
          {motivos.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        {errors.motivo && <p className="text-sm text-red-700">{errors.motivo.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="mensagem">Mensagem</Label>
        <Textarea id="mensagem" rows={5} {...register("mensagem")} aria-invalid={!!errors.mensagem} />
        {errors.mensagem && <p className="text-sm text-red-700">{errors.mensagem.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={!!consent}
          onCheckedChange={(v) => setValue("consent", v === true, { shouldValidate: true })}
        />
        <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer">
          Autorizo o tratamento dos meus dados pessoais para fins de contato, conforme a{" "}
          <a href="/politica-de-privacidade" className="underline">Política de Privacidade</a>.
        </Label>
      </div>
      {errors.consent && <p className="text-sm text-red-700 -mt-3">{errors.consent.message}</p>}

      <div className="flex flex-wrap gap-3 mt-2">
        <Button type="button" variant="primary" size="lg" onClick={sendMail} disabled={submitting !== null}>
          Enviar por email
        </Button>
        <Button type="button" variant="green" size="lg" onClick={sendWa} disabled={submitting !== null}>
          Enviar pelo WhatsApp
        </Button>
      </div>
    </form>
  );
}
```

- [ ] **Step 16.2: Página Contato**

Substituir `src/pages/Contato.tsx`:

```tsx
import { Seo } from "@/lib/seo";
import { ContatoForm } from "@/components/sections/ContatoForm";
import { site } from "@/content/site";
import { Mail, MessageCircle, Clock } from "lucide-react";

export default function Contato() {
  return (
    <>
      <Seo path="/contato" title="Contato" description="Entre em contato com a Verità Essere por email ou WhatsApp." />

      <section className="bg-canvas">
        <div className="container-content pt-16 md:pt-24 pb-10 max-w-3xl">
          <p className="eyebrow">Contato</p>
          <h1 className="mt-3 font-display font-light text-5xl md:text-6xl tracking-tight text-ink">
            Vamos conversar.
          </h1>
          <p className="mt-5 text-lg text-body leading-relaxed">
            Preencha o formulário ou fale conosco pelo canal de sua preferência. Respondemos em horário comercial.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="container-content pb-20 md:pb-28 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContatoForm />
          </div>
          <aside className="space-y-6 text-sm">
            <div>
              <p className="eyebrow mb-2">Email</p>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-ink hover:text-primary-active">
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">WhatsApp</p>
              <span className="inline-flex items-center gap-2 text-ink">
                <MessageCircle className="h-4 w-4" /> {site.whatsapp.display}
              </span>
            </div>
            <div>
              <p className="eyebrow mb-2">Horários</p>
              <p className="inline-flex items-center gap-2 text-ink">
                <Clock className="h-4 w-4" /> {site.hours.days}, {site.hours.time}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">Atendimento</p>
              <p className="text-body">{site.modality} via {site.platform}.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 16.3: Página Obrigado**

Substituir `src/pages/Obrigado.tsx`:

```tsx
import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export default function Obrigado() {
  return (
    <>
      <Seo path="/obrigado" title="Recebido" noindex />
      <section className="bg-canvas">
        <div className="container-content py-24 md:py-32 max-w-2xl text-center">
          <p className="eyebrow">Recebido</p>
          <h1 className="mt-3 font-display font-light text-5xl tracking-tight text-ink">
            Obrigado pelo contato.
          </h1>
          <p className="mt-5 text-lg text-body leading-relaxed">
            Sua mensagem foi encaminhada. Em breve retornaremos pelo canal que você escolheu.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline"><Link to="/">Voltar para a Home</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 16.4: Validar**

`npm run dev` → `/contato`:
- Submit sem nada → erros aparecem nos campos
- Preencher tudo, desmarcar consent → erro no consent
- Marcar consent, clicar "Enviar pelo WhatsApp" → abre WhatsApp em nova aba, navega para `/obrigado`
- Inspecionar HTML — input honeypot tem classe `hidden`

```powershell
npm run typecheck
```

- [ ] **Step 16.5: Commit**

```powershell
git add -A
git commit -m "feat: implement /contato form and /obrigado page"
```

---

## Task 17: /politica + /404 + SEO assets + verificação final

**Files:**
- Modify: `src/pages/Politica.tsx`, `src/pages/NotFound.tsx`, `index.html`
- Create: `public/robots.txt`, `public/sitemap.xml`, `public/og-image.png` (placeholder)

- [ ] **Step 17.1: /politica**

Substituir `src/pages/Politica.tsx`:

```tsx
import { Seo } from "@/lib/seo";
import { site } from "@/content/site";

export default function Politica() {
  return (
    <>
      <Seo path="/politica-de-privacidade" title="Política de Privacidade" />
      <section className="bg-canvas">
        <div className="container-content py-16 md:py-24 max-w-3xl prose prose-neutral">
          <p className="eyebrow">LGPD</p>
          <h1 className="mt-3 font-display font-light text-4xl md:text-5xl tracking-tight text-ink">
            Política de Privacidade
          </h1>

          {/* PLACEHOLDER — revisar com cliente/jurídico */}
          <div className="mt-8 space-y-6 text-body leading-relaxed">
            <p>
              A {site.name} ("nós") respeita a privacidade dos visitantes deste site e está
              comprometida com o tratamento responsável dos dados pessoais, em conformidade com
              a Lei Geral de Proteção de Dados (Lei 13.709/2018 — LGPD).
            </p>

            <h2 className="font-display font-light text-2xl text-ink mt-8">Quais dados coletamos</h2>
            <p>
              Coletamos apenas os dados que você nos fornece voluntariamente pelo formulário de
              contato: nome, email, telefone, motivo do contato e mensagem.
            </p>

            <h2 className="font-display font-light text-2xl text-ink mt-8">Finalidade</h2>
            <p>
              Os dados são utilizados exclusivamente para responder ao seu contato e eventual
              agendamento de atendimento psicológico. Não compartilhamos seus dados com terceiros.
            </p>

            <h2 className="font-display font-light text-2xl text-ink mt-8">Retenção e descarte</h2>
            <p>
              Mantemos seus dados pelo tempo necessário para atendimento da finalidade. Você pode
              solicitar a exclusão a qualquer momento.
            </p>

            <h2 className="font-display font-light text-2xl text-ink mt-8">Contato do controlador</h2>
            <p>
              Para exercer seus direitos (acesso, correção, exclusão), entre em contato pelo
              email <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
            </p>

            <p className="text-sm text-ink-muted-48 pt-8">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 17.2: /404**

Substituir `src/pages/NotFound.tsx`:

```tsx
import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Página não encontrada" noindex />
      <section className="bg-canvas">
        <div className="container-content py-24 md:py-32 max-w-2xl text-center">
          <p className="eyebrow">Erro 404</p>
          <h1 className="mt-3 font-display font-light text-5xl tracking-tight text-ink">
            Página não encontrada.
          </h1>
          <p className="mt-5 text-body">A página que você procura pode ter sido removida ou movida.</p>
          <div className="mt-8">
            <Button asChild variant="outline"><Link to="/">Voltar para a Home</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 17.3: robots.txt**

Criar `public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /obrigado

Sitemap: https://www.veritaessere.com.br/sitemap.xml
```

- [ ] **Step 17.4: sitemap.xml**

Criar `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.veritaessere.com.br/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.veritaessere.com.br/sobre</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.veritaessere.com.br/equipe</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.veritaessere.com.br/especialidades</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.veritaessere.com.br/contato</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.veritaessere.com.br/politica-de-privacidade</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>
```

- [ ] **Step 17.5: index.html — lang, favicon, theme-color**

Substituir o `<head>` de `index.html` (manter `<body>` e script):

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0F1815" />
  <title>Verità Essere — A Verdade do Ser</title>
</head>
```

Criar `public/favicon.svg` simples (folha em verde):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1F3D2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c.93-.64 1.13-.12 1.49.99.36 1.11.96 5.69.71 7.86-.31 2.61-1.51 4.49-3.05 5.78a8 8 0 0 1-3.27 1.64 8 8 0 0 1-4.08-.13Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>
```

- [ ] **Step 17.6: Placeholder og-image**

Criar `public/og-image.png` como placeholder (1200×630). Por ora, copiar `src/assets/images/heroinpiration.png` para esse path:

```powershell
Copy-Item src/assets/images/heroinpiration.png public/og-image.png
```

(Substituir por imagem real depois.)

- [ ] **Step 17.7: Verificação final**

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

Abrir `http://localhost:4173` e validar critérios de aceitação da spec seção 17:
- [ ] 8 rotas navegáveis (`/`, `/sobre`, `/equipe`, `/especialidades`, `/contato`, `/obrigado`, `/politica-de-privacidade`, rota inexistente → 404) sem erros no console
- [ ] Hero idêntico à inspiração
- [ ] Demais seções com tokens do briefing
- [ ] WhatsApp float em todas as páginas, links contextuais corretos (clicar em "Agendar com Lucas" leva à mensagem do Lucas)
- [ ] Form bloqueia submit sem consent; honeypot está hidden
- [ ] CRPs visíveis em footer, ProfessionalCard e /equipe
- [ ] Navegação por teclado: Tab pelo header, skip-link aparece no primeiro Tab
- [ ] DevTools → Rendering → Emulate "prefers-reduced-motion: reduce" → transições e pulse desativam
- [ ] DevTools → Lighthouse → rodar mobile + desktop → todas as 4 categorias ≥90

Se Lighthouse < 90 em algum critério, corrigir antes de commitar (geralmente: dimensões de imagem faltando, contraste, alt text, ou meta description).

- [ ] **Step 17.8: Commit final**

```powershell
git add -A
git commit -m "feat: add /politica, /404, SEO assets and finalize v1"
```

---

## Pendências documentadas (não bloqueiam v1)

Marcadas como `// PLACEHOLDER` no código. Para revisar depois da entrega ao cliente:

- `src/content/site.ts` — email e WhatsApp confirmar
- `src/content/professionals.ts` — bios reais
- `src/content/specialties.ts` — descrições oficiais
- `src/pages/Sobre.tsx` — texto institucional definitivo
- `src/pages/Politica.tsx` — revisão jurídica
- `public/og-image.png` — substituir pelo OG image final
- Logo nova (substituir wordmark Cormorant na Nav e Footer)
- Decisão sobre Analytics + banner de cookies se aplicável
