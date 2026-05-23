# Briefing — Site Verità Essere

Documento único com tudo que sabemos sobre o cliente e como ele quer o site. Use isto como ponto de partida para construir o projeto do zero.

> **Status:** algumas respostas vieram do cliente após o primeiro onboarding. Outras seguem pendentes — estão marcadas com `⏳ Pendente cliente`.

---

## 1. Cliente

**Nome da empresa:** Verità Essere (italiano para "a verdade do ser")
**Segmento:** Clínica de psicologia
**Cidade / DDD:** Medianeira - PR
**Modalidade:** Atendimento 100% online via Google Meet
**Instagram:** [@veritaessere](https://instagram.com/veritaessere)
**Tagline italiana:** *"La verità dell'essere"*
**Tagline português:** "A Verdade do Ser"

### Equipe (2 psicólogos)

| Nome | CRP | Papel |
|---|---|---|
| Lucas Fachin | CRP 08/46660 | Psicólogo clínico |
| Tamara Mikaelly | CRP 08/46551 | Psicóloga clínica |

> **⚠️ CFP obrigatório:** Os CRPs precisam aparecer em **todo lugar** que o nome do profissional aparece (cards, perfis, footer). Resolução CFP 06/2019.

### Identidade visual atual (Instagram)

- Logo: árvore + Ψ (símbolo da psicologia) em dourado, fundo preto/verde escuro
- **Atenção:** o cliente disse no formulário que "não tem ID visual", mas o Instagram tem. Foi criado com ChatGPT, então não tem arquivos vetoriais. Tratar como referência de direção, não como ID oficial. **Logo nova será feita pelo desenvolvedor (Rafa)** — confirmado pelo cliente.
- Paleta informal observada: verde profundo + preto + dourado

---

## 2. Objetivo do site

**Objetivo nº 1:** Captação de novos pacientes (lead generation via apresentação institucional + conversão pra WhatsApp).
**Objetivo nº 2:** Presença digital profissional alinhada com a marca já existente no Instagram.

> O cliente disse: *"O site precisa gerar impacto visual e fazer com que o público se identifique com a demanda que deseja resolver."*

### Distribuição da demanda

O cliente comentou que **as fotos no site (quando entregues) ajudarão a distribuir a demanda entre Lucas e Tamara conforme a especialidade**. Ou seja: páginas individuais por profissional são uma ferramenta de filtro pra que o paciente encontre quem trata da área que ele precisa.

---

## 3. Posicionamento

**Decisor-tipo:** adulto profissional (25–55), buscando psicoterapia para si mesmo ou para familiares.

**Estética:** sofisticada, elegante, moderna, clínica-confiável. Decisão consciente de não criar segmentação visual paralela para o público infantil/idoso — eles são tratados como especialidades dentro da clínica adulta.

**Justificativa:** quem decide pagar/agendar é majoritariamente o adulto.

---

## 4. Estrutura de páginas (v1)

```
/                          Home
/sobre                     A clínica + filosofia
/equipe                    Lucas + Tamara em cards expansíveis
/especialidades            Lista das 9 áreas atendidas
/contato                   WhatsApp + form + horários + plataforma
/obrigado                  Confirmação pós-envio do form (noindex)
/politica-de-privacidade   LGPD
/404                       Página de erro
```

### Upsell SEO (futuro, escopo separado)

- `/equipe/lucas` e `/equipe/tamara` (páginas individuais)
- `/especialidades/[slug]` por área

---

## 5. Conteúdo do site

### Especialidades (9 áreas) — confirmadas pelo cliente

| Área | Slug |
|---|---|
| Ansiedade | `ansiedade` |
| Depressão | `depressao` |
| Espectro Autista | `autismo` |
| Psicologia Infantil | `psicologia-infantil` |
| Terceira Idade | `terceira-idade` |
| Transtornos de Humor | `transtornos-humor` |
| Relacionamentos | `relacionamentos` |
| Habilidades Sociais | `habilidades-sociais` |
| Luto | `luto` |

> ⚠️ **Cuidado CFP:** o termo "Especialidades" só pode ser usado se Lucas/Tamara tiverem **título de especialista registrado no CFP** nas áreas. Caso contrário, usar "Áreas de atuação" como rótulo. **Pendente confirmar** com o cliente sobre títulos.

### Abordagem teórica

**"Psicoterapias baseadas em evidências"** (plural, conforme cliente respondeu). Mantido genérico — o cliente não detalhou abordagens específicas (TCC, ACT, etc.).

### Atendimento

- **Modalidade:** 100% online
- **Plataforma:** Google Meet
- **Convênios:** Apenas particular (sem convênios)
- **Valor:** Sob consulta (não exibir no site)

### Horários

- **Dias:** Segunda a sábado
- **Horário:** 07h às 23h

### Contato

- **WhatsApp:** `5545888162056` (link `wa.me/5545888162056`)
- **Display:** `(45) 88816-2056`
- **⚠️ Atenção:** formato esquisito — 11 dígitos começando com 8 depois do DDD 45. Mobile brasileiro padrão começa com 9. **Confirmar com cliente** se está correto antes de publicar.
- **Email:** `contato@veritaessere.com.br` (placeholder — ⏳ pendente cliente)

---

## 6. Agendamento

**Decisão do cliente:** opção **B** — paciente clica em "agendar" e cai no WhatsApp com mensagem pré-preenchida. Sem sistema de calendário integrado.

Implementação conceitual:
- Botão "Agendar" → link para WhatsApp com mensagem pré-preenchida (URL-encoded)
- Mensagem muda por contexto (ex: "Olá, gostaria de agendar com Lucas." quando vem do card do Lucas)
- Botão WhatsApp flutuante presente em todas as páginas

---

## 7. Funcionalidades

| Feature | Detalhe |
|---|---|
| WhatsApp flutuante | Canto inferior direito, sage green, todas as páginas |
| CTAs contextuais | Mensagem WhatsApp pré-preenchida por contexto (profissional, página) |
| Form de contato | Nome, email, telefone, motivo (select), mensagem, checkbox de consentimento LGPD |
| Anti-spam | Honeypot (campo oculto) + opcionalmente reCAPTCHA invisível |
| Página /obrigado | Confirmação após submit, com `noindex` (não aparece no Google) |
| SEO | Meta tags + Open Graph + Twitter Cards + sitemap.xml + robots.txt + marcação Schema.org (MedicalBusiness + Person) |
| Transições de página | Suaves entre páginas (sem flash branco) |
| Scroll reveal | Fade-in + leve translate-y nas seções, respeitando `prefers-reduced-motion` |
| Acessibilidade | Skip-to-content link, ARIA labels em interativos, contraste mínimo AA, navegação por teclado |
| LGPD | Página dedicada de política de privacidade + consentimento no form + banner de cookies (se Analytics for instalado) |

---

## 8. Domínio e hospedagem

- **Domínio:** comprado **no Wix** (conforme cliente)
- **Hospedagem:** **externa** (Wix não suporta hospedar sites construídos fora da plataforma deles). O domínio do Wix vai apontar via DNS para o servidor/serviço de hospedagem escolhido.

> ⚠️ **Esclarecer com o cliente:** ele talvez tenha contratado um plano Wix completo (com construtor + hospedagem) achando que o site seria feito lá. Confirmar o que ele comprou:
> - Se só o domínio → tudo OK, configura DNS pra apontar pra hospedagem externa
> - Se plano completo Wix → ele pode cancelar a parte de hospedagem e manter só o domínio. Ou migrar o domínio pro Registro.br (~R$40/ano vs R$60-90 no Wix)

---

## 9. Identidade visual

### Logo

**Decisão do cliente:** "Quer que eu faça uma nova do zero" — o desenvolvedor (Rafa) vai criar a logo nova.

- **Estado atual:** Verità Essere tem uma logo informal no Instagram (árvore + Ψ dourado), gerada via ChatGPT. **Não usar** como referência final.
- **No site v1:** colocar um wordmark provisório ("Verità Essere" em fonte display) até a logo nova ficar pronta.

### ID visual completa (paleta, tipografia, aplicações)

A ID visual provisória do site (paleta verde escuro + dourado, Sora + Inter) foi montada com base no Instagram e nas referências de design discutidas (Apple + Conexa Saúde). É **provisória** — pode ser substituída quando o cliente ou um designer entregarem a ID oficial.

Recomendação: construir os tokens visuais (cores, fontes, espaçamentos) como variáveis centralizadas, pra que a troca futura por uma ID oficial seja indolor.

### Fotos profissionais

⏳ **Pendente cliente.** Ele disse: *"ainda vou confirmar se utilizo as fotos, pois, a ideia seria captar pacientes e distribuir a demanda a depender as especialidades de cada profissional."*

- **Plano enquanto isso:** usar placeholders neutros (SVG cinza ou banco de imagens) no lugar das fotos
- **Quando fotos chegarem:** substituir os arquivos
- **Recomendação:** se ele optar por usar as do Instagram, baixar em alta resolução. Idealmente fazer ensaio fotográfico profissional dedicado.

---

## 10. Design System

Documento completo: [`desing/DESIGN.md`](desing/DESIGN.md). Origem: mescla de [Apple.com](desing/apple_design.md) + [Conexa Saúde](desing/conexaosaude_design.md), adaptada pra Verità Essere.

### Princípios

1. **Acento único dourado** (`#C5A059`) — todo elemento interativo (CTAs, focus rings, link emphasis). Nenhuma segunda cor de marca.
2. **Surfaces alternadas** — light → parchment → deep green → light. A mudança de cor É o divisor de seções (sem borders decorativas).
3. **Sora 300 no display + Inter 400 no body** — light weights + letter-spacing negativo em headlines grandes.
4. **Sem itálico em headlines.** O itálico fica só para a tagline italiana inline ("La verità dell'essere").
5. **Eyebrow sempre** — toda seção abre com uma linha em uppercase, tracking aberto, fonte pequena, em muted.

### Paleta (tokens principais)

```
primary           #C5A059   Verità Gold — único acento de marca
primary-hover     #B58A3E
primary-active    #9E7530
primary-on-dark   #D4B679   versão clara do gold pra superfícies escuras

ink               #0F1815   deep green — headlines em light surfaces
body              #1A2820   body text em light surfaces
body-on-dark      #FAFCFF   texto em superfícies escuras
body-muted        #CFDAE5   texto secundário em dark
ink-muted-80      #3A4A40   texto secundário em light
ink-muted-48      #7A8A82   placeholder / fine print / eyebrow

canvas            #FFFFFF   branco — surface principal
canvas-parchment  #F7F4ED   off-white quente — surface secundária
surface-tile-deep #0F1815   deep green — hero + footer
surface-tile-navy-green #1A2820  variante de dark section
surface-tile-sage #3A5042   sage green — WhatsApp float + feature cards

hairline          #D8DEE0   border padrão
divider-soft      #EDE6D6   border bege pra parchment surfaces
```

### Tipografia

- **Sora** — display (h1, h2, lead). Pesos 300 (predominante), 400, 500. Letter-spacing negativo em ≥20px (tight: -0.5 a -1.5px).
- **Inter** — body, UI, buttons, nav, captions. Pesos 400, 500, 600.
- Hero H1: tamanho equivalente a `text-5xl md:text-6xl lg:text-7xl`, peso 300, tracking apertado.

### Sombras (navy-tinted)

```
sm:         rgba(15, 24, 21, 0.06) 0px 1px 3px 0px            — buttons at rest, parchment cards
md (card):  multi-layer subtle elevation                       — content cards, nav bar
lift:       rgba(15, 24, 21, 0.08) 0px 4px 12px 0px           — hover state
press:      rgba(15, 24, 21, 0.05) 0px 1px 2px 0px            — active state (com scale 0.98)
gold-focus: rgba(197, 160, 89, 0.15) 0px 0px 0px 4px           — focus ring (halo dourado)
```

### Componentes-chave

- **Hero** — full-bleed deep green, centered, padding vertical generoso. Eyebrow → H1 Sora 300 grande → lead → 2 CTAs (primary gold + outline-on-dark).
- **Button primary** — fundo dourado, texto deep ink, pill (raio 9999px), sombra suave; hover escurece o dourado e lifta a sombra; active escurece mais + escala 0.98.
- **Button outline-on-dark** — transparente com borda branca, pra uso em superfícies escuras (hero/footer).
- **Card profissional** — fundo branco, raio ~16px, borda hairline, sombra md; foto 4:5 com raio interno; hover lifta a sombra e sobe levemente.
- **Card especialidade** — fundo parchment, raio ~16px, sombra sm, ícone circular 48px em dourado clareado.
- **WhatsApp float** — sage green (ação "soft", distinta da ação "decisiva" em dourado), 56px círculo, pulse animation a cada 4s (respeita reduced-motion).
- **Footer** — deep green, texto body-muted, com CRPs visíveis na linha de baixo.

---

## 11. Conformidade

### CFP — Resolução 06/2019 (publicidade de psicólogo)

**Proibido no site:**
- ❌ Testemunhos / depoimentos de pacientes (mesmo anônimos)
- ❌ Promessas de cura ou resultado
- ❌ Antes / depois
- ❌ Comparação com outros profissionais ou abordagens
- ❌ Termos sensacionalistas ("o melhor", "número 1")
- ❌ Promoções / descontos divulgados como marketing ("primeira sessão grátis!")

**Obrigatório:**
- ✅ Nome completo + CRP visível em cada lugar que o profissional aparece
- ✅ Informação técnica clara (formação, abordagem, áreas de atuação)
- ✅ Sigilo profissional reforçado no texto institucional
- ✅ Se quiser dizer "Especialista em X" → só com título de especialista CFP. Caso contrário, usar "Áreas de atuação", "Atende casos de…"

**CTAs ajustados:** "Comece sua transformação" → ❌. "Agende uma conversa" → ✅.

### LGPD

- Página `/politica-de-privacidade` dedicada
- Banner de cookies caso Analytics seja instalado
- Form de contato com aviso + checkbox de consentimento explícito
- Política de retenção e descarte de dados

---

## 12. Pendências do cliente (resumo)

| # | Item | Status |
|---|---|---|
| 1 | Email profissional `@dominio` | ⏳ Pendente |
| 2 | Fotos profissionais (Instagram ou outras) | ⏳ Pendente |
| 3 | Formação acadêmica (graduação, pós, certificações de cada um) | ⏳ Pendente |
| 4 | Abordagem teórica específica (TCC? ACT?) | ⏳ Pendente (cliente preferiu manter genérico "evidências") |
| 5 | Logo nova | ⏳ Pendente (Rafa vai fazer) |
| 6 | Bios completas (texto institucional sobre cada profissional) | ⏳ Pendente |
| 7 | Texto institucional sobre a clínica / filosofia | ⏳ Pendente |
| 8 | Descrições detalhadas de cada uma das 9 especialidades | ⏳ Pendente |
| 9 | Referências visuais adicionais (cliente está procurando) | ⏳ Pendente |
| 10 | Wix: tipo de plano contratado (só domínio ou completo?) | ⏳ Pendente |
| 11 | WhatsApp `45888162056`: confirmar se está correto | ⏳ Pendente (formato estranho — começa com 8 depois do DDD) |
| 12 | Lucas e Tamara têm título de especialista CFP em alguma área? | ⏳ Pendente (define se rótulo é "Especialidades" ou "Áreas de atuação") |
| 13 | CFP — conhece as restrições da Resolução 06/2019? | ⏳ Não perguntado ainda — Rafa precisa abordar antes de fechar o conteúdo |
| 14 | Decisão sobre Analytics (Google Analytics ou outro) | ⏳ Pendente |

---

## 13. Pontos de atenção (a esclarecer com o cliente)

1. **Wix ≠ hospedagem do site.** Confirmar o que ele comprou. Se foi plano completo, sugerir cancelar a hospedagem e manter só o domínio.

2. **Analytics no Wix não funciona pra site hospedado fora do Wix.** Ele disse "no site Wix tem a opção para verificar os acessos" — só funciona se o site estiver no Wix. Como vamos hospedar externamente, ele precisa decidir entre: (a) Google Analytics 4 (gratuito, padrão), (b) Plausible (~R$50/mês, mais privado), (c) sem analytics.

3. **CRP precisa estar visível em todo lugar** que o nome do profissional aparece. Reforçar no design e no conteúdo.

4. **Sem testemunhos no site** (CFP). Caso ele queira no futuro, recusar.

5. **Resolução CFP 06/2019** — fazer uma apresentação resumida dela pra ele saber o que pode/não pode antes de escrever o conteúdo definitivo.

---

## 14. Referências visuais

### Que o cliente mencionou
- `conexasaude.com.br` — citado pelo cliente como referência. **Atenção:** é plataforma B2B de telemedicina, não clínica. O design system foi inspirado em parte por ele, mas o cliente está procurando uma clínica modelo melhor.

### Adotadas no design system
- **Apple.com** — estrutura de seções alternadas, restraint, single accent, typography tight
- **Conexa Saúde** — shadows navy-tinted, warm clinical feel, paleta light com hero escuro

### Ainda pendente
- O cliente está procurando uma clínica modelo. Quando enviar, considerar se vale ajustar a direção.

---

## 15. Histórico de conversa relevante

- O cliente preencheu um formulário de onboarding inicial com respostas curtas/vagas em muitos pontos
- Acompanhamento via mensagem trouxe respostas mais concretas (aplicadas neste documento)
- O cliente é colaborativo mas claramente despreparado em alguns aspectos técnicos (achou que o site seria no Wix, achou que Wix Analytics funcionaria fora do Wix). **Recomendação:** explicar passo-a-passo na hora de configurar DNS, hospedagem e analytics.
