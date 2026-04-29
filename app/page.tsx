import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

async function getCount(tableName: string) {
  if (!supabase) {
    return 0;
  }

  const { count, error } = await supabase
    .from(tableName)
    .select("id", { count: "exact", head: true });

  if (error || count === null) {
    return 0;
  }

  return count;
}

export default async function HomePage() {
  const playersCount = await getCount("players");
  const tournamentsCount = await getCount("tournaments");
  const matchesCount = await getCount("matches");

  return (
    <>
      <section className="padel-hero relative text-white">
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 py-16">
          <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">
            Padel Data
          </span>

          <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none tracking-[-0.055em] md:text-7xl">
            Base de datos de pádel amateur
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            Consulta jugadores, rankings, torneos y resultados dentro de una
            base de datos pensada para organizar el pádel amateur desde Málaga
            y escalar poco a poco a más zonas.
          </p>

          <form
            action="/buscar"
            method="GET"
            className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="search"
              name="q"
              placeholder="Buscar jugador, torneo, ciudad o categoría..."
              className="w-full rounded-lg border border-zinc-700 bg-white px-4 py-4 text-zinc-950 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/30"
              required
            />

            <button
              type="submit"
              className="rounded-lg bg-lime-400 px-7 py-4 font-black uppercase text-zinc-950 transition hover:bg-lime-300"
            >
              Buscar
            </button>
          </form>

          <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-700 bg-white/5 p-4">
              <small className="block text-xs font-black uppercase text-zinc-300">
                Jugadores
              </small>
              <strong className="mt-1 block text-3xl font-black text-lime-300">
                {playersCount}
              </strong>
            </div>

            <div className="rounded-lg border border-zinc-700 bg-white/5 p-4">
              <small className="block text-xs font-black uppercase text-zinc-300">
                Torneos
              </small>
              <strong className="mt-1 block text-3xl font-black text-lime-300">
                {tournamentsCount}
              </strong>
            </div>

            <div className="rounded-lg border border-zinc-700 bg-white/5 p-4">
              <small className="block text-xs font-black uppercase text-zinc-300">
                Partidos
              </small>
              <strong className="mt-1 block text-3xl font-black text-lime-300">
                {matchesCount}
              </strong>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/jugadores"
              className="rounded-lg border border-zinc-700 bg-white/5 px-5 py-3 font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-300"
            >
              Ver jugadores
            </Link>

            <Link
              href="/torneos"
              className="rounded-lg border border-zinc-700 bg-white/5 px-5 py-3 font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-300"
            >
              Ver torneos
            </Link>

            <Link
              href="/ranking"
              className="rounded-lg border border-zinc-700 bg-white/5 px-5 py-3 font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-300"
            >
              Ver ranking
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1380px] px-6 py-8">
        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card">
            <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
              Jugadores
            </span>

            <h2 className="mt-4 text-2xl font-black uppercase tracking-[-0.035em] text-zinc-950">
              Fichas individuales
            </h2>

            <p className="mt-3 text-zinc-600">
              Consulta perfiles de jugadores con ciudad, rating, nivel de
              confianza y partidos registrados.
            </p>

            <Link
              href="/jugadores"
              className="mt-5 inline-block font-black uppercase text-pgreen3 hover:text-pgreen"
            >
              Entrar en jugadores
            </Link>
          </article>

          <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card">
            <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
              Torneos
            </span>

            <h2 className="mt-4 text-2xl font-black uppercase tracking-[-0.035em] text-zinc-950">
              Eventos registrados
            </h2>

            <p className="mt-3 text-zinc-600">
              Accede a torneos, categorías, provincias y resultados vinculados
              a jugadores reales de la base de datos.
            </p>

            <Link
              href="/torneos"
              className="mt-5 inline-block font-black uppercase text-pgreen3 hover:text-pgreen"
            >
              Entrar en torneos
            </Link>
          </article>

          <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card">
            <span className="inline-flex rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
              Ranking
            </span>

            <h2 className="mt-4 text-2xl font-black uppercase tracking-[-0.035em] text-zinc-950">
              Clasificación
            </h2>

            <p className="mt-3 text-zinc-600">
              Ranking general construido a partir de los datos disponibles,
              pensado para crecer conforme se añadan partidos.
            </p>

            <Link
              href="/ranking"
              className="mt-5 inline-block font-black uppercase text-pgreen3 hover:text-pgreen"
            >
              Ver ranking
            </Link>
          </article>
        </section>
      </main>
    </>
  );
}