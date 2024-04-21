// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCNbf6Za8-eHtngY1ksJmKuthGencw_h7w",
    authDomain: "react-eshop-retrocult.firebaseapp.com",
    projectId: "react-eshop-retrocult",
    storageBucket: "react-eshop-retrocult.appspot.com",
    messagingSenderId: "528551696599",
    appId: "1:528551696599:web:c19fb036cde5d80e087892",
    measurementId: "G-CJKRRPZF80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
