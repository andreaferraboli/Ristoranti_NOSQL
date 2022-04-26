import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {collection, doc, getFirestore, query, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyC6_tMUB9BKh9Fi_WoYZYjCT9Xlgf8q5CY",
    authDomain: "ristorantilombardi.firebaseapp.com",
    projectId: "ristorantilombardi",
    storageBucket: "ristorantilombardi.appspot.com",
    messagingSenderId: "476667917046",
    appId: "1:476667917046:web:8d01a4cd11f6b59b9432d7",
    measurementId: "G-2YMQP9WKN0"
};

const app = initializeApp(firebaseConfig);
self.firebase = getFirestore(app);


console.log(self.firebase);
console.log(localStorage.getItem("currentId"));

const docRef = doc(self.firebase,"ristoranti", localStorage.getItem("currentId"));
const Restaurant = (await getDoc(docRef)).data();

if (Restaurant!==undefined) {

    var Ristorante = Restaurant;
    console.log(Ristorante);
    document.getElementById("nome").value  = Ristorante.informazioni.nome;
    document.getElementById("immagine").value  = Ristorante.informazioni.immagine;
    document.getElementById("recensione").value = Ristorante.informazioni.valutazione;
    document.getElementById("via").value = Ristorante.posizione.via;
    document.getElementById("numero_civico").value  = Ristorante.posizione.n_civico;
    document.getElementById("cap").value  = Ristorante.posizione.CAP;
    document.getElementById("citta").value = Ristorante.posizione.città;
    document.getElementById("telefono").value  = Ristorante.contatti.telefono;
    document.getElementById("sito").value  = Ristorante.contatti.link;
    document.getElementById("maps").value = Ristorante.posizione.mappa;
    document.getElementById("link").value  = Ristorante.posizione.link;
    document.getElementById('update').onclick = async function () {
        console.log(document.getElementById("recensione").value);
        
        await updateDoc(doc(self.firebase, 'ristoranti', localStorage.getItem("currentId")), {
            Nome:  document.getElementById("nome").value,
            Posizione: {
                Via: document.getElementById("via").value,
                N_civico: document.getElementById("numero_civico").value,
                Città: document.getElementById("citta").value,
               CAP: document.getElementById("cap").value,
                Link: document.getElementById("link").value,
                Mappa: document.getElementById("maps").value
            },
            Valutazione: document.getElementById("recensione").value,
            Sito_web: document.getElementById("sito").value,
            Telefono: document.getElementById("telefono").value,
            Img: document.getElementById("immagine").value
        });
        alert("DATI AGGIORNATI");
        window.location.href = '../Firestore/admin-firestore.html';

    }
} else {   // doc.data() will be undefined in this case   console.log("No such document!"); }
    console.log("localstorage:" + localStorage.getItem("currentId"));



}