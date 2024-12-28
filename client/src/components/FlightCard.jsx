import React, { useState } from 'react';
import { Card, Button, Toast, ToastContainer, Spinner } from 'react-bootstrap';
import { IoAirplaneSharp } from 'react-icons/io5';


const FlightCard = ({ flight }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setToast(true);
  };

  const handleToastClose = () => {
    setToast(false);
  };

  const handleSaveFlight = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("http://localhost:5030/save-flight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          flightName: `${flight.airline.name} ${flight.flight.number}`,
          departureTime: new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
          arrivalTime: new Date(flight.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
          flightDate: flight.flight_date,
          departureIata: flight.departure.iata,
          arrivalIata: flight.arrival.iata,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        handleToast('success', data.message || 'Flight successfully saved.');
      } else {
        const error = await response.json();
        handleToast('danger', error.message || 'Failed to save flight.');
      }

    } catch (error) {
      handleToast('danger', 'An error occurred while saving the flight.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body className="d-flex flex-column justify-content-between">
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fs-5">{new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h5>
            <IoAirplaneSharp className="text-danger fs-2" />
            <h5 className="mb-0 fs-5">{new Date(flight.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h5>
          </div>

          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold text-muted fs-5">{flight.departure.iata}</span>
            <div className="flex-grow-1 mx-2 border-top border-dark"></div>
            <span className="fw-bold text-muted fs-5">{flight.arrival.iata}</span>
          </div>

          
          <Card.Text className="text-center mb-3" style={{ fontSize: '1.125rem' }}>
            <strong>{flight.airline.name} {flight.flight.number}</strong>
          </Card.Text>

          
          <div className="d-flex justify-content-between mb-3">
            <span className="badge bg-dark text-white">{flight.flight_status}</span>
            <span className="badge bg-dark text-white">{flight.flight_date}</span>
          </div>
        </Card.Body>

        
        <Card.Footer className="d-flex justify-content-between">
          <Button
              variant="danger"
              size="sm"
              className="fw-medium"
              disabled={isSaving}
              onClick={handleSaveFlight}
          >
            {isSaving ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Saving...
              </>
            ) : (
              'Save Flight'
            )}
          </Button>
          <Button variant="danger" size="sm" className='fw-medium'>Book Flight</Button>
        </Card.Footer>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={toast}
          onClose={handleToastClose}
          delay={3000}
          autohide
          bg={toastType}
        >
          <Toast.Header closeButton>
            <strong className="me-auto text-dark">
              {toastType === 'success'
                ? 'Success!'
                : toastType === 'danger'
                ? 'Error'
                : 'Info'}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default FlightCard;
