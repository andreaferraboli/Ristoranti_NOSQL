// Your web app's Firebase configuration
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()

function save() {

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

    if (nome == "" || via == "" || numero_civico == "" || cap == "" || citta == "" || link == "" || maps == "" || recensione == "" || sito == "" ||
        telefono == "" || immagine == "") {
        alert("Compila tutti i campi");
        return false;
    }
    database.ref('Ristoranti/' ).push({
        Nome: nome,
        Posizione : { via : via, numero_civico : numero_civico, città : citta, cap : cap,link: link, mappa: maps},
        Recensione: recensione,
        "Sito web": sito,
        Telefono: telefono,
        Img: immagine
    })

    alert('Ristorante aggiunto')
}