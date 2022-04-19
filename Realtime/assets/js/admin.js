import { getDatabase, ref, onValue, get, push, set, remove } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

async function eliminaRistorante(id) {
    alert("eliminaRistorante: " + id);
    let restaurantRef = ref(db, "Ristoranti" + "/" + id);

    // remove review
    remove(restaurantRef);
}
async function modificaRistorante(id) {
    alert("eliminaRistorante: " + id);
    let restaurantRef = ref(this.db, "Ristoranti" + "/" + id);

    // remove review
    remove(restaurantRef);
}