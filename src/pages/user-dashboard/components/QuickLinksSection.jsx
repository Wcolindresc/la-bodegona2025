import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickLinksSection = () => {
  const quickLinks = [
    {
      id: 1,
      title: "Centro de Ayuda",
      description: "Encuentra respuestas a preguntas frecuentes",
      icon: "HelpCircle",
      path: "/help-center",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Soporte al Cliente",
      description: "Chatea con nuestro equipo de soporte",
      icon: "MessageSquare",
      path: "/support",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Políticas de Envío",
      description: "Información sobre tiempos y costos de envío",
      icon: "Truck",
      path: "/shipping-policy",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Devoluciones",
      description: "Proceso de devoluciones y reembolsos",
      icon: "RotateCcw",
      path: "/returns",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      id: 5,
      title: "Programa de Lealtad",
      description: "Conoce los beneficios de ser cliente frecuente",
      icon: "Gift",
      path: "/loyalty-program",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 6,
      title: "Configuración de Cuenta",
      description: "Administra tu privacidad y preferencias",
      icon: "Settings",
      path: "/account-settings",
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    }
  ];

  const supportChannels = [
    {
      id: 1,
      name: "WhatsApp",
      description: "Respuesta inmediata",
      icon: "MessageCircle",
      contact: "+502 1234-5678",
      available: "24/7",
      color: "text-green-600"
    },
    {
      id: 2,
      name: "Email",
      description: "Soporte técnico",
      icon: "Mail",
      contact: "soporte@labodegona.com",
      available: "Lun-Vie 8AM-6PM",
      color: "text-blue-600"
    },
    {
      id: 3,
      name: "Teléfono",
      description: "Atención personalizada",
      icon: "Phone",
      contact: "+502 2345-6789",
      available: "Lun-Vie 8AM-6PM",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Links */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
          Enlaces Rápidos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks?.map((link) => (
            <Link
              key={link?.id}
              to={link?.path}
              className="group flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/20 hover:bg-muted/30 transition-all duration-200"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${link?.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={link?.icon} size={20} className={link?.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-medium text-card-foreground group-hover:text-primary transition-colors duration-200">
                  {link?.title}
                </h3>
                <p className="text-sm text-text-secondary font-body">
                  {link?.description}
                </p>
              </div>
              
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </Link>
          ))}
        </div>
      </div>
      {/* Support Channels */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
          Canales de Soporte
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportChannels?.map((channel) => (
            <div key={channel?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                  <Icon name={channel?.icon} size={20} className={channel?.color} />
                </div>
                <div>
                  <h3 className="font-body font-medium text-card-foreground">
                    {channel?.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {channel?.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body font-medium text-card-foreground">
                    Contacto:
                  </span>
                  <span className="text-sm text-text-secondary font-mono">
                    {channel?.contact}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body font-medium text-card-foreground">
                    Disponible:
                  </span>
                  <span className="text-sm text-text-secondary">
                    {channel?.available}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
              <Icon name="AlertTriangle" size={20} className="text-red-600" />
            </div>
            <div>
              <h4 className="font-body font-medium text-red-800">
                ¿Problema urgente con tu pedido?
              </h4>
              <p className="text-sm text-red-600">
                Llámanos al +502 2345-6789 o escríbenos por WhatsApp para atención inmediata
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksSection;