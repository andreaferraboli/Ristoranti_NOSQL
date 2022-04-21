const firebaseConfig = {
    apiKey: "AIzaSyAyK1ThxpKUGHEKtlg4W3EJZEBnPHjH-Ic",
    authDomain: "ristoranti-31ef8.firebaseapp.com",
    projectId: "ristoranti-31ef8",
    storageBucket: "ristoranti-31ef8.appspot.com",
    messagingSenderId: "236248778413",
    appId: "1:236248778413:web:0b004e239a04c74793a824",
    databaseURL: "https://ristoranti-31ef8-default-rtdb.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);

var nome, via, numero_civico, cap, citta, link, maps, recensione, sito, telefono, immagine;

function initial() {
    nome = document.getElementById('nome').value;
    via = document.getElementById('via').value;
    numero_civico = document.getElementById('numero_civico').value;
    cap = document.getElementById('cap').value;
    citta = document.getElementById('citta').value;
    link = document.getElementById('link').value;
    maps = document.getElementById('maps').value;
    recensione = document.getElementById('recensione').value;
    sito = document.getElementById('sito').value;
    telefono = document.getElementById('telefono').value;
    immagine = document.getElementById('immagine').value;
}

document.getElementById('select').onclick = function() {
    initial();
    firebase.database().ref('ristoranti/' + nome).on('value', function(snapshot) {
        document.getElementById('nome').value = snapshot.val().nome;
        document.getElementById('via').value = snapshot.val().Posizione.via;
        document.getElementById('numero_civico').value = snapshot.val().numero_civico;
        document.getElementById('cap').value = snapshot.val().cap;
        document.getElementById('citta').value = snapshot.val().citta;
        document.getElementById('link').value = snapshot.val().link;
        document.getElementById('maps').value = snapshot.val().maps;
        document.getElementById('recensione').value = snapshot.val().recensione;
        document.getElementById('sito').value = snapshot.val().sito;
        document.getElementById('telefono').value = snapshot.val().telefono;
        document.getElementById('immagine').value = snapshot.val().immagine;
    });
    alert("DATI SELEZIONATI");
}

document.getElementById('update').onclick = function() {
    initial();
    firebase.database().ref('ristoranti/' + nome).update({
        nome: nome,
        via: via,
        numero_civico: numero_civico,
        cap: cap,
        citta: citta,
        link: link,
        maps: maps,
        recensione: recensione,
        sito: sito,
        telefono: telefono,
        immagine: immagine,
    });
    alert("DATI AGGIORNATI");
}