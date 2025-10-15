import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummaryCard = ({ orderItems, shippingAddress, paymentMethod, orderTotals }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6 flex items-center">
        <Icon name="Package" size={24} className="mr-3 text-primary" />
        Resumen del Pedido
      </h2>
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-body font-medium text-text-primary border-b border-border pb-2">
          Productos Ordenados
        </h3>
        
        {orderItems?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <div className="w-16 h-16 flex-shrink-0">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-text-primary truncate">{item?.name}</h4>
              <p className="text-sm text-text-secondary">Cantidad: {item?.quantity}</p>
              <p className="text-sm text-text-secondary">Precio unitario: {formatPrice(item?.price)}</p>
            </div>
            
            <div className="text-right">
              <p className="font-body font-semibold text-text-primary">
                {formatPrice(item?.price * item?.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="text-lg font-body font-medium text-text-primary border-b border-border pb-2 mb-4">
          Dirección de Envío
        </h3>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-body font-medium text-text-primary">{shippingAddress?.fullName}</p>
              <p className="text-sm text-text-secondary">{shippingAddress?.address}</p>
              <p className="text-sm text-text-secondary">
                {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}
              </p>
              <p className="text-sm text-text-secondary">{shippingAddress?.country}</p>
              {shippingAddress?.phone && (
                <p className="text-sm text-text-secondary mt-1">Tel: {shippingAddress?.phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="text-lg font-body font-medium text-text-primary border-b border-border pb-2 mb-4">
          Método de Pago
        </h3>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={20} className="text-primary" />
            <div>
              <p className="font-body font-medium text-text-primary">{paymentMethod?.type}</p>
              {paymentMethod?.details && (
                <p className="text-sm text-text-secondary">{paymentMethod?.details}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Order Totals */}
      <div className="border-t border-border pt-4">
        <h3 className="text-lg font-body font-medium text-text-primary mb-4">
          Total del Pedido
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Subtotal:</span>
            <span className="text-text-primary">{formatPrice(orderTotals?.subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Envío:</span>
            <span className="text-text-primary">
              {orderTotals?.shipping === 0 ? 'Gratis' : formatPrice(orderTotals?.shipping)}
            </span>
          </div>
          
          {orderTotals?.tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">IVA:</span>
              <span className="text-text-primary">{formatPrice(orderTotals?.tax)}</span>
            </div>
          )}
          
          {orderTotals?.discount > 0 && (
            <div className="flex justify-between text-sm text-success">
              <span>Descuento:</span>
              <span>-{formatPrice(orderTotals?.discount)}</span>
            </div>
          )}
          
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between text-lg font-body font-semibold">
              <span className="text-text-primary">Total:</span>
              <span className="text-primary">{formatPrice(orderTotals?.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;