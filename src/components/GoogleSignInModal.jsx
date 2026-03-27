import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Modal.css";

const GoogleSignInModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        setCurrentUser(result.user);
        // Navigate to profile after sign-in
        navigate("/profile");
        onClose();
      })
      .catch((error) => console.error("Sign-in Error: ", error.message));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <h2>Create Your Vision Board</h2>
          <p>Sign in with Google to get started</p>
          <button className="google-signin-btn" onClick={signInWithGoogle}>
            <span>🔐</span> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignInModal;
