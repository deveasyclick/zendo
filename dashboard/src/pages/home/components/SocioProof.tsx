const proofs = ["GLOBALTECH", "FINFLOW", "UPSTREAM", "MODERNA", "QUARTZ"];

const SocioProof = () => {
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/50 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          Trusted by industry leaders worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale contrast-125 dark:invert">
          {proofs.map((brand) => (
            <span
              key={brand}
              className="text-2xl font-black italic tracking-tighter"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocioProof;
