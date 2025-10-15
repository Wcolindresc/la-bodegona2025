import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CategoryChart = () => {
  const categoryData = [
    { name: 'Electrónicos', value: 35, sales: 45600, color: '#1E40AF' },
    { name: 'Ropa y Accesorios', value: 28, sales: 36400, color: '#7C3AED' },
    { name: 'Hogar y Jardín', value: 18, sales: 23400, color: '#F59E0B' },
    { name: 'Deportes', value: 12, sales: 15600, color: '#10B981' },
    { name: 'Libros', value: 7, sales: 9100, color: '#EF4444' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-soft-lg">
          <p className="text-sm font-medium text-popover-foreground mb-1">{data?.name}</p>
          <p className="text-sm text-text-secondary">{`${data?.value}% del total`}</p>
          <p className="text-sm text-success">{`Q${data?.sales?.toLocaleString('es-GT', { minimumFractionDigits: 2 })}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-sm text-text-secondary">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-card-foreground">Ventas por Categoría</h3>
        <p className="text-sm text-text-secondary">Distribución de productos más vendidos</p>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryData?.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: category?.color }}
              />
              <span className="text-sm font-medium text-card-foreground">{category?.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-card-foreground">{category?.value}%</p>
              <p className="text-xs text-text-secondary">Q{(category?.sales / 1000)?.toFixed(0)}k</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;