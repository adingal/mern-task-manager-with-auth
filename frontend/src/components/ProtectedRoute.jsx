import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
