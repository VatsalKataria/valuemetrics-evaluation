import React, { useState } from 'react';
import axios from 'axios';

const EntryScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollnumber: '',
    gender: ''
  });

  const [error, setError] = useState({});

  const validate = () => {
    let tempError = {};
    if (!formData.firstName) tempError.firstName = "First Name is required";
    if (!formData.lastName) tempError.lastName = "Last Name is required";
    if (!formData.rollnumber) tempError.rollnumber = "Roll Number is required";
    if (!formData.gender) tempError.gender = "Gender is required";

    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        rollNumber: formData.rollnumber,
        gender: formData.gender
    };

    try {
        await axios.post('http://localhost:5000/api/students', payload, {
        headers: { 'Content-Type': 'application/json' }
        });

        setFormData({
        firstName: '',
        lastName: '',
        rollnumber: '',
        gender: ''
        });

        alert("Student added successfully!");
    } catch (err) {
        console.error(err.response?.data || err.message);
        alert(err.response?.data?.message || "Error submitting form");
    }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <label htmlFor="firstName" className="col-sm-2 col-form-label">
          First Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {error.firstName && <small className="text-danger">{error.firstName}</small>}
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="lastName" className="col-sm-2 col-form-label">
          Last Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {error.lastName && <small className="text-danger">{error.lastName}</small>}
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="rollnumber" className="col-sm-2 col-form-label">
          Roll Number
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="rollnumber"
            name="rollnumber"
            value={formData.rollnumber}
            onChange={handleChange}
          />
          {error.rollnumber && <small className="text-danger">{error.rollnumber}</small>}
        </div>
      </div>

      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label className="form-check-label">Male</label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            <label className="form-check-label">Female</label>
          </div>

          {error.gender && <small className="text-danger">{error.gender}</small>}
        </div>
      </fieldset>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EntryScreen;