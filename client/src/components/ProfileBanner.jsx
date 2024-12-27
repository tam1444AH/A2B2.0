import React from 'react';

const ProfileBanner = ({ greeting }) => {
  return (
    <div className="text-center bg-black text-white py-5">
      <p className='fs-1 fw-semibold p-2'>{greeting} fellow traveler!</p>
    </div>
  );
};

export default ProfileBanner;