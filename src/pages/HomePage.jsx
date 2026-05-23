import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { TrendingUp, Tag, Clock, AlertTriangle, Star, ChevronLeft } from 'lucide-react'
import { supabase } from '../services/supabase'
import Layout from '../components/common/Layout'
import ProductCard from '../components/products/ProductCard'
import { ProductSkeleton } from '../components/ui/Skeleton'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [activeSection])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_hidden', false)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(12)

      if (activeSection === 'best-selling') {
        query = supabase.from('products').select('*').eq('is_hidden', false).eq('is_approved', true).order('orders_count', { ascending: false }).limit(12)
      } else if (activeSection === 'offers') {
        query = supabase.from('products').select('*').eq('is_hidden', false).eq('is_approved', true).gt('discount_percentage', 0).limit(12)
      } else if (activeSection === 'new-arrivals') {
        query = supabase.from('products').select('*').eq('is_hidden', false).eq('is_approved', true).order('created_at', { ascending: false }).limit(12)
      } else if (activeSection === 'clearance') {
        query = supabase.from('products').select('*').eq('is_hidden', false).eq('is_approved', true).lte('quantity', 5).limit(12)
      } else if (activeSection === 'featured') {
        query = supabase.from('products').select('*').eq('is_hidden', false).eq('is_approved', true).eq('featured', true).limit(12)
      }

      const { data, error } = await query
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { name: 'الإلكترونيات', slug: 'electronics', icon: '📱' },
    { name: 'الأزياء', slug: 'fashion', icon: '👕' },
    { name: 'الجمال', slug: 'beauty', icon: '💄' },
    { name: 'السيارات', slug: 'vehicles', icon: '🚗' },
    { name: 'البيت والمطبخ', slug: 'home', icon: '🏠' },
    { name: 'الأم والطفل', slug: 'baby', icon: '👶' },
    { name: 'السوبر ماركت', slug: 'grocery', icon: '🛒' },
    { name: 'الكتب', slug: 'books', icon: '📚' },
    { name: 'الحيوانات', slug: 'pets', icon: '🐾' },
  ]

  const marketingSections = [
    { id: 'best-selling', name: 'الأكثر مبيعاً', icon: TrendingUp },
    { id: 'offers', name: 'عروض وخصومات', icon: Tag },
    { id: 'new-arrivals', name: 'وصل حديثاً', icon: Clock },
    { id: 'clearance', name: 'تصفية المخزون', icon: AlertTriangle },
    { id: 'featured', name: 'مميز لك', icon: Star },
  ]

  return (
    <Layout>
      <Helmet>
        <title>سوقنا - Souqna | السوق الإلكتروني المتعدد البائعين</title>
        <meta name="description" content="تسوق من مجموعة واسعة من المنتجات من بائعين موثوقين" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-l from-card to-primary rounded-2xl p-8 mb-8 border border-secondary overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            اكتشف منتجات مميزة
          </h1>
          <p className="text-text-secondary text-lg mb-6">
            تسوق من آلاف المنتجات من بائعين موثوقين في مكان واحد
          </p>
          <Link to="/search" className="btn-primary inline-flex items-center gap-2">
            استكشف المنتجات
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute left-0 top-0 w-1/3 h-full opacity-10">
          <div className="w-full h-full bg-gold rounded-full blur-3xl transform translate-x-1/2" />
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Right Sidebar - Categories */}
        <aside className="lg:w-64 shrink-0 space-y-4 order-1 lg:order-3">
          <div className="card sticky top-24">
            <h2 className="text-gold font-bold text-lg mb-4 border-b border-secondary pb-2">الأقسام</h2>
            <div className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-secondary rounded-lg transition-colors group"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="group-hover:text-gold transition-colors">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="card sticky top-[calc(6rem+16rem)]">
            <h2 className="text-gold font-bold text-lg mb-4 border-b border-secondary pb-2">تسوق حسب</h2>
            <div className="space-y-1">
              {marketingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activeSection === section.id ? 'bg-gold/20 text-gold' : 'hover:bg-secondary'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span>{section.name}</span>
                </button>
              ))}
              <button
                onClick={() => setActiveSection('all')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeSection === 'all' ? 'bg-gold/20 text-gold' : 'hover:bg-secondary'
                }`}
              >
                <Star className="w-5 h-5" />
                <span>الكل</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content - Products Grid */}
        <div className="flex-1 order-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gold">
              {activeSection === 'all' ? 'أحدث المنتجات' : 
               activeSection === 'best-selling' ? 'الأكثر مبيعاً' :
               activeSection === 'offers' ? 'عروض وخصومات' :
               activeSection === 'new-arrivals' ? 'وصل حديثاً' :
               activeSection === 'clearance' ? 'تصفية المخزون' : 'منتجات مميزة'}
            </h2>
            <Link to="/search" className="text-gold hover:underline text-sm flex items-center gap-1">
              عرض الكل
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">لا توجد منتجات في هذا القسم حالياً</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
