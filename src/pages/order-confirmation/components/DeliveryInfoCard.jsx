import React from 'react';
import Icon from '../../../components/AppIcon';

const DeliveryInfoCard = ({ estimatedDelivery, trackingNumber }) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6 flex items-center">
        <Icon name="Truck" size={24} className="mr-3 text-primary" />
        Información de Entrega
      </h2>

      <div className="space-y-6">
        {/* Estimated Delivery */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Calendar" size={20} className="text-primary" />
            <h3 className="font-body font-medium text-primary">Fecha Estimada de Entrega</h3>
          </div>
          <p className="text-lg font-body font-semibold text-text-primary ml-8">
            {estimatedDelivery}
          </p>
          <p className="text-sm text-text-secondary ml-8 mt-1">
            Entregas de lunes a viernes de 8:00 AM a 6:00 PM
          </p>
        </div>

        {/* Tracking Information */}
        {trackingNumber && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Search" size={20} className="text-primary" />
              <h3 className="font-body font-medium text-text-primary">Número de Seguimiento</h3>
            </div>
            <div className="ml-8">
              <p className="text-lg font-mono font-semibold text-text-primary bg-surface border border-border rounded px-3 py-2 inline-block">
                {trackingNumber}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                Podrás rastrear tu pedido una vez que sea despachado
              </p>
            </div>
          </div>
        )}

        {/* Delivery Steps */}
        <div className="space-y-4">
          <h3 className="font-body font-medium text-text-primary">Próximos Pasos:</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={14} color="white" />
              </div>
              <div>
                <p className="font-body font-medium text-text-primary">Pedido Confirmado</p>
                <p className="text-sm text-text-secondary">Tu pedido ha sido recibido y está siendo procesado</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-white">2</span>
              </div>
              <div>
                <p className="font-body font-medium text-text-primary">Preparación</p>
                <p className="text-sm text-text-secondary">Empacamos cuidadosamente tus productos</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-muted border-2 border-border rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-text-secondary">3</span>
              </div>
              <div>
                <p className="font-body font-medium text-text-secondary">En Camino</p>
                <p className="text-sm text-text-secondary">Tu pedido será enviado a la dirección indicada</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-muted border-2 border-border rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-text-secondary">4</span>
              </div>
              <div>
                <p className="font-body font-medium text-text-secondary">Entregado</p>
                <p className="text-sm text-text-secondary">Recibirás tu pedido en la fecha estimada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoCard;