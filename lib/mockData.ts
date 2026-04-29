export type ConfidenceLevel = "Alta" | "Media" | "Pendiente";

export type Player = {
  id: string;
  slug: string;
  fullName: string;
  gender: "Masculino" | "Femenino";
  city: string;
  rankingPoints: number;
  bio: string;
  confidence: ConfidenceLevel;
};

export type Tournament = {
  id: string;
  slug: string;
  name: string;
  province: string;
  category: string;
  startDate: string;
  endDate: string;
  sourceUrl: string;
  verificationStatus: "Verificado parcialmente" | "Pendiente" | "Verificado";
};

export type Match = {
  id: string;
  tournamentId: string;
  round: string;
  pair1: [string, string];
  pair2: [string, string];
  winnerPair: 1 | 2;
  score: string;
  confidence: ConfidenceLevel;
};

export const players: Player[] = [
  {
    id: "p1",
    slug: "karlos-rodriguez",
    fullName: "Karlos Rodríguez",
    gender: "Masculino",
    city: "Málaga",
    rankingPoints: 2450,
    bio: "Campeón masculino del Campeonato Provincial Absoluto Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p2",
    slug: "iker-rodriguez",
    fullName: "Íker Rodríguez",
    gender: "Masculino",
    city: "Málaga",
    rankingPoints: 2450,
    bio: "Campeón masculino del Campeonato Provincial Absoluto Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p3",
    slug: "pablo-herrera",
    fullName: "Pablo Herrera",
    gender: "Masculino",
    city: "Málaga",
    rankingPoints: 2150,
    bio: "Subcampeón masculino del Campeonato Provincial Absoluto Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p4",
    slug: "diego-lozano",
    fullName: "Diego Lozano",
    gender: "Masculino",
    city: "Málaga",
    rankingPoints: 2150,
    bio: "Subcampeón masculino del Campeonato Provincial Absoluto Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p5",
    slug: "valeria-prado",
    fullName: "Valeria Prado",
    gender: "Femenino",
    city: "Málaga",
    rankingPoints: 2450,
    bio: "Campeona femenina del Campeonato Provincial Absoluto Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p6",
    slug: "liis-org",
    fullName: "Liis Org",
    gender: "Femenino",
    city: "Málaga",
    rankingPoints: 2450,
    bio: "Campeona femenina del Campeonato Provincial Absoluto Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p7",
    slug: "daniela-infantes",
    fullName: "Daniela Infantes",
    gender: "Femenino",
    city: "Málaga",
    rankingPoints: 2150,
    bio: "Subcampeona femenina detectada en el Campeonato Provincial Absoluto Málaga 2026. Pareja pendiente de verificación completa.",
    confidence: "Media",
  },
  {
    id: "p8",
    slug: "maripaz-jimenez",
    fullName: "Maripaz Jiménez",
    gender: "Femenino",
    city: "Málaga",
    rankingPoints: 2200,
    bio: "Campeona +35 femenina del Campeonato Provincial de Veteranos Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p9",
    slug: "laureana-diarte",
    fullName: "Laureana Diarte",
    gender: "Femenino",
    city: "Málaga",
    rankingPoints: 2200,
    bio: "Campeona +35 femenina del Campeonato Provincial de Veteranos Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p10",
    slug: "beatriz-ramirez",
    fullName: "Beatriz Ramírez",
    gender: "Femenino",
    city: "Málaga",
    rankingPoints: 1950,
    bio: "Subcampeona +35 femenina del Campeonato Provincial de Veteranos Málaga 2026.",
    confidence: "Alta",
  },
  {
    id: "p11",
    slug: "rocio-ramirez",
    fullName: "Rocío Ramírez",
    gender: "Femenino",
    city: "Málaga",
    rankingPoints: 1950,
    bio: "Subcampeona +35 femenina del Campeonato Provincial de Veteranos Málaga 2026.",
    confidence: "Alta",
  },
];

export const tournaments: Tournament[] = [
  {
    id: "t1",
    slug: "campeonato-provincial-absoluto-malaga-2026",
    name: "Campeonato Provincial Absoluto Málaga 2026",
    province: "Málaga",
    category: "Absoluto",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    sourceUrl: "https://fap.es/resultados-campeonato-provincial-absoluto-malaga-2026/",
    verificationStatus: "Verificado parcialmente",
  },
  {
    id: "t2",
    slug: "campeonato-provincial-veteranos-malaga-2026",
    name: "Campeonato Provincial de Veteranos Málaga 2026",
    province: "Málaga",
    category: "Veteranos",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    sourceUrl: "https://fap.es/resultados-campeonatos-provinciales-veteranos-2026/",
    verificationStatus: "Verificado parcialmente",
  },
];

export const matches: Match[] = [
  {
    id: "m1",
    tournamentId: "t1",
    round: "Final masculina",
    pair1: ["p1", "p2"],
    pair2: ["p3", "p4"],
    winnerPair: 1,
    score: "Campeones / marcador pendiente de verificación",
    confidence: "Alta",
  },
  {
    id: "m2",
    tournamentId: "t1",
    round: "Final femenina",
    pair1: ["p5", "p6"],
    pair2: ["p7", ""],
    winnerPair: 1,
    score: "Campeonas / subcampeonas pendientes de completar",
    confidence: "Media",
  },
  {
    id: "m3",
    tournamentId: "t2",
    round: "+35 Femenina",
    pair1: ["p8", "p9"],
    pair2: ["p10", "p11"],
    winnerPair: 1,
    score: "Campeonas / marcador pendiente de verificación",
    confidence: "Alta",
  },
];

export function getPlayer(id: string) {
  return players.find((player) => player.id === id);
}

export function getPlayerBySlug(slug: string) {
  return players.find((player) => player.slug === slug);
}

export function getTournamentBySlug(slug: string) {
  return tournaments.find((tournament) => tournament.slug === slug);
}

export function getMatchesByPlayer(playerId: string) {
  return matches.filter(
    (match) => match.pair1.includes(playerId) || match.pair2.includes(playerId)
  );
}

export function getMatchesByTournament(tournamentId: string) {
  return matches.filter((match) => match.tournamentId === tournamentId);
}