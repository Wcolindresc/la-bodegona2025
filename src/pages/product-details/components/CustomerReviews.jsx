import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ product }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const reviews = [
    {
      id: 1,
      userName: "María González",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      date: "15/09/2024",
      title: "Excelente producto, muy recomendado",
      comment: `Estoy muy satisfecha con esta compra. El producto llegó en perfectas condiciones y cumple exactamente con lo que esperaba. La calidad es excelente y el envío fue muy rápido.\n\nLo recomiendo totalmente para cualquiera que esté buscando un producto de esta categoría.`,
      helpful: 12,
      verified: true,
      images: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300"
      ]
    },
    {
      id: 2,
      userName: "Carlos Mendoza",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 4,
      date: "10/09/2024",
      title: "Buen producto, pero podría mejorar el empaque",
      comment: `El producto en sí está muy bien, cumple con las expectativas. Sin embargo, el empaque podría ser mejor ya que llegó un poco maltratado.\n\nFuera de eso, estoy contento con la compra y el servicio al cliente fue excelente.`,
      helpful: 8,
      verified: true,
      images: []
    },
    {
      id: 3,
      userName: "Ana Rodríguez",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      date: "05/09/2024",
      title: "Superó mis expectativas",
      comment: `Increíble calidad por el precio. He comprado productos similares en otras tiendas y este definitivamente es superior.\n\nLa atención al cliente también fue excepcional. Definitivamente volveré a comprar aquí.`,
      helpful: 15,
      verified: true,
      images: [
        "https://images.unsplash.com/photo-1560472355-536de3962603?w=300"
      ]
    },
    {
      id: 4,
      userName: "Roberto Silva",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 3,
      date: "28/08/2024",
      title: "Producto promedio",
      comment: `El producto está bien, pero esperaba un poco más por el precio. La calidad es aceptable pero no excepcional.\n\nEl envío fue rápido y el empaque adecuado.`,
      helpful: 3,
      verified: false,
      images: []
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 65 },
    { stars: 4, count: 15, percentage: 22 },
    { stars: 3, count: 6, percentage: 9 },
    { stars: 2, count: 2, percentage: 3 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const formatDate = (dateString) => {
    return dateString;
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-accent fill-current' : 'text-border'}
      />
    ));
  };

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-text-primary">
          Reseñas de Clientes
        </h2>
        <Button
          variant="outline"
          iconName="Edit3"
          iconPosition="left"
        >
          Escribir Reseña
        </Button>
      </div>
      {/* Rating Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-heading font-bold text-text-primary">
                {product?.rating}
              </span>
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(product?.rating))}
              </div>
            </div>
            <p className="text-text-secondary">
              Basado en {product?.reviewCount} reseñas
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution?.map((item) => (
              <div key={item?.stars} className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary w-8">
                  {item?.stars}★
                </span>
                <div className="flex-1 bg-border rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item?.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-8">
                  {item?.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {reviews?.length} Reseñas
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-2 border border-border rounded-lg bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="newest">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="highest">Calificación más alta</option>
          <option value="lowest">Calificación más baja</option>
          <option value="helpful">Más útiles</option>
        </select>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="bg-card rounded-lg border border-border p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <Image
                  src={review?.userAvatar}
                  alt={review?.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-body font-semibold text-text-primary">
                      {review?.userName}
                    </h4>
                    {review?.verified && (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="CheckCircle" size={14} />
                        <span className="text-xs font-caption">Compra verificada</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {formatDate(review?.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-3">
              <h5 className="font-body font-semibold text-text-primary">
                {review?.title}
              </h5>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {review?.comment}
              </p>

              {/* Review Images */}
              {review?.images?.length > 0 && (
                <div className="flex space-x-2 mt-4">
                  {review?.images?.map((image, index) => (
                    <div key={index} className="w-20 h-20 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={image}
                        alt={`Imagen de reseña ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="ThumbsUp" size={16} />
                  <span className="text-sm">Útil ({review?.helpful})</span>
                </button>
                
                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="Flag" size={16} />
                  <span className="text-sm">Reportar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      {reviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Ver menos reseñas' : `Ver todas las reseñas (${reviews?.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;