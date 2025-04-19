import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Define the Entertainer interface
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

export default function EntertainerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);

  useEffect(() => {
    fetch(`https://localhost:5000/api/entertainers/${id}`)
      .then(res => res.json())
      .then(setEntertainer);
  }, [id]);

  const deleteEntertainer = async () => {
    await fetch(`https://localhost:5000/api/entertainers/${id}`, {
      method: 'DELETE'
    });
    navigate('/entertainers');
  };

  if (!entertainer) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{entertainer.entStageName} - Details</h2>
      <ul className="list-group mb-3">
        {Object.entries(entertainer).map(([key, value]) => (
          <li key={key} className="list-group-item">
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </ul>
      <button className="btn btn-danger me-2" onClick={deleteEntertainer}>
        Delete
      </button>
    </div>
  );
}
