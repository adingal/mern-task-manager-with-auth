import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import UserHome from './pages/UserHome.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> }, // login
  { path: '/admin', element: <Admin /> }, // admin
  { path: '/home', element: <UserHome /> }, // users
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
