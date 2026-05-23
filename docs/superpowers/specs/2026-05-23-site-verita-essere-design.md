# Design — Site Verità Essere (v1)

**Data:** 2026-05-23
**Cliente:** Verità Essere — clínica de psicologia (Lucas Fachin CRP 08/46660 + Tamara Mikaelly CRP 08/46551)
**Briefing-fonte:** [`BRIEFING.md`](../../../BRIEFING.md)
**Referências visuais:** [`heroinpiration.png`](../../../heroinpiration.png), [`psicologos.png`](../../../psicologos.png)

## 1. Objetivo

Site institucional estático para captação de pacientes via WhatsApp. Foco em apresentação profissional, conformidade CFP/LGPD e identidade visual sofisticada. Sem backend, sem agendamento integrado, sem CMS.

## 2. Stack

| Camada | Escolha |
|---|---|
| Build | Vite 5 |
| Framework | React 18 + TypeScript (strict) |
| Estilo | Tailwind CSS 3 com tokens do briefing em `tailwind.config.ts` |
| Componentes | shadcn/ui (instalado sob demanda — Button, Input, Textarea, Select, Form via react-hook-form + zod) |
| Routing | react-router-dom v6, lazy-load por página |
| Motion | framer-motion (page transitions + scroll reveal) |
| Ícones | lucide-react |
| Fontes | `@fontsource` (self-hosted) — Cormorant Garamond, Sora, Inter |
| SEO | react-helmet-async |
| Lint/format | ESLint + Prettier |
| Deploy | Estático (`dist/`), hospedagem a decidir (Vercel/Netlify/Cloudflare Pages) |

## 3. Estrutura de arquivos

```
src/
  main.tsx                bootstrap + router
  App.tsx                 layout shell (nav + footer + outlet)
  routes.tsx              definição lazy-loaded
  pages/
    Home.tsx
    Sobre.tsx
    Equipe.tsx
    Especialidades.tsx
    Contato.tsx
    Obrigado.tsx
    Politica.tsx
    NotFound.tsx
  components/
    layout/        Nav, Footer, PageTransition, SkipLink
    sections/      Hero, Eyebrow, SectionHeading, CTASection
    cards/         ProfessionalCard, SpecialtyCard
    ui/            shadcn primitives
    motion/        Reveal, FadeIn (respeitam prefers-reduced-motion)
    WhatsAppFloat.tsx
  content/
    professionals.ts      Lucas + Tamara (nome, CRP, bio placeholder, foto)
    specialties.ts        9 áreas (slug, título, descrição placeholder, ícone)
    site.ts               tagline, horários, WhatsApp, email, copy comum
  lib/
    whatsapp.ts           buildWaLink(context) → URL pré-preenchida
    seo.ts                <Seo> wrapper sobre react-helmet-async
    cn.ts                 classnames util (shadcn)
  styles/
    globals.css           tailwind base + tokens CSS vars + font-face
  assets/
    images/psicologos.png
public/
  robots.txt
  sitemap.xml
  og-image.png
tailwind.config.ts
```

**Princípios de organização:**

- Toda copy do site vive em `content/*.ts`. Cliente substitui placeholders sem tocar em componente.
- `whatsapp.ts` é a única fonte de verdade de links WhatsApp. Cada chamada recebe um contexto (`'hero' | 'lucas' | 'tamara' | 'specialty:<slug>' | 'generic'`) e devolve URL com mensagem URL-encoded.
- `<Seo>` em cada page injeta title, description, OpenGraph, Twitter Card e Schema.org. `MedicalBusiness` no layout root; `Person` nos cards/equipe.

## 4. Rotas

```
/                          Home
/sobre                     A clínica + filosofia
/equipe                    Lucas + Tamara em cards expansíveis
/especialidades            Lista das 9 áreas
/contato                   Form + WhatsApp + horários
/obrigado                  Confirmação pós-form (meta noindex)
/politica-de-privacidade   LGPD
/404                       Erro
```

