import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Entertainer {
  entertainerID: number;
  entStageName: string;
  bookCount: number;
  lastBooked: string;
}

export default function EntertainerList() {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);

  useEffect(() => {
    fetch('https://localhost:5000/api/entertainers')
      .then(res => res.json())
      .then(setEntertainers);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Entertainers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Stage Name</th>
            <th>Times Booked</th>
            <th>Last Booked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map(ent => (
            <tr key={ent.entertainerID}>
              <td>{ent.entStageName}</td>
              <td>{ent.bookCount}</td>
              <td>{ent.lastBooked || 'Never'}</td>
              <td>
                <Link to={`/entertainers/${ent.entertainerID}`} className="btn btn-primary btn-sm">Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/entertainers/new" className="btn btn-success">Add Entertainer</Link>
    </div>
  );
}
