import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationBenefits = () => {
  const benefits = [
    {
      icon: 'ShoppingBag',
      title: 'Compras Rápidas',
      description: 'Guarda tus productos favoritos y realiza pedidos con un solo clic'
    },
    {
      icon: 'Truck',
      title: 'Envío a Domicilio',
      description: 'Recibe tus productos directamente en tu hogar en toda Guatemala'
    },
    {
      icon: 'CreditCard',
      title: 'Pagos Seguros',
      description: 'Múltiples opciones de pago: tarjetas, transferencias y billeteras digitales'
    },
    {
      icon: 'Bell',
      title: 'Notificaciones',
      description: 'Mantente informado sobre el estado de tus pedidos vía WhatsApp'
    },
    {
      icon: 'Star',
      title: 'Ofertas Exclusivas',
      description: 'Accede a descuentos especiales y promociones para miembros'
    },
    {
      icon: 'Clock',
      title: 'Historial de Compras',
      description: 'Consulta y reordena tus compras anteriores fácilmente'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold text-text-primary">
          ¿Por qué registrarse?
        </h2>
        <p className="text-text-secondary font-body">
          Descubre todos los beneficios de ser parte de La Bodegona
        </p>
      </div>
      {/* Benefits Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {benefits?.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-soft transition-shadow duration-200"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name={benefit?.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-heading font-semibold text-card-foreground mb-1">
                {benefit?.title}
              </h3>
              <p className="text-sm text-text-secondary font-body leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="bg-muted rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Shield" size={20} className="text-success" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Seguridad Garantizada
          </h3>
        </div>
        
        <div className="grid gap-3 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-sm text-text-secondary font-body">
              Datos protegidos con encriptación SSL
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <Icon name="UserCheck" size={16} className="text-success" />
            <span className="text-sm text-text-secondary font-body">
              Cumplimos con las leyes de protección de datos de Guatemala
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Phone" size={16} className="text-success" />
            <span className="text-sm text-text-secondary font-body">
              Soporte al cliente 24/7 vía WhatsApp
            </span>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-heading font-bold text-primary">5K+</div>
          <div className="text-xs text-text-secondary font-caption">Clientes Activos</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-heading font-bold text-primary">15K+</div>
          <div className="text-xs text-text-secondary font-caption">Pedidos Entregados</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-heading font-bold text-primary">4.8★</div>
          <div className="text-xs text-text-secondary font-caption">Calificación</div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBenefits;