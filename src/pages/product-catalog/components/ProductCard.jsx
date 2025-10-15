import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { cartService } from '../../../services/cartService';
import { userService } from '../../../services/userService';

export function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const { user } = useAuth();
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [error, setError] = useState('');

  // Get primary image or fallback
  const primaryImage = product?.images?.find(img => img?.is_primary) || product?.images?.[0];
  const imageUrl = primaryImage?.image_url || '/assets/images/no_image.png';
  const imageAlt = primaryImage?.alt_text || product?.name || 'Product image';

  // Format price in GTQ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(price || 0);
  };

  const handleAddToCart = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!user) {
      // Redirect to login or show login modal
      window.location.href = '/login';
      return;
    }

    setAddingToCart(true);
    setError('');

    try {
      const { error: cartError } = await cartService?.addToCart(user?.id, product?.id, 1);

      if (cartError) {
        setError(cartError);
      } else {
        // Success callback
        onAddToCart?.(product);
      }
    } catch (err) {
      setError('Error al agregar al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!user) {
      window.location.href = '/login';
      return;
    }

    setAddingToWishlist(true);
    setError('');

    try {
      const { error: wishlistError } = await userService?.addToWishlist(user?.id, product?.id);

      if (wishlistError) {
        setError(wishlistError);
      } else {
        onAddToWishlist?.(product);
      }
    } catch (err) {
      setError('Error al agregar a favoritos');
    } finally {
      setAddingToWishlist(false);
    }
  };

  // Calculate average rating
  const averageRating = product?.reviews?.length > 0 
    ? product?.reviews?.reduce((sum, review) => sum + (review?.rating || 0), 0) / product?.reviews?.length
    : 0;

  const reviewCount = product?.reviews?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {error && (
        <div className="p-2 text-xs text-red-600 bg-red-50 border-b border-red-200">
          {error}
        </div>
      )}
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        
        {product?.featured && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
            Destacado
          </span>
        )}
        
        {product?.compare_at_price && product?.price < product?.compare_at_price && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            Oferta
          </span>
        )}
      </div>
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          {product?.brand?.name && (
            <p className="text-sm text-gray-500">{product?.brand?.name}</p>
          )}
          <h3 className="font-medium text-gray-900 line-clamp-2">
            {product?.name || 'Producto sin nombre'}
          </h3>
        </div>

        {/* Rating */}
        {reviewCount > 0 && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400' :'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-500">
              ({reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product?.price)}
            </span>
            {product?.compare_at_price && product?.price < product?.compare_at_price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product?.compare_at_price)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {(product?.stock_quantity || 0) > 0 ? (
            <span className="text-sm text-green-600">
              En stock ({product?.stock_quantity} disponibles)
            </span>
          ) : (
            <span className="text-sm text-red-600">
              Sin stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || (product?.stock_quantity || 0) <= 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-200"
          >
            {addingToCart ? 'Agregando...' : 'Agregar al Carrito'}
          </button>
          
          <button
            onClick={handleAddToWishlist}
            disabled={addingToWishlist}
            className="p-2 border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors duration-200"
            title="Agregar a favoritos"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}