import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCxt1zNkPnlw9PBXREpbrrQ_Us9rh25724",
  authDomain: "realestestate01.firebaseapp.com",
  projectId: "realestestate01",
  storageBucket: "realestestate01.appspot.com",
  messagingSenderId: "786725617025",
  appId: "1:786725617025:web:e9ed3efcc9ce520e24fc80",
  measurementId: "G-5J00V4TB8Y",
};
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
