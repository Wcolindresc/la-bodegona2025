import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount] = useState(3); // Mock cart count
  const [isAuthenticated] = useState(false); // Mock auth state
  const [userRole] = useState('customer'); // Mock user role
  
  const location = useLocation();

  const navigationItems = [
    { name: 'Catálogo', path: '/product-catalog', icon: 'Grid3X3' },
    { name: 'Carrito', path: '/shopping-cart', icon: 'ShoppingCart' },
    { name: 'Mi Cuenta', path: '/user-dashboard', icon: 'User' },
  ];

  const adminNavigationItems = [
    { name: 'Panel Admin', path: '/admin-dashboard', icon: 'LayoutDashboard' },
    { name: 'Productos', path: '/product-management', icon: 'Package' },
  ];

  const userMenuItems = isAuthenticated ? [
    { name: 'Mi Cuenta', path: '/user-dashboard', icon: 'User' },
    { name: 'Historial', path: '/order-history', icon: 'Clock' },
    { name: 'Cerrar Sesión', path: '/login', icon: 'LogOut' },
  ] : [
    { name: 'Iniciar Sesión', path: '/login', icon: 'LogIn' },
    { name: 'Registrarse', path: '/register', icon: 'UserPlus' },
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Navigate to product catalog with search query
      window.location.href = `/product-catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/product-catalog" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Store" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-primary">La Bodegona</h1>
              <p className="text-xs text-text-secondary font-caption">Tu tienda de confianza</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10 border-b-2 border-primary' :'text-text-primary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* Admin Navigation (if admin role) */}
            {userRole === 'admin' && (
              <>
                <div className="w-px h-6 bg-border"></div>
                {adminNavigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
                      isActivePath(item?.path)
                        ? 'text-secondary bg-secondary/10 border-b-2 border-secondary' :'text-text-primary hover:text-secondary hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="md:hidden"
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Shopping Cart */}
            <Link to="/shopping-cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={`relative ${isActivePath('/shopping-cart') ? 'text-primary bg-primary/10' : ''}`}
              >
                <Icon name="ShoppingCart" size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleUserMenu}
                className="relative"
              >
                <Icon name="User" size={20} />
              </Button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-soft-lg z-50">
                  <div className="py-2">
                    {userMenuItems?.map((item, index) => (
                      <Link
                        key={index}
                        to={item?.path}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-sm font-body text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="lg:hidden"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-body font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-primary hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {/* Admin Navigation Mobile */}
              {userRole === 'admin' && (
                <>
                  <div className="border-t border-border my-2"></div>
                  <div className="px-4 py-2">
                    <p className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide">Administración</p>
                  </div>
                  {adminNavigationItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-body font-medium transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? 'text-secondary bg-secondary/10' :'text-text-primary hover:text-secondary hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
      {/* Overlay for mobile menu */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden" 
          onClick={() => {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;