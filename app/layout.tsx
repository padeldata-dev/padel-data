import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "PadelData — Pádel competitivo, rankings y resultados",
  description: "Resultados, rankings, torneos, clubes y perfiles de jugadores del pádel competitivo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <footer className="py-10 text-center text-sm text-zinc-500">
          PadelData · V3 dinámica · Datos iniciales con fuente y nivel de confianza
        </footer>
      </body>
    </html>
  );
}
