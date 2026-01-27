export function DateSeparator() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
      <p className="text-[10px] font-bold text-gray-400 uppercase">Today</p>
      <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
    </div>
  );
}

export function SystemMessage({ text }: { text: string }) {
  return (
    <div className="self-center bg-gray-50 dark:bg-gray-800/50 px-4 py-1.5 rounded-full">
      <p className="text-[11px] text-[#508a95] italic">{text}</p>
    </div>
  );
}

export function VisitorMessage({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex flex-col gap-1 items-start max-w-[80%]">
      <div className="bg-[#f1f5f9] dark:bg-gray-800 px-4 py-3 rounded-xl rounded-tl-none">
        <p className="text-sm">{text}</p>
      </div>
      <p className="text-[10px] text-[#508a95]">{time}</p>
    </div>
  );
}

export function AgentMessage({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex flex-col gap-1 items-end self-end max-w-[80%]">
      <div className="bg-primary text-white px-4 py-3 rounded-xl rounded-tr-none">
        <p className="text-sm">{text}</p>
      </div>
      <p className="text-[10px] text-[#508a95]">{time}</p>
    </div>
  );
}
