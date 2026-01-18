import Icon from "../icons";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="flex flex-col items-center gap-4">
        <Icon
          name="circleLoader"
          className="animate-spin h-12 w-12 text-blue-500"
        />
        <p className="text-gray-700 dark:text-gray-300 text-lg">Loading...</p>
      </div>
    </div>
  );
}
