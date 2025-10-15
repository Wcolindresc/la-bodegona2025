import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7d');

  const salesData = [
    { date: '01/10', ventas: 12500, pedidos: 45 },
    { date: '02/10', ventas: 15200, pedidos: 52 },
    { date: '03/10', ventas: 18700, pedidos: 68 },
    { date: '04/10', ventas: 14300, pedidos: 41 },
    { date: '05/10', ventas: 22100, pedidos: 79 },
    { date: '06/10', ventas: 19800, pedidos: 63 },
    { date: '07/10', ventas: 25400, pedidos: 87 },
    { date: '08/10', ventas: 21600, pedidos: 74 },
    { date: '09/10', ventas: 28900, pedidos: 95 }
  ];

  const timeRanges = [
    { value: '7d', label: '7 días' },
    { value: '30d', label: '30 días' },
    { value: '90d', label: '90 días' },
    { value: '1y', label: '1 año' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-soft-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Fecha: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey === 'ventas' 
                ? `Ventas: Q${entry?.value?.toLocaleString('es-GT', { minimumFractionDigits: 2 })}`
                : `Pedidos: ${entry?.value}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-heading font-semibold text-card-foreground">Tendencias de Ventas</h3>
          <p className="text-sm text-text-secondary">Análisis de rendimiento comercial</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <Button
                key={range?.value}
                variant={timeRange === range?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range?.value)}
                className="text-xs"
              >
                {range?.label}
              </Button>
            ))}
          </div>
          
          {/* Chart Type Toggle */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'line' ? "default" : "ghost"}
              size="icon"
              onClick={() => setChartType('line')}
              title="Gráfico de líneas"
            >
              <Icon name="TrendingUp" size={16} />
            </Button>
            <Button
              variant={chartType === 'bar' ? "default" : "ghost"}
              size="icon"
              onClick={() => setChartType('bar')}
              title="Gráfico de barras"
            >
              <Icon name="BarChart3" size={16} />
            </Button>
          </div>
          
          {/* Export Button */}
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Exportar
          </Button>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={(value) => `Q${(value / 1000)?.toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={(value) => `Q${(value / 1000)?.toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="ventas" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;