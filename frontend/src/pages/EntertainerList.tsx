import 'bootstrap/dist/css/bootstrap.min.css';

// Displays a list of entertainers with booking stats and links to details

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Summary DTO matching API structure

interface EntertainerSummary {
  entertainerID: number;
  entStageName: string;
  bookCount: number;
  lastBooked: string;
}

export default function EntertainerList() {
  const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);
  // Fetch list of entertainers on component mount

  useEffect(() => {
    fetch('https://localhost:5000/api/entertainers')
      .then(res => res.json())
      .then(setEntertainers);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Entertainers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Stage Name</th>
            <th>Bookings</th>
            <th>Last Booked</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map(e => (
            <tr key={e.entertainerID}>
              <td>{e.entStageName}</td>
              <td>{e.bookCount}</td>
              <td>{e.lastBooked || 'Never'}</td>
              <td>
                <Link to={`/entertainers/${e.entertainerID}`} className="btn btn-outline-primary btn-sm">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/entertainers/new" className="btn btn-success mt-3">
        Add Entertainer
      </Link>
      <br></br>
      <Link to="/" className="btn btn-success mt-3">
        Home
      </Link>
    </div>
  );
}
