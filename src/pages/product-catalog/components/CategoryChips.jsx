import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryChips = ({ selectedCategories, onCategoryToggle }) => {
  const categories = [
    { id: 'all', name: 'Todos', icon: 'Grid3X3' },
    { id: 'electronics', name: 'Electrónicos', icon: 'Smartphone' },
    { id: 'clothing', name: 'Ropa', icon: 'Shirt' },
    { id: 'home', name: 'Hogar', icon: 'Home' },
    { id: 'sports', name: 'Deportes', icon: 'Dumbbell' },
    { id: 'books', name: 'Libros', icon: 'Book' },
    { id: 'beauty', name: 'Belleza', icon: 'Sparkles' },
    { id: 'toys', name: 'Juguetes', icon: 'Gamepad2' },
    { id: 'automotive', name: 'Automotriz', icon: 'Car' }
  ];

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'all') {
      onCategoryToggle([]);
    } else {
      const isSelected = selectedCategories?.includes(categoryId);
      if (isSelected) {
        onCategoryToggle(selectedCategories?.filter(id => id !== categoryId));
      } else {
        onCategoryToggle([...selectedCategories, categoryId]);
      }
    }
  };

  const isAllSelected = selectedCategories?.length === 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-medium text-card-foreground mb-3">Categorías</h3>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => {
          const isSelected = category?.id === 'all' 
            ? isAllSelected 
            : selectedCategories?.includes(category?.id);
          
          return (
            <button
              key={category?.id}
              onClick={() => handleCategoryClick(category?.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 border
                ${isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-soft'
                  : 'bg-background text-card-foreground border-border hover:border-primary hover:bg-primary/10'
                }
              `}
            >
              <Icon 
                name={category?.icon} 
                size={16} 
                className={isSelected ? 'text-primary-foreground' : 'text-text-secondary'} 
              />
              <span>{category?.name}</span>
            </button>
          );
        })}
      </div>
      {/* Active Filters Count */}
      {selectedCategories?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              {selectedCategories?.length} categoría{selectedCategories?.length !== 1 ? 's' : ''} seleccionada{selectedCategories?.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => onCategoryToggle([])}
              className="text-xs text-primary hover:text-primary/80 font-medium"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryChips;