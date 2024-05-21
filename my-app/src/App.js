import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const countries = ['India', 'USA', 'Canada']; // Add more countries as needed
  const cities = {
    India: ['Delhi', 'Mumbai', 'Bangalore'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal']
  };

  const countryCodes = {
    India: '+91',
    USA: '+1',
    Canada: '+1'
    // Add more country codes as needed
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.firstName) {
      tempErrors.firstName = 'First Name is required';
      isValid = false;
    }
    if (!formData.lastName) {
      tempErrors.lastName = 'Last Name is required';
      isValid = false;
    }
    if (!formData.username) {
      tempErrors.username = 'Username is required';
      isValid = false;
    }
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_]).{6,}/.test(formData.password)) {
      tempErrors.password = 'Password must be at least 6 characters long and include at least 1 capital letter, 1 number, and 1 special character';
      isValid = false;
    }
    if (!formData.countryCode) {
      tempErrors.countryCode = 'Country Code is required';
      isValid = false;
    }
    if (!formData.phoneNumber) {
      tempErrors.phoneNumber = 'Phone Number is required';
      isValid = false;
    }
    if (!formData.country) {
      tempErrors.country = 'Country is required';
      isValid = false;
    }
    if (!formData.city) {
      tempErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.panNo) {
      tempErrors.panNo = 'PAN Number is required';
      isValid = false;
    }
    if (!formData.aadharNo) {
      tempErrors.aadharNo = 'Aadhar Number is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Automatically update country code when country is selected
    if (name === 'country') {
      setFormData({
        ...formData,
        [name]: value,
        countryCode: countryCodes[value]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/success', { state: { formData } });
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <span>{errors.firstName}</span>}
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <span>{errors.username}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>Show/Hide</button>
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" name="countryCode" placeholder="Country Code" value={formData.countryCode} onChange={handleChange} style={{ width: '30%', marginRight: '10px' }} disabled />
            <input type="text" name="phoneNumber" placeholder="Number" value={formData.phoneNumber} onChange={handleChange} style={{ width: 'calc(70% - 10px)' }} />
            {errors.countryCode && <span>{errors.countryCode}</span>}
            {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
          </div>
          <div>
            <label>Country:</label>
            <select name="country" value={formData.country} onChange={handleChange}>
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <span>{errors.country}</span>}
          </div>
          <div>
            <label>City:</label>
            <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
              <option value="">Select City</option>
              {formData.country && cities[formData.country].map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <span>{errors.city}</span>}
          </div>
          <div>
            <label>PAN Number:</label>
            <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} />
            {errors.panNo && <span>{errors.panNo}</span>}
          </div>
          <div>
            <label>Aadhar Number:</label>
            <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} />
            {errors.aadharNo && <span>{errors.aadharNo}</span>}
          </div>
          <div>
            <button type="submit" disabled={!isFormValid}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
