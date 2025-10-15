import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, currency = false, period = "vs mes anterior" }) => {
  const formatValue = (val) => {
    if (currency) {
      return `Q${val?.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return val?.toLocaleString('es-GT');
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-heading font-bold text-card-foreground">
          {formatValue(value)}
        </h3>
        <p className="text-sm font-body text-text-secondary">{title}</p>
        <p className="text-xs font-caption text-text-secondary">{period}</p>
      </div>
    </div>
  );
};

export default KPICard;