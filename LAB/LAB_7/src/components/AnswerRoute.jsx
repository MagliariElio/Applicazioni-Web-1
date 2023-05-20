
import React, { useEffect } from 'react';

import NavbarComponent from './Navbar';
import Sidebar from './Sidebar';
import TableComponent from './TableComponent';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const AnswerRoute = (props) => {
    const { filterId } = useParams();

    console.log("lista filtrata: " + props.filterList);
    
    useEffect(() => {
        let filter = filterId;
        if (filter === undefined) {
            filter = 0;
        }

        if (filter != props.filterActived) {
            switch (parseInt(filter)) {
                case 0:
                    props.handleAllFilter();
                    break;
                case 1:
                    props.handleFavoriteFilter();
                    break;
                case 2:
                    props.handleBestRatedFilter();
                    break;
                case 3:
                    props.handleSeenLastMonthFilter();
                    break;
                case 4:
                    props.handleUnseenFilter();
                    break;
            }
        }
    }, [filterId]);

    return (
        <>
            {/* Navbar */}
            <NavbarComponent />

            <Container fluid>
                { /* Content of the page */}
                <div className="row">
                    { /* Left sidebar */}
                    <Sidebar
                        filterActived={props.filterActived}
                        handleAllFilter={props.handleAllFilter}
                        handleBestRatedFilter={props.handleBestRatedFilter}
                        handleFavoriteFilter={props.handleFavoriteFilter}
                        handleSeenLastMonthFilter={props.handleSeenLastMonthFilter}
                        handleUnseenFilter={props.handleUnseenFilter} />

                    { /* Main content */}
                    <main className="col-md-9">
                        <h1 className="mt-4 mb-3">All</h1>

                        { /* List of films */}
                        <TableComponent filterList={props.filterList} handleAddNewFilm={props.handleAddNewFilm}
                            handleDeleteFilm={props.handleDeleteFilm} handleChangeRating={props.handleChangeRating}
                            handleAddRow={props.handleAddRow}
                        />
                    </main>
                </div>
            </Container>
        </>
    );
};

export default AnswerRoute;