import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { IoTrash, IoBed } from "react-icons/io5";
import { FaStar, FaRegStar } from 'react-icons/fa';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const SavedHotelsTable = ({ hotels, setHotels }) => {

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleToast = (message) => {
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

  if (hotels.length === 0) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-muted bg-light rounded-4"
        style={{ height: "60vh" }}
      >
        <IoBed className="fs-1 mb-1" />
        <p className="fs-4 p-2">Save a hotel for it to appear here.</p>
      </div>
    );
  }

  const handleDeleteHotel = async (hotelId) => {
    try {
      const response = await fetch(`http://localhost:5030/delete-hotel/${hotelId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        console.log("Hotel deleted successfully.");
        setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== hotelId));
      } else {
        console.error("Failed to delete hotel.");
        handleToast("Failed to delete hotel.");
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
            <th>Hotel</th>
            <th>Distance</th>
            <th>Price</th>
            <th>Rating</th>
            <th>IATA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => (
            <tr key={index}>
              <td>{hotel.hotelName}</td>
              <td>{hotel.hotelDistance} MI</td>
              <td>${hotel.hotelPrice}</td>
              <td>{renderStars(hotel.hotelRating)}</td>
              <td>{hotel.hotelIataCode}</td>
              <td className="d-flex gap-2 justify-content-around">
                <Button 
                  variant="danger" 
                  size="lg"
                  onClick={() => handleDeleteHotel(hotel.id)}
                >
                  <IoTrash />
                </Button>
                <Button variant="primary" size="lg">
                  <IoBed />
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

export default SavedHotelsTable;
