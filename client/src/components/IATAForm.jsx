import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Spinner from 'react-bootstrap/Spinner';

const IATAForm = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!from || !to) {
      handleToast('Please fill out both fields.');
      return;
    }

    if (from.length !== 3 || to.length !== 3) {
      handleToast('Please enter valid IATA codes.');
      return;
    }

    setIsSubmitting(true); 
    try {
      if (from && to) {
        await onSearch(from, to); 
      }
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <Container>
      <Col xs={12} sm={10} md={8} lg={6} className="p-4 bg-dark rounded mb-4 mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <h3 className="text-center mb-4 text-white">Enter the following:</h3>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGroupDeparture">
            <Form.Control
              type="text"
              placeholder="IATA code of airport of departure"
              className="p-2 text-truncate"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGroupArrival">
            <Form.Control
              type="text"
              placeholder="IATA code of airport of arrival"
              className="p-2 text-truncate"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="danger" type="submit" className="fw-medium" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Submitting
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </Form>
      </Col>

      
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="warning"
        >
          <Toast.Header closeButton>
            <strong className="me-auto text-dark">Validation Error</strong>
          </Toast.Header>
          <Toast.Body className='text-dark'>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default IATAForm;
