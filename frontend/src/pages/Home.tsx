// import React from 'react';
// import { Link } from 'react-router-dom';


// Landing page welcoming the user and linking to the entertainers list

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
<div className="container mt-4 text-center">
  <h1 className="display-5 fw-bold">Welcome to the Entertainment Agency</h1>
  <p className="lead">Browse and book our amazing entertainers!</p>
  <Link to="/entertainers" className="btn btn-primary btn-lg mt-3">
    View Entertainers
  </Link>
</div>
  );
}