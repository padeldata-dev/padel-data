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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_35%)]" />
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full border border-lime-400/20" />
        <div className="absolute right-[-80px] bottom-[-80px] h-64 w-64 rounded-full border border-lime-400/20" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:34px_34px] opacity-20" />

        <div className="relative z-10 mx-auto grid max-w-[1380px] gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-lime-300">
              Padel Data · Málaga Beta
            </span>

            <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl">
              La base de datos del{" "}
              <span className="text-lime-300 drop-shadow-[0_0_22px_rgba(163,230,53,0.28)]">
                pádel amateur
              </span>{" "}
              en Málaga
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Consulta jugadores, torneos, partidos y rankings reales del circuito
              amateur. Padel Data nace en Málaga para ordenar resultados y
              construir una herramienta útil para jugadores, clubes y aficionados.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-300">
              <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-2 text-lime-300">
                Málaga
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Andalucía
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                España
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Datos estructurados
              </span>
            </div>

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

          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 rounded-[2rem] bg-lime-400/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] border border-lime-400/20 bg-zinc-950/80 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">
                      Identidad de datos
                    </p>
                    <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">
                      Pista, marcador y ranking
                    </h2>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-400/30 bg-lime-400/10 text-2xl font-black text-lime-300">
                    PD
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-lime-400/20 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.12),transparent_52%)] p-5">
                  <div className="relative h-64 overflow-hidden rounded-xl border-2 border-lime-300/60 bg-zinc-900/80">
                    <div className="absolute left-1/2 top-0 h-full w-px bg-lime-300/50" />
                    <div className="absolute left-0 top-1/2 h-px w-full bg-lime-300/50" />
                    <div className="absolute left-[18%] top-[18%] h-[64%] w-[64%] rounded-xl border border-lime-300/45" />
                    <div className="absolute left-[12%] top-[28%] h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_24px_rgba(190,242,100,0.9)]" />
                    <div className="absolute left-[13%] top-[31%] h-px w-[68%] rotate-[18deg] bg-lime-300/70" />
                    <div className="absolute bottom-[25%] right-[16%] h-12 w-12 rounded-full border-2 border-lime-300/70" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-lg font-black text-lime-300">1</p>
                    <p className="text-[10px] font-black uppercase text-zinc-400">
                      Resultado
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-lg font-black text-lime-300">2</p>
                    <p className="text-[10px] font-black uppercase text-zinc-400">
                      Jugador
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-lg font-black text-lime-300">3</p>
                    <p className="text-[10px] font-black uppercase text-zinc-400">
                      Ranking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-zinc-50">
        <section className="mx-auto max-w-[1380px] px-6 pt-10">
          <div className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-card lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
                Qué es Padel Data
              </span>

              <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.05em] text-zinc-950 md:text-4xl">
                Una herramienta de consulta, no una web genérica de pádel
              </h2>
            </div>

            <div className="grid gap-4 text-zinc-600">
              <p className="leading-7">
                Padel Data ordena información del pádel amateur: resultados,
                jugadores, torneos y rankings consultables. El objetivo es que
                cualquier jugador pueda encontrar datos reales sin depender de
                publicaciones sueltas o capturas perdidas en redes sociales.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-black uppercase text-zinc-950">
                    Punto de partida
                  </p>
                  <p className="mt-1 text-sm">Málaga y su circuito amateur.</p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-black uppercase text-zinc-950">
                    Próxima escala
                  </p>
                  <p className="mt-1 text-sm">Andalucía y torneos locales.</p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-black uppercase text-zinc-950">
                    Visión
                  </p>
                  <p className="mt-1 text-sm">El IMDb del pádel amateur.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1380px] gap-6 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card">
            <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
              Últimos resultados
            </span>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.045em] text-zinc-950">
              Marcadores recientes
            </h2>

            <div className="mt-6 grid gap-4">
              {latestMatches && latestMatches.length > 0 ? (
                latestMatches.map((match: any) => {
                  const pair1IsWinner = match.winner_pair === 1;
                  const pair2IsWinner = match.winner_pair === 2;

                  return (
                    <article
                      key={match.id}
                      className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3">
                        <p className="text-xs font-black uppercase text-zinc-500">
                          {match.tournaments?.name || "Torneo sin nombre"} ·{" "}
                          {match.round || "Ronda pendiente"}
                        </p>
                        <span className="rounded-full bg-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                          Partido
                        </span>
                      </div>

                      <div className="grid gap-3 p-4">
                        <div
                          className={
                            pair1IsWinner
                              ? "rounded-xl border border-lime-400 bg-lime-50 p-4"
                              : "rounded-xl border border-zinc-200 bg-white p-4"
                          }
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p
                              className={
                                pair1IsWinner
                                  ? "font-black text-pgreen3"
                                  : "font-bold text-zinc-900"
                              }
                            >
                              {match.player1?.full_name || "Pendiente"} /{" "}
                              {match.player2?.full_name || "Pendiente"}
                            </p>
                            {pair1IsWinner ? (
                              <span className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-black uppercase text-zinc-950">
                                Ganadores
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div
                          className={
                            pair2IsWinner
                              ? "rounded-xl border border-lime-400 bg-lime-50 p-4"
                              : "rounded-xl border border-zinc-200 bg-white p-4"
                          }
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p
                              className={
                                pair2IsWinner
                                  ? "font-black text-pgreen3"
                                  : "font-bold text-zinc-900"
                              }
                            >
                              {match.player3?.full_name || "Pendiente"} /{" "}
                              {match.player4?.full_name || "Pendiente"}
                            </p>
                            {pair2IsWinner ? (
                              <span className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-black uppercase text-zinc-950">
                                Ganadores
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-950 px-4 py-3 text-white">
                          <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                            Resultado
                          </span>
                          <strong className="text-2xl font-black text-lime-300">
                            {match.score || "Pendiente"}
                          </strong>
                        </div>
                      </div>
                    </article>
                  );
                })
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
                {topPlayers && topPlayers.length > 0 ? (
                  topPlayers.map((player: any, index: number) => (
                    <Link
                      key={player.id}
                      href={`/jugadores/${player.slug}`}
                      className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-lime-400 hover:bg-lime-50"
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

                      <div className="text-right">
                        <strong className="text-xl font-black text-pgreen3">
                          {player.ranking_points || 1500}
                        </strong>
                        <p className="text-[10px] font-black uppercase text-zinc-400">
                          puntos
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-zinc-600">
                    Todavía no hay jugadores destacados.
                  </p>
                )}
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
                {latestTournaments && latestTournaments.length > 0 ? (
                  latestTournaments.map((tournament: any) => (
                    <Link
                      key={tournament.id || tournament.slug}
                      href={`/torneos/${tournament.slug}`}
                      className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-lime-400 hover:bg-lime-50"
                    >
                      <h3 className="font-black uppercase text-zinc-950">
                        {tournament.name}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-500">
                        {tournament.province || "Sin provincia"} ·{" "}
                        {tournament.category || "Sin categoría"}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-zinc-600">
                    Todavía no hay torneos registrados.
                  </p>
                )}
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
                className="rounded-xl bg-lime-400 px-5 py-3 font-black uppercase text-zinc-950 transition hover:bg-lime-300"
              >
                Ver fuentes
              </Link>

              <Link
                href="/metodologia"
                className="rounded-xl border border-zinc-700 px-5 py-3 font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-300"
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
