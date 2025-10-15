import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = useState({
    products: true,
    orders: false,
    analytics: false,
    settings: false,
  });
  
  const location = useLocation();

  const navigationSections = [
    {
      id: 'dashboard',
      title: 'Panel Principal',
      items: [
        { name: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard', description: 'Vista general del negocio' },
      ]
    },
    {
      id: 'products',
      title: 'Gestión de Productos',
      expandable: true,
      items: [
        { name: 'Todos los Productos', path: '/product-management', icon: 'Package', description: 'Administrar inventario' },
        { name: 'Agregar Producto', path: '/product-management/add', icon: 'Plus', description: 'Crear nuevo producto' },
        { name: 'Categorías', path: '/product-management/categories', icon: 'Grid3X3', description: 'Organizar productos' },
        { name: 'Inventario', path: '/product-management/inventory', icon: 'Warehouse', description: 'Control de stock' },
      ]
    },
    {
      id: 'orders',
      title: 'Pedidos y Ventas',
      expandable: true,
      items: [
        { name: 'Todos los Pedidos', path: '/admin/orders', icon: 'ShoppingBag', description: 'Gestionar pedidos' },
        { name: 'Pedidos Pendientes', path: '/admin/orders/pending', icon: 'Clock', description: 'Requieren atención' },
        { name: 'Historial de Ventas', path: '/admin/sales', icon: 'TrendingUp', description: 'Análisis de ventas' },
      ]
    },
    {
      id: 'analytics',
      title: 'Análisis y Reportes',
      expandable: true,
      items: [
        { name: 'Métricas de Ventas', path: '/admin/analytics/sales', icon: 'BarChart3', description: 'Rendimiento comercial' },
        { name: 'Productos Populares', path: '/admin/analytics/products', icon: 'Star', description: 'Análisis de productos' },
        { name: 'Clientes', path: '/admin/analytics/customers', icon: 'Users', description: 'Comportamiento de clientes' },
      ]
    },
    {
      id: 'settings',
      title: 'Configuración',
      expandable: true,
      items: [
        { name: 'Configuración General', path: '/admin/settings', icon: 'Settings', description: 'Ajustes del sistema' },
        { name: 'Usuarios y Roles', path: '/admin/settings/users', icon: 'UserCog', description: 'Gestión de accesos' },
        { name: 'Métodos de Pago', path: '/admin/settings/payments', icon: 'CreditCard', description: 'Configurar pagos' },
      ]
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const handleItemClick = () => {
    // Close mobile sidebar on item click
    if (window.innerWidth < 1024 && onToggleCollapse) {
      onToggleCollapse();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggleCollapse}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-card border-r border-border shadow-soft-lg
        transition-all duration-300 ease-smooth
        ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-80'}
        lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-lg">
                  <Icon name="Settings" size={18} color="white" />
                </div>
                <div>
                  <h2 className="text-lg font-heading font-semibold text-card-foreground">Panel Admin</h2>
                  <p className="text-xs text-text-secondary font-caption">La Bodegona</p>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navigationSections?.map((section) => (
              <div key={section?.id} className="space-y-2">
                {/* Section Header */}
                {!isCollapsed && (
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide px-2">
                      {section?.title}
                    </h3>
                    {section?.expandable && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSection(section?.id)}
                        className="w-6 h-6"
                      >
                        <Icon 
                          name={expandedSections?.[section?.id] ? "ChevronDown" : "ChevronRight"} 
                          size={14} 
                        />
                      </Button>
                    )}
                  </div>
                )}

                {/* Section Items */}
                <div className={`space-y-1 ${
                  isCollapsed || !section?.expandable || expandedSections?.[section?.id] ? 'block' : 'hidden'
                }`}>
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={handleItemClick}
                      className={`
                        flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium
                        transition-all duration-200 group relative
                        ${isActivePath(item?.path)
                          ? 'text-primary bg-primary/10 border-l-4 border-primary' :'text-card-foreground hover:text-primary hover:bg-muted'
                        }
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                      title={isCollapsed ? item?.name : ''}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={18} 
                        className={`flex-shrink-0 ${
                          isActivePath(item?.path) ? 'text-primary' : 'text-text-secondary group-hover:text-primary'
                        }`}
                      />
                      
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item?.name}</div>
                          <div className="text-xs text-text-secondary truncate">{item?.description}</div>
                        </div>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-soft-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item?.name}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-success rounded-full">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-body font-medium text-card-foreground">Admin User</div>
                  <div className="text-xs text-text-secondary truncate">admin@labodegona.com</div>
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button variant="ghost" size="icon" title="Perfil de usuario">
                  <Icon name="User" size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;