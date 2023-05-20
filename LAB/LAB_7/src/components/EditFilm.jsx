import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Navbar, Row } from 'react-bootstrap';

import NavbarComponent from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import RatingStars from './RatingStars';

import dayjs from 'dayjs';


function EditFilm(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    let film = id && props.listFilms.find(film => film.id === parseInt(id));

    const [date, setDate] = useState(film ? film.watchDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
    const [title, setTitle] = useState(film ? film.title : '');
    const [favorite, setFavorite] = useState(film ? film.isFavorite : false);
    const [rating, setRating] = useState(film ? film.score : 0);
    const [errMsg, setErrMsg] = useState('');

    let handleOnSubmit = (event) => {
        event.preventDefault();

        if (date === undefined || date === '') {
            setErrMsg('Unvalid Date!');
        } else {
            let film = { id: parseInt(id), title: title, watchDate: dayjs(date), isFavorite: favorite, score: rating };

            if (film.id != undefined) {
                film.id = parseInt(film.id);
            }

            props.editFilm(film);
            navigate('/');
        }
    }

    return (
        <>
            <NavbarComponent />

            <Container className='mt-4'>
                <h2>Edit the Film</h2>

                <div className='mt-3'>
                    {errMsg ? <Alert variant='danger' onClose={() => setErrMsg('')} dismissible>{errMsg} </Alert> : false}
                </div>

                <Form className='mt-3' onSubmit={handleOnSubmit}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control id='title' name='title' type="text" placeholder="Add a title" value={title} onChange={e => setTitle(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Watch Date</Form.Label>
                                <Form.Control type="date" id="watchdate" name='watchDate' value={date} onChange={e => setDate(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Form.Group>
                                <Form.Check type="checkbox" id="favorite" checked={favorite} name='isFavorite' label="Favorite" onChange={e => setFavorite(e.target.checked)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <RatingStars handleInputChange={e => setRating(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Button type="submit" className="btn btn-success m-2" id="confirmButton">Conferma</Button>
                            <Button type="button" className='btn btn-danger' id='cancelButton' onClick={() => navigate('/')}>Cancella</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
}

export default EditFilm;