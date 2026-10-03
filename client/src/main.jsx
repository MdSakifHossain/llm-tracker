import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./layouts/Root";
import AddModel from "./pages/AddModel";
import HomePage from "./pages/HomePage";

import { ModelsProvider } from "./contexts/ModelsContext";
import Prompts from "./pages/Notes";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "add",
                Component: AddModel,
            },
            {
                path: "notes",
                Component: Prompts,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ModelsProvider>
            <RouterProvider router={router} />
        </ModelsProvider>
    </StrictMode>,
);
