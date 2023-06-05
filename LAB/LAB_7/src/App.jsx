import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import dayjs from 'dayjs';

import Film from './model/Film';
import AnswerRoute from './components/AnswerRoute';
import AddFilm from './components/AddFilm';
import EditFilm from './components/EditFilm';


function DefaultRoute() {
  <Container className="App">
    <h1>No data here</h1>
    <h2>This is not the route you are looking for!</h2>
    <Link to="/">Please go back to the main page</Link>
  </Container>
}

function App() {
  const [listFilms, setListFilms] = useState([
    new Film(0, "Pulp Fiction", true, dayjs("20230310"), 5),
    new Film(1, "21 Grams", true, dayjs("20230417"), 4),
    new Film(2, "Star Wars", false, undefined, 0),
    new Film(3, "Matrix", false, undefined, 0),
    new Film(4, "Shrek", false, dayjs("20230321"), 3)
  ]);

  const [filterList, setFilterList] = useState(listFilms);
  const [filterActived, setFilterActived] = useState(0);      // imposta il filtro attivato per mostrare sulla barra laterale quale filtro è attivo
  /* 0: all, 1: favorites, 2: best rated, 3: seen last month, 4: unseen */


  // TODO: l'aggiornamento dei film quando viene modificato un film

  const handleAllFilter = () => {
    setFilterActived(0);
    setFilterList(listFilms);
  };

  const handleFavoriteFilter = () => {
    setFilterActived(1);
    const list = listFilms.filter((film) => film.isFavorite === true);
    setFilterList(list);
  };

  const handleBestRatedFilter = () => {
    setFilterActived(2);
    const list = listFilms.filter((film) => film.score === 5);
    setFilterList(list);
  };

  const handleSeenLastMonthFilter = () => {
    setFilterActived(3);
    const prev = dayjs().subtract(30, 'day');           // intervallo tra oggi e 30 giorni
    const list = listFilms.filter((film) => (film.watchDate !== undefined) ? !film.watchDate.isBefore(prev) && !film.watchDate.isAfter(dayjs()) : false);
    setFilterList(list);
  };

  const handleUnseenFilter = () => {
    setFilterActived(4);
    const list = listFilms.filter((film) => film.watchDate === undefined);
    setFilterList(list);
  };

  const handleDeleteFilm = (id) => {
    const list = listFilms.filter((film) => film.id !== id);
    setListFilms(list);
    setFilterList(list);
  };

  const handleAddNewFilm = (film) => {
    if (film === undefined) return;

    let list = listFilms;
    film.id = list.length;   // da non fare, bisogna farlo fare al server in backend
    list.push(film);
    setListFilms(list);
    handleAllFilter();
  };

  /*const handleChangeFavorite = (id, isFavorite) => {
    let index = listFilms.findIndex(film => film.id === id);
    let film = listFilms[index];

    let list = [...listFilms];
    film.isFavorite = isFavorite;

    if (index !== -1) list[index] = film;

    setListFilms(list);
    handleAllFilter();
  };*/

  const handleChangeRating = (id, score) => {
    let index = listFilms.findIndex(film => film.id === id);
    let film = listFilms[index];

    let list = [...listFilms];
    film.score = score;

    if (index !== -1) list[index] = film;

    setListFilms(list);
    handleAllFilter();
  }

  const handleEditFilm = (film) => {
    let list = listFilms.map((e) => {
      if (e.id === film.id) {
        console.log("film con id " + e.id + " modificato");
        return film;
      } else {
        return e;
      }
    });

    setListFilms(list);
    handleAllFilter();
  }

  useEffect(() => {
    window.addEventListener('load', () => { handleAllFilter(); })
  }, [listFilms]);

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={
          <AnswerRoute
            filterActived={filterActived}
            handleAllFilter={handleAllFilter}
            handleBestRatedFilter={handleBestRatedFilter}
            handleFavoriteFilter={handleFavoriteFilter}
            handleSeenLastMonthFilter={handleSeenLastMonthFilter}
            handleUnseenFilter={handleUnseenFilter}
            filterList={filterList}
            handleAddNewFilm={handleAddNewFilm}
            handleDeleteFilm={handleDeleteFilm}
            handleChangeRating={handleChangeRating} />} />
        <Route path="/:filterId" element={
          <AnswerRoute
            filterActived={filterActived}
            handleAllFilter={handleAllFilter}
            handleBestRatedFilter={handleBestRatedFilter}
            handleFavoriteFilter={handleFavoriteFilter}
            handleSeenLastMonthFilter={handleSeenLastMonthFilter}
            handleUnseenFilter={handleUnseenFilter}
            filterList={filterList}
            handleAddNewFilm={handleAddNewFilm}
            handleDeleteFilm={handleDeleteFilm}
            handleChangeRating={handleChangeRating} />} />
        <Route path="/add" element={<AddFilm handleAddNewFilm={handleAddNewFilm} />} />
        <Route path="/edit/:id" element={<EditFilm editFilm={handleEditFilm} listFilms={listFilms} />} />
        <Route path="/*" element={<DefaultRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
