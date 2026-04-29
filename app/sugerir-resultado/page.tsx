import { SubmitResultForm } from "@/components/SubmitResultForm";

export default function SubmitResultPage() {
  return (
    <>
      <section className="padel-hero relative text-white"><div className="relative z-10 mx-auto max-w-[1380px] px-6 py-12"><span className="inline-flex rounded-md bg-lime-400/15 px-3 py-2 text-xs font-black uppercase text-pgreen">Añadir datos</span><h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.055em]">Sugiere un resultado <span className="text-pgreen">a PadelData</span></h1><p className="mt-5 max-w-2xl text-zinc-200">Todo dato aportado debe pasar por revisión antes de publicarse.</p></div></section>
      <main className="mx-auto max-w-3xl px-6 py-8">
        <SubmitResultForm />
      </main>
    </>
  );
}
