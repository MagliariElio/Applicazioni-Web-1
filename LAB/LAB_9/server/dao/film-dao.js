'use strict';

/* Data Access Object (DAO) module for accessing films */

const Film = require('../model/Film');

const dayjs = require('dayjs');
const db = require('./db');

const filters = {
    'filter-favorite': { label: 'Favorites', filterFunction: film => film.isFavorite == true },
    'filter-best': { label: 'Best Rated', filterFunction: film => film.score == 5 },
    'filter-lastmonth': { label: 'Seen Last Month', filterFunction: film => (film.watchDate.isValid()) ? (!film.watchDate.isBefore(dayjs().subtract(30, 'day')) && !film.watchDate.isAfter(dayjs())) : false },
    'filter-unseen': { label: 'Unseen', filterFunction: film => !film.watchDate.isValid() }
}

/** 
 * Get all films
 * @param filter: filter to apply to the film list
 * */
exports.listFilms = (filter) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title, favorite, watchdate, rating, user FROM films';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            if (rows == undefined) {
                resolve({ error: 'There are not films!' });
                return;
            }

            let films = rows.map((row) => (new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating, row.user)));

            if (filters.hasOwnProperty(filter /*&& filters[filter].filterFunction != undefined*/)) {
                films = films.filter(filters[filter].filterFunction);
            }

            resolve(films);
        })
    })
};

/**
 * Get a specific film with its id specified
 * @param id: id film
 * */
exports.getFilm = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title, favorite, watchdate, rating, user FROM films WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Film not found.' });
            } else {
                const film = new Film(row.id, row.title, row.favorite, dayjs(row.watchdate), row.rating, row.user);
                resolve(film);
            }
        });
    })
};

/** 
 * Add a new film
 * @param film: an object containg all information about the film to add
*/
exports.createFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO films (title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [film.title, film.isFavorite, dayjs(film.watchdate).format('YYYY-MM-DD'), film.score, film.user], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(exports.getFilm(this.lastID));
        });
    });
}

/** 
 * Update an existing film
 * @param film: an object containg all information about the film to update
*/
exports.updateFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET title = ?, favorite = ?, watchdate = ?, rating = ? WHERE id = ?';

        db.run(sql, [film.title, film.isFavorite, dayjs(film.watchdate).format('YYYY-MM-DD'), film.score, film.id],  (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(exports.getFilm(film.id));
        });
    });
};

/** 
 * Update rating of an existing film
 * @param id: the id film to update
 * @param score: value to update
*/
exports.updateRatingFilm = (id, score) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET rating = ? WHERE id = ?';

        db.run(sql, [score, id],  (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(exports.getFilm(id));
        });
    });
};

/** 
 * Marks an existing film as favorite/unfavorite
 * @param id: the id film to update
 * @param favorite: value to update
*/
exports.updateFavoriteFilm = (id, favorite) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET favorite = ? WHERE id = ?';
        db.run(sql, [favorite, id],  (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(exports.getFilm(id));
        });
    });
};

/** 
 * Remove an existing film
 * @param id: the id film to remove 
*/
exports.removeFilm = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM films WHERE id = ?';
        db.run(sql, [id],  (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(`The film with the id ${id} has been removed!`);
        });
    });
};
