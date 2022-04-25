import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use



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


    import { doc, getDoc, getDocs, collection, query } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";

    console.log(firebase);

    let collectionRef=collection(firebase, "ristoranti");
    let docs=await getDocs(query(collectionRef));

    let i=0;
    docs.forEach(
    (doc) =>{
    i=parseInt(doc.id);

    var Ristorante = doc.data();
    console.log(Ristorante);
    var Nome = Ristorante.informazioni.nome;
    var Img = Ristorante.informazioni.immagine;
    var Valutazione = Ristorante.informazioni.valutazione;
    var Via = Ristorante.posizione.via;
    var N_civico = Ristorante.posizione.n_civico;
    var CAP = Ristorante.posizione.CAP;
    var Città = Ristorante.posizione.città;
    var Telefono = Ristorante.contatti.telefono;
    var Sito_web = Ristorante.contatti.link;
    var Mappa = Ristorante.contatti.mappa;
    console.log(Nome);
    console.log(Img);

    var stringBuilder = '<section class="restaurant-section section-bg">';
    stringBuilder += '<div class="card" >'
    stringBuilder += '<div class="row no-gutters">'
    stringBuilder += '<div class="col-sm-5 cardImg">'
    stringBuilder += '<img class="Img" src="' + Img + '" alt="Suresh Dasari Card">'
    stringBuilder += '</div>'
    stringBuilder += '<div class="col-sm-7 card-div">'
    stringBuilder += '<div class="card-body">'
    stringBuilder += '<div class="card-item"><h5 class="card-title">' + Nome + '</h5></div>'
    stringBuilder += '<div class="card-item"><p class="card-text">Valutazione: ' + Valutazione + '<span class="star" >&starf;</span></p></div>'
    stringBuilder += '<div class="card-item">'
    stringBuilder += '<div class="col-sm-6">'
    stringBuilder += '<div class="card-item"><h5 class="card-title">' + Via + "," + N_civico + "," + CAP + ", " + Città + '</h5></div>'
    stringBuilder += '</div>'
    stringBuilder += '<div class="col-sm-6">'
    stringBuilder += '<iframe src="' + Mappa + '" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    stringBuilder += '</div>'
    stringBuilder += '</div>'
    stringBuilder += '<div class="card-item">'
        stringBuilder += '<button  id="button_delete_' + Ristorante + '" class="btn-delete" data-toggle="tooltip" data-placement="top" title="elimina">Elimina</button>'
        stringBuilder += '<button id="button_modify_' + Ristorante + '" class="btn-modify" data-toggle="tooltip" data-placement="top" title="modifica">Modifica</button>'
    stringBuilder += '</div>'
    stringBuilder += '</div>'
    stringBuilder += '</div>'
    stringBuilder += '</div>'
    stringBuilder += '</section>'


    document.getElementById("ristorante").innerHTML += stringBuilder;

            document.addEventListener('click', function (e) {
                if (e.target && e.target.id === 'button_delete_' + i) {
                    let restaurantRef = ref(db, "Ristoranti" + "/" + i);
                    // remove review
                    remove(restaurantRef);
                    alert("ristorante eliminato")
                    window.location.href = './admin.html';
                }
                if (e.target && e.target.id === 'button_modify_' + i) {
                     localStorage.setItem('currentId',i);
                     window.location.href = './updateRestaurant.html';

                    }
            });
});



function modificaRistorante(id) {
    alert("elimina: " + id);
    let restaurantRef = ref(this.db, "Ristoranti" + "/" + id);

    // remove review
    remove(restaurantRef);
}