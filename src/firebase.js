import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC-3-Mv1AXWrOBPS7MAARLif53Hev_uC9k",
    authDomain: "moviegallery-62a75.firebaseapp.com",
    projectId: "moviegallery-62a75",
    storageBucket: "moviegallery-62a75.firebasestorage.app",
    messagingSenderId: "676042350070",
    appId: "1:676042350070:web:b449e8fd24c1372b387bd7",
    measurementId: "G-078NEL9C1R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();