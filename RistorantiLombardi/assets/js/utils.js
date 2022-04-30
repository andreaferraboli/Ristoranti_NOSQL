export function validateCAP(input) {
    if (!isNum(input)) {
        alert("CAP non è un numero,riprovare")
        return false
    }
    if (input < 16192 || input > 46100) {
        alert("cap non della Lombardia,riprovare");
        return false;
    }
    return true;
}

export function isNum(val) {
    return !isNaN(val)
}

export function validateCitta(input) {
    let cittalombarde = ["milano", "brescia", "bergamo", "sondrio", "mantova", "varese", "cremona", "como", "lecco", "lodi", "pavia", "monza e brianza"]
    for (let citta in cittalombarde) {
        if (citta.toLowerCase() === input) {
            return true;
        }
    }
    return false;
}

export function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    alert(string + "non è un link valido,riprovare");
    return (res !== null)
}

export function notemptyInputUPDATE(nome, via, numero_civico, cap, citta, link, maps, recensione, sito, telefono, immagine, lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica) {
    if (nome === "" || via === "" || numero_civico === "" || cap === "" || citta === "" || link === "" || maps === "" || recensione === "" || sito === "" ||
        telefono === "" || immagine === "" || lunedi === "" || martedi === "" || mercoledi === "" || giovedi === "" || venerdi === "" || sabato === "" || domenica === "") {
        alert("Compila tutti i campi");
        return false;
    }
}
export function notemptyInputADD(nome, via, numero_civico, cap, citta, link, maps, recensione, sito, telefono, immagine, lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica, file) {
    if (nome === "" || via === "" || numero_civico === "" || cap === "" || citta === "" || link === "" || maps === "" || recensione === "" || sito === "" ||
        telefono === "" || immagine === "" || lunedi === "" || martedi === "" || mercoledi === "" || giovedi === "" || venerdi === "" || sabato === "" || domenica === "") {
        alert("Compila tutti i campi");
        return false;
    }
    if (file === undefined) {
        alert("Carica un menù");
        return false;
    }
}

export function validateFormRestaurant(nome, via, numero_civico, cap, citta, link, maps, recensione, sito, telefono, immagine, lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica, file) {
    return notemptyInput(nome, via, numero_civico, cap, citta, link, maps, recensione, sito, telefono, immagine, lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica, file) && isValidURL(link) && isValidURL(maps) && isValidURL(sito) && validateCitta(citta) && validateCAP(cap)
}
