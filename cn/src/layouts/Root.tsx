import Header from "@/components/custom/Header"
import { Outlet } from "react-router"
// import Header from "../components/Header";

const Root = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Root
