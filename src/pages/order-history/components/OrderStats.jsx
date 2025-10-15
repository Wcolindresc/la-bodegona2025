import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const statCards = [
    {
      title: 'Total de Pedidos',
      value: stats?.totalOrders,
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      title: 'Total Gastado',
      value: formatCurrency(stats?.totalSpent),
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      title: 'Pedidos Entregados',
      value: stats?.deliveredOrders,
      icon: 'CheckCircle',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    },
    {
      title: 'Pedidos Pendientes',
      value: stats?.pendingOrders,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className={`bg-card border ${stat?.borderColor} rounded-lg shadow-soft p-4 sm:p-6 hover:shadow-soft-md transition-all duration-200`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-caption text-text-secondary mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-heading font-bold text-card-foreground">
                {stat?.value}
              </p>
            </div>
            <div className={`${stat?.bgColor} ${stat?.color} p-3 rounded-lg`}>
              <Icon name={stat?.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;