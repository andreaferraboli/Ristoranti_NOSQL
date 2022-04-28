import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
    getDatabase,
    onValue,
    query as queryF,
    ref,
    remove
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {deleteObject, getStorage, ref as refS} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    query
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import {firebaseConfig} from "./firebaseConfig.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firebase = getFirestore(app);

let type_database = localStorage.getItem("type_database");
document.getElementById("type_database").innerHTML = localStorage.getItem("type_database");
document.getElementById("type_database").addEventListener('click', (e) => {
    if (document.getElementById("type_database").textContent === "Realtime") {
        localStorage.setItem('type_database', "Firestore");
    } else {
        localStorage.setItem('type_database', "Realtime");
    }
    window.location.reload("./restaurants.html");
});


const output1 = document.getElementById("restaurants");
let Nome, Img, Valutazione, Via, N_civico, CAP, Città, Telefono, Link, Mappa, Sito_web, menuLink, Ristorante,
    sectionRistorante;
let Lunedi, Martedi, Mercoledi, Giovedi, Venerdi, Sabato, Domenica;

if (type_database === "Realtime") {
    let dbRef = queryF(ref(db, '/Ristoranti/'));
    onValue(dbRef, (snap) => {
        const obj = JSON.parse(JSON.stringify(snap.val(), null, 2));
        for (const i of Object.keys(obj)) {
            if (obj[i] != null) {
                Ristorante = obj[i];
                Nome = Ristorante.Nome;
                Img = Ristorante.Img;
                Valutazione = Ristorante.Valutazione;
                Via = Ristorante.Posizione.Via;
                N_civico = Ristorante.Posizione.N_civico;
                CAP = Ristorante.Posizione.CAP;
                Città = Ristorante.Posizione.Città;
                Telefono = Ristorante.Telefono;
                Link = Ristorante.Link;
                Mappa = Ristorante.Posizione.Mappa;
                Sito_web = Ristorante.Sito_web;
                Lunedi = Ristorante.Orari.Lunedi;
                Martedi = Ristorante.Orari.Martedi;
                Mercoledi = Ristorante.Orari.Mercoledi;
                Giovedi = Ristorante.Orari.Giovedi;
                Venerdi = Ristorante.Orari.Venerdi;
                Sabato = Ristorante.Orari.Sabato;
                Domenica = Ristorante.Orari.Domenica;
                sectionRistorante = `<section class="restaurant-section section-bg"><div class="card" >
            <div class="row no-gutters">
            <div class="col-sm-5 cardImg">
            <img class="Img" src="${Img}"  alt="">
            </div>
            <div class="col-sm-7 card-div">
            <div class="card-body">
            <div class="card-item"><h5 class="card-title">${Nome}</h5></div>
            <div class="card-item"><p class="card-text">Valutazione: ${Valutazione}<span class="star" >&starf;</span></p></div>
            <div class="card-item">
            <div class="col-sm-6">
            <div class="card-item"><h5 class="card-title">${Via + "," + N_civico + "," + CAP + ", " + Città}</h5> </div>
            <a class="dropdown-content">Lunedi: ${Lunedi}</a><br>
            <a class="dropdown-content" >Martedi: ${Martedi}</a><br>
            <a class="dropdown-content" >Mercoledi: ${Mercoledi}</a><br>
            <a class="dropdown-content" >Giovedi: ${Giovedi}</a><br>
            <a class="dropdown-content" >Venerdi: ${Venerdi}</a><br>
            <a class="dropdown-content" >Sabato: ${Sabato}</a><br>
            <a class="dropdown-content" >Domenica: ${Domenica}</a><br>                                              
            </div>
            <div class="col-sm-6">
            <iframe src="${Mappa}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>            
            </div>
            </div>
            <div class="card-item">
            <button  id="button_delete_${i}" class="btn-delete" data-toggle="tooltip" data-placement="top" title="elimina">Elimina</button>
                <button id="button_modify_${i}" class="btn-modify" data-toggle="tooltip" data-placement="top" title="modifica">Modifica</button>
           </div>
            </div>
            </div>
            </div>
            </section>`;
                output1.innerHTML += sectionRistorante;
                document.addEventListener('click', async function (e) {
                    if (e.target && e.target.id === 'button_delete_' + i) {
                        let restaurantRef = ref(db, "Ristoranti" + "/" + i);
                        // remove review
                        remove(restaurantRef);

                        const storage = getStorage(app);
                        const desertRef = refS(storage, type_database + '/' + i + "/Menu");
                        await deleteObject(desertRef).then(() => {
                            console.log("file eliminato");
                        }).catch((error) => {
                            alert("file non eliminati");
                            return false;
                        });
                        alert("ristorante eliminato")
                        window.location.href = './admin.html';
                    }
                    if (e.target && e.target.id === 'button_modify_' + i) {
                        localStorage.setItem('currentId', i);
                        window.location.href = './updateRestaurant.html';

                    }
                });
            }
        }
    });
} else {
    let collectionRef = collection(firebase, "ristoranti");
    let docs = await getDocs(query(collectionRef));

    docs.forEach(
        (pick) => {
            let i = parseInt(pick.id);

            var Ristorante = pick.data();
            console.log(Ristorante);

            Nome = Ristorante.Nome;
            Img = Ristorante.Img;
            Valutazione = Ristorante.Valutazione;
            Via = Ristorante.Posizione.Via;
            N_civico = Ristorante.Posizione.N_civico;
            CAP = Ristorante.Posizione.CAP;
            Città = Ristorante.Posizione.Città;
            Telefono = Ristorante.Telefono;
            Link = Ristorante.Link;
            Mappa = Ristorante.Posizione.Mappa;
            Sito_web = Ristorante.Sito_web;
            Lunedi = Ristorante.Orari.Lunedi;
            Martedi = Ristorante.Orari.Martedi;
            Mercoledi = Ristorante.Orari.Mercoledi;
            Giovedi = Ristorante.Orari.Giovedi;
            Venerdi = Ristorante.Orari.Venerdi;
            Sabato = Ristorante.Orari.Sabato;
            Domenica = Ristorante.Orari.Domenica;
            sectionRistorante = `<section class="restaurant-section section-bg"><div class="card" >
            <div class="row no-gutters">
            <div class="col-sm-5 cardImg">
            <img class="Img" src="${Img}"  alt="">
            </div>
            <div class="col-sm-7 card-div">
            <div class="card-body">
            <div class="card-item"><h5 class="card-title">${Nome}</h5></div>
            <div class="card-item"><p class="card-text">Valutazione: ${Valutazione}<span class="star" >&starf;</span></p></div>
            <div class="card-item">
            <div class="col-sm-6">
            <div class="card-item"><h5 class="card-title">${Via + "," + N_civico + "," + CAP + ", " + Città}</h5> </div>
            <a class="dropdown-content">Lunedi: ${Lunedi}</a><br>
            <a class="dropdown-content" >Martedi: ${Martedi}</a><br>
            <a class="dropdown-content" >Mercoledi: ${Mercoledi}</a><br>
            <a class="dropdown-content" >Giovedi: ${Giovedi}</a><br>
            <a class="dropdown-content" >Venerdi: ${Venerdi}</a><br>
            <a class="dropdown-content" >Sabato: ${Sabato}</a><br>
            <a class="dropdown-content" >Domenica: ${Domenica}</a><br>                                              
            </div>
            <div class="col-sm-6">
            <iframe src="${Mappa}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>            
            </div>
            </div>
            <div class="card-item">
            <button  id="button_delete_${i}" class="btn-delete" data-toggle="tooltip" data-placement="top" title="elimina">Elimina</button>
                <button id="button_modify_${i}" class="btn-modify" data-toggle="tooltip" data-placement="top" title="modifica">Modifica</button>
           </div>
            </div>
            </div>
            </div>
            </section>`;
            output1.innerHTML += sectionRistorante;
            document.addEventListener('click', async function (e) {
                if (e.target && e.target.id === 'button_delete_' + i) {
                    deleteDoc(doc(firebase, "ristoranti", pick.id));
                    const storage = getStorage(app);
                    const desertRef = refS(storage, type_database + '/' + i + "/Menu");
                    await deleteObject(desertRef).then(() => {
                        console.log("file eliminato");
                    }).catch((error) => {
                        alert("file non eliminati");
                        window.location.href = './admin.html';
                    });
                    alert("ristorante eliminato");
                    window.location.href = './admin.html';
                }
                if (e.target && e.target.id === 'button_modify_' + i) {
                    localStorage.setItem('currentId', pick.id);
                    window.location.href = './updateRestaurant.html';
                }
            });
        });
}

