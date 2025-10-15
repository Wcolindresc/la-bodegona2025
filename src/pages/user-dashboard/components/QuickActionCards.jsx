import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionCards = () => {
  const quickActions = [
    {
      id: 1,
      title: "Ver Pedidos",
      description: "Revisa el estado de tus compras",
      icon: "ShoppingBag",
      path: "/order-history",
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100"
    },
    {
      id: 2,
      title: "Actualizar Perfil",
      description: "Modifica tu información personal",
      icon: "User",
      path: "/user-dashboard/profile",
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100"
    },
    {
      id: 3,
      title: "Lista de Deseos",
      description: "Productos que te interesan",
      icon: "Heart",
      path: "/user-dashboard/wishlist",
      color: "bg-red-50 text-red-600",
      iconBg: "bg-red-100"
    },
    {
      id: 4,
      title: "Direcciones",
      description: "Gestiona tus direcciones de envío",
      icon: "MapPin",
      path: "/user-dashboard/addresses",
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100"
    },
    {
      id: 5,
      title: "Métodos de Pago",
      description: "Administra tus formas de pago",
      icon: "CreditCard",
      path: "/user-dashboard/payment-methods",
      color: "bg-amber-50 text-amber-600",
      iconBg: "bg-amber-100"
    },
    {
      id: 6,
      title: "Soporte",
      description: "¿Necesitas ayuda? Contáctanos",
      icon: "MessageCircle",
      path: "/user-dashboard/support",
      color: "bg-indigo-50 text-indigo-600",
      iconBg: "bg-indigo-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quickActions?.map((action) => (
        <Link
          key={action?.id}
          to={action?.path}
          className="group block"
        >
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft-lg transition-all duration-200 hover:border-primary/20">
            <div className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${action?.iconBg} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={24} className={action?.color?.split(' ')?.[1]} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-heading font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h3>
                <p className="text-sm text-text-secondary font-body">
                  {action?.description}
                </p>
              </div>
              
              <Icon 
                name="ChevronRight" 
                size={20} 
                className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActionCards;