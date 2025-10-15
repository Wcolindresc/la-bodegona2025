import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSuccessHeader = ({ orderNumber, orderDate }) => {
  return (
    <div className="text-center mb-8">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center shadow-soft-lg">
          <Icon name="CheckCircle" size={48} color="white" />
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-3xl lg:text-4xl font-heading font-bold text-success mb-4">
        ¡Pedido Confirmado!
      </h1>
      
      <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
        Gracias por tu compra. Tu pedido ha sido procesado exitosamente y recibirás una confirmación por correo electrónico.
      </p>

      {/* Order Details */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-6 max-w-md mx-auto">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-caption text-text-secondary">Número de Pedido</p>
            <p className="text-xl font-heading font-bold text-success">#{orderNumber}</p>
          </div>
          <div>
            <p className="text-sm font-caption text-text-secondary">Fecha del Pedido</p>
            <p className="text-base font-body font-medium text-text-primary">{orderDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessHeader;