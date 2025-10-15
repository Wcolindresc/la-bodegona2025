import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  tax, 
  discount, 
  total, 
  onApplyPromoCode,
  isCheckoutDisabled = false 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })?.format(price);
  };

  const handleApplyPromoCode = async (e) => {
    e?.preventDefault();
    
    if (!promoCode?.trim()) {
      setPromoError('Ingrese un código promocional');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    try {
      const result = await onApplyPromoCode(promoCode?.trim());
      
      if (result?.success) {
        setPromoSuccess(`¡Código aplicado! Descuento: ${formatPrice(result?.discount)}`);
        setPromoCode('');
      } else {
        setPromoError(result?.message || 'Código promocional inválido');
      }
    } catch (error) {
      setPromoError('Error al aplicar el código. Intente nuevamente.');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const summaryItems = [
    {
      label: 'Subtotal',
      value: subtotal,
      className: 'text-card-foreground'
    },
    {
      label: 'Envío',
      value: shipping,
      className: 'text-card-foreground',
      info: shipping === 0 ? 'Gratis' : null
    },
    ...(tax > 0 ? [{
      label: 'IVA (12%)',
      value: tax,
      className: 'text-card-foreground'
    }] : []),
    ...(discount > 0 ? [{
      label: 'Descuento',
      value: -discount,
      className: 'text-success'
    }] : [])
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
        Resumen del Pedido
      </h2>
      {/* Order Items Summary */}
      <div className="space-y-4 mb-6">
        {summaryItems?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-body text-text-secondary">
                {item?.label}
              </span>
              {item?.info && (
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-md">
                  {item?.info}
                </span>
              )}
            </div>
            <span className={`text-sm font-medium ${item?.className}`}>
              {formatPrice(item?.value)}
            </span>
          </div>
        ))}
      </div>
      {/* Promo Code Section */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-medium text-card-foreground mb-3">
          Código Promocional
        </h3>
        
        <form onSubmit={handleApplyPromoCode} className="space-y-3">
          <Input
            type="text"
            placeholder="Ingrese su código"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
            error={promoError}
            disabled={isApplyingPromo}
            className="text-sm"
          />
          
          {promoSuccess && (
            <div className="flex items-center gap-2 text-success text-sm">
              <Icon name="CheckCircle" size={16} />
              <span>{promoSuccess}</span>
            </div>
          )}
          
          <Button
            type="submit"
            variant="outline"
            size="sm"
            fullWidth
            loading={isApplyingPromo}
            disabled={!promoCode?.trim() || isApplyingPromo}
            iconName="Tag"
            iconPosition="left"
            iconSize={16}
          >
            Aplicar Código
          </Button>
        </form>

        {/* Popular Promo Codes */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-secondary mb-2">Códigos populares:</p>
          <div className="flex flex-wrap gap-2">
            {['BIENVENIDO10', 'ENVIOGRATIS', 'DESCUENTO20']?.map((code) => (
              <button
                key={code}
                onClick={() => setPromoCode(code)}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md hover:bg-primary/20 transition-colors duration-200"
                disabled={isApplyingPromo}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Total */}
      <div className="border-t border-border pt-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-heading font-semibold text-card-foreground">
            Total
          </span>
          <span className="text-xl font-heading font-bold text-primary">
            {formatPrice(total)}
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1">
          Incluye todos los impuestos aplicables
        </p>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          asChild
          variant="default"
          size="lg"
          fullWidth
          disabled={isCheckoutDisabled}
          iconName="CreditCard"
          iconPosition="left"
          iconSize={20}
        >
          <Link to="/checkout">
            Proceder al Pago
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="default"
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={18}
        >
          <Link to="/product-catalog">
            Continuar Comprando
          </Link>
        </Button>
      </div>
      {/* Security Badge */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-text-secondary">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs font-caption">
            Compra 100% segura y protegida
          </span>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <Icon name="CreditCard" size={14} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">Visa</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Smartphone" size={14} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">PayPal</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Building2" size={14} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">Transferencia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;