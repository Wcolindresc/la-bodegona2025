import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AdminSidebar from '../../components/ui/AdminSidebar';
import KPICard from './components/KPICard';
import SalesChart from './components/SalesChart';
import CategoryChart from './components/CategoryChart';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import SalesAnalytics from './components/SalesAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es-GT');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock KPI data
  const kpiData = [
    {
      title: 'Ventas Totales',
      value: 130000,
      change: 12.5,
      changeType: 'positive',
      icon: 'DollarSign',
      currency: true
    },
    {
      title: 'Pedidos del Mes',
      value: 456,
      change: 8.2,
      changeType: 'positive',
      icon: 'ShoppingBag',
      currency: false
    },
    {
      title: 'Productos Activos',
      value: 1247,
      change: 3.1,
      changeType: 'positive',
      icon: 'Package',
      currency: false
    },
    {
      title: 'Clientes Registrados',
      value: 2890,
      change: -2.4,
      changeType: 'negative',
      icon: 'Users',
      currency: false
    }
  ];

  // Check localStorage for language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es-GT';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const refreshDashboard = () => {
    setLastUpdated(new Date());
    // Simulate data refresh
    console.log('Dashboard data refreshed');
  };

  const formatLastUpdated = () => {
    return lastUpdated?.toLocaleString('es-GT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Panel de Administración - La Bodegona</title>
        <meta name="description" content="Panel de control administrativo para gestión integral de e-commerce La Bodegona" />
      </Helmet>
      <Header />
      <div className="flex">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={toggleSidebar}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'
        }`}>
          <div className="p-6 space-y-6">
            {/* Dashboard Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="lg:hidden"
                  >
                    <Icon name="Menu" size={20} />
                  </Button>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    Panel de Administración
                  </h1>
                </div>
                <p className="text-text-secondary">
                  Gestión integral de La Bodegona - Última actualización: {formatLastUpdated()}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={refreshDashboard}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Actualizar
                </Button>
                <Button 
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                >
                  Exportar Reporte
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {kpiData?.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi?.title}
                  value={kpi?.value}
                  change={kpi?.change}
                  changeType={kpi?.changeType}
                  icon={kpi?.icon}
                  currency={kpi?.currency}
                />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SalesChart />
              <CategoryChart />
            </div>

            {/* Analytics Section */}
            <SalesAnalytics />

            {/* Activity and Actions Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <RecentActivity />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground">Sistema Operativo</h4>
                    <p className="text-xs text-text-secondary">
                      Todos los servicios funcionando correctamente
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Icon name="Server" size={16} />
                    <span>Servidor: 99.9%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Database" size={16} />
                    <span>Base de datos: Activa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Wifi" size={16} />
                    <span>API: Conectada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;