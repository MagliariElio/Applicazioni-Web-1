"use strict"

const dayjs = require('dayjs');
const sqlite = require("sqlite3");
const db = new sqlite.Database('films.sqlite', (err) => { if (err) throw err; });


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
    this.listFilms = [];

    this.addNewFilm = (film) => {
        return new Promise(async (resolve, reject) => {
            const sql = "INSERT INTO films(id, title, favorite, watchdate, rating) VALUES(?, ?, ?, ?, ?)";
            let result = [];

            if (film == undefined) reject("Film is undefinied");
            this.listFilms = await this.getAllFilms();
            if (this.listFilms.some(f => f.id == film.id)) reject("Already exists a film with this id");

            db.all(sql, [film.id, film.title, film.isFavorite, film.watchDate, film.rating], (err, rows) => {
                if (err) reject(err);
                if (rows == undefined) return;
                for (let row of rows) {
                    result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                }

                this.listFilms.push(film);
                //this.print(this.listFilms);
                resolve(result);
            });
        })
    }

    this.sortByDate = () => {
        let list = [...this.listFilms].filter((a) => a.watchDate !== undefined);
        let listUnwatched = [...this.listFilms].filter((a) => a.watchDate === undefined);
        list = list.sort((a, b) => (dayjs(a.watchDate).isAfter(b.watchDate) ? 1 : -1)).concat(listUnwatched);
        return list;
    }

    this.deleteFilm = (id) => {
        return new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM films WHERE id = ?";
            let result = [];

            if (id == undefined) reject("Film is undefinied");
            this.listFilms = await this.getAllFilms();
            if (!this.listFilms.some(f => f.id == id)) reject("Any film with this id is there");

            db.all(sql, [id], (err, rows) => {
                if (err) reject(err);
                if (rows == undefined) return;
                for (let row of rows) {
                    result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                }

                /*this.listFilms.splice(this.listFilms.indexOf(this.listFilms.find((a) => a.id === id)));
                this.print(this.listFilms);*/
                resolve(result);
            });
        })
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
                if (rows == undefined) return;
                for (let row of rows) {
                    result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                }
                resolve(result);
            });
        })
    }

    this.getAllFavoriteFilms = async () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, title, favorite, watchdate, rating FROM films WHERE favorite = 1";
            let result = [];

            db.all(sql, (err, rows) => {
                if (err) reject(err);
                if (rows == undefined) return;
                for (let row of rows) {
                    result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                }
                resolve(result);
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
                if (rows == undefined) return;
                for (let row of rows) {
                    result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                }
                resolve(result);
            })
        })
    }

    this.getFilmWithRating = async (score) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, title, favorite, watchdate, rating FROM films WHERE rating >= ?";
            let result = [];

            db.all(sql, score, (err, rows) => {
                if (err) reject(err);
                if (rows == undefined) return;
                for (let row of rows) {
                    result.push(new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating));
                }
                resolve(result);
            })
        })
    }

    this.getFilmWithTitle = async (title) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, title, favorite, watchdate, rating FROM films WHERE title like '%' || ? || '%'";
            let result = [];

            db.all(sql, title, (err, rows) => {
                if (err) reject(err);
                if (rows == undefined) return;
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
        .catch((e) => console.error("Errore gestito: " + e));*/

    /*console.log("Stampa di tutti i film preferiti");
    library.getAllFavoriteFilms()
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e));*/

    /*console.log("Stampa di tutti i film guardati oggi");
    library.getAllFilmWatchedToday()
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e));*/

    /*console.log("Stampa di tutti i film visti prima di oggi");
    library.getAllFilmWatchedOnSomeDate(dayjs("2023-03-17"))
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e));*/

    /*console.log("Stampa di tutti i film con un determinato rating");
    library.getFilmWithRating(4)
        .then(library.print)
        .catch(e => console.error("Errore gestito: " + e));*/

    /*console.log("Stampa di tutti i film con un determinato titolo");
    library.getFilmWithTitle("s")
        .then(library.print)
        .catch(e => console.error("Errore gestito: " + e));*/

    console.log("Aggiunta di un nuovo film");
    let film = new Film(3, "Iron Man 3", 0, dayjs("2023048"), 2);

    await library.addNewFilm(film)
        .then(console.log("Film salvato con successo"))
        .catch(e => console.error("Errore gestito: " + e));

    console.log("Stampa di tutti i film");
    await library.getAllFilms()
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e));

    await library.deleteFilm(film.id)
        .then(console.log("Film rimosso con successo"))
        .catch(e => console.error("Errore gestito: " + e));

    console.log("Stampa di tutti i film");
    await library.getAllFilms()
        .then(library.print)
        .catch((e) => console.error("Errore gestito: " + e));

}

main();
//db.close();