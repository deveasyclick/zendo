import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => (
  <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="flex flex-col gap-8 text-left z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          v2.0 is now live
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] text-slate-900 text-left">
          Support that moves as &nbsp;
          <span className="text-primary italic">fast</span> as your business
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
          Zendo empowers your team to engage visitors in real-time, converting
          leads into loyal customers with our lightning-fast live chat platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-white text-lg font-bold px-8 py-7.5 rounded-xl transition-all shadow-xl shadow-primary/25  gap-2 cursor-pointer">
            Get Started for Free <ArrowRight />
          </Button>
          <Button className="bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 text-lg font-bold px-8 py-7.5 rounded-xl transition-all border border-slate-200 cursor-pointer">
            Book a Demo
          </Button>
        </div>
      </div>

      {/* Interactive Mockup */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-linear-to-tr from-primary/20 to-transparent blur-3xl rounded-full opacity-50"></div>
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden aspect-video transform hover:-rotate-1 transition-transform duration-500">
          <div className="h-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-1.5">
            <div className="size-2.5 rounded-full bg-red-400"></div>
            <div className="size-2.5 rounded-full bg-amber-400"></div>
            <div className="size-2.5 rounded-full bg-emerald-400"></div>
          </div>
          <div className="p-4 h-full bg-slate-50/50 dark:bg-slate-950/50 flex gap-4">
            <div className="w-1/3 h-full bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3 space-y-3">
              <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div>
              <div className="h-10 w-full bg-primary/5 rounded-lg border border-primary/20"></div>
            </div>
            <div className="flex-1 h-full bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 relative">
              <div className="flex items-center gap-2 mb-6">
                <div className="size-8 rounded-full bg-primary/20"></div>
                <div className="space-y-1">
                  <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-r-lg"></div>
                <div className="h-8 w-1/2 bg-primary/10 rounded-l-lg ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
