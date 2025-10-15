import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, shippingCost, taxes, total, promoCode, onPromoCodeChange, onApplyPromo }) => {
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft sticky top-4">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
          3
        </div>
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Resumen del Pedido
        </h2>
      </div>
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {item?.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-medium text-card-foreground truncate">
                {item?.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {item?.brand} • {item?.category}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-text-secondary">
                  {formatCurrency(item?.price)} × {item?.quantity}
                </span>
                <span className="font-body font-semibold text-card-foreground">
                  {formatCurrency(item?.price * item?.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Promo Code */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
        <h3 className="font-body font-medium text-card-foreground mb-3">
          Código Promocional
        </h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Ingrese código"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e?.target?.value)}
            className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-card-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <button
            onClick={onApplyPromo}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
          >
            Aplicar
          </button>
        </div>
      </div>
      {/* Order Totals */}
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Subtotal ({cartItems?.length} productos)</span>
          <span className="font-body font-medium text-card-foreground">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary">Envío</span>
            <Icon name="Truck" size={16} className="text-text-secondary" />
          </div>
          <span className="font-body font-medium text-card-foreground">
            {shippingCost > 0 ? formatCurrency(shippingCost) : 'Gratis'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary">IVA (12%)</span>
            <Icon name="Receipt" size={16} className="text-text-secondary" />
          </div>
          <span className="font-body font-medium text-card-foreground">
            {formatCurrency(taxes)}
          </span>
        </div>

        {promoCode && (
          <div className="flex justify-between items-center text-success">
            <div className="flex items-center space-x-2">
              <span>Descuento aplicado</span>
              <Icon name="Tag" size={16} />
            </div>
            <span className="font-body font-medium">
              -{formatCurrency(subtotal * 0.1)}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-heading font-semibold text-card-foreground">
              Total
            </span>
            <span className="text-xl font-heading font-bold text-primary">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
      {/* Payment Security */}
      <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
        <div className="flex items-center space-x-3 mb-2">
          <Icon name="Shield" size={20} className="text-success" />
          <span className="font-body font-medium text-success">Pago Seguro</span>
        </div>
        <p className="text-xs text-success/80">
          Su información está protegida con encriptación de nivel bancario
        </p>
      </div>
      {/* Estimated Delivery */}
      <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-3 mb-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <span className="font-body font-medium text-primary">Entrega Estimada</span>
        </div>
        <p className="text-xs text-primary/80">
          {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)?.toLocaleDateString('es-GT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;