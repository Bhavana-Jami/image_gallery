import React, { useEffect, useRef, useState } from "react";
import "../styles/ImageGallery.css";
import { imageList } from "../components/imageList"
import image1 from "../assets/image1.jpg";
import { Link } from "react-router-dom";
const ImageGallery = () => {
  const imageRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(true);
  const checkIfImageLoaded = () => {
    if (imageRef.current) {
      setLoadedImages(imageRef.current.complete);
      console.log("Image loaded:", imageRef.current.complete);
    }
  };
  useEffect(() => {
    checkIfImageLoaded();
  }, [loadedImages]);
  console.log(loadedImages);
  return (
    <div className="wrapper">
      <Link className="header" to="/googleSignIn">Create your own vision board</Link>
      <div className="image_list">
        {imageList.map((image, index) => (
        <div className="image_container">
          {loadedImages ? (
            <>
              <img
                  // ref={(el) => (imageRefs.current[index] = el)}
                  src={image}
                  alt={`Image ${index}`}
                  loading="lazy"
                  // onLoad={() =>
                  //   checkIfImageLoaded(imageRefs.current[index], index)
                  // }
                />
              <img src={image1}
              //  ref={imageRefs}
               onLoad={checkIfImageLoaded} />
              <div className="image_overlay">
                <p>The title for every image goes here</p>
              </div>
            </>
          ) : (
            <div className="image_preload">hi</div>
          )}
        </div>
        ))} 

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
      </div>
    </div>
  );
};

export default ImageGallery;
