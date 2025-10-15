import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerSupportCard = () => {
  const supportOptions = [
    {
      title: "WhatsApp",
      description: "Chatea con nosotros",
      contact: "+502 1234-5678",
      icon: "MessageCircle",
      color: "text-success",
      bgColor: "bg-success/10",
      action: () => window.open("https://wa.me/50212345678", "_blank")
    },
    {
      title: "Teléfono",
      description: "Llámanos directamente",
      contact: "+502 2345-6789",
      icon: "Phone",
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: () => window.open("tel:+50223456789", "_self")
    },
    {
      title: "Email",
      description: "Envíanos un correo",
      contact: "soporte@labodegona.com",
      icon: "Mail",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      action: () => window.open("mailto:soporte@labodegona.com", "_self")
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6 flex items-center">
        <Icon name="Headphones" size={24} className="mr-3 text-primary" />
        Atención al Cliente
      </h2>
      <div className="space-y-6">
        {/* Support Message */}
        <div className="bg-muted rounded-lg p-4">
          <p className="text-text-primary font-body">
            ¿Tienes alguna pregunta sobre tu pedido? Nuestro equipo de atención al cliente está aquí para ayudarte.
          </p>
          <p className="text-sm text-text-secondary mt-2">
            Horario de atención: Lunes a Viernes de 8:00 AM a 6:00 PM
          </p>
        </div>

        {/* Support Options */}
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          {supportOptions?.map((option, index) => (
            <div key={index} className={`${option?.bgColor} border border-border rounded-lg p-4 hover:shadow-soft transition-shadow duration-200`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 ${option?.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={option?.icon} size={20} className={option?.color} />
                </div>
                <div>
                  <h3 className="font-body font-medium text-text-primary">{option?.title}</h3>
                  <p className="text-sm text-text-secondary">{option?.description}</p>
                </div>
              </div>
              
              <p className="text-sm font-mono text-text-primary mb-3 break-all">
                {option?.contact}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                onClick={option?.action}
                className="w-full"
                iconName={option?.icon}
                iconPosition="left"
              >
                Contactar
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-body font-medium text-text-primary">Preguntas Frecuentes</h3>
              <p className="text-sm text-text-secondary">Encuentra respuestas a las preguntas más comunes</p>
            </div>
            <Button
              variant="ghost"
              iconName="ExternalLink"
              iconPosition="right"
            >
              Ver FAQ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportCard;