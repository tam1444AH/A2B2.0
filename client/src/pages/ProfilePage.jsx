import React, { useState, useEffect } from "react";
import ProfileBanner from "../components/ProfileBanner";
import flights from "../data/flights";
import hotels from "../data/hotels";
import SavedFlightsTable from "../components/SavedFlightsTable";
import SavedHotelsTable from "../components/SavedHotelsTable";
import { IoAirplane, IoBed } from "react-icons/io5";

const ProfilePage = () => {
  const [greeting, setGreeting] = useState("");
  const dataF = flights.flights;
  const dataH = hotels.hotels;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning,");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon,");
    } else if (hour >= 17 && hour < 24) {
      setGreeting("Good evening,");
    } else {
      setGreeting("Hello,");
    }
  }, []);

  return (
    <div className="min-vh-100 bg-black text-white">
      <ProfileBanner greeting={greeting} />
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-6">
            <p className="text-center text-white mb-3 fs-4 fw-medium">Saved Flights <IoAirplane /></p>
            <SavedFlightsTable flights={dataF} />
          </div>
          <div className="col-lg-6">
            <p className="text-center text-white mb-3 fs-4 fw-medium">Saved Hotels <IoBed /></p>
            <SavedHotelsTable hotels={dataH} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
