import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? images?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === images?.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-white rounded-lg border border-border overflow-hidden group">
        <div className="aspect-square relative">
          <Image
            src={images?.[selectedImageIndex]}
            alt={`${productName} - Imagen ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </>
          )}

          {/* Zoom Icon */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleZoom}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10"
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={18} />
          </Button>

          {/* Image Counter */}
          {images?.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-sm font-caption">
              {selectedImageIndex + 1} / {images?.length}
            </div>
          )}
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                index === selectedImageIndex
                  ? 'border-primary shadow-soft'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Mobile Dots Indicator */}
      {images?.length > 1 && (
        <div className="flex justify-center space-x-2 md:hidden">
          {images?.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === selectedImageIndex ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;