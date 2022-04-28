import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {firebaseConfig} from "./firebaseConfig.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
 * @param {string} lunedi
 * @param {string} martedi
 * @param {string} mercoledi
 * @param {string} giovedi
 * @param {string} venerdi
 * @param {string} sabato
 * @param {string} domenica
 */

export const saveRestaurant = (nome, via, numero_civico, cap, citta, link, maps, recensione, sito, telefono, immagine, lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica) =>
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