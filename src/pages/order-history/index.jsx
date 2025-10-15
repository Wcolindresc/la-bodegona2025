import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrderCard from './components/OrderCard';
import OrderFilters from './components/OrderFilters';
import OrderStats from './components/OrderStats';
import EmptyOrderHistory from './components/EmptyOrderHistory';
import TrackingModal from './components/TrackingModal';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    priceRange: '',
    sortBy: 'newest',
    startDate: '',
    endDate: ''
  });
  const [trackingModal, setTrackingModal] = useState({
    isOpen: false,
    data: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Mock order data
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      orderNumber: '2024-001',
      orderDate: '2024-10-05T10:30:00Z',
      status: 'entregado',
      total: 450.75,
      subtotal: 380.50,
      shipping: 35.00,
      tax: 35.25,
      trackingNumber: 'GT1234567890',
      lastUpdate: '2024-10-07T14:20:00Z',
      items: [
        {
          id: 1,
          productId: 'PROD-001',
          name: 'Smartphone Samsung Galaxy A54 128GB',
          price: 2899.99,
          quantity: 1,
          image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'
        },
        {
          id: 2,
          productId: 'PROD-002',
          name: 'Funda Protectora Transparente',
          price: 89.99,
          quantity: 1,
          image: 'https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg'
        }
      ],
      shippingAddress: {
        name: 'María González',
        street: 'Avenida Las Américas 15-45, Zona 13',
        city: 'Guatemala',
        state: 'Guatemala',
        zipCode: '01013',
        phone: '+502 5555-1234'
      },
      paymentMethod: {
        type: 'Tarjeta de Crédito',
        last4: '4532'
      }
    },
    {
      id: 'ORD-2024-002',
      orderNumber: '2024-002',
      orderDate: '2024-10-03T15:45:00Z',
      status: 'enviado',
      total: 1250.00,
      subtotal: 1050.00,
      shipping: 50.00,
      tax: 150.00,
      trackingNumber: 'GT0987654321',
      lastUpdate: '2024-10-08T09:15:00Z',
      items: [
        {
          id: 3,
          productId: 'PROD-003',
          name: 'Laptop Dell Inspiron 15 3000',
          price: 4999.99,
          quantity: 1,
          image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'
        }
      ],
      shippingAddress: {
        name: 'Carlos Rodríguez',
        street: 'Calzada Roosevelt 22-00, Zona 11',
        city: 'Guatemala',
        state: 'Guatemala',
        zipCode: '01011',
        phone: '+502 5555-5678'
      },
      paymentMethod: {
        type: 'PayPal',
        last4: null
      }
    },
    {
      id: 'ORD-2024-003',
      orderNumber: '2024-003',
      orderDate: '2024-10-01T12:20:00Z',
      status: 'procesando',
      total: 325.50,
      subtotal: 275.00,
      shipping: 25.00,
      tax: 25.50,
      trackingNumber: null,
      lastUpdate: '2024-10-02T16:30:00Z',
      items: [
        {
          id: 4,
          productId: 'PROD-004',
          name: 'Auriculares Bluetooth Sony WH-CH720N',
          price: 899.99,
          quantity: 1,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
        },
        {
          id: 5,
          productId: 'PROD-005',
          name: 'Cable USB-C 2 metros',
          price: 45.00,
          quantity: 2,
          image: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg'
        }
      ],
      shippingAddress: {
        name: 'Ana López',
        street: '6ta Avenida 12-23, Zona 1',
        city: 'Guatemala',
        state: 'Guatemala',
        zipCode: '01001',
        phone: '+502 5555-9012'
      },
      paymentMethod: {
        type: 'Transferencia Bancaria',
        last4: null
      }
    }
  ];

  // Mock tracking data
  const mockTrackingData = {
    orderNumber: '2024-001',
    trackingNumber: 'GT1234567890',
    carrier: 'Cargo Express GT',
    estimatedDelivery: '2024-10-10T18:00:00Z',
    deliveryAddress: {
      name: 'María González',
      street: 'Avenida Las Américas 15-45, Zona 13',
      city: 'Guatemala',
      state: 'Guatemala',
      zipCode: '01013'
    },
    timeline: [
      {
        status: 'order_placed',
        title: 'Pedido Realizado',
        description: 'Tu pedido ha sido confirmado y está siendo preparado',
        date: '2024-10-05T10:30:00Z',
        location: 'La Bodegona - Centro de Distribución',
        completed: true
      },
      {
        status: 'processing',
        title: 'Procesando Pedido',
        description: 'Los productos están siendo empacados',
        date: '2024-10-05T14:20:00Z',
        location: 'La Bodegona - Centro de Distribución',
        completed: true
      },
      {
        status: 'shipped',
        title: 'Enviado',
        description: 'Tu pedido está en camino',
        date: '2024-10-06T08:15:00Z',
        location: 'Centro de Distribución Guatemala',
        completed: true
      },
      {
        status: 'out_for_delivery',
        title: 'En Reparto',
        description: 'El paquete está siendo entregado',
        date: '2024-10-07T09:30:00Z',
        location: 'Zona 13, Guatemala',
        completed: true
      },
      {
        status: 'delivered',
        title: 'Entregado',
        description: 'Paquete entregado exitosamente',
        date: '2024-10-07T14:20:00Z',
        location: 'Avenida Las Américas 15-45, Zona 13',
        completed: true
      }
    ]
  };

  // Calculate order statistics
  const orderStats = {
    totalOrders: mockOrders?.length,
    totalSpent: mockOrders?.reduce((sum, order) => sum + order?.total, 0),
    deliveredOrders: mockOrders?.filter(order => order?.status === 'entregado')?.length,
    pendingOrders: mockOrders?.filter(order => ['pendiente', 'procesando', 'enviado']?.includes(order?.status))?.length
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterAndSortOrders();
  }, [orders, filters, searchQuery]);

  const filterAndSortOrders = () => {
    let filtered = [...orders];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(order => 
        order?.orderNumber?.toLowerCase()?.includes(query) ||
        order?.items?.some(item => item?.name?.toLowerCase()?.includes(query)) ||
        new Date(order.orderDate)?.toLocaleDateString('es-GT')?.includes(query)
      );
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(order => order?.status === filters?.status);
    }

    // Apply date range filter
    if (filters?.dateRange) {
      const now = new Date();
      let startDate = new Date();

      switch (filters?.dateRange) {
        case 'last7days':
          startDate?.setDate(now?.getDate() - 7);
          break;
        case 'last30days':
          startDate?.setDate(now?.getDate() - 30);
          break;
        case 'last3months':
          startDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'last6months':
          startDate?.setMonth(now?.getMonth() - 6);
          break;
        case 'lastyear':
          startDate?.setFullYear(now?.getFullYear() - 1);
          break;
        case 'custom':
          if (filters?.startDate && filters?.endDate) {
            startDate = new Date(filters.startDate);
            const endDate = new Date(filters.endDate);
            filtered = filtered?.filter(order => {
              const orderDate = new Date(order.orderDate);
              return orderDate >= startDate && orderDate <= endDate;
            });
          }
          break;
      }

      if (filters?.dateRange !== 'custom') {
        filtered = filtered?.filter(order => new Date(order.orderDate) >= startDate);
      }
    }

    // Apply price range filter
    if (filters?.priceRange) {
      const [min, max] = filters?.priceRange?.includes('+') 
        ? [parseInt(filters?.priceRange?.replace('+', '')), Infinity]
        : filters?.priceRange?.split('-')?.map(Number);
      
      filtered = filtered?.filter(order => order?.total >= min && order?.total <= max);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'newest':
          return new Date(b.orderDate) - new Date(a.orderDate);
        case 'oldest':
          return new Date(a.orderDate) - new Date(b.orderDate);
        case 'highest':
          return b?.total - a?.total;
        case 'lowest':
          return a?.total - b?.total;
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleTrackOrder = (orderId) => {
    // In a real app, this would fetch tracking data from API
    setTrackingModal({
      isOpen: true,
      data: mockTrackingData
    });
  };

  const handleDownloadInvoice = (orderId) => {
    // Simulate invoice download
    const order = orders?.find(o => o?.id === orderId);
    if (order) {
      // In a real app, this would generate and download the invoice
      alert(`Descargando factura para el pedido #${order?.orderNumber}`);
    }
  };

  const handleReorder = (orderId) => {
    const order = orders?.find(o => o?.id === orderId);
    if (order) {
      // In a real app, this would add items to cart and redirect to checkout
      alert(`Agregando productos del pedido #${order?.orderNumber} al carrito`);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      dateRange: '',
      priceRange: '',
      sortBy: 'newest',
      startDate: '',
      endDate: ''
    });
    setSearchQuery('');
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders?.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="text-text-secondary">Cargando historial de pedidos...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Historial de Pedidos
            </h1>
            <p className="text-text-secondary mt-2">
              Revisa y gestiona todos tus pedidos realizados
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/user-dashboard">
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Volver al Dashboard
              </Button>
            </Link>
            <Link to="/product-catalog">
              <Button
                variant="default"
                iconName="ShoppingBag"
                iconPosition="left"
              >
                Seguir Comprando
              </Button>
            </Link>
          </div>
        </div>

        {orders?.length === 0 ? (
          <EmptyOrderHistory />
        ) : (
          <>
            {/* Order Statistics */}
            <OrderStats stats={orderStats} />

            {/* Filters */}
            <OrderFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Results Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="text-sm text-text-secondary">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredOrders?.length)} de {filteredOrders?.length} pedidos
              </div>
              
              {filteredOrders?.length > ordersPerPage && (
                <div className="text-sm text-text-secondary">
                  Página {currentPage} de {totalPages}
                </div>
              )}
            </div>

            {/* Orders List */}
            {currentOrders?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2">
                  No se encontraron pedidos
                </h3>
                <p className="text-text-secondary mb-4">
                  Intenta ajustar los filtros o términos de búsqueda
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                >
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {currentOrders?.map((order) => (
                  <OrderCard
                    key={order?.id}
                    order={order}
                    onTrackOrder={handleTrackOrder}
                    onDownloadInvoice={handleDownloadInvoice}
                    onReorder={handleReorder}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Anterior
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        )}

        {/* Tracking Modal */}
        <TrackingModal
          isOpen={trackingModal?.isOpen}
          onClose={() => setTrackingModal({ isOpen: false, data: null })}
          trackingData={trackingModal?.data}
        />
      </div>
    </div>
  );
};

export default OrderHistory;