import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Carrito', icon: 'ShoppingCart', path: '/shopping-cart' },
    { id: 2, name: 'Checkout', icon: 'CreditCard', path: '/checkout' },
    { id: 3, name: 'Confirmación', icon: 'CheckCircle', path: '/order-confirmation' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex items-center space-x-3">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                ${step?.id <= currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : step?.id === currentStep + 1
                  ? 'bg-primary/10 border-primary text-primary' :'bg-muted border-border text-text-secondary'
                }
              `}>
                {step?.id < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <div className="hidden sm:block">
                <p className={`
                  text-sm font-body font-medium
                  ${step?.id <= currentStep ? 'text-primary' : 'text-text-secondary'}
                `}>
                  {step?.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {step?.id === 1 && 'Revisar productos'}
                  {step?.id === 2 && 'Información y pago'}
                  {step?.id === 3 && 'Pedido completado'}
                </p>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-4 transition-all duration-200
                ${step?.id < currentStep ? 'bg-primary' : 'bg-border'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;