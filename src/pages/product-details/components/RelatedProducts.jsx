import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RelatedProducts = ({ currentProductId, category }) => {
  const relatedProducts = [
    {
      id: 2,
      name: "Smartphone Samsung Galaxy A54",
      price: 2499.99,
      originalPrice: 2799.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      rating: 4.6,
      reviewCount: 89,
      category: "Electrónicos",
      isNew: false,
      stock: 15,
      discount: 11
    },
    {
      id: 3,
      name: "Auriculares Bluetooth Sony WH-1000XM4",
      price: 1899.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      rating: 4.8,
      reviewCount: 156,
      category: "Electrónicos",
      isNew: true,
      stock: 8,
      discount: 0
    },
    {
      id: 4,
      name: "Laptop HP Pavilion 15",
      price: 4299.99,
      originalPrice: 4799.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      rating: 4.4,
      reviewCount: 67,
      category: "Electrónicos",
      isNew: false,
      stock: 5,
      discount: 10
    },
    {
      id: 5,
      name: "Smartwatch Apple Watch Series 9",
      price: 3199.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
      rating: 4.9,
      reviewCount: 203,
      category: "Electrónicos",
      isNew: true,
      stock: 12,
      discount: 0
    },
    {
      id: 6,
      name: "Tablet iPad Air 10.9",
      price: 3899.99,
      originalPrice: 4199.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      rating: 4.7,
      reviewCount: 134,
      category: "Electrónicos",
      isNew: false,
      stock: 20,
      discount: 7
    }
  ]?.filter(product => product?.id !== currentProductId);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    })?.format(price);
  };

  const handleQuickAdd = (productId) => {
    // Mock quick add to cart functionality
    console.log(`Quick add product ${productId} to cart`);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-accent fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-text-primary">
          Productos Relacionados
        </h2>
        <Link
          to={`/product-catalog?category=${encodeURIComponent(category)}`}
          className="text-primary hover:text-primary/80 text-sm font-body font-medium transition-colors duration-200"
        >
          Ver todos en {category}
        </Link>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {relatedProducts?.map((product) => (
          <div
            key={product?.id}
            className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-soft-lg transition-all duration-300 group"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Link to={`/product-details?id=${product?.id}`}>
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 space-y-1">
                {product?.isNew && (
                  <span className="bg-accent text-accent-foreground text-xs font-caption px-2 py-1 rounded-md">
                    Nuevo
                  </span>
                )}
                {product?.discount > 0 && (
                  <span className="bg-error text-error-foreground text-xs font-caption px-2 py-1 rounded-md">
                    -{product?.discount}%
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-white/90 hover:bg-white shadow-soft"
                >
                  <Icon name="Heart" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-white/90 hover:bg-white shadow-soft"
                >
                  <Icon name="Eye" size={14} />
                </Button>
              </div>

              {/* Quick Add Button */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={() => handleQuickAdd(product?.id)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  disabled={product?.stock === 0}
                >
                  {product?.stock === 0 ? 'Agotado' : 'Agregar'}
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
              {/* Category */}
              <span className="text-xs font-caption text-text-secondary">
                {product?.category}
              </span>

              {/* Product Name */}
              <Link to={`/product-details?id=${product?.id}`}>
                <h3 className="text-sm font-body font-medium text-text-primary line-clamp-2 hover:text-primary transition-colors duration-200">
                  {product?.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-0.5">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-xs text-text-secondary">
                  ({product?.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-heading font-bold text-primary">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-caption ${
                  product?.stock > 10 
                    ? 'text-success' 
                    : product?.stock > 0 
                      ? 'text-warning' :'text-error'
                }`}>
                  {product?.stock === 0 
                    ? 'Agotado' 
                    : product?.stock <= 5 
                      ? `Solo ${product?.stock}` 
                      : 'En stock'
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="text-center pt-4">
        <Link to={`/product-catalog?category=${encodeURIComponent(category)}`}>
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Ver más productos en {category}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;