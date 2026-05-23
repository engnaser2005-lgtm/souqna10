import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Store, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/common/Layout'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'buyer',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      // toast error handled by hook or add manually
      return
    }

    if (formData.password.length < 6) {
      return
    }

    setLoading(true)
    const result = await signUp(formData.email, formData.password, formData.fullName, formData.accountType)
    setLoading(false)

    if (result.success) {
      navigate('/')
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <div className="card p-8">
          <div className="text-center mb-8">
            <Store className="w-12 h-12 text-gold mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gold">إنشاء حساب جديد</h1>
            <p className="text-text-secondary mt-2">انضم إلى سوقنا اليوم</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="محمد أحمد"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نوع الحساب</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, accountType: 'buyer' })}
                  className={`py-3 rounded-lg border transition-colors ${
                    formData.accountType === 'buyer'
                      ? 'border-gold bg-gold/20 text-gold'
                      : 'border-secondary hover:border-gold'
                  }`}
                >
                  مشتري
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, accountType: 'seller' })}
                  className={`py-3 rounded-lg border transition-colors ${
                    formData.accountType === 'seller'
                      ? 'border-gold bg-gold/20 text-gold'
                      : 'border-secondary hover:border-gold'
                  }`}
                >
                  بائع
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pr-12 pl-12"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-text-secondary" /> : <Eye className="w-5 h-5 text-text-secondary" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-text-secondary">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-gold hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterPage
