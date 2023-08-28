import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { environment } from "../../../environment/environment";

// Initialize Firebase
export const app = initializeApp(environment.firebase);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
