import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { IoAirplane, IoTrash } from "react-icons/io5";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const SavedFlightsTable = ({ flights, setFlights }) => {

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleToast = (message) => {
    setToastMessage(message);
    setToast(true);
  };
  
  const handleToastClose = () => {
    setToast(false);
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
                <Button variant="primary" size="lg">
                  <IoAirplane />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer position="top-end" className="p-3" aria-live="assertive">
        <Toast
          show={toast}
          onClose={handleToastClose}
          delay={3000}
          autohide
          bg='danger'
        >
          <Toast.Header closeButton>
            <strong className="me-auto text-dark">
              Error
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default SavedFlightsTable;
