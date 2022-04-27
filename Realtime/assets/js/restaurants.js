// documentazione
// https://firebase.google.com/docs/database/web/read-and-write

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getDatabase, onValue, ref} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {firebaseConfig,type_database} from "./firebaseConfig.js";
import {getDownloadURL,getStorage,listAll,ref as refS} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import { getDocs, collection, query } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get realtyme databse reference
// self. to let firebase be global from other modules
self.db = getDatabase(app);
self.firebase = getFirestore(app);
const storage = getStorage(app);
if(type_database === "Realtime"){
    const output1 = document.getElementById("restaurants");
    let dbRef = ref(self.db, "/Ristoranti/");

    onValue(dbRef, async (snap) => {

        const obj = JSON.parse(JSON.stringify(snap.val(), null, 2));
        for (const i of Object.keys(obj)) {
            let storageRef = refS(storage, type_database+'/' + i);
            let fileRef = (await listAll(storageRef)).items[0];
            let menuLink;
            getDownloadURL(fileRef).then(function (url) {
                menuLink = url.valueOf();
                var stringBuilder = '<section class="restaurant-section section-bg">';
                stringBuilder += '<div class="card" >'
                stringBuilder += '<div class="row no-gutters">'
                stringBuilder += '<div class="col-sm-5 cardImg">'
                stringBuilder += '<img class="Img" src="' + obj[i].Img + '" alt="">'
                stringBuilder += '</div>'
                stringBuilder += '<div class="col-sm-7 card-div">'
                stringBuilder += '<div class="card-body">'
                stringBuilder += '<div class="card-item"><h5 class="card-title">' + obj[i].Nome + '</h5></div>'
                stringBuilder += '<div class="card-item"><p class="card-text">Valutazione: ' + obj[i].Recensione + '<span class="star" >&starf;</span></p></div>'
                stringBuilder += '<div class="card-item">'
                stringBuilder += '<div class="col-sm-6">'
                stringBuilder += '<div class="card-item"><h5 class="card-title">' + obj[i].Posizione.Via + "," + obj[i].Posizione["numero_civico"] + "," + obj[i].Posizione.CAP + ", " + obj[i].Posizione.Città + '</h5></div>'
                stringBuilder += '</div>'
                stringBuilder += '<div class="col-sm-6">'
                stringBuilder += '<iframe src="' + obj[i].Posizione.Mappa + '" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                stringBuilder += '</div>'
                stringBuilder += '</div>'
                stringBuilder += '<div class="card-item">'
                stringBuilder += '<a href="' + obj[i]["Sito web"] + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Sito web"><i class="bx bx-world bx-sm"></i></a>'
                stringBuilder += '<a href="' + menuLink + '" download="menù" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Menù" id="menu"><i class=\'bx bx-food-menu bx-sm\' ></i></a>'
                stringBuilder += '<a href="' + obj[i].Sito_web + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Indicazioni"><i class="bx bx-trip bx-sm"></i></a>'
                stringBuilder += '<a href="tel:' + obj[i].Telefono + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Chiama"><i class=\'bx bx-phone bx-sm\' ></i></a>'
                stringBuilder += '</div>'
                stringBuilder += '</div>'
                stringBuilder += '</div>'
                stringBuilder += '</div>'
                stringBuilder += '</section>'
                output1.innerHTML += stringBuilder;
            });
        }
    });
}else{


    let collectionRef=collection(firebase, "ristoranti");
    let docs=await getDocs(query(collectionRef));

    let i=0;
    docs.forEach(
        (doc) =>{
            i=parseInt(doc.id);

            var Ristorante = doc.data();
            console.log(Ristorante);
            var Nome = Ristorante.Nome;
            var Img = Ristorante.Img;
            var Valutazione = Ristorante.Valutazione;
            var Via = Ristorante.Posizione.Via;
            var N_civico = Ristorante.Posizione.N_civico;
            var CAP = Ristorante.Posizione.CAP;
            var Città = Ristorante.Posizione.Città;
            var Telefono = Ristorante.Telefono;
            var Link = Ristorante.Link;
            var Mappa = Ristorante.Posizione.Mappa;
            var Sito_web = Ristorante.Sito_web;

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
            stringBuilder += '<a href="' + Sito_web + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Sito web"><i class="bx bx-world bx-sm"></i></a>'
            stringBuilder += '<a href="php/' + Nome + ".php" + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Menù"><i class=\'bx bx-food-menu bx-sm\' ></i></a>'
            stringBuilder += '<a href="' + Link + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Indicazioni"><i class="bx bx-trip bx-sm"></i></a>'
            stringBuilder += '<a href="tel:' + Telefono + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Chiama"><i class=\'bx bx-phone bx-sm\' ></i></a>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</section>'


            document.getElementById("restaurants").innerHTML += stringBuilder;
        });
}
