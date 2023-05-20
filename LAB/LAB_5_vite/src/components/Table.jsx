import React from 'react';
import AddRow from './AddRow';
import Row from './Row';

export default function Table(props) {
    return (
        <>
            { /* List of films */}
            <ul id="table" className="list-group" >
                {

                    props.filterList.map(film => (
                        <Row
                            key={film.id}
                            film={film}
                            onButtonDelete={props.handleDeleteFilm}
                            handleChangeFavorite={props.handleChangeFavorite}
                            handleChangeRating={props.handleChangeRating}
                        />
                    ))
                }

                {props.isAddRowVisible && <AddRow handleAddNewFilm={props.handleAddNewFilm} />}

            </ul>
        </>
    );
};