// documentazione
// https://firebase.google.com/docs/database/web/read-and-write

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getDatabase, onValue, ref} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {firebaseConfig, type_database} from "./firebaseConfig.js";
import {
    getDownloadURL,
    getStorage,
    listAll,
    ref as refS
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import {getDocs, collection, query} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get realtyme databse reference
// self. to let firebase be global from other modules
self.db = getDatabase(app);
self.firebase = getFirestore(app);
const storage = getStorage(app);


const output1 = document.getElementById("restaurants");
let Nome, Img, Valutazione, Via, N_civico, CAP, Città, Telefono, Link, Mappa, Sito_web, menuLink, Ristorante, sectionRistorante;

if (type_database === "Realtime") {
    let dbRef = ref(self.db, "/Ristoranti/");

    onValue(dbRef, async (snap) => {

        const obj = JSON.parse(JSON.stringify(snap.val(), null, 2));
        for (const i of Object.keys(obj)) {
            let storageRef = refS(storage, type_database + '/' + i);
            let fileRef = (await listAll(storageRef)).items[0];

            getDownloadURL(fileRef).then(function (url) {

                let Ristorante = obj[i];
                Nome = Ristorante.Nome;
                Img = Ristorante.Img;
                Valutazione = Ristorante.Valutazione;
                Via = Ristorante.Posizione.Via;
                N_civico = Ristorante.Posizione.N_civico;
                CAP = Ristorante.Posizione.CAP;
                Città = Ristorante.Posizione.Città;
                Telefono = Ristorante.Telefono;
                Link = Ristorante.Link;
                Mappa = Ristorante.Posizione.Mappa;
                Sito_web = Ristorante.Sito_web;
                menuLink = url.valueOf();
                sectionRistorante = `<section class="restaurant-section section-bg"><div class="card" >
            <div class="row no-gutters">
            <div class="col-sm-5 cardImg">
            <img class="Img" src="${Img}" alt="" >
            </div>
            <div class="col-sm-7 card-div">
            <div class="card-body">
            <div class="card-item"><h5 class="card-title">${Nome}</h5></div>
            <div class="card-item"><p class="card-text">Valutazione: ${Valutazione}<span class="star" >&starf;</span></p></div>
            <div class="card-item">
            <div class="col-sm-6">
            <div class="card-item"><h5 class="card-title">${Via + "," + N_civico + "," + CAP + ", " + Città}</h5></div>
            </div>
            <div class="col-sm-6">
            <iframe src="${Mappa}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            </div>
'<div class="card-item">
            <a href="${Sito_web}" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Sito web"><i class="bx bx-world bx-sm"></i></a>
            <a href="${menuLink}" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Menù"><i class=\'bx bx-food-menu bx-sm\' ></i></a>
            <a href="${Link}" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Indicazioni"><i class="bx bx-trip bx-sm"></i></a>
            <a href="tel:${Telefono}" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Chiama"><i class=\'bx bx-phone bx-sm\' ></i></a>
            </div>
            </div>
            </div>
            </div>
            </section>`

                output1.innerHTML += sectionRistorante;
            });
        }
    });
} else {


    let collectionRef = collection(firebase, "ristoranti");
    let docs = await getDocs(query(collectionRef));

    let i = 0;
    docs.forEach(
        async (doc) => {
            i = parseInt(doc.id);
            let storageRef = refS(storage, type_database + '/' + i);
            let fileRef = (await listAll(storageRef)).items[0];

            getDownloadURL(fileRef).then(function (url) {
                Ristorante = doc.data();
                Nome = Ristorante.Nome;
                Img = Ristorante.Img;
                Valutazione = Ristorante.Valutazione;
                Via = Ristorante.Posizione.Via;
                N_civico = Ristorante.Posizione.N_civico;
                CAP = Ristorante.Posizione.CAP;
                Città = Ristorante.Posizione.Città;
                Telefono = Ristorante.Telefono;
                Link = Ristorante.Link;
                Mappa = Ristorante.Posizione.Mappa;
                Sito_web = Ristorante.Sito_web;
                menuLink = url.valueOf();
                sectionRistorante = `<section class="restaurant-section section-bg"><div class="card" >
            <div class="row no-gutters">
            <div class="col-sm-5 cardImg">
            <img class="Img" src="${Img}"  alt="">
            </div>
            <div class="col-sm-7 card-div">
            <div class="card-body">
            <div class="card-item"><h5 class="card-title">${Nome}</h5></div>
            <div class="card-item"><p class="card-text">Valutazione: ${Valutazione}<span class="star" >&starf;</span></p></div>
            <div class="card-item">
            <div class="col-sm-6">
            <div class="card-item"><h5 class="card-title">${Via + "," + N_civico + "," + CAP + ", " + Città}</h5></div>
            </div>
            <div class="col-sm-6">
            <iframe src="${Mappa}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            </div>
            <div class="card-item">
            <a href="${Sito_web}" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Sito web"><i class="bx bx-world bx-sm"></i></a>
            <a href="${menuLink}" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Menù"><i class=\'bx bx-food-menu bx-sm\' ></i></a>
            <a href="${Link}" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Indicazioni"><i class="bx bx-trip bx-sm"></i></a>
            <a href="tel:${Telefono}" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Chiama"><i class=\'bx bx-phone bx-sm\' ></i></a>
            </div>
            </div>
            </div>
            </div>
            </section>`

                output1.innerHTML += sectionRistorante;
            });
        });

}



