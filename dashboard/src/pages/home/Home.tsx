import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureGrid from "./components/FeatureGrid";
import Integrations from "./components/Integration";
import SocioProof from "./components/SocioProof";

function Home() {
  return (
    <div className="bg-white transition-colors duration-200 font-display">
      <Navbar />
      <main className="bg-white text-black">
        <Hero />

        <SocioProof />

        <FeatureGrid />
        <Integrations />
        {/* CTA Section */}
        <section className="py-24 lg:py-40">
          <div className="mx-auto max-w-5xl px-6 lg:px-12">
            <div className="relative bg-primary rounded-3xl p-12 lg:p-20 text-center text-white overflow-hidden shadow-2xl shadow-primary/40">
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tighter">
                  Ready to scale your support?
                </h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                  Join 10,000+ companies delivering exceptional customer
                  experiences. Start your 14-day free trial today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                  <button className="w-full sm:w-auto bg-white text-primary hover:bg-slate-50 text-lg font-bold px-10 py-4 rounded-xl transition-all shadow-lg">
                    Get Started for Free
                  </button>
                  <p className="text-sm font-medium text-white/70">
                    No credit card required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center text-xs text-slate-400">
          <p>© 2026 Zendo Technologies Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
