import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductForm = ({ 
  product, 
  isOpen, 
  onClose, 
  onSave, 
  categories,
  mode = 'create' // 'create', 'edit', 'duplicate'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    sku: '',
    price: '',
    comparePrice: '',
    cost: '',
    category: '',
    stock: '',
    minStock: '',
    weight: '',
    dimensions: '',
    status: 'active',
    featured: false,
    images: [],
    seoTitle: '',
    seoDescription: '',
    tags: ''
  });

  const [draggedImages, setDraggedImages] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product && (mode === 'edit' || mode === 'duplicate')) {
      setFormData({
        ...product,
        name: mode === 'duplicate' ? `${product?.name} (Copia)` : product?.name,
        sku: mode === 'duplicate' ? `${product?.sku}-copy` : product?.sku,
        price: product?.price?.toString(),
        comparePrice: product?.comparePrice?.toString() || '',
        cost: product?.cost?.toString() || '',
        stock: product?.stock?.toString(),
        minStock: product?.minStock?.toString() || '',
        weight: product?.weight?.toString() || '',
        tags: product?.tags?.join(', ') || ''
      });
      setDraggedImages(product?.images || []);
    } else {
      // Reset form for create mode
      setFormData({
        name: '',
        description: '',
        shortDescription: '',
        sku: '',
        price: '',
        comparePrice: '',
        cost: '',
        category: '',
        stock: '',
        minStock: '',
        weight: '',
        dimensions: '',
        status: 'active',
        featured: false,
        images: [],
        seoTitle: '',
        seoDescription: '',
        tags: ''
      });
      setDraggedImages([]);
    }
    setErrors({});
  }, [product, mode, isOpen]);

  const tabs = [
    { id: 'basic', label: 'Información Básica', icon: 'Info' },
    { id: 'pricing', label: 'Precios e Inventario', icon: 'DollarSign' },
    { id: 'images', label: 'Imágenes', icon: 'Image' },
    { id: 'seo', label: 'SEO y Metadatos', icon: 'Search' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const newImages = files?.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      file: file,
      alt: formData?.name || 'Producto'
    }));
    setDraggedImages(prev => [...prev, ...newImages]);
  };

  const handleImageDrop = (e) => {
    e?.preventDefault();
    const files = Array.from(e?.dataTransfer?.files);
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    const newImages = imageFiles?.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      file: file,
      alt: formData?.name || 'Producto'
    }));
    setDraggedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setDraggedImages(prev => prev?.filter(img => img?.id !== imageId));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData?.sku?.trim()) newErrors.sku = 'El SKU es requerido';
    if (!formData?.price || parseFloat(formData?.price) <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (!formData?.category) newErrors.category = 'La categoría es requerida';
    if (!formData?.stock || parseInt(formData?.stock) < 0) newErrors.stock = 'El stock debe ser 0 o mayor';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData?.price),
        comparePrice: formData?.comparePrice ? parseFloat(formData?.comparePrice) : null,
        cost: formData?.cost ? parseFloat(formData?.cost) : null,
        stock: parseInt(formData?.stock),
        minStock: formData?.minStock ? parseInt(formData?.minStock) : null,
        weight: formData?.weight ? parseFloat(formData?.weight) : null,
        images: draggedImages,
        tags: formData?.tags ? formData?.tags?.split(',')?.map(tag => tag?.trim()) : [],
        id: mode === 'create' ? Date.now() : product?.id
      };

      await onSave(productData);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border shadow-soft-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-card-foreground">
              {mode === 'create' && 'Crear Nuevo Producto'}
              {mode === 'edit' && 'Editar Producto'}
              {mode === 'duplicate' && 'Duplicar Producto'}
            </h2>
            <p className="text-sm text-text-secondary font-body mt-1">
              {mode === 'create' && 'Completa la información para agregar un nuevo producto'}
              {mode === 'edit' && 'Modifica la información del producto'}
              {mode === 'duplicate' && 'Crea una copia del producto con nueva información'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-card-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nombre del Producto"
                    type="text"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    error={errors?.name}
                    required
                    placeholder="Ej: Smartphone Samsung Galaxy"
                  />
                  
                  <Input
                    label="SKU"
                    type="text"
                    value={formData?.sku}
                    onChange={(e) => handleInputChange('sku', e?.target?.value)}
                    error={errors?.sku}
                    required
                    placeholder="Ej: SAMS-GAL-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-card-foreground mb-2">
                    Categoría *
                  </label>
                  <select
                    value={formData?.category}
                    onChange={(e) => handleInputChange('category', e?.target?.value)}
                    className={`w-full px-3 py-2 border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors?.category ? 'border-error' : 'border-border'
                    }`}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories?.map((category) => (
                      <option key={category?.id} value={category?.name}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                  {errors?.category && (
                    <p className="mt-1 text-sm text-error font-caption">{errors?.category}</p>
                  )}
                </div>

                <Input
                  label="Descripción Corta"
                  type="text"
                  value={formData?.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e?.target?.value)}
                  placeholder="Descripción breve para listados"
                />

                <div>
                  <label className="block text-sm font-body font-medium text-card-foreground mb-2">
                    Descripción Completa
                  </label>
                  <textarea
                    value={formData?.description}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData?.status === 'active'}
                      onChange={(e) => handleInputChange('status', e?.target?.checked ? 'active' : 'inactive')}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm font-body text-card-foreground">Producto activo</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData?.featured}
                      onChange={(e) => handleInputChange('featured', e?.target?.checked)}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm font-body text-card-foreground">Producto destacado</span>
                  </label>
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="Precio de Venta (GTQ)"
                    type="number"
                    step="0.01"
                    value={formData?.price}
                    onChange={(e) => handleInputChange('price', e?.target?.value)}
                    error={errors?.price}
                    required
                    placeholder="0.00"
                  />
                  
                  <Input
                    label="Precio de Comparación (GTQ)"
                    type="number"
                    step="0.01"
                    value={formData?.comparePrice}
                    onChange={(e) => handleInputChange('comparePrice', e?.target?.value)}
                    placeholder="0.00"
                    description="Precio anterior o sugerido"
                  />
                  
                  <Input
                    label="Costo (GTQ)"
                    type="number"
                    step="0.01"
                    value={formData?.cost}
                    onChange={(e) => handleInputChange('cost', e?.target?.value)}
                    placeholder="0.00"
                    description="Costo de adquisición"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Stock Actual"
                    type="number"
                    value={formData?.stock}
                    onChange={(e) => handleInputChange('stock', e?.target?.value)}
                    error={errors?.stock}
                    required
                    placeholder="0"
                  />
                  
                  <Input
                    label="Stock Mínimo"
                    type="number"
                    value={formData?.minStock}
                    onChange={(e) => handleInputChange('minStock', e?.target?.value)}
                    placeholder="0"
                    description="Alerta cuando el stock sea menor"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Peso (kg)"
                    type="number"
                    step="0.01"
                    value={formData?.weight}
                    onChange={(e) => handleInputChange('weight', e?.target?.value)}
                    placeholder="0.00"
                  />
                  
                  <Input
                    label="Dimensiones"
                    type="text"
                    value={formData?.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e?.target?.value)}
                    placeholder="Ej: 10x15x5 cm"
                  />
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors"
                  onDrop={handleImageDrop}
                  onDragOver={(e) => e?.preventDefault()}
                >
                  <Icon name="Upload" size={48} className="mx-auto text-text-secondary mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2">
                    Arrastra imágenes aquí
                  </h3>
                  <p className="text-text-secondary font-body mb-4">
                    O haz clic para seleccionar archivos
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Seleccionar Imágenes
                  </Button>
                </div>

                {draggedImages?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-body font-medium text-card-foreground mb-3">
                      Imágenes del Producto ({draggedImages?.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {draggedImages?.map((image, index) => (
                        <div key={image?.id} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={image?.url}
                              alt={image?.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeImage(image?.id)}
                              className="w-6 h-6"
                            >
                              <Icon name="X" size={12} />
                            </Button>
                          </div>
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2">
                              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                Principal
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <Input
                  label="Título SEO"
                  type="text"
                  value={formData?.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e?.target?.value)}
                  placeholder="Título optimizado para buscadores"
                  description="Recomendado: 50-60 caracteres"
                />

                <div>
                  <label className="block text-sm font-body font-medium text-card-foreground mb-2">
                    Descripción SEO
                  </label>
                  <textarea
                    value={formData?.seoDescription}
                    onChange={(e) => handleInputChange('seoDescription', e?.target?.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    placeholder="Descripción meta para buscadores..."
                  />
                  <p className="mt-1 text-xs text-text-secondary font-caption">
                    Recomendado: 150-160 caracteres
                  </p>
                </div>

                <Input
                  label="Etiquetas"
                  type="text"
                  value={formData?.tags}
                  onChange={(e) => handleInputChange('tags', e?.target?.value)}
                  placeholder="smartphone, samsung, android, móvil"
                  description="Separar con comas"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border p-6 bg-muted/30">
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
              >
                {mode === 'create' && 'Crear Producto'}
                {mode === 'edit' && 'Guardar Cambios'}
                {mode === 'duplicate' && 'Duplicar Producto'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;