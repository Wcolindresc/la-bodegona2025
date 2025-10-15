import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import AdminSidebar from '../../components/ui/AdminSidebar';
import ProductTable from './components/ProductTable';
import ProductFilters from './components/ProductFilters';
import BulkActions from './components/BulkActions';
import ProductForm from './components/ProductForm';
import ImportExportModal from './components/ImportExportModal';

const ProductManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formMode, setFormMode] = useState('create');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    stockStatus: 'all',
    status: 'all',
    priceMin: null,
    priceMax: null,
    dateFrom: '',
    dateTo: ''
  });

  // Mock data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smartphone Samsung Galaxy A54",
      sku: "SAMS-A54-128",
      description: `El Samsung Galaxy A54 5G combina un diseño elegante con tecnología avanzada para ofrecerte una experiencia móvil excepcional.\n\nCaracterísticas principales:\n• Pantalla Super AMOLED de 6.4 pulgadas\n• Cámara principal de 50MP con estabilización óptica\n• Procesador Exynos 1380 de alto rendimiento\n• Batería de 5000mAh con carga rápida de 25W\n• Resistencia al agua IP67`,
      shortDescription: "Smartphone 5G con cámara de 50MP y pantalla Super AMOLED",
      category: "Smartphones",
      price: 2499.99,
      comparePrice: 2799.99,
      cost: 1899.99,
      stock: 45,
      minStock: 10,
      weight: 0.202,
      dimensions: "158.2 x 76.7 x 8.2 mm",
      status: "active",
      featured: true,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", alt: "Samsung Galaxy A54" },
        { id: 2, url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", alt: "Vista trasera" }
      ],
      seoTitle: "Samsung Galaxy A54 5G - Smartphone con Cámara 50MP | La Bodegona",
      seoDescription: "Compra el Samsung Galaxy A54 5G con pantalla Super AMOLED, cámara de 50MP y batería de 5000mAh. Envío gratis en Guatemala.",
      tags: ["smartphone", "samsung", "5g", "android", "cámara"],
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Laptop HP Pavilion 15",
      sku: "HP-PAV-15-I5",
      description: `La HP Pavilion 15 es la laptop perfecta para trabajo y entretenimiento, diseñada para usuarios que buscan rendimiento y portabilidad.\n\nEspecificaciones técnicas:\n• Procesador Intel Core i5 de 11va generación\n• 8GB RAM DDR4 expandible hasta 16GB\n• SSD de 512GB para arranque rápido\n• Pantalla Full HD de 15.6 pulgadas\n• Gráficos Intel Iris Xe integrados\n• Conectividad Wi-Fi 6 y Bluetooth 5.0`,
      shortDescription: "Laptop con procesador Intel i5, 8GB RAM y SSD 512GB",
      category: "Laptops",
      price: 4299.99,
      comparePrice: null,
      cost: 3200.00,
      stock: 12,
      minStock: 5,
      weight: 1.75,
      dimensions: "35.85 x 24.2 x 1.79 cm",
      status: "active",
      featured: false,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400", alt: "HP Pavilion 15" }
      ],
      seoTitle: "Laptop HP Pavilion 15 Intel i5 8GB RAM | La Bodegona Guatemala",
      seoDescription: "Laptop HP Pavilion 15 con Intel Core i5, 8GB RAM y SSD 512GB. Ideal para trabajo y estudio. Compra con garantía oficial.",
      tags: ["laptop", "hp", "intel", "i5", "trabajo"],
      createdAt: "2024-02-01"
    },
    {
      id: 3,
      name: "Auriculares Sony WH-1000XM4",
      sku: "SONY-WH1000XM4",
      description: `Los auriculares Sony WH-1000XM4 ofrecen la mejor experiencia de audio con cancelación de ruido líder en la industria.\n\nCaracterísticas destacadas:\n• Cancelación de ruido adaptativa de clase mundial\n• Hasta 30 horas de batería con ANC activado\n• Carga rápida: 10 minutos = 5 horas de reproducción\n• Audio de alta resolución con LDAC\n• Control táctil intuitivo\n• Micrófono con tecnología de reducción de ruido`,
      shortDescription: "Auriculares inalámbricos con cancelación de ruido premium",
      category: "Audio",
      price: 1899.99,
      comparePrice: 2199.99,
      cost: 1400.00,
      stock: 8,
      minStock: 5,
      weight: 0.254,
      dimensions: "25.4 x 22.0 x 8.5 cm",
      status: "active",
      featured: true,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", alt: "Sony WH-1000XM4" }
      ],
      seoTitle: "Sony WH-1000XM4 Auriculares Cancelación Ruido | La Bodegona",
      seoDescription: "Auriculares Sony WH-1000XM4 con cancelación de ruido premium y 30h de batería. La mejor calidad de audio inalámbrico.",
      tags: ["auriculares", "sony", "bluetooth", "cancelacion ruido", "premium"],
      createdAt: "2024-01-20"
    },
    {
      id: 4,
      name: "Tablet iPad Air 10.9",
      sku: "APPLE-IPAD-AIR-64",
      description: `El iPad Air combina potencia y versatilidad en un diseño delgado y ligero, perfecto para creativos y profesionales.\n\nEspecificaciones:\n• Chip M1 de Apple para rendimiento excepcional\n• Pantalla Liquid Retina de 10.9 pulgadas\n• Cámara frontal ultra gran angular de 12MP\n• Compatible con Apple Pencil (2da generación)\n• Touch ID integrado en el botón superior\n• Conectividad Wi-Fi 6 ultrarrápida`,
      shortDescription: "Tablet con chip M1, pantalla Liquid Retina 10.9 pulgadas",
      category: "Tablets",
      price: 3799.99,
      comparePrice: null,
      cost: 2900.00,
      stock: 0,
      minStock: 3,
      weight: 0.461,
      dimensions: "24.76 x 17.85 x 0.61 cm",
      status: "active",
      featured: false,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400", alt: "iPad Air" }
      ],
      seoTitle: "iPad Air M1 10.9 pulgadas 64GB Wi-Fi | La Bodegona Guatemala",
      seoDescription: "iPad Air con chip M1, pantalla Liquid Retina y compatibilidad con Apple Pencil. Potencia profesional en diseño portátil.",
      tags: ["ipad", "apple", "tablet", "m1", "creatividad"],
      createdAt: "2024-01-10"
    },
    {
      id: 5,
      name: "Monitor Gaming ASUS ROG 27",
      sku: "ASUS-ROG-27-144HZ",
      description: `Monitor gaming ASUS ROG de 27 pulgadas diseñado para gamers competitivos que buscan la máxima fluidez y precisión.\n\nCaracterísticas gaming:\n• Panel IPS de 27 pulgadas Full HD\n• Frecuencia de actualización de 144Hz\n• Tiempo de respuesta de 1ms (GTG)\n• Compatible con G-SYNC y FreeSync\n• HDR10 para colores vibrantes\n• Múltiples puertos: HDMI, DisplayPort, USB`,
      shortDescription: "Monitor gaming 27\" 144Hz con tecnología G-SYNC",
      category: "Monitores",
      price: 2199.99,
      comparePrice: 2499.99,
      cost: 1650.00,
      stock: 15,
      minStock: 8,
      weight: 4.5,
      dimensions: "61.4 x 36.8 x 5.2 cm",
      status: "active",
      featured: true,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400", alt: "Monitor ASUS ROG" }
      ],
      seoTitle: "Monitor Gaming ASUS ROG 27\" 144Hz G-SYNC | La Bodegona",
      seoDescription: "Monitor gaming ASUS ROG 27 pulgadas con 144Hz, 1ms de respuesta y tecnología G-SYNC. Perfecto para gaming competitivo.",
      tags: ["monitor", "gaming", "asus", "144hz", "gsync"],
      createdAt: "2024-02-05"
    },
    {
      id: 6,
      name: "Teclado Mecánico Logitech MX",
      sku: "LOGI-MX-MECH-ES",
      description: `Teclado mecánico premium Logitech MX diseñado para productividad y comodidad durante largas sesiones de trabajo.\n\nCaracterísticas profesionales:\n• Switches mecánicos táctiles silenciosos\n• Retroiluminación LED inteligente\n• Conectividad inalámbrica y USB-C\n• Batería recargable de larga duración\n• Compatible con múltiples dispositivos\n• Diseño ergonómico con reposamuñecas`,
      shortDescription: "Teclado mecánico inalámbrico para productividad",
      category: "Accesorios",
      price: 899.99,
      comparePrice: null,
      cost: 650.00,
      stock: 25,
      minStock: 10,
      weight: 0.612,
      dimensions: "43.1 x 13.2 x 2.6 cm",
      status: "inactive",
      featured: false,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400", alt: "Teclado Logitech MX" }
      ],
      seoTitle: "Teclado Mecánico Logitech MX Inalámbrico | La Bodegona",
      seoDescription: "Teclado mecánico Logitech MX con switches silenciosos, retroiluminación y conectividad inalámbrica. Ideal para profesionales.",
      tags: ["teclado", "mecanico", "logitech", "inalambrico", "productividad"],
      createdAt: "2024-01-25"
    }
  ]);

  const categories = [
    { id: 1, name: "Smartphones" },
    { id: 2, name: "Laptops" },
    { id: 3, name: "Audio" },
    { id: 4, name: "Tablets" },
    { id: 5, name: "Monitores" },
    { id: 6, name: "Accesorios" }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products?.filter(product => {
      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        if (!product?.name?.toLowerCase()?.includes(searchTerm) && 
            !product?.sku?.toLowerCase()?.includes(searchTerm)) {
          return false;
        }
      }

      // Category filter
      if (filters?.category && filters?.category !== 'all') {
        if (product?.category !== filters?.category) return false;
      }

      // Stock status filter
      if (filters?.stockStatus && filters?.stockStatus !== 'all') {
        if (filters?.stockStatus === 'out_of_stock' && product?.stock > 0) return false;
        if (filters?.stockStatus === 'low_stock' && (product?.stock === 0 || product?.stock > 10)) return false;
        if (filters?.stockStatus === 'in_stock' && product?.stock <= 10) return false;
      }

      // Product status filter
      if (filters?.status && filters?.status !== 'all') {
        if (product?.status !== filters?.status) return false;
      }

      // Price range filter
      if (filters?.priceMin && product?.price < filters?.priceMin) return false;
      if (filters?.priceMax && product?.price > filters?.priceMax) return false;

      // Date range filter
      if (filters?.dateFrom && new Date(product.createdAt) < new Date(filters.dateFrom)) return false;
      if (filters?.dateTo && new Date(product.createdAt) > new Date(filters.dateTo)) return false;

      return true;
    });

    // Sort products
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [products, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev?.includes(productId) 
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts?.length === filteredAndSortedProducts?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredAndSortedProducts?.map(p => p?.id));
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setFormMode('create');
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormMode('edit');
    setShowProductForm(true);
  };

  const handleDuplicateProduct = (product) => {
    setEditingProduct(product);
    setFormMode('duplicate');
    setShowProductForm(true);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${product?.name}"?`)) {
      setProducts(prev => prev?.filter(p => p?.id !== product?.id));
      setSelectedProducts(prev => prev?.filter(id => id !== product?.id));
    }
  };

  const handleViewInStore = (product) => {
    window.open(`/product-details?id=${product?.id}`, '_blank');
  };

  const handleSaveProduct = (productData) => {
    if (formMode === 'create' || formMode === 'duplicate') {
      setProducts(prev => [...prev, { ...productData, id: Date.now() }]);
    } else {
      setProducts(prev => prev?.map(p => p?.id === productData?.id ? productData : p));
    }
    setShowProductForm(false);
  };

  const handleBulkStatusChange = (status) => {
    setProducts(prev => prev?.map(p => 
      selectedProducts?.includes(p?.id) ? { ...p, status } : p
    ));
    setSelectedProducts([]);
  };

  const handleBulkCategoryChange = (categoryId) => {
    const category = categories?.find(c => c?.id === categoryId);
    if (category) {
      setProducts(prev => prev?.map(p => 
        selectedProducts?.includes(p?.id) ? { ...p, category: category?.name } : p
      ));
      setSelectedProducts([]);
    }
  };

  const handleBulkDelete = () => {
    setProducts(prev => prev?.filter(p => !selectedProducts?.includes(p?.id)));
    setSelectedProducts([]);
  };

  const handleBulkExport = () => {
    const selectedProductsData = products?.filter(p => selectedProducts?.includes(p?.id));
    console.log('Exporting products:', selectedProductsData);
    // Implement export logic here
  };

  const handleImport = (file) => {
    // Simulate import process
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Importing file:', file.name);
        resolve();
      }, 2000);
    });
  };

  const handleExport = (format, options) => {
    // Simulate export process
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Exporting in format:', format, 'with options:', options);
        resolve();
      }, 1000);
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      stockStatus: 'all',
      status: 'all',
      priceMin: null,
      priceMax: null,
      dateFrom: '',
      dateTo: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'}`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    Gestión de Productos
                  </h1>
                  <p className="text-text-secondary font-body mt-1">
                    Administra tu catálogo de productos, inventario y configuraciones
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowImportExport(true)}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Importar/Exportar
                  </Button>
                  
                  <Button
                    onClick={handleCreateProduct}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Nuevo Producto
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <Icon name="Package" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-caption text-text-secondary">Total Productos</p>
                      <p className="text-xl font-heading font-bold text-card-foreground">{products?.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                      <Icon name="CheckCircle" size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-caption text-text-secondary">Activos</p>
                      <p className="text-xl font-heading font-bold text-card-foreground">
                        {products?.filter(p => p?.status === 'active')?.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
                      <Icon name="AlertTriangle" size={20} className="text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-caption text-text-secondary">Stock Bajo</p>
                      <p className="text-xl font-heading font-bold text-card-foreground">
                        {products?.filter(p => p?.stock > 0 && p?.stock <= 10)?.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-lg">
                      <Icon name="XCircle" size={20} className="text-error" />
                    </div>
                    <div>
                      <p className="text-sm font-caption text-text-secondary">Agotados</p>
                      <p className="text-xl font-heading font-bold text-card-foreground">
                        {products?.filter(p => p?.stock === 0)?.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              categories={categories}
              totalProducts={products?.length}
              filteredProducts={filteredAndSortedProducts?.length}
            />

            {/* Bulk Actions */}
            <BulkActions
              selectedProducts={selectedProducts}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkCategoryChange={handleBulkCategoryChange}
              onBulkDelete={handleBulkDelete}
              onBulkExport={handleBulkExport}
              categories={categories}
            />

            {/* Products Table */}
            <ProductTable
              products={filteredAndSortedProducts}
              selectedProducts={selectedProducts}
              onSelectProduct={handleSelectProduct}
              onSelectAll={handleSelectAll}
              onEditProduct={handleEditProduct}
              onDuplicateProduct={handleDuplicateProduct}
              onDeleteProduct={handleDeleteProduct}
              onViewInStore={handleViewInStore}
              sortConfig={sortConfig}
              onSort={handleSort}
            />

            {/* Navigation Links */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/admin-dashboard">
                <Button variant="outline" iconName="ArrowLeft" iconPosition="left">
                  Volver al Dashboard
                </Button>
              </Link>
              <Link to="/product-catalog">
                <Button variant="outline" iconName="ExternalLink" iconPosition="right">
                  Ver Catálogo Público
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        isOpen={showProductForm}
        onClose={() => setShowProductForm(false)}
        onSave={handleSaveProduct}
        categories={categories}
        mode={formMode}
      />
      {/* Import/Export Modal */}
      <ImportExportModal
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
        onImport={handleImport}
        onExport={handleExport}
      />
    </div>
  );
};

export default ProductManagement;