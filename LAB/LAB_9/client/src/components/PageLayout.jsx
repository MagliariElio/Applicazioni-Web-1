import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import FilmLibraryTable from './FilmLibraryTable';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import API from './API';


function handleError(err) {
    console.log(err);
}


function PageLayout(props) {
    const filtersList = Object.entries(props.filters);

    return (
        <Row className='vh-100'>
            { /* Left sidebar */}
            <Col md={4} xl={3} bg='light' className='below-nav'>
                <ListGroup as="ul" variant="flush">
                    {
                        filtersList.map(([filterName, { label, url }]) => {
                            return (
                                <NavLink className="list-group-item" key={filterName} to={url}>
                                    {label}
                                </NavLink>
                            );
                        })
                    }
                </ListGroup>
            </Col>
            <Col md={8} xl={9}>
                <Outlet />
            </Col>
        </Row>
    );
}

function MainLayout(props) {
    const { filterId } = useParams();

    let filteredFilms = props.listFilms === undefined ? [] : props.listFilms;

    useEffect(() => {
        let filter = filterId === undefined ? '' : filterId;
        API.getFilms(filter)
            .then(films => { props.setFilms(films); })
            .catch(err => { handleError(err); });
    }, [filterId]);

    return (
        <>
            { /* Content of the page */}
            <Row>
                { /* Main content */}
                <main className="col-md-9">
                    <h1 className="mt-4 mb-3">All</h1>

                    { /* List of films */}
                    <FilmLibraryTable listFilms={filteredFilms} handleAddNewFilm={props.handleAddNewFilm}
                        handleDeleteFilm={props.handleDeleteFilm} handleChangeRating={props.handleChangeRating}
                        handleAddRow={props.handleAddRow}
                    />
                </main>
            </Row>
        </>
    );
}

function NotFoundLayout() {
    <>
        <h1>No data here</h1>
        <h2>This is not the route you are looking for!</h2>
        <Link to="/">Please go back to the main page</Link>
    </>
}

export { PageLayout, MainLayout, NotFoundLayout };