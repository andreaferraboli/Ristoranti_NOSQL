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
let currentId=localStorage.getItem('currentId');
console.log("currentId:"+currentId);
let nome=document.getElementById('nome');
let via=document.getElementById('via');
let numero_civico=document.getElementById('numero_civico');
let cap=document.getElementById('cap');
let citta=document.getElementById('citta');
let link=document.getElementById('link');
let maps=document.getElementById('maps');
let recensione=document.getElementById('recensione');
let sito=document.getElementById('sito');
let telefono=document.getElementById('telefono');
let immagine=document.getElementById('immagine');

firebase.database().ref('Ristoranti/' + currentId).on('value', function (snapshot) {
    nome.value = snapshot.val().Nome;
    via.value = snapshot.val().Posizione.via;
    numero_civico.value = snapshot.val().Posizione.numero_civico;
    cap.value = snapshot.val().Posizione.cap;
    citta.value = snapshot.val().Posizione.città;
    link.value = snapshot.val().Posizione.link;
    maps.value = snapshot.val().Posizione.mappa;
    recensione.value = snapshot.val().Recensione;
    sito.value = snapshot.val()["Sito web"];
    telefono.value = snapshot.val().Telefono;
    immagine.value = snapshot.val().Img;
})
document.getElementById('update').onclick = function () {
    firebase.database().ref('Ristoranti/'+currentId).update({
        Nome: nome.value,
        Posizione: {via: via.value, numero_civico: numero_civico.value, città: citta.value, cap: cap.value, link: link.value, mappa: maps.value},
        Recensione: recensione.value,
        "Sito web": sito.value,
        Telefono: telefono.value,
        Img: immagine.value
    });
    alert("DATI AGGIORNATI");
    window.location.href = '../Realtime/admin.html';
}
