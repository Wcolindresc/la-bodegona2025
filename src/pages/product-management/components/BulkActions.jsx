import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedProducts, 
  onBulkStatusChange, 
  onBulkCategoryChange, 
  onBulkDelete,
  onBulkExport,
  categories 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const bulkActions = [
    {
      id: 'activate',
      label: 'Activar Productos',
      icon: 'CheckCircle',
      action: () => onBulkStatusChange('active'),
      color: 'text-success'
    },
    {
      id: 'deactivate',
      label: 'Desactivar Productos',
      icon: 'XCircle',
      action: () => onBulkStatusChange('inactive'),
      color: 'text-warning'
    },
    {
      id: 'export',
      label: 'Exportar Seleccionados',
      icon: 'Download',
      action: onBulkExport,
      color: 'text-primary'
    },
    {
      id: 'delete',
      label: 'Eliminar Productos',
      icon: 'Trash2',
      action: () => setShowDeleteConfirm(true),
      color: 'text-error'
    }
  ];

  const handleBulkCategoryChange = (categoryId) => {
    onBulkCategoryChange(categoryId);
    setShowActions(false);
  };

  const handleBulkDelete = () => {
    onBulkDelete();
    setShowDeleteConfirm(false);
    setShowActions(false);
  };

  if (selectedProducts?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
              <Icon name="CheckSquare" size={16} color="white" />
            </div>
            <div>
              <h3 className="text-sm font-body font-semibold text-primary">
                {selectedProducts?.length} producto{selectedProducts?.length !== 1 ? 's' : ''} seleccionado{selectedProducts?.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-xs text-text-secondary font-caption">
                Selecciona una acción para aplicar a todos los productos seleccionados
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowActions(!showActions)}
                iconName="MoreHorizontal"
                iconPosition="right"
              >
                Acciones en Lote
              </Button>

              {showActions && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-soft-lg z-50">
                  <div className="p-2">
                    {/* Quick Actions */}
                    <div className="space-y-1 mb-3">
                      {bulkActions?.map((action) => (
                        <button
                          key={action?.id}
                          onClick={action?.action}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-body rounded-md hover:bg-muted transition-colors ${action?.color}`}
                        >
                          <Icon name={action?.icon} size={16} />
                          <span>{action?.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Category Assignment */}
                    <div className="border-t border-border pt-3">
                      <div className="px-3 py-1 text-xs font-caption font-medium text-text-secondary uppercase tracking-wide">
                        Cambiar Categoría
                      </div>
                      <div className="max-h-32 overflow-y-auto">
                        {categories?.map((category) => (
                          <button
                            key={category?.id}
                            onClick={() => handleBulkCategoryChange(category?.id)}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-popover-foreground hover:bg-muted rounded-md transition-colors"
                          >
                            <Icon name="Tag" size={14} />
                            <span>{category?.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowActions(false)}
              title="Cerrar acciones"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border shadow-soft-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-full">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-card-foreground">
                    Confirmar Eliminación
                  </h3>
                  <p className="text-sm text-text-secondary font-body">
                    Esta acción no se puede deshacer
                  </p>
                </div>
              </div>

              <p className="text-sm text-card-foreground font-body mb-6">
                ¿Estás seguro de que deseas eliminar {selectedProducts?.length} producto{selectedProducts?.length !== 1 ? 's' : ''}? 
                Esta acción eliminará permanentemente los productos seleccionados del sistema.
              </p>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleBulkDelete}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Eliminar Productos
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Overlay */}
      {(showActions || showDeleteConfirm) && (
        <div 
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => {
            setShowActions(false);
            setShowDeleteConfirm(false);
          }}
        />
      )}
    </>
  );
};

export default BulkActions;