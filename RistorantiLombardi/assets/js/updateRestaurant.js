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
import {doc, getDoc, getFirestore, updateDoc} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get realtyme databse reference
// self. to let firebase be global from other modules
self.db= getDatabase(app);
self.firebase = getFirestore(app);
const storage = getStorage(app);

let currentId = localStorage.getItem('currentId');
if(type_database==="Realtime"){


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
    let lunedi = document.getElementById('lunedi');
    let martedi = document.getElementById('martedi');
    let mercoledi = document.getElementById('mercoledi');
    let giovedi = document.getElementById('giovedi');
    let venerdi = document.getElementById('venerdi');
    let sabato = document.getElementById('sabato');
    let domenica = document.getElementById('domenica');
    let fileInput = document.getElementById('fileInput');


    console.log(self.db);
    let dbRef = ref(self.db, "/Ristoranti/"+ currentId);
    onValue(dbRef, (snapshot)=> {
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
// get file reference



    document.getElementById('update').onclick = async function () {
        await update(dbRef,{
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
        if(fileInput.files.length !== 0)
        {
            console.log("file selezionato");
            let file = document.getElementById('fileInput').files[0];
            const storageRef = sRef(storage, type_database+"/" + currentId + "/" + "Menu");
            await uploadBytes(storageRef, file);
        }
        alert("DATI AGGIORNATI");
        window.location.href = '../RistorantiLombardi/admin.html';

    }
}else{
    const docRef = doc(self.firebase,"ristoranti", localStorage.getItem("currentId"));
    const Restaurant = (await getDoc(docRef)).data();

    if (Restaurant!==undefined) {

        let Ristorante = Restaurant;
        console.log(Ristorante);
        document.getElementById("nome").value  = Ristorante.Nome;
        document.getElementById("immagine").value  = Ristorante.Img;
        document.getElementById("recensione").value = Ristorante.Valutazione;
        document.getElementById("via").value = Ristorante.Posizione.Via;
        document.getElementById("numero_civico").value  = Ristorante.Posizione.N_civico;
        document.getElementById("cap").value  = Ristorante.Posizione.CAP;
        document.getElementById("citta").value = Ristorante.Posizione.Città;
        document.getElementById("telefono").value  = Ristorante.Telefono;
        document.getElementById("sito").value  = Ristorante.Sito_web;
        document.getElementById("maps").value = Ristorante.Posizione.Mappa;
        document.getElementById("link").value  = Ristorante.Posizione.Link;
        document.getElementById("lunedi").value  = Ristorante.Orari.Lunedi;
        document.getElementById("martedi").value  = Ristorante.Orari.Martedi;
        document.getElementById("mercoledi").value  = Ristorante.Orari.Mercoledi;
        document.getElementById("giovedi").value  = Ristorante.Orari.Giovedi;
        document.getElementById("venerdi").value  = Ristorante.Orari.Venerdi;
        document.getElementById("sabato").value  = Ristorante.Orari.Sabato;
        document.getElementById("domenica").value  = Ristorante.Orari.Domenica;
        downloadFile().then();
        document.getElementById('update').onclick = async function () {
            console.log(document.getElementById("recensione").value);

            await updateDoc(doc(self.firebase, 'ristoranti', localStorage.getItem("currentId")), {
                Nome:  document.getElementById("nome").value,
                Posizione: {
                    Via: document.getElementById("via").value,
                    N_civico: document.getElementById("numero_civico").value,
                    Città: document.getElementById("citta").value,
                    CAP: document.getElementById("cap").value,
                    Link: document.getElementById("link").value,
                    Mappa: document.getElementById("maps").value
                },
                Orari:{
                    Lunedi : document.getElementById("lunedi").value,
                    Martedi : document.getElementById("martedi").value,
                    Mercoledi : document.getElementById("mercoledi").value,
                    Giovedi : document.getElementById("giovedi").value,
                    Venerdi : document.getElementById("venerdi").value,
                    Sabato : document.getElementById("sabato").value,
                    Domenica : document.getElementById("domenica").value
                },
                Valutazione: document.getElementById("recensione").value,
                Sito_web: document.getElementById("sito").value,
                Telefono: document.getElementById("telefono").value,
                Img: document.getElementById("immagine").value
            });
            if(fileInput.files.length !== 0)
            {
                console.log("file selezionato");
                let file = document.getElementById('fileInput').files[0];
                const storageRef = sRef(storage, type_database+"/" + currentId + "/" + "Menu");
                await uploadBytes(storageRef, file);
            }
            alert("DATI AGGIORNATI");
            window.location.href = 'admin.html';

        }
    } else {   // doc.data() will be undefined in this case   console.log("No such document!"); }
        console.log("localstorage:" + localStorage.getItem("currentId"));
    }
}
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
