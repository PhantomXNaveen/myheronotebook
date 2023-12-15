import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA13mrrBTa_jqYznQLpJ5aoVmbzpkp026o",
    authDomain: "myheronotebook-4441.firebaseapp.com",
    projectId: "myheronotebook-4441",
    storageBucket: "myheronotebook-4441.appspot.com",
    messagingSenderId: "989233643380",
    appId: "1:989233643380:web:8952c298e537cf17ce7621"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbFirestore = getFirestore(app);


export {auth, dbFirestore};