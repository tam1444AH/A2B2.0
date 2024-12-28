import React from "react";
import { Table, Button } from "react-bootstrap";
import { IoTrash, IoBed } from "react-icons/io5";

const SavedHotelsTable = ({ hotels }) => {
  const getRandomPrice = () => Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

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
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => (
            <tr key={index}>
              <td>{hotel.name}</td>
              <td>{hotel.distance.value} MI.</td>
              <td>${getRandomPrice()}</td>
              <td>{hotel.address.countryCode}</td>
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
