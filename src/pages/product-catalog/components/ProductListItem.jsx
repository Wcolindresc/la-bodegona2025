import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductListItem = ({ product, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      onAddToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft hover:shadow-soft-lg transition-all duration-300 p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-muted rounded-lg">
          <Link to={`/product-details?id=${product?.id}`}>
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-1 left-1 flex flex-col gap-1">
            {product?.isNew && (
              <span className="bg-success text-success-foreground text-xs font-medium px-1.5 py-0.5 rounded-full">
                Nuevo
              </span>
            )}
            {product?.discount > 0 && (
              <span className="bg-error text-error-foreground text-xs font-medium px-1.5 py-0.5 rounded-full">
                -{product?.discount}%
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 min-w-0">
              {/* Category */}
              <p className="text-xs text-text-secondary font-medium mb-1 uppercase tracking-wide">
                {product?.category}
              </p>

              {/* Product Name */}
              <Link to={`/product-details?id=${product?.id}`}>
                <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
                  {product?.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-sm text-text-secondary">
                  ({product?.reviewCount})
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                {product?.description}
              </p>
            </div>

            {/* Wishlist Button */}
            <button className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors duration-200 ml-2">
              <Icon name="Heart" size={16} className="text-gray-600 hover:text-error" />
            </button>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-card-foreground">
                {formatPrice(product?.price)}
              </span>
              {product?.originalPrice && product?.originalPrice > product?.price && (
                <span className="text-sm text-text-secondary line-through">
                  {formatPrice(product?.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Stock Status */}
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                product?.stock > 10 
                  ? 'bg-success/10 text-success' 
                  : product?.stock > 0 
                    ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
              }`}>
                {product?.stock === 0 ? 'Agotado' : `${product?.stock} disponibles`}
              </span>

              {/* Add to Cart Button */}
              <Button
                variant="default"
                size="sm"
                onClick={handleAddToCart}
                disabled={product?.stock === 0 || isLoading}
                loading={isLoading}
                iconName="ShoppingCart"
                iconPosition="left"
              >
                {product?.stock === 0 ? 'Agotado' : 'Agregar'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;