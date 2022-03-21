import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBbLap3bGGZhJk5RVmyGd6QsiZbKZ4kSeY",
    authDomain: "firecommerce-175d8.firebaseapp.com",
    projectId: "firecommerce-175d8",
    storageBucket: "firecommerce-175d8.appspot.com",
    messagingSenderId: "80376136189",
    appId: "1:80376136189:web:dec58f07f57fdef9371994",
    measurementId: "G-S1KF9DKW9J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

export default fireDB;
