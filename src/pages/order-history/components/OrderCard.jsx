import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onTrackOrder, onDownloadInvoice, onReorder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'procesando':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'enviado':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'entregado':
        return 'bg-success/10 text-success border-success/20';
      case 'cancelado':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pendiente':
        return 'Clock';
      case 'procesando':
        return 'Package';
      case 'enviado':
        return 'Truck';
      case 'entregado':
        return 'CheckCircle';
      case 'cancelado':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-GT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-soft-md transition-all duration-200">
      {/* Order Header */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h3 className="text-lg font-heading font-semibold text-card-foreground">
                Pedido #{order?.orderNumber}
              </h3>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order?.status)}`}>
                <Icon name={getStatusIcon(order?.status)} size={14} />
                <span className="capitalize">{order?.status}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={14} />
                <span>Fecha: {formatDate(order?.orderDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Package" size={14} />
                <span>{order?.items?.length} producto{order?.items?.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:items-end gap-2">
            <div className="text-xl font-heading font-bold text-primary">
              {formatCurrency(order?.total)}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? 'Ocultar' : 'Ver'} Detalles
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onTrackOrder(order?.id)}
            iconName="MapPin"
            iconPosition="left"
          >
            Rastrear Envío
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownloadInvoice(order?.id)}
            iconName="Download"
            iconPosition="left"
          >
            Descargar Factura
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReorder(order?.id)}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Comprar de Nuevo
          </Button>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Order Items */}
          <div className="p-4 sm:p-6">
            <h4 className="text-md font-heading font-semibold text-card-foreground mb-4">
              Productos Pedidos
            </h4>
            <div className="space-y-3">
              {order?.items?.map((item) => (
                <div key={item?.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product-details?id=${item?.productId}`}
                      className="text-sm font-body font-medium text-card-foreground hover:text-primary transition-colors duration-200 line-clamp-2"
                    >
                      {item?.name}
                    </Link>
                    <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
                      <span>Cantidad: {item?.quantity}</span>
                      <span>Precio: {formatCurrency(item?.price)}</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-card-foreground">
                    {formatCurrency(item?.price * item?.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 border-t border-border">
            {/* Shipping Address */}
            <div>
              <h5 className="text-sm font-heading font-semibold text-card-foreground mb-3">
                Dirección de Envío
              </h5>
              <div className="text-sm text-text-secondary space-y-1">
                <div className="font-medium text-card-foreground">{order?.shippingAddress?.name}</div>
                <div>{order?.shippingAddress?.street}</div>
                <div>{order?.shippingAddress?.city}, {order?.shippingAddress?.state}</div>
                <div>{order?.shippingAddress?.zipCode}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Icon name="Phone" size={14} />
                  <span>{order?.shippingAddress?.phone}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h5 className="text-sm font-heading font-semibold text-card-foreground mb-3">
                Información de Pago
              </h5>
              <div className="text-sm text-text-secondary space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="CreditCard" size={14} />
                  <span className="font-medium text-card-foreground">{order?.paymentMethod?.type}</span>
                </div>
                {order?.paymentMethod?.last4 && (
                  <div>Terminada en {order?.paymentMethod?.last4}</div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span className="text-success">Pago Confirmado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-4 sm:p-6 border-t border-border bg-muted/30">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal:</span>
                <span className="text-card-foreground">{formatCurrency(order?.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Envío:</span>
                <span className="text-card-foreground">{formatCurrency(order?.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Impuestos:</span>
                <span className="text-card-foreground">{formatCurrency(order?.tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-heading font-semibold text-card-foreground">Total:</span>
                <span className="font-heading font-bold text-primary">{formatCurrency(order?.total)}</span>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {order?.trackingNumber && (
            <div className="p-4 sm:p-6 border-t border-border">
              <h5 className="text-sm font-heading font-semibold text-card-foreground mb-3">
                Información de Rastreo
              </h5>
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                <Icon name="Truck" size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-card-foreground">
                    Número de Rastreo: {order?.trackingNumber}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    Última actualización: {formatDate(order?.lastUpdate)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;