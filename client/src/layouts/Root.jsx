import { Outlet } from "react-router";
import Header from "../components/Header";

const Root = () => {
    return (
        <>
            <Header />
            <main className="container-fluid">
                <Outlet></Outlet>
            </main>
        </>
    );
};

export default Root;
