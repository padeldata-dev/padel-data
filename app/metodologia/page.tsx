export default function MethodologyPage() {
  return (
    <>
      <section className="padel-hero relative text-white"><div className="relative z-10 mx-auto max-w-[1380px] px-6 py-12"><span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">Metodología</span><h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.055em]">Cómo ordenamos <span className="text-pgreen">los datos</span></h1><p className="mt-5 max-w-2xl text-zinc-200">PadelData prioriza fuente, nivel de confianza y revisión manual antes de publicar datos incompletos.</p></div></section>
      <main className="mx-auto grid max-w-[1380px] gap-6 px-6 py-8 md:grid-cols-2">
        <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card"><h2 className="text-xl font-black">Niveles de confianza</h2><p className="mt-3 text-zinc-600">Alta: dato claro en fuente oficial. Media: dato parcial o de club. Pendiente: requiere revisión.</p></article>
        <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-card"><h2 className="text-xl font-black">Rating provisional</h2><p className="mt-3 text-zinc-600">El rating inicial es experimental y debe recalcularse con resultados, fase, categoría y fiabilidad de fuente.</p></article>
      </main>
    </>
  );
}
