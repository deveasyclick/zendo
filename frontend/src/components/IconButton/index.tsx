import type { LucideIcon } from "lucide-react";

const IconButton = ({ icon: Icon }: { icon: LucideIcon }) => {
  return (
    <button
      type="button"
      className="p-1.5 text-[#508a95] hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
    >
      <span className="material-symbols-outlined text-[20px]">{<Icon />}</span>
    </button>
  );
};

export default IconButton;
