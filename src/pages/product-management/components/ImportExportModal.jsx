import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImportExportModal = ({ isOpen, onClose, onImport, onExport }) => {
  const [activeTab, setActiveTab] = useState('import');
  const [importFile, setImportFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportOptions, setExportOptions] = useState({
    includeImages: false,
    includeInventory: true,
    includePricing: true,
    includeCategories: true
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file && (file?.type === 'text/csv' || file?.name?.endsWith('.csv'))) {
      setImportFile(file);
    } else {
      alert('Por favor selecciona un archivo CSV válido');
    }
  };

  const handleImport = async () => {
    if (!importFile) return;

    setIsProcessing(true);
    setImportProgress(0);

    try {
      // Simulate import progress
      const progressInterval = setInterval(() => {
        setImportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await onImport(importFile);
      
      clearInterval(progressInterval);
      setImportProgress(100);
      
      setTimeout(() => {
        onClose();
        setImportFile(null);
        setImportProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async () => {
    setIsProcessing(true);
    
    try {
      await onExport(exportFormat, exportOptions);
      onClose();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `nombre,sku,descripcion,categoria,precio,stock,estado
"Producto Ejemplo","PROD-001","Descripción del producto","Electrónicos","99.99","50","active" "Otro Producto","PROD-002","Otra descripción","Ropa","29.99","25","active"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_productos.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border shadow-soft-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-card-foreground">
              Importar / Exportar Productos
            </h2>
            <p className="text-sm text-text-secondary font-body mt-1">
              Gestiona productos en lote mediante archivos CSV
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('import')}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-body font-medium text-sm transition-colors ${
                activeTab === 'import' ?'border-b-2 border-primary text-primary bg-primary/5' :'text-text-secondary hover:text-card-foreground'
              }`}
            >
              <Icon name="Upload" size={16} />
              <span>Importar</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-body font-medium text-sm transition-colors ${
                activeTab === 'export'
                  ? 'border-b-2 border-primary text-primary bg-primary/5' :'text-text-secondary hover:text-card-foreground'
              }`}
            >
              <Icon name="Download" size={16} />
              <span>Exportar</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'import' && (
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-body font-medium text-card-foreground mb-3">
                  Seleccionar Archivo CSV
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {!importFile ? (
                    <>
                      <Icon name="FileText" size={48} className="mx-auto text-text-secondary mb-4" />
                      <p className="text-text-secondary font-body mb-4">
                        Arrastra un archivo CSV aquí o haz clic para seleccionar
                      </p>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="csv-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('csv-upload')?.click()}
                        iconName="Upload"
                        iconPosition="left"
                      >
                        Seleccionar Archivo
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Icon name="FileText" size={24} className="text-success" />
                      <div className="text-left">
                        <p className="font-body font-medium text-card-foreground">{importFile?.name}</p>
                        <p className="text-sm text-text-secondary font-caption">
                          {(importFile?.size / 1024)?.toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setImportFile(null)}
                        className="text-error hover:text-error"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {isProcessing && (
                <div>
                  <div className="flex justify-between text-sm font-body mb-2">
                    <span>Procesando archivo...</span>
                    <span>{importProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${importProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Template Download */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-body font-medium text-card-foreground mb-1">
                      ¿Primera vez importando?
                    </h4>
                    <p className="text-sm text-text-secondary font-body mb-3">
                      Descarga nuestra plantilla CSV para asegurar el formato correcto de tus datos.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadTemplate}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Descargar Plantilla
                    </Button>
                  </div>
                </div>
              </div>

              {/* Import Rules */}
              <div>
                <h4 className="font-body font-medium text-card-foreground mb-3">
                  Reglas de Importación
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary font-body">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Los campos nombre, SKU y precio son obligatorios</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Los SKUs duplicados actualizarán productos existentes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Las categorías inexistentes se crearán automáticamente</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Máximo 1000 productos por archivo</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              {/* Export Format */}
              <div>
                <label className="block text-sm font-body font-medium text-card-foreground mb-3">
                  Formato de Exportación
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e?.target?.value)}
                      className="w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
                    />
                    <div>
                      <span className="font-body font-medium text-card-foreground">CSV (Recomendado)</span>
                      <p className="text-sm text-text-secondary font-caption">
                        Compatible con Excel y Google Sheets
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="xlsx"
                      checked={exportFormat === 'xlsx'}
                      onChange={(e) => setExportFormat(e?.target?.value)}
                      className="w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
                    />
                    <div>
                      <span className="font-body font-medium text-card-foreground">Excel (.xlsx)</span>
                      <p className="text-sm text-text-secondary font-caption">
                        Formato nativo de Microsoft Excel
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Export Options */}
              <div>
                <label className="block text-sm font-body font-medium text-card-foreground mb-3">
                  Datos a Incluir
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions?.includePricing}
                      onChange={(e) => setExportOptions(prev => ({ ...prev, includePricing: e?.target?.checked }))}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="font-body text-card-foreground">Información de precios</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions?.includeInventory}
                      onChange={(e) => setExportOptions(prev => ({ ...prev, includeInventory: e?.target?.checked }))}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="font-body text-card-foreground">Datos de inventario</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions?.includeCategories}
                      onChange={(e) => setExportOptions(prev => ({ ...prev, includeCategories: e?.target?.checked }))}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="font-body text-card-foreground">Categorías y etiquetas</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions?.includeImages}
                      onChange={(e) => setExportOptions(prev => ({ ...prev, includeImages: e?.target?.checked }))}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="font-body text-card-foreground">URLs de imágenes</span>
                  </label>
                </div>
              </div>

              {/* Export Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-body font-medium text-card-foreground mb-1">
                      Información de Exportación
                    </h4>
                    <p className="text-sm text-text-secondary font-body">
                      Se exportarán todos los productos visibles según los filtros actuales. 
                      El archivo se descargará automáticamente una vez completado el proceso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 bg-muted/30">
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            {activeTab === 'import' ? (
              <Button
                onClick={handleImport}
                disabled={!importFile || isProcessing}
                loading={isProcessing}
                iconName="Upload"
                iconPosition="left"
              >
                Importar Productos
              </Button>
            ) : (
              <Button
                onClick={handleExport}
                loading={isProcessing}
                iconName="Download"
                iconPosition="left"
              >
                Exportar Productos
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportModal;