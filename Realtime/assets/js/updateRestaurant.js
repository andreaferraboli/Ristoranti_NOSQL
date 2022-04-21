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
var currentId;
nome=document.getElementById('nome');
via=document.getElementById('via');
numero_civico=document.getElementById('numero_civico');
cap=document.getElementById('cap');
citta=document.getElementById('citta');
link=document.getElementById('link');
maps=document.getElementById('maps');
recensione=document.getElementById('recensione');
sito=document.getElementById('sito');
telefono=document.getElementById('telefono');
immagine=document.getElementById('immagine');

firebase.database().ref('Ristoranti/' + "1").on('value', function (snapshot) {
    //Todo:dynamic id
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
    firebase.database().ref('Ristoranti/1').update({
        Nome: nome.value,
        Posizione: {via: via.value, numero_civico: numero_civico.value, città: citta.value, cap: cap.value, link: link.value, mappa: maps.value},
        Recensione: recensione.value,
        "Sito web": sito.value,
        Telefono: telefono.value,
        Img: immagine.value
    });
    alert("DATI AGGIORNATI");
}
// export function update(ID) {
//
//     currentId = ID;
//     console.log(currentId);
// }