import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

import dayjs from 'dayjs';
import RatingStars from './RatingStars';
import '../style/style.css';
import { useNavigate } from 'react-router-dom';


function AddLayout(props) {

    const [film, setFilm] = useState({
        id: -1,
        title: '',
        isFavorite: false,
        watchDate: undefined,
        score: 0
    });

    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    const handleOnSubmit = (event) => {
        event.preventDefault();

        if (film === undefined) {
            setErrMsg('The fields required must be filled to add a new film!');
        } else if (film.watchDate === undefined) {
            setErrMsg('Insert a date to add a new film!');
        } else {
            props.handleAddNewFilm(film);
            navigate('/');
        }
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

        setFilm((oldFilm) => (
            {
                ...oldFilm,
                [name]: value
            }
        ));
    };

    return (
        <div>
            <Container className='align-items-center mt-4'>
                <h2>Add a New Film</h2>

                <div className='mt-3'>
                    {errMsg ? <Alert variant='danger' className='text-center fade' onClose={() => setErrMsg('')} dismissible>{errMsg}</Alert> : false}
                </div>

                <Form className='mt-3' onSubmit={handleOnSubmit}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control id='title' name='title' type="text" placeholder="Add a title" onChange={handleInputChange} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Watch Date</Form.Label>
                                <Form.Control type="date" id="watchdate" name='watchDate' onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Form.Group>
                                <Form.Check type="checkbox" id="favorite" name='isFavorite' label="Favorite" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <RatingStars handleInputChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Button type="submit" className='btn btn-success m-2' id='confirmButton'>Conferma</Button>
                            <Button type="button" className='btn btn-danger' id='cancelButton' onClick={() => navigate('/')}>Cancella</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default AddLayout;