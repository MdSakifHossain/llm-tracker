import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const PageSwitcher = props => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = e => {
            const activeTag = document.activeElement?.tagName.toLowerCase();
            if (activeTag === "input" || activeTag === "textarea") return;

            const key = e.key.toLowerCase();

            if (key === "a" && pathname !== "/add") {
                e.preventDefault();
                navigate("/add");
            }

            if (key === "i" && pathname !== "/") {
                e.preventDefault();
                navigate("/");
            }

            if (key === "n" && pathname !== "/notes") {
                e.preventDefault();
                navigate("/notes");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [pathname, navigate]);

    return (
        <Link {...props} to={pathname === "/" ? "/add" : "/"} className="secondary">
            <img src="/header-icon.svg" alt="logo" className="header-icon" />
        </Link>
    );
};

export default PageSwitcher;
