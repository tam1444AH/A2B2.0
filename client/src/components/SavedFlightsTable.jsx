import React, { useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";
import { IoAirplane, IoTrash } from "react-icons/io5";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Modal from 'react-bootstrap/Modal';


const SavedFlightsTable = ({ flights, setFlights }) => {

  const [toast, setToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [show, setShow] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (flight) => {
    setTotalCost(150 * numTickets);
    setSelectedFlight(flight); // Store the selected flight
    console.log(selectedFlight)
    setShow(true);
  };

  const handleToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setToast(true);
  };

  const handleToastClose = () => {
    setToast(false);
  };

  const handleNumTicketsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setNumTickets(value);
    setTotalCost(value * 150);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleBookFlight = async (flight) => {
    if (cardNumber.length !== 16 || !expirationDate.match(/^\d{4}-\d{2}$/)) {
      handleToast('danger', 'Please enter valid card details.');
      return;
    }

    const bookingDetails = {
      FlightName: flight.flightName,
      FlightDate: flight.flightDate,
      DepartureIata: flight.departureIata,
      ArrivalIata: flight.arrivalIata,
      DepartureTime: flight.departureTime,
      ArrivalTime: flight.arrivalTime,
      NumTickets: numTickets,
      TotalCost: totalCost,
    }

    try {
      const response = await fetch("http://localhost:5030/book-flight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(bookingDetails),
      });
  
      if (response.ok) {
        const data = await response.json();
        handleToast('success', data.message || 'Flight successfully booked!');
        handleClose();
      } else {
        const error = await response.json();
        handleToast('danger', error.message || 'Failed to book flight.');
      }
    } catch (error) {
      handleToast('danger', 'An error occurred while booking the flight. Please try again.');
    }
  };

  if (flights.length === 0) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-muted bg-light rounded-4"
        style={{ height: "60vh" }}
      >
        <IoAirplane className="fs-1 mb-1" />
        <p className="fs-4 p-1">Save a flight for it to appear here.</p>
      </div>
    );
  }

  const handleDeleteFlight = async (flightId) => {
    try {
      const response = await fetch(`http://localhost:5030/delete-flight/${flightId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        console.log("Flight deleted successfully.");
        setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== flightId));
      } else {
        console.error("Failed to delete flight.");
        handleToast("Failed to delete flight.");
      }
    } catch (error) {
      console.error("Error:", error);
      handleToast(error.message);
    }
  };


  return (
    <div className="table-responsive mb-4 rounded-4 bg-light" style={{ height: "60vh", overflowY: "auto" }}>
      <Table bordered hover className="shadow-sm bg-light">
        <thead className="bg-dark text-white">
          <tr>
            <th>Flight Info</th>
            <th>Date</th>
            <th>Price</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>
                {flight.flightName}
              </td>
              <td>
                {new Date(flight.flightDate).toLocaleDateString()}
              </td>
              <td>
                ${flight.price}
              </td>
              <td>
                {flight.departureTime}{" "}({flight.departureIata})
              </td>
              <td>
                {flight.arrivalTime}{" "}({flight.arrivalIata})
              </td>
              <td className="d-flex gap-2 justify-content-around">
                <Button 
                  variant="danger" 
                  size="lg"
                  onClick={() => handleDeleteFlight(flight.id)}
                >
                  <IoTrash />
                </Button>
                <Button variant="primary" size="lg" onClick={() => handleShow(flight)}>
                  <IoAirplane />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Flight: {selectedFlight.flightName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="numTickets">
              <Form.Label>Number of Tickets</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  min="1"
                  value={numTickets}
                  onChange={handleNumTicketsChange}
                  required
                />
                <InputGroup.Text>Tickets</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                maxLength="16"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="Enter 16-digit card number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="expirationDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="month"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                required
              />
            </Form.Group>

            <div className="text-center fw-bold fs-5">
              Total Cost: ${totalCost}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => alert('Under development')}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SavedFlightsTable;
