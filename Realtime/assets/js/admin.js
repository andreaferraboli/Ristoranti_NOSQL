import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getDatabase, onValue, query, ref, remove} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
// import {currentId} from "./updateRestaurant.js";



const firebaseConfig = {
    apiKey: "AIzaSyAyK1ThxpKUGHEKtlg4W3EJZEBnPHjH-Ic",
    authDomain: "ristoranti-31ef8.firebaseapp.com",
    projectId: "ristoranti-31ef8",
    storageBucket: "ristoranti-31ef8.appspot.com",
    messagingSenderId: "236248778413",
    appId: "1:236248778413:web:0b004e239a04c74793a824",
    databaseURL: "https://ristoranti-31ef8-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

console.log(db);
// recupera e stampa valore della chiave 'testo'
const output1 = document.getElementById("restaurants");
// var dbRef = ref(db, "/Ristoranti/");
let dbRef = query(ref(db, '/Ristoranti/'));
onValue(dbRef, (snap) => {
    const obj = JSON.parse(JSON.stringify(snap.val(), null, 2));
    console.log(obj);
    console.log(Object.keys(obj));
    for (const i of Object.keys(obj)) {
        if (obj[i] != null) {
            let stringBuilder = '<section class="restaurant-section section-bg">';
            stringBuilder += '<div class="card" >'
            stringBuilder += '<div class="row no-gutters">'
            stringBuilder += '<div class="col-sm-5 cardImg">'
            stringBuilder += '<img class="Img" src="' + obj[i].Img + '" alt="Suresh Dasari Card">'
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
            stringBuilder += '<button  id="button_delete_' + i + '" class="btn-delete" data-toggle="tooltip" data-placement="top" title="elimina">Elimina</button>'
            stringBuilder += '<button id="button_modify_' + i + '" class="btn-modify" data-toggle="tooltip" data-placement="top" title="modifica">Modifica</button>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</section>'
            // stringBuilder += '<script>'
            // stringBuilder += 'function eliminaRistorante(event) {'
            // stringBuilder += ' event.stopPropagation();'
            // stringBuilder += ' event.target.id'
            // stringBuilder += '            alert("elimina: " + id);'
            // stringBuilder += '            let restaurantRef = ref(db, "Ristoranti" + "/" + "0");'
            //
            // // remove review
            // stringBuilder += '            remove(restaurantRef);'
            // stringBuilder += '        }'
            // stringBuilder += ''
            // stringBuilder += '</script>'
            output1.innerHTML += stringBuilder;
            // document.getElementById("button_"+i).addEventListener("click",event =>{
            //     console.log("ristorante");
            //     let restaurantRef = ref(db, "Ristoranti" + "/" + i);
            //     // remove review
            //     remove(restaurantRef);
            //     alert("ristorante eliminato")
            // })
            document.addEventListener('click', function (e) {
                if (e.target && e.target.id === 'button_delete_' + i) {
                    let restaurantRef = ref(db, "Ristoranti" + "/" + i);
                    // remove review
                    remove(restaurantRef);
                    alert("ristorante eliminato")
                    window.location.href = './admin.html';
                }
                if (e.target && e.target.id === 'button_modify_' + i) {
                     // currentId=i;
                    window.location.href = './updateRestaurant.html';

                    }
            });
        }
    }
});



function modificaRistorante(id) {
    alert("elimina: " + id);
    let restaurantRef = ref(this.db, "Ristoranti" + "/" + id);

    // remove review
    remove(restaurantRef);
}