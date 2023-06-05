import React, { useState } from "react";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";



function FilmRow(props) {

    const countStar = () => {
        let starList = [];
        const maxNumberStar = 5;
        const fullStar = <i className="bi bi-star-fill"></i>;
        const emptyStar = <i className="bi bi-star"></i>

        if (props.film.score === undefined) props.film.score = 0;

        for (let i = 0; i < props.film.score; i++) {
            starList.push({ key: i, star: fullStar });
        }

        for (let i = props.film.score; i < maxNumberStar; i++) {
            starList.push({ key: i, star: emptyStar });
        }

        return starList;
    };

    const handleDeleteButtonRow = () => {
        props.onButtonDelete(props.film.id)
    };

    const handleChangeRating = (event) => {
        setIsEditRatingStars(false);
        const value = parseInt(event.target.value);
        props.handleChangeRating(props.film.id, value);
    }

    return (
        <tr className='text-center' id={"row" + props.film.id}>
            <td className={props.film.isFavorite === true ? "text-center col-3 favorite" : "text-center col-3"} id="title">
                {props.film.title}
            </td>

            <td className="col-2">
                <input type="checkbox" className="form-check-input me-2" id="favorite" checked={props.film.isFavorite} disabled/>
                <label htmlFor="favorite">Favorite</label>
            </td>

            <td className="col-3" id="watchdate">
                {isNaN(props.film.watchDate) ? undefined : dayjs(props.film.watchDate).format('MMMM DD, YYYY')}
            </td>

            <td className="col-2">
                {
                    <span>
                        {
                            countStar().map(obj =>
                                <span key={obj.key}>
                                    {obj.star}
                                </span>)
                        }
                    </span>
                }
            </td>

            <td className="col-1">
                <Link to={{
                        pathname: `/edit/${props.film.id}`,
                        state: {film: props.film}
                    }}>
                    <Button className="btn">
                        <i className="bi bi-pencil"></i>
                    </Button>
                </Link>

                {/*<RatingStars handleInputChange={handleChangeRating} />*/}
            </td>

            <td className="col-1">
                <button type="button" className="btn btn-danger btn-delete" id="deleteButton" onClick={handleDeleteButtonRow}>
                    <i className="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    );
}


export default FilmRow;