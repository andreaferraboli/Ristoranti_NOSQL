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
    getDocs,
    getFirestore,
    query,
    doc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import {firebaseConfig, type_database} from "./firebaseConfig.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
self.firebase = getFirestore(app);
if (type_database === "Realtime") {
    const output1 = document.getElementById("restaurants");
    let dbRef = queryF(ref(db, '/Ristoranti/'));
    onValue(dbRef, (snap) => {
        const obj = JSON.parse(JSON.stringify(snap.val(), null, 2));
        for (const i of Object.keys(obj)) {
            if (obj[i] != null) {
                let stringBuilder = '<section class="restaurant-section section-bg">';
                stringBuilder += '<div class="card" >'
                stringBuilder += '<div class="row no-gutters">'
                stringBuilder += '<div class="col-sm-5 cardImg">'
                stringBuilder += '<img class="Img" src="' + obj[i].Img + '" alt="">'
                stringBuilder += '</div>'
                stringBuilder += '<div class="col-sm-7 card-div">'
                stringBuilder += '<div class="card-body">'
                stringBuilder += '<div class="card-item"><h5 class="card-title">' + obj[i].Nome + '</h5></div>'
                stringBuilder += '<div class="card-item"><p class="card-text">Valutazione: ' + obj[i].Recensione + '<span class="star" >&starf;</span></p></div>'
                stringBuilder += '<div class="card-item">'
                stringBuilder += '<div class="col-sm-6">'
                stringBuilder += '<div class="card-item"><h5 class="card-title">' + obj[i].Posizione.via + "," + obj[i].Posizione["numero_civico"] + "," + obj[i].Posizione.cap + ", " + obj[i].Posizione.città + '</h5></div>'
                stringBuilder += '</div>'
                stringBuilder += '<div class="col-sm-6">'
                stringBuilder += '<iframe src="' + obj[i].Posizione.mappa + '" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                stringBuilder += '</div>'
                stringBuilder += '</div>'
                stringBuilder += '<div class="card-item">'
                stringBuilder += '<button  id="button_delete_' + i + '" class="btn-delete" data-toggle="tooltip" data-placement="top" title="elimina">Elimina</button>'
                stringBuilder += '<button id="button_modify_' + i + '" class="btn-modify" data-toggle="tooltip" data-placement="top" title="modifica">Modifica</button>'
                stringBuilder += '</div>'
                stringBuilder += '</div>'
                stringBuilder += '</div>'
                stringBuilder += '</div>'
                stringBuilder += '</section>'
                output1.innerHTML += stringBuilder;
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
            var Nome = Ristorante.informazioni.nome;
            var Img = Ristorante.informazioni.immagine;
            var Valutazione = Ristorante.Valutazione;
            var Via = Ristorante.posizione.via;
            var N_civico = Ristorante.posizione.n_civico;
            var CAP = Ristorante.posizione.CAP;
            var Città = Ristorante.posizione.città;
            var Mappa = Ristorante.Posizione.Mappa;

            var stringBuilder = '<section class="restaurant-section section-bg">';
            stringBuilder += '<div class="card" >'
            stringBuilder += '<div class="row no-gutters">'
            stringBuilder += '<div class="col-sm-5 cardImg">'
            stringBuilder += '<img class="Img" src="' + Img + '" >'
            stringBuilder += '</div>'
            stringBuilder += '<div class="col-sm-7 card-div">'
            stringBuilder += '<div class="card-body">'
            stringBuilder += '<div class="card-item"><h5 class="card-title">' + Nome + '</h5></div>'
            stringBuilder += '<div class="card-item"><p class="card-text">Valutazione: ' + Valutazione + '<span class="star" >&starf;</span></p></div>'
            stringBuilder += '<div class="card-item">'
            stringBuilder += '<div class="col-sm-6">'
            stringBuilder += '<div class="card-item"><h5 class="card-title">' + Via + "," + N_civico + "," + CAP + ", " + Città + '</h5></div>'
            stringBuilder += '</div>'
            stringBuilder += '<div class="col-sm-6">'
            stringBuilder += '<iframe src="' + Mappa + '" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '<div class="card-item">'
            stringBuilder += '<button id="button_delete_' + i + '" class="btn-delete" data-toggle="tooltip" data-placement="top" title="elimina">Elimina</button>'
            stringBuilder += '<button id="button_modify_' + i + '" class="btn-modify" data-toggle="tooltip" data-placement="top" title="modifica">Modifica</button>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</div>'
            stringBuilder += '</section>'


            document.getElementById("restaurants").innerHTML += stringBuilder;
            document.addEventListener('click', async function (e) {
                if (e.target && e.target.id === 'button_delete_' + i) {
                    await deleteDoc(doc(firebase, "ristoranti", pick.id));

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

