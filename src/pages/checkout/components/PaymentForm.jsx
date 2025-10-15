import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ formData, onFormChange, errors }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(formData?.paymentMethod || 'stripe');
  const [showCardForm, setShowCardForm] = useState(false);

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Tarjeta de Crédito/Débito',
      description: 'Visa, Mastercard, American Express',
      icon: 'CreditCard',
      fee: 'Sin costo adicional'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pague con su cuenta PayPal',
      icon: 'Wallet',
      fee: 'Sin costo adicional'
    },
    {
      id: 'bank_transfer',
      name: 'Transferencia Bancaria',
      description: 'Banco Industrial, Banrural, BAM',
      icon: 'Building2',
      fee: 'Sin costo adicional'
    },
    {
      id: 'digital_wallet',
      name: 'Billetera Digital',
      description: 'Tigo Money, Claro Pay',
      icon: 'Smartphone',
      fee: 'Sin costo adicional'
    }
  ];

  const bankOptions = [
    { value: 'industrial', label: 'Banco Industrial' },
    { value: 'banrural', label: 'Banrural' },
    { value: 'bam', label: 'Banco Agromercantil (BAM)' },
    { value: 'bantrab', label: 'Bantrab' },
    { value: 'bi', label: 'Banco de los Trabajadores' }
  ];

  const digitalWalletOptions = [
    { value: 'tigo_money', label: 'Tigo Money' },
    { value: 'claro_pay', label: 'Claro Pay' }
  ];

  const handlePaymentMethodChange = (methodId) => {
    setSelectedPaymentMethod(methodId);
    onFormChange('payment', { ...formData, paymentMethod: methodId });
    setShowCardForm(methodId === 'stripe');
  };

  const handleInputChange = (field, value) => {
    onFormChange('payment', { ...formData, [field]: value });
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
          2
        </div>
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Método de Pago
        </h2>
      </div>
      <div className="space-y-4">
        {/* Payment Method Selection */}
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods?.map((method) => (
            <div
              key={method?.id}
              onClick={() => handlePaymentMethodChange(method?.id)}
              className={`
                relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                ${selectedPaymentMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-lg
                  ${selectedPaymentMethod === method?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'}
                `}>
                  <Icon name={method?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-medium text-card-foreground">{method?.name}</h3>
                  <p className="text-sm text-text-secondary">{method?.description}</p>
                  <p className="text-xs text-success font-medium mt-1">{method?.fee}</p>
                </div>
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selectedPaymentMethod === method?.id ? 'border-primary bg-primary' : 'border-border'}
                `}>
                  {selectedPaymentMethod === method?.id && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Method Forms */}
        {selectedPaymentMethod === 'stripe' && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
              Información de la Tarjeta
            </h3>
            <div className="space-y-4">
              <Input
                label="Número de Tarjeta"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData?.cardNumber || ''}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e?.target?.value))}
                error={errors?.cardNumber}
                required
                maxLength={19}
              />
              <Input
                label="Nombre en la Tarjeta"
                type="text"
                placeholder="Como aparece en la tarjeta"
                value={formData?.cardName || ''}
                onChange={(e) => handleInputChange('cardName', e?.target?.value)}
                error={errors?.cardName}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Fecha de Vencimiento"
                  type="text"
                  placeholder="MM/AA"
                  value={formData?.expiryDate || ''}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e?.target?.value))}
                  error={errors?.expiryDate}
                  required
                  maxLength={5}
                />
                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                  value={formData?.cvv || ''}
                  onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                  error={errors?.cvv}
                  required
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        )}

        {selectedPaymentMethod === 'paypal' && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="text-center py-8">
              <Icon name="Wallet" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-lg font-heading font-medium text-card-foreground mb-2">
                Pagar con PayPal
              </h3>
              <p className="text-text-secondary mb-4">
                Será redirigido a PayPal para completar su pago de forma segura
              </p>
              <Button variant="outline" iconName="ExternalLink" iconPosition="right">
                Continuar con PayPal
              </Button>
            </div>
          </div>
        )}

        {selectedPaymentMethod === 'bank_transfer' && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
              Transferencia Bancaria
            </h3>
            <div className="space-y-4">
              <Select
                label="Seleccione su Banco"
                placeholder="Elija su banco"
                options={bankOptions}
                value={formData?.selectedBank || ''}
                onChange={(value) => handleInputChange('selectedBank', value)}
                error={errors?.selectedBank}
                required
              />
              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-body font-medium text-card-foreground mb-2">
                  Datos para Transferencia:
                </h4>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p><strong>Cuenta:</strong> 123-456789-0</p>
                  <p><strong>Nombre:</strong> La Bodegona S.A.</p>
                  <p><strong>Banco:</strong> Banco Industrial</p>
                  <p><strong>Tipo:</strong> Cuenta Monetaria</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPaymentMethod === 'digital_wallet' && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
              Billetera Digital
            </h3>
            <div className="space-y-4">
              <Select
                label="Seleccione su Billetera"
                placeholder="Elija su billetera digital"
                options={digitalWalletOptions}
                value={formData?.selectedWallet || ''}
                onChange={(value) => handleInputChange('selectedWallet', value)}
                error={errors?.selectedWallet}
                required
              />
              <Input
                label="Número de Teléfono"
                type="tel"
                placeholder="+502 1234-5678"
                value={formData?.walletPhone || ''}
                onChange={(e) => handleInputChange('walletPhone', e?.target?.value)}
                error={errors?.walletPhone}
                required
              />
            </div>
          </div>
        )}

        {/* Security Features */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
            <Icon name="Shield" size={20} className="text-success" />
            <div>
              <p className="text-sm font-body font-medium text-success">
                Pago 100% Seguro
              </p>
              <p className="text-xs text-success/80">
                Encriptación SSL de 256 bits y certificación PCI DSS
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Icon name="Lock" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-body font-medium text-primary">
                Protección CSRF Activa
              </p>
              <p className="text-xs text-primary/80">
                Su información está protegida contra ataques maliciosos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;