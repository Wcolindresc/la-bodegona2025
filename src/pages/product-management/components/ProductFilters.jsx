import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  categories,
  totalProducts,
  filteredProducts 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: filters?.priceMin || '',
    max: filters?.priceMax || ''
  });

  const stockStatuses = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'in_stock', label: 'En Stock' },
    { value: 'low_stock', label: 'Stock Bajo' },
    { value: 'out_of_stock', label: 'Agotado' }
  ];

  const productStatuses = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ];

  const handleSearchChange = (e) => {
    onFiltersChange({ ...filters, search: e?.target?.value });
  };

  const handleCategoryChange = (e) => {
    onFiltersChange({ ...filters, category: e?.target?.value });
  };

  const handleStockStatusChange = (e) => {
    onFiltersChange({ ...filters, stockStatus: e?.target?.value });
  };

  const handleProductStatusChange = (e) => {
    onFiltersChange({ ...filters, status: e?.target?.value });
  };

  const handlePriceRangeChange = (field, value) => {
    const newPriceRange = { ...priceRange, [field]: value };
    setPriceRange(newPriceRange);
    
    onFiltersChange({
      ...filters,
      priceMin: newPriceRange?.min ? parseFloat(newPriceRange?.min) : null,
      priceMax: newPriceRange?.max ? parseFloat(newPriceRange?.max) : null
    });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.category && filters?.category !== 'all') count++;
    if (filters?.stockStatus && filters?.stockStatus !== 'all') count++;
    if (filters?.status && filters?.status !== 'all') count++;
    if (filters?.priceMin || filters?.priceMax) count++;
    if (filters?.dateFrom || filters?.dateTo) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6">
      {/* Search and Quick Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Input
              type="search"
              placeholder="Buscar productos por nombre o SKU..."
              value={filters?.search || ''}
              onChange={handleSearchChange}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary font-body">
            {filteredProducts} de {totalProducts} productos
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Filtros Avanzados
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-body font-medium text-card-foreground mb-2">
                Categoría
              </label>
              <select
                value={filters?.category || 'all'}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">Todas las categorías</option>
                {categories?.map((category) => (
                  <option key={category?.id} value={category?.name}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Status Filter */}
            <div>
              <label className="block text-sm font-body font-medium text-card-foreground mb-2">
                Estado de Stock
              </label>
              <select
                value={filters?.stockStatus || 'all'}
                onChange={handleStockStatusChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {stockStatuses?.map((status) => (
                  <option key={status?.value} value={status?.value}>
                    {status?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Status Filter */}
            <div>
              <label className="block text-sm font-body font-medium text-card-foreground mb-2">
                Estado del Producto
              </label>
              <select
                value={filters?.status || 'all'}
                onChange={handleProductStatusChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {productStatuses?.map((status) => (
                  <option key={status?.value} value={status?.value}>
                    {status?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-body font-medium text-card-foreground mb-2">
                Rango de Precio (GTQ)
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Mín"
                  value={priceRange?.min}
                  onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Máx"
                  value={priceRange?.max}
                  onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-body font-medium text-card-foreground mb-2">
                Fecha de Creación
              </label>
              <div className="flex space-x-2">
                <Input
                  type="date"
                  value={filters?.dateFrom || ''}
                  onChange={(e) => handleDateRangeChange('dateFrom', e?.target?.value)}
                  className="flex-1"
                />
                <Input
                  type="date"
                  value={filters?.dateTo || ''}
                  onChange={(e) => handleDateRangeChange('dateTo', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;