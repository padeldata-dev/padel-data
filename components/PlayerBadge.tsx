import Link from "next/link";
import type { Player } from "@/lib/mockData";
import { ConfidencePill } from "./ConfidencePill";

export function PlayerBadge({ player }: { player: Player }) {
  return (
    <Link href={`/jugadores/${player.slug}`} className="flex gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pdark font-black text-pgreen">
        {player.gender === "Masculino" ? "♂" : "♀"}
      </div>
      <div>
        <h3 className="font-black leading-tight">{player.fullName}</h3>
        <p className="mt-1 text-sm text-zinc-600">{player.city} · {player.gender}</p>
        <div className="mt-2">
          <ConfidencePill level={player.confidence} />
        </div>
      </div>
    </Link>
  );
}
