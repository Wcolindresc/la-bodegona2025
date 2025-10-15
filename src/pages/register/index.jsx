import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RegistrationHeader from './components/RegistrationHeader';
import { RegistrationForm } from './components/RegistrationForm';
import RegistrationBenefits from './components/RegistrationBenefits';

const Register = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Crear Cuenta - La Bodegona | Registro de Usuario</title>
        <meta name="description" content="Crea tu cuenta en La Bodegona y disfruta de la mejor experiencia de compras en línea en Guatemala. Envío gratis, pagos seguros y productos de calidad." />
        <meta name="keywords" content="registro, crear cuenta, La Bodegona, Guatemala, compras en línea, e-commerce" />
        <meta property="og:title" content="Crear Cuenta - La Bodegona" />
        <meta property="og:description" content="Únete a La Bodegona y descubre productos de calidad con entregas rápidas en Guatemala" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/register" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8">
            <RegistrationHeader />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Desktop Header & Benefits */}
            <div className="hidden lg:block space-y-8">
              <RegistrationHeader />
              <RegistrationBenefits />
            </div>

            {/* Right Column - Registration Form */}
            <div className="flex items-start justify-center">
              <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-xl shadow-soft p-8">
                  <RegistrationForm />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Benefits */}
          <div className="lg:hidden mt-12">
            <RegistrationBenefits />
          </div>

          {/* Footer Information */}
          <div className="mt-16 text-center space-y-4">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                ¿Necesitas ayuda?
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
                      </svg>
                    </div>
                    <span className="font-body font-medium text-text-primary">WhatsApp</span>
                  </div>
                  <p className="text-text-secondary font-body">
                    Chatea con nosotros las 24 horas
                  </p>
                  <p className="text-primary font-body font-medium mt-1">
                    +502 1234-5678
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-body font-medium text-text-primary">Email</span>
                  </div>
                  <p className="text-text-secondary font-body">
                    Soporte técnico y consultas
                  </p>
                  <p className="text-primary font-body font-medium mt-1">
                    soporte@labodegona.com
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="text-xs text-text-secondary font-caption max-w-2xl mx-auto">
              <p>
                Al crear una cuenta, aceptas nuestros{' '}
                <span className="text-primary hover:underline cursor-pointer">Términos de Servicio</span>
                {' '}y{' '}
                <span className="text-primary hover:underline cursor-pointer">Política de Privacidad</span>.
                Tus datos están protegidos según las leyes de Guatemala.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;