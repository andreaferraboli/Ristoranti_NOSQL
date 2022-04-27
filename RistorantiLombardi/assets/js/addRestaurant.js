import {getStorage,ref as sRef,uploadBytes,} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {getDatabase, push, ref} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {firebaseConfig,type_database} from "./firebaseConfig.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import {saveRestaurant, updateRestaurant} from "./firebase";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Set database variable
self.database = getDatabase(app);
self.firebase = getFirestore(app);
if (type_database === "Realtime") {
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
        if (file === undefined) {
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
        const storageRef = sRef(storage, type_database + "/" + id + "/" + "Menu");

        await uploadBytes(storageRef, file);

        alert("Ristorante aggiunto correttamente!");
        window.location.replace('../Realtime/admin.html');
    });
}else{
    const ristoranti = document.getElementById("ristoranti-form");
//const tasksContainer = document.getElementById("tasks-container");

    let editStatus = false;
    let id = "";

    ristoranti.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = ristoranti["nome"];
        const via = ristoranti["via"];
        const numero_civico = ristoranti["numero_civico"];
        const cap = ristoranti["cap"];
        const citta = ristoranti["citta"];
        const link = ristoranti["link"];
        const maps = ristoranti["maps"];
        const recensione = ristoranti["recensione"];
        const sito = ristoranti["sito"];
        const telefono = ristoranti["telefono"];
        const immagine = ristoranti["immagine"];

        try {
            if (!editStatus) {
                await saveRestaurant(nome.value, via.value, numero_civico.value, cap.value, citta.value, link.value, maps.value,
                    recensione.value, sito.value, telefono.value, immagine.value );
            } else {
                await updateRestaurant(id, {
                    nome: nome.value,
                    via: via.value,
                    numero_civico: numero_civico.value,
                    cap: cap.value,
                    citta: nome.citta,
                    link: via.link,
                    maps: maps.value,
                    recensione: recensione.value,
                    sito: sito.value,
                    telefono: telefono.value,
                    immagine: immagine.value,
                });

                editStatus = false;
                id = "";
                ristoranti["btn-ristoranti-form"].innerText = "Save";
            }

            ristoranti.reset();
            nome.focus();
        } catch (error) {
            console.log(error);
        }
    });
}
