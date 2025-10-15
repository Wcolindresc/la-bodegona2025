import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    {
      id: 'description',
      label: 'Descripción',
      icon: 'FileText'
    },
    {
      id: 'specifications',
      label: 'Especificaciones',
      icon: 'Settings'
    },
    {
      id: 'shipping',
      label: 'Envío y Devoluciones',
      icon: 'Truck'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-text-secondary leading-relaxed">
                {product?.fullDescription}
              </p>
            </div>
            {product?.highlights && (
              <div className="space-y-3">
                <h4 className="text-lg font-heading font-semibold text-text-primary">
                  Puntos destacados:
                </h4>
                <ul className="space-y-2">
                  {product?.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
                      <span className="text-text-secondary">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'specifications':
        return (
          <div className="space-y-6">
            {product?.specifications && Object.entries(product?.specifications)?.map(([category, specs]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-lg font-heading font-semibold text-text-primary capitalize">
                  {category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(specs)?.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm font-body text-text-secondary capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                      </span>
                      <span className="text-sm font-body font-medium text-text-primary">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-semibold text-text-primary">
                Información de Envío
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                  <Icon name="Truck" size={20} className="text-primary mt-1" />
                  <div>
                    <h5 className="font-body font-semibold text-text-primary">Envío Estándar</h5>
                    <p className="text-sm text-text-secondary">2-3 días hábiles • Q.25.00</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Gratis en pedidos mayores a Q.200.00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                  <Icon name="Zap" size={20} className="text-accent mt-1" />
                  <div>
                    <h5 className="font-body font-semibold text-text-primary">Envío Express</h5>
                    <p className="text-sm text-text-secondary">1-2 días hábiles • Q.50.00</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Disponible para Ciudad de Guatemala
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-semibold text-text-primary">
                Política de Devoluciones
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Icon name="RotateCcw" size={18} className="text-success mt-1" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">
                      Devoluciones gratuitas hasta 30 días
                    </p>
                    <p className="text-xs text-text-secondary">
                      El producto debe estar en condiciones originales
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={18} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">
                      Garantía del fabricante incluida
                    </p>
                    <p className="text-xs text-text-secondary">
                      Cobertura según términos del fabricante
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="CreditCard" size={18} className="text-secondary mt-1" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">
                      Reembolso completo garantizado
                    </p>
                    <p className="text-xs text-text-secondary">
                      Procesado en 3-5 días hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-body font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'text-primary border-primary bg-primary/5' :'text-text-secondary border-transparent hover:text-text-primary hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;