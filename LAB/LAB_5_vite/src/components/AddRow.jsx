import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import dayjs from 'dayjs';
import RatingStars from './RatingStars';
import '../style/style.css';


function AddRow(props) {

    const [formData, setFormData] = useState({
        id: -1,
        title: '',
        isFavorite: false,
        watchDate: undefined,
        score: 0
    });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        props.handleAddNewFilm(formData);
    };

    const handleInputChange = (event) => {
        let { name, value } = event.target;

        // viene riformattato il valore secondo il format previsto
        switch (name) {
            case 'isFavorite':
                value = event.target.checked;
                break;
            case 'watchDate':
                value = dayjs(value);
                break;
            case 'score':
                value = parseInt(value);
                break;
            default:
                break;
        }

        setFormData((prevFormData) => (
            {
                ...prevFormData,
                [name]: value
            }
        ));
    };

    return (
        <Form onSubmit={handleOnSubmit}>
            <li className="list-group-item" id="row">
                <div className="d-flex w-100 justify-content-between">
                    <span className="col-md-2 col-3">
                        <input type="text" className="form-control" id="title" name='title' placeholder='Add a title' onChange={handleInputChange} required />
                    </span>
                    <Form.Group>
                        <span className="custom-control custom-checkbox col-md-2 col-2">
                            <Form.Control type="checkbox" className="form-check-input" id="favorite" name='isFavorite' onChange={handleInputChange} />
                            <Form.Label className="custom-control-label">Favorite</Form.Label>
                        </span>
                    </Form.Group>
                    {/* TODO: sostituire l'input text con uno per le date */}
                    <span className="col-md-2 col-2 watch-date">
                        <input type="date" className="form-control" id="watchdate" placeholder='Add the date' name='watchDate' onChange={handleInputChange} />
                    </span>
                    <span className='col-md-2 col-2'>
                        <RatingStars handleInputChange={handleInputChange} />
                    </span>
                    <span className="text-end col-md-2 col-2">
                        <button type="submit" className="btn btn-success" id="confirmButton"> Conferma </button>
                    </span>
                </div>
            </li>
        </Form>
    );
}

export default AddRow;