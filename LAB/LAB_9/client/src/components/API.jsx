
import Film from '../model/Film';

const SERVER_URL = 'http://localhost:3001/api/';

const getFilms = async (filter) => {
    const response = await fetch(filter ? SERVER_URL + 'films?filter=' + filter : SERVER_URL + 'films');

    let list = await response.json();

    list.forEach((film, index, array) =>
        array.splice(index, 1, new Film(film.id, film.title, film.isFavorite, film.watchDate, film.score, film.user)));

    return list;
};

const API = { getFilms };
export default API;