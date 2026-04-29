import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

async function getCount(tableName: string) {
  if (!supabase) return 0;

  const { count } = await supabase
    .from(tableName)
    .select("id", { count: "exact", head: true });

  return count || 0;
}

export default async function HomePage() {
  const playersCount = await getCount("players");
  const tournamentsCount = await getCount("tournaments");
  const matchesCount = await getCount("matches");

  const { data: topPlayers } = supabase
    ? await supabase
        .from("players")
        .select("*")
        .order("ranking_points", { ascending: false })
        .limit(4)
    : { data: [] };

  const { data: latestTournaments } = supabase
    ? await supabase
        .from("tournaments")
        .select("*")
        .order("name", { ascending: true })
        .limit(3)
    : { data: [] };

  const { data: latestMatches } = supabase
    ? await supabase
        .from("matches")
        .select(`
          *,
          tournaments (
            name,
            slug
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
        .order("created_at", { ascending: false })
        .limit(4)
    : { data: [] };

  return (
    <>
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.12),transparent_35%)]" />
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full border border-lime-400/20" />
        <div className="absolute right-[-80px] bottom-[-80px] h-64 w-64 rounded-full border border-lime-400/20" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:34px_34px] opacity-20" />

        <div className="relative z-10 mx-auto max-w-[1380px] px-6 py-16 md:py-24">
          <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-lime-300">
            Padel Data · Beta
          </span>

          <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl">
            La base de datos del pádel amateur
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            Consulta jugadores, torneos, rankings y resultados registrados en
            una plataforma pensada para organizar el pádel amateur desde Málaga
            y escalar progresivamente a nuevas zonas.
          </p>

          <form
            action="/buscar"
            method="GET"
            className="mt-8 flex w-full max-w-3xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="search"
              name="q"
              placeholder="Buscar jugador, torneo, ciudad o categoría..."
              className="w-full rounded-xl border border-zinc-700 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/30"
              required
            />

            <button
              type="submit"
              className="rounded-xl bg-lime-400 px-8 py-4 font-black uppercase text-zinc-950 transition hover:bg-lime-300"
            >
              Buscar
            </button>
          </form>

          <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <small className="block text-xs font-black uppercase text-zinc-400">
                Jugadores registrados
              </small>
              <strong className="mt-2 block text-4xl font-black text-lime-300">
                {playersCount}
              </strong>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <small className="block text-xs font-black uppercase text-zinc-400">
                Torneos registrados
              </small>
              <strong className="mt-2 block text-4xl font-black text-lime-300">
                {tournamentsCount}
              </strong>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <small className="block text-xs font-black uppercase text-zinc-400">
                Partidos registrados
              </small>
              <strong className="mt-2 block text-4xl font-black text-lime-300">
                {matchesCount}
              </strong>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/rankings"
              className="rounded-xl bg-white px-5 py-3 font-black uppercase text-zinc-950 transition hover:bg-lime-300"
            >
              Ver ranking
            </Link>

            <Link
              href="/torneos"
              className="rounded-xl border border-zinc-700 bg-white/5 px-5 py-3 font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-300"
            >
              Ver torneos
            </Link>

            <Link
              href="/sugerir-resultado"
              className="rounded-xl border border-zinc-700 bg-white/5 px-5 py-3 font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-300"
            >
              Sugerir resultado
            </Link>
          </div>
        </div>
      </section>

      <main className="bg-zinc-50">
        <section className="mx-auto grid max-w-[1380px] gap-6 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
            <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
              Últimos resultados
            </span>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.045em] text-zinc-950">
              Actividad reciente
            </h2>

            <div className="mt-6 grid gap-4">
              {latestMatches && latestMatches.length > 0 ? (
                latestMatches.map((match: any) => (
                  <article
                    key={match.id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <p className="text-xs font-black uppercase text-zinc-500">
                      {match.tournaments?.name || "Torneo sin nombre"} ·{" "}
                      {match.round || "Ronda pendiente"}
                    </p>

                    <div className="mt-3 text-sm">
                      <p
                        className={
                          match.winner_pair === 1
                            ? "font-black text-pgreen3"
                            : "font-bold text-zinc-900"
                        }
                      >
                        {match.player1?.full_name || "Pendiente"} /{" "}
                        {match.player2?.full_name || "Pendiente"}
                      </p>

                      <p
                        className={
                          match.winner_pair === 2
                            ? "font-black text-pgreen3"
                            : "font-bold text-zinc-900"
                        }
                      >
                        {match.player3?.full_name || "Pendiente"} /{" "}
                        {match.player4?.full_name || "Pendiente"}
                      </p>
                    </div>

                    <p className="mt-3 text-2xl font-black text-zinc-950">
                      {match.score || "Resultado pendiente"}
                    </p>
                  </article>
                ))
              ) : (
                <p className="text-zinc-600">
                  Todavía no hay partidos registrados.
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
              <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
                Ranking
              </span>

              <h2 className="mt-4 text-2xl font-black uppercase tracking-[-0.04em] text-zinc-950">
                Jugadores destacados
              </h2>

              <div className="mt-5 grid gap-3">
                {topPlayers?.map((player: any, index: number) => (
                  <Link
                    key={player.id}
                    href={`/jugadores/${player.slug}`}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-lime-400"
                  >
                    <div>
                      <p className="text-xs font-black uppercase text-zinc-500">
                        #{index + 1}
                      </p>
                      <h3 className="font-black text-zinc-950">
                        {player.full_name}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {player.city || "Sin ciudad"}
                      </p>
                    </div>

                    <strong className="text-xl font-black text-pgreen3">
                      {player.ranking_points || 1500}
                    </strong>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
              <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
                Torneos
              </span>

              <h2 className="mt-4 text-2xl font-black uppercase tracking-[-0.04em] text-zinc-950">
                Torneos en la base
              </h2>

              <div className="mt-5 grid gap-3">
                {latestTournaments?.map((tournament: any) => (
                  <Link
                    key={tournament.id || tournament.slug}
                    href={`/torneos/${tournament.slug}`}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-lime-400"
                  >
                    <h3 className="font-black uppercase text-zinc-950">
                      {tournament.name}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500">
                      {tournament.province || "Sin provincia"} ·{" "}
                      {tournament.category || "Sin categoría"}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-6 pb-12">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-950 p-8 text-white shadow-card">
            <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-lime-300">
              Proyecto vivo
            </span>

            <h2 className="mt-4 max-w-3xl text-3xl font-black uppercase tracking-[-0.05em]">
              Una base de datos que crece partido a partido
            </h2>

            <p className="mt-4 max-w-3xl text-zinc-300">
              Padel Data está en fase beta. El objetivo es reunir resultados
              verificables de torneos amateur, ordenar fichas de jugadores y
              construir rankings consultables con transparencia.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/fuentes"
                className="rounded-xl bg-lime-400 px-5 py-3 font-black uppercase text-zinc-950"
              >
                Ver fuentes
              </Link>

              <Link
                href="/metodologia"
                className="rounded-xl border border-zinc-700 px-5 py-3 font-black uppercase text-white hover:border-lime-400"
              >
                Metodología
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}