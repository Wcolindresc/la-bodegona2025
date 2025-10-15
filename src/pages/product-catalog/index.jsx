import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import CategoryChips from './components/CategoryChips';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import { ProductGrid } from './components/ProductGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 1000,
    availability: null,
    rating: null
  });

  const location = useLocation();
  const productsPerPage = 20;

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      category: "Electrónicos",
      brand: "apple",
      price: 8999.99,
      originalPrice: 9499.99,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      rating: 4.8,
      reviewCount: 324,
      stock: 15,
      isNew: true,
      discount: 5,
      description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.7 pulgadas.",
      variants: [
        { id: 'iphone-256', name: '256GB', price: 8999.99, stock: 15 },
        { id: 'iphone-512', name: '512GB', price: 9999.99, stock: 8 },
        { id: 'iphone-1tb', name: '1TB', price: 11999.99, stock: 3 }
      ]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      category: "Electrónicos",
      brand: "samsung",
      price: 7899.99,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      rating: 4.7,
      reviewCount: 256,
      stock: 22,
      isNew: true,
      discount: 0,
      description: "Smartphone premium con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X."
    },
    {
      id: 3,
      name: "Nike Air Max 270 React",
      category: "Ropa y Accesorios",
      brand: "nike",
      price: 899.99,
      originalPrice: 1199.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      rating: 4.5,
      reviewCount: 189,
      stock: 45,
      isNew: false,
      discount: 25,
      description: "Zapatillas deportivas con tecnología Air Max para máxima comodidad y estilo urbano."
    },
    {
      id: 4,
      name: "MacBook Pro 14\" M3 Pro",
      category: "Electrónicos",
      brand: "apple",
      price: 15999.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      rating: 4.9,
      reviewCount: 142,
      stock: 8,
      isNew: true,
      discount: 0,
      description: "Laptop profesional con chip M3 Pro, pantalla Liquid Retina XDR y hasta 18 horas de batería."
    },
    {
      id: 5,
      name: "Sony WH-1000XM5 Auriculares",
      category: "Electrónicos",
      brand: "sony",
      price: 2299.99,
      originalPrice: 2799.99,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
      rating: 4.6,
      reviewCount: 298,
      stock: 33,
      isNew: false,
      discount: 18,
      description: "Auriculares inalámbricos con cancelación de ruido líder en la industria y sonido Hi-Res."
    },
    {
      id: 6,
      name: "Adidas Ultraboost 22",
      category: "Ropa y Accesorios",
      brand: "adidas",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
      rating: 4.4,
      reviewCount: 167,
      stock: 28,
      isNew: false,
      discount: 0,
      description: "Zapatillas de running con tecnología Boost para máximo retorno de energía."
    },
    {
      id: 7,
      name: "iPad Air 5ta Generación",
      category: "Electrónicos",
      brand: "apple",
      price: 4999.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      rating: 4.7,
      reviewCount: 203,
      stock: 19,
      isNew: false,
      discount: 0,
      description: "Tablet versátil con chip M1, pantalla Liquid Retina de 10.9 pulgadas y compatibilidad con Apple Pencil."
    },
    {
      id: 8,
      name: "Samsung 55\" QLED 4K Smart TV",
      category: "Electrónicos",
      brand: "samsung",
      price: 6499.99,
      originalPrice: 7999.99,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      rating: 4.5,
      reviewCount: 134,
      stock: 12,
      isNew: false,
      discount: 19,
      description: "Smart TV QLED con tecnología Quantum Dot, HDR10+ y sistema operativo Tizen."
    },
    {
      id: 9,
      name: "Camiseta Nike Dri-FIT",
      category: "Ropa y Accesorios",
      brand: "nike",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      rating: 4.3,
      reviewCount: 89,
      stock: 67,
      isNew: false,
      discount: 0,
      description: "Camiseta deportiva con tecnología Dri-FIT para mantener la piel seca y cómoda."
    },
    {
      id: 10,
      name: "Kindle Paperwhite 11va Gen",
      category: "Libros",
      brand: "amazon",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      rating: 4.6,
      reviewCount: 445,
      stock: 41,
      isNew: true,
      discount: 0,
      description: "E-reader con pantalla de 6.8 pulgadas, resistente al agua y batería de semanas."
    },
    {
      id: 11,
      name: "Dyson V15 Detect Aspiradora",
      category: "Hogar y Jardín",
      brand: "dyson",
      price: 4599.99,
      originalPrice: 5299.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      rating: 4.8,
      reviewCount: 178,
      stock: 7,
      isNew: false,
      discount: 13,
      description: "Aspiradora inalámbrica con tecnología de detección láser y hasta 60 minutos de autonomía."
    },
    {
      id: 12,
      name: "PlayStation 5 Console",
      category: "Juguetes",
      brand: "sony",
      price: 3999.99,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
      rating: 4.9,
      reviewCount: 567,
      stock: 0,
      isNew: false,
      discount: 0,
      description: "Consola de videojuegos de nueva generación con gráficos 4K y SSD ultra rápido."
    }
  ];

  useEffect(() => {
    // Simulate loading products
    const loadProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filters, sortBy, searchQuery]);

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.categories?.some(category => 
          product?.category?.toLowerCase()?.includes(category?.toLowerCase())
        )
      );
    }

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.brands?.includes(product?.brand)
      );
    }

    // Apply price filter
    filtered = filtered?.filter(product =>
      product?.price >= filters?.minPrice && product?.price <= filters?.maxPrice
    );

    // Apply availability filter
    if (filters?.availability === 'in-stock') {
      filtered = filtered?.filter(product => product?.stock > 0);
    } else if (filters?.availability === 'out-of-stock') {
      filtered = filtered?.filter(product => product?.stock === 0);
    }

    // Apply rating filter
    if (filters?.rating) {
      filtered = filtered?.filter(product => product?.rating >= filters?.rating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high-low':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'name-az':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      default: // relevance
        // Keep original order or apply relevance algorithm
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (product, variant = null) => {
    const productToAdd = variant ? { ...product, selectedVariant: variant } : product;
    
    // Simulate adding to cart
    const message = `${productToAdd?.name} agregado al carrito`;
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleCategoryToggle = (categories) => {
    setFilters(prev => ({ ...prev, categories }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const loadMoreProducts = () => {
    // Simulate loading more products
    setCurrentPage(prev => prev + 1);
    // In a real app, you would fetch more products here
  };

  const displayedProducts = filteredProducts?.slice(0, currentPage * productsPerPage);
  const hasMoreProducts = filteredProducts?.length > displayedProducts?.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-4 z-50 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-soft-lg flex items-center gap-3 animate-in slide-in-from-right">
          <Icon name="CheckCircle" size={20} />
          <span className="font-medium">{successMessage}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSuccessMessage(false)}
            className="w-6 h-6 text-success-foreground hover:bg-success-foreground/20"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      )}
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Catálogo de Productos</h1>
          <p className="text-text-secondary">
            Descubre nuestra amplia selección de productos de calidad
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Category Chips */}
        <div className="mb-6">
          <CategoryChips
            selectedCategories={filters?.categories}
            onCategoryToggle={handleCategoryToggle}
          />
        </div>

        <div className="flex gap-6">
          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={isFilterPanelOpen}
            onToggle={toggleFilterPanel}
            productCount={filteredProducts?.length}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort Controls */}
            <div className="mb-6">
              <SortControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onToggleFilters={toggleFilterPanel}
              />
            </div>

            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                Mostrando {displayedProducts?.length} de {filteredProducts?.length} productos
                {searchQuery && (
                  <span> para "{searchQuery}"</span>
                )}
              </p>
              
              {filteredProducts?.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Icon name="Filter" size={16} />
                  <span>
                    {Object.values(filters)?.filter(value => 
                      Array.isArray(value) ? value?.length > 0 : value !== null && value !== 0 && value !== 1000
                    )?.length} filtros activos
                  </span>
                </div>
              )}
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={displayedProducts}
              viewMode={viewMode}
              onAddToCart={handleAddToCart}
              loading={loading}
            />

            {/* Load More Button */}
            {hasMoreProducts && !loading && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  onClick={loadMoreProducts}
                  iconName="ChevronDown"
                  iconPosition="right"
                  className="px-8"
                >
                  Cargar más productos
                </Button>
              </div>
            )}

            {/* Back to Top */}
            {displayedProducts?.length > 12 && (
              <div className="fixed bottom-6 right-6 z-40">
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-12 h-12 rounded-full shadow-soft-lg"
                >
                  <Icon name="ArrowUp" size={20} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;