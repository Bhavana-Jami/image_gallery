// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtohSQon6M3EQiOTTs61YAOpSEcXHhbzE",
  authDomain: "image-gallery-96416.firebaseapp.com",
  projectId: "image-gallery-96416",
  storageBucket: "image-gallery-96416.appspot.com",
  messagingSenderId: "794046457971",
  appId: "1:794046457971:web:ec2d83bba187a473be6206"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const storage = getStorage(app)
export { auth, storage }