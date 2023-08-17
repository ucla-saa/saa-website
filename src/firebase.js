// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database";
import { ref, child, get } from "firebase/database";
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

export default firebase;