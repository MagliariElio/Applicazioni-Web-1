import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useState } from 'react';
import dayjs from 'dayjs';

import Row from './components/Row';
import AddRow from './components/AddRow';
import Film from './model/Film';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';


function App() {
  const [listFilms, setListFilms] = useState([
    new Film(0, "Pulp Fiction", true, dayjs("20230310"), 5),
    new Film(1, "21 Grams", true, dayjs("20230417"), 4),
    new Film(2, "Star Wars", false, undefined, 0),
    new Film(3, "Matrix", false, undefined, 0),
    new Film(4, "Shrek", false, dayjs("20230321"), 3)
  ]);

  const [filterList, setFilterList] = useState([]);
  const [isAddRowVisible, setIsAddRowVisible] = useState(false);
  const [filterActived, setFilterActived] = useState(0);      // imposta il filtro attivato per mostrare sulla barra laterale quale filtro è attivo
  /* 0: all, 1: favorites, 2: best rated, 3: seen last month, 4: unseen */

  const handleAllFilter = () => {
    setFilterActived(0);
    setIsAddRowVisible(false);
    setFilterList(listFilms);
  };

  const handleFavoriteFilter = () => {
    setFilterActived(1);
    setIsAddRowVisible(false);
    const list = listFilms.filter((film) => film.isFavorite === true);
    setFilterList(list);
  };

  const handleBestRatedFilter = () => {
    setFilterActived(2);
    setIsAddRowVisible(false);
    const list = listFilms.filter((film) => film.score === 5);
    setFilterList(list);
  };

  const handleSeenLastMonthFilter = () => {
    setFilterActived(3);
    setIsAddRowVisible(false);
    const prev = dayjs().subtract(30, 'day');           // intervallo tra oggi e 30 giorni
    const list = listFilms.filter((film) => (film.watchDate !== undefined) ? !film.watchDate.isBefore(prev) && !film.watchDate.isAfter(dayjs()) : false);

    setFilterList(list);
  };

  const handleUnseenFilter = () => {
    setFilterActived(4);
    setIsAddRowVisible(false);
    const list = listFilms.filter((film) => film.watchDate === undefined);
    setFilterList(list);
  };

  const handleDeleteFilm = (id) => {
    setIsAddRowVisible(false);
    const list = listFilms.filter((film) => film.id !== id);
    setListFilms(list);
    setFilterList(list);
  };

  const handleAddRow = () => {
    setIsAddRowVisible(!isAddRowVisible);
  };

  const handleAddNewFilm = (film) => {
    if (film === undefined) return;

    film.id = listFilms.length;
    listFilms.push(film);
    setListFilms(listFilms);
    handleAllFilter();
  };

  window.addEventListener('load', () => { setFilterList(listFilms) })

  return (
    <>
      {/* Navbar */}
      <Navbar />

      { /* Content of the page */}
      <div className="container-fluid">
        <div className="row vheight-100">

          { /* Left sidebar */}
          <Sidebar
            filterActived={filterActived}
            handleAllFilter={handleAllFilter}
            handleBestRatedFilter={handleBestRatedFilter}
            handleFavoriteFilter={handleFavoriteFilter}
            handleSeenLastMonthFilter={handleSeenLastMonthFilter}
            handleUnseenFilter={handleUnseenFilter} />

          { /* Main content */}
          <main className="col-md-9 col-12 below-nav" >
            <h1 className="mb-2">All</h1>

            { /* List of films */}
            <ul id="table" className="list-group">
              {

                filterList.map(film => (
                  <Row
                    key={film.id}
                    film={film}
                    onButtonDelete={handleDeleteFilm}
                  />
                ))
              }

              {isAddRowVisible && <AddRow handleAddNewFilm={handleAddNewFilm} />}

            </ul>

            { /* Add a new film */}
            <button className="btn btn-lg btn-primary fixed-right-bottom" onClick={handleAddRow}>
              <i className="bi bi-plus"></i>
            </button>


          </main>
        </div>

      </div>
    </>
  )
}

export default App;
