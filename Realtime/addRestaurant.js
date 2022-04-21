// Your web app's Firebase configuration
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
    database.ref('Ristoranti/').push({
        Nome: nome,
        Posizione: {via: via, numero_civico: numero_civico, città: citta, cap: cap, link: link, mappa: maps},
        Recensione: recensione,
        "Sito web": sito,
        Telefono: telefono,
        Img: immagine
    })
    alert('Ristorante aggiunto');
    // load();
}

function load() {
    window.location.href = "admin.html";
}