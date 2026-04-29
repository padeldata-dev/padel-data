import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function RankingsPage() {
  if (!supabase) {
    return <p className="p-6">Supabase no está configurado</p>;
  }

  const { data: players, error } = await supabase
    .from("players")
    .select("*")
    .order("ranking_points", { ascending: false });

  return (
    <>
      <section className="padel-hero relative text-white">
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 py-12">
          <span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">
            Rankings
          </span>

          <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.055em]">
            Ranking de jugadores <span className="text-pgreen">PadelData</span>
          </h1>

          <p className="mt-5 max-w-2xl text-zinc-200">
            Clasificación inicial basada en datos registrados en la base.
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
          <h2 className="text-xl font-black uppercase">Top jugadores</h2>
          <span className="rounded-md bg-lime-100 px-3 py-2 text-xs font-black uppercase text-pgreen3">
            {players?.length || 0} jugadores
          </span>
        </div>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-card">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-zinc-50 text-left text-xs uppercase text-zinc-500">
                <th className="p-4">Posición</th>
                <th className="p-4">Jugador</th>
                <th className="p-4">Ciudad</th>
                <th className="p-4">Género</th>
                <th className="p-4">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {players?.map((player, index) => (
                <tr key={player.id} className="border-t border-zinc-100">
                  <td className="p-4 font-black">#{index + 1}</td>

                  {/* 👇 AQUÍ ESTÁ LA CLAVE */}
                  <td className="p-4 font-bold">
                    <Link
                      href={`/jugadores/${player.slug}`}
                      className="hover:text-pgreen3 transition"
                    >
                      {player.full_name}
                    </Link>
                  </td>

                  <td className="p-4">{player.city}</td>
                  <td className="p-4">{player.gender}</td>
                  <td className="p-4 font-black">
                    {player.ranking_points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}