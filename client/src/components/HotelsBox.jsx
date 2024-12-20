import React from 'react'
import { FaHotel } from "react-icons/fa6";
import hotels from "../data/hotels"
import HotelCard from './HotelCard';


const HotelsBox = ({ hotels = [] }) => {
  return (
    <div
      className="container-lg d-flex flex-column bg-dark text-center rounded align-items-center justify-content-center p-2 mb-4 mx-auto"
      style={{ height: '50vh' }}
    >
      <div className="row overflow-auto w-100">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <HotelCard hotel={hotel} key={index} />
          ))
        ) : (
          <div className="text-center">
            <FaHotel className="display-3 mb-2" />
            <p className="fs-2">Search for hotels.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsBox;
