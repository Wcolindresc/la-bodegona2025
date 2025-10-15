import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll, 
  onEditProduct, 
  onDuplicateProduct, 
  onDeleteProduct, 
  onViewInStore,
  sortConfig,
  onSort 
}) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    })?.format(price);
  };

  const getStockStatusColor = (stock) => {
    if (stock === 0) return 'text-error bg-error/10';
    if (stock <= 10) return 'text-warning bg-warning/10';
    return 'text-success bg-success/10';
  };

  const getStockStatusText = (stock) => {
    if (stock === 0) return 'Agotado';
    if (stock <= 10) return 'Stock Bajo';
    return 'En Stock';
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSort = (column) => {
    onSort(column);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === products?.length && products?.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="text-left p-4 font-heading font-semibold text-card-foreground">
                Imagen
              </th>
              <th 
                className="text-left p-4 font-heading font-semibold text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <span>Nombre</span>
                  <Icon name={getSortIcon('name')} size={16} />
                </div>
              </th>
              <th 
                className="text-left p-4 font-heading font-semibold text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-2">
                  <span>Categoría</span>
                  <Icon name={getSortIcon('category')} size={16} />
                </div>
              </th>
              <th 
                className="text-left p-4 font-heading font-semibold text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-2">
                  <span>Precio</span>
                  <Icon name={getSortIcon('price')} size={16} />
                </div>
              </th>
              <th 
                className="text-left p-4 font-heading font-semibold text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center space-x-2">
                  <span>Stock</span>
                  <Icon name={getSortIcon('stock')} size={16} />
                </div>
              </th>
              <th className="text-left p-4 font-heading font-semibold text-card-foreground">
                Estado
              </th>
              <th className="text-center p-4 font-heading font-semibold text-card-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr 
                key={product?.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
                onMouseEnter={() => setHoveredProduct(product?.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={() => onSelectProduct(product?.id)}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="p-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-body font-medium text-card-foreground">{product?.name}</div>
                    <div className="text-sm text-text-secondary font-caption">SKU: {product?.sku}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-caption font-medium bg-secondary/10 text-secondary">
                    {product?.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-body font-semibold text-card-foreground">
                    {formatPrice(product?.price)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-body font-medium text-card-foreground">{product?.stock}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getStockStatusColor(product?.stock)}`}>
                      {getStockStatusText(product?.stock)}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-caption font-medium ${
                    product?.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-text-secondary'
                  }`}>
                    {product?.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditProduct(product)}
                      className="w-8 h-8"
                      title="Editar producto"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicateProduct(product)}
                      className="w-8 h-8"
                      title="Duplicar producto"
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewInStore(product)}
                      className="w-8 h-8"
                      title="Ver en tienda"
                    >
                      <Icon name="ExternalLink" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteProduct(product)}
                      className="w-8 h-8 text-error hover:text-error hover:bg-error/10"
                      title="Eliminar producto"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2">
            No hay productos
          </h3>
          <p className="text-text-secondary font-body">
            No se encontraron productos que coincidan con los filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;