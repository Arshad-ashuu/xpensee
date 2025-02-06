// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native"; // to check platform web/device
import { getFirestore } from "firebase/firestore";
import { doc, collection, addDoc, getDocs } from "firebase/firestore";
// import { appendBaseUrl } from "expo-router/build/fork/getPathFromState";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAS4-jAiJbVQsvy3t5XDfBt80_6DOTRgUE",
    authDomain: "test-prj-cead5.firebaseapp.com",
    projectId: "test-prj-cead5",
    storageBucket: "test-prj-cead5.firebasestorage.app",
    messagingSenderId: "842639184461",
    appId: "1:842639184461:web:59e0f57a57a8e040660204"
  };

// Initialize Firebase App only if not already initialized id initilized then get the instence of that
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); 

// Initialize Auth with AsyncStorage persistence for native platforms
export const auth = Platform.OS === "web"
  ? getAuth(app) // For web, use getAuth
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

    export const db = getFirestore(app)


export const saveExpenseFirebase = async (expense) => {
    try {
      const docRef = await addDoc(collection(db, "expenses"), expense);
      console.log("Expense added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
  
  export const getExpensesFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "expenses"));
      let expenses = [];
      querySnapshot.forEach((doc) => {
        expenses.push({ id: doc.id, ...doc.data() });
      });
      return expenses;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      return [];
    }
  };