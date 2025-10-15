import { useState } from 'react';
import { cartService } from '../../../services/cartService';

export function CartItem({ item, onUpdate, onRemove }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Get product data with optional chaining
  const product = item?.product
  const primaryImage = product?.images?.find(img => img?.is_primary) || product?.images?.[0]
  const imageUrl = primaryImage?.image_url || '/assets/images/no_image.png'
  
  // Format price in GTQ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(price || 0);
  }

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > (product?.stock_quantity || 0)) return
    
    setLoading(true)
    setError('')
    
    try {
      const { error: updateError } = await cartService?.updateCartItem(item?.id, newQuantity)
      
      if (updateError) {
        setError(updateError)
      } else {
        onUpdate?.({ ...item, quantity: newQuantity })
      }
    } catch (err) {
      setError('Error al actualizar cantidad')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { error: removeError } = await cartService?.removeFromCart(item?.id)
      
      if (removeError) {
        setError(removeError)
      } else {
        onRemove?.(item?.id)
      }
    } catch (err) {
      setError('Error al eliminar producto')
    } finally {
      setLoading(false)
    }
  }

  const subtotal = (product?.price || 0) * (item?.quantity || 0)

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      {error && (
        <div className="w-full p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded mb-2">
          {error}
        </div>
      )}
      
      {/* Product Image */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={imageUrl}
          alt={product?.name || 'Product'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product?.name || 'Producto sin nombre'}
        </h3>
        
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            {formatPrice(product?.price)}
          </span>
          
          {/* Stock status */}
          {(product?.stock_quantity || 0) <= (item?.quantity || 0) && (
            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
              Stock limitado
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange((item?.quantity || 1) - 1)}
          disabled={loading || (item?.quantity || 0) <= 1}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="w-8 text-center text-sm font-medium">
          {item?.quantity || 0}
        </span>
        
        <button
          onClick={() => handleQuantityChange((item?.quantity || 0) + 1)}
          disabled={loading || (item?.quantity || 0) >= (product?.stock_quantity || 0)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Subtotal */}
      <div className="flex-shrink-0 text-sm font-medium text-gray-900">
        {formatPrice(subtotal)}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="flex-shrink-0 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        title="Eliminar producto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}