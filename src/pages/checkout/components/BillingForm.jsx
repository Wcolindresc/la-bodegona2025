import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const BillingForm = ({ formData, onFormChange, errors, showBillingForm }) => {
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

  const handleInputChange = (field, value) => {
    onFormChange('billing', { ...formData, [field]: value });
  };

  if (!showBillingForm) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold">
          B
        </div>
        <h2 className="text-xl font-heading font-semibold text-card-foreground">
          Información de Facturación
        </h2>
      </div>
      <div className="space-y-6">
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
          />
          <Input
            label="Apellido"
            type="text"
            placeholder="Ingrese su apellido"
            value={formData?.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        {/* Company Information (Optional) */}
        <Input
          label="Empresa (Opcional)"
          type="text"
          placeholder="Nombre de la empresa"
          value={formData?.company || ''}
          onChange={(e) => handleInputChange('company', e?.target?.value)}
        />

        {/* Tax Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="NIT"
            type="text"
            placeholder="123456-7"
            value={formData?.nit || ''}
            onChange={(e) => handleInputChange('nit', e?.target?.value)}
            error={errors?.nit}
            description="Número de Identificación Tributaria"
          />
          <Input
            label="DPI/Cédula"
            type="text"
            placeholder="1234 56789 0101"
            value={formData?.dpi || ''}
            onChange={(e) => handleInputChange('dpi', e?.target?.value)}
            error={errors?.dpi}
            description="Documento Personal de Identificación"
          />
        </div>

        {/* Address Information */}
        <Input
          label="Dirección de Facturación"
          type="text"
          placeholder="Calle, número, zona, colonia"
          value={formData?.address || ''}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          required
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
          />
          <Select
            label="Departamento"
            placeholder="Seleccione departamento"
            options={departmentOptions}
            value={formData?.department || ''}
            onChange={(value) => handleInputChange('department', value)}
            error={errors?.department}
            required
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
          />
          <Input
            label="Email de Facturación"
            type="email"
            placeholder="facturacion@empresa.com"
            value={formData?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
        </div>

        {/* Invoice Type */}
        <div className="space-y-3">
          <label className="block text-sm font-body font-medium text-card-foreground">
            Tipo de Factura
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              onClick={() => handleInputChange('invoiceType', 'individual')}
              className={`
                p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                ${formData?.invoiceType === 'individual' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name="User" size={20} className="text-primary" />
                <div>
                  <h3 className="font-body font-medium text-card-foreground">Consumidor Final</h3>
                  <p className="text-sm text-text-secondary">Factura individual</p>
                </div>
              </div>
            </div>
            
            <div
              onClick={() => handleInputChange('invoiceType', 'business')}
              className={`
                p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                ${formData?.invoiceType === 'business' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name="Building2" size={20} className="text-primary" />
                <div>
                  <h3 className="font-body font-medium text-card-foreground">Empresa</h3>
                  <p className="text-sm text-text-secondary">Factura empresarial</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-3">
          <Checkbox
            label="Acepto recibir la factura electrónica por email"
            checked={formData?.acceptElectronicInvoice || false}
            onChange={(e) => handleInputChange('acceptElectronicInvoice', e?.target?.checked)}
          />
          
          <Checkbox
            label="Acepto los términos y condiciones de facturación"
            checked={formData?.acceptTerms || false}
            onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
            error={errors?.acceptTerms}
            required
          />
        </div>

        {/* Information Notice */}
        <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-body font-medium text-card-foreground">
              Información de Facturación
            </p>
            <p className="text-xs text-text-secondary mt-1">
              La información proporcionada será utilizada únicamente para la emisión de su factura fiscal. 
              Asegúrese de que todos los datos sean correctos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;