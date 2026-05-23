import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
      </div>
    )
  }

  if (!isAuthenticated) {
    toast.error('يجب تسجيل الدخول أولاً')
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(profile?.account_type)) {
    toast.error('ليس لديك صلاحية الوصول')
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
