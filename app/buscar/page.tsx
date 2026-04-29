import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

type Player = {
  id: string;
  full_name: string;
  slug: string;
  city?: string | null;
  gender?: string | null;
  ranking_points?: number | null;
  confidence_level?: string | null;
};

type Tournament = {
  id?: string;
  name: string;
  slug: string;
  province?: string | null;
  category?: string | null;
};

type BuscarPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

function normalizarTexto(texto: string | null | undefined) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default async function BuscarPage({ searchParams }: BuscarPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";
  const queryNormalizada = normalizarTexto(query);

  if (!supabase) {
    return (
      <main className="min-h-screen bg-zinc-50 p-6">
        <div className="mx-auto max-w-[1380px] rounded-lg border border-zinc-200 bg-white p-6 shadow-card">
          <h1 className="text-2xl font-black uppercase">
            Supabase no está configurado
          </h1>
          <p className="mt-3 text-zinc-600">
            Revisa las variables de entorno de Supabase.
          </p>
        </div>
      </main>
    );
  }

  let players: Player[] = [];
  let tournaments: Tournament[] = [];

  let playersFiltrados: Player[] = [];
  let tournamentsFiltrados: Tournament[] = [];

  let errorPlayers = "";
  let errorTournaments = "";

  const { data: playersData, error: playersError } = await supabase
    .from("players")
    .select("*")
    .order("full_name", { ascending: true })
    .limit(500);

  if (playersError) {
    errorPlayers = playersError.message;
  }

  if (playersData) {
    players = playersData as Player[];
  }

  const { data: tournamentsData, error: tournamentsError } = await supabase
    .from("tournaments")
    .select("*")
    .order("name", { ascending: true })
    .limit(500);

  if (tournamentsError) {
    errorTournaments = tournamentsError.message;
  }

  if (tournamentsData) {
    tournaments = tournamentsData as Tournament[];
  }

  if (queryNormalizada.length > 0) {
    playersFiltrados = players.filter((player) => {
      const nombre = normalizarTexto(player.full_name);
      const ciudad = normalizarTexto(player.city);
      const slug = normalizarTexto(player.slug);

      return (
        nombre.includes(queryNormalizada) ||
        ciudad.includes(queryNormalizada) ||
        slug.includes(queryNormalizada)
      );
    });

    tournamentsFiltrados = tournaments.filter((tournament) => {
      const nombre = normalizarTexto(tournament.name);
      const provincia = normalizarTexto(tournament.province);
      const categoria = normalizarTexto(tournament.category);
      const slug = normalizarTexto(tournament.slug);

      return (
        nombre.includes(queryNormalizada) ||
        provincia.includes(queryNormalizada) ||
        categoria.includes(queryNormalizada) ||
        slug.includes(queryNormalizada)
      );
    });
  }

  const totalCoincidencias =
    playersFiltrados.length + tournamentsFiltrados.length;

  return (
    <>
      <section className="padel-hero relative text-white">
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 py-12">
          <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">
            Búsqueda
          </span>

          <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.055em]">
            Resultados
          </h1>

          {query ? (
            <p className="mt-5 max-w-2xl text-zinc-200">
              Resultados para: <strong>{query}</strong>
            </p>
          ) : (
            <p className="mt-5 max-w-2xl text-zinc-200">
              Escribe un nombre, torneo, provincia o categoría para buscar en
              Padel Data.
            </p>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-[1380px] px-6 py-8">
        <Link
          href="/"
          className="mb-6 inline-block rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-black uppercase text-zinc-700 shadow-card hover:border-pgreen hover:text-pgreen3"
        >
          ← Volver a la home
        </Link>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card">
          <h2 className="font-black uppercase">Resumen de búsqueda</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Texto buscado
              </small>
              <strong className="block text-xl">
                {query || "Sin búsqueda"}
              </strong>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Jugadores
              </small>
              <strong className="block text-xl">{players.length}</strong>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Torneos
              </small>
              <strong className="block text-xl">{tournaments.length}</strong>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <small className="font-black uppercase text-zinc-500">
                Coincidencias
              </small>
              <strong className="block text-xl">{totalCoincidencias}</strong>
            </div>
          </div>
        </section>

        {errorPlayers && (
          <section className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
            <p className="font-black uppercase">
              Error al consultar jugadores
            </p>
            <p className="mt-2 text-sm">{errorPlayers}</p>
          </section>
        )}

        {errorTournaments && (
          <section className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
            <p className="font-black uppercase">
              Error al consultar torneos
            </p>
            <p className="mt-2 text-sm">{errorTournaments}</p>
          </section>
        )}

        {query && totalCoincidencias === 0 && (
          <section className="mt-8 rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-zinc-600 shadow-card">
            No hemos encontrado resultados para esta búsqueda.
          </section>
        )}

        {query && playersFiltrados.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-black uppercase">
              Jugadores encontrados
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {playersFiltrados.map((player) => (
                <Link
                  key={player.id}
                  href={`/jugadores/${player.slug}`}
                  className="block rounded-lg border border-zinc-200 bg-white p-5 shadow-card transition hover:border-pgreen hover:shadow-lg"
                >
                  <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
                    Jugador
                  </span>

                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight tracking-[-0.035em] text-zinc-950">
                    {player.full_name}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-600">
                    {player.city || "Sin ciudad"} ·{" "}
                    {player.gender || "Sin género"}
                  </p>

                  <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm">
                    <strong className="text-zinc-900">Rating:</strong>{" "}
                    {player.ranking_points || 1500}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {query && tournamentsFiltrados.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-black uppercase">
              Torneos encontrados
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tournamentsFiltrados.map((tournament) => (
                <Link
                  key={tournament.id || tournament.slug}
                  href={`/torneos/${tournament.slug}`}
                  className="block rounded-lg border border-zinc-200 bg-white p-5 shadow-card transition hover:border-pgreen hover:shadow-lg"
                >
                  <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
                    Torneo
                  </span>

                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight tracking-[-0.035em] text-zinc-950">
                    {tournament.name}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-600">
                    {tournament.province || "Sin provincia"} ·{" "}
                    {tournament.category || "Sin categoría"}
                  </p>

                  <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm">
                    Ver ficha del torneo
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {query && totalCoincidencias === 0 && players.length > 0 && (
          <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-black uppercase">
              Jugadores disponibles para probar
            </h2>

            <p className="mt-2 text-sm text-zinc-600">
              La conexión con Supabase funciona. Prueba buscando parte de uno de
              estos nombres:
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {players.slice(0, 12).map((player) => (
                <div
                  key={player.id}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="font-black text-zinc-950">
                    {player.full_name}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {player.city || "Sin ciudad"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}