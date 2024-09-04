import React, { useEffect } from "react";
import { useAppStore } from "../../store";

const ToggleDarkModeComponent = () => {
  const dm = useAppStore((state) => state.toggleDarkMode);
  const darkmode = useAppStore((state) => state.darkMode);
  const [checked, setChecked] = React.useState<boolean | undefined>(false);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    const isDarkMode = mode === "dark";
    if (isDarkMode) {
      document.body.classList.add("dark");
    }
    dm(isDarkMode);
    setChecked(isDarkMode);
  }, [checked, darkmode]);

  const toggleDarkMode = () => {
    if (checked) {
      document.body.classList.remove("dark");
      localStorage.removeItem("mode");
      dm(false);
      setChecked(!checked);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("mode", "dark");
      dm(true);
      setChecked(checked);
    }
  };
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={toggleDarkMode}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-red-600 peer-checked:bg-secondary"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {darkmode ? "On" : "Off"}
      </span>
    </label>
  );
};

export default ToggleDarkModeComponent;
