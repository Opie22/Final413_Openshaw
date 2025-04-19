import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddEntertainerForm() {
  const navigate = useNavigate();
//define the interface
  const [formData, setFormData] = useState({
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    dateEntered: new Date().toISOString().split('T')[0], // defaults to today
  });

  // Handle input changes for all fields by updating corresponding value in formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    // Submit handler: Sends form data to the backend API as a POST request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://localhost:5000/api/entertainers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle validation errors from backend
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Validation errors:', errorData);
        alert(JSON.stringify(errorData.errors || errorData, null, 2));
        return;
      }

      // Navigate back to the list after successful submission
      navigate('/entertainers');
    } catch (error) {
        // Handle unexpected errors
      console.error('Unexpected error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Entertainer</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label" htmlFor={key}>
              {key}
            </label>
            <input
              type="text"
              className="form-control"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success me-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/entertainers')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
