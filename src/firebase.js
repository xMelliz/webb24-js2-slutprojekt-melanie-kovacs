// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyDc8Phebl7fywg1-rr2qSIxpmZX0rwhtmI",
  authDomain: "my-awesome-webshop.firebaseapp.com",
  projectId: "my-awesome-webshop",
  storageBucket: "my-awesome-webshop.appspot.com",
  messagingSenderId: "1062520322665",
  appId: "1:1062520322665:web:915fce2014797e552dc0f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
const db = getFirestore(app);
export { db };  // Export the Firestore database instance

export default app;
