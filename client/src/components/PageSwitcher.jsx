import { Link, useLocation } from "react-router";

const PageSwitcher = (props) => {
  const { pathname } = useLocation();

  return (
    <Link {...props} to={pathname === "/" ? "/add" : "/"} className="secondary">
      <img src="/header-icon.svg" alt="logo" className="header-icon" />
    </Link>
  );
};

export default PageSwitcher;
