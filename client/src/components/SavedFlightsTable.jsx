import React from "react";
import { Table, Button } from "react-bootstrap";
import { IoAirplane, IoTrash } from "react-icons/io5";

const SavedFlightsTable = ({ flights }) => {
  return (
    <div className="table-responsive mb-4 rounded-4 bg-light" style={{ height: "60vh", overflowY: "auto" }}>
      <Table bordered hover className="shadow-sm bg-light">
        <thead className="bg-dark text-white">
          <tr>
            <th>Flight Info</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <tr key={index}>
                <td>
                  {flight.airline.name} {flight.flight.number}
                </td>
                <td>
                  {new Date(flight.departure.scheduled).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit", hour12: true }
                  )}{" "}
                  ({flight.departure.iata})
                </td>
                <td>
                  {new Date(flight.arrival.scheduled).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  ({flight.arrival.iata})
                </td>
                <td className="d-flex gap-2 justify-content-around">
                  <Button variant="danger" size="lg">
                    <IoTrash />
                  </Button>
                  <Button variant="primary" size="lg">
                    <IoAirplane />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                <IoAirplane className="fs-3" /> Save a flight for it to appear
                here.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default SavedFlightsTable;
