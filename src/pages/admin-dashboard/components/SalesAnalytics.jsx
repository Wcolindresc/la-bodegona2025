import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const revenueByCategory = [
    { category: 'Electrónicos', revenue: 45600, orders: 156, avgOrder: 292 },
    { category: 'Ropa', revenue: 36400, orders: 203, avgOrder: 179 },
    { category: 'Hogar', revenue: 23400, orders: 89, avgOrder: 263 },
    { category: 'Deportes', revenue: 15600, orders: 67, avgOrder: 233 },
    { category: 'Libros', revenue: 9100, orders: 45, avgOrder: 202 }
  ];

  const paymentMethods = [
    { method: 'Tarjeta de Crédito', percentage: 45, amount: 58500, icon: 'CreditCard', color: 'bg-primary' },
    { method: 'Transferencia Bancaria', percentage: 28, amount: 36400, icon: 'Building2', color: 'bg-secondary' },
    { method: 'PayPal', percentage: 15, amount: 19500, icon: 'Wallet', color: 'bg-accent' },
    { method: 'Efectivo (Contra entrega)', percentage: 12, amount: 15600, icon: 'Banknote', color: 'bg-success' }
  ];

  const geographicData = [
    { region: 'Ciudad de Guatemala', sales: 42, amount: 54600 },
    { region: 'Quetzaltenango', sales: 18, amount: 23400 },
    { region: 'Escuintla', sales: 15, amount: 19500 },
    { region: 'Antigua Guatemala', sales: 12, amount: 15600 },
    { region: 'Cobán', sales: 8, amount: 10400 },
    { region: 'Otros', sales: 5, amount: 6500 }
  ];

  const metrics = [
    { key: 'revenue', label: 'Ingresos', icon: 'DollarSign' },
    { key: 'orders', label: 'Pedidos', icon: 'ShoppingBag' },
    { key: 'avgOrder', label: 'Ticket Promedio', icon: 'TrendingUp' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-soft-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {selectedMetric === 'revenue' && (
            <p className="text-sm text-success">
              Ingresos: Q{data?.revenue?.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </p>
          )}
          {selectedMetric === 'orders' && (
            <p className="text-sm text-primary">Pedidos: {data?.orders}</p>
          )}
          {selectedMetric === 'avgOrder' && (
            <p className="text-sm text-accent">
              Promedio: Q{data?.avgOrder?.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getBarColor = () => {
    switch (selectedMetric) {
      case 'revenue': return 'var(--color-success)';
      case 'orders': return 'var(--color-primary)';
      case 'avgOrder': return 'var(--color-accent)';
      default: return 'var(--color-primary)';
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue by Category */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-semibold text-card-foreground">Análisis por Categoría</h3>
            <p className="text-sm text-text-secondary">Rendimiento detallado de productos</p>
          </div>
          
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {metrics?.map((metric) => (
              <Button
                key={metric?.key}
                variant={selectedMetric === metric?.key ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedMetric(metric?.key)}
                iconName={metric?.icon}
                iconPosition="left"
                className="text-xs"
              >
                {metric?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByCategory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="category" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={(value) => {
                  if (selectedMetric === 'revenue' || selectedMetric === 'avgOrder') {
                    return `Q${(value / 1000)?.toFixed(0)}k`;
                  }
                  return value;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={selectedMetric} 
                fill={getBarColor()}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Payment Methods Distribution */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-card-foreground">Métodos de Pago</h3>
          <p className="text-sm text-text-secondary">Distribución de preferencias de pago</p>
        </div>

        <div className="space-y-4">
          {paymentMethods?.map((method, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                  <Icon name={method?.icon} size={18} className="text-text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-card-foreground">{method?.method}</span>
                    <span className="text-sm font-semibold text-card-foreground">{method?.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${method?.color}`}
                      style={{ width: `${method?.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm font-semibold text-card-foreground">
                  Q{method?.amount?.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Geographic Sales Data */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-card-foreground">Ventas Geográficas</h3>
          <p className="text-sm text-text-secondary">Distribución por regiones de Guatemala</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {geographicData?.map((region, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-card-foreground">{region?.region}</h4>
                <span className="text-xs text-text-secondary">{region?.sales}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className="h-2 bg-primary rounded-full"
                  style={{ width: `${region?.sales}%` }}
                />
              </div>
              <p className="text-sm font-semibold text-success">
                Q{region?.amount?.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;