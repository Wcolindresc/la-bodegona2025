import { useState, useEffect } from 'react';
import { productService } from '../../../services/productService';
import { ProductCard } from './ProductCard';

export function ProductGrid({ filters = {}, onProductSelect }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { products: productData, error: productError } = await productService?.getProducts(filters)
      
      if (productError) {
        setError(productError)
      } else {
        setProducts(productData || [])
      }
    } catch (err) {
      setError('Error al cargar los productos')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    // Show success message or update cart UI
    console.log('Added to cart:', product?.name)
    // Could trigger a toast notification here
  }

  const handleAddToWishlist = (product) => {
    // Show success message or update wishlist UI
    console.log('Added to wishlist:', product?.name)
    // Could trigger a toast notification here
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Loading skeleton */}
        {Array.from({ length: 8 })?.map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">Error al cargar productos</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadProducts}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m-4 6h4m0 0V9a2 2 0 012-2h2m-4 6h4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600">
            No hay productos que coincidan con los filtros seleccionados.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <div 
          key={product?.id} 
          onClick={() => onProductSelect?.(product)}
          className="cursor-pointer"
        >
          <ProductCard
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        </div>
      ))}
    </div>
  );
}