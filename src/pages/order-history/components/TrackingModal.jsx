import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrackingModal = ({ isOpen, onClose, trackingData }) => {
  if (!isOpen || !trackingData) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-GT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'order_placed':
        return 'ShoppingCart';
      case 'processing':
        return 'Package';
      case 'shipped':
        return 'Truck';
      case 'out_for_delivery':
        return 'MapPin';
      case 'delivered':
        return 'CheckCircle';
      default:
        return 'Package';
    }
  };

  const getStatusColor = (status, isCompleted) => {
    if (isCompleted) {
      return 'text-success bg-success/10 border-success/20';
    }
    return 'text-text-secondary bg-muted border-border';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-soft-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-card-foreground">
              Rastreo de Envío
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Pedido #{trackingData?.orderNumber}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tracking Information */}
        <div className="p-6">
          {/* Tracking Number */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  Número de Rastreo
                </p>
                <p className="text-lg font-mono font-semibold text-primary">
                  {trackingData?.trackingNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">Transportista</p>
                <p className="font-medium text-card-foreground">
                  {trackingData?.carrier}
                </p>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg mb-6">
            <Icon name="Calendar" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Entrega Estimada
              </p>
              <p className="text-primary font-semibold">
                {formatDate(trackingData?.estimatedDelivery)}
              </p>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-card-foreground mb-4">
              Historial de Seguimiento
            </h3>
            
            <div className="relative">
              {trackingData?.timeline?.map((event, index) => {
                const isCompleted = event?.completed;
                const isLast = index === trackingData?.timeline?.length - 1;
                
                return (
                  <div key={index} className="relative flex items-start gap-4 pb-6">
                    {/* Timeline Line */}
                    {!isLast && (
                      <div className={`absolute left-6 top-12 w-0.5 h-full ${
                        isCompleted ? 'bg-success' : 'bg-border'
                      }`} />
                    )}
                    {/* Status Icon */}
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-full border-2 z-10
                      ${getStatusColor(event?.status, isCompleted)}
                    `}>
                      <Icon 
                        name={getStatusIcon(event?.status)} 
                        size={20} 
                        className={isCompleted ? 'text-success' : 'text-text-secondary'}
                      />
                    </div>
                    {/* Event Details */}
                    <div className="flex-1 pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h4 className={`font-medium ${
                          isCompleted ? 'text-card-foreground' : 'text-text-secondary'
                        }`}>
                          {event?.title}
                        </h4>
                        {event?.date && (
                          <span className="text-sm text-text-secondary">
                            {formatDate(event?.date)}
                          </span>
                        )}
                      </div>
                      
                      {event?.description && (
                        <p className="text-sm text-text-secondary mt-1">
                          {event?.description}
                        </p>
                      )}
                      
                      {event?.location && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-text-secondary">
                          <Icon name="MapPin" size={14} />
                          <span>{event?.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-card-foreground mb-2">
              Dirección de Entrega
            </h4>
            <div className="text-sm text-text-secondary space-y-1">
              <div className="font-medium text-card-foreground">
                {trackingData?.deliveryAddress?.name}
              </div>
              <div>{trackingData?.deliveryAddress?.street}</div>
              <div>
                {trackingData?.deliveryAddress?.city}, {trackingData?.deliveryAddress?.state}
              </div>
              <div>{trackingData?.deliveryAddress?.zipCode}</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
          >
            Cerrar
          </Button>
          <Button
            variant="default"
            iconName="ExternalLink"
            iconPosition="right"
            fullWidth
          >
            Ver en {trackingData?.carrier}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;