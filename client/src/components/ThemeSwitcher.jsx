import { useEffect, useState } from "react";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemChange = e => setTheme(e.matches ? "dark" : "light");
        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, []);

    useEffect(() => document.documentElement.setAttribute("data-theme", theme), [theme]);

    const toggleTheme = () => setTheme(current => (current === "dark" ? "light" : "dark"));

    return (
        <span onClick={toggleTheme} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
            {theme === "dark" ? <TbSunFilled className="size-1.5" /> : <TbMoonFilled className="size-1.5" />}
        </span>
    );
}
