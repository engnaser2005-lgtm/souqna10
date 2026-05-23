import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes - will add in next phases */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <div className="container mx-auto px-4 py-12 text-center">
              <h1 className="text-2xl text-gold">الملف الشخصي (قيد التطوير)</h1>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/seller/dashboard" element={
          <ProtectedRoute allowedRoles={['seller', 'admin']}>
            <div className="container mx-auto px-4 py-12 text-center">
              <h1 className="text-2xl text-gold">لوحة البائع (قيد التطوير)</h1>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="container mx-auto px-4 py-12 text-center">
              <h1 className="text-2xl text-gold">لوحة الأدمن (قيد التطوير)</h1>
            </div>
          </ProtectedRoute>
        } />

        {/* Placeholder routes for categories and other pages */}
        <Route path="/category/:slug" element={
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl text-gold">صفحة القسم (قيد التطوير)</h1>
          </div>
        } />
        
        <Route path="/product/:id" element={
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl text-gold">تفاصيل المنتج (قيد التطوير)</h1>
          </div>
        } />
        
        <Route path="/search" element={
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl text-gold">البحث (قيد التطوير)</h1>
          </div>
        } />
        
        <Route path="*" element={
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl text-gold mb-4">404</h1>
            <p className="text-text-secondary">الصفحة غير موجودة</p>
          </div>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes
