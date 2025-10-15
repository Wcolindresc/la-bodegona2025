import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Smartphone Samsung Galaxy A54",
      price: 2499.99,
      originalPrice: 2799.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      category: "Electrónicos",
      rating: 4.5,
      isNew: true
    },
    {
      id: 2,
      name: "Cafetera Espresso Delonghi",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      category: "Hogar",
      rating: 4.8,
      discount: 15
    },
    {
      id: 3,
      name: "Zapatillas Nike Air Max",
      price: 899.99,
      originalPrice: 1099.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      category: "Deportes",
      rating: 4.6,
      isPopular: true
    }
  ];

  const categories = [
    { name: "Electrónicos", icon: "Smartphone", path: "/product-catalog?category=electronics" },
    { name: "Hogar y Jardín", icon: "Home", path: "/product-catalog?category=home" },
    { name: "Deportes", icon: "Dumbbell", path: "/product-catalog?category=sports" },
    { name: "Moda", icon: "Shirt", path: "/product-catalog?category=fashion" },
    { name: "Libros", icon: "Book", path: "/product-catalog?category=books" },
    { name: "Juguetes", icon: "Gamepad2", path: "/product-catalog?category=toys" }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(price);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Empty State Illustration */}
      <div className="text-center mb-12">
        <div className="w-48 h-48 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={80} className="text-text-secondary" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-card-foreground mb-4">
          Tu carrito está vacío
        </h1>
        
        <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
          ¡Descubre miles de productos increíbles y encuentra exactamente lo que necesitas!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="default"
            size="lg"
            iconName="Search"
            iconPosition="left"
            iconSize={20}
          >
            <Link to="/product-catalog">
              Explorar Productos
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            iconName="Sparkles"
            iconPosition="left"
            iconSize={20}
          >
            <Link to="/product-catalog?featured=true">
              Ver Ofertas Especiales
            </Link>
          </Button>
        </div>
      </div>
      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-heading font-semibold text-card-foreground mb-6 text-center">
          Explora por Categorías
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.map((category, index) => (
            <Link
              key={index}
              to={category?.path}
              className="group bg-card border border-border rounded-lg p-4 text-center hover:border-primary hover:shadow-soft-md transition-all duration-200"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <Icon 
                  name={category?.icon} 
                  size={24} 
                  className="text-primary" 
                />
              </div>
              <h3 className="text-sm font-body font-medium text-card-foreground group-hover:text-primary transition-colors duration-200">
                {category?.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      {/* Featured Products */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-semibold text-card-foreground">
            Productos Destacados
          </h2>
          <Button
            asChild
            variant="ghost"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={18}
          >
            <Link to="/product-catalog?featured=true">
              Ver todos
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts?.map((product) => (
            <div key={product?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-soft-lg transition-all duration-200 group">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-muted overflow-hidden">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product?.isNew && (
                    <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-md">
                      NUEVO
                    </span>
                  )}
                  {product?.discount && (
                    <span className="bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded-md">
                      -{product?.discount}%
                    </span>
                  )}
                  {product?.isPopular && (
                    <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-md">
                      POPULAR
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-md">
                    {product?.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-accent fill-current" />
                    <span className="text-xs text-text-secondary">{product?.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-body font-medium text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {product?.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-heading font-bold text-primary">
                      {formatPrice(product?.price)}
                    </div>
                    {product?.originalPrice && (
                      <div className="text-sm text-text-secondary line-through">
                        {formatPrice(product?.originalPrice)}
                      </div>
                    )}
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    <Link to={`/product-details/${product?.id}`}>
                      Agregar
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Help Section */}
      <div className="bg-muted rounded-lg p-6 text-center">
        <Icon name="Headphones" size={48} className="text-primary mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2">
          ¿Necesitas ayuda?
        </h3>
        <p className="text-text-secondary mb-4">
          Nuestro equipo de atención al cliente está aquí para ayudarte
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={18}
          >
            Chat en vivo
          </Button>
          <Button
            variant="outline"
            iconName="Phone"
            iconPosition="left"
            iconSize={18}
          >
            Llamar: +502 2345-6789
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;