Rotas individuais (`/equipe/lucas`, `/especialidades/[slug]`) ficam para a v2 (upsell SEO).

## 5. Hero da Home (regra especial)

**O hero da Home segue exatamente `heroinpiration.png`.** As demais seções e páginas seguem o design system do briefing. Trade-off aceito: o hero usa paleta creme/serifa/verde; o resto usa paleta dourado/deep-green/Sora. A transição é absorvida pela primeira seção pós-hero (surface branco neutro).

### 5.1 Layout

- 2 colunas: texto à esquerda (~55%), foto à direita (~45%)
- Fundo full-bleed creme `#F5EFE6`
- Mobile: foto empilha acima do texto
- Nav superior sticky com mesmo creme em `/`, branca nas demais rotas

### 5.2 Conteúdo

- **Eyebrow** (com ícone folha lucide `Leaf`): `Psicologia clínica com acolhimento e ética`
- **H1** (Cormorant Garamond 400-500, ~64-80px desktop, ~40px mobile):
  > Um espaço seguro para *cuidar* da sua saúde emocional.

  A palavra `cuidar` em itálico + cor `#1F3D2F`.
- **Lead** (Inter 400, ~17px, cor `#5C5C5C`):
  > Atendimento psicológico online especializado para ajudar você a compreender, ressignificar e viver com mais equilíbrio, leveza e bem-estar.
- **CTAs (2):**
  - Primário: pill verde sólido `#1F3D2F`, texto branco — **"Agendar consulta"** → WhatsApp contexto `hero`
  - Outline verde — **"100% Online"** → âncora para seção "Como funciona o atendimento"
- **Mini-badges (3, linha abaixo dos CTAs):**

  | Ícone | Título | Subtítulo |
  |---|---|---|
  | `ShieldCheck` | Ambiente seguro | e acolhedor |
  | `HeartHandshake` | Escuta ativa | humana e individualizada |
  | `BookOpen` | Abordagem moderna | e baseada em ciência |

### 5.3 Foto

- Arquivo: `assets/images/psicologos.png` (já recortada, fundo transparente)
- Posicionada à direita encostando na base do hero
- Sem card/borda; sombra navy-tinted bem sutil para profundidade
- Marcada como LCP: `loading="eager"`, `fetchpriority="high"`, `width`/`height` definidos

### 5.4 Nav superior (presente em todas as páginas)

- Esquerda: ícone `Leaf` + wordmark "Verità Essere" em Cormorant Garamond
- Centro: Início · Sobre · Equipe · Especialidades · Contato
- Direita: CTA pill verde `#1F3D2F` — **"Fale conosco agora"** → WhatsApp contexto `generic`
- Background: creme em `/`, branco nas demais; sticky com leve `backdrop-blur` ao rolar

### 5.5 Tokens locais do hero (overrides do briefing)

```
hero-bg          #F5EFE6   cream/parchment quente
hero-green       #1F3D2F   verde primário do hero (CTA, ícones, itálico)
hero-green-hover #2A5240
hero-ink         #1A1A1A   headline
hero-muted       #5C5C5C   body
```

## 6. Demais seções da Home (design system do briefing)

Ordem, em surfaces alternadas:

1. **Sobre a clínica** — surface branco. Texto institucional curto + CTA outline "Conheça nossa filosofia" → `/sobre`.
2. **Equipe** — surface parchment. 2 `ProfessionalCard` lado a lado: foto placeholder 4:5, nome, CRP, bio 2-linhas, botão "Agendar com Lucas/Tamara" (WhatsApp contextual).
3. **Áreas de atuação** — surface branco. Grid 3×3 dos 9 `SpecialtyCard`: ícone dourado clareado 48px + título + 1 linha.
4. **Como funciona o atendimento** — surface deep-green `#0F1815`. 3 colunas: `100% Online` · `Google Meet` · `Seg–Sáb 7h–23h`.
5. **CTA final** — surface parchment. "Pronto para começar?" + botão dourado pill "Agendar uma conversa" → WhatsApp contexto `generic`.

