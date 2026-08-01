import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from 'react-router/dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import DashboardPage from './pages/DashboardPage.tsx'
import AppLayout from './layouts/AppLayout.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import ProjectPage from './pages/ProjectPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />
      },
      {
        path: "/projects",
        element: <ProjectsPage />
      },
      {
        path: "/projects/:id",
        element: <ProjectPage />
      },
      {
        path: "/settings",
        element: <SettingsPage />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }

    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
