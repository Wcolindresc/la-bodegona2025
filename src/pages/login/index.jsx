import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LoginForm } from './components/LoginForm';
import LanguageSelector from './components/LanguageSelector';
import SecurityFeatures from './components/SecurityFeatures';
import WelcomeSection from './components/WelcomeSection';

const LoginPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
  };

  const pageTitle = currentLanguage === 'es' ? 'Iniciar Sesión - La Bodegona' : 'Sign In - La Bodegona';
  const pageDescription = currentLanguage === 'es' ?'Accede a tu cuenta de La Bodegona para realizar compras seguras y gestionar tus pedidos.' :'Access your La Bodegona account to make secure purchases and manage your orders.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${window.location?.origin}/login`} />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Language Selector - Fixed Position */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageSelector 
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Welcome Section (Hidden on mobile) */}
            <div className="hidden lg:block">
              <div className="sticky top-8 space-y-8">
                <WelcomeSection currentLanguage={currentLanguage} />
                <SecurityFeatures currentLanguage={currentLanguage} />
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
              <div className="w-full max-w-md">
                <LoginForm 
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                />

                {/* Mobile Security Features */}
                <div className="lg:hidden mt-12">
                  <SecurityFeatures currentLanguage={currentLanguage} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;