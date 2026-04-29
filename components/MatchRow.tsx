import Link from "next/link";
import type { Match } from "@/lib/mockData";
import { getPlayer } from "@/lib/mockData";
import { ConfidencePill } from "./ConfidencePill";

function PlayerLink({ id }: { id: string }) {
  const player = getPlayer(id);
  if (!player) return <span className="text-zinc-400">Pendiente</span>;

  return (
    <Link className="font-bold hover:text-pgreen3" href={`/jugadores/${player.slug}`}>
      {player.fullName}
    </Link>
  );
}

export function MatchRow({ match }: { match: Match }) {
  return (
    <div className="grid gap-4 border-t border-zinc-100 p-4 md:grid-cols-[1.1fr_1fr_auto] md:items-center">
      <div>
        <div className="text-xs font-black uppercase text-zinc-500">{match.round}</div>
        <div className="mt-1 text-lg font-black">{match.score}</div>
      </div>

      <div className="space-y-2 text-sm">
        <div className={match.winnerPair === 1 ? "text-pgreen3" : ""}>
          <PlayerLink id={match.pair1[0]} /> / <PlayerLink id={match.pair1[1]} />
        </div>
        <div className={match.winnerPair === 2 ? "text-pgreen3" : ""}>
          <PlayerLink id={match.pair2[0]} /> / <PlayerLink id={match.pair2[1]} />
        </div>
      </div>

      <ConfidencePill level={match.confidence} />
    </div>
  );
}
