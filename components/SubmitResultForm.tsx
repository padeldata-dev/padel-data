"use client";

import { useState } from "react";

export function SubmitResultForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg border border-lime-200 bg-lime-50 p-6">
        <h2 className="text-xl font-black">Resultado enviado a revisión</h2>
        <p className="mt-2 text-zinc-600">En una versión conectada a Supabase, este dato se guardará en la tabla submissions.</p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-card"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label className="grid gap-2">
        <span className="text-sm font-black uppercase">Nombre del torneo</span>
        <input required className="rounded-md border border-zinc-300 p-3" placeholder="Ej: Open Ciudad de Málaga" />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-black uppercase">Resultado o dato sugerido</span>
        <textarea required className="min-h-32 rounded-md border border-zinc-300 p-3" placeholder="Parejas, marcador, categoría, ronda..." />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-black uppercase">Fuente / enlace</span>
        <input className="rounded-md border border-zinc-300 p-3" placeholder="URL, PDF, Instagram del club..." />
      </label>

      <button className="rounded-md bg-pgreen px-5 py-4 text-sm font-black uppercase text-zinc-950">
        Enviar a revisión
      </button>
    </form>
  );
}
