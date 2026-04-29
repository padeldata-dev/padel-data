import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!supabase) {
    return <p className="p-6">Supabase no está configurado</p>;
  }

  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !player) {
    return <p className="p-6">Jugador no encontrado</p>;
  }

  const { data: matches } = await supabase
    .from("matches")
    .select(`
      *,
      tournaments (
        name,
        slug,
        province,
        category
      ),
      player1:players!matches_player1_id_fkey (
        full_name,
        slug
      ),
      player2:players!matches_player2_id_fkey (
        full_name,
        slug
      ),
      player3:players!matches_player3_id_fkey (
        full_name,
        slug
      ),
      player4:players!matches_player4_id_fkey (
        full_name,
        slug
      )
    `)
    .or(
      `player1_id.eq.${player.id},player2_id.eq.${player.id},player3_id.eq.${player.id},player4_id.eq.${player.id}`
    )
    .order("created_at", { ascending: false });

  return (
    <>
      <section className="padel-hero relative text-white">
        <div className="relative z-10 mx-auto grid max-w-[1380px] gap-8 px-6 py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">
              Ficha de jugador
            </span>

            <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.055em]">
              {player.full_name}
            </h1>

            <p className="mt-5 max-w-2xl text-zinc-200">
              {player.city || "Sin ciudad"} · {player.gender || "Sin género"} ·{" "}
              {player.bio || "Perfil inicial en PadelData."}
            </p>
          </div>

          <div className="grid h-32 w-32 place-items-center rounded-full border-8 border-pgreen border-l-zinc-700 text-center">
            <div>
              <small className="block text-xs font-black uppercase text-zinc-300">
                Rating
              </small>
              <strong className="text-3xl font-black">
                {player.ranking_points || 1500}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1380px] gap-6 px-6 py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card">
          <h2 className="font-black uppercase">Resumen</h2>

          <div className="mt-5 grid gap-3">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Ciudad
              </small>
              <strong className="block text-xl">
                {player.city || "Pendiente"}
              </strong>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Nivel de confianza
              </small>
              <strong className="block text-xl">
                {player.confidence_level || "Pendiente"}
              </strong>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Partidos registrados
              </small>
              <strong className="block text-xl">{matches?.length || 0}</strong>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-card">
          <div className="p-5">
            <h2 className="font-black uppercase">Historial de partidos</h2>
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
                  {match.tournaments?.name || "Torneo sin nombre"} ·{" "}
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