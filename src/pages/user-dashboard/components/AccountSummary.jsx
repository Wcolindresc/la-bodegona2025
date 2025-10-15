import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSummary = ({ profileCompletion, savedAddresses, paymentMethods, loyaltyPoints }) => {
  const summaryItems = [
    {
      id: 1,
      title: "Perfil Completo",
      value: `${profileCompletion}%`,
      description: "Información personal actualizada",
      icon: "User",
      color: profileCompletion === 100 ? "text-green-600" : "text-amber-600",
      bgColor: profileCompletion === 100 ? "bg-green-50" : "bg-amber-50",
      action: profileCompletion < 100 ? "Completar" : "Editar",
      path: "/user-dashboard/profile"
    },
    {
      id: 2,
      title: "Direcciones Guardadas",
      value: savedAddresses,
      description: "Direcciones de envío registradas",
      icon: "MapPin",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: "Gestionar",
      path: "/user-dashboard/addresses"
    },
    {
      id: 3,
      title: "Métodos de Pago",
      value: paymentMethods,
      description: "Tarjetas y métodos guardados",
      icon: "CreditCard",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: "Ver",
      path: "/user-dashboard/payment-methods"
    },
    {
      id: 4,
      title: "Puntos de Lealtad",
      value: loyaltyPoints ? `${loyaltyPoints} pts` : "0 pts",
      description: "Puntos acumulados por compras",
      icon: "Star",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      action: "Canjear",
      path: "/user-dashboard/loyalty"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
        Resumen de Cuenta
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaryItems?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${item?.bgColor}`}>
                  <Icon name={item?.icon} size={20} className={item?.color} />
                </div>
                <div>
                  <h3 className="font-body font-medium text-card-foreground">
                    {item?.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {item?.description}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-heading font-semibold text-card-foreground">
                  {item?.value}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to={item?.path}>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                  {item?.action}
                  <Icon name="ChevronRight" size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary mb-1">12</div>
            <div className="text-sm text-text-secondary font-body">Pedidos totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-secondary mb-1">Q 1,245</div>
            <div className="text-sm text-text-secondary font-body">Total gastado</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-success mb-1">8</div>
            <div className="text-sm text-text-secondary font-body">Productos favoritos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-accent mb-1">3</div>
            <div className="text-sm text-text-secondary font-body">Meses activo</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;