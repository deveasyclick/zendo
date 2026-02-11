import { BellDot, HelpCircle, type LucideIcon } from "lucide-react";
import { SearchForm } from "./SearchForm";

export function Topbar() {
  return (
    <header className="border-b border-border-light dark:border-border-dark flex items-center justify-between bg-background-light dark:bg-background-dark">
      <div className="max-w-xl w-full">
        <SearchForm />
      </div>

      <div className="flex items-center gap-4">
        <IconButton icon={BellDot} dot />
        <IconButton icon={HelpCircle} />

        <div className="h-6 w-px bg-border-light mx-2" />
      </div>
    </header>
  );
}

function IconButton({ icon: Icon, dot }: { icon: LucideIcon; dot?: boolean }) {
  return (
    <button className="relative size-10 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark text-gray-500 flex items-center justify-center">
      <span className="material-symbols-outlined">{<Icon />}</span>
      {dot && (
        <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500" />
      )}
    </button>
  );
}
