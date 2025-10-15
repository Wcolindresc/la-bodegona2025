import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { cartService } from '../../services/cartService';
import { CartItem } from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import SavedForLater from './components/SavedForLater';

export default function ShoppingCartPage() {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [cartSummary, setCartSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      loadCartData()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadCartData = async () => {
    if (!user?.id) return
    
    setLoading(true)
    setError('')
    
    try {
      // Load cart items and summary in parallel
      const [itemsResult, summaryResult] = await Promise.all([
        cartService?.getCartItems(user?.id),
        cartService?.getCartSummary(user?.id)
      ])
      
      if (itemsResult?.error) {
        setError(itemsResult?.error)
      } else {
        setCartItems(itemsResult?.items || [])
      }
      
      if (summaryResult?.error) {
        setError(summaryResult?.error)
      } else {
        setCartSummary(summaryResult?.summary)
      }
    } catch (err) {
      setError('Error al cargar el carrito')
    } finally {
      setLoading(false)
    }
  }

  const handleItemUpdate = (updatedItem) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === updatedItem?.id ? updatedItem : item
      )
    )
    // Reload summary to get updated totals
    loadCartSummary()
  }

  const handleItemRemove = (itemId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId))
    // Reload summary to get updated totals
    loadCartSummary()
  }

  const loadCartSummary = async () => {
    if (!user?.id) return
    
    try {
      const { summary, error: summaryError } = await cartService?.getCartSummary(user?.id)
      
      if (summaryError) {
        console.error('Failed to load cart summary:', summaryError)
      } else {
        setCartSummary(summary)
      }
    } catch (err) {
      console.error('Error loading cart summary:', err)
    }
  }

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Mi Carrito de Compras</h1>
            <div className="bg-white rounded-lg shadow-md p-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Inicia sesión para ver tu carrito</h2>
              <p className="text-gray-600 mb-4">
                Para agregar productos al carrito y realizar compras, necesitas tener una cuenta.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="/register"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors duration-200"
                >
                  Crear Cuenta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito de Compras</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse space-y-4">
              {Array.from({ length: 3 })?.map((_, index) => (
                <div key={index} className="flex items-center space-x-4 py-4 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito de Compras</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-center">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg font-medium text-red-800 mb-2">Error al cargar el carrito</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={loadCartData}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Empty cart state
  if (!cartItems?.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito de Compras</h1>
          <EmptyCart />
          <SavedForLater 
            savedItems={[]} 
            onMoveToCart={() => {}} 
            onRemoveFromSaved={() => {}} 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito de Compras</h1>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Productos ({cartItems?.length || 0})
              </h2>
              
              <div className="space-y-0">
                {cartItems?.map((item) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                    onUpdate={handleItemUpdate}
                    onRemove={handleItemRemove}
                  />
                ))}
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="/product-catalog"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continuar Comprando
                </a>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0">
            {cartSummary && (
              <OrderSummary 
                summary={cartSummary}
                subtotal={cartSummary?.subtotal || 0}
                shipping={cartSummary?.shipping || 0}
                tax={cartSummary?.tax || 0}
                discount={cartSummary?.discount || 0}
                total={cartSummary?.total || 0}
                onApplyPromoCode={() => {}}
                onCheckout={() => {
                  // Navigate to checkout
                  window.location.href = '/checkout'
                }}
              />
            )}
          </div>
        </div>

        {/* Saved for Later */}
        <div className="mt-12">
          <SavedForLater 
            savedItems={[]} 
            onMoveToCart={() => {}} 
            onRemoveFromSaved={() => {}} 
          />
        </div>
      </div>
    </div>
  );
}