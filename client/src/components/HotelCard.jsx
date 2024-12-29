import React, { useState } from 'react';
import { Card, Button, Toast, ToastContainer, Spinner } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';

const HotelCard = ({ hotel }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const getRandomPrice = () => Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

  const handleToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setToast(true);
  };

  const handleToastClose = () => {
    setToast(false);
  };
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-warning" />
        ) : (
          <FaRegStar key={i} className="text-warning" />
        )
      );
    }
    return stars;
  };

  const handleSaveHotel = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("http://localhost:5030/save-hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          hotelName: hotel.name,
          hotelDistance: hotel.distance.value,
          hotelStars: hotel.rating,
          hotelPrice: getRandomPrice()
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        handleToast('success', data.message || 'Hotel successfully saved.');
        setIsSaved(true);
      } else {
        const error = await response.json();
        handleToast('danger', error.message || 'Failed to save hotel.');
      }
    } catch (error) {
        handleToast('danger', 'An error occurred while saving the hotel.');
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body className="d-flex flex-column justify-content-between">
          
          <p className="mb-3 text-center fw-bold text-truncate" style={{ fontSize: '1.125rem' }}>{hotel.name}</p>

          
          <div className="d-flex justify-content-between align-items-center mb-3 fs-5">
            <span className="text-dark fw-medium">
              {hotel.distance.value} {hotel.distance.unit}
            </span>
            <span className="badge bg-dark text-white">{hotel.address.countryCode}</span>
          </div>

          
          <Card.Text className="text-center fs-5 fw-bold text-danger">
            ${getRandomPrice()}
          </Card.Text>

          
          <div className="d-flex justify-content-center mb-3 fs-5">
            {renderStars(hotel.rating)}
          </div>
        </Card.Body>

        
        <Card.Footer className="d-flex justify-content-between">
          <Button 
            variant="danger"
            size="sm"
            className="fw-medium"
            disabled={isSaving || isSaved} 
            onClick={handleSaveHotel}
          >
            {isSaved ? 'Saved' : isSaving ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Saving...
              </>
            ) : (
              'Save Hotel'
            )}
          </Button>
          <Button variant="danger" size="sm" className="fw-medium">
            Book Hotel
          </Button>
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
          <Toast.Body className="text-white text-start">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default HotelCard;
