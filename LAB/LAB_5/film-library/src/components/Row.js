import React from "react";
import dayjs from 'dayjs';



function Row(props) {

    const countStar = () => {
        let starList = [];
        const maxNumberStar = 5;
        const fullStar = <i className="bi bi-star-fill"></i>;
        const emptyStar = <i className="bi bi-star"></i>

        if(props.film.score === undefined) props.film.score = 0;

        for (let i = 0; i < props.film.score; i++) {
            starList.push({key:i, star:fullStar});
        }

        for (let i = props.film.score; i < maxNumberStar; i++) {
            starList.push({key:i, star:emptyStar});
        }

        return starList;
    };

    const handleDeleteButtonRow = () => {
        props.onButtonDelete(props.film.id);
    }

    return (
        <li className="list-group-item" id={"row" + props.film.id}>
            <div className="d-flex w-100 justify-content-between">
                <p className={props.film.isFavorite === true ? "text-start col-md-3 col-3 favorite" : "text-start col-md-3 col-3"} id={"title" + props.film.title}>{props.film.title}</p>
                <span className="custom-control custom-checkbox col-md-2 col-2">
                    <input type="checkbox" className="form-check-input" id={"favorite" + props.film.title} checked={props.film.isFavorite} readOnly />
                    <label className="custom-control-label" htmlFor="favorite">Favorite</label>
                </span>
                <small className="watch-date col-md-2 col-2" id={"watchdate" + props.film.title}>{isNaN(props.film.watchDate) ? undefined : dayjs(props.film.watchDate).format('MMMM DD, YYYY')}</small>
                <span className="text-end col-md-3 col-2">
                    {
                        countStar().map(obj => 
                        <span key={obj.key}>
                            {obj.star}
                        </span>)
                    }
                </span>
                <span className="text-end col-md-2 col-3">
                    <button type="button" className="btn btn-danger btn-delete" id={"deleteButton" + props.film.title} onClick={handleDeleteButtonRow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </button>
                </span>
            </div>
        </li>
    );
}


export default Row;