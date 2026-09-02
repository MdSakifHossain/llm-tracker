import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./layouts/Root";
import HomePage from "./pages/HomePage";
import AddModel from "./pages/AddModel";
import AddModel2 from "./pages/AddModel2";

import { ModelsProvider } from "./contexts/ModelsContext";

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
        Component: AddModel2,
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
