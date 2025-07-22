import React, { useState, useEffect } from "react";
// import { storage } from "../firebase";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [imagePublicUrl, setImagePublicUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    setIsLoading(true);
    setError('');
    setUploadProgress(0);

    try {
      const storage = getStorage();
      const imageId = uuidv4();
      const imageRef = ref(storage, `images/${imageId}`);

      // Upload the image
      await uploadBytes(imageRef, image);

      // Get the download URL
      const url = await getDownloadURL(imageRef);
      setImagePublicUrl(url);
      setUploadProgress(100);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clean up function to revoke object URL when component unmounts or image changes
    return () => {
      if (imagePublicUrl) {
        URL.revokeObjectURL(imagePublicUrl);
      }
    };
  }, [imagePublicUrl]);

  return (
    <div className="upload-page">
      <h1>Upload Image</h1>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <button onClick={handleUpload} disabled={!image || isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p className="error-message">{error}</p>}

      {isLoading && (
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {imagePublicUrl && (
        <div className="image-preview">
          <h2>Uploaded Image:</h2>
          <img 
            src={imagePublicUrl} 
            alt="Uploaded preview" 
            onError={() => setError('Failed to load image preview.')}
          />
          <p>Public URL: {imagePublicUrl}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
