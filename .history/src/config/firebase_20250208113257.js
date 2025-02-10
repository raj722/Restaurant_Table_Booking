// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN29h7gkqn1bRCi2Hl2fiQ9sg8ypgEOcY",
  authDomain: "tabletime-37e13.firebaseapp.com",
  databaseURL: "https://tabletime-37e13-default-rtdb.firebaseio.com",
  projectId: "tabletime-37e13",
  storageBucket: "tabletime-37e13.firebasestorage.app",
  messagingSenderId: "637672330126",
  appId: "1:637672330126:web:11a582a11725979b358adf",
  measurementId: "G-CK5MDEW390"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);