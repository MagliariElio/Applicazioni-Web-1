"use strict";

/*
In this exercise you will add a set of methods to the FilmLibrary object and write some test instructions to invoke them.

Hint: To implement the required functionalities described below you may use the functional programming paradigm to manipulate the array of films.

sortByDate: returns a new array containing the Films within the FilmLibrary instance sorted in ascending order of the watch date. 
The movies that the user has not already watched should be put at the end. 

For example, after the sorting, the FilmLibrary shown in the previous exercise would look like:
***** List of films *****
Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2023, Score: 5
Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2023, Score: 4
Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2023, Score: 3
Id: 3, Title: Star Wars, Favorite: false, Watch date: <not defined>, Score: <not defined>
Id: 4, Title: Matrix, Favorite: false, Watch date: <not defined>, Score: <not defined>

deleteFilm: deletes a Film from the FilmLibrary based on an Id received by parameter.

resetWatchedFilms: deletes the Watch date of all the Films in the FilmLibrary.

getRated: selects the films that do have a defined score. Only movies with an assigned score should be returned, ordered by decreasing score. 

After filtering the Films Library shown in exercise 1, the method should print:
***** Films filtered, only the rated ones *****
Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2023, Score: 5
Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2023, Score: 4
Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2023, Score: 3

Finally, test the methods by invoking them over the FilmLibrary instance you created and populated in
exercise 1.
*/

const dayjs = require('dayjs');

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
}

const films = [
    new Film(0, "Shrek 3", false, undefined, 1),
    new Film(1, "Pulp Fiction", true, dayjs("20230310"), 5),
    new Film(2, "21 Grams", true, dayjs("20230317"), 4),
    new Film(3, "Star Wars", false, dayjs("20230410"), 1),
    new Film(4, "Matrix", false, dayjs("2023048"), 1),
    new Film(5, "Shrek", false, dayjs("20230321"), 3),
    new Film(6, "Shrek 2", false, undefined, 5)
];


function main() {
    const library = new FilmLibrary();

    for (let film of films) {
        library.addNewFilm(film);
    }

    console.log("----------------------");
    console.log("Sort array by Date");
    library.print(library.sortByDate());

    console.log("----------------------");

    console.log("Delete the film with id equal to 5");
    library.deleteFilm(5);
    library.print(library.listFilms);

    console.log("----------------------");

    console.log("Resetting the watch property of all movies");
    library.resetWatchedFilms();
    library.print(library.listFilms);

    console.log("----------------------");
    console.log("***** Films filtered, only the rated ones *****");
    library.print(library.getRated(1));
    
    
    console.log("----------------------");
    return;
}


main();
