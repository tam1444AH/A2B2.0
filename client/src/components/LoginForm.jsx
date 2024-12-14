import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const LoginForm = () => {
  return (
    <Container>
        <Col xs={12} sm={10} md={8} lg={6} className="p-4 bg-dark rounded mb-4 mx-auto">
            <Form>
                <Form.Group>
                    <h3 className="text-center mb-4 text-white">Login:</h3>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="p-2 text-truncate"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    className="p-2 text-truncate"
                    />
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="danger" type="submit" className='fw-medium'>
                    Submit
                    </Button>
                </div>
            </Form>
        </Col>
    </Container>
  )
}

export default LoginForm;