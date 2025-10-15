import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtonsSection = ({ orderNumber }) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleViewOrderDetails = () => {
    navigate('/order-history', { state: { highlightOrder: orderNumber } });
  };

  const handleContinueShopping = () => {
    navigate('/product-catalog');
  };

  const handleDownloadInvoice = async () => {
    setIsDownloading(true);
    
    // Simulate invoice generation
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock PDF download
      const element = document.createElement('a');
      element?.setAttribute('href', 'data:text/plain;charset=utf-8,Factura%20-%20Pedido%20' + orderNumber);
      element?.setAttribute('download', `factura-${orderNumber}.pdf`);
      element.style.display = 'none';
      document.body?.appendChild(element);
      element?.click();
      document.body?.removeChild(element);
      
    } catch (error) {
      console.error('Error downloading invoice:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareOrder = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Mi pedido en La Bodegona',
          text: `¡Acabo de realizar un pedido en La Bodegona! Pedido #${orderNumber}`,
          url: window.location?.href
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `¡Acabo de realizar un pedido en La Bodegona! Pedido #${orderNumber} - ${window.location?.href}`;
        await navigator.clipboard?.writeText(shareText);
        
        // Show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-success text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = 'Enlace copiado al portapapeles';
        document.body?.appendChild(notification);
        
        setTimeout(() => {
          document.body?.removeChild(notification);
        }, 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Button
          variant="default"
          size="lg"
          onClick={handleViewOrderDetails}
          iconName="Eye"
          iconPosition="left"
          className="w-full"
        >
          Ver Detalles del Pedido
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleContinueShopping}
          iconName="ShoppingBag"
          iconPosition="left"
          className="w-full"
        >
          Continuar Comprando
        </Button>
        
        <Button
          variant="secondary"
          size="lg"
          onClick={handleDownloadInvoice}
          loading={isDownloading}
          iconName="Download"
          iconPosition="left"
          className="w-full"
        >
          {isDownloading ? 'Generando...' : 'Descargar Factura'}
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="ghost"
          onClick={handleShareOrder}
          loading={isSharing}
          iconName="Share2"
          iconPosition="left"
        >
          {isSharing ? 'Compartiendo...' : 'Compartir Pedido'}
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => navigate('/user-dashboard')}
          iconName="User"
          iconPosition="left"
        >
          Mi Cuenta
        </Button>
      </div>

      {/* Additional Information */}
      <div className="bg-muted rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <p className="text-sm font-body font-medium text-text-primary">
            Información Importante
          </p>
        </div>
        <p className="text-sm text-text-secondary">
          Recibirás notificaciones por WhatsApp y correo electrónico sobre el estado de tu pedido. 
          Guarda tu número de pedido para futuras consultas.
        </p>
      </div>

      {/* Social Media Promotion */}
      <div className="border-t border-border pt-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            ¡Comparte tu experiencia!
          </h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            Ayúdanos a crecer compartiendo tu experiencia de compra en nuestras redes sociales
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open('https://facebook.com/labodegona', '_blank')}
              className="text-blue-600 hover:bg-blue-50"
            >
              <Icon name="Facebook" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open('https://instagram.com/labodegona', '_blank')}
              className="text-pink-600 hover:bg-pink-50"
            >
              <Icon name="Instagram" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open('https://twitter.com/labodegona', '_blank')}
              className="text-blue-400 hover:bg-blue-50"
            >
              <Icon name="Twitter" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtonsSection;