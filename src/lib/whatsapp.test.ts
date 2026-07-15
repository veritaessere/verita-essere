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

  it("monta mensagem de especialidade interpolando o título", () => {
    const url = buildWaLink("specialty:ansiedade");
    expect(decodeURIComponent(url)).toContain("Ansiedade");
  });

  it("cai para mensagem genérica quando slug não existe", () => {
    const url = buildWaLink("specialty:nao-existe");
    expect(url).toContain(encodeURIComponent(waMessages.generic));
  });
});
