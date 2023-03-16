"use strict"

const dayjs = require('dayjs');
const sqlite = require("sqlite3");
const db = new sqlite.Database('films.sqlite', (err) => {if(err) throw err;});


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
            const sql = "SELECT * FROM films";

            db.all(sql, (err, rows) => {
                if(err) reject(err.message);
                else {
                    for(let row of rows) {
                        this.addNewFilm(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                    }
                    resolve(this.listFilms);
                }
            });
        })
    }
}



function main() {
    const library = new FilmLibrary();

    library.getAllFilms()
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e.message));


}

main();
db.close();