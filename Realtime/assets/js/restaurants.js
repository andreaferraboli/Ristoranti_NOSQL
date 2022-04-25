// documentazione
// https://firebase.google.com/docs/database/web/read-and-write

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getDatabase, onValue, ref} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {firebaseConfig} from "./firebaseConfig.js";
import {getDownloadURL,getStorage,listAll,ref as refS} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get realtyme databse reference
// self. to let firebase be global from other modules
self.db = getDatabase(app);
const storage = getStorage(app);
console.log(self.db);

const output1 = document.getElementById("restaurants");
let dbRef = ref(self.db, "/Ristoranti/");

onValue(dbRef, async (snap) => {

    const obj = JSON.parse(JSON.stringify(snap.val(), null, 2));
    for (const i of Object.keys(obj)) {
        let storageRef = refS(storage, 'Files/' + i);
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
            stringBuilder += '<div class="card-item"><h5 class="card-title">' + obj[i].Posizione.via + "," + obj[i].Posizione["numero_civico"] + "," + obj[i].Posizione.cap + ", " + obj[i].Posizione.città + '</h5></div>'
            stringBuilder += '</div>'
            stringBuilder += '<div class="col-sm-6">'
            stringBuilder += '<iframe src="' + obj[i].Posizione.mappa + '" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '<div class="card-item">'
            stringBuilder += '<a href="' + obj[i]["Sito web"] + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Sito web"><i class="bx bx-world bx-sm"></i></a>'
            stringBuilder += '<a href="' + menuLink + '" download="menù" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Menù" id="menu"><i class=\'bx bx-food-menu bx-sm\' ></i></a>'
            stringBuilder += '<a href="' + obj[i].Posizione.link + '" target="_blank" class="btn-restaurant" data-toggle="tooltip" data-placement="top" title="Indicazioni"><i class="bx bx-trip bx-sm"></i></a>'
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