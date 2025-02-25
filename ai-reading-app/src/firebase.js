// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";  // ✅ Import getAuth

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT7uwbQYJWLgxOv4o3okTfgntZs9NOMWA",
  authDomain: "ai-reading-app-49b9b.firebaseapp.com",
  projectId: "ai-reading-app-49b9b",
  storageBucket: "ai-reading-app-49b9b.firebasestorage.app",
  messagingSenderId: "808810968500",
  appId: "1:808810968500:web:56808c438dc6711e26aee1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user; // Return user object
  } catch (error) {
    console.error("Error signing in:", error);
  }
};


const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export { auth, signInWithGoogle, logout };