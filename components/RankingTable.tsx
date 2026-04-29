import Link from "next/link";
import type { Player } from "@/lib/mockData";

export function RankingTable({ players }: { players: Player[] }) {
  const sorted = [...players].sort((a, b) => b.rankingPoints - a.rankingPoints);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-card">
      <div className="flex items-center justify-between p-5">
        <h2 className="font-black uppercase">Ranking Málaga inicial</h2>
        <span className="rounded-md bg-amber-100 px-3 py-2 text-xs font-black uppercase text-amber-700">Experimental</span>
      </div>
      <table className="hidden w-full border-collapse md:table">
        <thead>
          <tr className="bg-zinc-50 text-left text-xs uppercase text-zinc-500">
            <th className="p-3">Pos.</th><th className="p-3">Jugador</th><th className="p-3">Género</th><th className="p-3">Ciudad</th><th className="p-3">Rating</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((player, index) => (
            <tr key={player.id} className="border-t border-zinc-100">
              <td className="p-3 font-black">{index + 1}</td>
              <td className="p-3 font-bold"><Link href={`/jugadores/${player.slug}`}>{player.fullName}</Link></td>
              <td className="p-3">{player.gender}</td>
              <td className="p-3">{player.city}</td>
              <td className="p-3 font-black">{player.rankingPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-3 p-4 md:hidden">
        {sorted.map((player, index) => (
          <Link key={player.id} href={`/jugadores/${player.slug}`} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs font-black uppercase text-zinc-500">#{index + 1}</div>
            <div className="mt-1 font-black">{player.fullName}</div>
            <div className="mt-1 text-sm text-zinc-600">{player.city} · {player.gender}</div>
            <div className="mt-2 text-xl font-black">{player.rankingPoints}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
