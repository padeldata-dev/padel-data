
import { supabase } from "@/lib/supabaseClient";

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!supabase) {
    return <p className="p-6">Supabase no está configurado</p>;
  }

  const { data: tournament, error } = await supabase
    .from("tournaments")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !tournament) {
    return <p className="p-6">Torneo no encontrado</p>;
  }

  const { data: matches } = await supabase
    .from("matches")
    .select(`
      *,
      player1:players!matches_player1_id_fkey ( full_name, slug ),
      player2:players!matches_player2_id_fkey ( full_name, slug ),
      player3:players!matches_player3_id_fkey ( full_name, slug ),
      player4:players!matches_player4_id_fkey ( full_name, slug )
    `)
    .eq("tournament_id", tournament.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <section className="padel-hero relative text-white">
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 py-12">
          <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">
            Ficha de torneo
          </span>

          <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none tracking-[-0.055em]">
            {tournament.name}
          </h1>

          <p className="mt-5 max-w-2xl text-zinc-200">
            {tournament.province || "Provincia pendiente"} ·{" "}
            {tournament.category || "Categoría pendiente"} ·{" "}
            {tournament.verification_status || "Pendiente"}
          </p>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1380px] gap-6 px-6 py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card">
          <h2 className="font-black uppercase">Resumen del torneo</h2>

          <div className="mt-5 grid gap-3">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Provincia
              </small>
              <strong className="block text-xl">
                {tournament.province || "Pendiente"}
              </strong>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Categoría
              </small>
              <strong className="block text-xl">
                {tournament.category || "Pendiente"}
              </strong>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Estado de verificación
              </small>
              <strong className="block text-xl">
                {tournament.verification_status || "Pendiente"}
              </strong>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Partidos registrados
              </small>
              <strong className="block text-xl">{matches?.length || 0}</strong>
            </div>
          </div>

          {tournament.source_url && (
            <a
              href={tournament.source_url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-md bg-pdark px-4 py-3 text-sm font-black uppercase text-pgreen"
            >
              Ver fuente →
            </a>
          )}
        </section>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-card">
          <div className="p-5">
            <h2 className="font-black uppercase">Resultados registrados</h2>
          </div>

          {!matches?.length && (
            <p className="border-t border-zinc-100 p-5 text-zinc-500">
              Sin partidos registrados todavía.
            </p>
          )}

          {matches?.map((match: any) => (
            <div
              key={match.id}
              className="grid gap-4 border-t border-zinc-100 p-4 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <div className="text-xs font-black uppercase text-zinc-500">
                  {match.round || "Ronda pendiente"}
                </div>

                <div className="mt-2 text-sm">
                  <div
                    className={
                      match.winner_pair === 1
                        ? "font-bold text-pgreen3"
                        : "font-bold"
                    }
                  >
                    {match.player1?.full_name || "Pendiente"} /{" "}
                    {match.player2?.full_name || "Pendiente"}
                  </div>

                  <div
                    className={
                      match.winner_pair === 2
                        ? "font-bold text-pgreen3"
                        : "font-bold"
                    }
                  >
                    {match.player3?.full_name || "Pendiente"} /{" "}
                    {match.player4?.full_name || "Pendiente"}
                  </div>
                </div>

                <div className="mt-2 text-lg font-black">{match.score}</div>
              </div>

              <span className="rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
                {match.confidence_level || "Pendiente"}
              </span>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}