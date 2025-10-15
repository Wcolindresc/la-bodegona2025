import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, isOpen, onToggle, productCount }) => {
  const [priceRange, setPriceRange] = useState([filters?.minPrice || 0, filters?.maxPrice || 1000]);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  const categories = [
    { id: 'electronics', name: 'Electrónicos', count: 45 },
    { id: 'clothing', name: 'Ropa y Accesorios', count: 32 },
    { id: 'home', name: 'Hogar y Jardín', count: 28 },
    { id: 'sports', name: 'Deportes', count: 19 },
    { id: 'books', name: 'Libros', count: 15 },
    { id: 'beauty', name: 'Belleza y Cuidado', count: 23 },
    { id: 'toys', name: 'Juguetes', count: 12 },
    { id: 'automotive', name: 'Automotriz', count: 8 }
  ];

  const brands = [
    { id: 'samsung', name: 'Samsung', count: 12 },
    { id: 'apple', name: 'Apple', count: 8 },
    { id: 'nike', name: 'Nike', count: 15 },
    { id: 'adidas', name: 'Adidas', count: 10 },
    { id: 'sony', name: 'Sony', count: 7 },
    { id: 'lg', name: 'LG', count: 9 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brandId, checked) => {
    const newBrands = checked
      ? [...(filters?.brands || []), brandId]
      : (filters?.brands || [])?.filter(id => id !== brandId);
    
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleAvailabilityChange = (availability, checked) => {
    onFiltersChange({ ...filters, availability: checked ? availability : null });
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...tempPriceRange];
    newRange[index] = parseInt(value) || 0;
    setTempPriceRange(newRange);
  };

  const applyPriceRange = () => {
    const [min, max] = tempPriceRange;
    setPriceRange([min, max]);
    onFiltersChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      brands: [],
      availability: null,
      minPrice: 0,
      maxPrice: 1000,
      rating: null
    };
    setPriceRange([0, 1000]);
    setTempPriceRange([0, 1000]);
    onFiltersChange(clearedFilters);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Filtros</h3>
          <p className="text-sm text-text-secondary">{productCount} productos encontrados</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-primary hover:text-primary/80"
        >
          Limpiar todo
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">Categorías</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories?.map((category) => (
            <div key={category?.id} className="flex items-center justify-between">
              <Checkbox
                label={category?.name}
                checked={(filters?.categories || [])?.includes(category?.id)}
                onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
              />
              <span className="text-sm text-text-secondary">({category?.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">Rango de Precio</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder="Mín"
              value={tempPriceRange?.[0]}
              onChange={(e) => handlePriceRangeChange(0, e?.target?.value)}
              className="flex-1"
            />
            <span className="text-text-secondary">-</span>
            <Input
              type="number"
              placeholder="Máx"
              value={tempPriceRange?.[1]}
              onChange={(e) => handlePriceRangeChange(1, e?.target?.value)}
              className="flex-1"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={applyPriceRange}
            className="w-full"
          >
            Aplicar Rango
          </Button>
          <div className="flex justify-between text-sm text-text-secondary">
            <span>{formatPrice(0)}</span>
            <span>{formatPrice(1000)}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">Marcas</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands?.map((brand) => (
            <div key={brand?.id} className="flex items-center justify-between">
              <Checkbox
                label={brand?.name}
                checked={(filters?.brands || [])?.includes(brand?.id)}
                onChange={(e) => handleBrandChange(brand?.id, e?.target?.checked)}
              />
              <span className="text-sm text-text-secondary">({brand?.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">Disponibilidad</h4>
        <div className="space-y-2">
          <Checkbox
            label="En stock"
            checked={filters?.availability === 'in-stock'}
            onChange={(e) => handleAvailabilityChange('in-stock', e?.target?.checked)}
          />
          <Checkbox
            label="Agotado"
            checked={filters?.availability === 'out-of-stock'}
            onChange={(e) => handleAvailabilityChange('out-of-stock', e?.target?.checked)}
          />
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">Calificación</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1]?.map((rating) => (
            <Checkbox
              key={rating}
              label={
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: rating }, (_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
                    ))}
                    {Array.from({ length: 5 - rating }, (_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-gray-300" />
                    ))}
                  </div>
                  <span className="text-sm">y más</span>
                </div>
              }
              checked={filters?.rating === rating}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                rating: e?.target?.checked ? rating : null 
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
        <FilterContent />
      </div>

      {/* Mobile Filter Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border shadow-soft-lg lg:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-card-foreground">Filtros</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterPanel;