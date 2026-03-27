import React, { useEffect, useRef, useState } from "react";
import "../styles/ImageGallery.css";
import { imageList } from "../components/imageList"
import image1 from "../assets/image1.jpg";
import { Link } from "react-router-dom";
const ImageGallery = () => {
  const imageRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const checkIfImageLoaded = () => {
    if (imageRef.current) {
      setLoadedImages(imageRef.current.complete);
      console.log("Image loaded:", imageRef.current.complete);
    }
  };
  useEffect(() => {
    checkIfImageLoaded();
  }, [loadedImages]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  console.log(loadedImages);
  const handleInstallClick=()=>{
    console.log("asdf")
  }
  return (
    <div className="wrapper">
      <div className="header-container">
      <button 
      onClick={handleInstallClick}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
    >
      📲 Install App
    </button>
        <Link className="header" to="/profile">Create your own vision board</Link>
      </div>
      <div className="image_list">
        {imageList.map((image, index) => (
          <div
            className="image_container"
            key={index}
            onClick={() => setSelectedImage(image)}
          >
            {loadedImages ? (
              <>
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  style={{ cursor: "pointer" }}
                />
                <div className="image_overlay">
                  <p>{image.title}</p>
                </div>
              </>
            ) : (
              <div className="image_preload">Loading...</div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="image-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="image-modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="image-modal-container">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="image-modal-img"
              />
              <div className="modal-image_overlay">
                <p>{selectedImage.title}</p>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* <>
          <img
            src={image1}
            ref={imageRef}
            alt="Vision Board"
            onLoad={checkIfImageLoaded}
          />
          <div className="image_overlay">
            <p>The title for every image goes here</p>
          </div>
          {!loadedImages && <div className="image_preload">Loading...</div>}
        </> */}
      {/* </div> */}
    </div>
  );
};

export default ImageGallery;
