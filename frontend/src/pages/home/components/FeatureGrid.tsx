import { BarChart, MessagesSquare, Zap } from "lucide-react";

const features = [
  {
    title: "Instant Setup",
    desc: "Go live in under 2 minutes with a single line of code. No complex onboarding required.",
    icon: Zap,
  },
  {
    title: "Omnichannel Support",
    desc: "Manage WhatsApp, Email, and Web Chat in one unified inbox. Never miss a customer again.",
    icon: MessagesSquare,
  },
  {
    title: "Advanced Analytics",
    desc: "Deep insights into response times, satisfaction scores, and agent performance in real-time.",
    icon: BarChart,
  },
];

const FeatureGrid = () => (
  <section className="py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-12">
      <div className="max-w-3xl mb-16 lg:mb-24">
        <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900  mb-6">
          Powerful features to scale your support
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Everything you need to provide world-class customer service without
          the complexity of legacy tools.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">
                {<f.icon />}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
