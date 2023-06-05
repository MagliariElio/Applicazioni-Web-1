import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

import Film from './model/Film';
import AddLayout from './components/AddLayout';
import EditLayout from './components/EditLayout';
import { PageLayout, MainLayout } from './components/PageLayout';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
import dayjs from 'dayjs';


function NotFoundLayout() {
  <>
    <h1>No data here</h1>
    <h2>This is not the route you are looking for!</h2>
    <Link to="/">Please go back to the main page</Link>
  </>
}

function App() {
  const [listFilms, setListFilms] = useState([]);

  const filters = {
    'filter-all': { label: 'All', url: '', filterFunction: () => true },
    'filter-favorite': { label: 'Favorite', url: '/filter/filter-favorite', filterFunction: (film) => film.isFavorite === true },
    'filter-best': { label: 'Best', url: '/filter/filter-best', filterFunction: (film) => film.score === 5 },
    'filter-lastmonth': { label: 'Seen Last Month', url: '/filter/filter-lastmonth', filterFunction: (film) => (film.watchDate !== undefined) ? (!film.watchDate.isBefore(dayjs().subtract(30, 'day')) && !film.watchDate.isAfter(dayjs())) : false },
    'filter-unseen': { label: 'Unseen', url: '/filter/filter-unseen', filterFunction: (film) => film.watchDate === undefined }
  };

  const handleDeleteFilm = (id) => {
    const list = listFilms.filter((film) => film.id !== id);

    setListFilms(list);
  };

  const handleAddNewFilm = (film) => {
    if (film === undefined) return;

    let list = listFilms;
    film.id = list.length;   // da non fare, bisogna farlo fare al server in backend
    list.push(film);

    setListFilms(list);
  };

  const handleChangeRating = (id, score) => {
    let index = listFilms.findIndex(film => film.id === id);
    let film = listFilms[index];

    let list = [...listFilms];
    film.score = score;

    if (index !== -1) list[index] = film;

    setListFilms(list);
  }

  const handleEditFilm = (film) => {
    let list = listFilms.map(e => {
      if (e.id === film.id) {
        return film;
      } else {
        return e;
      }
    });

    setListFilms(list);
  }

  return (
    <BrowserRouter>
      {/* Navbar */}
      <NavbarComponent />

      <Container fluid>
        <Routes>
          <Route path='/' element={<PageLayout filters={filters} />} >
            <Route index element={<MainLayout listFilms={listFilms} filters={filters} setFilms={setListFilms} handleAddNewFilm={handleAddNewFilm} handleDeleteFilm={handleDeleteFilm} handleChangeRating={handleChangeRating} />} />
            <Route path='filter/:filterId' element={<MainLayout listFilms={listFilms} filters={filters} setFilms={setListFilms} handleAddNewFilm={handleAddNewFilm} handleDeleteFilm={handleDeleteFilm} handleChangeRating={handleChangeRating} />} />
            <Route path='add' element={<AddLayout handleAddNewFilm={handleAddNewFilm} />} />
            <Route path='edit/:filmId' element={<EditLayout editFilm={handleEditFilm} listFilms={listFilms} />} />
            <Route path='*' element={<NotFoundLayout />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
