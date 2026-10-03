import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./index.css"

import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import { ModelsProvider } from "./contexts/ModelsContext"
import Root from "./layouts/Root"
import AddModel from "./pages/AddModel"
import EditModel from "./pages/EditModel"
import HomePage from "./pages/HomePage"
import Notes from "./pages/Notes"

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
        Component: Notes,
      },
      {
        path: "edit/:id",
        Component: EditModel,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModelsProvider>
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </ModelsProvider>
  </StrictMode>
)
