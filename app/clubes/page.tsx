export default function ClubsPage() {
  return (
    <>
      <section className="padel-hero relative text-white"><div className="relative z-10 mx-auto max-w-[1380px] px-6 py-12"><span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">Clubes</span><h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.055em]">Clubes y sedes <span className="text-pgreen">en construcción</span></h1><p className="mt-5 max-w-2xl text-zinc-200">Sección preparada para añadir sedes organizadoras, actividad por club y torneos vinculados.</p></div></section>
      <main className="mx-auto grid max-w-[1380px] gap-6 px-6 py-8 md:grid-cols-3">
        {["Málaga", "Sevilla", "Granada / Cádiz"].map((province) => <article key={province} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card"><h2 className="text-2xl font-black">{province}</h2><p className="mt-3 text-zinc-600">Provincia preparada para futuras sedes y clubes.</p></article>)}
      </main>
    </>
  );
}
