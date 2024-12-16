import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';

const HotelCard = ({ hotel }) => {
  
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
            $100 per night
          </Card.Text>

          
          <div className="d-flex justify-content-center mb-3 fs-5">
            {renderStars(hotel.rating)}
          </div>
        </Card.Body>

        
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="danger" size="sm" className="fw-medium">
            Save Hotel
          </Button>
          <Button variant="danger" size="sm" className="fw-medium">
            Book Hotel
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default HotelCard;
