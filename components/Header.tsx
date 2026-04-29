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

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-pdark text-white">
      <div className="mx-auto flex min-h-[82px] max-w-[1380px] items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="logo-mark" />
          <div>
            <div className="text-3xl font-black leading-none tracking-[-0.08em]">
              PADEL<span className="text-pgreen">DATA</span>
            </div>
            <div className="mt-1 hidden text-[9px] font-extrabold uppercase tracking-wide text-zinc-300 sm:block">
              La base de datos del pádel competitivo
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-xs font-black uppercase lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-pgreen">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Search className="hidden h-5 w-5 md:block" />
          <Link href="/sugerir-resultado" className="rounded-md border border-pgreen2 px-4 py-3 text-xs font-black uppercase text-pgreen">
            Añadir datos
          </Link>
        </div>
      </div>
    </header>
  );
}
