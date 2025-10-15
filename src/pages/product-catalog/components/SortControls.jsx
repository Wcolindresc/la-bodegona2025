import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, onSortChange, viewMode, onViewModeChange, onToggleFilters }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevancia' },
    { value: 'price-low-high', label: 'Precio: Menor a Mayor' },
    { value: 'price-high-low', label: 'Precio: Mayor a Menor' },
    { value: 'newest', label: 'Más Nuevos' },
    { value: 'rating', label: 'Mejor Calificados' },
    { value: 'name-az', label: 'Nombre: A-Z' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions?.find(opt => opt?.value === sortBy);
    return option ? option?.label : 'Relevancia';
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-card border border-border rounded-lg p-4">
      {/* Left Side - Mobile Filter Toggle */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onToggleFilters}
          iconName="Filter"
          iconPosition="left"
          className="lg:hidden"
        >
          Filtros
        </Button>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="appearance-none bg-input border border-border rounded-lg px-4 py-2 pr-10 text-sm font-medium text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
          />
        </div>
      </div>
      {/* Right Side - View Mode Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-secondary hidden sm:block">Vista:</span>
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            className="rounded-none border-0"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            iconName="List"
            className="rounded-none border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default SortControls;