**Rótulo "Áreas de atuação"** por padrão (CFP). Troca para "Especialidades" se cliente confirmar título de especialista CFP.

## 7. Demais páginas

- **/sobre** — Hero deep-green compacto com tagline italiana inline (`La verità dell'essere`) + filosofia da clínica + 3 pilares (valores).
- **/equipe** — Cards expandidos: bio completa, formação, áreas que atende, CTA agendar individual.
- **/especialidades** — Grid das 9 áreas com descrição mais longa (~3 linhas cada).
- **/contato** — Form (nome, email, telefone, motivo via select, mensagem, checkbox consent LGPD) + honeypot. Submit oferece 2 botões: "Enviar por email" (`mailto:` pré-preenchido) e "Enviar pelo WhatsApp" (link `wa.me` pré-preenchido). Sucesso navega para `/obrigado`. Bloco lateral com WhatsApp, email, horários.
- **/obrigado** — Confirmação + meta `noindex` + link de volta.
- **/politica-de-privacidade** — Texto LGPD padrão (placeholder revisável: finalidade, retenção, descarte, contato do controlador).
- **/404** — Mensagem curta + link home.

## 8. Componentes transversais

- **WhatsAppFloat** — botão circular 56px sage green `#3A5042` no canto inferior direito, todas as páginas. Animação `pulse` a cada 4s (suprimida em `prefers-reduced-motion`).
- **PageTransition** — wrapper framer-motion no `<Outlet>`: fade + leve translate-y por 200ms ao trocar de rota.
- **Reveal** — wrapper que aplica fade-in + translate-y nas seções via `useInView`, ativando uma vez.
- **SkipLink** — primeiro elemento focável; pula pro `<main id="main">`.

## 9. Tokens do design system (do briefing)

Implementados em `tailwind.config.ts` (extend) e como CSS vars em `globals.css` para uso fora do Tailwind:

```
primary           #C5A059   Verità Gold (acento de marca)
primary-hover     #B58A3E
primary-active    #9E7530
primary-on-dark   #D4B679
ink               #0F1815
body              #1A2820
body-on-dark      #FAFCFF
body-muted        #CFDAE5
ink-muted-80      #3A4A40
ink-muted-48      #7A8A82
canvas            #FFFFFF
canvas-parchment  #F7F4ED
surface-tile-deep        #0F1815
surface-tile-navy-green  #1A2820
surface-tile-sage        #3A5042
hairline          #D8DEE0
divider-soft      #EDE6D6
```

Sombras (navy-tinted), tipografia (Sora 300 display / Inter 400 body / Cormorant 400 hero+wordmark) e raios conforme briefing.

## 10. WhatsApp — mensagens por contexto

`buildWaLink(context)` em `lib/whatsapp.ts`. Número base do briefing: `5545888162056` (⚠️ pendente confirmar com cliente — formato atípico).

| Contexto | Mensagem |
|---|---|
| `hero` | Olá! Vim pelo site e gostaria de agendar uma consulta. |
| `generic` | Olá! Vim pelo site da Verità Essere e gostaria de mais informações. |
| `lucas` | Olá, Lucas! Vim pelo site e gostaria de agendar uma sessão com você. |
| `tamara` | Olá, Tamara! Vim pelo site e gostaria de agendar uma sessão com você. |
| `specialty:<slug>` | Olá! Vim pelo site e gostaria de conversar sobre `<área>`. |

## 11. Conformidade

### CFP — Resolução 06/2019

- CRP visível em todos os lugares que o nome do profissional aparece (cards, equipe, footer).
- Rótulo padrão "Áreas de atuação" (não "Especialidades") até confirmação de título CFP.
- Proibido no site: testemunhos, promessas de cura, antes/depois, comparações, sensacionalismo, promoções.
- CTAs neutros: "Agende uma conversa", "Agendar consulta". Nunca "Comece sua transformação" etc.
- Texto institucional reforça sigilo profissional.

