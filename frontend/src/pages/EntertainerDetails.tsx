import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VITE_BACKEND_URL = 'https://413final-backend-a2babjgsd9azf0c0.eastus-01.azurewebsites.net';
// Shows full details of a specific entertainer, with delete/edit options


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
// Fetch entertainer data
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/entertainers/${id}`)
      .then(res => res.json())
      .then(setEntertainer);
  }, [id]);

  // Delete with confirmation
  const deleteEntertainer = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this entertainer?");
    if (!confirmed || !id) return;

    try {
      const res = await fetch(`${VITE_BACKEND_URL}/api/entertainers/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Delete failed');
      }

      navigate('/entertainers');
    } catch (err) {
      console.error(err);
      alert("Failed to delete entertainer.");
    }
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
      <button
          className="btn btn-secondary me-2"
          onClick={() => navigate(`/entertainers/${entertainer.entertainerID}/edit`)}>
          Edit
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={() => navigate('/entertainers')}>
        Return to List
      </button>

    </div>
  );
}
