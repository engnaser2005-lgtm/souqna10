import { Link } from 'react-router-dom'
import { Store, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-header border-t-2 border-gold mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Store className="w-8 h-8 text-gold" />
              <span className="text-2xl font-bold text-gold">سوقنا</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              منصة سوق إلكتروني متعدد البائعين، نوفر لك تجربة تسوق آمنة وسهلة مع مجموعة واسعة من المنتجات.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link></li>
              <li><Link to="/search" className="hover:text-gold transition-colors">البحث</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">من نحن</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gold font-bold mb-4">الأقسام</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/electronics" className="hover:text-gold transition-colors">الإلكترونيات</Link></li>
              <li><Link to="/category/fashion" className="hover:text-gold transition-colors">الأزياء</Link></li>
              <li><Link to="/category/beauty" className="hover:text-gold transition-colors">الجمال</Link></li>
              <li><Link to="/category/home" className="hover:text-gold transition-colors">البيت والمطبخ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>support@souqna.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-gold hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-gold hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-gold hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary mt-8 pt-8 text-center text-sm text-text-secondary">
          <p>© 2024 سوقنا - Souqna. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
