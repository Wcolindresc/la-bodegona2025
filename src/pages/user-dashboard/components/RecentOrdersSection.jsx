import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOrdersSection = () => {
  const recentOrders = [
    {
      id: "ORD-2024-001",
      date: "05/10/2024",
      status: "Entregado",
      statusColor: "bg-green-100 text-green-800",
      total: "Q 245.50",
      items: 3,
      trackingNumber: "GT2024001",
      estimatedDelivery: "Entregado el 07/10/2024"
    },
    {
      id: "ORD-2024-002",
      date: "08/10/2024",
      status: "En tránsito",
      statusColor: "bg-blue-100 text-blue-800",
      total: "Q 189.75",
      items: 2,
      trackingNumber: "GT2024002",
      estimatedDelivery: "Llegada estimada: 10/10/2024"
    },
    {
      id: "ORD-2024-003",
      date: "09/10/2024",
      status: "Procesando",
      statusColor: "bg-amber-100 text-amber-800",
      total: "Q 356.25",
      items: 5,
      trackingNumber: "GT2024003",
      estimatedDelivery: "Procesando pedido"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Entregado':
        return 'CheckCircle';
      case 'En tránsito':
        return 'Truck';
      case 'Procesando':
        return 'Clock';
      default:
        return 'Package';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Pedidos Recientes
        </h2>
        <Link to="/order-history">
          <Button variant="outline" size="sm">
            Ver todos
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
      {recentOrders?.length > 0 ? (
        <div className="space-y-4">
          {recentOrders?.map((order) => (
            <div key={order?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon name={getStatusIcon(order?.status)} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-body font-medium text-card-foreground">
                      Pedido {order?.id}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {order?.date} • {order?.items} artículo{order?.items > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-heading font-semibold text-card-foreground mb-1">
                    {order?.total}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order?.statusColor}`}>
                    {order?.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-text-secondary">
                  <span className="font-medium">Seguimiento:</span> {order?.trackingNumber}
                  <br />
                  {order?.estimatedDelivery}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Ver detalles
                  </Button>
                  {order?.status === 'En tránsito' && (
                    <Button variant="ghost" size="sm">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      Rastrear
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
            <Icon name="ShoppingBag" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-heading font-medium text-card-foreground mb-2">
            No tienes pedidos recientes
          </h3>
          <p className="text-text-secondary font-body mb-4">
            ¡Explora nuestro catálogo y realiza tu primera compra!
          </p>
          <Link to="/product-catalog">
            <Button variant="default">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Explorar productos
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentOrdersSection;