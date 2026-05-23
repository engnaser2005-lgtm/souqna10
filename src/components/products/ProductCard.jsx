import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, MessageCircle, Star } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth()
  
  const finalPrice = product.discount_percentage > 0
    ? product.price * (1 - product.discount_percentage / 100)
    : product.price

  return (
    <div className="card group">
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={product.cover_image || '/placeholder-product.jpg'}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.discount_percentage > 0 && (
          <span className="absolute top-2 right-2 bg-danger text-white text-xs font-bold px-2 py-1 rounded">
            خصم {product.discount_percentage}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-gold text-primary text-xs font-bold px-2 py-1 rounded">
            مميز
          </span>
        )}
        <button className="absolute bottom-2 left-2 p-2 bg-primary/80 rounded-lg hover:bg-danger transition-colors opacity-0 group-hover:opacity-100">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <Link to={`/product/${product.id}`}>
        <h3 className="font-bold text-lg mb-2 hover:text-gold transition-colors line-clamp-2">
          {product.title}
        </h3>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.round(product.average_rating || 0) ? 'text-gold fill-gold' : 'text-secondary'}`}
          />
        ))}
        <span className="text-xs text-text-secondary mr-1">({product.total_reviews || 0})</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gold font-bold text-xl">{finalPrice.toFixed(2)} ر.س</span>
        {product.discount_percentage > 0 && (
          <span className="text-text-secondary line-through text-sm">{product.price} ر.س</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          to={isAuthenticated ? `/checkout/${product.id}` : '/login'}
          className="btn-primary flex-1 text-center text-sm py-2 flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-4 h-4" />
          شراء
        </Link>
        <Link
          to={isAuthenticated ? `/inquiry/${product.id}` : '/login'}
          className="btn-secondary flex-1 text-center text-sm py-2 flex items-center justify-center gap-1"
        >
          <MessageCircle className="w-4 h-4" />
          استعلام
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
