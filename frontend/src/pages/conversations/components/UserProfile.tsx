export function UserProfile() {
  return (
    <aside className="w-80 border-l border-[#d1e2e6] dark:border-gray-700 flex flex-col bg-white dark:bg-background-dark overflow-y-auto shrink-0">
      <div className="p-6 flex flex-col gap-6">
        {/* Identity */}
        <div className="flex flex-col items-center text-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOSGQrXOP9FFz8-sW1dE6DkBd_4282eeaygenVM8e5gh5u2Jq7Wq8Zl4mJxiWKBQFPGeSYvnBmUoIOQ4zgHgFSjgzpcTEfJBFYRFz8j13yeS_FMcMSJqk4pEBOUuU_KxuwG2mHyfZTJVdqM1h7e3ODSZ-UGlkNtpxc1nrEixFTU9PVv8mtcMy6qHvnvL4sIUw9y_P9wAxAbhuEoYRstknO2JrtZOaiKotuTSJNfPLBy12U6oGhrhlhEsLap0wsgIx0xxxsyIpsLic"
            alt="Sarah Jenkins"
            className="size-24 rounded-2xl object-cover shadow-lg border-4 border-white dark:border-gray-800"
          />

          <div>
            <h3 className="text-lg font-bold">Sarah Jenkins</h3>
            <p className="text-sm text-[#508a95]">sarah.j@designstudio.com</p>
          </div>

          <div className="flex gap-2">
            <span className="bg-gray-100 dark:bg-gray-800 text-[10px] font-bold px-2 py-1 rounded text-[#508a95] uppercase">
              Free Tier
            </span>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase">
              Design Agency
            </span>
          </div>
        </div>

        <hr className="border-[#d1e2e6] dark:border-gray-700" />

        {/* Details */}
        <div className="flex flex-col gap-4">
          <Detail
            label="Location"
            value="London, United Kingdom"
            icon="location_on"
          />

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[#508a95] uppercase tracking-widest">
              Technical Info
            </label>

            <InfoRow label="Browser" value="Chrome 118.0" />
            <InfoRow label="OS" value="macOS 14.1" />
            <InfoRow label="Device" value="MacBook Pro" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[#508a95] uppercase tracking-widest">
              Interaction History
            </label>

            <TimelineItem
              title="Pricing Query"
              meta="Oct 12, 2023 • Resolved"
              active
            />

            <TimelineItem
              title="API Key setup"
              meta="Aug 05, 2023 • Resolved"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="m-4 mt-0 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-600">
            sticky_note_2
          </span>
          <p className="text-xs font-bold text-amber-800 dark:text-amber-200">
            Internal Agent Note
          </p>
        </div>

        <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
          Client is looking to scale by EOY. Priority lead for Enterprise
          expansion.
        </p>
      </div>
    </aside>
  );
}

/* ---- helpers ---- */

function Detail({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-[#508a95] uppercase tracking-widest">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-gray-400">
          {icon}
        </span>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg mt-1">
      <span className="text-[#508a95]">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function TimelineItem({
  title,
  meta,
  active,
}: {
  title: string;
  meta: string;
  active?: boolean;
}) {
  return (
    <div className="relative pl-4 mt-2">
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100 dark:bg-gray-800" />
      <div
        className={`absolute left-[-3px] top-1.5 size-2 rounded-full ${
          active ? "bg-primary" : "bg-gray-300"
        }`}
      />
      <p className="text-xs font-bold">{title}</p>
      <p className="text-[10px] text-[#508a95]">{meta}</p>
    </div>
  );
}
