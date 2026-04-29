export default function SourcesPage() {
  return (
    <>
      <section className="padel-hero relative text-white"><div className="relative z-10 mx-auto max-w-[1380px] px-6 py-12"><span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">Fuentes</span><h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.055em]">Fuentes y trazabilidad <span className="text-pgreen">de PadelData</span></h1><p className="mt-5 max-w-2xl text-zinc-200">Cada dato debe conservar fuente, fecha de captura y estado de verificación.</p></div></section>
      <main className="mx-auto max-w-[1380px] px-6 py-8">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-card">
          <table className="w-full border-collapse">
            <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500"><tr><th className="p-3">Fuente</th><th className="p-3">Tipo</th><th className="p-3">Uso</th><th className="p-3">Prioridad</th></tr></thead>
            <tbody>
              <tr className="border-t"><td className="p-3">Federación Andaluza de Pádel</td><td className="p-3">Oficial</td><td className="p-3">Torneos y resultados</td><td className="p-3">Alta</td></tr>
              <tr className="border-t"><td className="p-3">Clubes andaluces</td><td className="p-3">Local</td><td className="p-3">Cuadros y campeones</td><td className="p-3">Alta</td></tr>
              <tr className="border-t"><td className="p-3">SNP / plataformas privadas</td><td className="p-3">Privada</td><td className="p-3">Consulta o colaboración</td><td className="p-3">Con cautela</td></tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
