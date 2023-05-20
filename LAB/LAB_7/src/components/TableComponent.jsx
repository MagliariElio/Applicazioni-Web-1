import React from 'react';
import AddFilm from './AddFilm';
import Row from './Row';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'react-bootstrap';

export default function TableComponent(props) {
    return (
        <Container fluid >
            { /* List of films */}
            <Table bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th scope='col'>Title</th>
                        <th scope='col'>Favorite</th>
                        <th scope='col'>Watch Date</th>
                        <th scope='col'>Score</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.filterList.map(film => (
                            <Row
                                key={film.id}
                                film={film}
                                onButtonDelete={props.handleDeleteFilm}
                                handleChangeRating={props.handleChangeRating}
                            />
                        ))
                    }
                </tbody>

            </Table>

            {/*props.isAddRowVisible && <AddRow handleAddNewFilm={props.handleAddNewFilm} /> */}

            { /* Add a new film */}
            <Link to="/add">
                <Button onClick={props.handleAddRow}>Add Film</Button>
            </Link>
        </Container>
    );
};