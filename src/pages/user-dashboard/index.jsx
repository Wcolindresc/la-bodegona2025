import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WelcomeSection from './components/WelcomeSection';
import QuickActionCards from './components/QuickActionCards';
import RecentOrdersSection from './components/RecentOrdersSection';
import AccountSummary from './components/AccountSummary';
import RecommendedProducts from './components/RecommendedProducts';
import NotificationCenter from './components/NotificationCenter';
import QuickLinksSection from './components/QuickLinksSection';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+502 1234-5678",
    profileCompletion: 85,
    savedAddresses: 2,
    paymentMethods: 1,
    loyaltyPoints: 450,
    memberSince: "2024-07-15",
    isVerified: true,
    preferences: {
      language: "es",
      currency: "GTQ",
      notifications: {
        email: true,
        whatsapp: true,
        sms: false
      }
    }
  };

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate authentication check and user data loading
    const checkAuth = async () => {
      try {
        // Mock JWT token check
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser(mockUser);
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary font-body">Cargando tu dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if user not found
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-4">
              Error al cargar la cuenta
            </h2>
            <p className="text-text-secondary font-body mb-6">
              No pudimos cargar tu información. Por favor, intenta nuevamente.
            </p>
            <button
              onClick={() => window.location?.reload()}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <WelcomeSection
            userName={user?.name}
            userEmail={user?.email}
            profileCompletion={user?.profileCompletion}
          />
        </div>

        {/* Quick Action Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">
            Acciones Rápidas
          </h2>
          <QuickActionCards />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Recent Orders & Account Summary */}
          <div className="lg:col-span-2 space-y-8">
            <RecentOrdersSection />
            <RecommendedProducts />
          </div>

          {/* Right Column - Account Summary & Notifications */}
          <div className="space-y-8">
            <AccountSummary
              profileCompletion={user?.profileCompletion}
              savedAddresses={user?.savedAddresses}
              paymentMethods={user?.paymentMethods}
              loyaltyPoints={user?.loyaltyPoints}
            />
            <NotificationCenter />
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mb-8">
          <QuickLinksSection />
        </div>

        {/* Account Statistics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
            Tu Actividad en La Bodegona
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-heading font-bold text-primary mb-2">
                {new Date()?.getFullYear() - new Date(user.memberSince)?.getFullYear() || 1}
              </div>
              <div className="text-sm text-text-secondary font-body">
                {new Date()?.getFullYear() - new Date(user.memberSince)?.getFullYear() === 1 ? 'Año' : 'Años'} con nosotros
              </div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-heading font-bold text-secondary mb-2">12</div>
              <div className="text-sm text-text-secondary font-body">Pedidos realizados</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-heading font-bold text-success mb-2">Q 1,245</div>
              <div className="text-sm text-text-secondary font-body">Total invertido</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-heading font-bold text-accent mb-2">{user?.loyaltyPoints}</div>
              <div className="text-sm text-text-secondary font-body">Puntos de lealtad</div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-text-secondary font-body">
            <p>&copy; {new Date()?.getFullYear()} La Bodegona. Todos los derechos reservados.</p>
            <p className="mt-2">Tu tienda de confianza en Guatemala</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;