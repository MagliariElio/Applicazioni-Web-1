'use strict';

const express = require('express');
const morgan = require('morgan');
const { check, validationResult } = require('express-validator');
const filmDao = require('./dao/film-dao');
const Film = require('./model/Film');
const cors = require('cors');

// init express
const app = express();
const port = 3001;

// set-up middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${location}[${param}]: ${msg} with value: ${value}`;
};


/***   Films APIs    ***/

// GET /api/films
app.get('/api/films',
    // [check('filter').isIn('filter-all', 'filter-favorite', 'filter-best', 'filter-lastmonth', 'filter-unseen')],
    async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(422).json({ error: 'Error: the filter parameter does not exist' });
        }

        try {
            const filter = req.query.filter;

            const result = await filmDao.listFilms(filter);
            if (result.error) {
                res.status(500);
            }

            res.json(result);
        } catch (err) {
            res.status(500).end();
        }
    });

app.get('/api/films/:id',
    [check('id').isInt()],
    async (req, res) => {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array().join(", ") });
        }

        try {
            const id = req.params.id;
            const result = await filmDao.getFilm(id);
            if (result.error) {
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        } catch (err) {
            res.status(500).end();
        }
    });

app.post('/api/film/add',
    [
        check('title').isLength({ min: 1, max: 160 }),
        check('favorite').isBoolean(),
        check('rating').isInt({ min: 0, max: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array().join(", ") });
        }

        const film = new Film(
            req.body.title,
            req.body.favorite,
            req.body.watchDate,
            req.body.rating,
            req.body.user
        );

        try {
            const result = await filmDao.createFilm(film);
            res.json(result);
        } catch (err) {
            res.status(503).json({ error: `Database error during the creation of a new film: ${err}` });
        }
    });

// UPDATE updates the information about a specific film
app.put('/api/update/:id',
    [
        check('id').isInt(),
        check('title').isLength({ min: 1, max: 160 }),
        check('favorite').isBoolean(),
        check('rating').isInt({ min: 0, max: 5 })
    ], async (req, res) => {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array().join(", ") });
        }

        const film = new Film(
            req.params.id,
            req.body.title,
            req.body.favorite,
            req.body.watchDate,
            req.body.rating,
            req.body.user
        );

        try {
            const result = await filmDao.updateFilm(film);
            res.json(result);
        } catch (err) {
            res.status(500).send(err);
        }

    });

// UPDATE updates the rating of a specific film
app.put('/api/update/:id/rating',
    [
        check('id').isInt(),
        check('rating').isInt({ min: 0, max: 5 })
    ], async (req, res) => {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array().join(", ") });
        }

        const id = req.params.id;
        const score = req.body.rating;

        try {
            const result = await filmDao.updateRatingFilm(id, score);
            res.json(result);
        } catch (err) {
            res.status(500).send(err);
        }

    });

// UPDATE mark a film as favorite/unfavorite
app.put('/api/update/:id/favorite',
    [
        check('id').isInt(),
        check('favorite').isBoolean()
    ], async (req, res) => {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array().join(", ") });
        }

        const id = req.params.id;
        const favorite = req.body.favorite;

        try {
            const result = await filmDao.updateFavoriteFilm(id, favorite);
            res.json(result);
        } catch (err) {
            res.status(500).send(err);
        }

    });


// DELETE removes a film through its id
app.delete('/api/remove/:id',
    [check('id').isInt()],
    async (req, res) => {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array().join(", ") });
        }

        const id = req.params.id;
        try {
            const result = await filmDao.removeFilm(id);
            res.send(result);
        } catch (err) {
            res.status(500).end();
        }
    });



// Activating the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));