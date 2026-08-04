import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { Provider } from 'react-redux'
import store from './store'

import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import UserHome from './pages/UserHome.jsx'
import CreateUser from './pages/CreateUser.jsx'
import NotFound from './pages/NotFound.jsx'

import Loader from './components/Loader.jsx'
import Modal from './components/Modal.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <UserHome />
      </ProtectedRoute>
    ),
  }, // users
  {
    path: '/user/create',
    element: (
      <ProtectedRoute>
        <CreateUser />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <NotFound /> },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Loader />
    <Modal />
  </Provider>,
)
