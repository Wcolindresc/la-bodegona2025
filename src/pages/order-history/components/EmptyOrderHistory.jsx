import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyOrderHistory = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Package" size={48} className="text-text-secondary" />
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-card-foreground mb-2">
        No tienes pedidos aún
      </h3>
      
      <p className="text-text-secondary mb-8 max-w-md">
        Cuando realices tu primera compra, podrás ver todos tus pedidos y hacer seguimiento de los envíos aquí.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/product-catalog">
          <Button
            variant="default"
            iconName="ShoppingBag"
            iconPosition="left"
          >
            Explorar Productos
          </Button>
        </Link>
        
        <Link to="/user-dashboard">
          <Button
            variant="outline"
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Volver al Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyOrderHistory;