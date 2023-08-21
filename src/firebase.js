// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database";
import { ref, child, get, set } from "firebase/database";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJGa9BlJTd7l7nfhVm-uQOVrenABY_IGE",
  authDomain: "ucla-saa-website.firebaseapp.com",
  projectId: "ucla-saa-website",
  storageBucket: "ucla-saa-website.appspot.com",
  messagingSenderId: "336144132924",
  appId: "1:336144132924:web:4d76c4e1e070f364f2cc39",
  measurementId: "G-1VCML5RGS1",
  databaseURL: "https://ucla-saa-website-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const database = getDatabase(firebase);


export async function isUserSignedIn() {
    const auth = getAuth();
    if (auth) {
        console.log(auth);
        return auth.currentUser !== null ? true : false;
    }
    else return false;
}

export async function getTasks() {
    try {
        const database = await get(child(ref(getDatabase()), `tasks`));
        if (database.val()) {
            console.log(database.val());
            return database.val();
        }
    }
    catch (error) {
        console.error('error: ', error)
        throw error;
    }
}

export async function signInUser(email, password) {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("error code:", errorCode)
            console.error("error message:", errorMessage)
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("error code:", errorCode)
        console.error("error message:", errorMessage)
    })
}

export async function createNewUser(data) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
        const user = userCredential.user;
        const db = getDatabase();
        set(ref(db, 'users/' + user.uid), {
            bod: data.bod,
            committee: data.committee,
            email: user.email,
            major: data.major,
            makeupHours: data.makeupHours,
            name: data.name,
            phone: data.phone,
            position: data.position
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("error code:", errorCode)
        console.error("error message:", errorMessage)
    });
}

export async function getUserProfile(uid) {
    try {
        const database = await get(child(ref(getDatabase()), `users/` + uid));
        if (database.val()) {
            console.log(database.val());
            return database.val();
        }
    }
    catch (error) {
        console.error('error: ', error)
        throw error;
    }
}

export default firebase;