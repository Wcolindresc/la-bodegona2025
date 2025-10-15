import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ currentLanguage }) => {
  const translations = {
    es: {
      welcome: 'Bienvenido a',
      storeName: 'La Bodegona',
      tagline: 'Tu tienda de confianza',
      description: 'Descubre miles de productos de calidad con los mejores precios y envío rápido a toda Guatemala.',
      features: [
        {
          icon: 'Truck',
          title: 'Envío Rápido',
          description: 'Entrega en 24-48 horas'
        },
        {
          icon: 'CreditCard',
          title: 'Pago Seguro',
          description: 'Múltiples métodos de pago'
        },
        {
          icon: 'Headphones',
          title: 'Soporte 24/7',
          description: 'Atención al cliente siempre'
        }
      ],
      stats: [
        { number: '10,000+', label: 'Productos' },
        { number: '50,000+', label: 'Clientes' },
        { number: '99.9%', label: 'Satisfacción' }
      ]
    },
    en: {
      welcome: 'Welcome to',
      storeName: 'La Bodegona',
      tagline: 'Your trusted store',
      description: 'Discover thousands of quality products with the best prices and fast shipping throughout Guatemala.',
      features: [
        {
          icon: 'Truck',
          title: 'Fast Shipping',
          description: 'Delivery in 24-48 hours'
        },
        {
          icon: 'CreditCard',
          title: 'Secure Payment',
          description: 'Multiple payment methods'
        },
        {
          icon: 'Headphones',
          title: '24/7 Support',
          description: 'Customer service always'
        }
      ],
      stats: [
        { number: '10,000+', label: 'Products' },
        { number: '50,000+', label: 'Customers' },
        { number: '99.9%', label: 'Satisfaction' }
      ]
    }
  };

  const t = translations?.[currentLanguage];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-soft-lg">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop"
              alt="La Bodegona Store"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
        </div>

        <div>
          <p className="text-text-secondary font-body text-lg mb-2">{t?.welcome}</p>
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">
            {t?.storeName}
          </h1>
          <p className="text-primary font-body font-medium text-lg mb-4">{t?.tagline}</p>
          <p className="text-text-secondary font-body leading-relaxed max-w-md mx-auto">
            {t?.description}
          </p>
        </div>
      </div>
      {/* Features */}
      <div className="grid grid-cols-1 gap-4">
        {t?.features?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-soft transition-shadow duration-200">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-body font-semibold text-card-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-xs text-text-secondary font-body">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Stats */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
        <div className="grid grid-cols-3 gap-4 text-center">
          {t?.stats?.map((stat, index) => (
            <div key={index}>
              <div className="text-2xl font-heading font-bold mb-1">{stat?.number}</div>
              <div className="text-xs font-body opacity-90">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;