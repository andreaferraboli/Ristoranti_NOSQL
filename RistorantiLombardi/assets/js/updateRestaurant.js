import {getDatabase, onValue, ref, update,} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
    getDownloadURL,
    getStorage,
    listAll,
    ref as refS,
    ref as sRef,
    uploadBytes
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {firebaseConfig} from "./firebaseConfig.js";
import { validateUpdateFormRestaurant} from "./utils.js";
import {doc, getDoc, getFirestore, updateDoc} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get realtyme databse reference
// self. to let firebase be global from other modules
self.db = getDatabase(app);
self.firebase = getFirestore(app);
const storage = getStorage(app);

let currentId = localStorage.getItem('currentId');
let type_database = localStorage.getItem("type_database");
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
let lunedi = document.getElementById('lunedi');
let martedi = document.getElementById('martedi');
let mercoledi = document.getElementById('mercoledi');
let giovedi = document.getElementById('giovedi');
let venerdi = document.getElementById('venerdi');
let sabato = document.getElementById('sabato');
let domenica = document.getElementById('domenica');
let file = document.getElementById('fileInput').files[0];

if (type_database === "Realtime") {
    let dbRef = ref(self.db, "/Ristoranti/" + currentId);
    onValue(dbRef, (snapshot) => {
        nome.value = snapshot.val().Nome;
        via.value = snapshot.val().Posizione.Via;
        numero_civico.value = snapshot.val().Posizione.N_civico;
        cap.value = snapshot.val().Posizione.CAP;
        citta.value = snapshot.val().Posizione.Città;
        link.value = snapshot.val().Posizione.Link;
        maps.value = snapshot.val().Posizione.Mappa;
        recensione.value = snapshot.val().Valutazione;
        sito.value = snapshot.val().Sito_web;
        telefono.value = snapshot.val().Telefono;
        immagine.value = snapshot.val().Img;
        lunedi.value = snapshot.val().Orari.Lunedi;
        martedi.value = snapshot.val().Orari.Martedi;
        mercoledi.value = snapshot.val().Orari.Mercoledi;
        giovedi.value = snapshot.val().Orari.Giovedi;
        venerdi.value = snapshot.val().Orari.Venerdi;
        sabato.value = snapshot.val().Orari.Sabato;
        domenica.value = snapshot.val().Orari.Domenica;
        downloadFile().then();
    });
    document.getElementById('update').onclick = async function () {
        if (validateUpdateFormRestaurant(nome.value, via.value, numero_civico.value, cap.value, citta.value, link.value, maps.value, recensione.value, sito.value, telefono.value, immagine.value, lunedi.value, martedi.value, mercoledi.value, giovedi.value, venerdi.value, sabato.value, domenica.value) === false)
            return false;
        else {
            await update(dbRef, {
                Nome: nome.value,
                Posizione: {
                    Via: via.value,
                    N_civico: numero_civico.value,
                    Città: citta.value,
                    CAP: cap.value,
                    Link: link.value,
                    Mappa: maps.value
                },
                Orari: {
                    Lunedi: lunedi.value,
                    Martedi: martedi.value,
                    Mercoledi: mercoledi.value,
                    Giovedi: giovedi.value,
                    Venerdi: venerdi.value,
                    Sabato: sabato.value,
                    Domenica: domenica.value
                },
                Valutazione: recensione.value,
                Sito_web: sito.value,
                Telefono: telefono.value,
                Img: immagine.value
            });
            if (file !== undefined) {
                console.log("file selezionato");
                let currentFile = file;
                const storageRef = sRef(storage, type_database + "/" + currentId + "/" + "Menu");
                await uploadBytes(storageRef, currentFile);
            }
            alert("DATI AGGIORNATI");
            window.location.href = '../RistorantiLombardi/admin.html';
        }
    }
} else {
    const docRef = doc(self.firebase, "ristoranti", localStorage.getItem("currentId"));
    const Restaurant = (await getDoc(docRef)).data();

    if (Restaurant !== undefined) {

        let Ristorante = Restaurant;
        nome.value = Ristorante.Nome;
        immagine.value = Ristorante.Img;
        recensione.value = Ristorante.Valutazione;
        via.value = Ristorante.Posizione.Via;
        numero_civico.value = Ristorante.Posizione.N_civico;
        cap.value = Ristorante.Posizione.CAP;
        citta.value = Ristorante.Posizione.Città;
        telefono.value = Ristorante.Telefono;
        sito.value = Ristorante.Sito_web;
        maps.value = Ristorante.Posizione.Mappa;
        link.value = Ristorante.Posizione.Link;
        lunedi.value = Ristorante.Orari.Lunedi;
        martedi.value = Ristorante.Orari.Martedi;
        mercoledi.value = Ristorante.Orari.Mercoledi;
        giovedi.value = Ristorante.Orari.Giovedi;
        venerdi.value = Ristorante.Orari.Venerdi;
        sabato.value = Ristorante.Orari.Sabato;
        domenica.value = Ristorante.Orari.Domenica;
        downloadFile().then();
        document.getElementById('update').onclick = async function () {
            if (validateUpdateFormRestaurant(nome.value, via.value, numero_civico.value, cap.value, citta.value, link.value, maps.value, recensione.value, sito.value, telefono.value, immagine.value, lunedi.value, martedi.value, mercoledi.value, giovedi.value, venerdi.value, sabato.value, domenica.value) === false)
                return false;
            else {
                await updateDoc(doc(self.firebase, 'ristoranti', localStorage.getItem("currentId")), {
                    Nome: nome.value,
                    Posizione: {
                        Via: via.value,
                        N_civico: numero_civico.value,
                        Città: citta.value,
                        CAP: cap.value,
                        Link: link.value,
                        Mappa: maps.value
                    },
                    Orari: {
                        Lunedi: lunedi.value,
                        Martedi: martedi.value,
                        Mercoledi: mercoledi.value,
                        Giovedi: giovedi.value,
                        Venerdi: venerdi.value,
                        Sabato: sabato.value,
                        Domenica: domenica.value
                    },
                    Valutazione: recensione.value,
                    Sito_web: sito.value,
                    Telefono: telefono.value,
                    Img: immagine.value
                });
                if (file !== undefined) {
                    console.log("file selezionato");
                    let currentFile = file;
                    const storageRef = sRef(storage, type_database + "/" + currentId + "/" + "Menu");
                    await uploadBytes(storageRef, currentFile);
                }
                alert("DATI AGGIORNATI");
                window.location.href = 'admin.html';
            }
        };
    } else {   // doc.data() will be undefined in this case   console.log("No such document!"); }
        console.log("localstorage:" + localStorage.getItem("currentId"));
    }
}

async function downloadFile() {

    // get file reference
    let storageRef = refS(storage, type_database + '/' + currentId);
    let fileRef = (await listAll(storageRef)).items[0];

    // get download url and name of the file
    let fileUrl = await getDownloadURL(fileRef);
    let fileName = fileRef.name;
    getDownloadURL(fileRef).then(function (url) {
        const file = document.getElementById('menuFile');
        file.href = url;
    });

}
