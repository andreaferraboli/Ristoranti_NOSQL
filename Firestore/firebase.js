import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBZn1RMg1jaFSKZEUuHOZwLyDM2s_VrWTc",
    authDomain: "prova-2881d.firebaseapp.com",
    databaseURL: "https://prova-2881d-default-rtdb.firebaseio.com",
    projectId: "prova-2881d",
    storageBucket: "prova-2881d.appspot.com",
    messagingSenderId: "430537388837",
    appId: "1:430537388837:web:abeeff9164a271480ee0cc",
    measurementId: "G-Y5KYS4M1F9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} nome
 * @param {string} via
 * @param {string} numero_civico
 * @param {string} cap
 * @param {string} citta
 * @param {string} link
 * @param {string} maps
 * @param {string} recensione
 * @param {string} sito
 * @param {string} telefono
 * @param {string} immagine
 */

export const saveRestaurant = (nome, via, numero_civico, cap, citta, link, maps, recensione, sito, telefono, immagine) =>
    addDoc(collection(db, "ristoranti"), { nome, via, numero_civico, cap, citta, link, maps, recensione, sito, telefono, immagine});

export const onGetTasks = (callback) =>
    onSnapshot(collection(db, "ristoranti"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "ristoranti", id));

export const updateRestaurant = (id, newFields) =>
    updateDoc(doc(db, "ristoranti", id), newFields);

export const getTasks = () => getDocs(collection(db, "ristoranti"));