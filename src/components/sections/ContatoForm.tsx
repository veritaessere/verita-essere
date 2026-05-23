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
  email: z.email("Email inválido"),
  telefone: z.string().min(8, "Informe um telefone válido"),
  motivo: z.enum(motivos, { message: "Selecione um motivo" }),
  mensagem: z.string().min(10, "Conte um pouco mais (mín. 10 caracteres)"),
  consent: z.literal(true, { message: "Necessário consentir com o uso dos dados" }),
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
    register, handleSubmit, formState: { errors }, setValue, watch,
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
          onCheckedChange={(v) => setValue("consent", (v === true) as true, { shouldValidate: true })}
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
