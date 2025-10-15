import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedProducts = () => {
  const recommendedProducts = [
    {
      id: 1,
      name: "Smartphone Samsung Galaxy A54",
      price: "Q 2,499.00",
      originalPrice: "Q 2,799.00",
      discount: 11,
      image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
      rating: 4.5,
      reviews: 128,
      category: "Electrónicos",
      inStock: true,
      isNew: false,
      isFavorite: true
    },
    {
      id: 2,
      name: "Cafetera Automática Delonghi",
      price: "Q 1,899.00",
      originalPrice: null,
      discount: 0,
      image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
      rating: 4.8,
      reviews: 89,
      category: "Hogar",
      inStock: true,
      isNew: true,
      isFavorite: false
    },
    {
      id: 3,
      name: "Zapatillas Nike Air Max",
      price: "Q 899.00",
      originalPrice: "Q 1,099.00",
      discount: 18,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      rating: 4.3,
      reviews: 256,
      category: "Deportes",
      inStock: true,
      isNew: false,
      isFavorite: false
    },
    {
      id: 4,
      name: "Auriculares Bluetooth Sony",
      price: "Q 649.00",
      originalPrice: "Q 799.00",
      discount: 19,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      rating: 4.6,
      reviews: 174,
      category: "Electrónicos",
      inStock: false,
      isNew: false,
      isFavorite: true
    }
  ];

  const handleAddToCart = (productId) => {
    // Mock add to cart functionality
    console.log(`Adding product ${productId} to cart`);
  };

  const handleToggleFavorite = (productId) => {
    // Mock toggle favorite functionality
    console.log(`Toggling favorite for product ${productId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-amber-400 fill-current opacity-50" />
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
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-card-foreground">
            Recomendado para ti
          </h2>
          <p className="text-sm text-text-secondary font-body mt-1">
            Basado en tu historial de compras y navegación
          </p>
        </div>
        <Link to="/product-catalog">
          <Button variant="outline" size="sm">
            Ver más
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts?.map((product) => (
          <div key={product?.id} className="group border border-border rounded-lg overflow-hidden hover:shadow-soft-lg transition-all duration-200">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {product?.isNew && (
                  <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
                    Nuevo
                  </span>
                )}
                {product?.discount > 0 && (
                  <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                    -{product?.discount}%
                  </span>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => handleToggleFavorite(product?.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon 
                  name="Heart" 
                  size={16} 
                  className={product?.isFavorite ? "text-red-500 fill-current" : "text-gray-400"} 
                />
              </button>

              {/* Quick Actions Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Link to={`/product-details/${product?.id}`}>
                  <Button variant="secondary" size="sm">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs text-text-secondary font-body uppercase tracking-wide">
                  {product?.category}
                </span>
              </div>

              <h3 className="font-body font-medium text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {product?.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-sm text-text-secondary font-body">
                  ({product?.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg font-heading font-bold text-card-foreground">
                  {product?.price}
                </span>
                {product?.originalPrice && (
                  <span className="text-sm text-text-secondary font-body line-through">
                    {product?.originalPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                variant={product?.inStock ? "default" : "outline"}
                size="sm"
                fullWidth
                disabled={!product?.inStock}
                onClick={() => handleAddToCart(product?.id)}
              >
                {product?.inStock ? (
                  <>
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Agregar al carrito
                  </>
                ) : (
                  <>
                    <Icon name="AlertCircle" size={16} className="mr-2" />
                    Agotado
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;