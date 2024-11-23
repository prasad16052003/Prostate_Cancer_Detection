// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA_TvBg7Un_YM5gk41DqBBYcbO1wemsW6Y",
    authDomain: "procare-541ea.firebaseapp.com",
    projectId: "procare-541ea",
    storageBucket: "procare-541ea.firebasestorage.app",
    messagingSenderId: "868921712191",
    appId: "1:868921712191:web:14250433284e01634ca28a",
    measurementId: "G-NDDC4T7PJY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
