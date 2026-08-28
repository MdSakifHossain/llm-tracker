import { useEffect, useState } from "react";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");

    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <span onClick={toggleTheme}>
      {theme === "dark" ? (
        <TbSunFilled className="size-1.5" />
      ) : (
        <TbMoonFilled className="size-1.5" />
      )}
    </span>
  );
}
