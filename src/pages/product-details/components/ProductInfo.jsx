import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    })?.format(price);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart({
        productId: product?.id,
        variant: selectedVariant,
        quantity
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const getStockStatus = () => {
    if (product?.stock === 0) {
      return { text: 'Agotado', color: 'text-error', bgColor: 'bg-error/10' };
    } else if (product?.stock <= 5) {
      return { text: `Solo ${product?.stock} disponibles`, color: 'text-warning', bgColor: 'bg-warning/10' };
    } else {
      return { text: 'En stock', color: 'text-success', bgColor: 'bg-success/10' };
    }
  };

  const stockStatus = getStockStatus();

  const variantOptions = product?.variants?.map(variant => ({
    value: variant?.id,
    label: `${variant?.name} - ${formatPrice(variant?.price)}`,
    description: variant?.description
  })) || [];

  return (
    <div className="space-y-6">
      {/* Product Title and Category */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-caption text-text-secondary bg-muted px-2 py-1 rounded-md">
            {product?.category}
          </span>
          {product?.isNew && (
            <span className="text-sm font-caption text-accent bg-accent/10 px-2 py-1 rounded-md">
              Nuevo
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
          {product?.name}
        </h1>
        <p className="text-text-secondary font-body leading-relaxed">
          {product?.shortDescription}
        </p>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)]?.map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={16}
              className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-border'}
            />
          ))}
          <span className="text-sm font-body text-text-secondary ml-1">
            {product?.rating}
          </span>
        </div>
        <span className="text-sm text-text-secondary">
          ({product?.reviewCount} reseñas)
        </span>
      </div>
      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-heading font-bold text-primary">
            {formatPrice(selectedVariant?.price || product?.price)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-lg text-text-secondary line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-sm font-caption text-error bg-error/10 px-2 py-1 rounded-md">
              -{Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}%
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary">
          Precio incluye IVA • Envío calculado al finalizar compra
        </p>
      </div>
      {/* Stock Status */}
      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg ${stockStatus?.bgColor}`}>
        <Icon 
          name={product?.stock > 0 ? "Check" : "X"} 
          size={16} 
          className={stockStatus?.color}
        />
        <span className={`text-sm font-body font-medium ${stockStatus?.color}`}>
          {stockStatus?.text}
        </span>
      </div>
      {/* Variants Selection */}
      {product?.variants && product?.variants?.length > 0 && (
        <div className="space-y-3">
          <Select
            label="Seleccionar variante"
            options={variantOptions}
            value={selectedVariant?.id}
            onChange={(value) => {
              const variant = product?.variants?.find(v => v?.id === value);
              setSelectedVariant(variant);
            }}
            className="w-full"
          />
        </div>
      )}
      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-body font-medium text-text-primary">
          Cantidad
        </label>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-r-none"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <div className="w-16 h-10 flex items-center justify-center border-x border-border bg-input">
              <span className="text-sm font-body font-medium">{quantity}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.stock}
              className="w-10 h-10 rounded-l-none"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          <span className="text-sm text-text-secondary">
            Máximo {product?.stock} unidades
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isAddingToCart}
          disabled={product?.stock === 0}
          onClick={handleAddToCart}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          {product?.stock === 0 ? 'Producto Agotado' : 'Agregar al Carrito'}
        </Button>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onAddToWishlist}
            iconName="Heart"
            iconPosition="left"
          >
            Agregar a Favoritos
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="Share2"
          >
            Compartir
          </Button>
        </div>
      </div>
      {/* Product Features */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h3 className="text-sm font-body font-semibold text-text-primary">
          Características destacadas:
        </h3>
        <ul className="space-y-2">
          {product?.features?.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Delivery Info */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Truck" size={18} className="text-primary" />
          <div>
            <p className="text-sm font-body font-medium text-text-primary">
              Envío gratis en pedidos mayores a Q.200
            </p>
            <p className="text-xs text-text-secondary">
              Entrega estimada: 2-3 días hábiles
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Icon name="RotateCcw" size={18} className="text-primary" />
          <div>
            <p className="text-sm font-body font-medium text-text-primary">
              Devoluciones gratuitas
            </p>
            <p className="text-xs text-text-secondary">
              30 días para cambios y devoluciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;