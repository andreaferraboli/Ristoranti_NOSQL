import {ref, onValue, update,} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {
    getStorage,
    ref as refS,
    getBytes,
    listAll, getDownloadURL, ref as sRef, uploadBytes
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {firebaseConfig,type_database} from "./firebaseConfig.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get realtyme databse reference
// self. to let firebase be global from other modules
self.db= getDatabase(app);
const storage = getStorage(app);

let currentId = localStorage.getItem('currentId');
console.log("currentId:" + currentId);
let nome = document.getElementById('nome');
let via = document.getElementById('via');
let numero_civico = document.getElementById('numero_civico');
let cap = document.getElementById('cap');
let citta = document.getElementById('citta');
let link = document.getElementById('link');
let maps = document.getElementById('maps');
let recensione = document.getElementById('recensione');
let sito = document.getElementById('sito');
let telefono = document.getElementById('telefono');
let immagine = document.getElementById('immagine');
let fileInput = document.getElementById('fileInput');


console.log(self.db);
var dbRef = ref(self.db, "/Ristoranti/"+ currentId);
onValue(dbRef, (snapshot)=> {
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
    downloadFile().then();
});
// get file reference


async function downloadFile() {

    // get file reference
    let storageRef = refS(storage, type_database+'/' + currentId);
    let fileRef = (await listAll(storageRef)).items[0];

    // get download url and name of the file
    let fileUrl = await getDownloadURL(fileRef);
    let fileName = fileRef.name;
    getDownloadURL (fileRef). then(function(url) {
        const file=document.getElementById('menuFile');
        file.href = url;
    });

}
document.getElementById('update').onclick = async function () {
    console.log(file);
    await update(dbRef,{
        Nome: nome.value,
        Posizione: {
            via: via.value,
            numero_civico: numero_civico.value,
            città: citta.value,
            cap: cap.value,
            link: link.value,
            mappa: maps.value
        },
        Recensione: recensione.value,
        "Sito web": sito.value,
        Telefono: telefono.value,
        Img: immagine.value
    });
    if(fileInput.files.length !== 0)
    {
        console.log("file selezionato");
        var file = document.getElementById('fileInput').files[0];
        const storageRef = sRef(storage, type_database+"/" + currentId + "/" + "Menu");
        await uploadBytes(storageRef, file);
    }
    alert("DATI AGGIORNATI");
    window.location.href = '../Realtime/admin.html';
}
