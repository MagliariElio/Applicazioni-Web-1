"use strict";


loadFilms();

async function loadFilms() {
    const library = new FilmLibrary();

    let table = document.getElementById('table');
    let list = undefined;


    await library.getAllFilms()
        .then((films) => list = films)
        .catch((e) => console.error("Errore gestito: " + e));


    let idNumber = 0;
    list.forEach(film => 
        table.appendChild(createRow(film.title, film.isFavorite, film.watchDate, film.score, idNumber),
        idNumber++));
    
    // rimozione della riga preimpostata dalla pagina
    let originalRow = document.getElementById("row");
    table.removeChild(originalRow);
}

// crea una nuova riga duplicando la riga preimpostata e modificandola con i valori dei film
function createRow(titleValue, isFavorite, date, score, idNumber) {

    // prende la riga preimpostata
    let originalRow = document.getElementById("row");

    // clona la riga
    let row = originalRow.cloneNode(true);
    row.id = "row" + idNumber;
    row.classList.remove("invisible");

    // prende gli elementi che ci interessano
    let title = row.querySelector("#title");
    let favorite = row.querySelector("#favorite");
    let watchDate = row.querySelector("#watchdate");
    let rating = row.querySelector(".rating");

    // modifica per ogni elemento
    title.id = "titolo" + idNumber;
    title.textContent = titleValue;
    if(isFavorite === false) title.classList.remove('favorite');

    favorite.id = "favorite" + idNumber;
    if(isFavorite === false) favorite.checked = false;

    watchDate.id = "date" + idNumber;
    watchDate.textContent = isNaN(date) ? undefined : dayjs(date).format('MMMM DD, YYYY');

    // da 0 a al valore di score vengono modificate le stelline (valore massimo di stelle pari a 5)
    if(score == undefined) score = 0;
    for(let i=score; i<rating.children.length; i++) {
        rating.children[i].classList.remove("bi-star-fill");
        rating.children[i].classList.add("bi-star");
        rating.children[i].classList.add("empty-star");
        rating.children[i].children[0].attributes[0].value = "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z";
    }

    return row;
}

function Film(id, title, isFavorite, watchDate, score) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite === undefined ? false : isFavorite;
    this.watchDate = watchDate;
    this.score = score;

    this.toString = function () {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.isFavorite}, Watch date: ${isNaN(this.watchDate) ? undefined : dayjs(this.watchDate).format('MMMM DD, YYYY')}, Score: ${this.score}`;
    }
}

function FilmLibrary() {
    this.listFilms = [
        new Film(1, "Pulp Fiction", true, dayjs("20230310"), 5),
        new Film(2, "21 Grams", true, dayjs("20230317"), 4),
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