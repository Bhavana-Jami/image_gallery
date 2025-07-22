import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import UploadPage from "./UploadPage";

const GoogleSignIn = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        setCurrentUser(result.user); // Set the user state after login
      })
      .catch((error) => console.error("Sign-in Error: ", error.message));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  return (
    <div>
      {currentUser ? (
        <UploadPage />
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleSignIn;
