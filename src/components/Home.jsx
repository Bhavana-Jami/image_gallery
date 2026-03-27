import React, { useEffect, useRef, useState } from "react";
import "../styles/ImageGallery.css";
import "../styles/Home.css";
import image1 from "../assets/image1.jpg";
import GoogleSignInModal from "./GoogleSignInModal";
import { useImageContext } from "../context/ImageContext";

const sampleImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    caption: "Reach new heights"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    caption: "Dream car goals"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    caption: "Find your peace"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    caption: "Home sweet home"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1515165562835-c4c3b1b1b0d5",
    caption: "Celebrate wins"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955",
    caption: "Stay strong"
  },
];

const Home = () => {
  const imageRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [displayImages, setDisplayImages] = useState(sampleImages);
  const { selectedImages, addSelectedImage, finalizedImages } = useImageContext();

  const checkIfImageLoaded = () => {
    if (imageRef.current) {
      setLoadedImages(imageRef.current.complete);
      console.log("Image loaded:", imageRef.current.complete);
    }
  };

  useEffect(() => {
    checkIfImageLoaded();
  }, [loadedImages]);

  // Use finalized images if they exist, otherwise use sample images
  useEffect(() => {
    if (finalizedImages.length > 0) {
      setDisplayImages(finalizedImages);
    } else {
      setDisplayImages(sampleImages);
    }
  }, [finalizedImages]);

  const isImageSelected = (imageId) => {
    return selectedImages.some((img) => img.id === imageId);
  };

  const handleImageSelect = (image) => {
    addSelectedImage(image);
  };

  return (
    <div className="wrapper">
      <button 
        className="header" 
        onClick={() => setShowSignInModal(true)}
        style={{ cursor: 'pointer', border: 'none', background: 'inherit' }}
      >
        Create your own vision board
      </button>
      
      <div className="image_list">
        {displayImages.map((image) => (
        <div 
          className={`image_container ${isImageSelected(image.id) ? 'selected' : ''}`}
          key={image.id}
          onClick={() => handleImageSelect(image)}
          style={{ cursor: 'pointer' }}
        >
          {loadedImages ? (
            <>
              <img
                  src={image.url}
                  alt={image.caption}
                  loading="lazy"
                  style={{cursor:"pointer"}}
              />
              <div className="image_overlay">
                <p>{image.caption}</p>
                {isImageSelected(image.id) && (
                  <div className="selection-badge">✓</div>
                )}
              </div>
            </>
          ) : (
            <div className="image_preload">Loading...</div>
          )}
        </div>
        ))} 
      </div>

      {showSignInModal && (
        <GoogleSignInModal onClose={() => setShowSignInModal(false)} />
      )}
    </div>
  );
};

export default Home;
