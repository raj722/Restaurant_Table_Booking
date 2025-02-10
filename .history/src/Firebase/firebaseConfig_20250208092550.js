import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDN29h7gkqn1bRCi2Hl2fiQ9sg8ypgEOcY",
    authDomain: "tabletime-37e13.firebaseapp.com",
    projectId: "tabletime-37e13",
    storageBucket: "tabletime-37e13.firebasestorage.app",
    messagingSenderId: "637672330126",
    appId: "1:637672330126:web:11a582a11725979b358adf",
    measurementId: "G-CK5MDEW390"
  };

  
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { auth, createUserWithEmailAndPassword };
export const db = getFirestore(app);
export default app;
