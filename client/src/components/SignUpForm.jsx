import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            setToastType('error');
            setToastMessage('Password length must be at least 8 characters.');
            setShowToast(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setToastType('error');
            setToastMessage('Passwords do not match.');
            setShowToast(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5030/signup', formData);
            console.log(response)
            setToastMessage(response.data);
            setToastType('success');
            setShowToast(true);
        } catch (error) {
            console.log(error)
            setToastMessage(
                error.response?.data || 'An error occurred. Please try again.'
            );
            setToastType('error');
            setShowToast(true);
        }

    };

    return (
        <Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg={toastType === 'success' 
                        ? 'success' 
                        : toastType === 'error' 
                        ? 'danger'
                        : 'dark'}
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                >
                    <Toast.Header closeButton>
                        <strong className="me-auto text-dark">
                            {toastType === 'success'
                                ? 'Success' 
                                : toastType === 'error'
                                ? 'Error'
                                : 'Info'}
                        </strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Col xs={12} sm={10} md={8} lg={6} className="p-4 bg-dark rounded mb-4 mx-auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <h3 className="text-center mb-4 text-white">Sign Up:</h3>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            className="p-2 text-truncate"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            className="p-2 text-truncate"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm your password"
                            className="p-2 text-truncate"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
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

export default SignUpForm;