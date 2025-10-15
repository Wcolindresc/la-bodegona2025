import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Pedido entregado",
      message: "Tu pedido ORD-2024-001 ha sido entregado exitosamente",
      timestamp: "Hace 2 horas",
      isRead: false,
      icon: "CheckCircle",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      type: "promotion",
      title: "Oferta especial",
      message: "¡20% de descuento en electrónicos! Válido hasta el 15/10/2024",
      timestamp: "Hace 4 horas",
      isRead: false,
      icon: "Tag",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      id: 3,
      type: "account",
      title: "Perfil actualizado",
      message: "Tu información de perfil ha sido actualizada correctamente",
      timestamp: "Hace 1 día",
      isRead: true,
      icon: "User",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 4,
      type: "whatsapp",
      title: "WhatsApp conectado",
      message: "Recibirás notificaciones de pedidos por WhatsApp al +502 1234-5678",
      timestamp: "Hace 2 días",
      isRead: true,
      icon: "MessageCircle",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 5,
      type: "payment",
      title: "Pago confirmado",
      message: "El pago de Q 189.75 para el pedido ORD-2024-002 fue procesado",
      timestamp: "Hace 3 días",
      isRead: true,
      icon: "CreditCard",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ]);

  const [showAll, setShowAll] = useState(false);

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;
  const displayedNotifications = showAll ? notifications : notifications?.slice(0, 3);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev?.filter(notification => notification?.id !== notificationId)
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-heading font-semibold text-card-foreground">
            Notificaciones
          </h2>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Marcar todas como leídas
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Configurar
          </Button>
        </div>
      </div>
      {notifications?.length > 0 ? (
        <div className="space-y-3">
          {displayedNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`border border-border rounded-lg p-4 transition-all duration-200 ${
                notification?.isRead 
                  ? 'bg-background hover:bg-muted/30' :'bg-primary/5 border-primary/20 hover:bg-primary/10'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${notification?.bgColor} flex-shrink-0`}>
                  <Icon name={notification?.icon} size={20} className={notification?.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-body font-medium ${
                      notification?.isRead ? 'text-card-foreground' : 'text-primary font-semibold'
                    }`}>
                      {notification?.title}
                    </h3>
                    <span className="text-xs text-text-secondary font-body flex-shrink-0 ml-2">
                      {notification?.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary font-body mb-3">
                    {notification?.message}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    {!notification?.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification?.id)}
                        className="text-primary hover:text-primary"
                      >
                        Marcar como leída
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification?.id)}
                      className="text-text-secondary hover:text-error"
                    >
                      <Icon name="Trash2" size={14} className="mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {notifications?.length > 3 && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <>
                    <Icon name="ChevronUp" size={16} className="mr-2" />
                    Mostrar menos
                  </>
                ) : (
                  <>
                    <Icon name="ChevronDown" size={16} className="mr-2" />
                    Ver todas las notificaciones ({notifications?.length - 3} más)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
            <Icon name="Bell" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-heading font-medium text-card-foreground mb-2">
            No tienes notificaciones
          </h3>
          <p className="text-text-secondary font-body">
            Te mantendremos informado sobre tus pedidos y ofertas especiales
          </p>
        </div>
      )}
      {/* WhatsApp Integration Status */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
              <Icon name="MessageCircle" size={20} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-body font-medium text-green-800">
                WhatsApp conectado
              </h4>
              <p className="text-sm text-green-600">
                Recibirás actualizaciones en +502 1234-5678
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
            Configurar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;