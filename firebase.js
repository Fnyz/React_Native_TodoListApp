
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9ZP42wlP6Qdkp5pD7GJ7FPsdYd634eKc",
  authDomain: "todolistapp-b93a9.firebaseapp.com",
  projectId: "todolistapp-b93a9",
  storageBucket: "todolistapp-b93a9.appspot.com",
  messagingSenderId: "677702532906",
  appId: "1:677702532906:web:8de2f13402d2217a17a853"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
export const db = getFirestore(app)



