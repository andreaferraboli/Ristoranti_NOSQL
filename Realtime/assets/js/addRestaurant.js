import {getStorage,ref as sRef,uploadBytes,} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {getDatabase, push, ref} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {firebaseConfig} from "./firebaseConfig.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Set database variable
self.database = getDatabase(app);

document.getElementById("submit").addEventListener('click', async () => {
    var nome = document.getElementById('nome').value;
    var via = document.getElementById('via').value;
    var numero_civico = document.getElementById('numero_civico').value;
    var cap = document.getElementById('cap').value;
    var citta = document.getElementById('citta').value;
    var link = document.getElementById('link').value;
    var maps = document.getElementById('maps').value;
    var recensione = document.getElementById('recensione').value;
    var sito = document.getElementById('sito').value;
    var telefono = document.getElementById('telefono').value;
    var immagine = document.getElementById('immagine').value;
    var file = document.getElementById('fileInput').files[0];

    if (nome === "" || via === "" || numero_civico === "" || cap === "" || citta === "" || link === "" || maps === "" || recensione === "" || sito === "" ||
        telefono === "" || immagine === "") {
        alert("Compila tutti i campi");
        return false;
    }
    if(file === undefined){
        alert("Carica un menù");
        return false;
    }
    let id =
        push(ref(self.database, 'Ristoranti/'), {
                Nome: nome,
                Posizione: {via: via, numero_civico: numero_civico, città: citta, cap: cap, link: link, mappa: maps},
                Recensione: recensione,
                "Sito web": sito,
                Telefono: telefono,
                Img: immagine
            }).key;

    console.log(file);
    const storage = getStorage(app);
    const storageRef = sRef(storage, "Files/" + id + "/" + "Menu");

    await uploadBytes(storageRef, file);

    alert("Ristorante aggiunto correttamente!");
    window.location.replace('../Realtime/admin.html');
});
