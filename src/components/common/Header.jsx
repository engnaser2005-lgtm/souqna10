import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown, User, LogOut, Store, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { user, profile, isAuthenticated, isSeller, isAdmin, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleLogout = async () => {
    await signOut()
    setUserMenuOpen(false)
    navigate('/')
  }

  const categories = [
    { name: 'الإلكترونيات', slug: 'electronics' },
    { name: 'الأزياء', slug: 'fashion' },
    { name: 'الجمال', slug: 'beauty' },
    { name: 'السيارات', slug: 'vehicles' },
    { name: 'البيت والمطبخ', slug: 'home' },
    { name: 'الأم والطفل', slug: 'baby' },
    { name: 'السوبر ماركت', slug: 'grocery' },
    { name: 'الكتب', slug: 'books' },
    { name: 'الحيوانات', slug: 'pets' },
  ]

  const marketingSections = [
    { name: 'الأكثر مبيعاً', path: '/best-selling' },
    { name: 'عروض وخصومات', path: '/offers' },
    { name: 'وصل حديثاً', path: '/new-arrivals' },
    { name: 'تصفية المخزون', path: '/clearance' },
    { name: 'مميز لك', path: '/featured' },
  ]

  return (
    <header className="bg-header border-b-2 border-gold sticky top-0 z-50">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Store className="w-8 h-8 text-gold" />
            <span className="text-2xl font-bold text-gold">سوقنا</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="w-full bg-primary border border-secondary rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-text-secondary focus:border-gold focus:outline-none"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gold" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-gold" />
                </Link>
                <Link to="/cart" className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
                  <ShoppingCart className="w-5 h-5 text-gold" />
                </Link>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5 text-gold" />
                    <span className="hidden sm:inline text-sm font-medium">{profile?.username || user?.email?.split('@')[0]}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute left-0 top-full mt-2 w-56 bg-card border border-gold rounded-xl shadow-xl overflow-hidden">
                      <div className="p-3 border-b border-secondary">
                        <p className="font-bold text-gold">{profile?.username}</p>
                        <p className="text-xs text-text-secondary">{profile?.account_type === 'seller' ? 'بائع' : profile?.account_type === 'admin' ? 'أدمن' : 'مشتري'}</p>
                      </div>
                      <div className="p-2">
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors">
                          <User className="w-4 h-4" />
                          <span>الملف الشخصي</span>
                        </Link>
                        {isSeller && (
                          <Link to="/seller/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                            <span>لوحة البائع</span>
                          </Link>
                        )}
                        {isAdmin && (
                          <Link to="/admin/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                            <span>لوحة الأدمن</span>
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-danger/20 text-danger rounded-lg transition-colors text-right"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>تسجيل الخروج</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-1.5 px-4">تسجيل الدخول</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5 px-4">إنشاء حساب</Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden md:block border-t border-secondary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-6 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="hover:text-gold transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-secondary">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث..."
                className="w-full bg-primary border border-secondary rounded-lg pl-12 pr-4 py-2 text-white"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gold" />
              </button>
            </form>
            
            <div className="space-y-2">
              <p className="text-gold font-bold text-sm mb-2">الأقسام</p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-gold transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-gold font-bold text-sm mb-2">تسوق حسب</p>
              {marketingSections.map((section) => (
                <Link
                  key={section.path}
                  to={section.path}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-gold transition-colors"
                >
                  {section.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
