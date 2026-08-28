import PageSwitcher from "./PageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="container flex items-center justify-between">
      <PageSwitcher className="size-1.5"></PageSwitcher>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
