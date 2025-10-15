import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';
import BillingForm from './components/BillingForm';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      department: '',
      postalCode: '',
      phone: '',
      deliveryMethod: 'standard',
      specialInstructions: ''
    },
    billing: {
      firstName: '',
      lastName: '',
      company: '',
      nit: '',
      dpi: '',
      address: '',
      city: '',
      department: '',
      postalCode: '',
      email: '',
      invoiceType: 'individual',
      acceptElectronicInvoice: false,
      acceptTerms: false
    },
    payment: {
      paymentMethod: 'stripe',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      selectedBank: '',
      selectedWallet: '',
      walletPhone: ''
    }
  });

  // Form errors state
  const [errors, setErrors] = useState({});

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "Smartphone Samsung Galaxy A54",
      brand: "Samsung",
      category: "Electrónicos",
      price: 2499.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Auriculares Bluetooth Sony WH-1000XM4",
      brand: "Sony",
      category: "Audio",
      price: 899.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Camiseta Polo Lacoste",
      brand: "Lacoste",
      category: "Ropa",
      price: 299.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    }
  ];

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const shippingCost = formData?.shipping?.deliveryMethod === 'express' ? 25.00 : 
                      formData?.shipping?.deliveryMethod === 'same_day' ? 50.00 : 0;
  const taxes = subtotal * 0.12; // 12% IVA
  const discount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount if promo applied
  const total = subtotal + shippingCost + taxes - discount;

  // Check authentication and language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    setCurrentLanguage(savedLanguage);
    
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    
    // If not authenticated, show guest checkout option
    if (!token) {
      setIsGuestCheckout(true);
    }
  }, []);

  // Handle form data changes
  const handleFormChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Clear errors for the changed section
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(data)?.forEach(key => {
        delete newErrors?.[key];
      });
      return newErrors;
    });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Shipping validation
    if (!formData?.shipping?.firstName?.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    if (!formData?.shipping?.lastName?.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    if (!formData?.shipping?.address?.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    if (!formData?.shipping?.city?.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }
    if (!formData?.shipping?.department) {
      newErrors.department = 'El departamento es requerido';
    }
    if (!formData?.shipping?.phone?.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    // Payment validation
    if (formData?.payment?.paymentMethod === 'stripe') {
      if (!formData?.payment?.cardNumber?.trim()) {
        newErrors.cardNumber = 'El número de tarjeta es requerido';
      }
      if (!formData?.payment?.cardName?.trim()) {
        newErrors.cardName = 'El nombre en la tarjeta es requerido';
      }
      if (!formData?.payment?.expiryDate?.trim()) {
        newErrors.expiryDate = 'La fecha de vencimiento es requerida';
      }
      if (!formData?.payment?.cvv?.trim()) {
        newErrors.cvv = 'El CVV es requerido';
      }
    }

    if (formData?.payment?.paymentMethod === 'bank_transfer' && !formData?.payment?.selectedBank) {
      newErrors.selectedBank = 'Seleccione un banco';
    }

    if (formData?.payment?.paymentMethod === 'digital_wallet') {
      if (!formData?.payment?.selectedWallet) {
        newErrors.selectedWallet = 'Seleccione una billetera digital';
      }
      if (!formData?.payment?.walletPhone?.trim()) {
        newErrors.walletPhone = 'El número de teléfono es requerido';
      }
    }

    // Billing validation (if shown)
    if (showBillingForm) {
      if (!formData?.billing?.acceptTerms) {
        newErrors.acceptTerms = 'Debe aceptar los términos y condiciones';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Handle promo code application
  const handleApplyPromo = () => {
    const validPromoCodes = ['DESCUENTO10', 'BIENVENIDO', 'PRIMERACOMPRA'];
    
    if (validPromoCodes?.includes(promoCode?.toUpperCase())) {
      setAppliedPromo(promoCode?.toUpperCase());
      setPromoCode('');
    } else {
      setErrors(prev => ({ ...prev, promoCode: 'Código promocional inválido' }));
    }
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock order creation
      const orderData = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        shipping: formData?.shipping,
        billing: showBillingForm ? formData?.billing : null,
        payment: formData?.payment,
        totals: {
          subtotal,
          shipping: shippingCost,
          taxes,
          discount,
          total
        },
        status: 'confirmed',
        createdAt: new Date()?.toISOString()
      };

      // Store order data for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart
      localStorage.removeItem('cartItems');
      
      // Navigate to confirmation
      navigate('/order-confirmation');
      
    } catch (error) {
      console.error('Error processing order:', error);
      setErrors({ submit: 'Error al procesar el pedido. Inténtelo nuevamente.' });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle guest login
  const handleGuestLogin = () => {
    navigate('/login', { state: { returnTo: '/checkout' } });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout - La Bodegona</title>
        <meta name="description" content="Complete su compra de forma segura con múltiples opciones de pago en La Bodegona" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} />

        {/* Guest Checkout Notice */}
        {!isAuthenticated && (
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Icon name="User" size={24} className="text-primary" />
                <div>
                  <h3 className="font-heading font-semibold text-card-foreground">
                    Checkout como Invitado
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Puede completar su compra sin crear una cuenta
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleGuestLogin}
                iconName="LogIn"
                iconPosition="left"
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Form */}
            <ShippingForm
              formData={formData?.shipping}
              onFormChange={handleFormChange}
              errors={errors}
            />

            {/* Billing Address Toggle */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
              <Checkbox
                label="La dirección de facturación es diferente a la de envío"
                checked={showBillingForm}
                onChange={(e) => setShowBillingForm(e?.target?.checked)}
                description="Marque esta opción si necesita una factura con dirección diferente"
              />
            </div>

            {/* Billing Form */}
            <BillingForm
              formData={formData?.billing}
              onFormChange={handleFormChange}
              errors={errors}
              showBillingForm={showBillingForm}
            />

            {/* Payment Form */}
            <PaymentForm
              formData={formData?.payment}
              onFormChange={handleFormChange}
              errors={errors}
            />

            {/* Terms and Conditions */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
              <div className="space-y-4">
                <Checkbox
                  label="Acepto los términos y condiciones de La Bodegona"
                  checked={formData?.acceptTerms || false}
                  onChange={(e) => handleFormChange('general', { acceptTerms: e?.target?.checked })}
                  error={errors?.acceptTerms}
                  required
                />
                
                <Checkbox
                  label="Acepto la política de privacidad y tratamiento de datos"
                  checked={formData?.acceptPrivacy || false}
                  onChange={(e) => handleFormChange('general', { acceptPrivacy: e?.target?.checked })}
                  required
                />

                <Checkbox
                  label="Deseo recibir ofertas y promociones por WhatsApp y email"
                  checked={formData?.acceptMarketing || false}
                  onChange={(e) => handleFormChange('general', { acceptMarketing: e?.target?.checked })}
                />
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={20} className="text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-body font-medium text-card-foreground">
                      Compra 100% Segura
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      Sus datos están protegidos con encriptación SSL de 256 bits. 
                      Cumplimos con los estándares PCI DSS para el manejo seguro de información de pago.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
              {errors?.submit && (
                <div className="mb-4 p-4 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={20} className="text-error" />
                    <p className="text-sm text-error">{errors?.submit}</p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleSubmitOrder}
                loading={isProcessing}
                disabled={isProcessing}
                fullWidth
                size="lg"
                iconName="CreditCard"
                iconPosition="left"
              >
                {isProcessing ? 'Procesando Pedido...' : `Completar Pedido - ${formatCurrency(total)}`}
              </Button>

              <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} />
                  <span>SSL Seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Lock" size={14} />
                  <span>Encriptado</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={14} />
                  <span>PCI DSS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              shippingCost={shippingCost}
              taxes={taxes}
              total={total}
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
              onApplyPromo={handleApplyPromo}
            />
          </div>
        </div>

        {/* Back to Cart Link */}
        <div className="mt-8 text-center">
          <Link
            to="/shopping-cart"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <Icon name="ArrowLeft" size={16} />
            <span className="text-sm font-body">Volver al Carrito</span>
          </Link>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-text-secondary">
            <p>&copy; {new Date()?.getFullYear()} La Bodegona. Todos los derechos reservados.</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <Link to="/terms" className="hover:text-primary transition-colors duration-200">
                Términos y Condiciones
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-primary transition-colors duration-200">
                Política de Privacidad
              </Link>
              <span>•</span>
              <Link to="/support" className="hover:text-primary transition-colors duration-200">
                Soporte
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;