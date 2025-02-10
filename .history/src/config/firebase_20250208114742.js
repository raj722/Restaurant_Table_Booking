import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);