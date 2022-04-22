// Your web app's Firebase configuration
import {getStorage, ref, uploadBytes} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getDatabase,query} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAyK1ThxpKUGHEKtlg4W3EJZEBnPHjH-Ic",
    authDomain: "ristoranti-31ef8.firebaseapp.com",
    databaseURL: "https://ristoranti-31ef8-default-rtdb.firebaseio.com",
    projectId: "ristoranti-31ef8",
    storageBucket: "ristoranti-31ef8.appspot.com",
    messagingSenderId: "236248778413",
    appId: "1:236248778413:web:0b004e239a04c74793a824"
};
// Initialize Firebase
let app=firebase.initializeApp(firebaseConfig);
// Set database variable
var database = getDatabase(app)

document.getElementById("submit").addEventListener('click', () => {
    var nome = document.getElementById('nome').value
    var via = document.getElementById('via').value
    var numero_civico = document.getElementById('numero_civico').value
    var cap = document.getElementById('cap').value
    var citta = document.getElementById('citta').value
    var link = document.getElementById('link').value
    var maps = document.getElementById('maps').value
    var recensione = document.getElementById('recensione').value
    var sito = document.getElementById('sito').value
    var telefono = document.getElementById('telefono').value
    var immagine = document.getElementById('immagine').value
    var file = document.getElementById('fileInput').value
    if (nome == "" || via == "" || numero_civico == "" || cap == "" || citta == "" || link == "" || maps == "" || recensione == "" || sito == "" ||
        telefono == "" || immagine == "") {
        alert("Compila tutti i campi");
        return false;
    }
    database.ref('Ristoranti/').push({
        Nome: nome,
        Posizione: {via: via, numero_civico: numero_civico, città: citta, cap: cap, link: link, mappa: maps},
        Recensione: recensione,
        "Sito web": sito,
        Telefono: telefono,
        Img: immagine
    })

    var storageRef =getStorage(app).ref();
    var thisRef = storageRef.child(file.name);
    thisRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
    });

// 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    //upload file
    // var upload = storage.put(file);
    alert('Ristorante aggiunto');
    // load();
});

function getFileUrl(filename) {
    //create a storage reference
    var storage = firebase.storage().ref(filename);

    //get file url
    storage
        .getDownloadURL()
        .then(function (url) {
            console.log(url);
        })
        .catch(function (error) {
            console.log("error encountered");
        });
}

function load() {
    window.location.href = "admin.html";
}