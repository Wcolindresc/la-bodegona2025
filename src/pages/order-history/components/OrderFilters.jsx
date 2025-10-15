import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  searchQuery, 
  onSearchChange 
}) => {
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'procesando', label: 'Procesando' },
    { value: 'enviado', label: 'Enviado' },
    { value: 'entregado', label: 'Entregado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'Todas las fechas' },
    { value: 'last7days', label: 'Últimos 7 días' },
    { value: 'last30days', label: 'Últimos 30 días' },
    { value: 'last3months', label: 'Últimos 3 meses' },
    { value: 'last6months', label: 'Últimos 6 meses' },
    { value: 'lastyear', label: 'Último año' },
    { value: 'custom', label: 'Rango personalizado' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Todos los precios' },
    { value: '0-100', label: 'Q0 - Q100' },
    { value: '100-500', label: 'Q100 - Q500' },
    { value: '500-1000', label: 'Q500 - Q1,000' },
    { value: '1000-2000', label: 'Q1,000 - Q2,000' },
    { value: '2000+', label: 'Más de Q2,000' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'oldest', label: 'Más antiguos' },
    { value: 'highest', label: 'Mayor precio' },
    { value: 'lowest', label: 'Menor precio' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => value !== '' && value !== null);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-4 sm:p-6 mb-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Buscar por número de pedido, producto o fecha..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Estado del Pedido"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Seleccionar estado"
        />

        <Select
          label="Rango de Fechas"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder="Seleccionar período"
        />

        <Select
          label="Rango de Precios"
          options={priceRangeOptions}
          value={filters?.priceRange}
          onChange={(value) => handleFilterChange('priceRange', value)}
          placeholder="Seleccionar rango"
        />

        <Select
          label="Ordenar por"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
          placeholder="Ordenar resultados"
        />
      </div>
      {/* Custom Date Range */}
      {filters?.dateRange === 'custom' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-4 bg-muted rounded-lg">
          <Input
            type="date"
            label="Fecha de Inicio"
            value={filters?.startDate}
            onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
          />
          <Input
            type="date"
            label="Fecha de Fin"
            value={filters?.endDate}
            onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
          />
        </div>
      )}
      {/* Filter Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Icon name="Filter" size={16} />
          <span>
            {hasActiveFilters() 
              ? 'Filtros aplicados' 
              : 'Sin filtros aplicados'
            }
          </span>
        </div>

        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpiar Filtros
          </Button>
        )}
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {filters?.status && (
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <span>Estado: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}</span>
              <button
                onClick={() => handleFilterChange('status', '')}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.dateRange && filters?.dateRange !== 'custom' && (
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              <span>Fecha: {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}</span>
              <button
                onClick={() => handleFilterChange('dateRange', '')}
                className="hover:bg-accent/20 rounded-full p-0.5 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.priceRange && (
            <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
              <span>Precio: {priceRangeOptions?.find(opt => opt?.value === filters?.priceRange)?.label}</span>
              <button
                onClick={() => handleFilterChange('priceRange', '')}
                className="hover:bg-success/20 rounded-full p-0.5 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderFilters;