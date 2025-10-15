import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'Nuevo pedido #ORD-2024-1087',
      description: 'María González realizó un pedido por Q450.00',
      timestamp: new Date('2024-10-09T14:25:00'),
      icon: 'ShoppingBag',
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
      priority: 'high'
    },
    {
      id: 2,
      type: 'customer',
      title: 'Nuevo cliente registrado',
      description: 'Carlos Mendoza se registró en la plataforma',
      timestamp: new Date('2024-10-09T13:45:00'),
      icon: 'UserPlus',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'inventory',
      title: 'Alerta de inventario bajo',
      description: 'iPhone 15 Pro tiene solo 3 unidades disponibles',
      timestamp: new Date('2024-10-09T12:30:00'),
      icon: 'AlertTriangle',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
      priority: 'high'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Pago confirmado',
      description: 'Pedido #ORD-2024-1085 pagado vía Stripe - Q750.00',
      timestamp: new Date('2024-10-09T11:15:00'),
      icon: 'CreditCard',
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'system',
      title: 'Backup completado',
      description: 'Respaldo automático de base de datos ejecutado exitosamente',
      timestamp: new Date('2024-10-09T10:00:00'),
      icon: 'Database',
      iconColor: 'text-text-secondary',
      iconBg: 'bg-muted',
      priority: 'low'
    },
    {
      id: 6,
      type: 'order',
      title: 'Pedido cancelado',
      description: 'Ana Rodríguez canceló el pedido #ORD-2024-1084',
      timestamp: new Date('2024-10-09T09:30:00'),
      icon: 'XCircle',
      iconColor: 'text-error',
      iconBg: 'bg-error/10',
      priority: 'medium'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Todas', icon: 'List' },
    { value: 'order', label: 'Pedidos', icon: 'ShoppingBag' },
    { value: 'customer', label: 'Clientes', icon: 'Users' },
    { value: 'inventory', label: 'Inventario', icon: 'Package' },
    { value: 'payment', label: 'Pagos', icon: 'CreditCard' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `Hace ${minutes} min`;
    } else if (hours < 24) {
      return `Hace ${hours}h`;
    } else {
      return timestamp?.toLocaleDateString('es-GT', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    }
  };

  const getPriorityIndicator = (priority) => {
    switch (priority) {
      case 'high':
        return <div className="w-2 h-2 bg-error rounded-full" />;
      case 'medium':
        return <div className="w-2 h-2 bg-warning rounded-full" />;
      case 'low':
        return <div className="w-2 h-2 bg-success rounded-full" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-semibold text-card-foreground">Actividad Reciente</h3>
            <p className="text-sm text-text-secondary">Últimas actualizaciones del sistema</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {filterOptions?.map((option) => (
                <Button
                  key={option?.value}
                  variant={filter === option?.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(option?.value)}
                  iconName={option?.icon}
                  iconPosition="left"
                  className="text-xs"
                >
                  {option?.label}
                </Button>
              ))}
            </div>
            
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
              Actualizar
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-start space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${activity?.iconBg}`}>
                    <Icon name={activity?.icon} size={18} className={activity?.iconColor} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-card-foreground truncate">
                        {activity?.title}
                      </h4>
                      {getPriorityIndicator(activity?.priority)}
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{activity?.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">
                        {formatTimestamp(activity?.timestamp)}
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Inbox" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No hay actividades para mostrar</p>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Eye" iconPosition="left">
          Ver todas las actividades
        </Button>
      </div>
    </div>
  );
};

export default RecentActivity;