// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, update} from "firebase/database";
import { getStorage } from "firebase/storage";
import { ref, child, get, set, query, equalTo, push } from "firebase/database";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut} from 'firebase/auth';
import {O2A} from 'object-to-array-convert';

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
        return auth.currentUser !== null ? true : false;
    }
    else return false;
}

export async function getTasks() {
    try {
        const database = await get(child(ref(getDatabase()), `tasks`));
        if (database.val()) {
            const tasks = Object.values(database.val())
            return tasks;
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

export async function signOutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("Signed out")
    }).catch((error) => {
        console.log("Failed to sign out", error.message)
    })
}

export async function createNewUser(data) {
    const auth = await getAuth();
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
            position: data.position,
        });
        alert("user successfully created!")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("error code:", errorCode)
        console.error("error message:", errorMessage)
        alert("Unable to create user. \n Error code: ", error.code);
        throw error;
    });
}

export async function getUserProfile(uid) {
    try {
        const database = await get(child(ref(getDatabase()), `users/` + uid));
        if (database.val()) {
            return database.val();
        }
        return "unknown"
    }
    catch (error) {
        console.error('error: ', error)
        throw error;
    }
}

export async function getCurrentProfile() {
    try {
        const auth = getAuth();
        if (auth && auth.currentUser) {
            return getUserProfile(auth.currentUser.uid);
        }
        return null;
    }
    catch (error) {
        console.error('error: ', error);
        throw error;
    }
}

export async function getUserUID() {
    try {
        const auth = getAuth();
        if (auth && auth.currentUser) {
            return auth.currentUser.uid;
        }
        return "";
    }
    catch (error) {
        console.error('error: ', error);
        throw error;
    }
}

export async function getTasksByUser(user) {
    try {
        const database = await get(child(ref(getDatabase()), `tasks`))
        if (database.val()) {
            const tasks = Object.values(database.val())
                .filter(task => task.approved)
                .filter(task => (task.assigned == user?.committee) || task.assigned == user?.position || task.category == 'Social' ) 
            return tasks
        }
        return []
    }
    catch (error) {
        console.error('error: ', error)
        throw error;
    }
}

export async function markTaskAsComplete(approved, assigned, category, completion, createdBy, date, task, key) {
    try { 
        const db = getDatabase();
        const newTask = {
            approved: approved,
            assigned: assigned,
            category: category,
            completion: completion,
            date: date,
            task: task,
            createdBy: createdBy,
            key: key,
        }
        console.log(newTask);
        const updates = {}
        updates['/tasks/' + newTask.key] = newTask
        return update(ref(db), updates);
    }
    catch (error) {
        console.error('error: ', error);
        throw error;
    }
}

export async function createNewTask(data) {
    try {
        const db = getDatabase();
        const auth = getAuth();
        if (auth && auth.currentUser) {
            const newTaskKey = (await push(child(ref(db), 'tasks'))).key;
            const newTask = {
                approved: false,
                assigned: data.assigned,
                category: data.category,
                completion: [''],
                date: data.date,
                task: data.task,
                key: newTaskKey,
                createdBy:  auth.currentUser.uid
            }
            const addToDB = {}
            addToDB['/tasks/' + newTaskKey] = newTask;
            return update(ref(db), addToDB);
        }
        else {
            throw 'error';
        }
    }
    catch (error) {
        console.error('error: ', error);
    }
}

export async function markTaskAsApproved(task) {
    try {
        const db = getDatabase();
        const newTask = {
            approved: true,
            assigned: task.assigned,
            category: task.category,
            completion: task.completion,
            date: task.date,
            task: task.task,
            key: task.key,
            createdBy: task.createdBy,
        }
        const addToDB = {}
        addToDB['/tasks/' + task.key] = newTask;
        return update(ref(db), addToDB);
    }
    catch (error) {
        console.error('error: ', error);
    }
}

export async function deleteTask(key) {
    try {
        const db = getDatabase();
        const removeFromDB = {}
        removeFromDB['/tasks/' + key] = null;
        return update(ref(db), removeFromDB);
    }
    catch (error) {
        console.error('error: ', error);
    }
}

export async function createNewRecap(data) {
    try {
        const db = getDatabase();
        const auth = getAuth();
        if (auth && auth.currentUser) {
            const newRecapKey = (await push(child(ref(db), 'recaps'))).key;
            const newRecap = {
                date: data.date,
                summary: data.summary,
                form: data.form,
                key: newRecapKey,
                createdBy:  auth.currentUser.uid
            }
            const addToDB = {}
            addToDB['/recaps/' + newRecapKey] = newRecap;
            return update(ref(db), addToDB);
        }
        else {
            throw 'error';
        }
    }
    catch (error) {
        console.error('error: ', error);
    }
}

export async function getAllUsers() {
    try {
        const database = await get(child(ref(getDatabase()), `users`));
        if (database.val()) {
            const users = Object.values(database.val())
            return users
        }
        return []
    }
    catch (error) {
        console.error('error: ', error)
        throw error;
    }
}


export async function getRecaps() {
    try {
        const database = await get(child(ref(getDatabase()), `recaps`));
        if (database.val()) {
            const recaps = Object.values(database.val())
            return recaps;
        }
        return []
    }
    catch (error) {
        console.error('error: ', error)
        throw error;
    }
}



//Storage
export const storage = getStorage(firebase);

export default firebase;