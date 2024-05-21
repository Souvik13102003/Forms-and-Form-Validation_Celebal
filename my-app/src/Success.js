import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

const Success = () => {
  const location = useLocation();
  const { state } = location;
  const { formData } = state || {};

  if (!formData) {
    return <div className="container"><div className="success-container">No form data available</div></div>;
  }

  // Combine country code and phone number
  const phoneNumberWithCountryCode = `${formData.countryCode} ${formData.phoneNumber}`;

  return (
    <div className="container">
      <div className="success-container">
        <h2>Form Submitted Successfully</h2>
        <div>
          <strong>First Name:</strong> {formData.firstName}
        </div>
        <div>
          <strong>Last Name:</strong> {formData.lastName}
        </div>
        <div>
          <strong>Username:</strong> {formData.username}
        </div>
        <div>
          <strong>Email:</strong> {formData.email}
        </div>
        <div>
          <strong>Phone Number:</strong> {phoneNumberWithCountryCode}
        </div>
        <div>
          <strong>Country:</strong> {formData.country}
        </div>
        <div>
          <strong>City:</strong> {formData.city}
        </div>
        <div>
          <strong>PAN Number:</strong> {formData.panNo}
        </div>
        <div>
          <strong>Aadhar Number:</strong> {formData.aadharNo}
        </div>
      </div>
    </div>
  );
};

export default Success;
