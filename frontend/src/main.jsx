import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { Provider } from 'react-redux'
import store from './store'

import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import UserHome from './pages/UserHome.jsx'

import Loader from './components/Loader.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> }, // login
  { path: '/admin', element: <Admin /> }, // admin
  { path: '/home', element: <UserHome /> }, // users
  { path: '/signup', element: <App /> }, // signup
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Loader />
  </Provider>,
)
