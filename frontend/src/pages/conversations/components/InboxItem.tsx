export function InboxItem({
  name,
  time,
  subtitle,
  active,
}: {
  name: string;
  time: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-4 min-h-[80px] py-3 cursor-pointer
        ${
          active
            ? "bg-white dark:bg-gray-800 border-l-4 border-primary shadow-sm"
            : "hover:bg-gray-100 dark:hover:bg-gray-800/50 border-b border-[#d1e2e6]/50 dark:border-gray-700/50"
        }`}
    >
      <div className="size-12 rounded-full bg-gray-200" />

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold truncate">{name}</p>
          <p className="text-[10px] text-[#508a95]">{time}</p>
        </div>
        <p className="text-xs text-[#508a95] truncate italic">{subtitle}</p>
      </div>
    </div>
  );
}
