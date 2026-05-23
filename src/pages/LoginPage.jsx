import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Store } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/common/Layout'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    const result = await signIn(email, password)
    setLoading(false)

    if (result.success) {
      navigate('/')
    }
  }

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <div className="card p-8">
          <div className="text-center mb-8">
            <Store className="w-12 h-12 text-gold mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gold">تسجيل الدخول</h1>
            <p className="text-text-secondary mt-2">أهلاً بك مجدداً في سوقنا</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pr-12"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12 pl-12"
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-secondary bg-primary" />
                <span className="text-text-secondary">تذكرني</span>
              </label>
              <Link to="/forgot-password" className="text-gold hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-text-secondary">أو</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-secondary rounded-lg py-3 hover:bg-secondary transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            الدخول بحساب Google
          </button>

          <p className="text-center mt-6 text-sm text-text-secondary">
            ليس لديك حساب؟{' '}
            <Link to="/register" className="text-gold hover:underline font-medium">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage
