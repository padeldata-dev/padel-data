import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function TournamentsPage() {
  if (!supabase) {
    return <p className="p-6">Supabase no está configurado</p>;
  }

  const { data: tournaments, error } = await supabase
    .from("tournaments")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <section className="padel-hero relative text-white">
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 py-12">
          <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">
            Torneos
          </span>

          <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.055em]">
            Archivo de torneos <span className="text-pgreen">con fuente</span>
          </h1>

          <p className="mt-5 max-w-2xl text-zinc-200">
            Torneos cargados desde Supabase con estado de verificación y fuente.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1380px] px-6 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            Error: {error.message}
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase">Torneos registrados</h2>
          <span className="rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
            {tournaments?.length || 0} torneos
          </span>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          {tournaments?.map((tournament) => (
            <Link
              key={tournament.id}
              href={`/torneos/${tournament.slug}`}
              className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-card transition hover:-translate-y-0.5"
            >
              <div className="bg-gradient-to-br from-zinc-950 to-zinc-800 p-6 text-white">
                <span className="text-xs font-black uppercase text-pgreen">
                  Torneo real
                </span>

                <h2 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight">
                  {tournament.name}
                </h2>
              </div>

              <div className="grid grid-cols-3 divide-x divide-zinc-200">
                <div className="p-4">
                  <small className="text-xs font-black uppercase text-zinc-500">
                    Provincia
                  </small>
                  <strong className="block text-xl">
                    {tournament.province || "-"}
                  </strong>
                </div>

                <div className="p-4">
                  <small className="text-xs font-black uppercase text-zinc-500">
                    Categoría
                  </small>
                  <strong className="block text-xl">
                    {tournament.category || "-"}
                  </strong>
                </div>

                <div className="p-4">
                  <small className="text-xs font-black uppercase text-zinc-500">
                    Estado
                  </small>
                  <strong className="block text-sm">
                    {tournament.verification_status || "-"}
                  </strong>
                </div>
              </div>

              <div className="border-t border-zinc-200 bg-zinc-50 p-4 text-sm font-black uppercase text-pgreen3">
                Ver ficha →
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}