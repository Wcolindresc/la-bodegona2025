import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = ({ currentLanguage }) => {
  const translations = {
    es: {
      title: 'Seguridad Garantizada',
      features: [
        {
          icon: 'Shield',
          title: 'Encriptación JWT',
          description: 'Autenticación segura con tokens encriptados'
        },
        {
          icon: 'Lock',
          title: 'Protección HTTPS',
          description: 'Conexión segura'
        },
        {
          icon: 'UserCheck',
          title: 'Control de Acceso',
          description: 'Roles y permisos personalizados'
        },
        {
          icon: 'Clock',
          title: 'Límite de Intentos',
          description: 'Protección contra ataques de fuerza bruta'
        }
      ]
    },
    en: {
      title: 'Guaranteed Security',
      features: [
        {
          icon: 'Shield',
          title: 'JWT Encryption',
          description: 'Secure authentication with encrypted tokens'
        },
        {
          icon: 'Lock',
          title: 'HTTPS Protection',
          description: 'Secure and encrypted connection'
        },
        {
          icon: 'UserCheck',
          title: 'Access Control',
          description: 'Custom roles and permissions'
        },
        {
          icon: 'Clock',
          title: 'Rate Limiting',
          description: 'Protection against brute force attacks'
        }
      ]
    }
  };

  const t = translations?.[currentLanguage];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
          <Icon name="ShieldCheck" size={20} className="text-success" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-card-foreground">
          {t?.title}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {t?.features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-body font-medium text-card-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-text-secondary font-body leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityFeatures;