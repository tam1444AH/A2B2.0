import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { IoAirplaneSharp } from 'react-icons/io5';
import flights from '../data/flights';

const FlightCard = ({ flight }) => {
  return (
    <div className="col-md-3 mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body className="d-flex flex-column justify-content-between">
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h5>
            <IoAirplaneSharp className="text-danger fs-4" />
            <h5 className="mb-0">{new Date(flight.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h5>
          </div>

          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold text-muted">{flight.departure.iata}</span>
            <div className="flex-grow-1 mx-2 border-top border-dark"></div>
            <span className="fw-bold text-muted">{flight.arrival.iata}</span>
          </div>

          
          <Card.Text className="text-center mb-3">
            <strong>{flight.airline.name} {flight.flight.number}</strong>
          </Card.Text>

          
          <div className="d-flex justify-content-between mb-3">
            <span className="badge bg-dark text-white">{flight.flight_status}</span>
            <span className="badge bg-dark text-white">{flight.flight_date}</span>
          </div>
        </Card.Body>

        
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="danger" size="sm">Save Flight</Button>
          <Button variant="danger" size="sm">Book Flight</Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default FlightCard;
