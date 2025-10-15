import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const SavedForLater = ({ savedItems, onMoveToCart, onRemoveFromSaved }) => {
  const [isUpdating, setIsUpdating] = useState(null);

  const handleMoveToCart = async (itemId) => {
    setIsUpdating(itemId);
    try {
      await onMoveToCart(itemId);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRemove = async (itemId) => {
    setIsUpdating(itemId);
    try {
      await onRemoveFromSaved(itemId);
    } finally {
      setIsUpdating(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(price);
  };

  if (!savedItems || savedItems?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Guardado para después
        </h2>
        <span className="text-sm text-text-secondary bg-muted px-3 py-1 rounded-full">
          {savedItems?.length} {savedItems?.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {savedItems?.map((item) => (
          <div 
            key={item?.id} 
            className={`bg-surface border border-border rounded-lg p-4 transition-all duration-200 ${
              isUpdating === item?.id ? 'opacity-60' : ''
            }`}
          >
            {/* Product Image */}
            <div className="relative mb-3">
              <Link to={`/product-details/${item?.id}`} className="block">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </Link>
              
              {/* Stock Status */}
              {item?.stock === 0 && (
                <div className="absolute top-2 right-2 bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded-md">
                  Agotado
                </div>
              )}
              
              {item?.stock > 0 && item?.stock < 5 && (
                <div className="absolute top-2 right-2 bg-warning text-warning-foreground text-xs font-bold px-2 py-1 rounded-md">
                  Últimas {item?.stock}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <Link 
                to={`/product-details/${item?.id}`}
                className="block hover:text-primary transition-colors duration-200"
              >
                <h3 className="text-sm font-body font-medium text-card-foreground line-clamp-2">
                  {item?.name}
                </h3>
              </Link>

              {/* Price */}
              <div>
                <div className="text-base font-heading font-bold text-primary">
                  {formatPrice(item?.price)}
                </div>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <div className="text-xs text-text-secondary line-through">
                    {formatPrice(item?.originalPrice)}
                  </div>
                )}
              </div>

              {/* Variant */}
              {item?.variant && (
                <div className="text-xs text-text-secondary">
                  <span className="bg-muted px-2 py-1 rounded-md">
                    {item?.variant}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={() => handleMoveToCart(item?.id)}
                  disabled={isUpdating === item?.id || item?.stock === 0}
                  loading={isUpdating === item?.id}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  iconSize={16}
                >
                  {item?.stock === 0 ? 'Agotado' : 'Mover al carrito'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => handleRemove(item?.id)}
                  disabled={isUpdating === item?.id}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={16}
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  Eliminar
                </Button>
              </div>

              {/* Availability Notification */}
              {item?.stock === 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Bell"
                  iconPosition="left"
                  iconSize={16}
                >
                  Notificar disponibilidad
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Clear All Button */}
      <div className="flex justify-end mt-6 pt-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => {
            savedItems?.forEach(item => handleRemove(item?.id));
          }}
          disabled={isUpdating !== null}
          iconName="Trash2"
          iconPosition="left"
          iconSize={16}
          className="text-error hover:text-error hover:bg-error/10"
        >
          Limpiar todo
        </Button>
      </div>
    </div>
  );
};

export default SavedForLater;