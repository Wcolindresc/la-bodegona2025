import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import OrderSuccessHeader from './components/OrderSuccessHeader';
import OrderSummaryCard from './components/OrderSummaryCard';
import DeliveryInfoCard from './components/DeliveryInfoCard';
import CustomerSupportCard from './components/CustomerSupportCard';
import ActionButtonsSection from './components/ActionButtonsSection';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  // Mock order data - in real app this would come from checkout state or API
  const mockOrderData = {
    orderNumber: "BOD-2025-001234",
    orderDate: "09/10/2025",
    estimatedDelivery: "12/10/2025 - 14/10/2025",
    trackingNumber: "GT2025BOD001234",
    orderItems: [
      {
        id: 1,
        name: "Aceite de Cocina Premium 1L",
        price: 25.50,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop"
      },
      {
        id: 2,
        name: "Arroz Blanco Extra 5lb",
        price: 18.75,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop"
      },
      {
        id: 3,
        name: "Frijoles Negros Orgánicos 2lb",
        price: 22.00,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&h=400&fit=crop"
      }
    ],
    shippingAddress: {
      fullName: "María Elena González",
      address: "15 Avenida 12-34, Zona 10",
      city: "Ciudad de Guatemala",
      state: "Guatemala",
      zipCode: "01010",
      country: "Guatemala",
      phone: "+502 5555-1234"
    },
    paymentMethod: {
      type: "Tarjeta de Crédito Visa",
      details: "****-****-****-4532"
    },
    orderTotals: {
      subtotal: 117.25,
      shipping: 0,
      tax: 14.07,
      discount: 5.00,
      total: 126.32
    }
  };

  useEffect(() => {
    // Check if we have order data from checkout
    const checkoutData = location?.state?.orderData;
    
    if (checkoutData) {
      setOrderData(checkoutData);
    } else {
      // Use mock data if no checkout data (direct navigation)
      setOrderData(mockOrderData);
    }

    // Simulate sending notifications
    const sendNotifications = async () => {
      try {
        // Simulate WhatsApp notification
        console.log('Sending WhatsApp notification...');
        
        // Simulate email confirmation
        console.log('Sending email confirmation...');
        
        // Simulate Twilio SMS
        console.log('Sending SMS confirmation...');
        
      } catch (error) {
        console.error('Error sending notifications:', error);
      }
    };

    sendNotifications();

    // Clear cart state (in real app, this would be handled by state management)
    localStorage.removeItem('cartItems');
    
  }, [location?.state]);

  // Redirect to catalog if no order data after timeout
  useEffect(() => {
    if (!orderData) {
      const timer = setTimeout(() => {
        navigate('/product-catalog');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-secondary">Cargando información del pedido...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Success Header */}
        <OrderSuccessHeader 
          orderNumber={orderData?.orderNumber}
          orderDate={orderData?.orderDate}
        />

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-8">
            <OrderSummaryCard
              orderItems={orderData?.orderItems}
              shippingAddress={orderData?.shippingAddress}
              paymentMethod={orderData?.paymentMethod}
              orderTotals={orderData?.orderTotals}
            />
            
            {/* Action Buttons - Mobile */}
            <div className="lg:hidden">
              <ActionButtonsSection orderNumber={orderData?.orderNumber} />
            </div>
          </div>

          {/* Right Column - Delivery Info & Support */}
          <div className="space-y-8">
            <DeliveryInfoCard
              estimatedDelivery={orderData?.estimatedDelivery}
              trackingNumber={orderData?.trackingNumber}
            />
            
            <CustomerSupportCard />
            
            {/* Action Buttons - Desktop */}
            <div className="hidden lg:block">
              <ActionButtonsSection orderNumber={orderData?.orderNumber} />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-12 bg-card border border-border rounded-lg shadow-soft p-6">
          <h2 className="text-xl font-heading font-semibold text-card-foreground mb-4">
            Política de Devoluciones y Garantía
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-body font-medium text-text-primary mb-2">Devoluciones</h3>
              <p className="text-sm text-text-secondary">
                Tienes 30 días para devolver productos no perecederos en su empaque original. 
                Los productos alimenticios no son elegibles para devolución por razones de seguridad alimentaria.
              </p>
            </div>
            
            <div>
              <h3 className="font-body font-medium text-text-primary mb-2">Garantía de Calidad</h3>
              <p className="text-sm text-text-secondary">
                Garantizamos la frescura y calidad de todos nuestros productos. Si no estás satisfecho, 
                contáctanos dentro de las primeras 24 horas de recibir tu pedido.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
          <h3 className="text-lg font-heading font-semibold text-primary mb-2">
            ¡Mantente Informado!
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Suscríbete a nuestro boletín para recibir ofertas exclusivas y novedades
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:bg-primary/90 transition-colors duration-200">
              Suscribirse
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-text-secondary">
            <p>&copy; {new Date()?.getFullYear()} La Bodegona. Todos los derechos reservados.</p>
            <p className="mt-2">
              Tu tienda de confianza en Guatemala | Soporte: soporte@labodegona.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderConfirmation;