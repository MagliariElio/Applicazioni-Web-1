"use strict"

const dayjs = require('dayjs');
const sqlite = require("sqlite3");
const db = new sqlite.Database('films.sqlite', (err) => { if (err) throw err; });


function Film(id, title, isFavourite, watchDate, score) {
    this.id = id;
    this.title = title;
    this.isFavourite = isFavourite === undefined ? false : isFavourite;
    this.watchDate = watchDate;
    this.score = score;

    this.toString = function () {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.isFavourite}, Watch date: ${isNaN(this.watchDate) ? undefined : dayjs(this.watchDate).format('MMMM DD, YYYY')}, Score: ${this.score}`;
    }
}

function FilmLibrary() {
    this.listFilms = [];

    this.addNewFilm = (film) => {
        this.listFilms.push(film);
    }

    this.sortByDate = () => {
        let list = [...this.listFilms].filter((a) => a.watchDate !== undefined);
        let listUnwatched = [...this.listFilms].filter((a) => a.watchDate === undefined);
        list = list.sort((a, b) => (dayjs(a.watchDate).isAfter(b.watchDate) ? 1 : -1)).concat(listUnwatched);
        return list;
    }

    this.deleteFilm = (id) => {
        this.listFilms.splice(this.listFilms.indexOf(this.listFilms.find((a) => a.id === id)));
    }

    this.print = (list) => {
        list.forEach(film => console.log(film.toString()));
    }

    this.resetWatchedFilms = () => {
        this.listFilms.forEach((a) => (a.watchDate = undefined));
    }

    this.getRated = (rating) => {
        return this.listFilms.filter((film) => film.score == rating)
    }

    this.getAllFilms = async () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, title, favorite, watchdate, rating FROM films";
            let result = [];

            db.all(sql, (err, rows) => {
                if (err) reject(err);
                else {
                    for (let row of rows) {
                        result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                    }
                    resolve(result);
                }
            });
        })
    }

    this.getAllFavoriteFilms = async () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, title, favorite, watchdate, rating FROM films WHERE favorite = 1";
            let result = [];

            db.all(sql, (err, rows) => {
                if (err) reject(err);
                else {
                    for (let row of rows) {
                        result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                    }
                    resolve(result);
                }
            })
        })
    }

    this.getAllFilmWatchedToday = async () => {
        let today = dayjs("2023-03-10");    // andrebbe personalizzato per il giorno odierno ma per semplicità supponiamo che sia questo
        let result = await this.getAllFilms();
        return result.filter((film) => dayjs(film.watchDate).isSame(today));
    }

    this.getAllFilmWatchedOnSomeDate = async (date) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, title, favorite, watchdate, rating FROM films WHERE watchdate < ?";
            let result = [];

            db.all(sql, [date.format("YYYY-MM-DD")], (err, rows) => {
                if (err) reject(err);
                for (let row of rows) {
                    result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                }
                resolve(result);

            })
        })
    }
}



async function main() {
    const library = new FilmLibrary();

    /*console.log("Stampa di tutti i film");
    library.getAllFilms()
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e.message));*/

    /*console.log("Stampa di tutti i film preferiti");
    library.getAllFavoriteFilms()
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e.message));*/

    /*console.log("Stampa di tutti i film guardati oggi");
    library.getAllFilmWatchedToday()
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e.message));*/

    console.log("Stampa di tutti i film visti prima di oggi");
    library.getAllFilmWatchedOnSomeDate(dayjs("2023-03-17"))
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e.message));
}

main();
db.close();