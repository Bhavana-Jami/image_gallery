import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [finalizedImages, setFinalizedImages] = useState(() => {
    const saved = localStorage.getItem('finalizedImages');
    return saved ? JSON.parse(saved) : [];
  });

  const addSelectedImage = (image) => {
    setSelectedImages((prev) => {
      const exists = prev.find((img) => img.id === image.id);
      if (exists) {
        return prev.filter((img) => img.id !== image.id);
      }
      return [...prev, image];
    });
  };

  const clearSelectedImages = () => {
    setSelectedImages([]);
  };

  const finalizeImages = () => {
    localStorage.setItem('finalizedImages', JSON.stringify(selectedImages));
    setFinalizedImages(selectedImages);
    setSelectedImages([]);
  };

  return (
    <ImageContext.Provider value={{ 
      selectedImages, 
      addSelectedImage, 
      clearSelectedImages,
      finalizedImages,
      finalizeImages
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within ImageProvider');
  }
  return context;
};
