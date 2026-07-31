import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from 'react-router/dom'
import DashboardPage from './pages/DashboardPage.tsx'
import AppLayout from './layouts/AppLayout.tsx'
import LoginPage from './pages/LoginPage.tsx'
import TasksPage from './pages/TasksPage.tsx'
import NotesPage from './pages/NotesPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

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
        path: "/tasks",
        element: <TasksPage />
      },
      {
        path: "/notes",
        element: <NotesPage />
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

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
