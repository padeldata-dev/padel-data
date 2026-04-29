import Link from "next/link";
import { Search } from "lucide-react";

const navItems = [
  ["Inicio", "/"],
  ["Rankings", "/rankings"],
  ["Torneos", "/torneos"],
  ["Jugadores", "/jugadores"],
  ["Clubes", "/clubes"],
  ["Metodología", "/metodologia"],
  ["Fuentes", "/fuentes"],
];

function PadelDataMark() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-pgreen/35 bg-pgreen/10 shadow-[0_0_28px_rgba(163,230,53,0.16)] sm:h-14 sm:w-14">
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-9 w-9 text-pgreen sm:h-10 sm:w-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="12"
          y="8"
          width="40"
          height="48"
          rx="7"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M12 32H52M32 8V56M22 20H42M22 44H42"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.72"
        />
        <path
          d="M20 46C29 35 37 28 48 22"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="48" cy="22" r="4.5" fill="currentColor" />
        <circle cx="20" cy="46" r="2.5" fill="currentColor" opacity="0.68" />
      </svg>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-pdark/95 text-white backdrop-blur">
      <div className="mx-auto flex min-h-[82px] max-w-[1380px] items-center justify-between gap-5 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Padel Data - Inicio">
          <PadelDataMark />
          <div className="min-w-0">
            <div className="text-2xl font-black leading-none tracking-[-0.075em] sm:text-3xl">
              PADEL<span className="text-pgreen">DATA</span>
            </div>
            <div className="mt-1 hidden text-[9px] font-extrabold uppercase tracking-wide text-zinc-300 sm:block">
              La base de datos del pádel amateur
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-xs font-black uppercase lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-pgreen">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Search className="hidden h-5 w-5 text-zinc-300 md:block" />
          <Link
            href="/sugerir-resultado"
            className="rounded-md border border-pgreen2 px-3 py-2.5 text-[10px] font-black uppercase text-pgreen transition hover:bg-pgreen hover:text-pdark sm:px-4 sm:py-3 sm:text-xs"
          >
            Añadir datos
          </Link>
        </div>
      </div>
    </header>
  );
}
