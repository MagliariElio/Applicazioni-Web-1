import React from 'react';

function RatingStars(props) {
    return (
        <span className="rating">

            <label>
                <input type="radio" name="score" value="1" onChange={props.handleInputChange} />
                <i className="bi bi-star icon"></i>
            </label>
            <label>
                <input type="radio" name="score" value="2" onChange={props.handleInputChange} />
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
            </label>
            <label>
                <input type="radio" name="score" value="3" onChange={props.handleInputChange} />
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
            </label>
            <label>
                <input type="radio" name="score" value="4" onChange={props.handleInputChange} />
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
            </label>
            <label>
                <input type="radio" name="score" value="5" onChange={props.handleInputChange} />
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
                <i className="bi bi-star icon"></i>
            </label>

        </span>
    );
}

export default RatingStars;