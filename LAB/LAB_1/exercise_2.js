"use strict";

/*.
Create a Film Library

In this exercise, you will implement a simple application to track the films that a person wants to watch and the ones they have
already watched. Each film is represented by the following fields:
▪ A unique numerical id (mandatory)
▪ A title (mandatory)
▪ A Boolean value to represent whether the film is among the person’s favorites (default value: false)
▪ A date corresponding to the date when the person watched the film (optional)
▪ A numerical value between 1 and 5 to represent the rating that the person has given to the film after watching it (optional)

Firstly, implement a constructor function to create Film objects.
Secondly, implement a constructor function to create a FilmLibrary, an object containing an array of Films.
Then, implement the addNewFilm method, which adds a new Film object, passed as parameter, to the FilmLibrary.
Finally, using the last method, populate the FilmLibrary. For instance, you can take inspiration from the
following list:
Id: 1, Title: Pulp Fiction, isFavorite: true, Watch date: March 10, 2023, Score: 5
Id: 2, Title: 21 Grams, isFavorite: true, Watch date: March 17, 2023, Score: 4
Id: 3, Title: Star Wars, isFavorite: false, Watch date: <not defined>, Score: <not assigned>
Id: 4, Title: Matrix, isFavorite: false, Watch date: <not defined>, Score: <not assigned>
Id: 5, Title: Shrek, isFavorite: false, Watch date: March 21, 2023, Score: 3

To verify that you correctly populated the FilmLibrary, implement a print method. This method prints in the
console the whole list of Films stored by the FilmLibrary.
Hint: you may use the day.js library to create and handle the dates.
*/

const dayjs = require('dayjs');

function Film(id, title, isFavourite, watchDate, score) {
    this.id = id;
    this.title = title;
    this.isFavourite = isFavourite === undefined ? false : isFavourite;
    this.watchDate = watchDate;
    this.score = score;

    this.toString = function() {
        return `${this.id}, ${this.title}, ${this.isFavourite}, ${isNaN(this.watchDate) ? undefined : dayjs(this.watchDate).format('DD-MM-YYYY')}, ${this.score}`;
    }
}

function FilmLibrary() {
    this.listFilms = [];

    this.addNewFilm = (film) => {
        this.listFilms.push(film);
    }

    this.print = () => {
        this.listFilms.forEach(film => console.log(film.toString()));
    }
}

const films = [
    new Film(1, "Pulp Fiction", true, dayjs("20230310"), 5),
    new Film(2, "21 Grams", true, dayjs("20230317"), 4),
    new Film(3, "Star Wars", false, undefined, undefined),
    new Film(4, "Matrix", false, undefined, undefined),
    new Film(5, "Shrek", false, dayjs("20230321"), 3),
];

const library = new FilmLibrary();

for (let film of films) {
    library.addNewFilm(film);
}

library.print();



