import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

function NavbarComponent(props) {
    return (
        <Navbar bg="primary">
            <Container fluid>
                <Navbar.Brand className='col-md-3 text-center'>
                    <i className="bi bi-collection-play me-2" />
                    Film Library
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Container className='text-center'>
                        <Nav>
                            <Nav.Item className='col-md-3'>
                                <Nav.Link href="/" className='text-dark'>Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='col-md-3'>
                                <Nav.Link href="/add" className='text-dark'>Add New Film</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='col-md-3'>
                                <Form className='d-flex'>
                                    <Form.Control                                        
                                        type="search"
                                        placeholder='Search'
                                        className='me-2'
                                        aria-label='Search'
                                        disabled
                                    />
                                    <Button variant='success'>Search</Button>
                                </Form>
                            </Nav.Item>
                            <Nav.Item className='col-md-3 text-end'>
                                <Nav.Link href="/"><i className="bi bi-person" /></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;