import Link from "next/link";
import type { Tournament } from "@/lib/mockData";

export function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-card">
      <div className="bg-gradient-to-br from-zinc-950 to-zinc-800 p-6 text-white">
        <span className="text-xs font-black uppercase text-pgreen">Torneo real</span>
        <h2 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight">{tournament.name}</h2>
      </div>
      <div className="grid grid-cols-3 divide-x divide-zinc-200">
        <div className="p-4"><small className="text-xs font-black uppercase text-zinc-500">Provincia</small><strong className="block text-xl">{tournament.province}</strong></div>
        <div className="p-4"><small className="text-xs font-black uppercase text-zinc-500">Categoría</small><strong className="block text-xl">{tournament.category}</strong></div>
        <div className="p-4"><small className="text-xs font-black uppercase text-zinc-500">Estado</small><strong className="block text-sm">{tournament.verificationStatus}</strong></div>
      </div>
      <Link href={`/torneos/${tournament.slug}`} className="block border-t border-zinc-200 bg-zinc-50 p-4 text-sm font-black uppercase text-pgreen3">
        Ver ficha →
      </Link>
    </article>
  );
}
