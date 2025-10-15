import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ShippingForm = ({ formData, onFormChange, errors }) => {
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const departmentOptions = [
    { value: 'guatemala', label: 'Guatemala' },
    { value: 'sacatepequez', label: 'Sacatepéquez' },
    { value: 'chimaltenango', label: 'Chimaltenango' },
    { value: 'escuintla', label: 'Escuintla' },
    { value: 'santa_rosa', label: 'Santa Rosa' },
    { value: 'solola', label: 'Sololá' },
    { value: 'totonicapan', label: 'Totonicapán' },
    { value: 'quetzaltenango', label: 'Quetzaltenango' },
    { value: 'suchitepequez', label: 'Suchitepéquez' },
    { value: 'retalhuleu', label: 'Retalhuleu' },
    { value: 'san_marcos', label: 'San Marcos' },
    { value: 'huehuetenango', label: 'Huehuetenango' },
    { value: 'quiche', label: 'Quiché' },
    { value: 'baja_verapaz', label: 'Baja Verapaz' },
    { value: 'alta_verapaz', label: 'Alta Verapaz' },
    { value: 'peten', label: 'Petén' },
    { value: 'izabal', label: 'Izabal' },
    { value: 'zacapa', label: 'Zacapa' },
    { value: 'chiquimula', label: 'Chiquimula' },
    { value: 'jalapa', label: 'Jalapa' },
    { value: 'jutiapa', label: 'Jutiapa' },
    { value: 'el_progreso', label: 'El Progreso' }
  ];

  const deliveryOptions = [
    { value: 'standard', label: 'Entrega Estándar (3-5 días hábiles) - Gratis' },
    { value: 'express', label: 'Entrega Express (1-2 días hábiles) - Q25.00' },
    { value: 'same_day', label: 'Entrega el Mismo Día - Q50.00' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('shipping', { ...formData, [field]: value });
  };

  const handleSameAsBillingChange = (checked) => {
    setSameAsBilling(checked);
    if (checked && formData?.billing) {
      onFormChange('shipping', {
        ...formData,
        firstName: formData?.billing?.firstName || '',
        lastName: formData?.billing?.lastName || '',
        address: formData?.billing?.address || '',
        city: formData?.billing?.city || '',
        department: formData?.billing?.department || '',
        postalCode: formData?.billing?.postalCode || '',
        phone: formData?.billing?.phone || ''
      });
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
          1
        </div>
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Información de Envío
        </h2>
      </div>
      <div className="space-y-6">
        {/* Same as billing checkbox */}
        <Checkbox
          label="Usar la misma dirección de facturación"
          checked={sameAsBilling}
          onChange={(e) => handleSameAsBillingChange(e?.target?.checked)}
          className="mb-4"
        />

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            placeholder="Ingrese su nombre"
            value={formData?.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            disabled={sameAsBilling}
          />
          <Input
            label="Apellido"
            type="text"
            placeholder="Ingrese su apellido"
            value={formData?.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
            disabled={sameAsBilling}
          />
        </div>

        {/* Address Information */}
        <Input
          label="Dirección Completa"
          type="text"
          placeholder="Calle, número, zona, colonia"
          value={formData?.address || ''}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          required
          disabled={sameAsBilling}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Ciudad"
            type="text"
            placeholder="Ingrese la ciudad"
            value={formData?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
            disabled={sameAsBilling}
          />
          <Select
            label="Departamento"
            placeholder="Seleccione departamento"
            options={departmentOptions}
            value={formData?.department || ''}
            onChange={(value) => handleInputChange('department', value)}
            error={errors?.department}
            required
            disabled={sameAsBilling}
            searchable
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Código Postal"
            type="text"
            placeholder="01001"
            value={formData?.postalCode || ''}
            onChange={(e) => handleInputChange('postalCode', e?.target?.value)}
            error={errors?.postalCode}
            disabled={sameAsBilling}
          />
          <Input
            label="Teléfono"
            type="tel"
            placeholder="+502 1234-5678"
            value={formData?.phone || ''}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
        </div>

        {/* Delivery Options */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-heading font-medium text-card-foreground mb-4">
            Opciones de Entrega
          </h3>
          <Select
            label="Método de Entrega"
            placeholder="Seleccione método de entrega"
            options={deliveryOptions}
            value={formData?.deliveryMethod || 'standard'}
            onChange={(value) => handleInputChange('deliveryMethod', value)}
            error={errors?.deliveryMethod}
            required
          />
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-body font-medium text-card-foreground mb-2">
            Instrucciones Especiales (Opcional)
          </label>
          <textarea
            placeholder="Ej: Entregar en recepción, tocar timbre, etc."
            value={formData?.specialInstructions || ''}
            onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-card-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>

        {/* Security Notice */}
        <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
          <Icon name="Shield" size={20} className="text-success mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-body font-medium text-card-foreground">
              Información Segura
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Todos sus datos están protegidos con encriptación SSL de 256 bits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;