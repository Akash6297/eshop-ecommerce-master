import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDckyVydjHR3g1NYo_4_aoaY62xxr9K2so",
  authDomain: "eshop-f9982.firebaseapp.com",
  projectId: "eshop-f9982",
  storageBucket: "eshop-f9982.appspot.com",
  messagingSenderId: "584776384631",
  appId: "1:584776384631:web:6ee555aa37eb2dd2b38672"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
