import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    shortDescription: "El iPhone más avanzado con chip A17 Pro, sistema de cámaras profesional y pantalla Super Retina XDR de 6.7 pulgadas.",
    fullDescription: `El iPhone 15 Pro Max representa la cúspide de la innovación de Apple, diseñado para usuarios que exigen lo mejor en tecnología móvil.\n\nCon el revolucionario chip A17 Pro fabricado en proceso de 3 nanómetros, este dispositivo ofrece un rendimiento sin precedentes para aplicaciones profesionales, juegos y tareas de productividad intensiva.\n\nLa pantalla Super Retina XDR de 6.7 pulgadas con ProMotion proporciona colores vibrantes, negros profundos y una experiencia visual inmersiva que redefine lo que esperas de un smartphone.\n\nEl sistema de cámaras Pro incluye una cámara principal de 48MP, ultra gran angular y teleobjetivo con zoom óptico 5x, permitiendo capturar fotografías y videos de calidad cinematográfica en cualquier condición de iluminación.`,
    price: 8999.99,
    originalPrice: 9499.99,
    currency: "GTQ",
    category: "Electrónicos",
    rating: 4.8,
    reviewCount: 247,
    stock: 12,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800"
    ],
    variants: [
      {
        id: "iphone15pro-256gb-natural",
        name: "Natural Titanium 256GB",
        price: 8999.99,
        description: "Acabado en titanio natural con 256GB de almacenamiento"
      },
      {
        id: "iphone15pro-512gb-natural",
        name: "Natural Titanium 512GB", 
        price: 9999.99,
        description: "Acabado en titanio natural con 512GB de almacenamiento"
      },
      {
        id: "iphone15pro-1tb-natural",
        name: "Natural Titanium 1TB",
        price: 11999.99,
        description: "Acabado en titanio natural con 1TB de almacenamiento"
      }
    ],
    features: [
      "Chip A17 Pro con GPU de 6 núcleos",
      "Pantalla Super Retina XDR de 6.7 pulgadas",
      "Sistema de cámaras Pro con zoom óptico 5x",
      "Grabación de video 4K ProRes",
      "Resistencia al agua IP68",
      "Carga inalámbrica MagSafe hasta 15W",
      "5G ultra rápido",
      "Face ID avanzado"
    ],
    highlights: [
      "Diseño premium en titanio de grado aeroespacial",
      "Batería de larga duración con hasta 29 horas de reproducción de video",
      "Cámara principal de 48MP con modo Acción mejorado",
      "Puerto USB-C con velocidades de transferencia USB 3",
      "Dynamic Island para notificaciones intuitivas",
      "iOS 17 con nuevas funciones de personalización"
    ],
    specifications: {
      general: {
        modelo: "iPhone 15 Pro Max",
        color: "Natural Titanium",
        almacenamiento: "256GB",
        peso: "221 gramos",
        dimensiones: "159.9 x 76.7 x 8.25 mm"
      },
      pantalla: {
        tamaño: "6.7 pulgadas",
        tecnología: "Super Retina XDR OLED",
        resolución: "2796 x 1290 píxeles",
        densidad: "460 ppi",
        brillo: "1000 nits típico, 2000 nits HDR"
      },
      cámara: {
        principal: "48MP f/1.78",
        ultraGranAngular: "12MP f/2.2",
        teleobjetivo: "12MP f/2.8",
        frontal: "12MP TrueDepth f/1.9",
        video: "4K ProRes, Dolby Vision HDR"
      },
      conectividad: {
        red: "5G, 4G LTE",
        wifi: "Wi-Fi 6E",
        bluetooth: "Bluetooth 5.3",
        puerto: "USB-C",
        nfc: "Sí, con modo lector"
      }
    }
  };

  useEffect(() => {
    const productId = searchParams?.get('id');
    
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (productId) {
          // In real app, fetch product by ID
          setProduct(mockProduct);
        } else {
          // Default product if no ID provided
          setProduct(mockProduct);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/product-catalog');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams, navigate]);

  const handleAddToCart = async ({ productId, variant, quantity }) => {
    try {
      // Mock add to cart functionality
      const cartItem = {
        id: Date.now(),
        productId,
        productName: product?.name,
        variant,
        quantity,
        price: variant?.price || product?.price,
        image: product?.images?.[0]
      };
      
      setCartItems(prev => [...prev, cartItem]);
      
      // Show success message (in real app, use toast/notification)
      alert(`${quantity} ${product?.name} agregado al carrito`);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar al carrito. Inténtalo de nuevo.');
    }
  };

  const handleAddToWishlist = () => {
    try {
      const wishlistItem = {
        id: product?.id,
        name: product?.name,
        price: product?.price,
        image: product?.images?.[0]
      };
      
      setWishlistItems(prev => {
        const exists = prev?.find(item => item?.id === product?.id);
        if (exists) {
          alert('Este producto ya está en tus favoritos');
          return prev;
        }
        
        alert('Producto agregado a favoritos');
        return [...prev, wishlistItem];
      });
      
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Error al agregar a favoritos. Inténtalo de nuevo.');
    }
  };

  const handleBreadcrumbNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-text-secondary">Cargando producto...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <h1 className="text-2xl font-heading font-bold text-text-primary">
              Producto no encontrado
            </h1>
            <p className="text-text-secondary">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <Button
              variant="default"
              onClick={() => navigate('/product-catalog')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Volver al Catálogo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-6">
          <button
            onClick={() => handleBreadcrumbNavigation('/product-catalog')}
            className="text-text-secondary hover:text-primary transition-colors duration-200"
          >
            Catálogo
          </button>
          <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          <button
            onClick={() => handleBreadcrumbNavigation(`/product-catalog?category=${encodeURIComponent(product?.category)}`)}
            className="text-text-secondary hover:text-primary transition-colors duration-200"
          >
            {product?.category}
          </button>
          <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          <span className="text-text-primary font-medium truncate">
            {product?.name}
          </span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImageGallery 
              images={product?.images} 
              productName={product?.name}
            />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <CustomerReviews product={product} />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts 
            currentProductId={product?.id}
            category={product?.category}
          />
        </div>

        {/* Sticky Mobile Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 lg:hidden z-40">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="text-lg font-heading font-bold text-primary">
                {new Intl.NumberFormat('es-GT', {
                  style: 'currency',
                  currency: 'GTQ'
                })?.format(product?.price)}
              </div>
              <div className="text-sm text-text-secondary">
                {product?.stock > 0 ? 'En stock' : 'Agotado'}
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              disabled={product?.stock === 0}
              onClick={() => handleAddToCart({
                productId: product?.id,
                variant: product?.variants?.[0],
                quantity: 1
              })}
              iconName="ShoppingCart"
              iconPosition="left"
            >
              {product?.stock === 0 ? 'Agotado' : 'Agregar'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;