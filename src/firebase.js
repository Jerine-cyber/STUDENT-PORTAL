import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// ⚠️ REPLACE WITH YOUR ACTUAL FIREBASE CONFIGURATION
// This information is found in your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyBdFlg5qtKLZtFSpsX9Bo8R3NHWXVdEcLc",
  authDomain: "student-app-4b042.firebaseapp.com",
  projectId: "student-app-4b042",
  storageBucket: "student-app-4b042.firebasestorage.app",
  messagingSenderId: "640948778348",
  appId: "1:640948778348:web:61992f949ac25457f46f49",
  measurementId: "G-0865FZGEJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In using a pop-up window
const handleGoogleLogin = async () => {
  try {
    // This pops up the Google sign-in window
    await signInWithPopup(auth, googleProvider);
    console.log("Google login successful!");
    return true;
  } catch (error) {
    console.error("Google login failed:", error.message);
    return false;
  }
};

// Function to handle user Sign-Out
const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully.");
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

// Export all the necessary objects and functions for use in other components
export { auth, handleGoogleLogin, handleLogout, onAuthStateChanged };
