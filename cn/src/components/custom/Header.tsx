import PageSwitcher from "./PageSwitcher"

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <PageSwitcher className="size-1.5"></PageSwitcher>
    </header>
  )
}

export default Header
