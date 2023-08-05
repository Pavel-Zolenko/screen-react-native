
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrW9vlBbM8QO-oKiz7CD0Fz0xOBnHG2fY",
  authDomain: "rn-social-7e02c.firebaseapp.com",
  projectId: "rn-social-7e02c",
  storageBucket: "rn-social-7e02c.appspot.com",
  messagingSenderId: "276900134811",
  appId: "1:276900134811:web:6675c1516326a8b741ab3e",
  measurementId: "G-DMQLX00CE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


export const db = getFirestore(app);
export const storage = getStorage(app);
