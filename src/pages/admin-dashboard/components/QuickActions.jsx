import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      title: 'Agregar Producto',
      description: 'Crear nuevo producto en el catálogo',
      icon: 'Plus',
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
      path: '/product-management/add',
      buttonText: 'Agregar',
      buttonVariant: 'default'
    },
    {
      title: 'Gestionar Pedidos',
      description: 'Ver y administrar pedidos pendientes',
      icon: 'ShoppingBag',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      path: '/admin/orders',
      buttonText: 'Gestionar',
      buttonVariant: 'outline',
      badge: '12 pendientes'
    },
    {
      title: 'Ver Clientes',
      description: 'Administrar base de datos de clientes',
      icon: 'Users',
      iconColor: 'text-secondary',
      iconBg: 'bg-secondary/10',
      path: '/admin/customers',
      buttonText: 'Ver Clientes',
      buttonVariant: 'outline'
    },
    {
      title: 'Configurar Sistema',
      description: 'Ajustes generales y configuración',
      icon: 'Settings',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
      path: '/admin/settings',
      buttonText: 'Configurar',
      buttonVariant: 'outline'
    }
  ];

  const systemAlerts = [
    {
      type: 'inventory',
      title: 'Inventario Bajo',
      count: 5,
      description: 'productos requieren restock',
      icon: 'AlertTriangle',
      color: 'text-warning',
      bg: 'bg-warning/10'
    },
    {
      type: 'orders',
      title: 'Pedidos Pendientes',
      count: 12,
      description: 'pedidos esperan procesamiento',
      icon: 'Clock',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      type: 'support',
      title: 'Tickets de Soporte',
      count: 3,
      description: 'consultas sin responder',
      icon: 'MessageCircle',
      color: 'text-error',
      bg: 'bg-error/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-card-foreground">Acciones Rápidas</h3>
          <p className="text-sm text-text-secondary">Herramientas de gestión frecuentes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:shadow-soft transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${action?.iconBg}`}>
                    <Icon name={action?.icon} size={20} className={action?.iconColor} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground">{action?.title}</h4>
                    <p className="text-xs text-text-secondary">{action?.description}</p>
                  </div>
                </div>
                {action?.badge && (
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {action?.badge}
                  </span>
                )}
              </div>
              
              <Link to={action?.path}>
                <Button 
                  variant={action?.buttonVariant} 
                  size="sm" 
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {action?.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* System Alerts */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-card-foreground">Alertas del Sistema</h3>
          <p className="text-sm text-text-secondary">Elementos que requieren atención</p>
        </div>

        <div className="space-y-4">
          {systemAlerts?.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${alert?.bg}`}>
                  <Icon name={alert?.icon} size={18} className={alert?.color} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-card-foreground">{alert?.title}</h4>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${alert?.bg} ${alert?.color}`}>
                      {alert?.count}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{alert?.description}</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" iconName="ChevronRight">
                Ver
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" fullWidth iconName="Bell" iconPosition="left">
            Ver todas las notificaciones
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;