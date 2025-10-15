import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo and Brand */}
      <Link to="/product-catalog" className="inline-flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-soft">
          <Icon name="Store" size={32} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-3xl font-heading font-bold text-primary">La Bodegona</h1>
          <p className="text-sm text-text-secondary font-caption">Tu tienda de confianza en Guatemala</p>
        </div>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-bold text-text-primary">
          ¡Bienvenido a La Bodegona!
        </h2>
        <p className="text-text-secondary font-body max-w-md mx-auto">
          Crea tu cuenta y descubre la mejor experiencia de compras en línea con productos de calidad y entregas rápidas en toda Guatemala.
        </p>
      </div>

      {/* Features Highlight */}
      <div className="flex items-center justify-center space-x-8 text-sm text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Truck" size={16} className="text-primary" />
          <span className="font-body">Envío Gratis</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-primary" />
          <span className="font-body">Compra Segura</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <span className="font-body">Entrega Rápida</span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="UserPlus" size={16} color="white" />
          </div>
          <span className="text-sm font-body font-medium text-primary">Registro</span>
        </div>
        
        <div className="w-8 h-px bg-border"></div>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-muted border-2 border-border rounded-full flex items-center justify-center">
            <Icon name="Mail" size={16} className="text-text-secondary" />
          </div>
          <span className="text-sm font-body text-text-secondary">Verificación</span>
        </div>
        
        <div className="w-8 h-px bg-border"></div>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-muted border-2 border-border rounded-full flex items-center justify-center">
            <Icon name="ShoppingBag" size={16} className="text-text-secondary" />
          </div>
          <span className="text-sm font-body text-text-secondary">¡A Comprar!</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;