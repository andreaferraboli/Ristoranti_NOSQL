import {getStorage, ref as sRef, uploadBytes,} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {getDatabase, push, ref} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {firebaseConfig} from "./firebaseConfig.js";
import {addDoc, collection, getFirestore} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Set database variable
self.database = getDatabase(app);
self.firebase = getFirestore(app);
// set_type_database("Firestore");
document.getElementById("type_database").innerHTML = localStorage.getItem("type_database");
document.getElementById("type_database").addEventListener('click',(e)=>{
    if (document.getElementById("type_database").textContent === "Realtime") {
        localStorage.setItem('type_database', "Firestore");
    } else {
        localStorage.setItem('type_database', "Realtime");
    }
    window.location.reload("./addRestaurant.html");
});

document.getElementById("submit").addEventListener('click', async () => {
    let nome = document.getElementById("nome").value;
    let via = document.getElementById("via").value;
    let numero_civico = document.getElementById("numero_civico").value;
    let cap = document.getElementById("cap").value;
    let citta = document.getElementById("citta").value;
    let link = document.getElementById("link").value;
    let maps = document.getElementById("maps").value;
    let recensione = document.getElementById("recensione").value;
    let sito = document.getElementById("sito").value;
    let telefono = document.getElementById("telefono").value;
    let immagine = document.getElementById("immagine").value;
    let lunedi = document.getElementById("lunedi").value;
    let martedi = document.getElementById("martedi").value;
    let mercoledi = document.getElementById("mercoledi").value;
    let giovedi = document.getElementById("giovedi").value;
    let venerdi = document.getElementById("venerdi").value;
    let sabato = document.getElementById("sabato").value;
    let domenica = document.getElementById("domenica").value;
    let file = document.getElementById('fileInput').files[0];
    if (nome === "" || via === "" || numero_civico === "" || cap === "" || citta === "" || link === "" || maps === "" || recensione === "" || sito === "" ||
        telefono === "" || immagine === "" || lunedi === "" || martedi === "" || mercoledi === "" || giovedi === "" || venerdi === "" || sabato === "" || domenica === "") {
        alert("Compila tutti i campi");
        return false;
    }
    if (file === undefined) {
        alert("Carica un menù");
        return false;
    }

let id;
    if (type_database === "Realtime") {
        console.log(nome);
        id =
            push(ref(self.database, 'Ristoranti/'), {
                Nome: nome,
                Posizione: {
                    Via: via,
                    N_civico: numero_civico,
                    Città: citta,
                    CAP: cap,
                    Link: link,
                    Mappa: maps
                },
                Orari: {
                    Lunedi: lunedi,
                    Martedi: martedi,
                    Mercoledi: mercoledi,
                    Giovedi: giovedi,
                    Venerdi: venerdi,
                    Sabato: sabato,
                    Domenica: domenica
                },
                Valutazione: recensione,
                Sito_web: sito,
                Telefono: telefono,
                Img: immagine
            }).key;
    } else {
        let newDoc = await addDoc(collection(self.firebase, "ristoranti"),
            {
                Nome: nome,
                Posizione: {
                    Via: via,
                    N_civico: numero_civico,
                    Città: citta,
                    CAP: cap,
                    Link: link,
                    Mappa: maps
                },
                Orari: {
                    Lunedi: lunedi,
                    Martedi: martedi,
                    Mercoledi: mercoledi,
                    Giovedi: giovedi,
                    Venerdi: venerdi,
                    Sabato: sabato,
                    Domenica: domenica
                },
                Valutazione: recensione,
                Sito_web: sito,
                Telefono: telefono,
                Img: immagine
            });
        id=newDoc.id;
        console.log(id);
    }
    console.log(file);
    const storage = getStorage(app);
    const storageRef = sRef(storage, type_database + "/" + id + "/" + "Menu");

    await uploadBytes(storageRef, file);

    alert("Ristorante aggiunto correttamente!");
    window.location.replace('../RistorantiLombardi/admin.html');
});

