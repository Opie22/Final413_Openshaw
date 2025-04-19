import './App.css'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import EntertainerList from './pages/EntertainerList';
import EntertainerDetails from './pages/EntertainerDetails';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Entertainment Agency</Link>
        <Link className="nav-link" to="/entertainers">Entertainers</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entertainers" element={<EntertainerList />} />
        <Route path="/entertainers/:id" element={<EntertainerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