### LGPD

- Página `/politica-de-privacidade` com finalidade, retenção, descarte, contato do controlador.
- Form com aviso visível + checkbox de consentimento explícito (bloqueia submit se desmarcado).
- Sem cookies de tracking na v1 (Analytics adiado). Quando Analytics for instalado, adicionar banner de cookies.
- Fontes self-hosted (sem requests ao Google).

## 12. Acessibilidade e performance

- Contraste mínimo AA em todos os pares texto/fundo.
- Skip-to-content como primeiro tabbable.
- Foco visível dourado (`gold-focus` ring do briefing) em todos os interativos.
- ARIA labels em ícones-botão (WhatsApp float, nav mobile).
- Navegação 100% por teclado verificada.
- `prefers-reduced-motion` respeitado em Reveal, PageTransition e pulse do WhatsAppFloat.
- Imagens: `loading="lazy"` (exceto foto hero), `width`/`height` setados, WebP no build.
- Lighthouse alvo: ≥90 em Performance, Acessibilidade, Best Practices e SEO.

## 13. SEO

- Title + meta description por página em `<Seo>`.
- OpenGraph + Twitter Card com `og-image.png` (1200×630).
- `sitemap.xml` estático com as 7 páginas indexáveis (sem /obrigado, sem /404).
- `robots.txt` permitindo tudo exceto `/obrigado`.
- Schema.org `MedicalBusiness` no layout root, `Person` nos cards/equipe.
- `/obrigado` com `<meta name="robots" content="noindex">`.

## 14. Conteúdo (estratégia de placeholders)

Toda copy fica em `content/*.ts`. Para itens pendentes do briefing (bios, filosofia, descrições de especialidades), o desenvolvedor escreve placeholders realistas e plausíveis — marcados com comentário `// PLACEHOLDER` no arquivo. Cliente substitui depois sem mexer em componente.

Fotos profissionais individuais (cards de Lucas e Tamara) usam placeholder neutro 4:5 cinza até cliente enviar.

## 15. Fora de escopo da v1

- Logo nova (Rafa fará depois) — wordmark Cormorant interim.
- CMS.
- Blog.
- Páginas individuais por profissional/especialidade.
- Analytics e banner de cookies.
- Backend de form (só mailto/WhatsApp).
- i18n.
- Sistema de agendamento integrado.

## 16. Pendências do cliente que afetam o conteúdo (não bloqueiam a v1)

Itens marcados no briefing seção 12; site v1 entra no ar com placeholders e é atualizado quando o cliente entregar:

1. Email profissional do domínio
2. Fotos individuais Lucas/Tamara
3. Formação acadêmica de cada um
4. Bios completas
5. Texto institucional/filosofia
6. Descrições detalhadas das 9 áreas
7. Confirmação do número WhatsApp (formato atípico)
8. Confirmação de título CFP (define rótulo "Áreas" vs "Especialidades")

## 17. Critérios de aceitação da v1

- [ ] 8 rotas navegáveis sem console errors
- [ ] Hero da Home visualmente idêntico à `heroinpiration.png` (com textos novos + foto `psicologos.png`)
- [ ] Demais seções seguem tokens e tipografia do briefing
- [ ] WhatsApp float presente em todas as páginas; links contextuais funcionam
- [ ] Form valida com zod, honeypot ativo, submit gera mailto/WhatsApp pré-preenchido
- [ ] CRPs visíveis em todo lugar que o nome do profissional aparece
- [ ] Lighthouse ≥90 nas 4 categorias em mobile e desktop
- [ ] Navegação por teclado completa; skip-link funciona
- [ ] `prefers-reduced-motion` desativa todas as animações não essenciais
- [ ] Build de produção (`vite build`) sem warnings; bundle inicial < 200kb gz
