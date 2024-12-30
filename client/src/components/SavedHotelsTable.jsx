import React from "react";
import { Table, Button } from "react-bootstrap";
import { IoTrash, IoBed } from "react-icons/io5";
import { FaStar, FaRegStar } from 'react-icons/fa';

const SavedHotelsTable = ({ hotels }) => {

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

  return (
    <div className="table-responsive mb-4 rounded-4 bg-light" style={{ height: "60vh", overflowY: "auto" }}>
      <Table bordered hover className="shadow-sm bg-light">
        <thead className="bg-dark text-white">
          <tr>
            <th>Hotel</th>
            <th>Distance</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Location</th>
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
              <td>{hotel.hotelCountryCode}</td>
              <td className="d-flex gap-2 justify-content-around">
                <Button variant="danger" size="lg">
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
    </div>
  );
};

export default SavedHotelsTable;
