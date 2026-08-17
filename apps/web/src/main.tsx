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
import TaskDetailsPage from './pages/TaskDetailsPage.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { ThemeProvider } from './components/common/theme-provider.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        handle: {
          breadcrumb: "Dashboard"
        },
        element: <DashboardPage />
      },
      {
        path: "projects",
        handle: {
          breadcrumb: "Projects"
        },
        children: [
          {
            index: true,
            element: <ProjectsPage />,
          },
          {
            path: ":projectId",
            handle: {
              breadcrumb: "project"
            },
            children: [
              {
                index: true,
                element: <ProjectPage />,
              },
              {
                path: "tasks/:taskId",
                handle: {
                  breadcrumb: "task"
                },
                element: <TaskDetailsPage />
              },

            ]
          },
        ]
      },

      {
        path: "/settings",
        handle: {
          breadcrumb: "Settings"
        },
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
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
