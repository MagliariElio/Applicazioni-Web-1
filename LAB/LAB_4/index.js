"use strict";


const library = new FilmLibrary();

let allFilmsList = undefined;               // elenco di tutti i film
let filterFilmsList = undefined;            // elenco dei film filtrati
let filters = new Map([
    ["all", allFilter],
    ["favorite", favoriteFilter],
    ["bestRated", bestRatedFilter],
    ["seenLastMonth", seenLastMonthFilter]
]);
let filterSelected = "all";

window.addEventListener('load', allFilter());       // al caricamento completo della pagina viene eseguita la funzione



// classe film
function Film(id, title, isFavorite, watchDate, score) {
    this.id = id;
    this.title = title;     // il titolo è unico
    this.isFavorite = isFavorite === undefined ? false : isFavorite;
    this.watchDate = watchDate;
    this.score = score;

    this.toString = function () {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.isFavorite}, Watch date: ${isNaN(this.watchDate) ? undefined : dayjs(this.watchDate).format('MMMM DD, YYYY')}, Score: ${this.score}`;
    }
}


// classe libreria dei film
function FilmLibrary() {
    this.listFilms = [
        new Film(1, "Pulp Fiction", true, dayjs("20230310"), 5),
        new Film(2, "21 Grams", true, dayjs("20230417"), 4),
        new Film(3, "Star Wars", false, undefined, undefined),
        new Film(4, "Matrix", false, undefined, undefined),
        new Film(5, "Shrek", false, dayjs("20230321"), 3)
    ];

    this.print = (list) => {
        list.forEach(film => console.log(film.toString()));
    }

    this.getAllFilms = async () => {
        return new Promise((resolve, reject) => {
            if (this.listFilms == undefined) reject("Book list not defined");
            resolve(this.listFilms);
        })
    }
}


// elimina tutte le righe aggiunte della tabella
function removeAllFilmsOnDisplay() {
    let table = document.getElementById('table');

    // prende tutte le righe della tabella con row-* e li elimina
    let rows = table.querySelectorAll("[id^='row-']");
    rows.forEach(row => {
        table.removeChild(row);
    });
}

// carica i film nella tabella
function loadFilms(list) {
    let table = document.getElementById('table');

    let idNumber = 0;
    list.forEach(film =>
        table.appendChild(createRow(film.title, film.isFavorite, film.watchDate, film.score, idNumber),
            idNumber++));

    // rimozione della riga preimpostata dalla pagina
    //let originalRow = document.getElementById("row");
    //table.removeChild(originalRow);
}

// crea una nuova riga duplicando la riga preimpostata e modificandola con i valori dei film
function createRow(titleValue, isFavorite, date, score, idNumber) {

    // prende la riga preimpostata
    let originalRow = document.getElementById("row");

    // clona la riga
    let row = originalRow.cloneNode(true);
    row.id = "row-" + idNumber;
    row.classList.remove("invisible");

    // prende gli elementi che ci interessano
    let title = row.querySelector("#title");
    let favorite = row.querySelector("#favorite");
    let watchDate = row.querySelector("#watchdate");
    let rating = row.querySelector(".rating");
    let deleteButton = row.querySelector("#deleteButton");

    // modifica per ogni elemento
    title.id = "titolo" + idNumber;
    title.textContent = titleValue;
    if (isFavorite === false) title.classList.remove('favorite');

    favorite.id = "favorite" + idNumber;
    if (isFavorite === false) favorite.checked = false;

    watchDate.id = "date" + idNumber;
    watchDate.textContent = isNaN(date) ? undefined : dayjs(date).format('MMMM DD, YYYY');

    deleteButton.id = titleValue;
    deleteButton.addEventListener("click", (row) => {
        (allFilmsList != undefined) ? allFilmsList = allFilmsList.filter((film => film.title != row.target.id)) : undefined;
        (filterFilmsList != undefined) ? filterFilmsList = filterFilmsList.filter((film => film.title != row.target.id)) : undefined;
        allFilmsList = undefined;
        
        let fun = filters.get(filterSelected);
        fun();

        console.log(row.target.id);
    });

    // da 0 a al valore di score vengono modificate le stelline (valore massimo di stelle pari a 5)
    if (score == undefined) score = 0;
    for (let i = score; i < rating.children.length; i++) {
        rating.children[i].classList.remove("bi-star-fill");
        rating.children[i].classList.add("bi-star");
        rating.children[i].classList.add("empty-star");
        rating.children[i].children[0].attributes[0].value = "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z";
    }

    return row;
}









async function allFilter() {
    await library.getAllFilms()
        .then((films) => allFilmsList = films)
        .catch((e) => console.error("Errore gestito: " + e));

    filterSelected = "all";

    removeAllFilmsOnDisplay();

    if (allFilmsList != undefined) {
        loadFilms(allFilmsList);
    }
}

async function favoriteFilter() {
    if (allFilmsList == undefined) {
        await library.getAllFilms()
            .then((films) => allFilmsList = films)
            .catch((e) => console.error("Errore gestito: " + e));
    }

    filterSelected = "favorite";

    removeAllFilmsOnDisplay();

    filterFilmsList = (allFilmsList != undefined) ? allFilmsList.filter((film) => film.isFavorite === true) : undefined;
    loadFilms(filterFilmsList);
}

async function bestRatedFilter() {
    if (allFilmsList == undefined) {
        await library.getAllFilms()
            .then((films) => allFilmsList = films)
            .catch((e) => console.error("Errore gestito: " + e));
    }

    filterSelected = "bestRated";

    removeAllFilmsOnDisplay();

    filterFilmsList = (allFilmsList != undefined) ? allFilmsList.filter((film) => film.score === 5) : undefined;
    loadFilms(filterFilmsList);
}

async function seenLastMonthFilter() {
    if (allFilmsList == undefined) {
        await library.getAllFilms()
            .then((films) => allFilmsList = films)
            .catch((e) => console.error("Errore gestito: " + e));
    }

    filterSelected = "seenLastMonth";

    removeAllFilmsOnDisplay();

    const prev = dayjs().subtract(30, 'day');           // intervallo tra oggi e 30 giorni

    filterFilmsList = (allFilmsList != undefined) ? allFilmsList.filter((film) => {
        if (film.watchDate != undefined)
            return !film.watchDate.isBefore(prev) && !film.watchDate.isAfter(dayjs());
    }
    ) : undefined;

    loadFilms(filterFilmsList);
}

function deleteFilm() {

}