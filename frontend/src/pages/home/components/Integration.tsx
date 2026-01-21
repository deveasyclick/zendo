import { Mail, SendHorizonal, Slack, Webhook } from "lucide-react";

const Integrations = () => {
  const integrations = [
    { name: "Slack", icon: Slack, color: "text-primary" },
    { name: "WhatsApp", icon: SendHorizonal, color: "text-emerald-400" },
    { name: "Zendesk", icon: Mail, color: "text-blue-400" },
    { name: "Salesforce", icon: "api", color: "text-orange-400" },
    { name: "Custom Webhooks", icon: Webhook, color: "text-purple-400" },
  ];

  return (
    <section
      id="integrations"
      className="relative overflow-hidden bg-slate-900 py-24 text-white"
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:px-12">
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight lg:text-5xl">
          Works with your favorite stack
        </h2>

        <div className="flex max-w-2xl flex-wrap justify-center gap-6">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md transition-transform hover:scale-105"
            >
              <span className={`material-symbols-outlined ${item.color}`}>
                {<item.icon />}
              </span>
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
