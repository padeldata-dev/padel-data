import type { ConfidenceLevel } from "@/lib/mockData";

const styles: Record<ConfidenceLevel, string> = {
  Alta: "bg-lime-100 text-pgreen3 border-lime-200",
  Media: "bg-amber-100 text-amber-700 border-amber-200",
  Pendiente: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

export function ConfidencePill({ level }: { level: ConfidenceLevel }) {
  return (
    <span className={`inline-flex rounded-md border px-2.5 py-1.5 text-xs font-black uppercase ${styles[level]}`}>
      {level}
    </span>
  );
}
