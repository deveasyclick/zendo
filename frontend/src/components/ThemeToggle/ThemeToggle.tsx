import { Moon, Sun, ToggleLeft, ToggleRight } from "lucide-react";
import { useTheme } from "../../contexts/theme";

type ThemeToggleProps = {
  className?: string;
  variant?: "button" | "switch";
  iconSize?: number;
};

const ThemeToggle = ({
  className = "",
  variant = "button",
  iconSize = 20,
}: ThemeToggleProps) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log("Theme toggle clicked, current isDarkMode:", isDarkMode);
    toggleTheme();
  };
  const LightModeIcon = variant === "button" ? Moon : ToggleLeft;
  const DarkModeIcon = variant === "button" ? Sun : ToggleRight;
  const text = isDarkMode ? "Light mode" : "Dark mode";
  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 ${className} flex items-center cursor-pointer`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {variant === "switch" ? (
        <span className="mr-2  text-black dark:text-white">{text}</span>
      ) : (
        ""
      )}
      {/* Show sun icon in dark mode, moon icon in light mode */}
      {isDarkMode ? (
        <DarkModeIcon name="sun" aria-hidden="true" size={iconSize} />
      ) : (
        <LightModeIcon name="sun" aria-hidden="true" size={iconSize} />
      )}
      <span className="sr-only">
        {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
