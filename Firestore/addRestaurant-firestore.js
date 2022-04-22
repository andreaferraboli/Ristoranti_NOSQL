import {
    onGetTasks,
    saveRestaurant,
    deleteTask,
    getTask,
    updateRestaurant,
    getTasks,
} from "./firebase.js";

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