import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {collection, doc, getFirestore, query, getDoc} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";


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

// let collectionRef = collection(firebase, "ristoranti/" + localStorage.getItem("currentId"));
// let docs = await getDoc(query(collectionRef));
const docRef = doc(self.firebase,"ristoranti/" + localStorage.getItem("currentId"));
const Restaurant = (await getDoc(docRef)).data();
    console.log("Sugoma sus");
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
    document.getElementById('update').onclick = function () {
        firebase.database().ref('Ristoranti/' + i).update({
            Nome: Nome.value,
            Posizione: {
                Via: Via.value,
                N_civico: N_civico.value,
                Città: Città.value,
                CAP: CAP.value,
                Link: Link.value,
                Mappa: Mappa.value
            },
            Valutazione: Valutazione.value,
            "Sito_web": Sito_web.value,
            Telefono: Telefono.value,
            Img: Img.value
        });
        alert("DATI AGGIORNATI");
        window.location.href = '../Firestore/admin-firestore.html';

    }
} else {   // doc.data() will be undefined in this case   console.log("No such document!"); }
    console.log("localstorage:" + localStorage.getItem("currentId"));



}