import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Form for submitting a new entertainer to the backend

// Define the interface
interface Entertainer {
  entertainerID: number;
  entStageName: string;
  entSSN: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEmailAddress: string;
  dateEntered: string;
}

export default function EditEntertainerForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Entertainer | null>(null);
//fetch data
  useEffect(() => {
    fetch(`https://localhost:5000/api/entertainers/${id}`)
      .then(res => res.json())
      .then(setFormData)
      .catch(() => {
        alert("Failed to load entertainer.");
        navigate('/entertainers');
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
// Validate the form data and update the entertainer
    const res = await fetch(`https://localhost:5000/api/entertainers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      const err = await res.json();
      alert(JSON.stringify(err.errors || err));
      return;
    }

    navigate(`/entertainers/${id}`);
  };

  if (!formData) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Edit Entertainer</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label" htmlFor={key}>{key}</label>
            <input
              className="form-control"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/entertainers/${id}`)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
