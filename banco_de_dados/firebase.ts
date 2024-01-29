import { initializeApp } from "firebase/app";
import * as firestore from  'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCLjUZP7L92eTLPIx4eMnT_zW_1owAFgo0",
  authDomain: "teste-87db4.firebaseapp.com",
  projectId: "teste-87db4",
  storageBucket: "teste-87db4.appspot.com",
  messagingSenderId: "159173806916",
  appId: "1:159173806916:web:1f5dcd793649d460606511",
  measurementId: "G-253K9NJ570"
};

const firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(firebase);
console.log("Conectado ao Firebase");

export {firestore}


